// Storefront bootstrap reads must not exhaust the credential/write budget.
// Buckets remain bounded per IP; deployed proxy/distributed limits are separate work.
const storefrontReads = new Set(['/me', '/config', '/gift/count', '/gift/draft', '/gift/catalogue']);
function createAuthRateLimit() {
  const rates = new Map();
  return (req, res, next) => {
    // Operations retains its persisted per-actor/IP read/write/sensitive buckets.
    if (req.path === '/admin' || req.path.startsWith('/admin/')) return next();
    const now = Date.now();
    for (const [key, value] of rates) if (value.until <= now) rates.delete(key);
    const read = ['GET', 'HEAD'].includes(req.method) && storefrontReads.has(req.path);
    const key = `${req.ip}:${read ? 'storefront-read' : 'general'}`;
    const current = rates.get(key) || { count: 0, until: now + 60000 };
    if (!rates.has(key) && rates.size >= 10000) {
      res.set('Retry-After', '60');
      return res.status(429).json({ message: 'Too many requests. Please try again shortly.' });
    }
    current.count++;
    rates.set(key, current);
    if (current.count > (read ? 300 : 60)) {
      res.set('Retry-After', String(Math.max(1, Math.ceil((current.until - now) / 1000))));
      return res.status(429).json({ message: 'Too many requests. Please try again shortly.' });
    }
    next();
  };
}
module.exports = { createAuthRateLimit };
