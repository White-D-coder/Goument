const { MongoMemoryReplSet } = require('mongodb-memory-server');
const { Types } = require('mongoose');
const { connectDatabase, installSchema } = require('../client');
const { fingerprint } = require('../transactions/common');
const { createOrder, createPaymentAttempt, registerCustomer, saveAddress } = require('../repositories');
const { moveStock } = require('../transactions/inventory');
const { confirmPayment } = require('../transactions/payments');
const { requestRefund, setRefundState } = require('../transactions/refunds');
const { redeemCoupon } = require('../transactions/coupons');
const { customer360, page, ownerDashboard } = require('../queries');
const { seedDevelopment } = require('../seeds/development');
const { issueInvoice } = require('../transactions/invoices');
jest.setTimeout(120000);
let server, db;
const address = { recipientName: 'Demo Recipient', addressLine1: '1 Example Lane', city: 'Example City', state: 'Example State', postalCode: '000000', country: 'IN' };
beforeAll(async () => { server = await MongoMemoryReplSet.create({ replSet: { storageEngine: 'wiredTiger' } }); db = await connectDatabase({ uri: server.getUri(), dbName: 'gourmet_b2c_schema_test_suite' }); await installSchema(db); });
afterEach(async () => { if (db) for (const model of Object.values(db.models)) await model.collection.deleteMany({}); }); // Isolated test cleanup only.
afterAll(async () => { if (db) await db.connection.close(); if (server) await server.stop(); });
async function fixture(stock = 20) {
 const customer = await db.models.Customer.create({ firstName: 'Demo', email: 'customer@example.test' });
 const category = await db.models.Category.create({ name: 'Gifts', slug: 'gifts' });
 const product = await db.models.Product.create({ name: 'Example Box', slug: 'example-box', status: 'ACTIVE', categoryIds: [category._id] });
 const variant = await db.models.ProductVariant.create({ productId: product._id, sku: 'EXAMPLE-001', priceMinor: 1000, currency: 'INR' });
 const inventory = await db.models.Inventory.create({ variantId: variant._id, sku: variant.sku, availableQuantity: 0 });
 if (stock) await moveStock(db, { variantId: variant._id, type: 'RESTOCK', quantity: stock, operationKey: 'opening' });
 return { customer, category, product, variant, inventory };
}
function orderData(f, suffix = '1', discount = 0, coupon) {
 return { orderNumber: `TEST-${suffix}`, customerId: f.customer._id, status: 'PAYMENT_PENDING', idempotencyKey: `order-${suffix}`, items: [{ productId: f.product._id, variantId: f.variant._id, sku: f.variant.sku, productName: f.product.name, quantity: 1, unitPriceMinor: 1000, discountMinor: discount, taxMinor: 0, lineTotalMinor: 1000-discount, currency: 'INR' }], pricing: { subtotalMinor: 1000, discountMinor: discount, shippingMinor: 0, taxMinor: 0, grandTotalMinor: 1000-discount, currency: 'INR' }, shippingAddressSnapshot: address, billingAddressSnapshot: address, customerSnapshot: { name: 'Demo Customer', email: f.customer.email }, ...(coupon ? { coupon: { couponId: coupon._id, code: coupon.codeNormalized, discountMinor: discount } } : {}) };
}
async function pending(f, suffix = '1') {
 const order = await createOrder(db, orderData(f, suffix));
 await moveStock(db, { variantId: f.variant._id, quantity: 1, type: 'RESERVATION', orderId: order._id, operationKey: `reserve-${suffix}` });
 const payment = await createPaymentAttempt(db, { orderId: order._id, provider: 'test-provider', idempotencyKey: `pay-${suffix}` });
 return { order, payment, event: { provider: 'test-provider', providerEventId: `event-${suffix}`, paymentId: payment._id, providerPaymentId: `provider-payment-${suffix}`, amountMinor: 1000, currency: 'INR' } };
}
async function captured(f) { const p = await pending(f); await confirmPayment(db, p.event); return p; }
const successes = results => results.filter(r => r.status === 'fulfilled');

