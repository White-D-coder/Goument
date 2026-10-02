const {MongoMemoryReplSet}=require('mongodb-memory-server');
const request=require('supertest');const crypto=require('crypto');
const {connectDatabase,installSchema}=require('../client');
const {createOrder}=require('../repositories');const {moveStock}=require('../transactions/inventory');
const auth=require('../../auth/service');const {createAuthApp}=require('../../auth/app');
const {razorpayGateway,validSignature}=require('../../payments/razorpay');
const payments=require('../../payments/service');
jest.setTimeout(120000);
let mongo,db,gateway,app,remote;
const origin='http://localhost:3001',base='/api/v1/auth/payments';
const sign=(body,secret)=>crypto.createHmac('sha256',secret).update(body).digest('hex');
const address={recipientName:'Example',addressLine1:'1 Test Lane',city:'Example',state:'Example',postalCode:'000000',country:'IN'};
beforeAll(async()=>{mongo=await MongoMemoryReplSet.create({replSet:{storageEngine:'wiredTiger'}});db=await connectDatabase({uri:mongo.getUri(),dbName:'gourmet_b2c_schema_test_razorpay'});await installSchema(db);});
beforeEach(()=>{
 remote={id:'pay_example',order_id:'order_example',amount:1000,currency:'INR',status:'captured',captured:true};
 gateway=razorpayGateway({keyId:'rzp_test_example',keySecret:'test-api-secret',webhookSecret:'test-webhook-secret'});
 gateway.createOrder=jest.fn(async data=>({...data,id:'order_example'}));gateway.fetchPayment=jest.fn(async()=>remote);
 app=createAuthApp({db,origin,paymentGateway:gateway});
});
afterEach(async()=>{for(const model of Object.values(db.models))await model.collection.deleteMany({});});
afterAll(async()=>{if(db)await db.connection.close();if(mongo)await mongo.stop();});
async function fixture(reserve=true){
 const token=await auth.register(db,{name:'Example',email:'buyer@example.test',password:'example-password-long'});const {customer}=await auth.identity(db,token);
 const category=await db.models.Category.create({name:'Test',slug:'test'});const product=await db.models.Product.create({name:'Test item',slug:'test',categoryIds:[category._id],status:'ACTIVE'});
 const variant=await db.models.ProductVariant.create({productId:product._id,sku:'TEST-001',priceMinor:1000,currency:'INR'});await db.models.Inventory.create({variantId:variant._id,sku:variant.sku});await moveStock(db,{variantId:variant._id,type:'RESTOCK',quantity:2,operationKey:'open'});
 const order=await createOrder(db,{orderNumber:'TEST-1',customerId:customer._id,status:'PAYMENT_PENDING',idempotencyKey:'test-order',items:[{productId:product._id,variantId:variant._id,sku:variant.sku,productName:product.name,quantity:1,unitPriceMinor:1000,lineTotalMinor:1000,currency:'INR'}],pricing:{subtotalMinor:1000,grandTotalMinor:1000,currency:'INR'},shippingAddressSnapshot:address,billingAddressSnapshot:address,customerSnapshot:{name:'Example',email:customer.email}});
 if(reserve)await moveStock(db,{variantId:variant._id,type:'RESERVATION',quantity:1,orderId:order._id,operationKey:'reserve'});
 return {token,customer,order,variant};
}
const post=(f,path,body)=>request(app).post(base+path).set('Origin',origin).set('Cookie',`b2c_session=${f.token}`).send(body);
const verifyBody=f=>({orderId:String(f.order._id),razorpay_order_id:'order_example',razorpay_payment_id:'pay_example',razorpay_signature:sign('order_example|pay_example','test-api-secret')});
const rawEvent=()=>JSON.stringify({event:'payment.captured',payload:{payment:{entity:remote}}});
const webhook=raw=>request(app).post(base+'/razorpay/webhook').set('Content-Type','application/json').set('X-Razorpay-Signature',sign(raw,'test-webhook-secret')).send(raw);
test('create uses persisted amount only, reuses gateway order and ignores no client money',async()=>{
 const f=await fixture();await post(f,'/razorpay/order',{orderId:String(f.order._id),amount:1}).expect(400);
 const a=await post(f,'/razorpay/order',{orderId:String(f.order._id)}).expect(200);expect(a.body.amount).toBe(1000);expect(JSON.stringify(a.body)).not.toContain('secret');
 await post(f,'/razorpay/order',{orderId:String(f.order._id)}).expect(200);expect(gateway.createOrder).toHaveBeenCalledTimes(1);expect(gateway.createOrder.mock.calls[0][0].partial_payment).toBe(false);
});
test('unreserved, anonymous, foreign-owned and cross-origin payment requests reject',async()=>{
 const f=await fixture(false);await post(f,'/razorpay/order',{orderId:String(f.order._id)}).expect(409);
 await request(app).post(base+'/razorpay/order').set('Origin',origin).send({orderId:String(f.order._id)}).expect(401);
 const stranger=await auth.register(db,{name:'Other',email:'other@example.test',password:'example-password-long'});
 await post({...f,token:stranger},'/razorpay/order',{orderId:String(f.order._id)}).expect(404);
 await request(app).post(base+'/razorpay/order').set('Origin','https://evil.example').send({orderId:String(f.order._id)}).expect(403);expect(gateway.createOrder).not.toHaveBeenCalled();
});
test('concurrent initialization creates one remote order; timeout remains unresolved without duplicate retry',async()=>{
 const f=await fixture();gateway.createOrder.mockImplementation(async()=>{await new Promise(r=>setTimeout(r,100));throw new Error('network unknown');});
 await Promise.allSettled([payments.startPayment(db,gateway,f.customer._id,String(f.order._id)),payments.startPayment(db,gateway,f.customer._id,String(f.order._id))]);
 expect(gateway.createOrder).toHaveBeenCalledTimes(1);await expect(payments.startPayment(db,gateway,f.customer._id,String(f.order._id))).rejects.toMatchObject({status:409});expect(gateway.createOrder).toHaveBeenCalledTimes(1);
});
test('forged signature and mismatched amount/order/currency never confirm an order',async()=>{
 const f=await fixture();await post(f,'/razorpay/order',{orderId:String(f.order._id)});
 await post(f,'/razorpay/verify',{...verifyBody(f),razorpay_signature:'0'.repeat(64)}).expect(400);
 for(const changes of [{amount:1},{currency:'USD'},{order_id:'order_other'}]){gateway.fetchPayment.mockResolvedValueOnce({...remote,...changes});await post(f,'/razorpay/verify',verifyBody(f)).expect(400);}
 expect((await db.models.Order.findById(f.order._id)).paymentStatus).toBe('PENDING');expect(await db.models.FinanceEvent.countDocuments()).toBe(0);
});
test('authorized is pending, captured callback plus repeated webhook confirms stock and finance exactly once',async()=>{
 const f=await fixture();await post(f,'/razorpay/order',{orderId:String(f.order._id)});
 gateway.fetchPayment.mockResolvedValueOnce({...remote,status:'authorized',captured:false});const pending=await post(f,'/razorpay/verify',verifyBody(f)).expect(200);expect(pending.body.status).toBe('PENDING');
 const results=await Promise.all([post(f,'/razorpay/verify',verifyBody(f)),webhook(rawEvent()),webhook(rawEvent())]);expect(results.map(r=>r.status)).toEqual([200,200,200]);
 const order=await db.models.Order.findById(f.order._id);expect(order.paymentStatus).toBe('PAID');expect(order.status).toBe('CONFIRMED');expect(await db.models.FinanceEvent.countDocuments({type:'PAYMENT'})).toBe(1);expect(await db.models.InventoryTransaction.countDocuments({type:'SALE'})).toBe(1);
 await post(f,'/razorpay/order',{orderId:String(f.order._id)}).expect(409);
});
test('webhook raw bytes are authenticated without browser cookie/Origin; tampered body fails',async()=>{
 const f=await fixture();await post(f,'/razorpay/order',{orderId:String(f.order._id)});const raw=rawEvent();
 await request(app).post(base+'/razorpay/webhook').set('Content-Type','application/json').set('X-Razorpay-Signature',sign(raw,'test-webhook-secret')).send(raw+' ').expect(400);
 await webhook(raw).expect(200);await webhook(JSON.stringify({event:'payment.authorized'})).expect(200);
});
test('unknown captures and cancelled orders return retryable errors, never report success',async()=>{
 await webhook(rawEvent()).expect(503);const f=await fixture();await post(f,'/razorpay/order',{orderId:String(f.order._id)});f.order.status='CANCELLED';await f.order.save();await webhook(rawEvent()).expect(503);expect(await db.models.FinanceEvent.countDocuments()).toBe(0);
});
test('unconfigured provider stays unavailable; adapter uses official endpoint and signature secrets differ',async()=>{
 expect(razorpayGateway({})).toBeNull();expect(validSignature('x','bad','key')).toBe(false);
 const fake=jest.fn(async()=>({ok:true,json:async()=>({id:'order_fake'})}));const real=razorpayGateway({keyId:'rzp_test_example',keySecret:'api-key',webhookSecret:'webhook-key',fetcher:fake});
 await real.createOrder({amount:1000,currency:'INR'});expect(fake.mock.calls[0][0]).toBe('https://api.razorpay.com/v1/orders');expect(real.verifyCheckout('order_a','pay_b',sign('order_a|pay_b','api-key'))).toBe(true);expect(real.verifyWebhook(Buffer.from('x'),sign('x','api-key'))).toBe(false);
 const f=await fixture();await expect(payments.startPayment(db,null,f.customer._id,String(f.order._id))).rejects.toMatchObject({status:503});
});
