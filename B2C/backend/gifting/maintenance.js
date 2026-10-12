'use strict';
const crypto = require('crypto');
const { expireReservations } = require('./checkout');
function mountMaintenance(app, { db, secret, run }) {
  app.get('/api/v1/auth/gift/maintenance/expire', run(async (req, res) => {
    const supplied = req.get('authorization') || '';
    const expected = secret && secret.length >= 32 ? `Bearer ${secret}` : '';
    if (!expected || Buffer.byteLength(supplied) !== Buffer.byteLength(expected) || !crypto.timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))) return res.status(401).json({ message: 'Unauthorized' });
    res.json(await expireReservations(db, { limit: 100 }));
  }));
}
module.exports = { mountMaintenance };
