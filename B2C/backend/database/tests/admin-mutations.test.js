const { MongoMemoryReplSet } = require('mongodb-memory-server');
const { connectDatabase, installSchema } = require('../client');
const { transaction } = require('../transactions/common');
const { createOrder, createPaymentAttempt } = require('../repositories');
const { moveStock } = require('../transactions/inventory');
const { confirmPayment } = require('../transactions/payments');
const { redeemCoupon } = require('../transactions/coupons');
const mutations = require('../../admin/mutations');

jest.setTimeout(120000);
let mongo, db, actor;
const address = { recipientName: 'Test Recipient', addressLine1: '1 Test Lane', city: 'Example', state: 'Example', postalCode: '000000', country: 'IN' };
beforeAll(async () => {
  mongo = await MongoMemoryReplSet.create({ replSet: { storageEngine: 'wiredTiger' }, instanceOpts: [{ launchTimeout: 60000 }] });
  db = await connectDatabase({ uri: mongo.getUri(), dbName: 'gourmet_b2c_schema_test_admin_mutations' });
  await installSchema(db);
});
beforeEach(async () => {
  const owner = await db.models.User.create({ email: 'owner@example.test', roles: ['OWNER'] });
  actor = { id: String(owner._id), role: 'OWNER', permissions: [] };
});
afterEach(async () => { if (db) for (const model of Object.values(db.models)) await model.collection.deleteMany({}); });
afterAll(async () => { if (db) await db.connection.close(); if (mongo) await mongo.stop(); });
// Handler checks complement the shared executeCommand auth/idempotency HTTP suite.
const invoke = (name, input) => transaction(db, session => mutations[name](db, session, actor, input));
async function catalogue() {
  const category = await invoke('createCategory', { name: 'Gifts', slug: 'gifts' });
  const product = await invoke('createProduct', { name: 'Gift', slug: 'gift', categoryIds: [category.id], status: 'ACTIVE' });
  const variant = await invoke('createVariant', { productId: product.id, sku: 'GIFT-001', priceMinor: 1000, currency: 'INR' });
  const inventory = await db.models.Inventory.findOne({ variantId: variant.id });
  return { category, product, variant, inventory };
}
async function order(f, suffix = '1', coupon) {
  const customer = await db.models.Customer.create({ firstName: 'Example', email: `buyer${suffix}@example.test` });
  const discount = coupon ? 100 : 0;
  return createOrder(db, {
    customerId: customer._id, orderNumber: `TEST-${suffix}`, status: 'PAYMENT_PENDING', idempotencyKey: `order-${suffix}`,
    items: [{ productId: f.product.id, variantId: f.variant.id, productName: 'Gift', sku: 'GIFT-001', quantity: 1, unitPriceMinor: 1000, discountMinor: discount, lineTotalMinor: 1000 - discount, currency: 'INR' }],
    pricing: { subtotalMinor: 1000, discountMinor: discount, grandTotalMinor: 1000 - discount, currency: 'INR' },
    customerSnapshot: { name: 'Example', email: customer.email }, shippingAddressSnapshot: address, billingAddressSnapshot: address,
    ...(coupon ? { coupon: { couponId: coupon._id, code: coupon.codeNormalized, discountMinor: discount } } : {}),
  });
}

test('product/variant creation is atomic, zero-stock and returns compact resource DTOs', async () => {
  const f = await catalogue();
  expect(f.product).toEqual({ resource: 'products', id: expect.any(String), version: 0 });
  expect(f.variant).toEqual({ resource: 'variants', id: expect.any(String), version: 0 });
  expect(f.inventory.availableQuantity).toBe(0);
  expect(f.inventory.reservedQuantity).toBe(0);
  expect(await db.models.InventoryTransaction.countDocuments()).toBe(0);
  await expect(invoke('createVariant', { productId: f.product.id, sku: 'GIFT-001', priceMinor: 1000, currency: 'INR' })).rejects.toMatchObject({ code: 11000 });
  expect(await db.models.ProductVariant.countDocuments()).toBe(1);
  expect(await db.models.Inventory.countDocuments()).toBe(1);
});

test('rejects mass assignment, nested injection, malformed IDs and coerced numeric strings', async () => {
  const f = await catalogue();
  for (const body of [
    { priceMinor: '100' }, { inventory: 999 }, { roles: ['OWNER'] }, { sku: 'CHANGED' },
    { attributes: { '$set': 'bad' } }, { media: [{ url: '/valid.jpg', secret: 'not-allowed' }] },
    { media: [{ url: '//external.example/image.png' }] }, { priceMinor: -1 }, { priceMinor: 1.5 },
  ]) {
    await expect(invoke('updateVariant', { id: f.variant.id, expectedVersion: 0, ...body })).rejects.toMatchObject({ status: 422 });
  }
  await expect(invoke('updateProduct', { id: 'not-an-id', expectedVersion: 0, name: 'Changed' })).rejects.toMatchObject({ status: 422 });
  await expect(invoke('updateProduct', { id: f.product.id, expectedVersion: 0, seo: { title: 'Normal', role: 'OWNER' } })).rejects.toMatchObject({ status: 422 });
  await expect(invoke('createCategory', { name: 'Bad', slug: 'bad', imageUrl: 'https://name:pass@example.test/image.png' })).rejects.toMatchObject({ status: 422 });
  expect((await db.models.ProductVariant.findById(f.variant.id)).priceMinor).toBe(1000);
});

