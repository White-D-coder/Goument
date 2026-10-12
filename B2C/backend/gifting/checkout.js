'use strict';
const { Types } = require('mongoose');
const { transaction, fingerprint, audit } = require('../database/transactions/common');
const { applyStock } = require('../database/transactions/inventory');
const { saleableRows } = require('./catalogue');
const { requirePersonalisation } = require('./personalisation');
const { failure } = require('../payments/razorpay');
const HOLD_MS = 5 * 60 * 1000;
const addressFields = ['recipientName', 'phone', 'email', 'addressLine1', 'addressLine2', 'landmark', 'city', 'state', 'postalCode', 'country'];

async function quote(db, draft, session) {
  if (!draft?.items.length) throw failure('Add items to your bag before checkout.', 409);
  if (draft.boxes?.length) throw failure('Separate gift-box selections are not available for payment. Remove the box selection first.', 409);
  requirePersonalisation(draft);
  const rows = await saleableRows(db, draft.items, session);
  const aggregated = new Map();
  for (const { row, variant, product, inventory } of rows) {
    const key = String(variant._id);
    const prior = aggregated.get(key);
    if (prior) { prior.quantity += row.quantity; continue; }
    const inclusiveUnitPriceMinor = variant.priceMinor;
    const unitPriceMinor = Math.round(inclusiveUnitPriceMinor * 10000 / 11800);
    aggregated.set(key, { giftItemId: variant.attributes.get('giftItemId'), productId: product._id, variantId: variant._id, sku: variant.sku, productName: product.name, variantName: variant.name, quantity: row.quantity, unitPriceMinor, inclusiveUnitPriceMinor, taxRateBps: 1800, currency: 'INR', ...(row.personalisation?.mode === 'PRINT' ? { personalisation: { mode: 'PRINT', name: row.personalisation.name } } : {}), availableQuantity: inventory.availableQuantity });
  }
  const items = [...aggregated.values()].map(({ availableQuantity, ...item }) => {
    if (availableQuantity < item.quantity) throw failure(`${item.productName} has insufficient stock. Please reduce the quantity.`, 409);
    return { ...item, taxMinor: (item.inclusiveUnitPriceMinor - item.unitPriceMinor) * item.quantity, lineTotalMinor: item.inclusiveUnitPriceMinor * item.quantity };
  });
  const pricing = { subtotalMinor: 0, discountMinor: 0, shippingMinor: 0, taxMinor: 0, grandTotalMinor: 0, currency: 'INR' };
  for (const item of items) { pricing.subtotalMinor += item.unitPriceMinor * item.quantity; pricing.taxMinor += item.taxMinor; pricing.grandTotalMinor += item.lineTotalMinor; }
  if (!Number.isSafeInteger(pricing.grandTotalMinor)) throw failure('Unsupported order total.', 409);
  return { items, pricing, rows };
}

