const request = require('supertest');
const app = require('../../../app');
test.each(['https://www.gourmetgem.com','https://m.gourmetgem.com','http://localhost:3000','http://127.0.0.1:3000'])('CORS allows exact established origin %s', async origin => {
 const response = await request(app).options('/api/v1/products').set('Origin', origin).set('Access-Control-Request-Method', 'GET');
 expect(response.headers['access-control-allow-origin']).toBe(origin);
 expect(response.headers['access-control-allow-credentials']).toBe('true');
});
test.each(['https://attacker.invalid','http://localhost.attacker.invalid','http://127.0.0.1.attacker.invalid','http://192.168.attacker.invalid','https://www.gourmetgem.com.attacker.invalid','http://localhost:9999'])('CORS denies unlisted or prefix-lookalike origin %s', async origin => {
 const response = await request(app).options('/api/v1/products').set('Origin', origin).set('Access-Control-Request-Method', 'GET');
 expect(response.headers['access-control-allow-origin']).toBeUndefined();
 expect(response.headers['access-control-allow-credentials']).toBeUndefined();
});
