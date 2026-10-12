'use strict';
const { MongoMemoryReplSet } = require('mongodb-memory-server');
const request = require('supertest');
const crypto = require('crypto');
const { connectDatabase, installSchema } = require('../client');
const { createAuthApp } = require('../../auth/app');
const auth = require('../../auth/service');
const { provisionCatalogue } = require('../../gifting/catalogue');
const { prepareOrder, expireReservations, quote, HOLD_MS } = require('../../gifting/checkout');
const { startPayment, verifyPayment, webhook } = require('../../payments/service');
const { razorpayGateway } = require('../../payments/razorpay');
const { serialize } = require('../../admin/resources');
jest.setTimeout(120000);
let mongo, db, gateway;
const origin = 'http://localhost:3001';
beforeAll(async () => { mongo = await MongoMemoryReplSet.create({ replSet: { storageEngine: 'wiredTiger' } }); db = await connectDatabase({ uri: mongo.getUri(), dbName: 'gourmet_b2c_schema_test_gift_checkout' }); await installSchema(db); });
beforeEach(async () => { await provisionCatalogue(db, 100); gateway = razorpayGateway({ keyId: 'rzp_test_example', keySecret: 'test-secret', webhookSecret: 'test-hook' }); gateway.createOrder = jest.fn(async body => ({ ...body, id: 'order_fixture' })); });
afterEach(async () => { for (const m of Object.values(db.models)) await m.collection.deleteMany({}); });
afterAll(async () => { if (db) await db.connection.close(); if (mongo) await mongo.stop(); });
async function fixture(rows = [{ id: 'ivory_hamper', quantity: 1 }], suffix = '') {
  const token = await auth.register(db, { name: 'Fixture buyer', email: `buyer${suffix}@example.test`, password: 'test-password-long' });
  const { customer } = await auth.identity(db, token);
  const draft = await db.models.GiftDraft.create({ ownerHash: crypto.randomBytes(32).toString('hex'), items: rows });
  const address = await db.models.CustomerAddress.create({ customerId: customer._id, recipientName: 'Fixture recipient', addressLine1: 'Test street', city: 'Mumbai', state: 'Maharashtra', postalCode: '400001', country: 'IN' });
  const quoted = await quote(db, draft);
  return { token, customer, draft, address, input: { customerId: customer._id, ownerHash: draft.ownerHash, addressId: String(address._id), revision: draft.__v + 1, expectedTotalMinor: quoted.pricing.grandTotalMinor } };
}
async function captured(order, customer) {
  const options = await startPayment(db, gateway, customer._id, String(order._id));
  const remote = { id: 'pay_fixture', order_id: options.order_id, amount: options.amount, currency: 'INR', status: 'captured', captured: true };
  gateway.fetchPayment = jest.fn(async () => remote);
  const body = { orderId: String(order._id), razorpay_order_id: remote.order_id, razorpay_payment_id: remote.id, razorpay_signature: crypto.createHmac('sha256', 'test-secret').update(`${remote.order_id}|${remote.id}`).digest('hex') };
  return { remote, body };
}
test('opening stock is ledger-backed and rerun never resets consumed stock; India alias shares one pool', async () => {
  expect(await db.models.Product.countDocuments()).toBe(20);
  expect(await db.models.ProductVariant.countDocuments()).toBe(29);
  expect(await db.models.InventoryTransaction.countDocuments({ type: 'RESTOCK' })).toBe(29);
  const f = await fixture([{ id: 'india_hamper', quantity: 1 }, { id: 'india_hamper_burgundy', quantity: 1 }]);
  const order = await prepareOrder(db, f.input); expect(order.items).toHaveLength(1); expect(order.items[0].quantity).toBe(2);
  expect(await provisionCatalogue(db, 100)).toMatchObject({ created: 0 });
  const inventory = await db.models.Inventory.findOne({ variantId: order.items[0].variantId }); expect(inventory.availableQuantity).toBe(98); expect(inventory.reservedQuantity).toBe(2);
});
test('server quote preserves both pack prices, GST inside total, names and admin snapshots', async () => {
  const f = await fixture([{ id: 'preview-envelope-ep1', quantity: 2, personalisation: { mode: 'PRINT', name: 'Fixture Twenty' } }, { id: 'preview-envelope-ep1-pack-10', quantity: 1, personalisation: { mode: 'PRINT', name: 'Fixture Ten' } }]);
  const before = Date.now(); const order = await prepareOrder(db, f.input);
  expect(order.pricing.grandTotalMinor).toBe(649700); expect(order.pricing.shippingMinor).toBe(0);
  expect(order.pricing.subtotalMinor + order.pricing.taxMinor).toBe(649700);
  expect(order.items.map(i => i.inclusiveUnitPriceMinor)).toEqual([249900, 149900]);
  expect(order.checkout.expiresAt.getTime()).toBeGreaterThanOrEqual(before + HOLD_MS);
  const dto = serialize('orders', order.toObject(), true); expect(dto.items[0].personalisation.name).toBe('Fixture Twenty'); expect(dto.items[1].variantName).toBe('Pack of 10');
});
test('new bookmark designs preserve independent stock and approved inclusive prices beside original bookmarks', async () => {
  const f = await fixture([{ id: 'vibrant_art_bookmarks', quantity: 2 }, { id: 'wanderlust_bookmarks', quantity: 1 }, { id: 'bookmarks', quantity: 1 }]);
  const order = await prepareOrder(db, f.input);
  expect(order.pricing.grandTotalMinor).toBe(139600);
  expect(order.items.map(item => item.inclusiveUnitPriceMinor)).toEqual([34900, 34900, 34900]);
  expect(new Set(order.items.map(item => String(item.variantId))).size).toBe(3);
  for (const item of order.items) {
    const stock = await db.models.Inventory.findOne({ variantId: item.variantId });
    expect(stock.availableQuantity).toBe(100 - item.quantity); expect(stock.reservedQuantity).toBe(item.quantity);
  }
});
test('duplicate concurrent order requests reserve once; changed payload cannot reuse checkout', async () => {
  const f = await fixture(); const orders = await Promise.all([prepareOrder(db, f.input), prepareOrder(db, f.input)]);
  expect(String(orders[0]._id)).toBe(String(orders[1]._id)); expect(await db.models.Order.countDocuments()).toBe(1);
  expect(await db.models.InventoryTransaction.countDocuments({ type: 'RESERVATION' })).toBe(1);
  await expect(prepareOrder(db, { ...f.input, expectedTotalMinor: 1 })).rejects.toBeTruthy();
});
test('two buyers racing for final units cannot oversell or leave a partial order', async () => {
  const a = await fixture([{ id: 'ivory_hamper', quantity: 99 }], 'a'); const b = await fixture([{ id: 'ivory_hamper', quantity: 99 }], 'b');
  const results = await Promise.allSettled([prepareOrder(db, a.input), prepareOrder(db, b.input)]);
  expect(results.filter(r => r.status === 'fulfilled')).toHaveLength(1); expect(await db.models.Order.countDocuments()).toBe(1);
  const inventory = await db.models.Inventory.findOne({ sku: 'GIFT-IVORY-HAMPER' }); expect(inventory.availableQuantity).toBe(1); expect(inventory.reservedQuantity).toBe(99);
});
test('foreign address, stale revision, altered price, missing name and unsupported boxes fail without reservations', async () => {
  const a = await fixture(undefined, 'a'); const b = await fixture(undefined, 'b');
  for (const input of [{ ...a.input, addressId: String(b.address._id) }, { ...a.input, revision: 10 }, { ...a.input, expectedTotalMinor: 100 }]) await expect(prepareOrder(db, input)).rejects.toBeTruthy();
  const unnamed = await db.models.GiftDraft.create({ ownerHash: 'f'.repeat(64), items: [{ id: 'preview-envelope-ep1-pack-10', quantity: 1 }] });
  await expect(quote(db, unnamed)).rejects.toMatchObject({ status: 409 });
  a.draft.boxes = [{ id: 'box-unknown', quantity: 1 }]; await a.draft.save(); await expect(quote(db, a.draft)).rejects.toMatchObject({ status: 409 });
  expect(await db.models.Order.countDocuments()).toBe(0); expect(await db.models.InventoryTransaction.countDocuments({ type: 'RESERVATION' })).toBe(0);
});
test('successful signed capture and repeated webhook deduct stock/finance once and clear only unchanged draft', async () => {
  const f = await fixture(); const order = await prepareOrder(db, f.input); const { body, remote } = await captured(order, f.customer);
  expect((await db.models.GiftDraft.findById(f.draft._id)).items).toHaveLength(1);
  const raw = Buffer.from(JSON.stringify({ event: 'payment.captured', payload: { payment: { entity: remote } } }));
  const signature = crypto.createHmac('sha256', 'test-hook').update(raw).digest('hex');
  await Promise.all([verifyPayment(db, gateway, f.customer._id, body), webhook(db, gateway, raw, signature), webhook(db, gateway, raw, signature)]);
  expect((await db.models.Order.findById(order._id)).paymentStatus).toBe('PAID'); expect((await db.models.GiftDraft.findById(f.draft._id)).items).toHaveLength(0);
  const stock = await db.models.Inventory.findOne({ variantId: order.items[0].variantId }); expect(stock.availableQuantity).toBe(99); expect(stock.reservedQuantity).toBe(0);
  expect(await db.models.InventoryTransaction.countDocuments({ type: 'SALE' })).toBe(1); expect(await db.models.FinanceEvent.countDocuments({ type: 'PAYMENT' })).toBe(1);
});
test('capture preserves cart edits made after reserving', async () => {
  const f = await fixture(); const order = await prepareOrder(db, f.input); const { body } = await captured(order, f.customer);
  const draft = await db.models.GiftDraft.findById(f.draft._id); draft.items.push({ id: 'bookmarks', quantity: 1 }); await draft.save();
  await verifyPayment(db, gateway, f.customer._id, body); expect((await db.models.GiftDraft.findById(draft._id)).items).toHaveLength(2);
});
test('five-minute expiry releases once and payment cannot restart; retry creates a fresh hold', async () => {
  const f = await fixture(); const order = await prepareOrder(db, f.input);
  await expireReservations(db, { now: new Date(order.checkout.expiresAt.getTime() + 1) }); await expireReservations(db, { now: new Date(order.checkout.expiresAt.getTime() + 1) });
  expect((await db.models.Order.findById(order._id)).status).toBe('CANCELLED'); expect(await db.models.InventoryTransaction.countDocuments({ type: 'RELEASE' })).toBe(1);
  await expect(startPayment(db, gateway, f.customer._id, String(order._id))).rejects.toMatchObject({ status: 409 });
  const draft = await db.models.GiftDraft.findById(f.draft._id); const next = await prepareOrder(db, { ...f.input, revision: draft.__v + 1 }); expect(String(next._id)).not.toBe(String(order._id));
});
test('late captured payment is durably recorded for review, never oversells or falsely marks order paid', async () => {
  const f = await fixture(); const order = await prepareOrder(db, f.input); const { body } = await captured(order, f.customer);
  await expireReservations(db, { now: new Date(order.checkout.expiresAt.getTime() + 1) });
  expect(await verifyPayment(db, gateway, f.customer._id, body)).toMatchObject({ status: 'REQUIRES_REVIEW' }); await verifyPayment(db, gateway, f.customer._id, body);
  expect((await db.models.Order.findById(order._id)).status).toBe('CANCELLED'); expect((await db.models.Order.findById(order._id)).paymentStatus).toBe('PENDING');
  expect(await db.models.PaymentEvent.countDocuments({ status: 'FAILED' })).toBe(1); expect(await db.models.FinanceEvent.countDocuments()).toBe(1); expect(await db.models.InventoryTransaction.countDocuments({ type: 'SALE' })).toBe(0);
});
test('expiry racing signed capture produces one terminal stock outcome and one money receipt', async () => {
  const f = await fixture(); const order = await prepareOrder(db, f.input); const { body } = await captured(order, f.customer);
  await Promise.all([verifyPayment(db, gateway, f.customer._id, body), expireReservations(db, { now: new Date(order.checkout.expiresAt.getTime() + 1) })]);
  const current = await db.models.Order.findById(order._id); const stock = await db.models.Inventory.findOne({ variantId: order.items[0].variantId });
  expect(['CANCELLED', 'CONFIRMED']).toContain(current.status); expect(stock.reservedQuantity).toBe(0); expect(stock.availableQuantity).toBe(current.status === 'CONFIRMED' ? 99 : 100);
  expect(await db.models.InventoryTransaction.countDocuments({ type: { $in: ['SALE', 'RELEASE'] } })).toBe(1); expect(await db.models.FinanceEvent.countDocuments()).toBe(1);
});
test('capture transaction rechecks an elapsed deadline even without prior expiry cleanup', async () => {
  const f = await fixture(); const order = await prepareOrder(db, f.input); await captured(order, f.customer);
  // Immutable production field; direct collection update only creates this timing fixture.
  await db.models.Order.collection.updateOne({ _id: order._id }, { $set: { 'checkout.expiresAt': new Date(Date.now() - 1) } });
  const payment = await db.models.Payment.findOne({ orderId: order._id });
  const input = { provider: 'razorpay', providerEventId: 'captured:pay_deadline', paymentId: payment._id, providerPaymentId: 'pay_deadline', amountMinor: payment.amountMinor, currency: payment.currency };
  const { confirmPayment } = require('../transactions/payments');
  expect((await confirmPayment(db, input)).status).toBe('FAILED');
  await confirmPayment(db, input);
  expect((await db.models.Order.findById(order._id)).status).toBe('CANCELLED');
  expect(await db.models.InventoryTransaction.countDocuments({ type: 'RELEASE' })).toBe(1);
  expect(await db.models.InventoryTransaction.countDocuments({ type: 'SALE' })).toBe(0);
  expect(await db.models.FinanceEvent.countDocuments()).toBe(1);
});
test('unconfigured HTTP checkout refuses order creation and expiry endpoint needs secret', async () => {
  const app = createAuthApp({ db, origin, maintenanceSecret: 'x'.repeat(32) });
  await request(app).get('/api/v1/auth/gift/maintenance/expire').expect(401);
  await request(app).get('/api/v1/auth/gift/maintenance/expire').set('Authorization', `Bearer ${'x'.repeat(32)}`).expect(200);
  await request(app).post('/api/v1/auth/gift/order').set('Origin', origin).send({}).expect(401);
});
test('HTTP delivery review creates a reserved payable order and resumes it without duplicate reservations', async () => {
  const app = createAuthApp({ db, origin, paymentGateway: gateway }); const agent = request.agent(app); const base = '/api/v1/auth/gift';
  await agent.post('/api/v1/auth/register').set('Origin', origin).send({ name: 'Fixture buyer', email: 'http@example.test', password: 'test-password-long' }).expect(201);
  await agent.get(base + '/draft').expect(200);
  const items = [{ id: 'preview-envelope-ep1-pack-10', quantity: 2, personalisation: { mode: 'PRINT', name: 'HTTP fixture' } }];
  await agent.put(base + '/draft').set('Origin', origin).send({ revision: 0, boxes: [], items }).expect(200);
  const review = (await agent.get(base + '/checkout').expect(200)).body; expect(review.pricing.grandTotalMinor).toBe(299800); expect(review.selection.items[0].packSize).toBe(10);
  const savedAddress = (await agent.post(base + '/address').set('Origin', origin).send({ recipientName: 'Fixture', phone: '9876543210', addressLine1: 'Test lane', city: 'Mumbai', state: 'Maharashtra', postalCode: '400001', country: 'IN' }).expect(200)).body;
  expect(savedAddress.paymentAvailable).toBe(true); const address = savedAddress.address;
  const body = { revision: review.revision, expectedTotalMinor: review.pricing.grandTotalMinor, addressId: address.id };
  await agent.post(base + '/order').set('Origin', origin).send({ ...body, amount: 1 }).expect(400);
  const order = (await agent.post(base + '/order').set('Origin', origin).send(body).expect(200)).body;
  expect((await agent.post(base + '/order').set('Origin', origin).send(body).expect(200)).body.orderId).toBe(order.orderId);
  expect((await agent.post(base + '/checkout-check').set('Origin', origin).send({}).expect(200)).body.next).toBe(`/checkout?order=${order.orderId}`);
  expect(await db.models.InventoryTransaction.countDocuments({ type: 'RESERVATION' })).toBe(1);
  expect((await agent.get(`/api/v1/auth/payments/orders/${order.orderId}`).expect(200)).body.order.items[0].packName).toBe('Pack of 10');
  await request(app).get(`/api/v1/auth/payments/orders/${order.orderId}`).expect(401);
  // Opening checkout itself recovers expired stock before evaluating availability.
  await db.models.Order.collection.updateOne({ _id: new (require('mongoose').Types.ObjectId)(order.orderId) }, { $set: { 'checkout.expiresAt': new Date(Date.now() - 1) } });
  expect((await agent.post(base + '/checkout-check').set('Origin', origin).send({}).expect(200)).body.next).toBe('/checkout');
  expect(await db.models.InventoryTransaction.countDocuments({ type: 'RELEASE' })).toBe(1);
});
test('public catalogue exposes approved prices/pack options without internal mapping metadata', async () => {
  const app = require('express')(); require('../../catalogue/routes').mountCatalogue(app, db);
  const result = (await request(app).get('/api/v1/products/lotus-shagun-envelope').expect(200)).body.data;
  expect(result.basePrice).toBe(249900); expect(result.inventory).toBe(100); expect(result.variants.map(v => v.price).sort()).toEqual([149900,249900]);
  expect(result.giftItemId).toBe('preview-envelope-ep1'); expect(JSON.stringify(result)).not.toMatch(/attributes|taxRateBps|reservedQuantity/);
});
