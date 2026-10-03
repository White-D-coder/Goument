const { createPaymentAttempt } = require('../database/repositories');
const { confirmPayment } = require('../database/transactions/payments');
const { failure } = require('./razorpay');
const objectId = value => typeof value === 'string' && /^[a-f0-9]{24}$/i.test(value);
async function ownedOrder(db, customerId, orderId) {
  if (!objectId(orderId)) throw failure('Invalid order reference');
  const order = await db.models.Order.findOne({ _id: orderId, customerId });
  if (!order) throw failure('Order not found', 404);
  return order;
}
async function reservationsReady(db, order) {
  if (!order.items.length || order.items.some(i=>!i.variantId)) throw failure('This order is not ready for payment.',409);
  for (const variantId of new Set(order.items.map(i=>String(i.variantId)))) {
    const count=order.items.filter(i=>String(i.variantId)===variantId).reduce((n,i)=>n+i.quantity,0);
    const moves=await db.models.InventoryTransaction.find({referenceId:order._id,variantId,type:{$in:['RESERVATION','SALE','RELEASE']}}).lean();
    const reserved=moves.reduce((n,m)=>n+(m.type==='RESERVATION'?m.quantity:-m.quantity),0);
    if(reserved!==count)throw failure('Stock must be reserved before payment can start.',409);
  }
}
async function startPayment(db, gateway, customerId, orderId) {
  if(!gateway)throw failure('Razorpay is not configured yet.',503);
  const order=await ownedOrder(db,customerId,orderId);
  if(order.status!=='PAYMENT_PENDING'||order.paymentStatus==='PAID')throw failure('This order is not awaiting payment.',409);
  if(order.pricing.currency!=='INR'||!Number.isSafeInteger(order.pricing.grandTotalMinor)||order.pricing.grandTotalMinor<100)throw failure('This order has no supported payable total.',409);
  if(await db.models.Payment.exists({orderId:order._id,$or:[{provider:{$ne:'razorpay'}},{idempotencyKey:{$ne:'razorpay-checkout-v1'}}]}))throw failure('An existing payment attempt needs to be resolved first.',409);
  await reservationsReady(db,order);
  const payment=await createPaymentAttempt(db,{orderId:order._id,provider:'razorpay',idempotencyKey:'razorpay-checkout-v1'});
  if(['CAPTURED','PARTIALLY_REFUNDED','REFUNDED','CANCELLED','FAILED'].includes(payment.status))throw failure('This payment cannot be restarted.',409);
  if(!payment.providerOrderId) {
    if(payment.metadata?.initialization==='STARTED')throw failure('Payment setup is pending reconciliation. Please do not create another payment.',409);
    payment.metadata={initialization:'STARTED'};
    try {await payment.save();}catch(e){if(e.name==='VersionError')throw failure('Payment setup is already in progress. Please check again.',409);throw e;}
    // External I/O is outside retryable transactions. An uncertain outcome stays STARTED.
    const remote=await gateway.createOrder({amount:payment.amountMinor,currency:payment.currency,receipt:String(payment._id),partial_payment:false,notes:{paymentId:String(payment._id),orderId:String(order._id)}});
    if(!/^order_[A-Za-z0-9]+$/.test(remote.id||'')||remote.amount!==payment.amountMinor||remote.currency!==payment.currency||remote.receipt!==String(payment._id))throw failure('Payment setup could not be reconciled.',503);
    payment.providerOrderId=remote.id;payment.status='PENDING';payment.metadata={initialization:'READY'};await payment.save();
  }
  return { key:gateway.keyId,order_id:payment.providerOrderId,amount:payment.amountMinor,currency:payment.currency,orderId:String(order._id) };
}
async function acceptCaptured(db, payment, remote) {
  if(remote.id===undefined||!/^pay_[A-Za-z0-9]+$/.test(remote.id)||remote.order_id!==payment.providerOrderId||remote.amount!==payment.amountMinor||remote.currency!==payment.currency)throw failure('Payment details do not match this order.',400);
  if(remote.status!=='captured'||remote.captured!==true)return {status:'PENDING',message:'Payment confirmation is pending. Check status again shortly.'};
  await confirmPayment(db,{provider:'razorpay',providerEventId:`captured:${remote.id}`,paymentId:payment._id,providerPaymentId:remote.id,amountMinor:remote.amount,currency:remote.currency});
  return {status:'PAID',message:'Payment verified. Your order is confirmed.'};
}
async function verifyPayment(db,gateway,customerId,body) {
  if(!gateway)throw failure('Razorpay is not configured yet.',503);
  const order=await ownedOrder(db,customerId,body.orderId);
  const payment=await db.models.Payment.findOne({orderId:order._id,provider:'razorpay',idempotencyKey:'razorpay-checkout-v1'});
  if(!payment?.providerOrderId||body.razorpay_order_id!==payment.providerOrderId||!gateway.verifyCheckout(payment.providerOrderId,body.razorpay_payment_id,body.razorpay_signature))throw failure('Payment signature verification failed.',400);
  const remote=await gateway.fetchPayment(body.razorpay_payment_id);
  if(remote.id!==body.razorpay_payment_id)throw failure('Payment reference mismatch');
  return acceptCaptured(db,payment,remote);
}
async function webhook(db,gateway,raw,signature) {
  if(!gateway)throw failure('Razorpay is not configured yet.',503);
  if(!Buffer.isBuffer(raw)||!gateway.verifyWebhook(raw,signature))throw failure('Invalid webhook signature',400);
  let event;try{event=JSON.parse(raw.toString('utf8'));}catch{throw failure('Invalid webhook body');}
  if(!['payment.captured','order.paid'].includes(event.event))return {received:true};
  const remote=event.payload?.payment?.entity;
  if(!remote||typeof remote.order_id!=='string')throw failure('Invalid payment event');
  const payment=await db.models.Payment.findOne({provider:'razorpay',providerOrderId:remote.order_id});
  // Non-2xx preserves provider retries for unlinked/late events; never silently drop capture.
  if(!payment)throw failure('Payment requires reconciliation.',503);
  await acceptCaptured(db,payment,remote);return {received:true};
}
module.exports={ownedOrder,startPayment,verifyPayment,webhook};
