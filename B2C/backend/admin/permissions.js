'use strict';

// Explicit capabilities only: a future endpoint is never granted by a wildcard.
const PERMISSIONS = Object.freeze([
  'dashboard.read', 'orders.read', 'orders.update', 'orders.cancel', 'customers.read',
  'products.read', 'products.create', 'products.update', 'inventory.read', 'inventory.adjust',
  'payments.read', 'refunds.read', 'refunds.create', 'refunds.approve', 'invoices.read',
  'coupons.read', 'coupons.create', 'coupons.update', 'shipping.read', 'shipping.update',
  'analytics.read', 'notifications.read', 'audit_logs.read', 'settings.read', 'settings.update',
  'admin_users.read', 'admin_users.manage',
]);
const OWNER_ONLY = Object.freeze(['settings.read', 'settings.update', 'admin_users.read', 'admin_users.manage']);
function permissionsFor(user) {
  if (!user || user.status !== 'ACTIVE') return [];
  if (user.roles?.includes('OWNER')) return [...PERMISSIONS];
  if (!user.roles?.includes('ADMIN')) return [];
  return PERMISSIONS.filter(permission => !OWNER_ONLY.includes(permission) && user.permissions?.includes(permission));
}
module.exports = { PERMISSIONS, OWNER_ONLY, permissionsFor };
