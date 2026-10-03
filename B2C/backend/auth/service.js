const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { transaction } = require('../database/transactions/common');
const { registerCustomer } = require('../database/repositories');
const digest = value => crypto.createHash('sha256').update(value).digest('hex');
const random = () => crypto.randomBytes(32).toString('base64url');
const SESSION_MS = 7 * 24 * 60 * 60 * 1000;
function failure(message, status = 401) { return Object.assign(new Error(message), { status }); }
async function issueSession(db, id) {
  const token = `${id}.${random()}`;
  await transaction(db, async session => {
    const user = await db.models.User.findById(id).select('+authSessions').session(session);
    if (!user || user.status !== 'ACTIVE') throw failure('Account unavailable');
    user.authSessions = (user.authSessions || []).filter(s => s.expiresAt > new Date()).slice(-9);
    user.authSessions.push({ digest: digest(token), expiresAt: new Date(Date.now()+SESSION_MS) });
    user.lastLoginAt = new Date(); await user.save({ session });
  });
  return token;
}
async function sessionUser(db, token, session) {
  if (typeof token !== 'string' || !/^[a-f0-9]{24}\.[A-Za-z0-9_-]{43}$/.test(token)) throw failure('Please sign in');
  const user = await db.models.User.findOne({ _id: token.split('.')[0], status: 'ACTIVE', authSessions: { $elemMatch: { digest: digest(token), expiresAt: { $gt: new Date() } } } }).session(session || null).maxTimeMS(5000);
  if (!user) throw failure('Session expired. Please sign in again');
  return user;
}
async function identity(db, token) {
  const user = await sessionUser(db, token);
  const customer = await db.models.Customer.findOne({ userId: user._id, status: 'ACTIVE' });
  if (!customer) throw failure('Customer account unavailable');
  return { user, customer };
}
async function logout(db, token) {
  if (typeof token !== 'string' || !/^[a-f0-9]{24}\.[A-Za-z0-9_-]{43}$/.test(token)) return;
  await transaction(db, async session => {
    const user = await db.models.User.findById(token.split('.')[0]).select('+authSessions').session(session);
    if (!user) return;
    user.authSessions = user.authSessions.filter(s => s.digest !== digest(token)); await user.save({ session });
  });
}
async function googleLogin(db, claims) {
  // Only called after server-side signature, audience, issuer, expiry and nonce verification.
  if (claims.email_verified !== true || !claims.sub || typeof claims.email !== 'string') throw failure('Verified Google identity required');
  const work = () => transaction(db, async session => {
    let user = await db.models.User.findOne({ googleSubject: claims.sub }).session(session);
    if (!user) {
      // Never silently attach Google to an existing password/other identity by email.
      if (await db.models.User.exists({ emailNormalized: claims.email.trim().toLowerCase() }).session(session)) throw failure('Use your existing sign-in method for this email. Account linking is not enabled.', 409);
      [user] = await db.models.User.create([{ googleSubject: claims.sub, email: claims.email, roles: ['CUSTOMER'], emailVerifiedAt: new Date() }], { session });
      await db.models.Customer.create([{ userId: user._id, email: claims.email, firstName: String(claims.given_name || claims.name || 'Customer').slice(0,250), ...(claims.family_name ? { lastName: String(claims.family_name).slice(0,250) } : {}) }], { session });
    }
    if (user.status !== 'ACTIVE') throw failure('Account unavailable');
    return user._id;
  });
  let id;
  try { id = await work(); } catch (error) { if (error.code !== 11000) throw error; id = await work(); }
  const token = await issueSession(db, id);
  const user = await sessionUser(db, token);
  if (!user.roles.some(role => ['ADMIN', 'OWNER'].includes(role))) await identity(db, token);
  return token;
}
async function passwordLogin(db, email, password) {
  if (typeof email !== 'string' || typeof password !== 'string' || password.length > 1000) throw failure('Invalid email or password');
  const user = await db.models.User.findOne({ emailNormalized: email.trim().toLowerCase() }).select('+passwordHash');
  // Fixed-cost comparison also for an unknown identity.
  const fallback = '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxvFJdhTB3PHSlZG3zLBjXsYX7S';
  const valid = await bcrypt.compare(password, user?.passwordHash || fallback);
  if (!user?.passwordHash || !valid || user.status !== 'ACTIVE') throw failure('Invalid email or password');
  if (!user.roles.some(role => ['ADMIN', 'OWNER'].includes(role))) {
    const customer = await db.models.Customer.findOne({ userId: user._id, status: 'ACTIVE' });
    if (!customer) throw failure('Account unavailable');
  }
  return issueSession(db, user._id);
}
async function register(db, body) {
  if (!body || typeof body !== 'object' || Array.isArray(body) || typeof body.name !== 'string' || !body.name.trim() || body.name.length > 100 || typeof body.email !== 'string' || typeof body.password !== 'string' || body.password.length < 12 || Buffer.byteLength(body.password)>72) throw failure('Enter your name, email and a password of 12–72 bytes.', 400);
  try { const result = await registerCustomer(db, { email: body.email, password: body.password, firstName: body.name.trim() }); return issueSession(db, result.userId); }
  catch(error) { if(error.code===11000)throw failure('Unable to create account. Try signing in with your existing method.',409);throw error; }
}
module.exports = { random, digest, SESSION_MS, failure, issueSession, sessionUser, identity, logout, googleLogin, passwordLogin, register };
