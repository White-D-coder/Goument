const { transaction, required, audit } = require('./common');
async function redeemCoupon(db, { couponId, orderId }) {
  return transaction(db, async session => {
    const prior = await db.models.CouponRedemption.findOne({ orderId }).session(session);
    if (prior) { if (String(prior.couponId) !== String(couponId) || prior.status !== 'APPLIED') throw new Error('Order coupon conflict'); return prior; }
    const coupon = await required(db.models.Coupon, couponId, session);
    const order = await required(db.models.Order, orderId, session);
    const now = new Date();
    if (coupon.status !== 'ACTIVE' || coupon.startsAt > now || coupon.expiresAt <= now || (coupon.usageLimit !== undefined && coupon.totalUsed >= coupon.usageLimit)) throw new Error('Coupon unavailable');
    if (!order.coupon || String(order.coupon.couponId) !== String(couponId) || order.coupon.code !== coupon.codeNormalized || order.status !== 'PAYMENT_PENDING') throw new Error('Order coupon snapshot/state mismatch');
    if (order.pricing.subtotalMinor < (coupon.minimumOrderMinor || 0) || (coupon.currency && coupon.currency !== order.pricing.currency)) throw new Error('Coupon eligibility mismatch');
    const perCustomer = await db.models.CouponRedemption.countDocuments({ couponId, customerId: order.customerId, status: 'APPLIED' }).session(session);
    if (coupon.perCustomerLimit !== undefined && perCustomer >= coupon.perCustomerLimit) throw new Error('Customer coupon limit exceeded');
    const discount = coupon.discountType === 'PERCENTAGE' ? Number(BigInt(order.pricing.subtotalMinor) * BigInt(coupon.percentageBps) / 10000n) : coupon.fixedAmountMinor;
    const expected = Math.min(discount, coupon.maximumDiscountMinor ?? Number.MAX_SAFE_INTEGER, order.pricing.subtotalMinor);
    if (order.coupon.discountMinor !== expected) throw new Error('Coupon discount does not match snapshot');
    coupon.totalUsed += 1; await coupon.save({ session });
    const [redemption] = await db.models.CouponRedemption.create([{ couponId, customerId: order.customerId, orderId, discountMinor: expected }], { session });
    await audit(db, session, 'COUPON_APPLIED', 'coupon_redemptions', redemption, undefined, undefined, { discountMinor: expected });
    return redemption;
  });
}
async function reverseRedemption(db, redemptionId) {
  return transaction(db, async session => {
    const redemption = await required(db.models.CouponRedemption, redemptionId, session);
    if (redemption.status === 'REVERSED') return redemption;
    const coupon = await required(db.models.Coupon, redemption.couponId, session);
    if (coupon.totalUsed <= 0) throw new Error('Coupon counter inconsistent');
    coupon.totalUsed -= 1; await coupon.save({ session });
    redemption.status = 'REVERSED'; redemption.reversedAt = new Date(); await redemption.save({ session }); return redemption;
  });
}
module.exports = { redeemCoupon, reverseRedemption };
