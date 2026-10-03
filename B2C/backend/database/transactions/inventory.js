const { fingerprint, once, required, audit } = require('./common');
async function applyStock(db, session, input) {
  const { variantId, type, quantity, orderId, operationKey, actorId, reason } = input;
  const requestHash = fingerprint({ variantId, type, quantity, orderId, actorId, reason });
  const previous = await db.models.InventoryTransaction.findOne({ operationKey }).session(session);
  if (previous) { if (previous.requestHash !== requestHash) throw new Error('Inventory operation payload mismatch'); return previous; }
  if (!Number.isSafeInteger(quantity) || quantity === 0 || (type !== 'ADJUSTMENT' && quantity < 0)) throw new Error('Invalid stock quantity');
  const inventory = await db.models.Inventory.findOne({ variantId }).session(session);
  if (!inventory || inventory.status === 'DISABLED') throw new Error('Inventory unavailable');
  const before = { availableQuantity: inventory.availableQuantity, reservedQuantity: inventory.reservedQuantity };
  if (['RESERVATION', 'SALE', 'RELEASE'].includes(type)) {
    const order = await required(db.models.Order, orderId, session);
    const limit = order.items.filter(i => String(i.variantId) === String(variantId)).reduce((n, i) => n + i.quantity, 0);
    if (!limit) throw new Error('Variant does not belong to order');
    if (type === 'RESERVATION' && order.status !== 'PAYMENT_PENDING') throw new Error('Order cannot reserve stock');
    const moves = await db.models.InventoryTransaction.find({ variantId, referenceId: orderId, type: { $in: ['RESERVATION', 'SALE', 'RELEASE'] } }).session(session).lean();
    const reserved = moves.filter(m => m.type === 'RESERVATION').reduce((n, m) => n + m.quantity, 0);
    const spent = moves.filter(m => m.type !== 'RESERVATION').reduce((n, m) => n + m.quantity, 0);
    if (type === 'RESERVATION' ? reserved + quantity > limit : reserved - spent < quantity) throw new Error('Order reservation bound exceeded');
  }
  switch (type) {
    case 'RESERVATION': inventory.availableQuantity -= quantity; inventory.reservedQuantity += quantity; break;
    case 'SALE': inventory.reservedQuantity -= quantity; break;
    case 'RELEASE': inventory.reservedQuantity -= quantity; inventory.availableQuantity += quantity; break;
    case 'RESTOCK': case 'RETURN': case 'ADJUSTMENT': inventory.availableQuantity += quantity; break;
    default: throw new Error('Unknown stock movement');
  }
  if (inventory.availableQuantity < 0 || inventory.reservedQuantity < 0) throw new Error('Insufficient stock');
  await inventory.save({ session });
  const [movement] = await db.models.InventoryTransaction.create([{ inventoryId: inventory._id, variantId, sku: inventory.sku, type, quantity, referenceType: orderId ? 'ORDER' : actorId ? 'MANUAL' : 'SYSTEM', referenceId: orderId, actorId, reason, operationKey, requestHash }], { session });
  await audit(db, session, `INVENTORY_${type}`, 'inventory', inventory, actorId, before, { availableQuantity: inventory.availableQuantity, reservedQuantity: inventory.reservedQuantity });
  return movement;
}
async function moveStock(db, input) {
  const { variantId, type, quantity, orderId, actorId, reason } = input;
  const requestHash = fingerprint({ variantId, type, quantity, orderId, actorId, reason });
  return once(db, db.models.InventoryTransaction, { operationKey: input.operationKey }, requestHash, session => applyStock(db, session, input));
}
module.exports = { moveStock, applyStock };
