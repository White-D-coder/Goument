const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), vm = require('node:vm'), ts = require('typescript');
function load(fetch) {
 const exports = {};
 const compiled = ts.transpileModule(fs.readFileSync('src/lib/api.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
 vm.runInNewContext(compiled, { exports, fetch, window: {}, AbortSignal, Map });
 return exports;
}
const response = (data, status = 200) => ({ ok: status < 400, status, json: async () => data });
test('simultaneous bootstrap consumers share a request, settled private responses are never cached', async () => {
 let release; const calls = [];
 const { api } = load(url => { calls.push(url); return new Promise(r => { release = r; }); });
 const a = api('/auth/me'), b = api('/auth/me');
 assert.equal(calls.length, 1); release(response({ user: { role: 'customer' } }));
 await Promise.all([a,b]);
 const c = api('/auth/me'); assert.equal(calls.length, 2); release(response({ user: { role: 'owner' } }));
 assert.equal((await c).user.role, 'owner');
});
test('failed bootstrap reads can retry without sharing draft operations', async () => {
 let calls = 0;
 const { api } = load(async () => { calls++; return response({ message: 'Limited' }, 429); });
 await assert.rejects(Promise.all([api('/auth/gift/count'), api('/auth/gift/count')]), { status: 429 });
 assert.equal(calls, 1);
 await assert.rejects(api('/auth/gift/count'), { status: 429 }); assert.equal(calls, 2);
 await Promise.allSettled([api('/auth/gift/draft'), api('/auth/gift/draft')]); assert.equal(calls, 4);
});
test('mutations invalidate sharing without an old completion clearing newer bootstrap reads', async () => {
 const releases = [];
 const { api } = load(() => new Promise(r => releases.push(r)));
 const old = api('/auth/me'), mutation = api('/auth/logout', 'POST'), fresh = api('/auth/me');
 assert.equal(releases.length, 3);
 releases[0](response({ user: { role: 'owner' } })); await old;
 const shared = api('/auth/me'); assert.equal(releases.length, 3);
 releases[1](response({ success: true })); releases[2](response({ message: 'Not signed in' }, 401));
 await mutation; await assert.rejects(fresh, { status: 401 }); await assert.rejects(shared, { status: 401 });
});
