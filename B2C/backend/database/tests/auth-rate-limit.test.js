const express = require('express');
const request = require('supertest');
const { createAuthRateLimit } = require('../../auth/rate-limit');
function fixture() {
 const app = express();
 app.use('/api/v1/auth', createAuthRateLimit());
 app.use((_req, res) => res.json({ ok: true }));
 return app;
}
afterEach(() => jest.restoreAllMocks());
test('storefront browsing exceeds 60 bootstrap reads without consuming write/auth allowance', async () => {
 const app = fixture(), paths = ['/me', '/gift/count', '/gift/draft', '/gift/catalogue'];
 for (let i = 0; i < 80; i++) await request(app).get('/api/v1/auth' + paths[i % paths.length]).expect(200);
 await request(app).post('/api/v1/auth/login').expect(200);
 await request(app).put('/api/v1/auth/gift/draft').expect(200);
});
test('read burst is still bounded, returns Retry-After and expires', async () => {
 let now = 100000; jest.spyOn(Date, 'now').mockImplementation(() => now);
 const app = fixture();
 for (let i = 0; i < 300; i++) await request(app).get('/api/v1/auth/gift/count').expect(200);
 const limited = await request(app).get('/api/v1/auth/me').expect(429);
 expect(limited.headers['retry-after']).toBe('60');
 await request(app).post('/api/v1/auth/login').expect(200);
 now += 60000;
 await request(app).get('/api/v1/auth/me').expect(200);
});
test('credential/OAuth/write budget remains 60 and forwarded headers cannot bypass it', async () => {
 const app = fixture();
 for (let i = 0; i < 60; i++) await request(app).post('/api/v1/auth/login').set('X-Forwarded-For', `192.0.2.${i}`).expect(200);
 await request(app).post('/api/v1/auth/login').set('X-Forwarded-For', '198.51.100.1').expect(429);
 await request(app).get('/api/v1/auth/google').expect(429);
 await request(app).put('/api/v1/auth/gift/draft').expect(429);
 await request(app).get('/api/v1/auth/gift/draft').expect(200);
});
