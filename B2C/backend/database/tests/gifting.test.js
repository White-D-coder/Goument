const { MongoMemoryReplSet } = require('mongodb-memory-server');
const request = require('supertest');
const { connectDatabase, installSchema } = require('../client');
const { createAuthApp } = require('../../auth/app');
const boxes = require('../../gifting/boxes.json');
const items = require('../../gifting/items.json');
jest.setTimeout(120000);
const origin = 'http://localhost:3001', base = '/api/v1/auth/gift';
let mongo, db, app;
beforeAll(async () => { mongo = await MongoMemoryReplSet.create({replSet:{storageEngine:'wiredTiger'}}); db = await connectDatabase({uri:mongo.getUri(),dbName:'gourmet_b2c_schema_test_gifting'}); await installSchema(db); });
beforeEach(() => {app=createAuthApp({db,origin});});
afterEach(async () => {for(const m of Object.values(db.models))await m.collection.deleteMany({});});
afterAll(async () => {if(db)await db.connection.close();if(mongo)await mongo.stop();});
const save = (agent,body) => agent.put(base+'/draft').set('Origin',origin).send(body);
async function login(agent,email='buyer@example.test'){await agent.post('/api/v1/auth/register').set('Origin',origin).send({name:'Test Buyer',email,password:'test-password-long'}).expect(201);}
const selection = (quantity=1,boxQuantity=1,revision=0) => ({revision, boxes:[{id:boxes[0].id,quantity:boxQuantity}],items:[{id:items[0].id,quantity}]});
test('catalogue hides server capacities and browser cookie is opaque, HttpOnly; count does not create sessions',async()=>{
 const r=await request(app).get(base+'/catalogue').expect(200);expect(r.body.boxes).toHaveLength(8);expect(JSON.stringify(r.body)).not.toMatch(/capacity|Slots/);
 const count=await request(app).get(base+'/count');expect(count.headers['set-cookie']).toBeUndefined();
 const start=await request(app).get(base+'/draft');expect(start.headers['set-cookie'][0]).toMatch(/HttpOnly/);expect(start.headers['set-cookie'][0]).toMatch(/SameSite=Lax/);
});
test('box selection persists; exact fit, overflow, multiple and mixed boxes are server checked without blocking item additions',async()=>{
 const agent=request.agent(app);await login(agent);await agent.get(base+'/draft');
 let r=await save(agent,selection(4)).expect(200);expect(r.body.packing).toBe('READY');expect(r.body.revision).toBe(1);
 r=await save(agent,selection(5,1,r.body.revision)).expect(200);expect(r.body.packing).toBe('NEEDS_BOXES');
 await agent.post(base+'/checkout-check').set('Origin',origin).send({capacity:1000}).expect(409);
 r=await save(agent,selection(5,2,r.body.revision)).expect(200);expect(r.body.packing).toBe('READY');
 r=await save(agent,{...selection(9,1,r.body.revision),boxes:[{id:boxes[0].id,quantity:1},{id:boxes[1].id,quantity:1}]}).expect(200);expect(r.body.packing).toBe('READY');
 const loaded=await agent.get(base+'/draft');expect(loaded.body.items[0].quantity).toBe(9);expect(JSON.stringify(loaded.body)).not.toContain('capacity');
 const check=await agent.post(base+'/checkout-check').set('Origin',origin).send({}).expect(200);expect(check.body.checkoutAvailable).toBe(false);expect(await db.models.Order.countDocuments()).toBe(0);
});
test('preview hampers save to the gift bag but cannot enter checkout with an assumed price',async()=>{
 const agent=request.agent(app);await login(agent);await agent.get(base+'/draft');
 const hamper=items.find(item=>item.id==='india_hamper');expect(hamper?.category).toBe('Gift Hampers');
 const draft=(await save(agent,{revision:0,boxes:[],items:[{id:hamper.id,quantity:1}]}).expect(200)).body;
 expect(draft.packing).toBe('READY');
 await agent.post(base+'/checkout-check').set('Origin',origin).send({}).expect(409)
  .expect(({body})=>expect(body.message).toMatch(/Hamper pricing needs confirmation/));
 await agent.get(base+'/checkout').expect(409);
 const address={recipientName:'Test Recipient',phone:'+91 9876543210',addressLine1:'Test Street',city:'Mumbai',state:'Maharashtra',postalCode:'400001',country:'IN'};
 await agent.post(base+'/address').set('Origin',origin).send(address).expect(409);
 await agent.post(base+'/order').set('Origin',origin).send({paymentMethod:'UPI'}).expect(409);
 expect(await db.models.CustomerAddress.countDocuments()).toBe(0);
 expect(await db.models.Order.countDocuments()).toBe(0);
});
test('unknown IDs, duplicate entries, negative/fractional/oversized quantities and client capacities reject',async()=>{
 const agent=request.agent(app);await agent.get(base+'/draft');
 for(const quantity of [0,-1,1.5,100,'2'])await save(agent,selection(quantity)).expect(400);
 await save(agent,{...selection(),capacity:10000}).expect(400);
 await save(agent,{...selection(),items:[{id:'invented',quantity:1}]}).expect(400);
 await save(agent,{...selection(),boxes:[{id:boxes[0].id,quantity:1,capacity:10000}]}).expect(400);
 await save(agent,{...selection(),items:[...selection().items,...selection().items]}).expect(400);
 expect(await db.models.GiftDraft.countDocuments()).toBe(0);
});
test('cross browser ownership, spoofed owner/header and cross origin requests cannot access or change another draft',async()=>{
 const a=request.agent(app),b=request.agent(app);await a.get(base+'/draft');await save(a,selection()).expect(200);
 const r=await b.get(base+'/draft');expect(r.body.items).toEqual([]);
 await b.put(base+'/draft').set('Origin','https://evil.example').send(selection()).expect(403);
 await save(b,{...selection(),ownerHash:'a'.repeat(64)}).expect(400);
 const other=await request(app).get(base+'/count').set('X-Session-Id','anything');expect(other.body.count).toBe(0);
 expect((await a.get(base+'/draft')).body.items).toHaveLength(1);
});
test('simultaneous saves have one winner; stale retries cannot silently overwrite state',async()=>{
 const agent=request.agent(app);await agent.get(base+'/draft');
 const initial=await Promise.all([save(agent,selection(1)),save(agent,selection(2))]);expect(initial.map(r=>r.status).sort()).toEqual([200,409]);
 const draft=(await agent.get(base+'/draft')).body;
 const edits=await Promise.all([save(agent,selection(3,1,draft.revision)),save(agent,selection(4,1,draft.revision))]);expect(edits.map(r=>r.status).sort()).toEqual([200,409]);
 await save(agent,selection(1,1,0)).expect(409);expect(await db.models.GiftDraft.countDocuments()).toBe(1);
});
test('removing boxes or items recomputes fit and prevents checkout for empty or unpackaged drafts',async()=>{
 const agent=request.agent(app);await login(agent);await agent.get(base+'/draft');let r=await save(agent,selection());
 r=await save(agent,{revision:r.body.revision,items:selection().items,boxes:[]});expect(r.body.packing).toBe('CHOOSE_BOX');
 await agent.post(base+'/checkout-check').set('Origin',origin).send({}).expect(409);
 r=await save(agent,{revision:r.body.revision,items:[],boxes:[]});expect(r.body.packing).toBe('EMPTY');
});

