// State graphs are persistence constraints, not staff permissions or business approval.
const graphs = {
  UserStatus: { ACTIVE: ['SUSPENDED', 'DISABLED'], SUSPENDED: ['ACTIVE', 'DISABLED'], DISABLED: [] },
  CustomerStatus: { ACTIVE: ['INACTIVE', 'BLOCKED'], INACTIVE: ['ACTIVE', 'BLOCKED'], BLOCKED: ['ACTIVE', 'INACTIVE'] },
  CategoryStatus: { ACTIVE: ['INACTIVE'], INACTIVE: ['ACTIVE'] },
  ProductStatus: { DRAFT: ['ACTIVE', 'ARCHIVED'], ACTIVE: ['DRAFT', 'ARCHIVED'], ARCHIVED: [] },
  VariantStatus: { ACTIVE: ['INACTIVE'], INACTIVE: ['ACTIVE'] },
  OrderStatus: { CREATED: ['PAYMENT_PENDING', 'CANCELLED'], PAYMENT_PENDING: ['CONFIRMED', 'CANCELLED'], CONFIRMED: ['PROCESSING', 'CANCELLED', 'REFUNDED'], PROCESSING: ['SHIPPED', 'CANCELLED', 'REFUNDED'], SHIPPED: ['DELIVERED'], DELIVERED: ['REFUNDED'], CANCELLED: [], REFUNDED: [] },
  OrderPaymentStatus: { PENDING: ['PAID', 'FAILED'], FAILED: ['PENDING', 'PAID'], PAID: ['PARTIALLY_REFUNDED', 'REFUNDED'], PARTIALLY_REFUNDED: ['REFUNDED'], REFUNDED: [] },
  FulfillmentStatus: { UNFULFILLED: ['PROCESSING', 'CANCELLED'], PROCESSING: ['SHIPPED', 'CANCELLED'], SHIPPED: ['DELIVERED'], DELIVERED: [], CANCELLED: [] },
  PaymentStatus: { CREATED: ['PENDING', 'AUTHORIZED', 'CAPTURED', 'FAILED', 'CANCELLED'], PENDING: ['AUTHORIZED', 'CAPTURED', 'FAILED', 'CANCELLED'], AUTHORIZED: ['CAPTURED', 'FAILED', 'CANCELLED'], CAPTURED: ['PARTIALLY_REFUNDED', 'REFUNDED'], FAILED: [], CANCELLED: [], PARTIALLY_REFUNDED: ['REFUNDED'], REFUNDED: [] },
  PaymentEventStatus: { RECEIVED: ['PROCESSING', 'PROCESSED', 'FAILED'], PROCESSING: ['PROCESSED', 'FAILED'], FAILED: ['PROCESSING', 'PROCESSED'], PROCESSED: [] },
  InventoryStatus: { IN_STOCK: ['LOW_STOCK', 'OUT_OF_STOCK', 'DISABLED'], LOW_STOCK: ['IN_STOCK', 'OUT_OF_STOCK', 'DISABLED'], OUT_OF_STOCK: ['IN_STOCK', 'LOW_STOCK', 'DISABLED'], DISABLED: ['IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK'] },
  CouponStatus: { ACTIVE: ['INACTIVE', 'EXPIRED'], INACTIVE: ['ACTIVE', 'EXPIRED'], EXPIRED: [] },
  RedemptionStatus: { APPLIED: ['REVERSED'], REVERSED: [] },
  ShipmentStatus: { PENDING: ['PROCESSING', 'FAILED'], PROCESSING: ['SHIPPED', 'FAILED'], SHIPPED: ['IN_TRANSIT', 'FAILED', 'RETURNED'], IN_TRANSIT: ['OUT_FOR_DELIVERY', 'FAILED', 'RETURNED'], OUT_FOR_DELIVERY: ['DELIVERED', 'FAILED', 'RETURNED'], DELIVERED: ['RETURNED'], FAILED: ['PROCESSING', 'RETURNED'], RETURNED: [] },
  InvoiceStatus: { DRAFT: ['ISSUED', 'VOID'], ISSUED: ['VOID'], VOID: [] },
  RefundStatus: { REQUESTED: ['PROCESSING', 'CANCELLED'], PROCESSING: ['COMPLETED', 'FAILED'], FAILED: [], CANCELLED: [], COMPLETED: [] },
  NotificationStatus: { PENDING: ['SENT', 'FAILED'], FAILED: ['PENDING'], SENT: [] }
};
const enums = Object.fromEntries(Object.entries(graphs).map(([name, graph]) => [name, Object.freeze(Object.keys(graph))]));
function assertTransition(graph, from, to) {
  if (from !== to && !graphs[graph]?.[from]?.includes(to)) throw new Error(`Invalid ${graph} transition: ${from} -> ${to}`);
}
module.exports = { graphs, enums, assertTransition };
