const LOTUS_ID = 'preview-envelope-ep1';
const invalidName = /[\u0000-\u001f\u007f-\u009f\u2028\u2029]/;
function validatePersonalisation(id, value, allowLegacySkip = false) {
  if (value === undefined) return;
  if (id !== LOTUS_ID || !value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).some(key => !['mode', 'name'].includes(key))) throw Object.assign(new Error('Invalid envelope personalisation.'), { status: 400 });
  if (allowLegacySkip && value.mode === 'SKIP' && value.name === undefined) return;
  if (value.mode === 'PRINT' && typeof value.name === 'string' && value.name.trim().length >= 1 && value.name.trim().length <= 80 && !invalidName.test(value.name)) return;
  throw Object.assign(new Error('Enter a print name of 1–80 characters.'), { status: 400 });
}
function requirePersonalisation(draft) {
  if (draft.items.some(row => row.id === LOTUS_ID && (row.personalisation?.mode !== 'PRINT' || typeof row.personalisation.name !== 'string' || !row.personalisation.name.trim()))) throw Object.assign(new Error('Add a print name for your Lotus envelopes in your bag before checkout.'), { status: 409 });
}
module.exports = { LOTUS_ID, validatePersonalisation, requirePersonalisation };
