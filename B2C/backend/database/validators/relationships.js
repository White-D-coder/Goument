// Cross-record agreement beyond merely checking that referenced IDs exist.
async function validateRelationships(doc, name, models) {
  const session = doc.$session();
  const get = (model, id) => id ? models[model].findById(id).session(session).lean() : null;
  const same = (a, b) => String(a) === String(b);
  if (name === 'Order' && doc.isNew) {
    const variants = new Set();
    for (const item of doc.items) if (item.variantId) {
      if (variants.has(String(item.variantId))) throw new Error('Duplicate order variant; consolidate quantity');
      variants.add(String(item.variantId));
      const v = await get('ProductVariant', item.variantId);
      if (v && (v.sku !== item.sku || !same(v.productId, item.productId) || v.currency !== item.currency)) throw new Error('Order variant/product/SKU mismatch');
    }
  }
  if (name === 'InventoryTransaction') {
    const inventory = await get('Inventory', doc.inventoryId);
    if (inventory && (!same(inventory.variantId, doc.variantId) || inventory.sku !== doc.sku)) throw new Error('Movement inventory identity mismatch');
    if (doc.referenceType === 'ORDER' && (!doc.referenceId || !await get('Order', doc.referenceId))) throw new Error('Movement order reference missing');
  }
  if (['Shipment', 'Invoice', 'CouponRedemption'].includes(name)) {
    const order = await get('Order', doc.orderId);
    if (order && doc.customerId && !same(order.customerId, doc.customerId)) throw new Error('Order customer mismatch');
    if (name === 'Invoice' && order) for (const field of ['subtotalMinor', 'discountMinor', 'shippingMinor', 'taxMinor', 'grandTotalMinor', 'currency']) if (order.pricing[field] !== doc[field]) throw new Error('Invoice/order pricing mismatch');
    if (name === 'CouponRedemption' && order && (!same(order.coupon?.couponId, doc.couponId) || order.coupon?.discountMinor !== doc.discountMinor)) throw new Error('Coupon redemption/order mismatch');
  }
  if (name === 'PaymentEvent' && doc.paymentId) {
    const p = await get('Payment', doc.paymentId);
    if (p && (p.provider !== doc.provider || !same(p.orderId, doc.orderId))) throw new Error('Payment event identity mismatch');
  }
  if (name === 'FinanceEvent') {
    const payment = await get('Payment', doc.paymentId); const refund = await get('Refund', doc.refundId);
    if (payment && (payment.currency !== doc.currency || !same(payment.orderId, doc.orderId))) throw new Error('Finance payment identity mismatch');
    if (refund && (!same(refund.paymentId, doc.paymentId) || !same(refund.orderId, doc.orderId) || refund.amountMinor !== doc.amountMinor || refund.currency !== doc.currency)) throw new Error('Finance refund mismatch');
    if (doc.type === 'PAYMENT' && (!payment || payment.amountMinor !== doc.amountMinor)) throw new Error('Finance capture amount mismatch');
    if (doc.type === 'REFUND' && !refund) throw new Error('Finance refund reference required');
    if (doc.reversesEventId) {
      const original = await get('FinanceEvent', doc.reversesEventId);
      if (!original || original.status !== 'POSTED' || original.amountMinor !== doc.amountMinor || original.currency !== doc.currency || original.direction === doc.direction || doc.status !== 'REVERSED') throw new Error('Finance reversal mismatch');
    }
  }
}
module.exports = { validateRelationships };
