/* eslint-disable @typescript-eslint/no-require-imports -- Isolated Node harness loads the compiled route handler. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const nodemailer = require('nodemailer');
const { NextRequest } = require('next/server');

for (const name of ['Example Buyer', 'Synthetic Käufer']) test('enquiry preserves mail/vault contract with real MIME compilation: ' + name, async () => {
  const records = [], delivered = [], transportOptions = [];
  const smtp = { HOST: 'smtp.example.test', PORT: 465, SECURE: true, USER: 'sender@example.test', PASS: 'synthetic-test-only', RECIPIENT_EMAIL: 'recipient@example.test' };
  const exports = {};
  const source = fs.readFileSync(path.join(__dirname, '../src/app/api/send-inquiry/route.ts'), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const stubs = {
    nodemailer: { createTransport(options) { transportOptions.push(options);
      // Compile an actual MIME message entirely in memory. No SMTP/network call.
      const transport = nodemailer.createTransport({ streamTransport: true, buffer: true });
      return { async sendMail(message) { const result = await transport.sendMail(message); delivered.push({ message, result }); return result; } };
    } },
    '@/config/appRoutes.config': { API_KEYS_CONFIG: { SMTP: smtp } },
    '@/lib/geo/ipGeo': { resolveClientGeo: async () => ({ city: 'Example City', region: 'Example Region', country: 'IN', ip: '192.0.2.1' }) },
    '@/lib/security/vault': { recordInquiryInVault: async record => { records.push(record); } }
  };
  vm.runInNewContext(code, { exports, require: id => stubs[id] || require(id), process: { env: {} }, console });
  const body = { name, email: 'buyer@example.test', phone: '0000000000', company: 'Example Company', quantity: 2, occasion: 'Example occasion', productItems: [{ name: 'Example gift', quantity: 2 }], message: 'Synthetic enquiry only.' };
  const request = new NextRequest('https://store.example.test/api/send-inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const response = await exports.POST(request);
  assert.equal(response.status, 200); assert.equal((await response.json()).success, true);
  assert.equal(records.length, 1); assert.equal(records[0].email, body.email);
  assert.equal(transportOptions[0].host, smtp.HOST); assert.equal(transportOptions[0].port, 465); assert.equal(transportOptions[0].secure, true);
  assert.equal(delivered.length, 1); const { message, result } = delivered[0];
  assert.equal(message.to, smtp.RECIPIENT_EMAIL); assert.equal(message.replyTo, body.email); assert.ok(message.html.includes(body.name));
  assert.ok(message.text.includes(body.message)); assert.deepEqual(result.envelope.to, [smtp.RECIPIENT_EMAIL]);
  assert.match(result.message.toString(), /Reply-To: buyer@example.test/); assert.match(result.message.toString(), /multipart\/alternative/);
});
