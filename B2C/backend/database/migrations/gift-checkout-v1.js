'use strict';
const { objectSchema, TITLE } = require('../validators/mongo');
// Additive Order validation/index migration only; no historical money/data write.
async function migrateGiftCheckout(db) {
  const [collection] = await db.connection.db.listCollections({ name: 'orders' }).toArray();
  if (collection?.options?.validator?.$jsonSchema?.title !== TITLE) throw new Error('Unrecognized order collection; migration refused.');
  const validator = { $jsonSchema: objectSchema(db.models.Order.schema, true) };
  const incompatible = await db.models.Order.collection.countDocuments({ $nor: [validator] });
  if (incompatible) throw new Error('Existing orders need review before schema migration.');
  await db.connection.db.command({ collMod: 'orders', validator, validationLevel: 'strict', validationAction: 'error' });
  await db.models.Order.createIndexes();
  return { collection: 'orders', historicalDataChanged: false };
}
module.exports = { migrateGiftCheckout };
if (require.main === module) {
  require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
  (async () => {
    if (!process.argv.includes('--apply')) throw new Error('Explicit --apply required. Review current schema and deployment readiness first.');
    const db = await require('../client').connectDatabase();
    try { console.log(JSON.stringify(await migrateGiftCheckout(db))); } finally { await db.connection.close(); }
  })().catch(error => { console.error(error.message); process.exitCode = 1; });
}
