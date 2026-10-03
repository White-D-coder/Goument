'use strict';
const bcrypt = require('bcryptjs');
const { transaction } = require('../database/transactions/common');

const DEFAULT_OWNERS = [
  {
    email: 'keyursatra@gmail.com',
    password: process.env.OWNER_1_PASSWORD || 'TGG_admin',
    firstName: 'Keyur',
    lastName: 'Satra',
  },
  {
    email: 'Deeptanubhunia0@gmail.com',
    password: process.env.OWNER_2_PASSWORD || 'admin_admin',
    firstName: 'Deeptanu',
    lastName: 'Bhunia',
  },
];

async function setupOwners(db, owners = DEFAULT_OWNERS) {
  const results = [];
  for (const ownerDef of owners) {
    const email = ownerDef.email.trim();
    const emailNormalized = email.toLowerCase();
    const passwordHash = await bcrypt.hash(ownerDef.password, 12);

    const result = await transaction(db, async session => {
      let user = await db.models.User.findOne({ emailNormalized }).select('+passwordHash +authSessions').session(session);
      let isNew = false;

      if (!user) {
        isNew = true;
        const [created] = await db.models.User.create([{
          email,
          emailNormalized,
          passwordHash,
          roles: ['OWNER'],
          status: 'ACTIVE',
          emailVerifiedAt: new Date(),
        }], { session });
        user = created;
      } else {
        user.passwordHash = passwordHash;
        if (!user.roles.includes('OWNER')) {
          user.roles = [...new Set([...user.roles, 'OWNER'])];
        }
        user.status = 'ACTIVE';
        user.authSessions = [];
        user.accessVersion = (user.accessVersion || 0) + 1;
        await user.save({ session });
      }

      let customer = await db.models.Customer.findOne({ emailNormalized }).session(session);
      if (!customer) {
        const [createdCustomer] = await db.models.Customer.create([{
          userId: user._id,
          email,
          emailNormalized,
          firstName: ownerDef.firstName || 'Owner',
          lastName: ownerDef.lastName || 'Staff',
          status: 'ACTIVE',
        }], { session });
        customer = createdCustomer;
      } else {
        customer.userId = user._id;
        if (ownerDef.firstName) customer.firstName = ownerDef.firstName;
        if (ownerDef.lastName) customer.lastName = ownerDef.lastName;
        customer.status = 'ACTIVE';
        await customer.save({ session });
      }

      let setting = await db.models.AdminSetting.findOne({ key: 'operations' }).session(session);
      if (!setting) {
        setting = new db.models.AdminSetting({
          key: 'operations',
          bootstrapOwnerId: user._id,
          bootstrapCompletedAt: new Date(),
        });
        await setting.save({ session });
      } else if (!setting.bootstrapCompletedAt) {
        setting.bootstrapOwnerId = user._id;
        setting.bootstrapCompletedAt = new Date();
        await setting.save({ session });
      }

      await db.models.AuditLog.create([{
        actorRole: 'SYSTEM',
        action: isNew ? 'OWNER_CREATED' : 'OWNER_UPDATED',
        entityType: 'staff',
        entityId: user._id,
        newState: {
          email: user.email,
          roles: [...user.roles],
          version: user.accessVersion,
        },
        metadata: { source: 'setup-owners-script' },
      }], { session });

      return {
        id: String(user._id),
        email: user.email,
        isNew,
      };
    });

    results.push(result);
  }
  return results;
}

module.exports = { setupOwners, DEFAULT_OWNERS };

if (require.main === module) {
  require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
  (async () => {
    const { connectDatabase, installSchema } = require('../database/client');
    const db = await connectDatabase();
    try {
      await installSchema(db);
      const results = await setupOwners(db);
      console.log('Owners setup completed successfully:');
      for (const r of results) {
        console.log(`- ${r.email} (${r.isNew ? 'created' : 'updated'}) [ID: ${r.id}]`);
      }
    } finally {
      await db.connection.close();
    }
  })().catch(error => {
    console.error('Owner setup failed:', error.message || error);
    process.exitCode = 1;
  });
}
