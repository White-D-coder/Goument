/* eslint-disable @typescript-eslint/no-require-imports -- Node test harness loads CommonJS-compiled TypeScript. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const ts = require('typescript');
const { NextRequest } = require('next/server');
const synthetic = { ADMIN_SESSION_SECRET: 'synthetic-test-only-session-key-123456', ADMIN_PORTAL_PIN: 'synthetic-pin' };
function compile(file, env, overrides = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../src', file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true }
  }).outputText;
  vm.runInNewContext(code, { exports, require: name => overrides[name] || require(name), process: { env }, Buffer, Date, Map });
  return exports;
}
function fixture(env = synthetic) {
  const auth = compile('lib/security/adminAuth.ts', env);
  const route = compile('app/api/admin/auth/route.ts', env, {
    '@/lib/security/adminAuth': auth, '@/lib/geo/ipGeo': { extractClientIp: () => '192.0.2.1' }
  });
  return { auth, route };
}
function request(body, cookie) {
  return new NextRequest('https://store.example.test/api/admin/auth', {
    method: 'POST', headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) }, body: JSON.stringify(body)
  });
}
test('missing PIN or session secret fails closed without breaking module import', async () => {
  for (const env of [{}, { ADMIN_PORTAL_PIN: synthetic.ADMIN_PORTAL_PIN }, { ADMIN_SESSION_SECRET: synthetic.ADMIN_SESSION_SECRET }]) {
    const { auth, route } = fixture(env);
    assert.throws(() => auth.createSessionToken());
    assert.equal(auth.verifySessionToken('gourmet_admin:9999999999999:synthetic'), false);
    const response = await route.POST(request({ pin: 'synthetic-pin' }));
    assert.equal(response.status, 503); assert.equal(response.headers.get('set-cookie'), null);
  }
});
test('configured token remains valid and tampering/expiry/noncanonical encoding is denied', () => {
  const { auth } = fixture(); const valid = auth.createSessionToken();
  assert.equal(auth.verifySessionToken(valid), true);
  for (const token of [undefined, '', valid + 'zz', valid + '00', valid.replace('gourmet_admin', 'customer'), valid.replace(/.$/, 'z')]) {
    assert.equal(auth.verifySessionToken(token), false);
  }
  const signed = stamp => { const payload = 'gourmet_admin:' + stamp; return payload + ':' + crypto.createHmac('sha256', synthetic.ADMIN_SESSION_SECRET).update(payload).digest('hex'); };
  for (const stamp of [String(Date.now() - 1000), String(Date.now() + 100000) + 'junk', 'Infinity', '999999999999999999999999999']) assert.equal(auth.verifySessionToken(signed(stamp)), false);
});
test('configured login issues unchanged protected cookie and private response; logout clears it', async () => {
  const { auth, route } = fixture(); const response = await route.POST(request({ pin: ' synthetic-pin ' }));
  assert.equal(response.status, 200); const cookie = response.headers.get('set-cookie');
  assert.match(cookie, /HttpOnly/i); assert.match(cookie, /SameSite=strict/i);
  assert.equal(auth.verifySessionToken(decodeURIComponent(cookie.split(';')[0].split('=')[1])), true);
  assert.equal(response.headers.get('cache-control'), 'private, no-store');
  const status = await route.GET(new NextRequest('https://store.example.test/api/admin/auth', { headers: { Cookie: cookie.split(';')[0] } }));
  assert.equal((await status.json()).authenticated, true); assert.equal(status.headers.get('cache-control'), 'private, no-store');
  const logout = await route.POST(request({ action: 'logout' })); assert.equal(logout.status, 200); assert.match(logout.headers.get('set-cookie'), /gourmet_admin_session=;/);
});
test('invalid JSON and invalid PIN/body types fail generically without stack or cookie', async () => {
  const { route } = fixture();
  for (const body of [null, [], 'text', { pin: {} }, { pin: 1234 }, { action: {} }]) {
    const response = await route.POST(request(body)); assert.equal(response.status, 400);
    assert.equal(response.headers.get('set-cookie'), null); assert.equal(response.headers.get('cache-control'), 'private, no-store');
  }
  const malformed = new NextRequest('https://store.example.test/api/admin/auth', { method: 'POST', body: '{not-json' });
  const response = await route.POST(malformed); assert.equal(response.status, 400); assert.equal((await response.json()).error, 'Invalid authentication request.');
});
test('bad PIN attempts retain existing lockout and cannot create sessions', async () => {
  const { route } = fixture();
  for (let n = 0; n < 4; n++) assert.equal((await route.POST(request({ pin: 'wrong' }))).status, 401);
  assert.equal((await route.POST(request({ pin: 'wrong' }))).status, 429);
  const blocked = await route.POST(request({ pin: synthetic.ADMIN_PORTAL_PIN })); assert.equal(blocked.status, 429); assert.equal(blocked.headers.get('set-cookie'), null);
});
