const { transaction, fingerprint, once, required } = require('../transactions/common');
const bcrypt = require('bcryptjs');
// Public registration entry: staff roles are never accepted from caller data.
async function registerCustomer(db, { email, password, firstName, lastName, phone }) {
  if (typeof password !== 'string' || password.length < 12 || Buffer.byteLength(password) > 72) throw new Error('Password must be 12 characters minimum and at most72 UTF-8 bytes');
  const passwordHash = await bcrypt.hash(password, 12);
  return transaction(db, async session => {
    const [user] = await db.models.User.create([{ email, passwordHash, roles: ['CUSTOMER'] }], { session });
    const [customer] = await db.models.Customer.create([{ userId: user._id, email, firstName, lastName, phone }], { session });
    return { userId: user._id, customerId: customer._id };
  });
}
async function createOrder(db, data) {
  // Tax/shipping/discount must come from a trusted approved quoting layer; no public API here.
  const input = { ...data }; delete input.requestHash;
  const requestHash = fingerprint(input);
  return once(db, db.models.Order, { customerId: data.customerId, idempotencyKey: data.idempotencyKey }, requestHash, async session => {
    const [order] = await db.models.Order.create([{ ...input, requestHash }], { session });
    return order;
  });
}
async function createPaymentAttempt(db, { orderId, provider, idempotencyKey }) {
  const requestHash = fingerprint({ orderId, provider });
  return once(db, db.models.Payment, { orderId, idempotencyKey }, requestHash, async session => {
    const order = await required(db.models.Order, orderId, session);
    if (order.status !== 'PAYMENT_PENDING') throw new Error('Order is not awaiting payment');
    const [payment] = await db.models.Payment.create([{ orderId, customerId: order.customerId, provider, idempotencyKey, requestHash, amountMinor: order.pricing.grandTotalMinor, currency: order.pricing.currency }], { session });
    return payment;
  });
}
async function saveAddress(db, customerId, input, addressId) {
  return transaction(db, async session => {
    // Shared customer write serializes simultaneous first/default address assignments.
    const customer = await required(db.models.Customer, customerId, session);
    customer.markModified('status'); await customer.save({ session });
    const address = addressId ? await required(db.models.CustomerAddress, addressId, session) : new db.models.CustomerAddress({ customerId });
    if (String(address.customerId) !== String(customerId)) throw new Error('Address owner mismatch');
    const { customerId: ignored, _id: ignoredId, ...fields } = input;
    for (const flag of ['isDefaultShipping', 'isDefaultBilling']) if (fields[flag]) {
      const previous = await db.models.CustomerAddress.find({ customerId, [flag]: true }).session(session);
      for (const other of previous) if (String(other._id) !== String(address._id)) { other[flag] = false; await other.save({ session }); }
    }
    address.set(fields); await address.save({ session }); return address;
  });
}
module.exports = { registerCustomer, createOrder, createPaymentAttempt, saveAddress };