async function prepareOrder(db, { customerId, ownerHash, addressId, revision, expectedTotalMinor }) {
  if (!Types.ObjectId.isValid(addressId) || !Number.isSafeInteger(revision) || revision < 1 || !Number.isSafeInteger(expectedTotalMinor) || expectedTotalMinor < 100) throw failure('Review your bag, delivery address and total before payment.');
  // Bounded recovery also works on deployments without a continuously running worker.
  await expireReservations(db, { limit: 20 });
  const create = () => transaction(db, async session => {
    const draft = ownerHash && await db.models.GiftDraft.findOne({ ownerHash }).session(session);
    if (!draft) throw failure('Your gift bag could not be found.', 409);
    const requestHash = fingerprint({ draftId: draft._id, revision, customerId, addressId, expectedTotalMinor });
    const previous = await db.models.Order.findOne({ 'checkout.draftId': draft._id, 'checkout.revision': revision }).session(session);
    if (previous) {
      if (String(previous.customerId) !== String(customerId) || previous.requestHash !== requestHash) throw failure('This bag already has a checkout. Review your bag before starting another.', 409);
      if (previous.status === 'CANCELLED') throw failure('The five-minute stock hold expired. Reload your bag to start again.', 409);
      return previous;
    }
    if (await db.models.Order.exists({ 'checkout.draftId': draft._id, status: 'PAYMENT_PENDING' }).session(session)) throw failure('This bag already has a payment in progress. Open your existing order from your account.', 409);
    if (draft.__v + 1 !== revision) throw failure('Your bag changed. Review the latest selection before payment.', 409);
    const customer = await db.models.Customer.findOne({ _id: customerId, status: 'ACTIVE' }).session(session);
    const address = await db.models.CustomerAddress.findOne({ _id: addressId, customerId }).session(session);
    if (!customer || !address) throw failure('Delivery address not found.', 404);
    const quoted = await quote(db, draft, session);
    if (quoted.pricing.grandTotalMinor !== expectedTotalMinor) throw failure('The item price changed. Review the new total before payment.', 409);
    // Fence concurrent cart, customer, price and publication changes inside the
    // same transaction as the reservation. Provider I/O never runs here.
    draft.markModified('items'); draft.increment(); await draft.save({ session });
    customer.markModified('status'); await customer.save({ session });
    for (const variant of new Map(quoted.rows.map(row => [String(row.variant._id), row.variant])).values()) { variant.markModified('priceMinor'); await variant.save({ session }); }
    for (const product of new Map(quoted.rows.map(row => [String(row.product._id), row.product])).values()) { product.markModified('status'); await product.save({ session }); }
    const snapshot = Object.fromEntries(addressFields.filter(field => address[field] !== undefined).map(field => [field, address[field]]));
    if (snapshot.country !== 'IN') throw failure('Online delivery is currently available within India.', 409);
    const id = new Types.ObjectId();
    const [order] = await db.models.Order.create([{ _id: id, orderNumber: `GG-${String(id).toUpperCase()}`, customerId, status: 'PAYMENT_PENDING', items: quoted.items, pricing: quoted.pricing, checkout: { draftId: draft._id, revision, snapshotRevision: draft.__v + 1, expiresAt: new Date(Date.now() + HOLD_MS) }, shippingAddressSnapshot: snapshot, billingAddressSnapshot: snapshot, customerSnapshot: { name: [customer.firstName, customer.lastName].filter(Boolean).join(' '), email: customer.email, phone: customer.phone }, idempotencyKey: `gift:${draft._id}:${revision}`, requestHash }], { session });
    for (const item of order.items) await applyStock(db, session, { variantId: item.variantId, type: 'RESERVATION', quantity: item.quantity, orderId: order._id, operationKey: `reserve:${order._id}:${item.variantId}` });
    await audit(db, session, 'GIFT_CHECKOUT_RESERVED', 'orders', order, undefined, undefined, { status: order.status, expiresAt: order.checkout.expiresAt });
    return order;
  });
  try { return await create(); }
  catch (error) { if (error.code === 11000) return create(); if (error.message === 'Insufficient stock') throw failure('A selected gift just sold out. Review your bag before payment.', 409); throw error; }
}

async function expireReservations(db, { now = new Date(), limit = 20, orderId } = {}) {
  const filter = { status: 'PAYMENT_PENDING', paymentStatus: 'PENDING', 'checkout.expiresAt': { $lte: now }, ...(orderId ? { _id: orderId } : {}) };
  const candidates = await db.models.Order.find(filter).select('_id').sort({ 'checkout.expiresAt': 1 }).limit(Math.min(100, Math.max(1, limit))).lean();
  let released = 0;
  for (const candidate of candidates) {
    const changed = await transaction(db, async session => {
      const order = await db.models.Order.findOne({ ...filter, _id: candidate._id }).session(session);
      if (!order) return false;
      for (const item of order.items) await applyStock(db, session, { variantId: item.variantId, type: 'RELEASE', quantity: item.quantity, orderId: order._id, operationKey: `expire:${order._id}:${item.variantId}` });
      order.status = 'CANCELLED'; order.fulfillmentStatus = 'CANCELLED'; order.cancelledAt = now;
      await order.save({ session });
      await audit(db, session, 'GIFT_CHECKOUT_EXPIRED', 'orders', order, undefined, { status: 'PAYMENT_PENDING' }, { status: 'CANCELLED' });
      return true;
    });
    if (changed) released++;
  }
  return { examined: candidates.length, released };
}
module.exports = { quote, prepareOrder, expireReservations, HOLD_MS };
