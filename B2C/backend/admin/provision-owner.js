'use strict';
const { transaction } = require('../database/transactions/common');
const { failure } = require('../auth/service');

// Operator-only entry point. Never mounted on an HTTP route or called at startup.
async function bootstrapOwner(db, userId) {
  if (typeof userId !== 'string' || !/^[a-f0-9]{24}$/i.test(userId)) throw failure('Supply an explicit existing user ID.', 422);
  const claim = () => transaction(db, async session => {
    let setting = await db.models.AdminSetting.findOne({ key: 'operations' }).session(session);
    if (setting?.bootstrapCompletedAt) {
      if (String(setting.bootstrapOwnerId) === userId.toLowerCase()) return { alreadyProvisioned: true };
      throw failure('First-owner provisioning has already been completed.', 409);
    }
    if (await db.models.User.exists({ roles: 'OWNER' }).session(session)) throw failure('An owner already exists. Use the established owner administration process.', 409);
    const user = await db.models.User.findById(userId).select('+authSessions +passwordHash +googleSubject').session(session);
    if (!user || user.status !== 'ACTIVE') throw failure('Choose an existing active account.', 422);
    if (!user.passwordHash && !user.googleSubject) throw failure('The account must already have a working sign-in method.', 422);
    if (!setting) setting = new db.models.AdminSetting({ key: 'operations' });
    setting.bootstrapOwnerId = user._id; setting.bootstrapCompletedAt = new Date();
    await setting.save({ session });
    user.roles = [...new Set([...user.roles, 'OWNER'])];
    user.authSessions = []; user.accessVersion = (user.accessVersion || 0) + 1;
    await user.save({ session });
    await db.models.AuditLog.create([{actorRole:'SYSTEM',action:'OWNER_BOOTSTRAPPED',entityType:'staff',entityId:user._id,newState:{roles:[...user.roles],version:user.accessVersion},metadata:{source:'operator-cli'}}],{session});
    return { alreadyProvisioned: false };
  });
  try { return await claim(); } catch (error) { if (error.code !== 11000) throw error; return claim(); }
}
module.exports = { bootstrapOwner };
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length !== 3 || args[0] !== '--user-id' || args[2] !== '--confirm' || !/^[a-f0-9]{24}$/i.test(args[1] || '')) {
    console.error('Usage: node admin/provision-owner.js --user-id <existing-user-id> --confirm');
    process.exitCode = 1;
  } else {
    require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
    (async () => {
      const db = await require('../database/client').connectDatabase();
      try { const result = await bootstrapOwner(db, args[1]); console.log(result.alreadyProvisioned ? 'First-owner provisioning was already completed for this identity.' : 'Owner provisioned and previous sessions revoked. Sign in again.'); }
      finally { await db.connection.close(); }
    })().catch(() => { console.error('Owner provisioning failed. Verify the explicit account and installed B2C schema; no credentials are printed.'); process.exitCode = 1; });
  }
}
