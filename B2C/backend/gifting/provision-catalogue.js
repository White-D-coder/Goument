'use strict';
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { connectDatabase } = require('../database/client');
const { provisionCatalogue } = require('./catalogue');
(async () => {
  if (!process.argv.includes('--opening-stock=100') || !process.argv.includes('--apply')) throw new Error('Explicit --apply --opening-stock=100 required. Install/review the current schema first.');
  const db = await connectDatabase();
  try { console.log(JSON.stringify(await provisionCatalogue(db, 100))); }
  finally { await db.connection.close(); }
})().catch(error => { console.error(error.message); process.exitCode = 1; });
