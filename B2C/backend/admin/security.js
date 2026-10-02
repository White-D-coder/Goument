'use strict';
const { sessionUser, failure, digest } = require('../auth/service');
const { transaction } = require('../database/transactions/common');
const { PERMISSIONS, OWNER_ONLY, permissionsFor } = require('./permissions');

async function authenticateAdmin(db, token, permission, session) {
  const user = await sessionUser(db, token, session);
  const role = user.roles.includes('OWNER') ? 'OWNER' : user.roles.includes('ADMIN') ? 'ADMIN' : null;
  if (!role) throw failure('Access denied', 403);
  const permissions = permissionsFor(user);
  if (permission !== undefined && (!PERMISSIONS.includes(permission) || !permissions.includes(permission))) throw failure('Access denied', 403);
  return { id: String(user._id), role, permissions, userEmail: user.email };
}
function requireOwner(actor) {
  if (actor?.role !== 'OWNER') throw failure('Owner access required', 403);
}
const RATE_LIMITS = Object.freeze({ entry: 240, read: 120, write: 30, sensitive: 10, login: 10 });
async function adminRateLimit(db, { actorId, ip, bucket }) {
  const limit = RATE_LIMITS[bucket];
  if (!limit) throw new Error('Unknown operations rate bucket');
  const now = Date.now(), minute = Math.floor(now / 60000);
  // Hash identities; neither IP addresses nor credential data enter rate documents.
  const scopes = [...new Set([actorId && `user:${actorId}`, ip && `ip:${ip}`].filter(Boolean))];
  if (!scopes.length) throw new Error('Missing operations rate identity');
  const keys = scopes.map(scope => digest(`${bucket}:${minute}:${scope}`)).sort();
  const consume = () => transaction(db, async session => {
    for (const key of keys) {
      let entry = await db.models.AdminRate.findOne({ key }).session(session);
      if (entry?.count >= limit) throw failure('Too many requests. Please try again shortly.', 429);
      if (!entry) entry = new db.models.AdminRate({ key, count: 0, expiresAt: new Date((minute + 2) * 60000) });
      entry.count += 1; await entry.save({ session });
    }
  });
  try { await consume(); } catch (error) { if (error.code !== 11000) throw error; await consume(); }
}
module.exports = { PERMISSIONS, OWNER_ONLY, permissionsFor, authenticateAdmin, requireOwner, adminRateLimit, RATE_LIMITS };
