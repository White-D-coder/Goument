const express=require('express');
const {randomUUID}=require('crypto');
const reads=require('./reads');
const {dashboard,capabilities}=require('./dashboard');
const mutations=require('./mutations');
const {authenticateAdmin,adminRateLimit}=require('./security');
const {executeCommand}=require('./commands');

function mountAdmin(app,{db}) {
  const router=express.Router();
  const run=fn=>(req,res,next)=>Promise.resolve(fn(req,res)).catch(next);
  router.use((req,res,next)=>{req.adminRequestId=randomUUID();res.set('X-Request-Id',req.adminRequestId);res.set('Cache-Control','no-store');res.set('Referrer-Policy','no-referrer');next();});
  router.use((req,res,next)=>{
    adminRateLimit(db,{ip:req.ip,bucket:'entry'}).then(()=>authenticateAdmin(db,req.cookies.b2c_session)).then(async actor=>{
      req.adminActor=actor;
      const bucket=req.method==='GET'?'read':/^\/(staff|settings)(\/|$)/.test(req.path)?'sensitive':'write';
      await adminRateLimit(db,{actorId:actor.id,ip:req.ip,bucket});
      next();
    }).catch(next);
  });
  const authorize=(req,permission)=>{if(!reads.can(req.adminActor,permission))throw reads.fail('Access denied',403);};
  router.get('/session',run(async(req,res)=>{
    const user=await db.models.User.findById(req.adminActor.id).select('email').lean();
    const reporting=await require('./settings').getSettings(db);
    res.json({user:{id:req.adminActor.id,email:user.email,role:req.adminActor.role},permissions:req.adminActor.permissions,capabilities,reporting:reporting.item?.timezone&&reporting.item?.currency?{timezone:reporting.item.timezone,currency:reporting.item.currency}:null});
  }));
  for(const route of ['dashboard','analytics'])router.get(`/${route}`,run(async(req,res)=>res.json(await dashboard(db,req.adminActor,req.query,route==='analytics'))));
  router.get('/settings',run(async(req,res)=>{authorize(req,'settings.read');res.json(await require('./settings').getSettings(db));}));
  router.get('/staff',run(async(req,res)=>{authorize(req,'admin_users.read');res.json(await require('./staff').listStaff(db,req.adminActor,req.query));}));
  router.get('/staff/:id',run(async(req,res)=>{authorize(req,'admin_users.read');res.json(await require('./staff').getStaff(db,req.adminActor,req.params.id));}));
  const command=(method,path,permission,action,handler)=>router[method](path,run(async(req,res)=>{
    authorize(req,permission);
    if(!req.body||Array.isArray(req.body)||typeof req.body!=='object')throw reads.fail('Expected a request object');
    if(req.params.id&&Object.hasOwn(req.body,'id'))throw reads.fail('Resource ID belongs in the path');
    const result=await executeCommand(db,{token:req.cookies.b2c_session,permission,key:req.get('Idempotency-Key'),action,input:{...req.body,...(req.params.id?{id:req.params.id}:{})},requestId:req.adminRequestId},handler);
    res.json(result);
  }));
  command('patch','/settings','settings.update','SETTINGS_UPDATED',(...args)=>require('./settings').updateSettings(...args));
  command('patch','/staff/:id','admin_users.manage','STAFF_ACCESS_UPDATED',(...args)=>require('./staff').updateStaff(...args));
  for(const [path,permission,handler]of [
    ['categories','products.create',mutations.createCategory],['products','products.create',mutations.createProduct],
    ['variants','products.create',mutations.createVariant],['coupons','coupons.create',mutations.createCoupon],
  ])command('post',`/${path}`,permission,`${path.toUpperCase()}_CREATED`,handler);
  for(const [path,permission,handler]of [
    ['products','products.update',mutations.updateProduct],['variants','products.update',mutations.updateVariant],['coupons','coupons.update',mutations.updateCoupon],
  ])command('patch',`/${path}/:id`,permission,`${path.toUpperCase()}_UPDATED`,handler);
  command('post','/inventory/:id/adjust','inventory.adjust','INVENTORY_ADJUSTED',mutations.adjustInventory);
  command('post','/orders/:id/process','orders.update','ORDER_PROCESSING_STARTED',mutations.beginOrderProcessing);
  router.get('/:resource/:id/related/:section',run(async(req,res)=>res.json(await reads.related(db,req.adminActor,req.params.resource,req.params.id,req.params.section,req.query))));
  router.get('/:resource/:id',run(async(req,res)=>{
    if(Object.keys(req.query).length)throw reads.fail('Unsupported detail query');
    const data=await reads.detail(db,req.adminActor,req.params.resource,req.params.id);
    // Private investigations have a durable access trail; no PII is copied into logs.
    const customerId=req.params.resource==='customers'?data.item.id:data.item.customerId;
    await db.models.AuditLog.create({actorId:req.adminActor.id,actorRole:req.adminActor.role,action:'ADMIN_RESOURCE_VIEWED',entityType:req.params.resource,entityId:req.params.id,...(typeof customerId==='string'&&/^[a-f\d]{24}$/i.test(customerId)?{customerId}:{}),requestId:req.adminRequestId});
    res.json(data);
  }));
  router.get('/:resource',run(async(req,res)=>res.json(await reads.list(db,req.adminActor,req.params.resource,req.query))));
  router.use((req,res)=>res.status(404).json({message:'Operation not found',requestId:req.adminRequestId}));
  router.use((error,req,res,next)=>{
    void next;
    const expected=[400,401,403,404,409,422,429].includes(error.status);
    const status=expected?error.status:error.code===11000||error.name==='VersionError'?409:['ValidationError','StrictModeError','CastError'].includes(error.name)?422:503;
    const message=expected?error.message:status===409?'This operation conflicts with the current state. Reload before retrying.':status===422?'Please check the supplied fields.':'Operations service unavailable. Check the operation status before retrying.';
    if(status===503)console.warn(JSON.stringify({event:'admin_dependency_failure',requestId:req.adminRequestId}));
    res.status(status).json({message,requestId:req.adminRequestId});
  });
  app.use('/api/v1/auth/admin',router);
}
module.exports={mountAdmin};
