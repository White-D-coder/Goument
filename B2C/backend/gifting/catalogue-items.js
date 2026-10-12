'use strict';
const baseItems = require('./items.json');
const envelopes = baseItems.filter(item => /^preview-envelope-ep[1-9]$/.test(item.id));
// Keep existing IDs as the 20-piece pack; 10-piece packs have distinct cart/SKU
// identities, so both sizes can coexist without overwriting quantity or names.
module.exports = [
  ...baseItems.map(item => envelopes.includes(item) ? { ...item, packSize: 20 } : item),
  ...envelopes.map(item => ({ ...item, id: `${item.id}-pack-10`, packSize: 10 }))
];