test('checkout requires sign-in, keeps guest selection after login and isolates saved delivery addresses',async()=>{
 const a=request.agent(app),b=request.agent(app);await a.get(base+'/draft');await save(a,selection()).expect(200);
 await a.post(base+'/checkout-check').set('Origin',origin).send({}).expect(401);
 await a.get(base+'/checkout').expect(401);
 await a.post(base+'/address').set('Origin',origin).send({}).expect(401);
 await login(a);await a.post(base+'/checkout-check').set('Origin',origin).send({}).expect(200);
 expect((await a.get(base+'/checkout').expect(200)).body.selection.items).toHaveLength(1);
 const address={recipientName:'Test Recipient',phone:'+91 9876543210',addressLine1:'Test Street',addressLine2:'',landmark:'',city:'Mumbai',state:'Maharashtra',postalCode:'400001',country:'IN'};
 for(const invalid of [{phone:'abc'},{postalCode:'123'},{recipientName:''},{customerId:'spoof'},{country:'India'}])await a.post(base+'/address').set('Origin',origin).send({...address,...invalid}).expect(400);
 await a.post(base+'/address').set('Origin','https://evil.example').send(address).expect(403);
 const saved=(await a.post(base+'/address').set('Origin',origin).send(address).expect(200)).body.address;
 expect(saved.phone).toBe('+919876543210');
 await a.post(base+'/address').set('Origin',origin).send({...saved,city:'Pune'}).expect(200);
 expect(await db.models.CustomerAddress.countDocuments()).toBe(1);
 await login(b,'other@example.test');await b.get(base+'/draft');await save(b,selection()).expect(200);
 expect((await b.get(base+'/checkout')).body.addresses).toEqual([]);
 await b.post(base+'/address').set('Origin',origin).send(saved).expect(404);
 expect((await a.get(base+'/checkout')).body.addresses[0].city).toBe('Pune');
 expect(await db.models.Order.countDocuments()).toBe(0);
});

