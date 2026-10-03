const { MongoMemoryReplSet } = require('mongodb-memory-server');
const request = require('supertest');
const bcrypt = require('bcryptjs');
const { connectDatabase, installSchema } = require('../client');
const { createAuthApp } = require('../../auth/app');
const auth = require('../../auth/service');
const { authenticateAdmin, adminRateLimit, PERMISSIONS } = require('../../admin/security');
const { executeCommand } = require('../../admin/commands');
const { bootstrapOwner } = require('../../admin/provision-owner');

jest.setTimeout(120000);
const origin = 'http://localhost:3001', base = '/api/v1/auth/admin';
let mongo, db, app, owner, ownerToken;
beforeAll(async () => {
  mongo = await MongoMemoryReplSet.create({ replSet: { storageEngine: 'wiredTiger' } });
  db = await connectDatabase({ uri: mongo.getUri(), dbName: 'gourmet_b2c_schema_test_admin_security' });
  await installSchema(db);
});
beforeEach(async () => {
  app = createAuthApp({ db, origin });
  owner = await db.models.User.create({ email: 'owner@example.test', roles: ['OWNER'] });
  ownerToken = await auth.issueSession(db, owner._id);
});
afterEach(async () => { jest.restoreAllMocks(); for (const model of Object.values(db.models)) await model.collection.deleteMany({}); });
afterAll(async () => { await db?.connection.close(); await mongo?.stop(); });
const get = (path, token = ownerToken) => request(app).get(base + path).set('Cookie', `b2c_session=${token}`);
const patch = (path, body, key, token = ownerToken) => request(app).patch(base + path).set('Origin', origin).set('Cookie', `b2c_session=${token}`).set('Idempotency-Key', key).send(body);
async function staff(permissions = []) {
  const user = await db.models.User.create({ email: 'staff@example.test', roles: ['ADMIN'], permissions });
  return { user, token: await auth.issueSession(db, user._id) };
}

test('existing password auth admits staff without a Customer but customer-only identity still rejects', async () => {
  const editableOwner = await db.models.User.findById(owner._id);
  editableOwner.passwordHash = await bcrypt.hash('synthetic-staff-password', 12); await editableOwner.save();
  const agent = request.agent(app);
  const login = await agent.post('/api/v1/auth/login').set('Origin', origin).send({ email: owner.email, password: 'synthetic-staff-password' }).expect(200);
  const cookie = login.headers['set-cookie'].find(value => value.startsWith('b2c_session='));
  expect(cookie).toContain('HttpOnly'); expect(cookie).toContain('SameSite=Lax'); expect(cookie).toContain('Path=/api/v1/auth');
  const profile = (await agent.get('/api/v1/auth/me').expect(200)).body.user;
  expect(profile.role).toBe('owner'); expect(profile.customerId).toBeUndefined();
  expect((await agent.get(base + '/session').expect(200)).body.permissions).toEqual(PERMISSIONS);
  expect(await db.models.Customer.countDocuments()).toBe(0);
  await expect(auth.identity(db, ownerToken)).rejects.toMatchObject({ status: 401 });
});

test('public HTTP registration never accepts privileged roles or permissions', async () => {
  const agent = request.agent(app);
  await agent.post('/api/v1/auth/register?role=OWNER').set('Origin', origin).send({ name: 'Public Customer', email: 'public@example.test', password: 'synthetic-customer-password', role: 'OWNER', roles: ['OWNER'], permissions: PERMISSIONS, isAdmin: true }).expect(201);
  const user = await db.models.User.findOne({ email: 'public@example.test' });
  expect(user.roles).toEqual(['CUSTOMER']); expect(user.permissions).toEqual([]);
  await agent.get(base + '/session').set('X-Role', 'OWNER').expect(403);
  await agent.get(base + '/orders?role=OWNER').expect(403);
});

test('missing invalid expired revoked and suspended sessions are rejected', async () => {
  await request(app).get(base + '/session').expect(401);
  await get('/session', 'invalid-token').expect(401);
  const { user, token } = await staff(['orders.read']);
  await get('/orders', token).expect(200);
  await request(app).post('/api/v1/auth/logout').set('Origin', origin).set('Cookie', `b2c_session=${token}`).send({}).expect(200);
  await get('/orders', token).expect(401);
  const expiring = await auth.issueSession(db, user._id);
  const stored = await db.models.User.findById(user._id).select('+authSessions');
  stored.authSessions = stored.authSessions.map(session => ({ digest: session.digest, expiresAt: new Date(0) })); await stored.save();
  await get('/orders', expiring).expect(401);
  const suspended = await auth.issueSession(db, user._id);
  const fresh = await db.models.User.findById(user._id); fresh.status = 'SUSPENDED'; await fresh.save();
  await get('/orders', suspended).expect(401);
});

