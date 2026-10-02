'use strict';
const { sessionUser, failure } = require('../auth/service');
const { transaction, fingerprint } = require('../database/transactions/common');
const { authenticateAdmin, PERMISSIONS } = require('./security');

const receiptView = receipt => ({ resource: receipt.resource, id: String(receipt.resourceId), version: receipt.resourceVersion });
async function executeCommand(db, { token, permission, key, action, input, requestId }, handler) {
  if (typeof key !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9._:-]{7,99}$/.test(key)) throw failure('Supply a valid Idempotency-Key of 8–100 characters.', 422);
  if (!PERMISSIONS.includes(permission)) throw new Error('Missing command permission policy');
  if (typeof action !== 'string' || !/^[A-Z][A-Z0-9_]{1,99}$/.test(action) || typeof handler !== 'function') throw new Error('Invalid command configuration');
  if (requestId !== undefined && (typeof requestId !== 'string' || requestId.length > 100)) throw new Error('Invalid request identity');
  const hash = fingerprint({ action, input });
  const perform = () => transaction(db, async session => {
    // This write shares the user document with logout, suspension and permission changes.
    // A concurrent revocation causes transaction retry and fresh authorization before effects.
    const actor = await authenticateAdmin(db, token, permission, session);
    const user = await sessionUser(db, token, session);
    user.adminCommandVersion = (user.adminCommandVersion || 0) + 1;
    await user.save({ session });
    const existing = await db.models.AdminCommand.findOne({ actorId: actor.id, key }).session(session);
    if (existing) {
      if (existing.requestHash !== hash || existing.action !== action) throw failure('Idempotency key was already used for a different operation.', 409);
      return receiptView(existing);
    }
    const result = await handler(db, session, actor, input);
    if (!result || Object.keys(result).some(field => !['resource', 'id', 'version'].includes(field)) ||
      typeof result.resource !== 'string' || !/^[a-z][a-z0-9-]{0,79}$/.test(result.resource) ||
      typeof result.id !== 'string' || !/^[a-f0-9]{24}$/i.test(result.id) || !Number.isSafeInteger(result.version) || result.version < 0) throw new Error('Unsafe command result');
    const [receipt] = await db.models.AdminCommand.create([{
      actorId: actor.id, key, action, requestHash: hash, resource: result.resource,
      resourceId: result.id, resourceVersion: result.version, requestId,
    }], { session });
    const order = result.resource === 'orders'
      ? await db.models.Order.findById(result.id).select('customerId').session(session)
      : null;
    await db.models.AuditLog.create([{
      actorId: actor.id, actorRole: actor.role, action, entityType: result.resource,
      entityId: result.id, ...(order ? { customerId: order.customerId } : {}), requestId, newState: { version: result.version },
    }], { session });
    return receiptView(receipt);
  });
  // Distinct transactions racing on the same receipt must re-authorize before replay.
  try { return await perform(); } catch (error) {
    if (error.code !== 11000) throw error;
    const actor = await authenticateAdmin(db, token, permission);
    const existing = await db.models.AdminCommand.findOne({ actorId: actor.id, key });
    if (!existing) throw error;
    if (existing.requestHash !== hash || existing.action !== action) throw failure('Idempotency key was already used for a different operation.', 409);
    return receiptView(existing);
  }
}
module.exports = { executeCommand };
