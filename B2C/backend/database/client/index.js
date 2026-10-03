const mongoose = require('mongoose');
const { buildModels } = require('../models');
const { objectSchema, TITLE } = require('../validators/mongo');
async function connectDatabase({ uri = process.env.B2C_DATABASE_URI, dbName = process.env.B2C_DATABASE_NAME } = {}) {
  if (!uri || !/^gourmet_b2c_schema_[a-z0-9_]+$/.test(dbName || '')) throw new Error('Explicit B2C_DATABASE_URI and isolated gourmet_b2c_schema_* database name required');
  const connection = await mongoose.createConnection(uri, { dbName, autoIndex: false, autoCreate: false, serverSelectionTimeoutMS: 5000 }).asPromise();
  return { connection, models: buildModels(connection) };
}
async function installSchema(db) {
  for (const model of Object.values(db.models)) {
    const name = model.collection.name;
    const existing = await db.connection.db.listCollections({ name }).toArray();
    const validator = { $jsonSchema: objectSchema(model.schema, true) };
    if (!existing.length) await db.connection.db.createCollection(name, { validator, validationLevel: 'strict', validationAction: 'error' });
    else {
      if (existing[0].options?.validator?.$jsonSchema?.title !== TITLE && await model.collection.countDocuments({}) > 0) throw new Error(`Refusing to modify nonempty unrecognized collection ${name}`);
      await db.connection.db.command({ collMod: name, validator, validationLevel: 'strict', validationAction: 'error' });
    }
    await model.createIndexes(); // Never syncIndexes/drop unrelated indexes.
  }
}
module.exports = { connectDatabase, installSchema };
if (require.main === module) (async () => {
  const db = await connectDatabase();
  try { await installSchema(db); console.log(`${Object.keys(db.models).length} B2C database collections and indexes installed.`); }
  finally { await db.connection.close(); }
})().catch(error => { console.error(error.message); process.exitCode = 1; });
