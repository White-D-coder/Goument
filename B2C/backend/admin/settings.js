'use strict';
const { failure } = require('../auth/service');
const { requireOwner } = require('./security');
function view(setting) {
  return { id: setting ? String(setting._id) : null, version: setting?.revision || 0,
    timezone: setting?.timezone || null, currency: setting?.currency || null };
}
async function getSettings(db) {
  const setting = await db.models.AdminSetting.findOne({ key: 'operations' }).select('timezone currency revision').lean();
  return { item: view(setting) };
}
async function updateSettings(db, session, actor, input) {
  requireOwner(actor);
  if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).some(key => !['expectedVersion', 'timezone', 'currency'].includes(key))) throw failure('Only reporting timezone and currency can be configured here.', 422);
  if (!Number.isSafeInteger(input.expectedVersion) || input.expectedVersion < 0 || typeof input.timezone !== 'string' || input.timezone.length > 80 || typeof input.currency !== 'string' || !/^[A-Z]{3}$/.test(input.currency)) throw failure('Invalid reporting settings.', 422);
  try { new Intl.DateTimeFormat('en', { timeZone: input.timezone }).format(); } catch { throw failure('Invalid reporting timezone.', 422); }
  let setting = await db.models.AdminSetting.findOne({ key: 'operations' }).session(session);
  if ((setting?.revision || 0) !== input.expectedVersion) throw failure('Reporting settings changed. Reload before retrying.', 409);
  if (!setting) setting = new db.models.AdminSetting({ key: 'operations' });
  setting.timezone = input.timezone; setting.currency = input.currency; setting.revision += 1;
  await setting.save({ session });
  return { resource: 'settings', id: String(setting._id), version: setting.revision };
}
module.exports = { getSettings, updateSettings };
