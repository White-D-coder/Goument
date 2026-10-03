const { createHash } = require('crypto');
function canonical(value) {
  if (value === undefined) return null;
  if (value === null || typeof value !== 'object') return value;
  if (value instanceof Date) return value.toISOString();
  if (value.toHexString) return value.toHexString();
  if (Array.isArray(value)) return value.map(canonical);
  return Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])]));
}
const fingerprint = value => createHash('sha256').update(JSON.stringify(canonical(value))).digest('hex');
function sameRequest(record, hash) { if ((record.requestHash || record.payloadHash) !== hash) throw new Error('Idempotency key reused with a different request'); return record; }
async function transaction(db, callback) {
  const session = await db.connection.startSession();
  try { return await session.withTransaction(() => callback(session), { readConcern: { level: 'snapshot' }, writeConcern: { w: 'majority' }, readPreference: 'primary' }); }
  finally { await session.endSession(); }
}
async function once(db, model, identity, hash, callback) {
  try {
    return await transaction(db, async session => {
      const existing = await model.findOne(identity).session(session);
      if (existing) return sameRequest(existing, hash);
      return callback(session);
    });
  } catch (error) {
    if (error.code === 11000) { const winner = await model.findOne(identity); if (winner) return sameRequest(winner, hash); }
    throw error;
  }
}
async function required(model, id, session) { const record = await model.findById(id).session(session); if (!record) throw new Error(`${model.modelName} not found`); return record; }
async function audit(db, session, action, entityType, entity, actorId, previousState, newState) {
  return db.models.AuditLog.create([{ action, entityType, entityId: entity._id, customerId: entity.customerId, actorId, actorRole: actorId ? undefined : 'SYSTEM', previousState, newState }], { session });
}
module.exports = { fingerprint, sameRequest, transaction, once, required, audit };
