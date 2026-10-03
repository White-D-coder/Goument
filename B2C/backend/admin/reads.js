const { Types } = require('mongoose');
const { resources, serialize, cleanValue } = require('./resources');
const fail = (message, status = 422) => Object.assign(new Error(message), { status });
function id(value) {
  if (typeof value !== 'string' || !/^[a-f0-9]{24}$/i.test(value)) throw fail('Invalid resource ID');
  return new Types.ObjectId(value);
}
function scalar(value, max = 200) {
  if (typeof value !== 'string' || !value.trim() || value.length > max) throw fail('Invalid filter');
  return value.trim();
}
function date(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value) || !Number.isFinite(Date.parse(value))) throw fail('Use an ISO UTC date');
  const parsed=new Date(value);
  if(parsed.toISOString()!==value.replace(/(?<=\d{2}:\d{2}:\d{2})Z$/,'.000Z'))throw fail('Invalid calendar date');
  return parsed;
}
function can(actor, permission) { return actor.permissions.includes(permission); }
function descriptor(resource) { if (!Object.hasOwn(resources, resource)) throw fail('Resource not found', 404); return resources[resource]; }
function currency(value) { if (typeof value !== 'string' || !/^[A-Z]{3}$/.test(value)) throw fail('Choose one reporting currency'); return value; }
function listFilter(resource, query = {}) {
  const config = descriptor(resource);
  const allowed = ['limit','after','search','status','from','to','currency','sort', ...(resource === 'orders' ? ['paymentStatus','fulfillmentStatus','customerId','minAmount','maxAmount'] : []), ...(resource === 'variants' ? ['productId'] : [])];
  if (Object.keys(query).some(k => !allowed.includes(k))) throw fail('Unsupported filter');
  const limit = query.limit === undefined ? 20 : Number(scalar(query.limit, 3));
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 50) throw fail('Page size must be 1–50');
  const sort = query.sort || 'newest';
  if (!['newest','oldest'].includes(sort)) throw fail('Invalid sort');
  const clauses = [];
  if (query.status !== undefined) { if (!config.states?.includes(query.status)) throw fail('Invalid status'); clauses.push({status: query.status}); }
  if (query.search !== undefined) {
    let term = scalar(query.search, 80);
    if (['coupons','inventory','variants'].includes(resource)) term = term.toUpperCase();
    const pattern = '^' + term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    clauses.push({$or: config.search.map(key => ({[key]: {$regex: pattern, $options: key === 'emailNormalized' ? '' : 'i'}}))});
  }
  if (query.from || query.to) {
    const from = query.from && date(query.from), to = query.to && date(query.to);
    if (from && to && from >= to) throw fail('Date range is invalid');
    clauses.push({createdAt: {...(from ? {$gte:from} : {}), ...(to ? {$lt:to} : {})}});
  }
  if (query.currency !== undefined) {
    if (!['orders','payments','refunds','invoices','variants','shipping','coupons'].includes(resource)) throw fail('Currency filter is unsupported for this resource');
    clauses.push({[resource === 'orders' ? 'pricing.currency' : 'currency']: currency(query.currency)});
  }
  if (resource === 'variants' && query.productId !== undefined) clauses.push({productId:id(query.productId)});
  if (resource === 'orders') {
    const { enums } = require('../database/models/states');
    for (const [key, choices] of [['paymentStatus',enums.OrderPaymentStatus],['fulfillmentStatus',enums.FulfillmentStatus]]) {
      if (query[key] !== undefined) { if (!choices.includes(query[key])) throw fail('Invalid order filter'); clauses.push({[key]: query[key]}); }
    }
    if (query.customerId !== undefined) clauses.push({customerId:id(query.customerId)});
    const amount = {};
    for (const [key,operator] of [['minAmount','$gte'],['maxAmount','$lte']]) if (query[key] !== undefined) {
      if (!query.currency || !/^\d{1,16}$/.test(scalar(query[key],16)) || !Number.isSafeInteger(Number(query[key]))) throw fail('Amount filters require integer minor units and currency');
      amount[operator] = Number(query[key]);
    }
    if (amount.$gte !== undefined && amount.$lte !== undefined && amount.$gte > amount.$lte) throw fail('Amount range is invalid');
    if (Object.keys(amount).length) clauses.push({'pricing.grandTotalMinor':amount});
  }
  if (query.after) {
    let cursor;
    try { cursor = JSON.parse(Buffer.from(scalar(query.after,500),'base64url').toString()); } catch { throw fail('Invalid cursor'); }
    if (!cursor || cursor.sort !== sort || cursor.resource !== resource) throw fail('Invalid cursor');
    const at = date(cursor.at), cursorId = id(cursor.id), comparison = sort === 'newest' ? '$lt' : '$gt';
    clauses.push({$or:[{createdAt:{[comparison]:at}},{createdAt:at,_id:{[comparison]:cursorId}}]});
  }
  return {filter:clauses.length ? {$and:clauses} : {},limit,sort};
}
async function queryPage(db, resource, query = {}, fixed = {}) {
  const config = descriptor(resource), {filter,limit,sort} = listFilter(resource,query);
  const direction = sort === 'newest' ? -1 : 1;
  const rows = await db.models[config.model].find({$and:[filter,fixed]}).select(`${config.fields} createdAt updatedAt __v version`).sort({createdAt:direction,_id:direction}).limit(limit+1).maxTimeMS(5000).lean();
  const items = rows.slice(0,limit), last = items.at(-1);
  return {items:items.map(row => serialize(resource,row)),next:rows.length>limit ? Buffer.from(JSON.stringify({resource,sort,at:last.createdAt.toISOString(),id:String(last._id)})).toString('base64url') : null};
}
async function list(db, actor, resource, query) {
  const config=descriptor(resource); if(!can(actor,config.permission))throw fail('Access denied',403);
  return queryPage(db,resource,query);
}
const relations = {
  orders: {payments:'orderId',refunds:'orderId',invoices:'orderId',shipping:'orderId',notifications:'orderId'},
  customers: {orders:'customerId',payments:'customerId',refunds:'customerId',invoices:'customerId',shipping:'customerId',notifications:'customerId'},
  products: {variants:'productId'},
  payments: {refunds:'paymentId'},
};
async function related(db,actor,resource,resourceId,section,query,parentKnown=false) {
  const objectId=id(resourceId),config=descriptor(resource);
  if(!can(actor,config.permission))throw fail('Access denied',403);
  if(!parentKnown&&!await db.models[config.model].exists({_id:objectId}).maxTimeMS(5000))throw fail('Resource not found',404);
  const key=relations[resource]?.[section];
  if(key){ if(!can(actor,descriptor(section).permission))throw fail('Access denied',403);return queryPage(db,section,query,{[key]:objectId}); }
  if(section==='audit-logs') {
    if(!can(actor,'audit_logs.read'))throw fail('Access denied',403);
    return queryPage(db,'audit-logs',query,resource==='customers'?{customerId:objectId}:{entityId:objectId});
  }
  if(resource==='customers' && ['addresses','coupon-usage'].includes(section)) {
    if(Object.keys(query).some(key=>!['limit','after','sort'].includes(key)))throw fail('Unsupported related filter');
    if(section==='coupon-usage' && !can(actor,'coupons.read'))throw fail('Access denied',403);
    const {filter,limit,sort}=listFilter('customers',query),direction=sort==='newest'?-1:1;
    const model=section==='addresses'?'CustomerAddress':'CouponRedemption';
    const fields=section==='addresses'?'recipientName phone addressLine1 addressLine2 landmark city state postalCode country label isDefaultShipping isDefaultBilling':'couponId orderId discountMinor status reversedAt';
    const rows=await db.models[model].find({$and:[filter,{customerId:objectId}]}).select(`${fields} createdAt`).sort({createdAt:direction,_id:direction}).limit(limit+1).maxTimeMS(5000).lean();
    const page=rows.slice(0,limit),last=page.at(-1);
    return {items:page.map(row=>({id:String(row._id),...Object.fromEntries(`${fields} createdAt`.split(' ').filter(k=>row[k]!==undefined).map(k=>[k,cleanValue(row[k],k)]))})),next:rows.length>limit?Buffer.from(JSON.stringify({resource:'customers',sort,at:last.createdAt.toISOString(),id:String(last._id)})).toString('base64url'):null};
  }
  if(resource==='inventory' && section==='movements') {
    if(Object.keys(query).some(key=>!['limit','after','sort'].includes(key)))throw fail('Unsupported movement filter');
    const {filter,limit,sort}=listFilter('inventory',query),direction=sort==='newest'?-1:1;
    const rows=await db.models.InventoryTransaction.find({$and:[filter,{inventoryId:objectId}]}).select('sku type quantity referenceType referenceId actorId reason createdAt').sort({createdAt:direction,_id:direction}).limit(limit+1).maxTimeMS(5000).lean();
    const page=rows.slice(0,limit),last=page.at(-1);
    return {items:page.map(row=>({id:String(row._id),...Object.fromEntries(['sku','type','quantity','referenceType','referenceId','actorId','reason','createdAt'].filter(k=>row[k]!==undefined).map(k=>[k,cleanValue(row[k],k)]))})),next:rows.length>limit?Buffer.from(JSON.stringify({resource:'inventory',sort,at:last.createdAt.toISOString(),id:String(last._id)})).toString('base64url'):null};
  }
  throw fail('Related resource not found',404);
}
async function detail(db,actor,resource,resourceId) {
  const config=descriptor(resource);if(!can(actor,config.permission))throw fail('Access denied',403);
  const row=await db.models[config.model].findById(id(resourceId)).select(`${config.fields} ${config.detail} createdAt updatedAt __v version`).maxTimeMS(5000).lean();
  if(!row)throw fail('Resource not found',404);
  const sections=Object.entries(relations[resource]||{}).filter(([key])=>can(actor,resources[key].permission)).map(([key])=>key);
  if(resource==='customers'){sections.push('addresses');if(can(actor,'coupons.read'))sections.push('coupon-usage');}
  if(resource==='inventory')sections.push('movements');
  if(can(actor,'audit_logs.read'))sections.push('audit-logs');
  const entries=await Promise.all(sections.map(async section=>[section,await related(db,actor,resource,resourceId,section,{limit:'5'},true)]));
  const item=serialize(resource,row,true);
  if(resource==='payments'&&can(actor,'refunds.read')) {
    const refunds=await db.models.Refund.aggregate([{$match:{paymentId:row._id,currency:row.currency,status:{$in:['REQUESTED','PROCESSING','COMPLETED']}}},{$group:{_id:'$status',amount:{$sum:'$amountMinor'}}}]).option({maxTimeMS:5000});
    const completed=refunds.find(r=>r._id==='COMPLETED')?.amount||0;
    const reserved=refunds.filter(r=>r._id!=='COMPLETED').reduce((sum,r)=>sum+r.amount,0);
    const paid=['CAPTURED','PARTIALLY_REFUNDED','REFUNDED'].includes(row.status)?row.amountMinor:0;
    if(![paid,completed,reserved,paid-completed-reserved].every(Number.isSafeInteger)||paid<completed+reserved)throw fail('Refund balances require investigation',503);
    item.refundBalance={paidMinor:paid,completedMinor:completed,reservedMinor:reserved,availableMinor:paid-completed-reserved,currency:row.currency};
  }
  return {item,related:Object.fromEntries(entries)};
}
module.exports={id,scalar,date,currency,can,fail,descriptor,listFilter,queryPage,list,detail,related};