test('ADMIN permissions deny by default and never grant owner-only access or disclose hidden fields', async () => {
  const { user, token } = await staff(['orders.read']);
  await get('/orders', token).expect(200);
  for (const path of ['/customers', '/staff', '/settings']) await get(path, token).expect(403);
  await patch('/settings', { expectedVersion: 0, timezone: 'UTC', currency: 'INR' }, 'denied-settings', token).expect(403);
  const session = await get('/session', token).expect(200);
  expect(session.body.permissions).toEqual(['orders.read']);
  expect(JSON.stringify(session.body)).not.toMatch(/authSessions|passwordHash|googleSubject|adminCommandVersion/);
  user.permissions = ['settings.update']; await expect(user.save()).rejects.toThrow('Owner-only');
});

test('owner grants and revokes explicit ADMIN permissions with version checks, audit and session revocation', async () => {
  const token = await auth.register(db, { name: 'Existing Customer', email: 'promote@example.test', password: 'synthetic-customer-password' });
  const target = await auth.sessionUser(db, token);
  const input = { expectedVersion: 0, makeAdmin: true, permissions: ['orders.read'], reason: 'Order operations' };
  const first = await patch(`/staff/${target._id}`, input, 'grant-existing-user').expect(200);
  expect(first.body).toEqual({ resource: 'staff', id: String(target._id), version: 1 });
  const replay = await patch(`/staff/${target._id}`, input, 'grant-existing-user').expect(200);
  expect(replay.body).toEqual(first.body);
  await get('/orders', token).expect(401);
  const staffToken = await auth.issueSession(db, target._id);
  await get('/orders', staffToken).expect(200);
  await patch(`/staff/${target._id}`, { ...input, permissions: [] }, 'stale-staff-version').expect(409);
  await patch(`/staff/${target._id}`, { expectedVersion: 1, permissions: [], reason: 'Revoke order access' }, 'revoke-user-orders').expect(200);
  await get('/orders', staffToken).expect(401);
  const reauthenticated = await auth.issueSession(db, target._id);
  await get('/orders', reauthenticated).expect(403);
  expect(await db.models.AdminCommand.countDocuments()).toBe(2);
  expect(await db.models.AuditLog.countDocuments({ action: 'STAFF_PERMISSIONS_CHANGED' })).toBe(2);
  const directory = await get('/staff?search=promote@');
  expect({ status: directory.status, body: directory.body }).toMatchObject({ status: 200 });
  expect(directory.body.items[0]).toMatchObject({ id: String(target._id), active: true, version: 2 });
  expect(JSON.stringify(directory.body)).not.toMatch(/passwordHash|authSessions|googleSubject/);
});

test('staff edits protect owners and reject mass assignment, invalid grants and stale versions', async () => {
  const { user, token } = await staff();
  const valid = { expectedVersion: 0, permissions: ['orders.read'], reason: 'Read orders' };
  await patch(`/staff/${owner._id}`, valid, 'owner-target-denied').expect(403);
  await patch(`/staff/${user._id}`, valid, 'admin-cannot-grant', token).expect(403);
  for (const [index, bad] of [{ roles: ['OWNER'] }, { permissions: ['admin_users.manage'] }, { permissions: ['made.up'] }, { permissions: ['orders.read', 'orders.read'] }, { active: 'true' }, { passwordHash: 'injected' }].entries()) {
    await patch(`/staff/${user._id}`, { ...valid, ...bad }, `bad-staff-${index}`).expect(422);
  }
  expect((await db.models.User.findById(user._id)).permissions).toEqual([]);
  expect(await db.models.AdminCommand.countDocuments()).toBe(0);
});

test('staff suspend and reactivate preserve state graph while old sessions stay revoked', async () => {
  const { user, token } = await staff(['orders.read']);
  await patch(`/staff/${user._id}`, { expectedVersion: 0, active: false, reason: 'Temporary access pause' }, 'suspend-test-user').expect(200);
  expect((await db.models.User.findById(user._id)).status).toBe('SUSPENDED');
  await get('/orders', token).expect(401);
  await patch(`/staff/${user._id}`, { expectedVersion: 1, active: true, reason: 'Restore access' }, 'reactivate-test-user').expect(200);
  await get('/orders', token).expect(401);
  const restored = await auth.issueSession(db, user._id); await get('/orders', restored).expect(200);
});

