const {MongoMemoryReplSet}=require('mongodb-memory-server');
const request=require('supertest');
const {connectDatabase,installSchema}=require('../client');
const {createAuthApp}=require('../../auth/app');
const auth=require('../../auth/service');
const {resources}=require('../../admin/resources');
jest.setTimeout(120000);
const base='/api/v1/auth/admin',origin='http://localhost:3001';
let mongo,db,app,owner,customer,ownerToken,customerToken;
beforeAll(async()=>{mongo=await MongoMemoryReplSet.create({replSet:{storageEngine:'wiredTiger'},instanceOpts:[{launchTimeout:60000}]});db=await connectDatabase({uri:mongo.getUri(),dbName:'gourmet_b2c_schema_test_admin_reads'});await installSchema(db);});
beforeEach(async()=>{
  app=createAuthApp({db,origin});
  owner=await db.models.User.create({email:'owner@example.test',roles:['OWNER']});ownerToken=await auth.issueSession(db,owner._id);
  customerToken=await auth.register(db,{name:'Reader',email:'reader@example.test',password:'long-test-password'});
  customer=(await auth.identity(db,customerToken)).customer;
});
afterEach(async()=>{if(db)for(const model of Object.values(db.models))await model.collection.deleteMany({});});
afterAll(async()=>{await db?.connection.close();await mongo?.stop();});
const get=(path,token=ownerToken)=>request(app).get(base+path).set('Cookie',`b2c_session=${token}`);
async function order(number='ORDER-TEST',currency='INR',amount=100){
  const address={recipientName:'Historical customer',phone:'+919999999999',addressLine1:'1 Example Lane',city:'Example',state:'Example',postalCode:'000000',country:'IN'};
  return db.models.Order.create({orderNumber:number,customerId:customer._id,idempotencyKey:number,requestHash:auth.digest(number),items:[{sku:'SNAPSHOT',productName:'Original gift name',quantity:1,unitPriceMinor:amount,currency,lineTotalMinor:amount}],pricing:{subtotalMinor:amount,grandTotalMinor:amount,currency},shippingAddressSnapshot:address,billingAddressSnapshot:address,customerSnapshot:{name:'Historical customer',email:customer.email}});
}
test('every read resource rejects anonymous/customer/forged roles and permits explicit owner reads',async()=>{
  for(const resource of Object.keys(resources)){
    await request(app).get(`${base}/${resource}`).expect(401);
    await get(`/${resource}`,customerToken).set('X-Role','OWNER').expect(403);
    const response=await get(`/${resource}`);expect(response.status).toBe(200);expect(Array.isArray(response.body.items)).toBe(true);
  }
  await get('/orders?role=OWNER',customerToken).expect(403);
});
test('order cursor pagination is bounded, stable and supports real filters',async()=>{
  const a=await order('A-ORDER'),b=await order('B-ORDER');await order('USD-ORDER','USD',500);
  const first=await get('/orders?limit=1&currency=INR');expect(first.status).toBe(200);expect(first.body.items).toHaveLength(1);expect(first.body.next).toBeTruthy();
  const second=await get(`/orders?limit=1&currency=INR&after=${first.body.next}`);expect(second.status).toBe(200);expect(second.body.items).toHaveLength(1);
  expect(new Set([first.body.items[0].id,second.body.items[0].id])).toEqual(new Set([String(a._id),String(b._id)]));expect(second.body.next).toBeNull();
  const found=await get('/orders?search=A-&currency=INR&minAmount=100&maxAmount=100');expect(found.body.items.map(x=>x.orderNumber)).toEqual(['A-ORDER']);
  expect((await get('/orders?paymentStatus=PAID')).body.items).toEqual([]);
});
test('invalid selectors, queries, cursor and money bounds fail without exposing internals',async()=>{
  for(const path of ['/orders?limit=500','/orders?limit=-1','/orders?after=bad','/orders?after=bnVsbA','/orders?status=PAID','/orders?sort=__proto__','/orders?minAmount=-1&currency=INR','/orders?minAmount=100','/orders?search[$ne]=x','/orders?role=OWNER','/orders?customerId=bad','/orders/not-an-id']){
    const r=await get(path);expect(r.status).toBe(422);expect(JSON.stringify(r.body)).not.toMatch(/Mongo|CastError|stack|passwordHash|mongodb:\/\//);
  }
  await get('/orders/000000000000000000000000').expect(404);
  await get('/unknown').expect(404);
});
test('customer360 returns related pages only for individually granted permissions',async()=>{
  await order();
  const staff=await db.models.User.create({email:'limited@example.test',roles:['ADMIN'],permissions:['customers.read']});
  const token=await auth.issueSession(db,staff._id);
  const r=await get(`/customers/${customer._id}`,token);expect(r.status).toBe(200);expect(r.body.item.email).toBe('reader@example.test');expect(r.body.related.addresses.items).toEqual([]);
  for(const key of ['orders','payments','refunds','invoices','audit-logs','coupon-usage'])expect(r.body.related[key]).toBeUndefined();
  await get(`/customers/${customer._id}/related/orders`,token).expect(403);
  await get(`/customers/${customer._id}`,customerToken).expect(403);
});
test('detail DTO preserves historical snapshots but excludes private URLs, credential-shaped metadata and raw internal fields',async()=>{
  const o=await order();
  const invoice=await db.models.Invoice.create({orderId:o._id,customerId:customer._id,sellerSnapshot:{name:'Example Seller'},customerSnapshot:{name:'Historical customer',email:customer.email,billingAddress:o.billingAddressSnapshot.toObject()},items:[{description:'Original gift name',sku:'SNAPSHOT',quantity:1,unitPriceMinor:100,totalMinor:100}],subtotalMinor:100,grandTotalMinor:100,currency:'INR',documentUrl:'https://private.example.test/signed-sensitive-document'});
  const result=await get(`/invoices/${invoice._id}`);expect(result.status).toBe(200);expect(result.body.item.items[0].description).toBe('Original gift name');
  expect(JSON.stringify(result.body)).not.toMatch(/documentUrl|signed-sensitive|passwordHash|authSessions|requestHash|googleSubject/);
  const customerView=await get(`/customers/${customer._id}`);expect(JSON.stringify(customerView.body)).not.toMatch(/documentUrl|signed-sensitive|passwordHash|authSessions|requestHash|googleSubject/);
});
test('reporting isolates currency, defines selected window and labels gross captures honestly',async()=>{
  await order('INR-REPORT');await order('USD-REPORT','USD');
  const query='?from=2026-01-01T00:00:00.000Z&to=2026-01-03T00:00:00.000Z&currency=INR&timezone=Asia%2FKolkata';
  const r=await get('/dashboard'+query);expect(r.status).toBe(200);expect(r.body.window.currency).toBe('INR');expect(r.body.window.timezone).toBe('Asia/Kolkata');
  expect(r.body.metrics.find(m=>m.key==='orders').value).toBe(0);expect(r.body.metrics.find(m=>m.key==='captured').formula).toContain('not recognized revenue');
  expect(r.body.definitions.revenue).toContain('UNKNOWN');expect(r.body.capabilities.refunds.available).toBe(false);
  for(const invalid of ['',query.replace('Asia%2FKolkata','Invalid%2FZone'),query.replace('2026-01-03','2027-01-03'),query.replace('currency=INR','currency=ALL_CURRENCIES')])await get('/dashboard'+invalid).expect(422);
});
test('attention deduplicates current exceptions, permissions suppress hidden resources, resolution removes alert',async()=>{
  const category=await db.models.Category.create({name:'Test',slug:'test'});
  const product=await db.models.Product.create({name:'Test',slug:'test',categoryIds:[category._id]});
  const variant=await db.models.ProductVariant.create({productId:product._id,sku:'TEST',currency:'INR',priceMinor:100});
  const inventory=await db.models.Inventory.create({variantId:variant._id,sku:'TEST'});
  const query='?from=2026-01-01T00:00:00.000Z&to=2026-01-02T00:00:00.000Z&currency=INR&timezone=UTC';
  let r=await get('/dashboard'+query);expect(r.body.attention.filter(a=>a.resourceId===String(inventory._id))).toHaveLength(1);
  await require('../transactions/inventory').moveStock(db,{variantId:variant._id,type:'RESTOCK',quantity:1,operationKey:'test-restock'});
  r=await get('/dashboard'+query);expect(r.body.attention.filter(a=>a.resourceId===String(inventory._id))).toHaveLength(0);
  const history=await get(`/inventory/${inventory._id}`);expect(history.body.related.movements.items[0].type).toBe('RESTOCK');
});
