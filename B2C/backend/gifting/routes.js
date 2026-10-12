const crypto = require('crypto');
const { identity } = require('../auth/service');
const { saveAddress } = require('../database/repositories');
const boxes = require('./boxes.json');
const items = require('./items.json');
const fail = (message, status = 400) => Object.assign(new Error(message), { status });
const publicBoxes = boxes.map(({ capacity, ...box }) => box);
const { calculatePackaging } = require('./packaging');
const known = (id, source) => source.find(entry => entry.id === id);

function packing(draft) {
  const count = draft?.items?.reduce((n, item) => n + item.quantity, 0) || 0;
  return count === 0 ? 'EMPTY' : 'READY';
}
function hasEnquiryOnlyHamper(draft) {
  return Boolean(draft?.items?.some(row => {
    const item = known(row.id, items);
    return item?.category === 'Gift Hampers' || String(row.id).endsWith('_hamper');
  }));
}
function payload(draft) {
  const itemsList = draft?.items?.map(({ id, quantity }) => ({ id, quantity })) || [];
  const fulfillment = calculatePackaging(itemsList);
  return {
    revision: draft ? draft.__v + 1 : 0,
    boxes: draft?.boxes?.map(({ id, quantity }) => ({ id, quantity })) || [],
    items: itemsList,
    fulfillment,
    packing: packing(draft),
    mode: 'DRAFT',
    checkoutAvailable: false
  };
}
function validate(body) {
  if (!body || Object.keys(body).some(k => !['revision', 'boxes', 'items'].includes(k)) || !Number.isSafeInteger(body.revision) || body.revision < 0) throw fail('Invalid selection. Reload your gift and try again.');
  if (body.boxes !== undefined && !Array.isArray(body.boxes)) throw fail('Invalid gift selection.');
  const itemRows = body.items;
  if (!Array.isArray(itemRows) || itemRows.length > 100 || new Set(itemRows.map(r => r?.id)).size !== itemRows.length) throw fail('Invalid gift selection.');
  for (const row of itemRows) {
    if (!row || Object.keys(row).some(k => !['id', 'quantity'].includes(k)) || !known(row.id, items) || !Number.isSafeInteger(row.quantity) || row.quantity < 1 || row.quantity > 99) {
      throw fail('Please choose a valid item and quantity.');
    }
  }
}
function mountGifting(app, { db, cookie, run }) {
  const base = '/api/v1/auth/gift';
  const cookieName = 'b2c_gift';
  const owner = req => {
    const token = req.cookies[cookieName];
    return typeof token === 'string' && /^[a-f0-9]{64}$/.test(token) ? crypto.createHash('sha256').update(token).digest('hex') : null;
  };
  app.get(`${base}/catalogue`, (req, res) => res.json({ boxes: publicBoxes, items, mode: 'DRAFT' }));
  app.get(`${base}/count`, run(async (req, res) => {
    const key = owner(req); const draft = key && await db.models.GiftDraft.findOne({ ownerHash: key });
    res.json({ count: draft ? draft.items.reduce((n, i) => n + i.quantity, 0) : 0 });
  }));
  app.get(`${base}/draft`, run(async (req, res) => {
    let key = owner(req);
    if (!key) {
      const token = crypto.randomBytes(32).toString('hex');
      res.cookie(cookieName, token, cookie);
      key = crypto.createHash('sha256').update(token).digest('hex');
    }
    res.json(payload(await db.models.GiftDraft.findOne({ ownerHash: key })));
  }));
  app.put(`${base}/draft`, run(async (req, res) => {
    const key = owner(req); if (!key) throw fail('Reload your gift to restore its session.', 409);
    validate(req.body);
    let draft = await db.models.GiftDraft.findOne({ ownerHash: key });
    if ((draft ? draft.__v + 1 : 0) !== req.body.revision) throw fail('Your gift changed in another tab. Latest selection loaded; please try again.', 409);
    if (!draft) draft = new db.models.GiftDraft({ ownerHash: key });
    draft.boxes = req.body.boxes; draft.items = req.body.items;
    // Force a version change even when saving the same values; public revision is __v + 1.
    if (!draft.isNew) draft.increment();
    try { await draft.save(); }
    catch (error) { if (error.code === 11000 || error.name === 'VersionError') throw fail('Your gift changed in another tab. Latest selection loaded; please try again.', 409); throw error; }
    res.json(payload(draft));
  }));
  app.post(`${base}/checkout-check`, run(async (req, res) => {
    await identity(db, req.cookies.b2c_session);
    const key = owner(req); const draft = key && await db.models.GiftDraft.findOne({ ownerHash: key });
    if (!draft || packing(draft) !== 'READY') return res.status(409).json({ message: 'Add items to your bag before checkout.', packing: draft ? packing(draft) : 'EMPTY' });
    if (hasEnquiryOnlyHamper(draft)) throw fail('Hamper pricing needs confirmation. Please enquire with our team before checkout.', 409);
    const fulfillment = calculatePackaging(draft.items);
    res.json({ packing: 'READY', fulfillment, checkoutAvailable: false, next: '/checkout' });
  }));
  const fields = ['recipientName','phone','email','addressLine1','addressLine2','landmark','city','state','postalCode','country'];
  const addressView = address => Object.fromEntries([['id', String(address._id)], ...fields.map(k => [k, address[k] || ''])]);
  app.get(`${base}/checkout`, run(async (req, res) => {
    const { customer } = await identity(db, req.cookies.b2c_session);
    const key = owner(req); const draft = key && await db.models.GiftDraft.findOne({ ownerHash: key });
    if (!draft || packing(draft) !== 'READY') throw fail('Please review your items in your bag.', 409);
    if (hasEnquiryOnlyHamper(draft)) throw fail('Hamper pricing needs confirmation. Please enquire with our team before checkout.', 409);
    const addresses = await db.models.CustomerAddress.find({customerId:customer._id}).sort({updatedAt:-1}).limit(20);
    const fulfillment = calculatePackaging(draft.items);
    res.json({
      addresses: addresses.map(addressView),
      selection: {
        boxes: [],
        items: draft.items.map(r => ({ name: known(r.id, items)?.name || r.id, quantity: r.quantity }))
      },
      fulfillment,
      paymentAvailable: false
    });
  }));
  app.post(`${base}/address`, run(async (req,res) => {
    const { customer } = await identity(db, req.cookies.b2c_session);
    const key = owner(req); const draft = key && await db.models.GiftDraft.findOne({ ownerHash: key });
    if (hasEnquiryOnlyHamper(draft)) throw fail('Hamper pricing needs confirmation. Please enquire with our team before checkout.', 409);
    const body=req.body;
    if (!body || Object.keys(body).some(k=>!fields.includes(k)&&k!=='id')) throw fail('Invalid delivery details.');
    const input={};
    for(const key of fields){
      if(body[key]!==undefined && typeof body[key]!=='string') throw fail('Please check your delivery details.');
      input[key]=(body[key]||'').trim();
      if(input[key].length>250 || /[\x00-\x1f]/.test(input[key])) throw fail('Please check your delivery details.');
    }
    for(const key of ['recipientName','phone','addressLine1','city','state','postalCode','country']) if(!input[key]) throw fail('Please complete all required delivery details.');

    // Auto-prefix default country code +91 if omitted by customer
    input.phone=input.phone.replace(/[ ()-]/g,'');
    if(!input.phone.startsWith('+')){
      const digits=input.phone.replace(/^0+/,'');
      input.phone=`+91${digits}`;
    }
    if(!/^\+[1-9]\d{6,14}$/.test(input.phone)) throw fail('Enter a valid 10-digit phone number.');

    // Optional email validation
    if(input.email){
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) throw fail('Enter a valid email address.');
    }else{
      input.email=undefined;
    }

    input.country=input.country.toUpperCase();
    if(!/^[A-Z]{2}$/.test(input.country) || !/^[A-Za-z0-9][A-Za-z0-9 -]{1,19}$/.test(input.postalCode)) throw fail('Check the country code and postal code.');
    if(input.country==='IN'&&!/^[1-9]\d{5}$/.test(input.postalCode)) throw fail('Enter a valid six-digit PIN code.');
    if(body.id && (typeof body.id!=='string'||!/^[a-f0-9]{24}$/i.test(body.id)||!await db.models.CustomerAddress.exists({_id:body.id,customerId:customer._id}))) throw fail('Address not found.',404);
    for(const key of ['email','addressLine2','landmark']) if(!input[key]) input[key]=undefined;
    const address=await saveAddress(db,customer._id,input,body.id||undefined);
    res.json({address:addressView(address),paymentAvailable:false});
  }));

  app.post(`${base}/order`, run(async (req, res) => {
    const { customer } = await identity(db, req.cookies.b2c_session);
    const key = owner(req);
    const draft = key && await db.models.GiftDraft.findOne({ ownerHash: key });
    if (!draft || packing(draft) !== 'READY') throw fail('Your gift bag has no items. Please select items first.', 409);
    if (hasEnquiryOnlyHamper(draft)) throw fail('Hamper pricing needs confirmation. Please enquire with our team before checkout.', 409);

    // Cart estimates are not an authoritative, reserved order quote. Never
    // replace the missing commercial bridge with a flat per-item valuation.
    throw fail('Final item prices, GST and delivery must be confirmed before an order can be created.', 409);
  }));
}
module.exports = { mountGifting, packing, validate };
