const { fingerprint, once, transaction, required, audit } = require('./common');
async function requestRefund(db, { paymentId, amountMinor, idempotencyKey, reason, requestedBy }) {
  if (!Number.isSafeInteger(amountMinor) || amountMinor <= 0) throw new Error('Refund amount must be a positive safe integer');
  const requestHash = fingerprint({ paymentId, amountMinor, reason, requestedBy });
  return once(db, db.models.Refund, { paymentId, idempotencyKey }, requestHash, async session => {
    const payment = await required(db.models.Payment, paymentId, session);
    if (!['CAPTURED', 'PARTIALLY_REFUNDED'].includes(payment.status)) throw new Error('Payment not refundable');
    const refunds = await db.models.Refund.find({ paymentId, status: { $in: ['REQUESTED', 'PROCESSING', 'COMPLETED'] } }).session(session).lean();
    const committed = refunds.reduce((n, r) => n + r.amountMinor, 0);
    if (committed + amountMinor > payment.amountMinor) throw new Error('Refundable amount exceeded');
    // A common write makes competing snapshot reads conflict; retry sees new refund rows.
    payment.refundVersion += 1; await payment.save({ session });
    const [refund] = await db.models.Refund.create([{ orderId: payment.orderId, paymentId, customerId: payment.customerId, amountMinor, currency: payment.currency, provider: payment.provider, idempotencyKey, requestHash, reason, requestedBy }], { session });
    await audit(db, session, 'REFUND_REQUESTED', 'refunds', refund, requestedBy, undefined, { status: refund.status, amountMinor });
    return refund;
  });
}
async function setRefundState(db, refundId, nextStatus, providerRefundId) {
  return transaction(db, async session => {
    const refund = await required(db.models.Refund, refundId, session);
    const payment = await required(db.models.Payment, refund.paymentId, session);
    if (refund.status === nextStatus) { if (providerRefundId && refund.providerRefundId !== providerRefundId) throw new Error('Refund provider mismatch'); return refund; }
    if (nextStatus === 'COMPLETED' && !providerRefundId) throw new Error('Verified provider refund ID required');
    if (refund.providerRefundId && providerRefundId && refund.providerRefundId !== providerRefundId) throw new Error('Refund provider mismatch');
    const previous = refund.status; refund.status = nextStatus;
    if (providerRefundId) refund.providerRefundId = providerRefundId;
    if (nextStatus === 'COMPLETED') refund.completedAt = new Date();
    await refund.save({ session });
    payment.refundVersion += 1;
    if (nextStatus === 'COMPLETED') {
      const rows = await db.models.Refund.find({ paymentId: payment._id, status: 'COMPLETED' }).session(session).lean();
      const total = rows.reduce((n, r) => n + r.amountMinor, 0);
      if (total > payment.amountMinor) throw new Error('Refund amount exceeded');
      payment.status = total === payment.amountMinor ? 'REFUNDED' : 'PARTIALLY_REFUNDED';
      const order = await required(db.models.Order, payment.orderId, session);
      order.paymentStatus = payment.status; await order.save({ session });
      await db.models.FinanceEvent.create([{ type: 'REFUND', orderId: refund.orderId, paymentId: payment._id, refundId, amountMinor: refund.amountMinor, currency: refund.currency, direction: 'DEBIT', eventKey: `refund:${refundId}` }], { session });
    }
    await payment.save({ session });
    await audit(db, session, `REFUND_${nextStatus}`, 'refunds', refund, undefined, { status: previous }, { status: nextStatus });
    return refund;
  });
}
module.exports = { requestRefund, setRefundState };