test('concurrent edits reject stale expected version without overwriting a winner', async () => {
  const f = await catalogue();
  const changes = await Promise.allSettled(['First', 'Second'].map(name => invoke('updateProduct', { id: f.product.id, expectedVersion: 0, name })));
  expect(changes.filter(r => r.status === 'fulfilled')).toHaveLength(1);
  expect(changes.find(r => r.status === 'rejected').reason.status).toBe(409);
  const saved = await db.models.Product.findById(f.product.id);
  expect(['First', 'Second']).toContain(saved.name);
  expect(saved.__v).toBe(1);
});

test('archiving preserves product/order snapshots and disallows creating variants on archived product', async () => {
  const f = await catalogue(); const original = await order(f);
  await invoke('updateProduct', { id: f.product.id, expectedVersion: 0, name: 'Updated Gift', status: 'ARCHIVED' });
  expect((await db.models.Order.findById(original._id)).items[0].productName).toBe('Gift');
  await expect(invoke('createVariant', { productId: f.product.id, sku: 'OTHER', priceMinor: 500, currency: 'INR' })).rejects.toMatchObject({ status: 409 });
  expect(await db.models.Product.countDocuments()).toBe(1);
  await expect(invoke('updateProduct', { id: f.product.id, expectedVersion: 1, status: 'ACTIVE' })).rejects.toMatchObject({ status: 409 });
});

test('missing parent/category references return not-found and leave no partial catalogue records', async () => {
  const missing = '000000000000000000000001';
  await expect(invoke('createCategory', { name: 'Child', slug: 'child', parentId: missing })).rejects.toMatchObject({ status: 404 });
  await expect(invoke('createProduct', { name: 'Gift', slug: 'gift', categoryIds: [missing] })).rejects.toMatchObject({ status: 404 });
  expect(await db.models.Category.countDocuments()).toBe(0); expect(await db.models.Product.countDocuments()).toBe(0);
});

test('manual adjustment requires a reason and commits quantity, movement and audit together', async () => {
  const f = await catalogue(); const input = { id: String(f.inventory._id), expectedVersion: 0, quantity: 3, reason: 'Counted replenishment' };
  for (const body of [{ ...input, quantity: 0 }, { ...input, quantity: '3' }, { ...input, reason: '' }, { ...input, availableQuantity: 999 }]) {
    await expect(invoke('adjustInventory', body)).rejects.toMatchObject({ status: 422 });
  }
  const updated = await invoke('adjustInventory', input);
  expect(updated).toMatchObject({ resource: 'inventory', version: 1 });
  expect((await db.models.Inventory.findById(f.inventory._id)).availableQuantity).toBe(3);
  const movement = await db.models.InventoryTransaction.findOne();
  expect(movement.quantity).toBe(3); expect(String(movement.actorId)).toBe(actor.id);
  expect(await db.models.AuditLog.countDocuments({ action: 'INVENTORY_ADJUSTMENT' })).toBe(1);
  await expect(invoke('adjustInventory', { ...input, expectedVersion: 1, quantity: -4 })).rejects.toMatchObject({ status: 409 });
  expect((await db.models.Inventory.findById(f.inventory._id)).availableQuantity).toBe(3);
  expect(await db.models.InventoryTransaction.countDocuments()).toBe(1);
});

test('simultaneous inventory adjustments never double-spend a stale displayed balance', async () => {
  const f = await catalogue(); const input = { id: String(f.inventory._id), expectedVersion: 0, quantity: 1, reason: 'Count adjustment' };
  const results = await Promise.allSettled([invoke('adjustInventory', input), invoke('adjustInventory', input)]);
  expect(results.filter(r => r.status === 'fulfilled')).toHaveLength(1);
  expect(results.find(r => r.status === 'rejected').reason.status).toBe(409);
  expect((await db.models.Inventory.findById(f.inventory._id)).availableQuantity).toBe(1);
  expect(await db.models.InventoryTransaction.countDocuments()).toBe(1);
});

