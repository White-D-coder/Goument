const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const service = require('./service');
const { googleProvider } = require('./google');
const { page } = require('../database/queries');
function createAuthApp({ db, origin, clientId, clientSecret, provider, paymentGateway = null }) {
  const url = new URL(origin);
  if (url.origin !== origin || (url.protocol !== 'https:' && !['http://localhost:3001','http://127.0.0.1:3001'].includes(origin))) throw new Error('AUTH_ORIGIN must be an exact HTTPS origin or local B2C origin');
  const secure = url.protocol === 'https:';
  const cookie = { httpOnly: true, secure, sameSite: 'lax', path: '/api/v1/auth' };
  const sessionName = 'b2c_session'; const flowName = 'b2c_google_flow';
  const flows = new Map(); const rates = new Map();
  const safeNext = value => typeof value === 'string' && /^(?:\/checkout(?:\?order=[a-f0-9]{24})?|\/admin)$/.test(value) ? value : '/account';
  const configured = Boolean(clientId && clientSecret);
  const google = provider || (configured ? googleProvider({ clientId, clientSecret, redirectUri: `${origin}/api/v1/auth/google/callback` }) : null);
  const app = express(); app.disable('x-powered-by'); app.use(helmet()); app.use(cookieParser());
  require('../payments/routes').mountWebhook(app,{db,gateway:paymentGateway,express});
  const publicJson = express.json({ limit: '8kb' });
  const adminJson = express.json({ limit: '128kb' });
  app.use((req,res,next)=>(req.path === '/api/v1/auth/admin' || req.path.startsWith('/api/v1/auth/admin/') ? adminJson : publicJson)(req,res,next));
  app.use('/api/v1/auth', (req,res,next)=>{res.set('Cache-Control','no-store');res.set('Referrer-Policy','no-referrer');next();});
  app.use('/api/v1/auth', (req,res,next)=>{
    const reqOrigin = req.get('origin');
    if (req.method !== 'GET' && reqOrigin && ![origin, 'http://localhost:3000', 'http://localhost:3001'].includes(reqOrigin)) return res.status(403).json({ message: 'Request origin not allowed' });
    // Operations uses persisted per-actor/IP read, write and sensitive buckets.
    if (req.path === '/admin' || req.path.startsWith('/admin/')) return next();
    const now=Date.now();for(const [key,value]of rates)if(value.until<now)rates.delete(key);
    const key=req.ip;const current=rates.get(key)||{count:0,until:now+60000};current.count++;rates.set(key,current);
    if(current.count>60||rates.size>10000)return res.status(429).json({message:'Too many requests. Please try again shortly.'});next();
  });
  const run = fn => (req,res,next) => Promise.resolve(fn(req,res)).catch(next);
  const signedIn = (res,token) => { res.cookie(sessionName,token,{...cookie,maxAge:service.SESSION_MS}); };
  app.get('/api/v1/auth/config', (req,res)=>res.json({googleEnabled:configured}));
  app.get('/api/v1/auth/google', (req,res)=>{
    if(!configured)return res.redirect(`${origin}/account?authError=unavailable`);
    for(const [key,value]of flows)if(value.expires<Date.now())flows.delete(key);
    if(flows.size>=1000)return res.redirect(`${origin}/account?authError=busy`);
    const state=service.random();const binding=service.random();const flow={next:safeNext(req.query.next),nonce:service.random(),verifier:service.random(),binding:service.digest(binding),expires:Date.now()+600000};
    flows.set(state,flow);res.cookie(flowName,binding,{...cookie,maxAge:600000});res.redirect(google.authorization({state,...flow}));
  });
  app.get('/api/v1/auth/google/callback',run(async(req,res)=>{
    const state=typeof req.query.state==='string'?req.query.state:'';const flow=flows.get(state);
    const bound=typeof req.cookies[flowName]==='string'&&flow?.binding===service.digest(req.cookies[flowName]);
    res.clearCookie(flowName,cookie);
    if(!flow||!bound||flow.expires<Date.now())return res.redirect(`${origin}/account?authError=expired`);
    flows.delete(state); // consume before token exchange; callback replay never logs in again
    const accountError = code => `${origin}/account?authError=${code}&next=${encodeURIComponent(flow.next)}`;
    if(req.query.error)return res.redirect(accountError('cancelled'));
    if(typeof req.query.code!=='string'||req.query.code.length>4096)return res.redirect(accountError('failed'));
    try{const claims=await google.exchange(req.query.code,flow);const token=await service.googleLogin(db,claims);signedIn(res,token);return res.redirect(`${origin}${flow.next}`);}
    catch(error){return res.redirect(accountError(error.status===409?'existing':'failed'));}
  }));
  app.post('/api/v1/auth/register',run(async(req,res)=>{const token=await service.register(db,req.body);signedIn(res,token);res.status(201).json({success:true});}));
  app.post('/api/v1/auth/login',run(async(req,res)=>{
    await require('../admin/security').adminRateLimit(db,{ip:req.ip,bucket:'login'});
    const token=await service.passwordLogin(db,req.body?.email,req.body?.password);signedIn(res,token);res.json({success:true});
  }));
  app.post('/api/v1/auth/logout',run(async(req,res)=>{await service.logout(db,req.cookies[sessionName]);res.clearCookie(sessionName,cookie);res.json({success:true});}));
  app.get('/api/v1/auth/me',run(async(req,res)=>{
    const user=await service.sessionUser(db,req.cookies[sessionName]);
    const staff=user.roles.some(role=>['OWNER','ADMIN'].includes(role));
    const customer=await db.models.Customer.findOne({userId:user._id,status:'ACTIVE'});
    if(!customer&&!staff)throw service.failure('Customer account unavailable');
    res.json({user:{id:String(user._id),...(customer?{customerId:String(customer._id)}:{}),email:user.email,name:customer?[customer.firstName,customer.lastName].filter(Boolean).join(' '):user.email,role:user.roles.includes('OWNER')?'owner':user.roles.includes('ADMIN')?'admin':'customer'}});
  }));
  app.get('/api/v1/auth/orders',run(async(req,res)=>{
    const {customer}=await service.identity(db,req.cookies[sessionName]);
    const after=typeof req.query.after==='string'?req.query.after:undefined;
    if(after&&after.length>500)throw service.failure('Invalid cursor',400);
    const result=await page(db.models.Order,{customerId:customer._id},{limit:10,after});
    res.json({orders:result.items.map(o=>({_id:String(o._id),orderNumber:o.orderNumber,status:o.status,total:o.pricing.grandTotalMinor,currency:o.pricing.currency,createdAt:o.createdAt})),next:result.next});
  }));
  require('../payments/routes').mountPayments(app,{db,gateway:paymentGateway,run});
  require('../gifting/routes').mountGifting(app, { db, cookie, run });
  require('../admin/routes').mountAdmin(app, { db });
  app.use((error,req,res,next)=>{
    void next;
    if(error.type==='entity.parse.failed')return res.status(400).json({message:'Invalid JSON request.'});
    if(error.type==='entity.too.large')return res.status(413).json({message:'Request is too large.'});
    const expected=[400,401,403,404,409,422,429].includes(error.status);
    const status=expected?error.status:error.name==='ValidationError'?400:503;
    res.status(status).json({message:expected?error.message:error.name==='ValidationError'?'Please check the supplied details.':req.path.includes('/payments/')?'Payment service unavailable. Check payment status before retrying.':req.path.startsWith('/api/v1/auth/gift/')?'Your cart is temporarily unavailable. Reload your cart before trying again.':'Sign-in service unavailable. Please try again.'});
  });
  return app;
}
module.exports={createAuthApp};
