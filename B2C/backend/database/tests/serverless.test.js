const request = require('supertest');
const { MongoMemoryReplSet } = require('mongodb-memory-server');
const { connectDatabase, installSchema } = require('../client');
const { createHandler } = require('../../api');
const { setupOwners } = require('../../admin/setup-owners');
jest.setTimeout(120000);
let mongo, db;
const env = { NODE_ENV: 'production', B2C_DATABASE_URI: 'fixture', B2C_DATABASE_NAME: 'gourmet_b2c_schema_test_serverless', AUTH_ORIGIN: 'http://localhost:3001' };
beforeAll(async()=>{mongo=await MongoMemoryReplSet.create({replSet:{storageEngine:'wiredTiger'}});db=await connectDatabase({uri:mongo.getUri(),dbName:env.B2C_DATABASE_NAME});await installSchema(db);});
afterEach(async()=>{jest.restoreAllMocks();for(const model of Object.values(db.models))await model.collection.deleteMany({});});
afterAll(async()=>{await db?.connection.close();await mongo?.stop();});
const handler = overrides => createHandler({env,connect:async()=>db,...overrides});

test('initialization is shared, temporary failures are generic and retryable, readiness fails closed',async()=>{
 let readiness=1;const connected={...db,connection:{get readyState(){return readiness;}}};
 const connect=jest.fn().mockRejectedValueOnce(Error('private mongodb://fixture:secret@invalid')).mockResolvedValue(connected);
 const app=handler({connect,retryDelayMs:0});
 const failed=await request(app).get('/healthz').expect(503);expect(failed.text).not.toMatch(/mongodb|fixture|secret/);expect(failed.headers['cache-control']).toBe('no-store');
 expect(failed.headers['server-timing']).toMatch(/^init;dur=\d+\.\d$/);
 await Promise.all([request(app).get('/healthz').expect(200),request(app).get('/api/v1/auth/config').expect(200)]);expect(connect).toHaveBeenCalledTimes(2);
 readiness=0;await request(app).get('/healthz').expect(503);
});
test('wrapper retains initialization and profile timings together without caching the identity response',async()=>{
 const app=handler();
 const response=await request(app).get('/api/v1/auth/me').expect(401);
 expect(response.headers['server-timing']).toMatch(/^init;dur=\d+\.\d, profile;dur=\d+\.\d$/);
 expect(response.headers['cache-control']).toMatch(/private.*no-store/);
 const warm=await request(app).get('/healthz').expect(200);
 expect(warm.headers['server-timing']).toMatch(/^init;dur=\d+\.\d$/);
});
test('wrapper preserves raw webhook signature verification, parser caps and generic errors',async()=>{
 const verifyWebhook=jest.fn((raw,signature)=>Buffer.isBuffer(raw)&&signature==='fixture-signature');const gatewayFactory=jest.fn(()=>({verifyWebhook}));const app=handler({gatewayFactory});
 await request(app).post('/api/v1/auth/payments/razorpay/webhook').set('x-razorpay-signature','fixture-signature').send({event:'audit.ignored'}).expect(200);expect(verifyWebhook).toHaveBeenCalledTimes(1);expect(gatewayFactory).toHaveBeenCalledTimes(1);
 await request(app).post('/api/v1/auth/payments/razorpay/webhook').set('x-razorpay-signature','invalid').send({event:'audit.ignored'}).expect(400);
 const broken=await request(app).post('/api/v1/auth/login').set('Origin',env.AUTH_ORIGIN).set('Content-Type','application/json').send('{bad').expect(400);expect(broken.body.message).toBe('Invalid JSON request.');expect(broken.text).not.toMatch(/SyntaxError|node_modules/);
 await request(app).post('/api/v1/auth/login').set('Origin',env.AUTH_ORIGIN).send({padding:'x'.repeat(9000)}).expect(413);
});
test('catalogue escapes regex, validates bounded inputs, projects DTOs and conceals database errors',async()=>{
 const category=await db.models.Category.create({name:'Gifts',slug:'gifts'});
 await db.models.Product.create({name:'Gift [special]',slug:'gift-special',status:'ACTIVE',categoryIds:[category._id],media:[{url:'/test.webp',publicId:'internal-storage-ref'}]});
 await db.models.Product.create({name:'Gift secret draft',slug:'gift-draft',categoryIds:[category._id]});const app=handler();
 const r=await request(app).get('/api/v1/products').query({search:'['}).expect(200);expect(r.body.total).toBe(1);expect(r.text).not.toMatch(/categoryIds|internal-storage-ref|__v|updatedAt/);
 for(const query of [{search:'x'.repeat(81)},{search:['a','b']},{page:'10000'},{limit:'101'},{sort:'unknown'}])await request(app).get('/api/v1/products').query(query).expect(400);
 await request(app).get('/api/v1/products/gift-draft').expect(404);
 jest.spyOn(db.models.Product,'findOne').mockImplementation(()=>{throw Error('private query connection detail');});const failed=await request(app).get('/api/v1/products/gift-special').expect(503);expect(failed.text).not.toMatch(/private|query|connection/);
});
test('retired bulk owner setup cannot reach or mutate database identities',async()=>{
 const database=new Proxy({}, {get(){throw Error('Database access must not occur');}});await expect(setupOwners(database)).rejects.toThrow('Bulk owner setup is disabled');
});
