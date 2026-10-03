const request = require('supertest');
const app = require('../../../app');
const { setupDB } = require('../../../shared/utils/testSetup');
const User = require('../auth.model');
const authService = require('../auth.service');

setupDB();

describe('Auth Feature Integration', () => {
  const testUser = {
    email: 'testuser@gourmetgem.com',
    password: 'password12345',
    name: 'Tester User',
    phone: '9876543210'
  };

  it('should register a user and issue secure token cookies', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(testUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.headers['set-cookie']).toBeDefined();

    const cookies = res.headers['set-cookie'].join(';');
    expect(cookies).toContain('accessToken');
    expect(cookies).toContain('refreshToken');
  });

  it('should authenticate user with valid credentials', async () => {
    // Populate user
    await request(app).post('/api/v1/auth/register').send(testUser);

    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it.each(['admin', 'owner', { role: 'admin' }, ['admin']])(
    'should keep public signup unprivileged when role is %j',
    async (role) => {
      const registration = await request(app)
        .post('/api/v1/auth/register')
        .send({ ...testUser, role });

      expect(registration.status).toBe(201);
      const user = await User.findOne({ email: testUser.email });
      expect(user.role).toBe('customer');
      const cookie = registration.headers['set-cookie']
        .find((value) => value.startsWith('accessToken='));
      const token = cookie.split(';')[0].slice('accessToken='.length);
      const profile = await request(app).get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`);
      expect(profile.status).toBe(200);
      expect(profile.body.user.role).toBe('customer');
      const admin = await request(app).get('/api/v1/admin/orders')
        .set('Authorization', `Bearer ${token}`);
      expect(admin.status).toBe(403);
    }
  );

  it('should enforce the signup role in the service without route validation', async () => {
    await authService.register({ ...testUser, role: 'admin' });
    const user = await User.findOne({ email: testUser.email });
    expect(user.role).toBe('customer');
  });

  it('should preserve login and authorization for an existing administrator', async () => {
    await User.create({
      email: testUser.email,
      name: testUser.name,
      passwordHash: testUser.password,
      role: 'admin'
    });
    const login = await request(app).post('/api/v1/auth/login')
      .send({ email: testUser.email, password: testUser.password });
    expect(login.status).toBe(200);
    const cookie = login.headers['set-cookie']
      .find((value) => value.startsWith('accessToken='));
    const token = cookie.split(';')[0].slice('accessToken='.length);
    const orders = await request(app).get('/api/v1/admin/orders')
      .set('Authorization', `Bearer ${token}`);
    expect(orders.status).toBe(200);
  });

  it('should reject refresh tokens used multiple times (reuse detection)', async () => {
    const registerRes = await request(app)
      .post('/api/v1/auth/register')
      .send(testUser);

    const cookieHeader = registerRes.headers['set-cookie'];
    const refreshCookie = cookieHeader.find((c) => c.startsWith('refreshToken='));
    const initialRefreshToken = refreshCookie.split(';')[0].split('=')[1];

    // First rotation request
    const firstRefresh = await request(app)
      .post('/api/v1/auth/refresh-token')
      .set('Cookie', [`refreshToken=${initialRefreshToken}`]);
    expect(firstRefresh.status).toBe(200);

    // Second rotation request with the same refresh token must trigger reuse detection and revoke sessions
    const secondRefresh = await request(app)
      .post('/api/v1/auth/refresh-token')
      .set('Cookie', [`refreshToken=${initialRefreshToken}`]);
    expect(secondRefresh.status).toBe(401);
    expect(secondRefresh.body.message).toContain('reuse detected');
  });
});