test('all24 collections and explicit unique/partial indexes install', async () => {
 expect(Object.keys(db.models)).toHaveLength(24);
 for (const model of Object.values(db.models)) { const actual = await model.collection.indexes(); for (const [, o] of model.schema.indexes()) { const found = actual.find(i => i.name === o.name); expect(found).toBeDefined(); if (o.unique) expect(found.unique).toBe(true); if(o.partialFilterExpression) expect(found.partialFilterExpression).toEqual(o.partialFilterExpression); } }
});
test('registration forces customer role, hides hash and enforces normalized uniqueness', async () => {
 const data = { firstName: 'Fake', email: 'Mixed@Example.test', password: 'synthetic-password-for-tests', roles: ['OWNER'] };
 const ids = await registerCustomer(db, data); const user = await db.models.User.findById(ids.userId);
 expect(user.roles).toEqual(['CUSTOMER']); expect(user.passwordHash).toBeUndefined();
 await expect(registerCustomer(db, {...data,email:'mixed@example.test'})).rejects.toThrow(); expect(await db.models.Customer.countDocuments()).toBe(1);
});
test('validates references, money units, stock bounds and password hash', async () => {
 const f = await fixture();
 await expect(db.models.ProductVariant.create({ productId:new Types.ObjectId(),sku:'BAD',priceMinor:100,currency:'INR' })).rejects.toThrow('Missing reference');
 await expect(db.models.ProductVariant.create({ productId:f.product._id,sku:'BAD',priceMinor:1.2,currency:'INR' })).rejects.toThrow();
 f.inventory.availableQuantity=-1;await expect(f.inventory.save()).rejects.toThrow();
 await expect(db.models.User.create({email:'bad@example.test',passwordHash:'plaintext'})).rejects.toThrow();
});
test('Mongo validator rejects native negative inventory update', async () => {
 const f=await fixture();await expect(db.models.Inventory.collection.updateOne({_id:f.inventory._id},{$set:{availableQuantity:-1}})).rejects.toMatchObject({code:121});
});
test('last-stock race permits one reservation', async () => {
 const f=await fixture(1);const a=await createOrder(db,orderData(f,'a'));const b=await createOrder(db,orderData(f,'b'));
 const result=await Promise.allSettled([a,b].map((o,n)=>moveStock(db,{variantId:f.variant._id,type:'RESERVATION',quantity:1,orderId:o._id,operationKey:`race-${n}`})));
 expect(successes(result)).toHaveLength(1);expect(await db.models.Inventory.findById(f.inventory._id).lean()).toMatchObject({availableQuantity:0,reservedQuantity:1});expect(await db.models.InventoryTransaction.countDocuments({type:'RESERVATION'})).toBe(1);
});
test('inventory idempotency refuses changed payload', async () => {
 const f=await fixture();const input={variantId:f.variant._id,type:'RESTOCK',quantity:2,operationKey:'repeat'};await moveStock(db,input);await moveStock(db,input);
 await expect(moveStock(db,{...input,quantity:3})).rejects.toThrow('Idempotency');expect((await db.models.Inventory.findById(f.inventory._id)).availableQuantity).toBe(22);
});
test('duplicate webhook commits payment/order/stock/ledger once', async () => {
 const f=await fixture();const p=await pending(f);await Promise.all([confirmPayment(db,p.event),confirmPayment(db,p.event)]);
 expect(await db.models.PaymentEvent.countDocuments()).toBe(1);expect(await db.models.FinanceEvent.countDocuments({type:'PAYMENT'})).toBe(1);expect(await db.models.InventoryTransaction.countDocuments({type:'SALE'})).toBe(1);
 expect((await db.models.Payment.findById(p.payment._id)).status).toBe('CAPTURED');expect((await db.models.Order.findById(p.order._id)).status).toBe('CONFIRMED');
 await confirmPayment(db,{...p.event,providerEventId:'second-event'});expect(await db.models.FinanceEvent.countDocuments()).toBe(1);
});
test('payment mismatch rolls back and event replay checks its digest', async () => {
 const f=await fixture();const p=await pending(f);await expect(confirmPayment(db,{...p.event,amountMinor:900})).rejects.toThrow('mismatch');expect(await db.models.PaymentEvent.countDocuments()).toBe(0);expect((await db.models.Inventory.findById(f.inventory._id)).reservedQuantity).toBe(1);
 await confirmPayment(db,p.event);await expect(confirmPayment(db,{...p.event,currency:'USD'})).rejects.toThrow('Idempotency');
});
test('two payment attempts cannot capture one order twice', async () => {
 const f=await fixture();const p=await pending(f);const second=await createPaymentAttempt(db,{orderId:p.order._id,provider:'test-provider',idempotencyKey:'second'});
 const result=await Promise.allSettled([confirmPayment(db,p.event),confirmPayment(db,{...p.event,paymentId:second._id,providerEventId:'other-event',providerPaymentId:'other-payment'})]);expect(successes(result)).toHaveLength(1);expect(await db.models.FinanceEvent.countDocuments({type:'PAYMENT'})).toBe(1);
});
test('refund race includes pending reservations in refundable amount', async () => {
 const f=await fixture();const p=await captured(f);const result=await Promise.allSettled(['a','b'].map(idempotencyKey=>requestRefund(db,{paymentId:p.payment._id,amountMinor:700,idempotencyKey})));
 expect(successes(result)).toHaveLength(1);expect(await db.models.Refund.countDocuments()).toBe(1);
});
test('refund completion/replay preserves original order total', async () => {
 const f=await fixture();const p=await captured(f);const r=await requestRefund(db,{paymentId:p.payment._id,amountMinor:400,idempotencyKey:'refund1'});
 await setRefundState(db,r._id,'PROCESSING');await setRefundState(db,r._id,'COMPLETED','provider-refund1');await setRefundState(db,r._id,'COMPLETED','provider-refund1');
 expect(await db.models.FinanceEvent.countDocuments({type:'REFUND'})).toBe(1);expect((await db.models.Order.findById(p.order._id)).pricing.grandTotalMinor).toBe(1000);expect((await db.models.Payment.findById(p.payment._id)).status).toBe('PARTIALLY_REFUNDED');
 await expect(requestRefund(db,{paymentId:p.payment._id,amountMinor:401,idempotencyKey:'refund1'})).rejects.toThrow('Idempotency');
});
test.each(['global','customer'])('coupon %s usage race permits one redemption', async kind => {
 const f=await fixture();const c=await db.models.Coupon.create({code:'ONE',discountType:'FIXED_AMOUNT',fixedAmountMinor:100,currency:'INR',...(kind==='global'?{usageLimit:1}:{perCustomerLimit:1})});
 const a=await createOrder(db,orderData(f,'a',100,c));const b=await createOrder(db,orderData(f,'b',100,c));const results=await Promise.allSettled([a,b].map(o=>redeemCoupon(db,{couponId:c._id,orderId:o._id})));
 expect(successes(results)).toHaveLength(1);expect(await db.models.CouponRedemption.countDocuments()).toBe(1);expect((await db.models.Coupon.findById(c._id)).totalUsed).toBe(1);
});
test('historical snapshots survive mutable source edits and refuse direct mutation', async () => {
 const f=await fixture();const o=await createOrder(db,orderData(f));f.product.name='New name';await f.product.save();f.customer.firstName='Changed';await f.customer.save();
 const saved=await db.models.Order.findById(o._id);expect(saved.items[0].productName).toBe('Example Box');expect(saved.customerSnapshot.name).toBe('Demo Customer');saved.items[0].unitPriceMinor=500;await expect(saved.save()).rejects.toThrow('immutable');
 await expect(db.models.Order.updateOne({_id:o._id},{$set:{status:'DELIVERED'}})).rejects.toThrow('guarded');
});
test('invalid transition and append-only/secret audit guards', async () => {
 const f=await fixture();const o=await createOrder(db,orderData(f));o.status='DELIVERED';await expect(o.save()).rejects.toThrow('transition');
 const audit=await db.models.AuditLog.create({action:'TEST',entityType:'orders'});audit.action='REWRITE';await expect(audit.save()).rejects.toThrow('append-only');
 await expect(db.models.AuditLog.create({action:'BAD',entityType:'users',newState:{passwordHash:'secret'}})).rejects.toThrow('credentials');
});
test('concurrent default addresses serialize and enforce ownership', async () => {
 const f=await fixture();await Promise.all([1,2].map(n=>saveAddress(db,f.customer._id,{...address,addressLine1:`Example ${n}`,isDefaultShipping:true})));expect(await db.models.CustomerAddress.countDocuments({isDefaultShipping:true})).toBe(1);
 const other=await db.models.Customer.create({firstName:'Other',email:'other@example.test'});const saved=await db.models.CustomerAddress.findOne();await expect(saveAddress(db,other._id,address,saved._id)).rejects.toThrow('owner');
});
test('Customer360 paginates1000 orders using customer history index', async () => {
 const f=await fixture();for(let offset=0;offset<1000;offset+=25) await Promise.all(Array.from({length:25},(_,n)=>db.models.Order.create({...orderData(f,String(offset+n)),requestHash:fingerprint({n:offset+n})})));
 const r=await customer360(db,f.customer._id,{limit:10});expect(r.orders.items).toHaveLength(10);expect(r.customer.orders).toBeUndefined();const second=await page(db.models.Order,{customerId:f.customer._id},{limit:10,after:r.orders.next});expect(new Set([...r.orders.items,...second.items].map(o=>String(o._id))).size).toBe(20);
 const explain=await db.models.Order.find({customerId:f.customer._id}).sort({createdAt:-1,_id:-1}).limit(10).explain('executionStats');expect(JSON.stringify(explain.queryPlanner.winningPlan)).toContain('customer_order_history');
});
test('owner queries report captures separately from refunds with limits', async () => {
 const f=await fixture();await captured(f);const report=await ownerDashboard(db,{from:'2000-01-01',to:'2100-01-01',currency:'INR',limit:5});expect(report.orderCount).toBe(1);expect(report.capturedMinor).toBe(1000);expect(report.refundedMinor).toBe(0);expect(report.topProducts[0].quantity).toBe(1);
 await expect(customer360(db,f.customer._id,{limit:10000})).rejects.toThrow('limit');
});
test('optional provider IDs allow absence but enforce present uniqueness', async () => {
 const f=await fixture();const order=await createOrder(db,orderData(f));const a=await createPaymentAttempt(db,{orderId:order._id,provider:'test',idempotencyKey:'a'});const b=await createPaymentAttempt(db,{orderId:order._id,provider:'test',idempotencyKey:'b'});
 a.providerPaymentId='same';await a.save();b.providerPaymentId='same';await expect(b.save()).rejects.toMatchObject({code:11000});
});
test('invoice freezes snapshots and issues through validated staff transaction', async () => {
 const f=await fixture();const o=await createOrder(db,orderData(f));const owner=await db.models.User.create({email:'owner@example.test',roles:['OWNER']});
 const invoice=await db.models.Invoice.create({orderId:o._id,customerId:f.customer._id,sellerSnapshot:{name:'Example Seller'},customerSnapshot:{name:'Demo Customer',billingAddress:address},items:[{description:'Gift',quantity:1,unitPriceMinor:1000,discountMinor:0,taxMinor:0,totalMinor:1000}],...o.pricing.toObject()});
 await issueInvoice(db,{invoiceId:invoice._id,invoiceNumber:'DEMO-1',actorId:owner._id});const saved=await db.models.Invoice.findById(invoice._id);const altered=await db.models.Invoice.findById(invoice._id);altered.documentUrl='https://example.com/replacement.pdf';await expect(altered.save()).rejects.toThrow('immutable');saved.sellerSnapshot.name='Rewrite';await expect(saved.save()).rejects.toThrow('immutable');
});
test('fake seed is idempotent and cannot double opening stock', async () => {
 await seedDevelopment(db,'synthetic-development-password');await seedDevelopment(db,'synthetic-development-password');expect(await db.models.User.countDocuments()).toBe(3);expect((await db.models.Inventory.findOne()).availableQuantity).toBe(10);expect(await db.models.InventoryTransaction.countDocuments()).toBe(1);
});

