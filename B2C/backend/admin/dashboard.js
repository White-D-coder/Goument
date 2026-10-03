const { date, currency, can, fail, queryPage } = require('./reads');

function reportingWindow(query) {
  if(Object.keys(query).some(key=>!['from','to','currency','timezone'].includes(key)))throw fail('Unsupported reporting filter');
  const from=date(query.from),to=date(query.to),code=currency(query.currency);
  if(from>=to || to-from>93*24*60*60*1000)throw fail('Choose a reporting window of at most 93 days');
  if(typeof query.timezone!=='string'||query.timezone.length>80)throw fail('Choose a reporting timezone');
  try {new Intl.DateTimeFormat('en',{timeZone:query.timezone}).format(from);}catch{throw fail('Invalid reporting timezone');}
  return {from,to,currency:code,timezone:query.timezone};
}
const capabilities = {
  refunds:{available:false,reason:'Refund eligibility, approval policy and provider reconciliation require configuration. Refund records are available for investigation.'},
  invoices:{available:false,reason:'Legal seller details, invoice numbering, PDF generation and private document storage are not configured. Existing invoice snapshots can be reviewed.'},
  shipping:{available:false,reason:'A carrier integration is not configured. Existing shipment records can be reviewed.'},
  notifications:{available:false,reason:'Delivery providers and durable delivery workers are not configured. Existing notification records can be reviewed.'},
  jobs:{available:false,reason:'The legacy BullMQ workers use a separate commerce model. No compatible operations worker is configured.'},
  cancellation:{available:false,reason:'Cancellation, stock release and payment compensation rules require an approved workflow.'},
  checkout:{available:false,reason:'Gift items and boxes still require saleable variant mappings and approved tax, delivery and pricing rules.'},
};
async function attention(db,actor) {
  // Current-state queries naturally deduplicate by resource+ID and remove resolved cases.
  const sources=[
    ['payments','payments.read','FAILED','Payment failed'],
    ['inventory','inventory.read','OUT_OF_STOCK','Out of stock'],
    ['inventory','inventory.read','LOW_STOCK','Low stock'],
    ['refunds','refunds.read','REQUESTED','Refund requested'],
    ['refunds','refunds.read','PROCESSING','Refund processing'],
    ['shipping','shipping.read','FAILED','Shipment exception'],
    ['notifications','notifications.read','FAILED','Notification failed'],
  ].filter(([,permission])=>can(actor,permission));
  const alerts=await Promise.all(sources.map(async([resource,,status,label])=>{
    const page=await queryPage(db,resource,{status,limit:'5'});
    return page.items.map(item=>({id:`${resource}:${item.id}`,label: `${label}${item.sku ? ` · ${item.sku}` : ''}`,status,href:`/admin/${resource}/${item.id}`,source:resource,resourceId:item.id}));
  }));
  return alerts.flat();
}
async function dashboard(db,actor,query,analytics=false) {
  if(!can(actor,analytics?'analytics.read':'dashboard.read'))throw fail('Access denied',403);
  const window=reportingWindow(query),dates={$gte:window.from,$lt:window.to};
  const orders={createdAt:dates,'pricing.currency':window.currency};
  const sum=(model,match,field)=>model.aggregate([{$match:match},{$group:{_id:null,amount:{$sum:`$${field}`},count:{$sum:1}}}]).option({maxTimeMS:5000});
  const [captured,refunded,orderCount,pendingPayments,pendingOrders,lowStock,pendingRefunds,topProducts,alerts]=await Promise.all([
    sum(db.models.Payment,{paidAt:dates,currency:window.currency,status:{$in:['CAPTURED','PARTIALLY_REFUNDED','REFUNDED']}},'amountMinor'),
    sum(db.models.Refund,{completedAt:dates,currency:window.currency,status:'COMPLETED'},'amountMinor'),
    db.models.Order.countDocuments(orders).maxTimeMS(5000),
    db.models.Payment.countDocuments({currency:window.currency,status:{$in:['CREATED','PENDING','AUTHORIZED']}}).maxTimeMS(5000),
    db.models.Order.countDocuments({'pricing.currency':window.currency,status:{$in:['CREATED','PAYMENT_PENDING','CONFIRMED','PROCESSING']}}).maxTimeMS(5000),
    db.models.Inventory.countDocuments({status:{$in:['LOW_STOCK','OUT_OF_STOCK']}}).maxTimeMS(5000),
    db.models.Refund.countDocuments({currency:window.currency,status:{$in:['REQUESTED','PROCESSING']}}).maxTimeMS(5000),
    can(actor,'products.read') ? db.models.Order.aggregate([{$match:{...orders,status:{$nin:['CANCELLED','REFUNDED']},paymentStatus:{$in:['PAID','PARTIALLY_REFUNDED']}}},{$unwind:'$items'},{$group:{_id:'$items.productId',productName:{$first:'$items.productName'},quantity:{$sum:'$items.quantity'}}},{$sort:{quantity:-1,_id:1}},{$limit:10}]).option({maxTimeMS:5000}) : [],
    attention(db,actor),
  ]);
  const metric=(key,label,value,unit,source,formula,range='selected window')=>({key,label,value,unit,source,formula,range,currency:unit==='minor'?window.currency:null,timezone:window.timezone});
  const metrics=[
    metric('captured','Captured payments',captured[0]?.amount||0,'minor','payments.amountMinor / paidAt','Sum of verified captured amounts, including subsequently refunded payments; not recognized revenue.'),
    metric('orders','Orders placed',orderCount,'count','orders.createdAt','All orders created in the selected window, including cancelled orders.'),
    metric('pending-payments','Pending payments',pendingPayments,'count','payments.status','CREATED, PENDING or AUTHORIZED payment attempts in the selected currency.','current snapshot'),
    metric('pending-orders','Open orders',pendingOrders,'count','orders.status','CREATED, PAYMENT_PENDING, CONFIRMED or PROCESSING in the selected currency.','current snapshot'),
    metric('low-stock','Stock needing attention',lowStock,'count','inventory.status','LOW_STOCK or OUT_OF_STOCK using each SKU’s configured threshold.','current snapshot; all SKUs'),
    metric('pending-refunds','Pending refunds',pendingRefunds,'count','refunds.status','REQUESTED or PROCESSING in the selected currency.','current snapshot'),
    metric('refunded','Completed refunds',refunded[0]?.amount||0,'minor','refunds.amountMinor / completedAt','Sum of provider-confirmed completed refunds in the selected window.'),
  ];
  if(metrics.some(m=>!Number.isSafeInteger(m.value))||topProducts.some(p=>!Number.isSafeInteger(p.quantity)))throw fail('Reporting values exceed supported precision',503);
  return {window:{...window,from:window.from.toISOString(),to:window.to.toISOString()},metrics,attention:alerts,
    topProducts:topProducts.map(p=>({productId:p._id?String(p._id):null,productName:p.productName,quantity:p.quantity})),
    definitions:{revenue:'UNKNOWN / REQUIRES BUSINESS DECISION: revenue recognition and settlement policy.',topProducts:'Units in paid/partially refunded orders created in the selected window; cancelled/fully refunded orders excluded. Partial refunds do not infer returned quantities.',attention:'Current unresolved source states, at most 5 per exception type; each alert links to its authoritative record.'},capabilities};
}
module.exports={dashboard,attention,reportingWindow,capabilities};
