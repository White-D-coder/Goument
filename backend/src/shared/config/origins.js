// Exact established browser origins; CORS is separate from authentication/CSRF.
const allowedOrigins = [
  'https://www.gourmetgem.com',
  'https://m.gourmetgem.com',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];
const isAllowedOrigin = origin => origin === undefined || allowedOrigins.includes(origin);
module.exports = { allowedOrigins, isAllowedOrigin };