test('guest items and box quantities survive registration, logout and password login without duplicating the browser cart', async () => {
 const agent = request.agent(app);
 const started = await agent.get(base + '/draft').expect(200);
 const giftCookie = started.headers['set-cookie'].find(value => value.startsWith('b2c_gift=')).split(';')[0];
 const guestSelection = {
  revision: 0,
  boxes: [{ id: boxes[0].id, quantity: 2 }, { id: boxes[1].id, quantity: 1 }],
  items: [{ id: items[0].id, quantity: 2 }, { id: items[1].id, quantity: 3 }],
 };
 const guest = (await save(agent, guestSelection).expect(200)).body;
 expect(guest.revision).toBe(1);
 expect((await agent.get(base + '/count').expect(200)).body.count).toBe(5);
 await agent.get('/api/v1/auth/me').expect(401);
 await agent.post(base + '/checkout-check').set('Origin', origin).send({}).expect(401);

 const credentials = { email: 'continuity@example.test', password: 'test-password-long' };
 const registered = await agent.post('/api/v1/auth/register').set('Origin', origin)
  .send({ ...credentials, name: 'Cart Continuity' }).expect(201);
 expect((registered.headers['set-cookie'] || []).join(';')).not.toContain('b2c_gift=');
 await agent.get('/api/v1/auth/me').expect(200);
 expect((await agent.get(base + '/draft').expect(200)).body).toEqual(guest);

 const signedIn = (await save(agent, {
  revision: guest.revision,
  boxes: guest.boxes,
  items: [{ id: items[0].id, quantity: 3 }, guest.items[1], { id: items[2].id, quantity: 1 }],
 }).expect(200)).body;
 expect(signedIn.revision).toBe(2);
 expect(signedIn.boxes).toEqual(guestSelection.boxes);
 expect((await agent.get(base + '/count').expect(200)).body.count).toBe(7);

 const loggedOut = await agent.post('/api/v1/auth/logout').set('Origin', origin).send({}).expect(200);
 expect((loggedOut.headers['set-cookie'] || []).join(';')).not.toContain('b2c_gift=');
 await agent.get('/api/v1/auth/me').expect(401);
 expect((await agent.get(base + '/draft').expect(200)).body).toEqual(signedIn);
 await agent.post(base + '/checkout-check').set('Origin', origin).send({}).expect(401);

 const loggedIn = await agent.post('/api/v1/auth/login').set('Origin', origin).send(credentials).expect(200);
 expect((loggedIn.headers['set-cookie'] || []).join(';')).not.toContain('b2c_gift=');
 expect((await agent.get(base + '/draft').expect(200)).body).toEqual(signedIn);
 expect((await agent.get(base + '/count').expect(200)).body.count).toBe(7);
 // The original opaque ownership token still addresses the same persisted draft.
 expect((await request(app).get(base + '/draft').set('Cookie', giftCookie).expect(200)).body).toEqual(signedIn);
 expect(await db.models.GiftDraft.countDocuments()).toBe(1);

 // Authentication does not silently expose this browser's cart to another browser.
 const otherBrowser = request.agent(app);
 await otherBrowser.post('/api/v1/auth/login').set('Origin', origin).send(credentials).expect(200);
 const otherDraft = (await otherBrowser.get(base + '/draft').expect(200)).body;
 expect(otherDraft).toMatchObject({ revision: 0, boxes: [], items: [] });
 expect((await otherBrowser.get(base + '/count').expect(200)).body.count).toBe(0);
 expect((await agent.get(base + '/draft').expect(200)).body).toEqual(signedIn);
});

