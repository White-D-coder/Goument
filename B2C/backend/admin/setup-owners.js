'use strict';
// Retired: bulk provisioning must never reset credentials or relink customer history.
async function setupOwners() {
  throw new Error('Bulk owner setup is disabled. Use admin/provision-owner.js with an explicit existing user ID and --confirm.');
}
module.exports = { setupOwners };
if (require.main === module) {
  console.error('Bulk owner setup is disabled. Use admin/provision-owner.js --user-id <existing-user-id> --confirm.');
  process.exitCode = 1;
}
