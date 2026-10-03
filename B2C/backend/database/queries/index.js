const { Types } = require('mongoose');
function paging({ limit = 20, after } = {}) {
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 100) throw new Error('Page limit must be1..100');
  let filter = {};
  if (after) {
    let decoded; try { decoded = JSON.parse(Buffer.from(after, 'base64url').toString()); } catch { throw new Error('Invalid page cursor'); }
    const date = new Date(decoded.at);
    if (!Number.isFinite(date.getTime()) || !Types.ObjectId.isValid(decoded.id)) throw new Error('Invalid page cursor');
    const id = new Types.ObjectId(decoded.id);
    filter = { $or: [{ createdAt: { $lt: date } }, { createdAt: date, _id: { $lt: id } }] };
  }
  return { limit, filter };
}
async function page(model, owner, options = {}) {
  const { limit, filter } = paging(options);
  const rows = await model.find({ ...owner, ...filter }).sort({ createdAt: -1, _id: -1 }).limit(limit + 1).lean();
  const more = rows.length > limit; const items = rows.slice(0, limit); const last = items.at(-1);
  return { items, next: more ? Buffer.from(JSON.stringify({ at: last.createdAt.toISOString(), id: String(last._id) })).toString('base64url') : null };
}
async function customer360(db, customerId, { limit = 20, cursors = {} } = {}) {
  paging({ limit });
  const customer = await db.models.Customer.findById(customerId).lean();
  if (!customer) throw new Error('Customer not found');
  const result = { customer };
  for (const [key, model] of Object.entries({ addresses: 'CustomerAddress', orders: 'Order', payments: 'Payment', invoices: 'Invoice', refunds: 'Refund', couponUsage: 'CouponRedemption', notifications: 'Notification', activity: 'AuditLog' })) result[key] = await page(db.models[model], { customerId }, { limit, after: cursors[key] });
  return result;
}
async function ownerDashboard(db, { from, to, currency, limit = 10 }) {
  paging({ limit }); const start = new Date(from); const end = new Date(to);
  if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || start >= end || !/^[A-Z]{3}$/.test(currency || '')) throw new Error('Explicit reporting window and currency required');
  const dates = { $gte: start, $lt: end };
  const orders = { createdAt: dates, 'pricing.currency': currency };
  const payments = { paidAt: dates, currency, status: { $in: ['CAPTURED', 'PARTIALLY_REFUNDED', 'REFUNDED'] } };
  const countsByStatus = await db.models.Order.aggregate([{ $match: orders }, { $group: { _id: '$status', count: { $sum: 1 } } }]);
  const captured = await db.models.Payment.aggregate([{ $match: payments }, { $group: { _id: null, amountMinor: { $sum: '$amountMinor' }, count: { $sum: 1 } } }]);
  const refunds = await db.models.Refund.aggregate([{ $match: { completedAt: dates, currency, status: 'COMPLETED' } }, { $group: { _id: null, amountMinor: { $sum: '$amountMinor' } } }]);
  const topProducts = await db.models.Order.aggregate([{ $match: { ...orders, paymentStatus: { $in: ['PAID', 'PARTIALLY_REFUNDED'] } } }, { $unwind: '$items' }, { $group: { _id: '$items.productId', quantity: { $sum: '$items.quantity' } } }, { $sort: { quantity: -1, _id: 1 } }, { $limit: limit }]);
  return {
    currency, from: start, to: end, orderCount: await db.models.Order.countDocuments(orders), customerCount: await db.models.Customer.countDocuments(), countsByStatus,
    capturedMinor: captured[0]?.amountMinor || 0, refundedMinor: refunds[0]?.amountMinor || 0,
    // Gross captures/refunds are reported separately: not settled revenue/profit.
    recentOrders: await db.models.Order.find({ 'pricing.currency': currency }).sort({ createdAt: -1, _id: -1 }).limit(limit).lean(),
    lowStock: await db.models.Inventory.find({ status: { $in: ['LOW_STOCK', 'OUT_OF_STOCK'] } }).limit(limit).lean(),
    recentPayments: await db.models.Payment.find({ currency }).sort({ createdAt: -1, _id: -1 }).limit(limit).lean(),
    recentRefunds: await db.models.Refund.find({ currency }).sort({ createdAt: -1, _id: -1 }).limit(limit).lean(), topProducts
  };
}
module.exports = { paging, page, customer360, ownerDashboard };