test('cross-record customer and variant identities are checked', async () => {
 const f=await fixture();const order=await createOrder(db,orderData(f));
 const other=await db.models.Customer.create({firstName:'Other',email:'different@example.test'});
 await expect(db.models.Shipment.create({orderId:order._id,customerId:other._id})).rejects.toThrow('customer mismatch');
 const invalid=orderData(f,'bad');invalid.items[0].sku='WRONG';await expect(createOrder(db,invalid)).rejects.toThrow('SKU mismatch');
});
test('transaction rolls back stock/payment when ledger insertion fails', async () => {
 const f=await fixture();const p=await pending(f);
 // Existing conflicting event key simulates corrupted/imported state; all capture writes must roll back.
 await db.models.FinanceEvent.create({type:'ADJUSTMENT',amountMinor:0,currency:'INR',direction:'CREDIT',eventKey:`payment:${p.payment._id}`});
 await expect(confirmPayment(db,p.event)).rejects.toThrow();
 expect((await db.models.Payment.findById(p.payment._id)).status).toBe('CREATED');
 expect((await db.models.Order.findById(p.order._id)).status).toBe('PAYMENT_PENDING');
 expect((await db.models.Inventory.findById(f.inventory._id)).reservedQuantity).toBe(1);
 expect(await db.models.InventoryTransaction.countDocuments({type:'SALE'})).toBe(0);
 expect(await db.models.PaymentEvent.countDocuments()).toBe(0);
});
test('invalid quote arithmetic and order key payload conflict are rejected', async () => {
 const f=await fixture();const input=orderData(f);const o=await createOrder(db,input);expect(String((await createOrder(db,input))._id)).toBe(String(o._id));
 await expect(createOrder(db,{...input,orderNumber:'changed'})).rejects.toThrow('Idempotency');
 const bad=orderData(f,'bad-total');bad.pricing.grandTotalMinor=999;await expect(createOrder(db,bad)).rejects.toThrow('totals');
});
test('cart owner exclusivity, duplicate variants and expiry TTL are specified', async () => {
 const f=await fixture();
 await expect(db.models.Cart.create({customerId:f.customer._id,sessionId:'guest'})).rejects.toThrow('exactly one');
 await expect(db.models.Cart.create({sessionId:'guest'})).rejects.toThrow('expiry');
 await expect(db.models.Cart.create({customerId:f.customer._id,items:[{variantId:f.variant._id,quantity:1},{variantId:f.variant._id,quantity:1}]})).rejects.toThrow('Duplicate');
 const indexes=await db.models.Cart.collection.indexes();expect(indexes.find(i=>i.name==='cart_expiry').expireAfterSeconds).toBe(0);
});