test('staff suspension endpoint cannot become an unrelated customer deactivation route', async () => {
  const customerToken = await auth.register(db, { name: 'Customer', email: 'stay-customer@example.test', password: 'synthetic-customer-password' });
  const customer = await auth.sessionUser(db, customerToken);
  await patch(`/staff/${customer._id}`, { expectedVersion: 0, makeAdmin: false, active: false, reason: 'Invalid customer action' }, 'customer-status-blocked').expect(422);
  expect((await db.models.User.findById(customer._id)).status).toBe('ACTIVE');
  await expect(auth.sessionUser(db, customerToken)).resolves.toHaveProperty('email', customer.email);
});

test('reporting settings begin unset, require OWNER and accept no integration secrets or invented defaults', async () => {
  expect((await get('/settings').expect(200)).body.item).toEqual({ id: null, version: 0, timezone: null, currency: null });
  expect((await get('/session').expect(200)).body.reporting).toBeNull();
  const result = await patch('/settings', { expectedVersion: 0, timezone: 'Asia/Kolkata', currency: 'INR' }, 'reporting-settings').expect(200);
  expect(result.body).toMatchObject({ resource: 'settings', version: 1 });
  expect((await get('/session').expect(200)).body.reporting).toEqual({ timezone: 'Asia/Kolkata', currency: 'INR' });
  await patch('/settings', { expectedVersion: 0, timezone: 'UTC', currency: 'USD' }, 'stale-settings').expect(409);
  await patch('/settings', { expectedVersion: 1, timezone: 'Invalid/Zone', currency: 'INR' }, 'bad-timezone').expect(422);
  await patch('/settings', { expectedVersion: 1, timezone: 'UTC', currency: 'INR', apiSecret: 'fixture-only' }, 'settings-secret').expect(422);
});

test('persisted action rate limits survive app instances and separate read and sensitive budgets', async () => {
  const now = Date.now(); jest.spyOn(Date, 'now').mockReturnValue(now);
  for (let i = 0; i < 10; i++) await adminRateLimit(db, { actorId: owner.id, ip: 'fixture-ip', bucket: 'sensitive' });
  await expect(adminRateLimit(db, { actorId: owner.id, ip: 'fixture-ip', bucket: 'sensitive' })).rejects.toMatchObject({ status: 429 });
  await adminRateLimit(db, { actorId: owner.id, ip: 'fixture-ip', bucket: 'read' });
  const secondApp = createAuthApp({ db, origin });
  await request(secondApp).patch(base + '/settings').set('Origin', origin).set('Cookie', `b2c_session=${ownerToken}`).set('Idempotency-Key', 'rate-limited-app').send({ expectedVersion: 0, timezone: 'UTC', currency: 'INR' }).expect(429);
  expect(JSON.stringify(await db.models.AdminRate.find().lean())).not.toContain('fixture-ip');
});

test('password login attempts use a persisted IP bucket before password work', async () => {
  const login = jest.spyOn(auth, 'passwordLogin').mockRejectedValue(auth.failure('Invalid email or password'));
  for (let index = 0; index < 10; index++) await request(app).post('/api/v1/auth/login').set('Origin', origin).send({ email: 'unknown@example.test', password: 'fixture' }).expect(401);
  const secondApp = createAuthApp({ db, origin });
  await request(secondApp).post('/api/v1/auth/login').set('Origin', origin).send({ email: 'different@example.test', password: 'fixture' }).expect(429);
  expect(login).toHaveBeenCalledTimes(10);
});

test('malformed and oversized request errors never echo request secrets and admin JSON has a separate bound', async () => {
  const malformed = await request(app).patch(base + '/settings').set('Origin', origin).set('Cookie', `b2c_session=${ownerToken}`).set('Content-Type', 'application/json').send('{"password":"fixture-secret"').expect(400);
  expect(malformed.body).toEqual({ message: 'Invalid JSON request.' });
  expect(malformed.text).not.toContain('fixture-secret');
  await request(app).post('/api/v1/auth/register').set('Origin', origin).send({ value: 'x'.repeat(9000) }).expect(413);
  await patch('/settings', { expectedVersion: 0, timezone: 'UTC', currency: 'INR', value: 'x'.repeat(9000) }, 'admin-body-size').expect(422);
  await request(app).patch(base + '/settings').set('Origin', origin).send({ value: 'x'.repeat(140000) }).expect(413);
});

