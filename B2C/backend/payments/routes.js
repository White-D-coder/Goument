const { failure } = require('./razorpay');
const service = require('./service');
const auth = require('../auth/service');
function mountWebhook(app,{db,gateway,express}) {
  app.post('/api/v1/auth/payments/razorpay/webhook',express.raw({type:'application/json',limit:'256kb'}),(req,res,next)=>{
    res.set('Cache-Control','no-store');
    service.webhook(db,gateway,req.body,req.get('x-razorpay-signature')).then(r=>res.json(r)).catch(next);
  });
}
function mountPayments(app,{db,gateway,run}) {
  const base='/api/v1/auth/payments';
  app.get(`${base}/config`,(req,res)=>res.json({provider:'razorpay',configured:Boolean(gateway),draftCheckoutAvailable:false}));
  app.get(`${base}/orders/:id`,run(async(req,res)=>{
    const {customer}=await auth.identity(db,req.cookies.b2c_session);const order=await service.ownedOrder(db,customer._id,req.params.id);
    res.json({order:{id:String(order._id),number:order.orderNumber,status:order.status,paymentStatus:order.paymentStatus,pricing:order.pricing,items:order.items.map(i=>({name:i.productName,quantity:i.quantity,totalMinor:i.lineTotalMinor}))},configured:Boolean(gateway)});
  }));
  app.post(`${base}/razorpay/order`,run(async(req,res)=>{
    if(!req.body||Object.keys(req.body).some(k=>k!=='orderId'))throw failure('Only an existing order reference is accepted.');
    const {customer}=await auth.identity(db,req.cookies.b2c_session);
    res.json(await service.startPayment(db,gateway,customer._id,req.body.orderId));
  }));
  app.post(`${base}/razorpay/verify`,run(async(req,res)=>{
    if(!req.body||Object.keys(req.body).some(k=>!['orderId','razorpay_order_id','razorpay_payment_id','razorpay_signature'].includes(k)))throw failure('Invalid payment verification request.');
    const {customer}=await auth.identity(db,req.cookies.b2c_session);
    res.json(await service.verifyPayment(db,gateway,customer._id,req.body));
  }));
}
module.exports={mountWebhook,mountPayments};
