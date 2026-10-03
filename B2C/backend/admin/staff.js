'use strict';
const { failure } = require('../auth/service');
const { paging } = require('../database/queries');
const { requireOwner, PERMISSIONS, OWNER_ONLY } = require('./security');
const validId = value => typeof value === 'string' && /^[a-f0-9]{24}$/i.test(value);
const fields = 'email roles permissions status accessVersion lastLoginAt createdAt updatedAt';
function staffView(user) {
  return { id: String(user._id), version: user.accessVersion || 0, email: user.email,
    roles: [...user.roles], permissions: [...(user.permissions || [])], status: user.status, active: user.status === 'ACTIVE',
    lastLoginAt: user.lastLoginAt?.toISOString() || null, createdAt: user.createdAt.toISOString() };
}
async function listStaff(db, actor, query = {}) {
  requireOwner(actor);
  if (Object.keys(query).some(key => !['limit', 'after', 'search', 'status'].includes(key))) throw failure('Unsupported staff filter.', 422);
  if (query.limit !== undefined && (typeof query.limit !== 'string' || !/^\d{1,3}$/.test(query.limit))) throw failure('Invalid staff pagination.', 422);
  const limit = query.limit === undefined ? 20 : Number(query.limit);
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 100 || (query.after !== undefined && (typeof query.after !== 'string' || query.after.length > 500))) throw failure('Invalid staff pagination.', 422);
  let page; try { page = paging({ limit, after: query.after }); } catch { throw failure('Invalid staff cursor.', 422); }
  // OWNER can locate an existing customer account for an explicit staff grant.
  const filter = { ...page.filter };
  if (query.status !== undefined) {
    if (!['ACTIVE', 'SUSPENDED', 'DISABLED'].includes(query.status)) throw failure('Invalid staff status.', 422);
    filter.status = query.status;
  }
  if (query.search !== undefined) {
    if (typeof query.search !== 'string' || query.search.length > 80) throw failure('Invalid staff search.', 422);
    const escaped = query.search.trim().toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (escaped) filter.emailNormalized = { $regex: `^${escaped}` };
  }
  const rows = await db.models.User.find(filter).select(fields).sort({ createdAt: -1, _id: -1 }).limit(limit + 1).maxTimeMS(5000).lean();
  const items = rows.slice(0, limit), last = items.at(-1);
  return { items: items.map(staffView), next: rows.length > limit ? Buffer.from(JSON.stringify({ at: last.createdAt.toISOString(), id: String(last._id) })).toString('base64url') : null };
}
async function getStaff(db, actor, id) {
  requireOwner(actor);
  if (!validId(id)) throw failure('Invalid user ID.', 422);
  const user = await db.models.User.findById(id).select(fields).maxTimeMS(5000).lean();
  if (!user) throw failure('User not found.', 404);
  // An explicit ID can locate an existing customer to grant ADMIN access; no email matching.
  return { item: staffView(user) };
}
async function updateStaff(db, session, actor, input) {
  requireOwner(actor);
  const allowed = ['id', 'expectedVersion', 'permissions', 'active', 'makeAdmin', 'reason'];
  if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).some(key => !allowed.includes(key))) throw failure('Unexpected staff fields.', 422);
  if (!validId(input.id) || !Number.isSafeInteger(input.expectedVersion) || input.expectedVersion < 0) throw failure('Invalid user or version.', 422);
  if (typeof input.reason !== 'string' || !input.reason.trim() || input.reason.trim().length > 500) throw failure('A reason of at most 500 characters is required.', 422);
  if (input.makeAdmin !== undefined && typeof input.makeAdmin !== 'boolean' || input.active !== undefined && typeof input.active !== 'boolean') throw failure('Invalid access change.', 422);
  if (input.permissions !== undefined && (!Array.isArray(input.permissions) || input.permissions.length > PERMISSIONS.length || new Set(input.permissions).size !== input.permissions.length || input.permissions.some(value => !PERMISSIONS.includes(value) || OWNER_ONLY.includes(value)))) throw failure('Choose supported non-owner permissions.', 422);
  if (!['permissions', 'active', 'makeAdmin'].some(key => Object.hasOwn(input, key))) throw failure('Choose an access change.', 422);
  const target = await db.models.User.findById(input.id).select('+authSessions').session(session);
  if (!target) throw failure('User not found.', 404);
  if (target.roles.includes('OWNER')) throw failure('Owner identities cannot be changed through staff management.', 403);
  if (!target.roles.includes('ADMIN') && input.makeAdmin !== true) throw failure('Grant ADMIN before changing staff access.', 422);
  if (target.status === 'DISABLED') throw failure('Disabled identities cannot be reactivated.', 409);
  if ((target.accessVersion || 0) !== input.expectedVersion) throw failure('Staff access changed. Reload before retrying.', 409);
  const before = { roles: [...target.roles], permissions: [...target.permissions], status: target.status, version: target.accessVersion || 0 };
  if (input.makeAdmin === true && !target.roles.includes('ADMIN')) target.roles.push('ADMIN');
  if (input.makeAdmin === false) {
    target.roles = target.roles.filter(role => role !== 'ADMIN');
    if (!target.roles.length) target.roles = ['CUSTOMER'];
    target.permissions = [];
  }
  if (input.permissions !== undefined) {
    if (!target.roles.includes('ADMIN') && input.permissions.length) throw failure('Grant ADMIN before assigning permissions.', 422);
    target.permissions = input.permissions;
  }
  if (input.active !== undefined) {
    if (!target.roles.includes('ADMIN') && input.makeAdmin !== false) throw failure('Only staff access can be suspended here.', 422);
    target.status = input.active ? 'ACTIVE' : 'SUSPENDED';
  }
  target.authSessions = [];
  target.accessVersion = (target.accessVersion || 0) + 1;
  await target.save({ session });
  await db.models.AuditLog.create([{
    actorId: actor.id, actorRole: actor.role, action: 'STAFF_PERMISSIONS_CHANGED', entityType: 'staff', entityId: target._id,
    previousState: before, newState: { roles: [...target.roles], permissions: [...target.permissions], status: target.status, version: target.accessVersion },
    // Human reasons are not copied into unrestricted logs/metadata; request digest records the operation.
  }], { session });
  return { resource: 'staff', id: String(target._id), version: target.accessVersion };
}
module.exports = { listStaff, getStaff, updateStaff };