test('stock adjustment and last-stock reservation share one authoritative transaction balance', async () => {
  const f = await catalogue();
  await invoke('adjustInventory', { id: String(f.inventory._id), expectedVersion: 0, quantity: 1, reason: 'Opening count' });
  const pending = await order(f);
  const results = await Promise.allSettled([
    invoke('adjustInventory', { id: String(f.inventory._id), expectedVersion: 1, quantity: -1, reason: 'Damaged item' }),
    moveStock(db, { variantId: f.variant.id, type: 'RESERVATION', quantity: 1, orderId: pending._id, operationKey: 'checkout-reservation' }),
  ]);
  expect(results.filter(r => r.status === 'fulfilled')).toHaveLength(1);
  const saved = await db.models.Inventory.findById(f.inventory._id);
  expect(saved.availableQuantity).toBe(0); expect([0, 1]).toContain(saved.reservedQuantity);
});

test('inventory audit failure rolls back balance and ledger', async () => {
  const f = await catalogue();
  const audit = jest.spyOn(db.models.AuditLog, 'create').mockRejectedValueOnce(new Error('Synthetic audit failure'));
  try {
    await expect(invoke('adjustInventory', { id: String(f.inventory._id), expectedVersion: 0, quantity: 1, reason: 'Count adjustment' })).rejects.toThrow('Synthetic audit failure');
  } finally { audit.mockRestore(); }
  expect((await db.models.Inventory.findById(f.inventory._id)).availableQuantity).toBe(0);
  expect(await db.models.InventoryTransaction.countDocuments()).toBe(0);
});

test('coupon edits reject client usage counters and retain server-enforced redemption limits', async () => {
  const f = await catalogue();
  const created = await invoke('createCoupon', { code: 'onlyone', discountType: 'FIXED_AMOUNT', fixedAmountMinor: 100, currency: 'INR', usageLimit: 1 });
  let coupon = await db.models.Coupon.findById(created.id);
  const pending = await order(f, '1', coupon);
  await redeemCoupon(db, { couponId: coupon._id, orderId: pending._id });
  coupon = await db.models.Coupon.findById(created.id);
  await expect(invoke('updateCoupon', { id: created.id, expectedVersion: coupon.__v, totalUsed: 0 })).rejects.toMatchObject({ status: 422 });
  await expect(invoke('updateCoupon', { id: created.id, expectedVersion: coupon.__v, usageLimit: 0 })).rejects.toMatchObject({ status: 422 });
  await expect(invoke('createCoupon', { code: 'BAD', discountType: 'PERCENTAGE', percentageBps: 10001 })).rejects.toMatchObject({ status: 422 });
  await expect(invoke('createCoupon', { code: 'BAD', discountType: 'PERCENTAGE', percentageBps: 500, startsAt: '2026-02-30T00:00:00Z' })).rejects.toMatchObject({ status: 422 });
  await expect(invoke('createCoupon', { code: 'BAD', discountType: 'FIXED_AMOUNT', percentageBps: 500 })).rejects.toMatchObject({ status: 422 });
  await expect(invoke('createCoupon', { code: 'BAD', discountType: 'PERCENTAGE', percentageBps: 500, startsAt: '2026-10-02T00:00:00Z', expiresAt: '2026-10-01T00:00:00Z' })).rejects.toMatchObject({ status: 422 });
  await invoke('updateCoupon', { id: created.id, expectedVersion: coupon.__v, status: 'INACTIVE' });
  const saved = await db.models.Coupon.findById(created.id);
  expect(saved.totalUsed).toBe(1); expect(saved.status).toBe('INACTIVE');
});

test('only verified paid confirmed orders enter processing; no arbitrary payment or fulfillment writes', async () => {
  const f = await catalogue(); const pending = await order(f);
  await expect(invoke('beginOrderProcessing', { id: String(pending._id), expectedVersion: 0 })).rejects.toMatchObject({ status: 409 });
  await expect(invoke('beginOrderProcessing', { id: String(pending._id), expectedVersion: 0, paymentStatus: 'PAID' })).rejects.toMatchObject({ status: 422 });
  await moveStock(db, { variantId: f.variant.id, type: 'RESTOCK', quantity: 1, operationKey: 'open' });
  await moveStock(db, { variantId: f.variant.id, type: 'RESERVATION', quantity: 1, orderId: pending._id, operationKey: 'reserve' });
  const payment = await createPaymentAttempt(db, { orderId: pending._id, provider: 'test', idempotencyKey: 'attempt' });
  await confirmPayment(db, { provider: 'test', providerEventId: 'capture', paymentId: payment._id, providerPaymentId: 'provider-payment', amountMinor: 1000, currency: 'INR' });
  const paid = await db.models.Order.findById(pending._id);
  await invoke('beginOrderProcessing', { id: String(paid._id), expectedVersion: paid.__v });
  const processed = await db.models.Order.findById(paid._id);
  expect(processed.status).toBe('PROCESSING'); expect(processed.fulfillmentStatus).toBe('PROCESSING'); expect(processed.paymentStatus).toBe('PAID');
  expect(processed.pricing.grandTotalMinor).toBe(1000);
  await expect(invoke('beginOrderProcessing', { id: String(processed._id), expectedVersion: processed.__v })).rejects.toMatchObject({ status: 409 });
});
