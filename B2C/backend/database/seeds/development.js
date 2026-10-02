const { Types } = require('mongoose');
const bcrypt = require('bcryptjs');
const { connectDatabase, installSchema } = require('../client');
const { transaction } = require('../transactions/common');
const { moveStock } = require('../transactions/inventory');
const id = number => new Types.ObjectId(number.toString(16).padStart(24, '0'));
async function seedDevelopment(db, password) {
  if (process.env.NODE_ENV === 'production' || !/^gourmet_b2c_schema_(dev|test)(_|$)/.test(db.connection.name)) throw new Error('Seeds require an isolated dev/test database');
  if (typeof password !== 'string' || password.length < 16 || Buffer.byteLength(password) > 72) throw new Error('Supply a16+ character development password via B2C_SEED_PASSWORD (max72 UTF-8 bytes)');
  const passwordHash = await bcrypt.hash(password, 12);
  await transaction(db, async session => {
    const users = [[1, 'owner@demo.example', 'OWNER'], [2, 'admin@demo.example', 'ADMIN'], [3, 'customer@demo.example', 'CUSTOMER']];
    for (const [number, email, role] of users) if (!await db.models.User.exists({ _id: id(number) }).session(session)) await db.models.User.create([{ _id: id(number), email, passwordHash, roles: [role] }], { session });
    if (!await db.models.Customer.exists({ _id: id(4) }).session(session)) await db.models.Customer.create([{ _id: id(4), userId: id(3), firstName: 'Demo', lastName: 'Customer', email: 'customer@demo.example' }], { session });
    if (!await db.models.Category.exists({ _id: id(5) }).session(session)) await db.models.Category.create([{ _id: id(5), name: 'Demo Gifts', slug: 'demo-gifts' }], { session });
    if (!await db.models.Product.exists({ _id: id(6) }).session(session)) await db.models.Product.create([{ _id: id(6), name: 'Demo Celebration Box — not for sale', slug: 'demo-celebration-box', categoryIds: [id(5)], status: 'DRAFT' }], { session });
    if (!await db.models.ProductVariant.exists({ _id: id(7) }).session(session)) await db.models.ProductVariant.create([{ _id: id(7), productId: id(6), sku: 'DEMO-BOX-001', priceMinor: 299900, currency: 'INR', status: 'INACTIVE' }], { session });
    if (!await db.models.Inventory.exists({ _id: id(8) }).session(session)) await db.models.Inventory.create([{ _id: id(8), variantId: id(7), sku: 'DEMO-BOX-001', availableQuantity: 0 }], { session });
    if (!await db.models.Coupon.exists({ _id: id(9) }).session(session)) await db.models.Coupon.create([{ _id: id(9), code: 'DEMO10', discountType: 'PERCENTAGE', percentageBps: 1000, status: 'INACTIVE', usageLimit: 10, perCustomerLimit: 1 }], { session });
  });
  await moveStock(db, { variantId: id(7), type: 'RESTOCK', quantity: 10, operationKey: 'seed:demo-box:opening', reason: 'Fake development opening stock' });
  return { ownerId: id(1), adminId: id(2), customerId: id(4), productId: id(6), variantId: id(7) };
}
module.exports = { seedDevelopment };
if (require.main === module) (async () => { const db = await connectDatabase(); try { await installSchema(db); await seedDevelopment(db, process.env.B2C_SEED_PASSWORD); console.log('Fake development records seeded; credentials not printed.'); } finally { await db.connection.close(); } })().catch(error => { console.error(error.message); process.exitCode = 1; });
