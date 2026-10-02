require('dotenv').config({ path: require('path').join(__dirname,'../.env') });
const { connectDatabase, installSchema } = require('../database/client');
const { createAuthApp } = require('./app');
(async()=>{
 const db=await connectDatabase();
 try{
  // Explicit, guarded initialization of the owned B2C schema; never legacy collections.
  await installSchema(db);
  const paymentGateway=require('../payments/razorpay').razorpayGateway({keyId:process.env.RAZORPAY_KEY_ID,keySecret:process.env.RAZORPAY_KEY_SECRET,webhookSecret:process.env.RAZORPAY_WEBHOOK_SECRET});
  const app=createAuthApp({db,paymentGateway,origin:process.env.AUTH_ORIGIN||'http://localhost:3001',clientId:process.env.GOOGLE_CLIENT_ID,clientSecret:process.env.GOOGLE_CLIENT_SECRET});
  const server=app.listen(Number(process.env.AUTH_PORT||5003),'127.0.0.1',()=>console.log('B2C database-backed auth listening on configured local port. Google configured:',Boolean(process.env.GOOGLE_CLIENT_ID&&process.env.GOOGLE_CLIENT_SECRET)));
  server.on('error',async()=>{console.error('Auth port unavailable.');await db.connection.close();process.exitCode=1;});
  for(const signal of ['SIGTERM','SIGINT'])process.once(signal,()=>server.close(async()=>{await db.connection.close();process.exit(0);}));
 }catch(error){await db.connection.close();throw error;}
})().catch(error=>{console.error('Auth startup failed; check database connectivity and schema ownership. Category:',error.code||error.name);process.exitCode=1;});