test('first-owner CLI bootstrap is explicit, audited, retry-safe and serialized across different targets', async () => {
  await db.models.User.collection.deleteMany({}); // Isolated fixture: no production bootstrap is invoked.
  const [a, b] = await Promise.all(['first', 'second'].map(name => auth.register(db, { name, email: `${name}@example.test`, password: 'synthetic-bootstrap-password' })));
  const [userA, userB] = await Promise.all([auth.sessionUser(db, a), auth.sessionUser(db, b)]);
  const results = await Promise.allSettled([bootstrapOwner(db, String(userA._id)), bootstrapOwner(db, String(userB._id))]);
  expect(results.filter(result => result.status === 'fulfilled')).toHaveLength(1);
  expect(await db.models.User.countDocuments({ roles: 'OWNER' })).toBe(1);
  const winner = await db.models.User.findOne({ roles: 'OWNER' });
  expect(await bootstrapOwner(db, String(winner._id))).toEqual({ alreadyProvisioned: true });
  expect(await db.models.AuditLog.countDocuments({ action: 'OWNER_BOOTSTRAPPED' })).toBe(1);
  const oldToken = String(winner._id) === String(userA._id) ? a : b;
  await expect(auth.sessionUser(db, oldToken)).rejects.toMatchObject({ status: 401 });
});

test('transaction command rechecks grants instead of trusting a previously authenticated actor', async () => {
  const { user, token } = await staff(['products.create']);
  await authenticateAdmin(db, token, 'products.create');
  const changed = await db.models.User.findById(user._id); changed.permissions = []; await changed.save();
  const handler = jest.fn();
  await expect(executeCommand(db, { token, permission: 'products.create', key: 'revoked-command', action: 'PRODUCT_CREATED', input: {} }, handler)).rejects.toMatchObject({ status: 403 });
  expect(handler).not.toHaveBeenCalled(); expect(await db.models.AdminCommand.countDocuments()).toBe(0);
});

test('revocation racing between command authorization and actor lock prevents the protected effect', async () => {
  const { user, token } = await staff(['products.create']);
  let unlock, announce;
  const gate = new Promise(resolve => { unlock = resolve; });
  const reached = new Promise(resolve => { announce = resolve; });
  const originalSave = db.models.User.prototype.save;
  let paused = false;
  const spy = jest.spyOn(db.models.User.prototype, 'save').mockImplementation(async function (...args) {
    if (!paused && String(this._id) === String(user._id) && this.isModified('adminCommandVersion')) {
      paused = true; announce(); await gate;
    }
    return originalSave.apply(this, args);
  });
  const handler = jest.fn();
  const pending = executeCommand(db, { token, permission: 'products.create', key: 'revocation-race-command', action: 'PRODUCT_CREATED', input: {} }, handler)
    .then(value => ({ value }), error => ({ error }));
  try {
    await reached;
    await patch(`/staff/${user._id}`, { expectedVersion: 0, permissions: [], reason: 'Remove product access' }, 'concurrent-revocation').expect(200);
    unlock();
    expect((await pending).error).toMatchObject({ status: 401 });
    expect(handler).not.toHaveBeenCalled();
    expect(await db.models.AdminCommand.countDocuments({ actorId: user._id })).toBe(0);
  } finally {
    unlock(); await pending; spy.mockRestore();
  }
});

test('Google return to /admin is state-bound and rejects arbitrary internal or external paths', async () => {
  const provider = { authorization: ({ state }) => `https://accounts.google.com/o/oauth2/v2/auth?state=${state}`, exchange: async () => ({ sub: 'admin-return-fixture', email: 'google-return@example.test', email_verified: true, given_name: 'Customer' }) };
  app = createAuthApp({ db, origin, clientId: 'fixture-client', clientSecret: 'fixture-secret', provider });
  for (const [next, expected] of [['/admin', '/admin'], ['/admin/settings', '/account'], ['//evil.example', '/account']]) {
    const agent = request.agent(app);
    const start = await agent.get('/api/v1/auth/google').query({ next }).expect(302);
    const state = new URL(start.headers.location).searchParams.get('state');
    const callback = await agent.get('/api/v1/auth/google/callback').query({ state, code: 'fixture', next: '//evil.example' }).expect(302);
    expect(callback.headers.location).toBe(origin + expected);
    await agent.get(base + '/session').expect(403);
  }
});
