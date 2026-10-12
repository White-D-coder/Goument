'use strict';
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
(async () => {
  const db = await require('../database/client').connectDatabase();
  try { console.log(JSON.stringify(await require('./checkout').expireReservations(db, { limit: 100 }))); }
  finally { await db.connection.close(); }
})().catch(error => { console.error(error.message); process.exitCode = 1; });
