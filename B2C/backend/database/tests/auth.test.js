const {MongoMemoryReplSet}=require('mongodb-memory-server');
const request=require('supertest');
const crypto=require('crypto');
const jwt=require('jsonwebtoken');
const {connectDatabase,installSchema}=require('../client');
const {createAuthApp}=require('../../auth/app');
const auth=require('../../auth/service');
const {googleProvider}=require('../../auth/google');
jest.setTimeout(120000);
let mongo,db,app,provider;
const origin='http://localhost:3001';
const claims={sub:'google-user-123',email:'google@example.test',email_verified:true,given_name:'Google Customer'};
beforeAll(async()=>{mongo=await MongoMemoryReplSet.create({replSet:{storageEngine:'wiredTiger'}});db=await connectDatabase({uri:mongo.getUri(),dbName:'gourmet_b2c_schema_test_auth'});await installSchema(db);});
beforeEach(()=>{provider={authorization:({state})=>`https://accounts.google.com/o/oauth2/v2/auth?state=${state}`,exchange:jest.fn(async()=>claims)};app=createAuthApp({db,origin,clientId:'test-client',clientSecret:'test-secret',provider});});
afterEach(async()=>{for(const model of Object.values(db.models))await model.collection.deleteMany({});});
afterAll(async()=>{if(db)await db.connection.close();if(mongo)await mongo.stop();});
async function googleStart(agent){const r=await agent.get('/api/v1/auth/google');return new URL(r.headers.location).searchParams.get('state');}
test('Google callback persists one user/customer, cookie session survives bootstrap, logout revokes it',async()=>{
 const agent=request.agent(app);const state=await googleStart(agent);const callback=await agent.get(`/api/v1/auth/google/callback?code=ok&state=${state}`);expect(callback.status).toBe(302);expect(callback.headers.location).toBe(origin+'/account');
 const cookies=callback.headers['set-cookie'];expect(cookies.join(';')).toContain('HttpOnly');expect(cookies.join(';')).toContain('SameSite=Lax');
 const session=cookies.find(x=>x.startsWith('b2c_session=')).split(';')[0];
 const me=await agent.get('/api/v1/auth/me');expect(me.status).toBe(200);expect(me.body.user.role).toBe('customer');expect(me.body.user.name).toBe('Google Customer');
 expect(await db.models.User.countDocuments()).toBe(1);expect(await db.models.Customer.countDocuments()).toBe(1);
 const stored=await db.models.User.findOne().select('+authSessions +googleSubject');expect(stored.googleSubject).toBe(claims.sub);expect(stored.authSessions).toHaveLength(1);expect(JSON.stringify(stored)).not.toContain(session.split('=')[1]);
 const history=await agent.get('/api/v1/auth/orders');expect(history.status).toBe(200);expect(history.body.orders).toEqual([]);
 await agent.post('/api/v1/auth/logout').set('Origin',origin).expect(200);await request(app).get('/api/v1/auth/me').set('Cookie',session).expect(401);
});
test('OAuth state is browser-bound and callback is consumed once',async()=>{
 const agent=request.agent(app);const state=await googleStart(agent);
 const stranger=await request(app).get(`/api/v1/auth/google/callback?state=${state}&code=stolen`);expect(stranger.headers.location).toContain('authError=expired');expect(provider.exchange).not.toHaveBeenCalled();
 await agent.get(`/api/v1/auth/google/callback?state=${state}&code=ok`);await agent.get(`/api/v1/auth/google/callback?state=${state}&code=replay`);expect(provider.exchange).toHaveBeenCalledTimes(1);
});
test('concurrent same Google subject logins create one identity and customer',async()=>{
 const tokens=await Promise.all([auth.googleLogin(db,claims),auth.googleLogin(db,claims)]);expect(await db.models.User.countDocuments()).toBe(1);expect(await db.models.Customer.countDocuments()).toBe(1);for(const token of tokens)await expect(auth.identity(db,token)).resolves.toHaveProperty('customer');
});
test('Google does not link by email, grant staff roles or accept unverified emails',async()=>{
 const token=await auth.register(db,{name:'Existing',email:claims.email,password:'long-demo-password',roles:['OWNER']});const user=await auth.identity(db,token);expect(user.user.roles).toEqual(['CUSTOMER']);
 await expect(auth.googleLogin(db,claims)).rejects.toMatchObject({status:409});await expect(auth.googleLogin(db,{...claims,email_verified:false})).rejects.toThrow('Verified');expect(await db.models.Customer.countDocuments()).toBe(1);
});
test('revoked/expired/disabled sessions fail and password accounts work in new DB',async()=>{
 const token=await auth.register(db,{name:'Example',email:'mail@example.test',password:'long-demo-password'});await expect(auth.passwordLogin(db,'MAIL@example.test','long-demo-password')).resolves.toMatch(/^[a-f0-9]{24}\./);await expect(auth.passwordLogin(db,'mail@example.test','wrong')).rejects.toThrow('Invalid');
 const {user}=await auth.identity(db,token);const stored=await db.models.User.findById(user._id).select('+authSessions');stored.authSessions=stored.authSessions.map(s=>({digest:s.digest,expiresAt:new Date(0)}));await stored.save();await expect(auth.identity(db,token)).rejects.toThrow('Session expired');
 const next=await auth.issueSession(db,user._id);const fresh=await db.models.User.findById(user._id);fresh.status='DISABLED';await fresh.save();await expect(auth.identity(db,next)).rejects.toThrow();
});
test('cross-origin writes denied and unavailable Google never fakes authentication',async()=>{
 await request(app).post('/api/v1/auth/register').set('Origin','https://attacker.example').send({}).expect(403);
 const offline=createAuthApp({db,origin});const config=await request(offline).get('/api/v1/auth/config');expect(config.body.googleEnabled).toBe(false);const start=await request(offline).get('/api/v1/auth/google');expect(start.headers.location).toContain('unavailable');await request(offline).get('/api/v1/auth/me').expect(401);
});
test('Google denial or provider failure leaves no session/account',async()=>{
 const agent=request.agent(app);let state=await googleStart(agent);let r=await agent.get(`/api/v1/auth/google/callback?state=${state}&error=access_denied`);expect(r.headers.location).toContain('cancelled');expect(provider.exchange).not.toHaveBeenCalled();
 state=await googleStart(agent);provider.exchange.mockRejectedValue(new Error('bad signature'));r=await agent.get(`/api/v1/auth/google/callback?state=${state}&code=invalid`);expect(r.headers.location).toContain('failed');expect(await db.models.User.countDocuments()).toBe(0);await agent.get('/api/v1/auth/me').expect(401);
});
test('real RSA verifier rejects tampering, wrong audience/issuer/nonce, expiry and unverified identity',async()=>{
 const {privateKey,publicKey}=crypto.generateKeyPairSync('rsa',{modulusLength:2048});const jwk={...publicKey.export({format:'jwk'}),kid:'test-key',use:'sig'};
 const verify=googleProvider({clientId:'test-client',fetcher:async()=>({ok:true,json:async()=>({keys:[jwk]})})}).verify;
 const base={...claims,nonce:'nonce',aud:'test-client',iss:'https://accounts.google.com'};
 const sign=(changes={},expiry=300)=>jwt.sign({...base,...changes},privateKey,{algorithm:'RS256',keyid:'test-key',expiresIn:expiry});
 await expect(verify(sign(),'nonce')).resolves.toHaveProperty('sub',claims.sub);
 for(const changes of [{aud:'other'},{iss:'https://attacker.example'},{nonce:'wrong'},{email_verified:false},{azp:'other'}])await expect(verify(sign(changes),'nonce')).rejects.toThrow();
 await expect(verify(sign({},-60),'nonce')).rejects.toThrow();await expect(verify(sign().slice(0,-12)+'tampered','nonce')).rejects.toThrow();
});
test('account order history is scoped to its persistent customer, not caller IDs',async()=>{
 const mine=await auth.register(db,{name:'Mine',email:'mine@example.test',password:'long-demo-password'});
 const other=await auth.register(db,{name:'Other',email:'other@example.test',password:'long-demo-password'});
 const owner=await auth.identity(db,mine);const stranger=await auth.identity(db,other);
 const address={recipientName:'Example',addressLine1:'1 Test Lane',city:'Test',state:'Test',postalCode:'000000',country:'IN'};
 for(const [customer,key]of [[owner.customer,'mine'],[stranger.customer,'other']])await db.models.Order.create({customerId:customer._id,orderNumber:key,idempotencyKey:key,requestHash:auth.digest(key),items:[{sku:'SNAPSHOT',productName:'Historical gift',quantity:1,unitPriceMinor:100,currency:'INR',lineTotalMinor:100}],pricing:{subtotalMinor:100,grandTotalMinor:100,currency:'INR'},shippingAddressSnapshot:address,billingAddressSnapshot:address,customerSnapshot:{name:customer.firstName,email:customer.email}});
 const response=await request(app).get(`/api/v1/auth/orders?customerId=${stranger.customer._id}`).set('Cookie',`b2c_session=${mine}`);
 expect(response.status).toBe(200);expect(response.body.orders).toHaveLength(1);const order=await db.models.Order.findById(response.body.orders[0]._id);expect(order.orderNumber).toBe('mine');
});
test('Google stable subject survives email changes; secrets stay out of projections',async()=>{
 const token=await auth.googleLogin(db,claims);const before=await auth.identity(db,token);await auth.googleLogin(db,{...claims,email:'changed@example.test'});expect(await db.models.Customer.countDocuments()).toBe(1);const projected=await db.models.User.findById(before.user._id).lean();expect(projected.authSessions).toBeUndefined();expect(projected.googleSubject).toBeUndefined();expect(projected.passwordHash).toBeUndefined();
});

test('Google checkout return is state-bound and external return URLs are rejected',async()=>{
 for(const [next,expected] of [['/checkout','/checkout'],['https://evil.example','/account'],['//evil.example','/account']]){
  const agent=request.agent(app);const start=await agent.get('/api/v1/auth/google?next='+encodeURIComponent(next));
  const state=new URL(start.headers.location).searchParams.get('state');
  const callback=await agent.get('/api/v1/auth/google/callback?code=ok&state='+state+'&next=https://evil.example');
  expect(callback.headers.location).toBe(origin+expected);
 }
});
