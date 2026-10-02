const { fingerprint, once, required, audit } = require('./common');
const { applyStock } = require('./inventory');
async function confirmPayment(db, input) {
  // Trusted adapter must verify provider signature before calling. No provider I/O here.
  const { provider, providerEventId, paymentId, providerPaymentId, amountMinor, currency } = input;
  if (!providerPaymentId) throw new Error('Provider payment identifier required');
  const payloadHash = fingerprint({ provider, providerEventId, paymentId, providerPaymentId, amountMinor, currency, eventType: 'payment.captured' });
  return once(db, db.models.PaymentEvent, { provider, providerEventId }, payloadHash, async session => {
    const payment = await required(db.models.Payment, paymentId, session);
    if (payment.provider !== provider || payment.amountMinor !== amountMinor || payment.currency !== currency || (payment.providerPaymentId && payment.providerPaymentId !== providerPaymentId)) throw new Error('Provider payment amount/currency/identity mismatch');
    const [event] = await db.models.PaymentEvent.create([{ provider, providerEventId, eventType: 'payment.captured', paymentId, orderId: payment.orderId, payloadHash }], { session });
    if (!['CAPTURED', 'PARTIALLY_REFUNDED', 'REFUNDED'].includes(payment.status)) {
      const order = await required(db.models.Order, payment.orderId, session);
      if (order.status !== 'PAYMENT_PENDING' || order.paymentStatus === 'PAID') throw new Error('Order is not eligible for capture; reconciliation required');
      for (const item of order.items) {
        if (!item.variantId) throw new Error('Capture requires variant-backed order items');
        await applyStock(db, session, { variantId: item.variantId, type: 'SALE', quantity: item.quantity, orderId: order._id, operationKey: `capture:${order._id}:${item.variantId}` });
      }
      payment.status = 'CAPTURED'; payment.providerPaymentId = providerPaymentId; payment.paidAt = new Date();
      await payment.save({ session });
      order.status = 'CONFIRMED'; order.paymentStatus = 'PAID'; order.confirmedAt = payment.paidAt;
      await order.save({ session });
      await db.models.FinanceEvent.create([{ type: 'PAYMENT', orderId: order._id, paymentId, amountMinor, currency, direction: 'CREDIT', eventKey: `payment:${paymentId}` }], { session });
      await audit(db, session, 'PAYMENT_CAPTURED', 'payments', payment, undefined, { status: 'PENDING' }, { status: 'CAPTURED', amountMinor });
    }
    event.status = 'PROCESSED'; event.processedAt = new Date(); await event.save({ session }); return event;
  });
}
module.exports = { confirmPayment };
