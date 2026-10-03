const { Schema } = require('mongoose');
const f = require('../validators/fields');
const { enums, assertTransition } = require('./states');
const { validateRelationships } = require('../validators/relationships');
const { PERMISSIONS, OWNER_ONLY } = require('../../admin/permissions');
const { text, integer, ref, date, currency, bool, email, hash, list, sub, metadata, url, address, seo, media, orderItem, pricing } = f;
const status = (name, initial) => ({ type: String, enum: enums[name], required: true, default: initial });
const index = (schema, fields, name, options = {}) => schema.index(fields, { name, ...options });
const unique = (schema, fields, name, partialFilterExpression) => index(schema, fields, name, { unique: true, ...(partialFilterExpression ? { partialFilterExpression } : {}) });
const present = field => ({ [field]: { $type: 'string' } });

// All registrations use an explicit connection; never register on legacy/default mongoose.
function buildModels(connection) {
  const definitions = {};
  function define(name, collection, fields, options = {}) {
    const schema = new Schema(fields, { collection, strict: 'throw', strictQuery: 'throw', timestamps: options.event ? { createdAt: true, updatedAt: false } : true, optimisticConcurrency: true, versionKey: options.inventory ? 'version' : '__v', autoCreate: false, autoIndex: false });
    schema.$design = { name, collection, ...options };
    // Guard document saves; native driver/admin credentials remain a separate trust boundary.
    schema.pre('validate', async function () {
      if (options.appendOnly && !this.isNew) throw new Error(`${collection} is append-only`);
      if (!this.isNew) {
        for (const path of options.frozen || []) if (this.isModified(path)) throw new Error(`Historical field ${path} is immutable`);
        if (options.states) {
          const stored = await this.constructor.findById(this._id).session(this.$session()).lean();
          if (!stored) throw new Error('Record no longer exists');
          for (const [field, graph] of Object.entries(options.states)) assertTransition(graph, stored[field], this[field]);
          if (name === 'Invoice' && stored.status !== 'DRAFT') {
            for (const field of ['invoiceNumber', 'issuedAt', 'documentUrl']) if (this.isModified(field)) throw new Error('Issued invoice identity/document is immutable');
          }
        }
      } else {
        for (const [field, allowed] of Object.entries(options.initial || {})) if (!allowed.includes(this[field])) throw new Error(`Invalid initial ${collection}.${field}`);
      }
      if (options.check) await options.check.call(this);
      await validateRelationships(this, name, connection.models);
      // Validate references only when created/changed. Frozen historical references may later be archived.
      await checkReferences(this, schema, connection, this.$session(), this.isNew);
    });
    for (const operation of ['updateOne', 'updateMany', 'findOneAndUpdate', 'replaceOne', 'findOneAndReplace', 'deleteMany', 'findOneAndDelete']) {
      schema.pre(operation, function () { throw new Error('Use database repositories and guarded document saves; no query updates/deletes'); });
    }
    schema.pre('deleteOne', { document: true, query: true }, function () { throw new Error('Deletion requires an explicit retention/migration policy'); });
    schema.pre('insertMany', function () { throw new Error('Use validated create/save'); });
    schema.pre('bulkWrite', function () { throw new Error('Bulk writes bypass database invariants'); });
    definitions[name] = schema;
    return schema;
  }
  let s = define('User', 'users', {
    googleSubject: { ...text(false, 255), select: false }, authSessions: { ...list(sub({ digest: hash(), expiresAt: date(true) }), 10), select: false },
    email: email(), emailNormalized: { ...email(), lowercase: true }, phone: text(), phoneNormalized: { ...text(false, 16), match: /^\+[1-9]\d{6,14}$/ },
    passwordHash: { ...text(false, 100), select: false, match: /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/ },
    roles: { ...list({ type: String, enum: ['CUSTOMER', 'ADMIN', 'OWNER'] }, 3, 1), default: ['CUSTOMER'] },
    permissions: list({ type: String, enum: PERMISSIONS }, PERMISSIONS.length),
    accessVersion: integer(true, 0, 0), adminCommandVersion: integer(true, 0, 0),
    status: status('UserStatus', 'ACTIVE'), emailVerifiedAt: date(), phoneVerifiedAt: date(), lastLoginAt: date()
  }, { frozen: ['googleSubject'], states: { status: 'UserStatus' }, check() {
    this.emailNormalized = this.email.trim().toLowerCase();
    if (new Set(this.roles).size !== this.roles.length || new Set(this.permissions).size !== this.permissions.length) throw new Error('Duplicate role or permission');
    if (!this.roles.includes('OWNER') && this.permissions.some(value => OWNER_ONLY.includes(value))) throw new Error('Owner-only permission cannot be delegated');
    if (!this.roles.some(role => ['OWNER', 'ADMIN'].includes(role)) && this.permissions.length) throw new Error('Customer cannot hold staff permissions');
  } });
  unique(s, { googleSubject: 1 }, 'user_google_identity', present('googleSubject'));
  unique(s, { emailNormalized: 1 }, 'user_email_identity'); index(s, { phoneNormalized: 1 }, 'user_phone_lookup');
  s = define('Customer', 'customers', { userId: ref('User', false), firstName: text(true), lastName: text(), email: email(), emailNormalized: { ...email(), lowercase: true }, phone: text(), phoneNormalized: text(), status: status('CustomerStatus', 'ACTIVE'), avatarUrl: url(), dateOfBirth: date(), marketingConsent: { type: Boolean }, lastOrderAt: date(), totalOrders: integer(true, 0, 0), totalSpentMinor: integer(true, 0, 0), totalsCurrency: { ...currency(), required: false } }, { states: { status: 'CustomerStatus' }, check() { this.emailNormalized = this.email.trim().toLowerCase(); if (this.totalSpentMinor && !this.totalsCurrency) throw new Error('Derived spend requires currency'); } });
  unique(s, { userId: 1 }, 'customer_user_identity', { userId: { $type: 'objectId' } }); index(s, { emailNormalized: 1 }, 'customer_email_lookup'); index(s, { phoneNormalized: 1 }, 'customer_phone_lookup'); index(s, { status: 1, createdAt: -1, _id: -1 }, 'customer_status_history');
  s = define('CustomerAddress', 'customer_addresses', { customerId: ref('Customer'), ...address.obj, label: text(), isDefaultShipping: bool(), isDefaultBilling: bool() });
  index(s, { customerId: 1, createdAt: -1, _id: -1 }, 'addresses_by_customer'); unique(s, { customerId: 1, isDefaultShipping: 1 }, 'one_default_shipping', { isDefaultShipping: true }); unique(s, { customerId: 1, isDefaultBilling: 1 }, 'one_default_billing', { isDefaultBilling: true });
  s = define('Category', 'categories', { name: text(true), slug: { ...text(true), lowercase: true, match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/ }, description: text(false, 4000), parentId: ref('Category', false), imageUrl: url(), status: status('CategoryStatus', 'ACTIVE'), sortOrder: integer(true, 0, 0), seo: { type: seo } }, { states: { status: 'CategoryStatus' }, frozen: ['parentId'], async check() {
    const seen = new Set([String(this._id)]); let parent = this.parentId;
    for (let depth = 0; parent; depth++) { if (depth >= 20 || seen.has(String(parent))) throw new Error('Category cycle/depth exceeded'); seen.add(String(parent)); const p = await connection.models.Category.findById(parent).session(this.$session()).lean(); parent = p?.parentId; }
  } });
  unique(s, { slug: 1 }, 'category_slug'); index(s, { parentId: 1 }, 'category_children'); index(s, { status: 1, sortOrder: 1 }, 'category_navigation');
  s = define('Product', 'products', { name: text(true), slug: { ...text(true), lowercase: true }, shortDescription: text(false, 500), description: text(false, 10000), categoryIds: list(ref('Category'), 20, 1), brand: text(), status: status('ProductStatus', 'DRAFT'), media: list(media, 20), seo: { type: seo }, tags: list({ ...text(true, 50) }, 30) }, { states: { status: 'ProductStatus' } });
  unique(s, { slug: 1 }, 'product_slug'); index(s, { categoryIds: 1, status: 1, createdAt: -1 }, 'catalogue_category_status'); index(s, { status: 1, createdAt: -1, _id: -1 }, 'catalogue_newest'); index(s, { name: 'text', shortDescription: 'text', tags: 'text' }, 'catalogue_text');
  s = define('ProductVariant', 'product_variants', { productId: ref('Product'), sku: { ...text(true), uppercase: true }, name: text(), attributes: { type: Map, of: String, default: {}, validate: v => v.size <= 20 && [...v].every(([k, x]) => k.length <= 50 && x.length <= 100) }, priceMinor: integer(), compareAtPriceMinor: integer(false), currency: currency(), status: status('VariantStatus', 'ACTIVE'), weightGrams: integer(false), dimensions: { type: sub({ lengthCm: { type: Number, min: 0, max: 100000 }, widthCm: { type: Number, min: 0, max: 100000 }, heightCm: { type: Number, min: 0, max: 100000 } }) }, media: list(media, 20) }, { states: { status: 'VariantStatus' }, frozen: ['productId', 'sku'] });
  unique(s, { sku: 1 }, 'variant_global_sku'); index(s, { productId: 1, status: 1 }, 'product_variants');
  s = define('Inventory', 'inventory', { variantId: ref('ProductVariant'), sku: { ...text(true), uppercase: true }, availableQuantity: integer(true, 0, 0), reservedQuantity: integer(true, 0, 0), lowStockThreshold: integer(false), status: status('InventoryStatus', 'OUT_OF_STOCK') }, { inventory: true, frozen: ['variantId', 'sku'], async check() {
    if (this.isNew && (this.availableQuantity !== 0 || this.reservedQuantity !== 0)) throw new Error('Opening stock requires a movement');
    const v = await connection.models.ProductVariant.findById(this.variantId).session(this.$session()).lean(); if (v && v.sku !== this.sku) throw new Error('Inventory SKU mismatch');
    if (this.status !== 'DISABLED') this.status = this.availableQuantity === 0 ? 'OUT_OF_STOCK' : this.lowStockThreshold !== undefined && this.availableQuantity <= this.lowStockThreshold ? 'LOW_STOCK' : 'IN_STOCK';
  } });
  unique(s, { variantId: 1 }, 'one_inventory_per_variant'); unique(s, { sku: 1 }, 'inventory_sku'); index(s, { status: 1 }, 'stock_dashboard');
  s = define('InventoryTransaction', 'inventory_transactions', { inventoryId: ref('Inventory'), variantId: ref('ProductVariant'), sku: text(true), type: { type: String, required: true, enum: ['RESTOCK', 'SALE', 'RESERVATION', 'RELEASE', 'RETURN', 'ADJUSTMENT'] }, quantity: integer(true, -f.MAX), referenceType: { type: String, required: true, enum: ['ORDER', 'RETURN', 'MANUAL', 'SYSTEM'] }, referenceId: { type: Schema.Types.ObjectId }, actorId: ref('User', false), reason: text(false, 500), metadata: metadata(), operationKey: text(true), requestHash: hash() }, { event: true, appendOnly: true, check() { if (this.quantity === 0 || (this.type !== 'ADJUSTMENT' && this.quantity < 0)) throw new Error('Invalid movement quantity'); } });
  unique(s, { operationKey: 1 }, 'stock_operation_once'); index(s, { variantId: 1, createdAt: -1 }, 'variant_movements'); index(s, { inventoryId: 1, createdAt: -1 }, 'inventory_movements'); index(s, { referenceId: 1 }, 'reference_movements'); index(s, { createdAt: -1 }, 'recent_movements');
  s = define('Cart', 'carts', { customerId: ref('Customer', false), sessionId: text(false, 200), items: list(sub({ variantId: ref('ProductVariant'), quantity: integer(true, 1) }), 100), expiresAt: date() }, { check() { if (Boolean(this.customerId) === Boolean(this.sessionId)) throw new Error('Cart needs exactly one owner'); if (!this.customerId && !this.expiresAt) throw new Error('Guest cart requires expiry'); if (new Set(this.items.map(i => String(i.variantId))).size !== this.items.length) throw new Error('Duplicate cart variant'); } });
  unique(s, { customerId: 1 }, 'customer_cart', { customerId: { $type: 'objectId' } }); unique(s, { sessionId: 1 }, 'guest_cart', present('sessionId')); index(s, { expiresAt: 1 }, 'cart_expiry', { expireAfterSeconds: 0 });
  s = define('GiftDraft', 'gift_drafts', {
    ownerHash: hash(),
    boxes: list(sub({ id: text(true, 100), quantity: { ...integer(true, 1), max: 99 } }), 8),
    items: list(sub({ id: text(true, 100), quantity: { ...integer(true, 1), max: 99 } }), 100)
  }, { frozen: ['ownerHash'], check() {
    for (const entries of [this.boxes, this.items]) if (new Set(entries.map(i => i.id)).size !== entries.length) throw new Error('Duplicate gift selection');
  } });
  unique(s, { ownerHash: 1 }, 'one_gift_draft_per_browser');
  const orderFrozen = ['orderNumber', 'customerId', 'items', 'pricing', 'coupon', 'shippingAddressSnapshot', 'billingAddressSnapshot', 'customerSnapshot', 'idempotencyKey', 'requestHash'];
  s = define('Order', 'orders', { orderNumber: text(true), customerId: ref('Customer'), status: status('OrderStatus', 'CREATED'), paymentStatus: status('OrderPaymentStatus', 'PENDING'), fulfillmentStatus: status('FulfillmentStatus', 'UNFULFILLED'), items: list(orderItem, 100, 1), pricing: { type: pricing, required: true }, coupon: { type: sub({ couponId: ref('Coupon'), code: text(true), discountMinor: integer() }) }, shippingAddressSnapshot: { type: address, required: true }, billingAddressSnapshot: { type: address, required: true }, customerSnapshot: { type: sub({ name: text(true), email: email(), phone: text() }), required: true }, idempotencyKey: text(true), requestHash: hash(), confirmedAt: date(), shippedAt: date(), deliveredAt: date(), cancelledAt: date() }, { states: { status: 'OrderStatus', paymentStatus: 'OrderPaymentStatus', fulfillmentStatus: 'FulfillmentStatus' }, initial: { status: ['CREATED', 'PAYMENT_PENDING'], paymentStatus: ['PENDING'], fulfillmentStatus: ['UNFULFILLED'] }, frozen: orderFrozen, check() { f.assertTotals(this.items, this.pricing); if (this.coupon && this.coupon.discountMinor !== this.pricing.discountMinor) throw new Error('Coupon snapshot mismatch'); } });
  unique(s, { orderNumber: 1 }, 'order_number'); unique(s, { customerId: 1, idempotencyKey: 1 }, 'customer_order_request'); index(s, { customerId: 1, createdAt: -1, _id: -1 }, 'customer_order_history'); for (const field of ['status', 'paymentStatus', 'fulfillmentStatus']) index(s, { [field]: 1, createdAt: -1 }, `order_${field}_dashboard`); index(s, { createdAt: -1 }, 'orders_by_date'); index(s, { 'pricing.currency': 1, createdAt: -1, _id: -1 }, 'orders_by_currency_date');
  s = define('Payment', 'payments', { orderId: ref('Order'), customerId: ref('Customer'), provider: text(true, 50), providerOrderId: text(), providerPaymentId: text(), amountMinor: integer(true, 1), currency: currency(), status: status('PaymentStatus', 'CREATED'), idempotencyKey: text(true), requestHash: hash(), failureCode: text(), failureMessage: text(false, 500), paidAt: date(), metadata: metadata(), refundVersion: integer(true, 0, 0) }, { states: { status: 'PaymentStatus' }, initial: { status: ['CREATED', 'PENDING'] }, frozen: ['orderId', 'customerId', 'provider', 'amountMinor', 'currency', 'idempotencyKey', 'requestHash'], async check() { const order = await connection.models.Order.findById(this.orderId).session(this.$session()).lean(); if (order && (String(order.customerId) !== String(this.customerId) || order.pricing.currency !== this.currency || order.pricing.grandTotalMinor !== this.amountMinor)) throw new Error('Payment/order identity or amount mismatch'); } });
  index(s, { orderId: 1, createdAt: -1 }, 'order_payment_attempts'); index(s, { customerId: 1, createdAt: -1, _id: -1 }, 'customer_payments'); unique(s, { orderId: 1, idempotencyKey: 1 }, 'payment_creation_once'); unique(s, { provider: 1, providerPaymentId: 1 }, 'provider_payment_once', present('providerPaymentId')); index(s, { provider: 1, providerOrderId: 1 }, 'provider_order_lookup'); index(s, { status: 1, createdAt: -1 }, 'payment_dashboard'); index(s, { currency: 1, paidAt: 1, status: 1 }, 'captured_reporting'); index(s, { currency: 1, createdAt: -1, _id: -1 }, 'recent_payments_by_currency');
  s = define('PaymentEvent', 'payment_events', { provider: text(true, 50), providerEventId: text(true), eventType: text(true), paymentId: ref('Payment', false), orderId: ref('Order', false), status: status('PaymentEventStatus', 'RECEIVED'), payloadHash: hash(), errorMessage: text(false, 500), receivedAt: { type: Date, required: true, default: Date.now }, processedAt: date() }, { event: true, states: { status: 'PaymentEventStatus' }, initial: { status: ['RECEIVED'] }, frozen: ['provider', 'providerEventId', 'eventType', 'payloadHash', 'receivedAt', 'paymentId', 'orderId'] });
  unique(s, { provider: 1, providerEventId: 1 }, 'gateway_event_once'); index(s, { status: 1, receivedAt: 1 }, 'event_recovery_queue'); index(s, { paymentId: 1, receivedAt: -1 }, 'payment_event_history');
  s = define('Coupon', 'coupons', { code: text(true), codeNormalized: { ...text(true), uppercase: true }, discountType: { type: String, required: true, enum: ['PERCENTAGE', 'FIXED_AMOUNT'] }, percentageBps: { ...integer(false, 1), max: 10000 }, fixedAmountMinor: integer(false, 1), currency: { ...currency(), required: false }, minimumOrderMinor: integer(false), maximumDiscountMinor: integer(false), usageLimit: integer(false, 1), perCustomerLimit: integer(false, 1), totalUsed: integer(true, 0, 0), startsAt: date(), expiresAt: date(), status: status('CouponStatus', 'ACTIVE') }, { states: { status: 'CouponStatus' }, check() { this.codeNormalized = this.code.trim().toUpperCase(); if (this.discountType === 'PERCENTAGE' ? !this.percentageBps || this.fixedAmountMinor !== undefined : !this.fixedAmountMinor || !this.currency || this.percentageBps !== undefined) throw new Error('Coupon amount/rate fields invalid'); if (this.startsAt && this.expiresAt && this.startsAt >= this.expiresAt) throw new Error('Coupon dates invalid'); if (this.usageLimit !== undefined && this.totalUsed > this.usageLimit) throw new Error('Coupon limit exceeded'); } });
  unique(s, { codeNormalized: 1 }, 'coupon_code'); index(s, { status: 1, startsAt: 1, expiresAt: 1 }, 'coupon_validity');
  s = define('CouponRedemption', 'coupon_redemptions', { couponId: ref('Coupon'), customerId: ref('Customer'), orderId: ref('Order'), discountMinor: integer(), status: status('RedemptionStatus', 'APPLIED'), reversedAt: date() }, { event: true, initial: { status: ['APPLIED'] }, states: { status: 'RedemptionStatus' }, frozen: ['couponId', 'customerId', 'orderId', 'discountMinor'] });
  unique(s, { orderId: 1 }, 'one_coupon_per_order'); index(s, { couponId: 1, customerId: 1, status: 1 }, 'customer_coupon_limit'); index(s, { customerId: 1, createdAt: -1, _id: -1 }, 'customer_coupon_history');
  s = define('Shipment', 'shipments', { orderId: ref('Order'), customerId: ref('Customer', false), carrier: text(), trackingNumber: text(), status: status('ShipmentStatus', 'PENDING'), shippingCostMinor: integer(false), currency: { ...currency(), required: false }, estimatedDeliveryAt: date(), shippedAt: date(), deliveredAt: date(), metadata: metadata() }, { states: { status: 'ShipmentStatus' }, initial: { status: ['PENDING'] }, frozen: ['orderId', 'customerId'], check() { if (this.shippingCostMinor !== undefined && !this.currency) throw new Error('Shipping cost requires currency'); } });
  index(s, { orderId: 1 }, 'order_shipments'); index(s, { carrier: 1, trackingNumber: 1 }, 'shipment_tracking'); index(s, { status: 1, createdAt: -1 }, 'shipment_dashboard');
  const invoiceItem = sub({ description: text(true, 1000), sku: text(), quantity: integer(true, 1), unitPriceMinor: integer(), discountMinor: integer(true, 0, 0), taxMinor: integer(true, 0, 0), totalMinor: integer() });
  s = define('Invoice', 'invoices', { invoiceNumber: text(), orderId: ref('Order'), customerId: ref('Customer'), status: status('InvoiceStatus', 'DRAFT'), sellerSnapshot: { type: sub({ name: text(true), address: text(false, 1000), email: { ...email(), required: false }, phone: text(), taxId: text() }), required: true }, customerSnapshot: { type: sub({ name: text(true), email: { ...email(), required: false }, phone: text(), billingAddress: { type: address, required: true } }), required: true }, items: list(invoiceItem, 100, 1), ...pricing.obj, documentUrl: url(), issuedAt: date() }, { states: { status: 'InvoiceStatus' }, initial: { status: ['DRAFT'] }, frozen: ['orderId', 'customerId', 'sellerSnapshot', 'customerSnapshot', 'items', ...Object.keys(pricing.obj)], check() { f.assertTotals(this.items, this, 'totalMinor'); if (this.status === 'ISSUED' && (!this.invoiceNumber || !this.issuedAt)) throw new Error('Issued invoice requires number/date'); if (!this.isNew && this.isModified('invoiceNumber') && !this.$locals.issuing) throw new Error('Invoice number cannot be changed outside issuance'); } });
  unique(s, { invoiceNumber: 1 }, 'invoice_number', present('invoiceNumber')); unique(s, { orderId: 1 }, 'one_invoice_per_order'); index(s, { customerId: 1, createdAt: -1, _id: -1 }, 'customer_invoices');
  s = define('Refund', 'refunds', { orderId: ref('Order'), paymentId: ref('Payment'), customerId: ref('Customer'), amountMinor: integer(true, 1), currency: currency(), reason: text(false, 500), provider: text(true, 50), providerRefundId: text(), status: status('RefundStatus', 'REQUESTED'), requestedBy: ref('User', false), requestedAt: { type: Date, default: Date.now, required: true }, completedAt: date(), metadata: metadata(), idempotencyKey: text(true), requestHash: hash() }, { states: { status: 'RefundStatus' }, initial: { status: ['REQUESTED'] }, frozen: ['orderId', 'paymentId', 'customerId', 'amountMinor', 'currency', 'provider', 'requestedAt', 'idempotencyKey', 'requestHash'], async check() { const p = await connection.models.Payment.findById(this.paymentId).session(this.$session()).lean(); if (p && (String(p.orderId) !== String(this.orderId) || String(p.customerId) !== String(this.customerId) || p.currency !== this.currency || p.provider !== this.provider)) throw new Error('Refund/payment mismatch'); } });
  unique(s, { paymentId: 1, idempotencyKey: 1 }, 'refund_request_once'); unique(s, { provider: 1, providerRefundId: 1 }, 'gateway_refund_once', present('providerRefundId')); index(s, { orderId: 1, createdAt: -1 }, 'order_refunds'); index(s, { paymentId: 1, createdAt: -1 }, 'payment_refund_history'); index(s, { customerId: 1, createdAt: -1, _id: -1 }, 'customer_refunds'); index(s, { status: 1, createdAt: -1 }, 'refund_dashboard'); index(s, { currency: 1, completedAt: 1, status: 1 }, 'refund_reporting'); index(s, { currency: 1, createdAt: -1, _id: -1 }, 'recent_refunds_by_currency');
  s = define('FinanceEvent', 'finance_events', { type: { type: String, required: true, enum: ['PAYMENT', 'REFUND', 'DISCOUNT', 'SHIPPING', 'TAX', 'ADJUSTMENT'] }, orderId: ref('Order', false), paymentId: ref('Payment', false), refundId: ref('Refund', false), amountMinor: integer(), currency: currency(), direction: { type: String, required: true, enum: ['CREDIT', 'DEBIT'] }, status: { type: String, required: true, enum: ['POSTED', 'REVERSED'], default: 'POSTED' }, reversesEventId: ref('FinanceEvent', false), referenceId: text(), eventKey: text(true), metadata: metadata() }, { event: true, appendOnly: true, check() { if (this.status === 'REVERSED' && !this.reversesEventId) throw new Error('Reversal requires original event'); } });
  unique(s, { eventKey: 1 }, 'finance_effect_once'); unique(s, { reversesEventId: 1 }, 'finance_reverse_once', { reversesEventId: { $type: 'objectId' } }); index(s, { orderId: 1, createdAt: -1 }, 'order_finance'); index(s, { type: 1, createdAt: -1 }, 'finance_reporting');
  s = define('Notification', 'notifications', { customerId: ref('Customer', false), orderId: ref('Order', false), type: text(true), channel: { type: String, required: true, enum: ['EMAIL', 'SMS', 'WHATSAPP', 'PUSH'] }, status: status('NotificationStatus', 'PENDING'), providerMessageId: text(), attempts: integer(true, 0, 0), lastError: text(false, 500), sentAt: date(), dedupeKey: text(true) }, { states: { status: 'NotificationStatus' }, initial: { status: ['PENDING'] } });
  unique(s, { dedupeKey: 1 }, 'notification_once'); index(s, { customerId: 1, createdAt: -1, _id: -1 }, 'customer_notifications'); index(s, { orderId: 1, createdAt: -1 }, 'order_notifications'); index(s, { status: 1, createdAt: 1 }, 'notification_retry');
  s = define('AuditLog', 'audit_logs', { actorId: ref('User', false), actorRole: { ...text(), enum: ['CUSTOMER', 'ADMIN', 'OWNER', 'SYSTEM'] }, action: text(true), entityType: text(true), entityId: { type: Schema.Types.ObjectId }, customerId: ref('Customer', false), previousState: metadata(), newState: metadata(), requestId: text(), ipAddress: text(false, 64), userAgent: text(false, 500), metadata: metadata() }, { event: true, appendOnly: true });
  index(s, { entityType: 1, entityId: 1, createdAt: -1 }, 'entity_audit'); index(s, { actorId: 1, createdAt: -1 }, 'actor_audit'); index(s, { customerId: 1, createdAt: -1, _id: -1 }, 'customer_activity'); index(s, { createdAt: -1 }, 'recent_audit');
  // A fixed singleton also serializes first-owner bootstrap. It stores no credentials.
  s = define('AdminSetting', 'admin_settings', {
    key: { ...text(true, 50), enum: ['operations'], default: 'operations' },
    timezone: text(false, 80), currency: { ...currency(), required: false },
    revision: integer(true, 0, 0), bootstrapOwnerId: ref('User', false), bootstrapCompletedAt: date()
  }, { check() {
    if (this.timezone) { try { new Intl.DateTimeFormat('en', { timeZone: this.timezone }).format(); } catch { throw new Error('Invalid reporting timezone'); } }
    if (Boolean(this.timezone) !== Boolean(this.currency)) throw new Error('Reporting requires timezone and currency together');
  } });
  unique(s, { key: 1 }, 'one_operations_setting');
  s = define('AdminCommand', 'admin_commands', {
    actorId: ref('User'), key: text(true, 100), action: text(true, 100), requestHash: hash(),
    resource: text(true, 80), resourceId: { type: Schema.Types.ObjectId, required: true },
    resourceVersion: integer(true, 0), requestId: text(false, 100)
  }, { event: true, appendOnly: true });
  unique(s, { actorId: 1, key: 1 }, 'admin_command_once');
  index(s, { actorId: 1, createdAt: -1, _id: -1 }, 'admin_command_history');
  s = define('AdminRate', 'admin_rate_limits', {
    key: hash(), count: integer(true, 0, 0), expiresAt: date(true)
  });
  unique(s, { key: 1 }, 'admin_rate_bucket'); index(s, { expiresAt: 1 }, 'admin_rate_expiry', { expireAfterSeconds: 0 });
  for (const name of ['User', 'Category', 'Customer', 'ProductVariant', 'Inventory', 'Coupon', 'Shipment', 'Invoice', 'Notification', 'AuditLog']) {
    index(definitions[name], { createdAt: -1, _id: -1 }, `${definitions[name].$design.collection}_admin_cursor`);
  }
  for (const field of ['status', 'paymentStatus', 'fulfillmentStatus']) index(definitions.Order, { [field]: 1, createdAt: -1, _id: -1 }, `order_${field}_admin_cursor`);
  return Object.fromEntries(Object.entries(definitions).map(([name, schema]) => [name, connection.model(name, schema)]));
}
async function checkReferences(document, schema, connection, session, isNew) {
  for (const [path, type] of Object.entries(schema.paths)) {
    const value = document.get(path);
    if (value == null) continue;
    if (type.schema) {
      for (const child of Array.isArray(value) ? value : [value]) await checkReferences(child, type.schema, connection, session, isNew);
    } else {
      const target = type.options.ref || type.caster?.options?.ref;
      if (!target || (!isNew && !document.isModified(path))) continue;
      for (const id of Array.isArray(value) ? value : [value]) {
        if (!await connection.models[target].exists({ _id: id }).session(session)) throw new Error(`Missing reference ${target}:${path}`);
      }
    }
  }
}
module.exports = { buildModels };