test('Google callback and repeat sign-in preserve guest cart ownership, quantities and revision while signed-in additions persist', async () => {
 const provider = {
  authorization: ({ state }) => `https://accounts.google.com/o/oauth2/v2/auth?state=${state}`,
  exchange: jest.fn(async () => ({ sub: 'gift-google-user', email: 'gift-google@example.test', email_verified: true, given_name: 'Gift Customer' })),
 };
 app = createAuthApp({ db, origin, clientId: 'test-client', clientSecret: 'test-secret', provider });
 const agent = request.agent(app);
 const started = await agent.get(base + '/draft').expect(200);
 const giftCookie = started.headers['set-cookie'].find(value => value.startsWith('b2c_gift=')).split(';')[0];
 const guest = (await save(agent, {
  revision: 0,
  boxes: [{ id: boxes[0].id, quantity: 2 }],
  items: [{ id: items[0].id, quantity: 4 }, { id: items[1].id, quantity: 2 }],
 }).expect(200)).body;
 await agent.post(base + '/checkout-check').set('Origin', origin).send({}).expect(401);

 async function googleSignIn() {
  const start = await agent.get('/api/v1/auth/google?next=/checkout').expect(302);
  expect((start.headers['set-cookie'] || []).join(';')).not.toContain('b2c_gift=');
  const state = new URL(start.headers.location).searchParams.get('state');
  const callback = await agent.get('/api/v1/auth/google/callback').query({ state, code: 'test-code' }).expect(302);
  expect(callback.headers.location).toBe(origin + '/checkout');
  expect((callback.headers['set-cookie'] || []).join(';')).not.toContain('b2c_gift=');
  await agent.get('/api/v1/auth/me').expect(200);
  return state;
 }

 const firstState = await googleSignIn();
 expect((await agent.get(base + '/draft').expect(200)).body).toEqual(guest);
 expect((await agent.get(base + '/count').expect(200)).body.count).toBe(6);
 const signedIn = (await save(agent, {
  revision: guest.revision,
  boxes: guest.boxes,
  items: [{ id: items[0].id, quantity: 5 }, guest.items[1], { id: items[2].id, quantity: 1 }],
 }).expect(200)).body;
 expect(signedIn.revision).toBe(guest.revision + 1);
 expect(signedIn.boxes).toEqual(guest.boxes);
 expect((await agent.get(base + '/count').expect(200)).body.count).toBe(8);

 const replay = await agent.get('/api/v1/auth/google/callback').query({ state: firstState, code: 'test-code' }).expect(302);
 expect(replay.headers.location).toContain('authError=expired');
 expect(provider.exchange).toHaveBeenCalledTimes(1);
 expect((await agent.get(base + '/draft').expect(200)).body).toEqual(signedIn);
 await agent.post('/api/v1/auth/logout').set('Origin', origin).send({}).expect(200);
 await googleSignIn();
 expect((await agent.get(base + '/draft').expect(200)).body).toEqual(signedIn);
 expect((await request(app).get(base + '/draft').set('Cookie', giftCookie).expect(200)).body).toEqual(signedIn);
 expect((await agent.get(base + '/count').expect(200)).body.count).toBe(8);
 expect(provider.exchange).toHaveBeenCalledTimes(2);
 expect(await db.models.GiftDraft.countDocuments()).toBe(1);
 expect(await db.models.User.countDocuments()).toBe(1);
 expect(await db.models.Customer.countDocuments()).toBe(1);
});

test('database failure returns a cart-specific 503 without exposing connection details or writing a draft', async () => {
 const agent = request.agent(app);
 await agent.get(base + '/draft').expect(200);
 const connectionError = Object.assign(
  new Error('Cannot connect to mongodb://fixture-user:fixture-password@database.invalid:27017'),
  { name: 'MongooseServerSelectionError' },
 );
 const read = jest.spyOn(db.models.GiftDraft, 'findOne').mockRejectedValue(connectionError);
 try {
  const responses = [
   await agent.get(base + '/draft').expect(503),
   await save(agent, selection()).expect(503),
  ];
  for (const response of responses) {
   expect(response.body).toEqual({ message: 'Your cart is temporarily unavailable. Reload your cart before trying again.' });
   expect(response.text).not.toMatch(/Sign-in|MongooseServerSelectionError|mongodb:|fixture-user|fixture-password|database\.invalid/);
  }
  expect(read).toHaveBeenCalledTimes(2);
  expect(await db.models.GiftDraft.countDocuments()).toBe(0);
 } finally {
  read.mockRestore();
 }
});
