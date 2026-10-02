// Explicit response fields: never serialize whole database documents to the portal.
const { enums } = require('../database/models/states');
const resources = {
  orders: { model: 'Order', permission: 'orders.read', states: enums.OrderStatus, search: ['orderNumber'], fields: 'orderNumber customerId status paymentStatus fulfillmentStatus pricing confirmedAt shippedAt deliveredAt cancelledAt', detail: 'items shippingAddressSnapshot billingAddressSnapshot customerSnapshot coupon' },
  customers: { model: 'Customer', permission: 'customers.read', states: enums.CustomerStatus, search: ['emailNormalized', 'firstName', 'lastName'], fields: 'firstName lastName email phone status lastOrderAt', detail: '' },
  products: { model: 'Product', permission: 'products.read', states: enums.ProductStatus, search: ['name', 'slug'], fields: 'name slug shortDescription categoryIds brand status media tags', detail: 'description seo' },
  categories: { model: 'Category', permission: 'products.read', states: enums.CategoryStatus, search: ['name', 'slug'], fields: 'name slug description parentId status sortOrder imageUrl', detail: 'seo' },
  variants: { model: 'ProductVariant', permission: 'products.read', states: enums.VariantStatus, search: ['sku', 'name'], fields: 'productId sku name priceMinor compareAtPriceMinor currency status weightGrams media', detail: 'attributes dimensions' },
  inventory: { model: 'Inventory', permission: 'inventory.read', states: enums.InventoryStatus, search: ['sku'], fields: 'variantId sku availableQuantity reservedQuantity lowStockThreshold status', detail: '' },
  payments: { model: 'Payment', permission: 'payments.read', states: enums.PaymentStatus, search: ['providerPaymentId', 'providerOrderId'], fields: 'orderId customerId provider providerOrderId providerPaymentId amountMinor currency status paidAt', detail: '' },
  refunds: { model: 'Refund', permission: 'refunds.read', states: enums.RefundStatus, search: ['providerRefundId'], fields: 'orderId paymentId customerId amountMinor currency provider providerRefundId status requestedAt completedAt', detail: 'reason' },
  invoices: { model: 'Invoice', permission: 'invoices.read', states: enums.InvoiceStatus, search: ['invoiceNumber'], fields: 'invoiceNumber orderId customerId status grandTotalMinor currency issuedAt', detail: 'sellerSnapshot customerSnapshot items subtotalMinor discountMinor shippingMinor taxMinor' },
  coupons: { model: 'Coupon', permission: 'coupons.read', states: enums.CouponStatus, search: ['codeNormalized'], fields: 'code discountType percentageBps fixedAmountMinor currency minimumOrderMinor maximumDiscountMinor usageLimit perCustomerLimit totalUsed startsAt expiresAt status', detail: '' },
  shipping: { model: 'Shipment', permission: 'shipping.read', states: enums.ShipmentStatus, search: ['trackingNumber', 'carrier'], fields: 'orderId customerId carrier trackingNumber status shippingCostMinor currency estimatedDeliveryAt shippedAt deliveredAt', detail: '' },
  notifications: { model: 'Notification', permission: 'notifications.read', states: enums.NotificationStatus, search: ['type'], fields: 'customerId orderId type channel status attempts sentAt', detail: '' },
  'audit-logs': { model: 'AuditLog', permission: 'audit_logs.read', search: ['action', 'entityType'], fields: 'actorId actorRole action entityType entityId customerId requestId', detail: '' },
};
const nested = {
  pricing: 'subtotalMinor discountMinor shippingMinor taxMinor grandTotalMinor currency',
  media: 'url publicId alt type sortOrder', seo: 'title description keywords canonicalUrl',
  shippingAddressSnapshot: 'recipientName phone addressLine1 addressLine2 landmark city state postalCode country',
  billingAddressSnapshot: 'recipientName phone addressLine1 addressLine2 landmark city state postalCode country',
  customerSnapshot: 'name email phone billingAddress', billingAddress: 'recipientName phone addressLine1 addressLine2 landmark city state postalCode country',
  sellerSnapshot: 'name address email phone taxId', coupon: 'couponId code discountMinor',
  items: 'productId variantId sku productName variantName description quantity unitPriceMinor discountMinor taxMinor lineTotalMinor totalMinor currency',
  dimensions: 'lengthCm widthCm heightCm',
};
function cleanValue(value, key) {
  if (value == null) return value;
  if (Array.isArray(value)) return value.map(item => cleanValue(item, key));
  if (value instanceof Date) return value.toISOString();
  if (value.toHexString) return value.toHexString();
  if (typeof value !== 'object') return value;
  if (key === 'attributes') return Object.fromEntries(Object.entries(value).filter(([k,v]) => k.length <= 50 && typeof v === 'string').slice(0,20));
  const allowed = (nested[key] || '').split(' ');
  return Object.fromEntries(allowed.filter(k => value[k] !== undefined).map(k => [k, cleanValue(value[k], k)]));
}
function serialize(resource, row, detail = false) {
  const config = resources[resource];
  const fields = `${config.fields} ${detail ? config.detail : ''} createdAt updatedAt`.split(' ').filter(Boolean);
  return { id: String(row._id), version: row.version ?? row.__v ?? 0,
    ...Object.fromEntries(fields.filter(key => row[key] !== undefined).map(key => [key, cleanValue(row[key], key)])) };
}
module.exports = { resources, serialize, cleanValue };
