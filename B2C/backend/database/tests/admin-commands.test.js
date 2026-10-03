const { MongoMemoryReplSet } = require('mongodb-memory-server');
const request = require('supertest');
const { connectDatabase, installSchema } = require('../client');
const { createAuthApp } = require('../../auth/app');
const { issueSession, logout } = require('../../auth/service');

jest.setTimeout(120000);
let mongo, db, app, owner, token, inventory;
const origin = 'http://localhost:3001';
beforeAll(async () => {
  mongo = await MongoMemoryReplSet.create({ replSet: { storageEngine: 'wiredTiger' }, instanceOpts: [{ launchTimeout: 60000 }] });
  db = await connectDatabase({ uri: mongo.getUri(), dbName: 'gourmet_b2c_schema_test_admin_commands' });
  await installSchema(db);
});
beforeEach(async () => {
  owner = await db.models.User.create({ email: 'owner@example.test', roles: ['OWNER'] });
  token = await issueSession(db, owner._id);
  const category = await db.models.Category.create({ name: 'Gifts', slug: 'gifts' });
  const product = await db.models.Product.create({ name: 'Gift', slug: 'gift', categoryIds: [category._id] });
  const variant = await db.models.ProductVariant.create({ productId: product._id, sku: 'ADMIN-ITEM', priceMinor: 1000, currency: 'INR' });
  inventory = await db.models.Inventory.create({ variantId: variant._id, sku: variant.sku });
  app = createAuthApp({ db, origin });
});
afterEach(async () => { if (db) for (const model of Object.values(db.models)) await model.collection.deleteMany({}); });
afterAll(async () => { if (db) await db.connection.close(); if (mongo) await mongo.stop(); });
const body = { quantity: 2, reason: 'Stock counted on arrival', expectedVersion: 0 };
function adjust(key, input = body, sessionToken = token) {
  return request(app).post(`/api/v1/auth/admin/inventory/${inventory._id}/adjust`)
    .set('Origin', origin).set('Cookie', `b2c_session=${sessionToken}`).set('Idempotency-Key', key).send(input);
}
const stock = () => db.models.Inventory.findById(inventory._id);

test('sequential duplicate HTTP command replays a compact receipt without a second stock or audit effect', async () => {
  const first = await adjust('stock-count-0001').expect(200);
  const replay = await adjust('stock-count-0001').expect(200);
  expect(replay.body).toEqual(first.body);
  expect(Object.keys(first.body).sort()).toEqual(['id', 'resource', 'version']);
  expect((await stock()).availableQuantity).toBe(2);
  expect(await db.models.InventoryTransaction.countDocuments()).toBe(1);
  expect(await db.models.AdminCommand.countDocuments()).toBe(1);
  expect(await db.models.AuditLog.countDocuments({ action: 'INVENTORY_ADJUSTED' })).toBe(1);
  expect(await db.models.AuditLog.countDocuments({ action: 'INVENTORY_ADJUSTMENT' })).toBe(1);
});

test('simultaneous duplicate HTTP commands produce one logical inventory adjustment', async () => {
  const replies = await Promise.all([adjust('stock-count-race'), adjust('stock-count-race')]);
  expect(replies.map(reply => reply.status)).toEqual([200, 200]);
  expect(replies[1].body).toEqual(replies[0].body);
  expect((await stock()).availableQuantity).toBe(2);
  expect(await db.models.InventoryTransaction.countDocuments()).toBe(1);
  expect(await db.models.AdminCommand.countDocuments()).toBe(1);
});

test('changed payload under the same key conflicts and cannot alter the original effect', async () => {
  await adjust('stock-count-bound').expect(200);
  await adjust('stock-count-bound', { ...body, quantity: 5 }).expect(409);
  expect((await stock()).availableQuantity).toBe(2);
  expect(await db.models.AdminCommand.countDocuments()).toBe(1);
});

test('command identity is actor scoped; another operator cannot replay a receipt', async () => {
  await adjust('shared-client-key').expect(200);
  const admin = await db.models.User.create({ email: 'staff@example.test', roles: ['ADMIN'], permissions: ['inventory.adjust'] });
  const adminToken = await issueSession(db, admin._id);
  await adjust('shared-client-key', body, adminToken).expect(409);
  expect(await db.models.AdminCommand.countDocuments({ actorId: admin._id })).toBe(0);
  const result = await adjust('shared-client-key', { ...body, expectedVersion: 1, quantity: 1 }, adminToken).expect(200);
  expect(result.body.version).toBe(2);
  expect((await stock()).availableQuantity).toBe(3);
  expect(await db.models.AdminCommand.countDocuments()).toBe(2);
});

test('a revoked session cannot replay a successful command', async () => {
  await adjust('before-revocation').expect(200);
  await logout(db, token);
  await adjust('before-revocation').expect(401);
  expect((await stock()).availableQuantity).toBe(2);
  expect(await db.models.InventoryTransaction.countDocuments()).toBe(1);
});

test('missing permission and injected authority never execute an inventory handler', async () => {
  const admin = await db.models.User.create({ email: 'readonly@example.test', roles: ['ADMIN'], permissions: ['inventory.read'] });
  const adminToken = await issueSession(db, admin._id);
  await adjust('forged-privilege', { ...body, role: 'OWNER', permissions: ['inventory.adjust'] }, adminToken).expect(403);
  await adjust('mass-assignment', { ...body, availableQuantity: 500 }).expect(422);
  expect((await stock()).availableQuantity).toBe(0);
  expect(await db.models.AdminCommand.countDocuments()).toBe(0);
});

test('central audit failure rolls back stock, ledger and command receipt', async () => {
  const originalCreate = db.models.AuditLog.create.bind(db.models.AuditLog);
  const spy = jest.spyOn(db.models.AuditLog, 'create').mockImplementation((rows, options) => {
    if (rows[0]?.action === 'INVENTORY_ADJUSTED') return Promise.reject(new Error('Synthetic central audit failure'));
    return originalCreate(rows, options);
  });
  let response;
  try { response = await adjust('failed-central-audit').expect(503); } finally { spy.mockRestore(); }
  expect(response.body.message).not.toContain('Synthetic');
  expect((await stock()).availableQuantity).toBe(0);
  expect(await db.models.InventoryTransaction.countDocuments()).toBe(0);
  expect(await db.models.AdminCommand.countDocuments()).toBe(0);
  expect(await db.models.AuditLog.countDocuments()).toBe(0);
  await adjust('failed-central-audit').expect(200);
  expect((await stock()).availableQuantity).toBe(2);
});

test('cross-origin and malformed request authority are rejected before mutation', async () => {
  await request(app).post(`/api/v1/auth/admin/inventory/${inventory._id}/adjust`)
    .set('Origin', 'https://other.example').set('Cookie', `b2c_session=${token}`).set('Idempotency-Key', 'other-origin-command').send(body).expect(403);
  await adjust('mismatched-path', { ...body, id: String(owner._id) }).expect(422);
  await adjust('short').expect(422);
  expect((await stock()).availableQuantity).toBe(0);
});
