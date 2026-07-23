const request = require('supertest');
const app = require('../../../app');
const { setupDB } = require('../../../shared/utils/testSetup');

setupDB();

describe('Health Check API', () => {
  it('should respond with connection statuses and return a 200 OK', async () => {
    const res = await request(app).get('/api/v1/healthz');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.services).toHaveProperty('mongodb');
    expect(res.body.services).toHaveProperty('redis');
  });
});
