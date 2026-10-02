# Data Models

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Model contract

Schema declarations below preserve required/optional fields, defaults, enums, refs, embedded records, unique constraints and indexes without secret data. Recheck source and update this file whenever schema contracts change. Mongo generated _id and timestamps apply as shown.

Important: Order stores unitPrice/totalPrice, variant SKU/name, gift boxing and image/address snapshots, but no product-name or seller/tax invoice snapshot. User addresses have IDs; order addresses and items disable subdocument IDs. Unique array-SKU declarations need database verification; do not assume they enforce uniqueness within every product array.

## addressSchema

Source: `backend/src/features/auth/auth.model.js`. Snapshot of declared schema options/fields; runtime indexes not verified.

```js
{
  label: { type: String, trim: true },
  fullName: { type: String, required: true, trim: true },
  line1: { type: String, required: true, trim: true },
  line2: { type: String, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  postalCode: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true }
}, { _id: true }
```

## refreshTokenSchema

Source: `backend/src/features/auth/auth.model.js`. Snapshot of declared schema options/fields; runtime indexes not verified.

```js
{
  tokenHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true }
}
```

## userSchema

Source: `backend/src/features/auth/auth.model.js`. Snapshot of declared schema options/fields; runtime indexes not verified.

```js
{
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer'
  },
  phone: String,
  addresses: [addressSchema],
  refreshTokens: [refreshTokenSchema]
}, {
  timestamps: true
}
```

## categorySchema

Source: `backend/src/features/category/category.model.js`. Snapshot of declared schema options/fields; runtime indexes not verified.

```js
{
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  image: {
    public_id: String,
    alt: String
  },
  type: {
    type: String,
    enum: ['product_category', 'gift_box_section'],
    default: 'product_category'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
}
```

## couponSchema

Source: `backend/src/features/coupon/coupon.model.js`. Snapshot of declared schema options/fields; runtime indexes not verified.

```js
{
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  minPurchase: {
    type: Number,
    default: 0
  },
  validFrom: {
    type: Date,
    default: Date.now
  },
  validUntil: {
    type: Date,
    required: true
  },
  maxUses: {
    type: Number,
    default: 0 // 0 means unlimited usage
  },
  usedCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  applicableProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  applicableCategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }]
}, {
  timestamps: true
}
```

Additional indexes:

```js
couponSchema.index({ code: 1, isActive: 1 });
```

## orderAddressSchema

Source: `backend/src/features/order/order.model.js`. Snapshot of declared schema options/fields; runtime indexes not verified.

```js
{
  label: String,
  fullName: { type: String, required: true },
  line1: { type: String, required: true },
  line2: String,
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true }
}, { _id: false }
```

## orderItemSchema

Source: `backend/src/features/order/order.model.js`. Snapshot of declared schema options/fields; runtime indexes not verified.

```js
{
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  variant: {
    sku: String,
    name: String
  },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  giftBoxing: {
    type: { type: String, enum: ['classics', 'royale-tin', 'premium-velvet'] },
    surcharge: { type: Number, default: 0 }
  },
  isGift: { type: Boolean, default: false },
  giftMessage: { type: String, maxlength: 500 },
  giftFrom: String,
  imagePublicId: String
}, { _id: false }
```

## orderSchema

Source: `backend/src/features/order/order.model.js`. Snapshot of declared schema options/fields; runtime indexes not verified.

```js
{
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  shippingCost: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'expired'],
    default: 'pending',
    index: true
  },
  shippingAddress: orderAddressSchema,
  billingAddress: orderAddressSchema,
  recipient: {
    name: String,
    phone: String,
    email: String
  },
  requestedDeliveryDate: Date,
  paymentIntentId: { type: String, index: true },
  idempotencyKey: { type: String, unique: true, index: true },
  couponCode: { type: String, uppercase: true, trim: true },
  discount: { type: Number, default: 0 },
  trackingNumber: String,
  notes: String
}, { timestamps: true }
```

## imageSchema

Source: `backend/src/features/product/product.model.js`. Snapshot of declared schema options/fields; runtime indexes not verified.

```js
{
  public_id: { type: String, required: true },
  alt: { type: String, default: '' },
  context: { type: String, enum: ['main', 'angle', 'lifestyle', 'packaging', 'detail'], default: 'main' },
  width: Number,
  height: Number,
  placeholder: String // base64 blur hash
}, { _id: false }
```

## giftBoxingSchema

Source: `backend/src/features/product/product.model.js`. Snapshot of declared schema options/fields; runtime indexes not verified.

```js
{
  type: { type: String, enum: ['classics', 'royale-tin', 'premium-velvet'], required: true },
  available: { type: Boolean, default: true },
  surcharge: { type: Number, default: 0 },
  boxSpecificImages: [imageSchema]
}, { _id: false }
```

## variantSchema

Source: `backend/src/features/product/product.model.js`. Snapshot of declared schema options/fields; runtime indexes not verified.

```js
{
  name: { type: String, required: true },
  sku: { type: String, unique: true, sparse: true },
  price: Number, // overrides basePrice if set
  inventory: { type: Number, default: 0, min: 0 },
  images: [imageSchema],
  giftBoxing: [giftBoxingSchema]
}, { _id: true }
```

## productSchema

Source: `backend/src/features/product/product.model.js`. Snapshot of declared schema options/fields; runtime indexes not verified.

```js
{
  name: { type: String, required: true },
  slug: { type: String, unique: true, required: true, index: true },
  description: {
    short: String,
    long: String,
    ingredients: String,
    howToUse: String
  },
  basePrice: { type: Number, required: true }, // in paise
  compareAtPrice: Number,
  costPrice: Number,
  currency: { type: String, default: 'INR' },
  sku: { type: String, unique: true, sparse: true },
  inventory: { type: Number, default: 0, min: 0 }, // fallback when no variants
  isActive: { type: Boolean, default: true, index: true },
  isFeatured: { type: Boolean, default: false },
  giftBoxing: [giftBoxingSchema],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', index: true }],
  variants: [variantSchema],
  images: [imageSchema],
  tags: [String],
  origin: String,
  nutritionalInfo: { type: Map, of: String },
  searchScore: { type: Number, default: 0 }
}, { timestamps: true }
```

Additional indexes:

```js
productSchema.index({ 'giftBoxing.type': 1, 'giftBoxing.available': 1 });
productSchema.index({ 'variants.giftBoxing.type': 1 });
productSchema.index({ categories: 1, isActive: 1 });
productSchema.index({ name: 'text', 'description.short': 'text', tags: 'text' }); // fallback text index
```

## reviewSchema

Source: `backend/src/features/review/review.model.js`. Snapshot of declared schema options/fields; runtime indexes not verified.

```js
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    index: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    maxlength: 200
  },
  body: {
    type: String,
    maxlength: 2000
  },
  isApproved: {
    type: Boolean,
    default: false,
    index: true
  }
}, {
  timestamps: true
}
```

Additional indexes:

```js
reviewSchema.index({ product: 1, isApproved: 1, createdAt: -1 });
reviewSchema.index({ user: 1, product: 1 }, { unique: true });
```

## Next inquiry / telemetry records

Separate encrypted file records, not Mongoose collections. Source: `frontend_appview/src/lib/security/vault.ts`. Session identity is not Mongo customer identity.

```ts
export interface InquiryRecord {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  city?: string;
  occasion?: string;
  quantity?: string | number;
  targetDate?: string;
  message?: string;
  boxItem?: any;
  productItems?: Array<{ name: string; quantity: number }>;
  source?: string;
  ip?: string;
  geoCity?: string;
  geoRegion?: string;
  geoCountry?: string;
}
```

```ts
export interface SessionRecord {
  id: string;
  firstSeen: string;
  lastSeen: string;
  ip: string;
  geoCity: string;
  geoRegion: string;
  geoCountry: string;
  deviceType: string;
  browser: string;
  os: string;
  landingPage: string;
  referrer: string;
  totalDwellTimeSec: number;
  pagesVisited: string[];
}
```

```ts
export interface SectionEngagementRecord {
  sectionId: string;
  pagePath: string;
  totalViews: number;
  totalDwellTimeSec: number;
}
```

```ts
export interface VaultData {
  inquiries: InquiryRecord[];
  sessions: Record<string, SessionRecord>;
  sectionEngagement: Record<string, SectionEngagementRecord>;
  lastUpdated: string;
}
```

```ts
export interface TelemetryPayload {
  type: 'pageview' | 'heartbeat';
  sessionId: string;
  pagePath: string;
  activeSection?: string;
  dwellTimeSec?: number;
  deviceType?: string;
  browser?: string;
  os?: string;
  referrer?: string;
}
```

## Cross-model reconstruction and missing relationships

| Model / store | Purpose / lifecycle | Reference and deletion behavior | Implementation boundary |
| --- | --- | --- | --- |
| User | Registration, JWT identity, profile, mutable address book | Order/Review refer to _id; no customer deletion/cascade API found | CURRENT / IMPLEMENTED model; Customer360 PARTIAL |
| Product | Catalogue and stock; embedded variants/images/boxing | Category refs; order refs survive soft isActive=false; physical deletion policy UNKNOWN | CURRENT / IMPLEMENTED; immutable catalogue history MISSING |
| Category | Active ordered tree, optional parent Category | Missing/inactive parent becomes root in tree query; no cascade/delete service | CURRENT / IMPLEMENTED; cycle/reference enforcement not established |
| Order | Header totals + item/address copies + User ref | No cascade; Product ref plus partial snapshot; no separate item collection | CURRENT / PARTIAL historic facts; product-name snapshot MISSING |
| Coupon | Global discount and usage rules | Product/Category restrictions; order stores code not Coupon ref | CURRENT / IMPLEMENTED; per-customer redemption MISSING |
| Review | User/Product rating, approved visibility | Compound uniqueness; no delete cascade or review edit endpoint | CURRENT / IMPLEMENTED; populated current user name |
| Vault | Enquiry/session/engagement records | No foreign key to User/Order; prune limits and generated string IDs | CURRENT / PARTIAL analytics, not lifetime customer storage |
| Payment / Invoice / Refund / financial ledger | No model found | No implemented relationship or approved future schema | FUTURE / REQUIRED domain design; exact fields/policy UNKNOWN |

All schema fields above reflect current declarations, not API authorization: passing a whole body to a model update can accept more fields than the displayed form. Mongoose refs are references, not automatic referential integrity or cascade guarantees. Product/category slug generation runs on pre-validate only if slug absent; a later name change does not necessarily rename a slug. Schema min/unique declarations are not proof every update/race is safe; deployment indexes were not queried.

Historical customer relationship/cardinality/privacy rules: [CUSTOMER_SYSTEM.md](CUSTOMER_SYSTEM.md). Lifecycle and pruning: [DATABASE.md](DATABASE.md). Future invoice/refund records are intentionally not specified as current schema.

## B2C field-level design before implementation — 2026-09-28

The prior sections describe the legacy schema. The following new collection design is for B2C/backend/database only. Required/optional concrete paths/defaults/indexes will be generated from the implemented Mongoose schemas below after verification; this table records the intended design before code changes.

| Collection | Required core fields (in addition to _id) | Optional / derived / embedded fields | Relationships / lifecycle |
| --- | --- | --- | --- |
| users | email, emailNormalized strings; roles enum[]; status enum | phone/normalized strings; bcrypt passwordHash; verification/login dates | Unique normalized email; optional phone deliberately nonunique pending identity policy; mutable auth identity |
| customers | firstName/email/emailNormalized strings; status enum | unique userId ref when present; lastName/phone/avatar/DOB/consent; derived order/count/spend with currency | Long-lived identity; no unique email/phone auto-merge; status retirement |
| customer_addresses | customerId ref; recipientName/addressLine1/city/state/postalCode/country strings | label/phone/line2/landmark; default flags | Separate addresses, partial unique true default per customer; replace defaults transactionally |
| categories | name/slug strings; status; sortOrder integer | parentId ref, description, image, SEO | Unique slug, prevent self/cycles through repository; deactivate |
| products | name/slug; status; categoryIds refs | bounded media/SEO/tags, brand/descriptions | No inventory/pricing duplication; archive |
| product_variants | productId ref; sku; priceMinor integer; currency; status | attributes, compareAtPriceMinor, weight, dimensions, media | Unique global SKU (productId+SKU lookup redundant); inactive retirement |
| inventory | variantId ref; sku; availableQuantity/reservedQuantity/version integers; status | lowStockThreshold | Unique variant and SKU, one location; sole stock authority |
| inventory_transactions | inventoryId/variantId; sku; type; quantity; referenceType; operationKey; createdAt | referenceId, actorId, reason, bounded metadata | Append-only movement; signed quantity for adjustments, others positive |
| carts | exactly one customerId or sessionId; items array of variantId/positive quantity | expiresAt required for guest, optional customer | Unique active identity; TTL only carts; no prices |
| orders | orderNumber/customerId; status/paymentStatus/fulfillmentStatus; items/pricing/address/customer snapshots; idempotencyKey/requestHash | confirmed/shipped/delivered/cancelled dates | Unique number and customer/key; multiple payment attempts and refunds via child refs; frozen snapshot history |
| payments | orderId/customerId/provider/amountMinor/currency/status; idempotencyKey/requestHash | provider order/payment IDs, failure details, paidAt, metadata | Multiple attempts/order; one successful capture per order enforced with order write; protected payment version serializes refund reservations |
| payment_events | provider/providerEventId/eventType/status/payloadHash/receivedAt | paymentId/orderId/errorMessage/processedAt | Unique provider+event; operational event status can advance; no raw payload |
| coupons | code/codeNormalized/discountType/status/totalUsed | percentageBps OR fixedAmountMinor, currency; minimum/maximum, limits, start/expiry | Avoid ambiguous discountValue money; totalUsed synchronized transactionally; fractional rates use basis points |
| coupon_redemptions | couponId/customerId/orderId/discountMinor/status/createdAt | reversedAt | One coupon redemption/order in v1; history retained |
| shipments | orderId/status | customerId/carrier/tracking/cost/dates/metadata | Multiple records possible without exposing split-fulfillment policy; no auto order shipment transition |
| invoices | orderId/customerId/status/seller/customer snapshots/items/totals/currency | invoiceNumber required on issue, documentUrl, issuedAt | One invoice/order v1, unique number when present; issuance rules UNKNOWN; frozen content |
| refunds | orderId/paymentId/customerId/amountMinor/currency/status/idempotencyKey/requestHash/requestedAt | provider/providerRefundId/reason/requester/completedAt/metadata | One-to-many; pending+completed sum cannot exceed captured amount |
| finance_events | type/amountMinor/currency/direction/status/eventKey/createdAt | order/payment/refund refs; reversesEventId/referenceId/metadata | Append-only postings, reversals are new linked records; operational ledger only |
| notifications | type/channel/status/attempts/dedupeKey | customer/order refs, provider message ID, error, sentAt | Bounded operational rows; no unbounded delivery arrays |
| audit_logs | action/entityType/createdAt | actorId/role/entityId/customerId/requestId/IP/UA; redacted before/after/metadata | Append-only; customerId supports customer activity pagination |

State enums and transition graphs will be centralized. Status enum does not establish permission to execute a commercial transition. This task implements database guards and transaction primitives only; HTTP staff permissions, payment gateway verification, tax/refund approval and retention policy remain separate/UNKNOWN.

## Generated B2C field/index reference — 2026-10-01

Source: B2C/backend/database/models and validators. Regenerate with npm run db:describe -- --write-docs. This section describes the new isolated database, not legacy src/features models. Every collection has ObjectId _id; implicit _id unique indexes are reported separately. Mutable records carry createdAt/updatedAt; event records carry createdAt only, plus domain dates. The __v/version field is an optimistic-write guard, not a business identifier.

Collections: 24; explicit indexes: 99; explicit unique constraints: 31; with implicit _id indexes: 123/55.

### users

Purpose: Authentication identity. Lifecycle: Transactional. Disable; no delete/automatic merge. Phone not unique pending policy.

State guards: {"status":"UserStatus"}. Initial-state restriction: {}. Frozen paths: googleSubject. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| googleSubject | String | optional | none | minLength 1; maxLength 255; excluded by default projection |
| authSessions | embedded[] | optional | [] | excluded by default projection; custom validator; see source/rules; bounded array |
| authSessions[].digest | String | required | none | minLength 1; maxLength 64; pattern ^[a-f0-9]{64}$ |
| authSessions[].expiresAt | Date | required | none | schema casting/strict types |
| email | String | required | none | minLength 1; maxLength 254; pattern ^[^\s@]+@[^\s@]+\.[^\s@]+$ |
| emailNormalized | String | required | none | minLength 1; maxLength 254; pattern ^[^\s@]+@[^\s@]+\.[^\s@]+$; lowercase |
| phone | String | optional | none | minLength 1; maxLength 250 |
| phoneNormalized | String | optional | none | minLength 1; maxLength 16; pattern ^\+[1-9]\d{6,14}$ |
| passwordHash | String | optional | none | minLength 1; maxLength 100; pattern ^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$; excluded by default projection |
| roles | String[] | optional | ["CUSTOMER"] | custom validator; see source/rules; bounded array |
| permissions | String[] | optional | [] | custom validator; see source/rules; bounded array |
| accessVersion | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| adminCommandVersion | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| status | String | required | "ACTIVE" | enum ACTIVE, SUSPENDED, DISABLED |
| emailVerifiedAt | Date | optional | none | schema casting/strict types |
| phoneVerifiedAt | Date | optional | none | schema casting/strict types |
| lastLoginAt | Date | optional | none | schema casting/strict types |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| updatedAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| __v | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| user google identity | {"googleSubject":1} | yes | partial {"googleSubject":{"$type":"string"}} |
| user email identity | {"emailNormalized":1} | yes | non-sparse |
| user phone lookup | {"phoneNormalized":1} | no | non-sparse |
| users admin cursor | {"createdAt":-1,"_id":-1} | no | non-sparse |

### customers

Purpose: Long-lived commerce identity. Lifecycle: Transactional + derived caches. Deactivate/block; no cascade/history deletion. Email/phone searchable, not automatic identity merge keys.

State guards: {"status":"CustomerStatus"}. Initial-state restriction: {}. Frozen paths: append-only if event; see invariant rules. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| userId | ObjectId | optional | none | ref User |
| firstName | String | required | none | minLength 1; maxLength 250 |
| lastName | String | optional | none | minLength 1; maxLength 250 |
| email | String | required | none | minLength 1; maxLength 254; pattern ^[^\s@]+@[^\s@]+\.[^\s@]+$ |
| emailNormalized | String | required | none | minLength 1; maxLength 254; pattern ^[^\s@]+@[^\s@]+\.[^\s@]+$; lowercase |
| phone | String | optional | none | minLength 1; maxLength 250 |
| phoneNormalized | String | optional | none | minLength 1; maxLength 250 |
| status | String | required | "ACTIVE" | enum ACTIVE, INACTIVE, BLOCKED |
| avatarUrl | String | optional | none | minLength 1; maxLength 2048; pattern ^https:\/\/ |
| dateOfBirth | Date | optional | none | schema casting/strict types |
| marketingConsent | Boolean | optional | none | schema casting/strict types |
| lastOrderAt | Date | optional | none | schema casting/strict types |
| totalOrders | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| totalSpentMinor | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| totalsCurrency | String | optional | none | minLength 1; maxLength 3; pattern ^[A-Z]{3}$; uppercase |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| updatedAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| __v | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| customer user identity | {"userId":1} | yes | partial {"userId":{"$type":"objectId"}} |
| customer email lookup | {"emailNormalized":1} | no | non-sparse |
| customer phone lookup | {"phoneNormalized":1} | no | non-sparse |
| customer status history | {"status":1,"createdAt":-1,"_id":-1} | no | non-sparse |
| customers admin cursor | {"createdAt":-1,"_id":-1} | no | non-sparse |

### customer_addresses

Purpose: Customer address book. Lifecycle: Transactional. No deletion repository until privacy policy; updates never affect order copies.

State guards: {}. Initial-state restriction: {}. Frozen paths: append-only if event; see invariant rules. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| customerId | ObjectId | required | none | ref Customer |
| recipientName | String | required | none | minLength 1; maxLength 250 |
| phone | String | optional | none | minLength 1; maxLength 250 |
| addressLine1 | String | required | none | minLength 1; maxLength 250 |
| addressLine2 | String | optional | none | minLength 1; maxLength 250 |
| landmark | String | optional | none | minLength 1; maxLength 250 |
| city | String | required | none | minLength 1; maxLength 250 |
| state | String | required | none | minLength 1; maxLength 250 |
| postalCode | String | required | none | minLength 1; maxLength 20 |
| country | String | required | none | minLength 1; maxLength 2; pattern ^[A-Z]{2}$; uppercase |
| label | String | optional | none | minLength 1; maxLength 250 |
| isDefaultShipping | Boolean | optional | false | schema casting/strict types |
| isDefaultBilling | Boolean | optional | false | schema casting/strict types |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| updatedAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| __v | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| addresses by customer | {"customerId":1,"createdAt":-1,"_id":-1} | no | non-sparse |
| one default shipping | {"customerId":1,"isDefaultShipping":1} | yes | partial {"isDefaultShipping":true} |
| one default billing | {"customerId":1,"isDefaultBilling":1} | yes | partial {"isDefaultBilling":true} |

### categories

Purpose: Catalogue hierarchy. Lifecycle: Transactional. Deactivate; parent fixed at creation to avoid concurrent reparent cycles.

State guards: {"status":"CategoryStatus"}. Initial-state restriction: {}. Frozen paths: parentId. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| name | String | required | none | minLength 1; maxLength 250 |
| slug | String | required | none | minLength 1; maxLength 250; pattern ^[a-z0-9]+(?:-[a-z0-9]+)*$; lowercase |
| description | String | optional | none | minLength 1; maxLength 4000 |
| parentId | ObjectId | optional | none | ref Category |
| imageUrl | String | optional | none | minLength 1; maxLength 2048; pattern ^https:\/\/ |
| status | String | required | "ACTIVE" | enum ACTIVE, INACTIVE |
| sortOrder | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| seo | embedded | optional | none | schema casting/strict types |
| seo.title | String | optional | none | minLength 1; maxLength 160 |
| seo.description | String | optional | none | minLength 1; maxLength 320 |
| seo.keywords | String[] | optional | [] | custom validator; see source/rules; bounded array |
| seo.canonicalUrl | String | optional | none | minLength 1; maxLength 2048; pattern ^https:\/\/ |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| updatedAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| __v | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| category slug | {"slug":1} | yes | non-sparse |
| category children | {"parentId":1} | no | non-sparse |
| category navigation | {"status":1,"sortOrder":1} | no | non-sparse |
| categories admin cursor | {"createdAt":-1,"_id":-1} | no | non-sparse |

### products

Purpose: Product content and category assignment. Lifecycle: Transactional. Archive; no stock or price authority here.

State guards: {"status":"ProductStatus"}. Initial-state restriction: {}. Frozen paths: append-only if event; see invariant rules. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| name | String | required | none | minLength 1; maxLength 250 |
| slug | String | required | none | minLength 1; maxLength 250; lowercase |
| shortDescription | String | optional | none | minLength 1; maxLength 500 |
| description | String | optional | none | minLength 1; maxLength 10000 |
| categoryIds | ObjectId[] | optional | [] | ref Category; custom validator; see source/rules; bounded array |
| brand | String | optional | none | minLength 1; maxLength 250 |
| status | String | required | "DRAFT" | enum DRAFT, ACTIVE, ARCHIVED |
| media | embedded[] | optional | [] | custom validator; see source/rules; bounded array |
| media[].url | String | required | none | minLength 1; maxLength 2048; pattern ^(https:\/\/\|\/) |
| media[].publicId | String | optional | none | minLength 1; maxLength 250 |
| media[].alt | String | optional | none | minLength 1; maxLength 250 |
| media[].type | String | optional | "IMAGE" | enum IMAGE, VIDEO |
| media[].sortOrder | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| seo | embedded | optional | none | schema casting/strict types |
| seo.title | String | optional | none | minLength 1; maxLength 160 |
| seo.description | String | optional | none | minLength 1; maxLength 320 |
| seo.keywords | String[] | optional | [] | custom validator; see source/rules; bounded array |
| seo.canonicalUrl | String | optional | none | minLength 1; maxLength 2048; pattern ^https:\/\/ |
| tags | String[] | optional | [] | custom validator; see source/rules; bounded array |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| updatedAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| __v | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| product slug | {"slug":1} | yes | non-sparse |
| catalogue category status | {"categoryIds":1,"status":1,"createdAt":-1} | no | non-sparse |
| catalogue newest | {"status":1,"createdAt":-1,"_id":-1} | no | non-sparse |
| catalogue text | {"name":"text","shortDescription":"text","tags":"text"} | no | non-sparse |

### product_variants

Purpose: Purchasable SKU and current price. Lifecycle: Transactional. Deactivate; SKU/product link immutable.

State guards: {"status":"VariantStatus"}. Initial-state restriction: {}. Frozen paths: productId, sku. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| productId | ObjectId | required | none | ref Product |
| sku | String | required | none | minLength 1; maxLength 250; uppercase |
| name | String | optional | none | minLength 1; maxLength 250 |
| attributes | Map | optional | {} | custom validator; see source/rules |
| priceMinor | Number | required | none | min 0; max 9007199254740991; custom validator; see source/rules |
| compareAtPriceMinor | Number | optional | none | min 0; max 9007199254740991; custom validator; see source/rules |
| currency | String | required | none | minLength 1; maxLength 3; pattern ^[A-Z]{3}$; uppercase |
| status | String | required | "ACTIVE" | enum ACTIVE, INACTIVE |
| weightGrams | Number | optional | none | min 0; max 9007199254740991; custom validator; see source/rules |
| dimensions | embedded | optional | none | schema casting/strict types |
| dimensions.lengthCm | Number | optional | none | min 0; max 100000 |
| dimensions.widthCm | Number | optional | none | min 0; max 100000 |
| dimensions.heightCm | Number | optional | none | min 0; max 100000 |
| media | embedded[] | optional | [] | custom validator; see source/rules; bounded array |
| media[].url | String | required | none | minLength 1; maxLength 2048; pattern ^(https:\/\/\|\/) |
| media[].publicId | String | optional | none | minLength 1; maxLength 250 |
| media[].alt | String | optional | none | minLength 1; maxLength 250 |
| media[].type | String | optional | "IMAGE" | enum IMAGE, VIDEO |
| media[].sortOrder | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| updatedAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| __v | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| variant global sku | {"sku":1} | yes | non-sparse |
| product variants | {"productId":1,"status":1} | no | non-sparse |
| product variants admin cursor | {"createdAt":-1,"_id":-1} | no | non-sparse |

### inventory

Purpose: Only authoritative SKU stock. Lifecycle: Transactional. Disable; opening stock requires movement. No history deletion.

State guards: {}. Initial-state restriction: {}. Frozen paths: variantId, sku. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| variantId | ObjectId | required | none | ref ProductVariant |
| sku | String | required | none | minLength 1; maxLength 250; uppercase |
| availableQuantity | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| reservedQuantity | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| lowStockThreshold | Number | optional | none | min 0; max 9007199254740991; custom validator; see source/rules |
| status | String | required | "OUT_OF_STOCK" | enum IN_STOCK, LOW_STOCK, OUT_OF_STOCK, DISABLED |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| updatedAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| version | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| one inventory per variant | {"variantId":1} | yes | non-sparse |
| inventory sku | {"sku":1} | yes | non-sparse |
| stock dashboard | {"status":1} | no | non-sparse |
| inventory admin cursor | {"createdAt":-1,"_id":-1} | no | non-sparse |

### inventory_transactions

Purpose: Stock movement ledger. Lifecycle: Historical / Event. Append-only; corrections require compensating movement.

State guards: {}. Initial-state restriction: {}. Frozen paths: append-only if event; see invariant rules. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| inventoryId | ObjectId | required | none | ref Inventory |
| variantId | ObjectId | required | none | ref ProductVariant |
| sku | String | required | none | minLength 1; maxLength 250 |
| type | String | required | none | enum RESTOCK, SALE, RESERVATION, RELEASE, RETURN, ADJUSTMENT |
| quantity | Number | required | none | min -9007199254740991; max 9007199254740991; custom validator; see source/rules |
| referenceType | String | required | none | enum ORDER, RETURN, MANUAL, SYSTEM |
| referenceId | ObjectId | optional | none | schema casting/strict types |
| actorId | ObjectId | optional | none | ref User |
| reason | String | optional | none | minLength 1; maxLength 500 |
| metadata | Mixed | optional | none | custom validator; see source/rules |
| operationKey | String | required | none | minLength 1; maxLength 250 |
| requestHash | String | required | none | minLength 1; maxLength 64; pattern ^[a-f0-9]{64}$ |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| __v | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| stock operation once | {"operationKey":1} | yes | non-sparse |
| variant movements | {"variantId":1,"createdAt":-1} | no | non-sparse |
| inventory movements | {"inventoryId":1,"createdAt":-1} | no | non-sparse |
| reference movements | {"referenceId":1} | no | non-sparse |
| recent movements | {"createdAt":-1} | no | non-sparse |

### carts

Purpose: Temporary selections. Lifecycle: Temporary. TTL on explicit expiresAt only; expiry is asynchronous, callers must check dates.

State guards: {}. Initial-state restriction: {}. Frozen paths: append-only if event; see invariant rules. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| customerId | ObjectId | optional | none | ref Customer |
| sessionId | String | optional | none | minLength 1; maxLength 200 |
| items | embedded[] | optional | [] | custom validator; see source/rules; bounded array |
| items[].variantId | ObjectId | required | none | ref ProductVariant |
| items[].quantity | Number | required | none | min 1; max 9007199254740991; custom validator; see source/rules |
| expiresAt | Date | optional | none | schema casting/strict types |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| updatedAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| __v | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| customer cart | {"customerId":1} | yes | partial {"customerId":{"$type":"objectId"}} |
| guest cart | {"sessionId":1} | yes | partial {"sessionId":{"$type":"string"}} |
| cart expiry | {"expiresAt":1} | no | TTL 0s |

### gift_drafts

Purpose: Browser-owned gift selections, not orders or reserved stock. Lifecycle: Mutable draft. Opaque cookie ownership; no automatic expiry pending retention policy.

State guards: {}. Initial-state restriction: {}. Frozen paths: ownerHash. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| ownerHash | String | required | none | minLength 1; maxLength 64; pattern ^[a-f0-9]{64}$ |
| boxes | embedded[] | optional | [] | custom validator; see source/rules; bounded array |
| boxes[].id | String | required | none | minLength 1; maxLength 100 |
| boxes[].quantity | Number | required | none | min 1; max 99; custom validator; see source/rules |
| items | embedded[] | optional | [] | custom validator; see source/rules; bounded array |
| items[].id | String | required | none | minLength 1; maxLength 100 |
| items[].quantity | Number | required | none | min 1; max 99; custom validator; see source/rules |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| updatedAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| __v | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| one gift draft per browser | {"ownerHash":1} | yes | non-sparse |

### orders

Purpose: Order lifecycle and purchase-time facts. Lifecycle: Transactional / Historical. Never reconstruct snapshots from mutable profiles/products; no deletion API.

State guards: {"status":"OrderStatus","paymentStatus":"OrderPaymentStatus","fulfillmentStatus":"FulfillmentStatus"}. Initial-state restriction: {"status":["CREATED","PAYMENT_PENDING"],"paymentStatus":["PENDING"],"fulfillmentStatus":["UNFULFILLED"]}. Frozen paths: orderNumber, customerId, items, pricing, coupon, shippingAddressSnapshot, billingAddressSnapshot, customerSnapshot, idempotencyKey, requestHash. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| orderNumber | String | required | none | minLength 1; maxLength 250 |
| customerId | ObjectId | required | none | ref Customer |
| status | String | required | "CREATED" | enum CREATED, PAYMENT_PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED, REFUNDED |
| paymentStatus | String | required | "PENDING" | enum PENDING, FAILED, PAID, PARTIALLY_REFUNDED, REFUNDED |
| fulfillmentStatus | String | required | "UNFULFILLED" | enum UNFULFILLED, PROCESSING, SHIPPED, DELIVERED, CANCELLED |
| items | embedded[] | optional | [] | custom validator; see source/rules; bounded array |
| items[].productId | ObjectId | optional | none | ref Product |
| items[].variantId | ObjectId | optional | none | ref ProductVariant |
| items[].sku | String | required | none | minLength 1; maxLength 250 |
| items[].productName | String | required | none | minLength 1; maxLength 250 |
| items[].variantName | String | optional | none | minLength 1; maxLength 250 |
| items[].quantity | Number | required | none | min 1; max 9007199254740991; custom validator; see source/rules |
| items[].unitPriceMinor | Number | required | none | min 0; max 9007199254740991; custom validator; see source/rules |
| items[].discountMinor | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| items[].taxMinor | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| items[].lineTotalMinor | Number | required | none | min 0; max 9007199254740991; custom validator; see source/rules |
| items[].currency | String | required | none | minLength 1; maxLength 3; pattern ^[A-Z]{3}$; uppercase |
| pricing | embedded | required | none | schema casting/strict types |
| pricing.subtotalMinor | Number | required | none | min 0; max 9007199254740991; custom validator; see source/rules |
| pricing.discountMinor | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| pricing.shippingMinor | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| pricing.taxMinor | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| pricing.grandTotalMinor | Number | required | none | min 0; max 9007199254740991; custom validator; see source/rules |
| pricing.currency | String | required | none | minLength 1; maxLength 3; pattern ^[A-Z]{3}$; uppercase |
| coupon | embedded | optional | none | schema casting/strict types |
| coupon.couponId | ObjectId | required | none | ref Coupon |
| coupon.code | String | required | none | minLength 1; maxLength 250 |
| coupon.discountMinor | Number | required | none | min 0; max 9007199254740991; custom validator; see source/rules |
| shippingAddressSnapshot | embedded | required | none | schema casting/strict types |
| shippingAddressSnapshot.recipientName | String | required | none | minLength 1; maxLength 250 |
| shippingAddressSnapshot.phone | String | optional | none | minLength 1; maxLength 250 |
| shippingAddressSnapshot.addressLine1 | String | required | none | minLength 1; maxLength 250 |
| shippingAddressSnapshot.addressLine2 | String | optional | none | minLength 1; maxLength 250 |
| shippingAddressSnapshot.landmark | String | optional | none | minLength 1; maxLength 250 |
| shippingAddressSnapshot.city | String | required | none | minLength 1; maxLength 250 |
| shippingAddressSnapshot.state | String | required | none | minLength 1; maxLength 250 |
| shippingAddressSnapshot.postalCode | String | required | none | minLength 1; maxLength 20 |
| shippingAddressSnapshot.country | String | required | none | minLength 1; maxLength 2; pattern ^[A-Z]{2}$; uppercase |
| billingAddressSnapshot | embedded | required | none | schema casting/strict types |
| billingAddressSnapshot.recipientName | String | required | none | minLength 1; maxLength 250 |
| billingAddressSnapshot.phone | String | optional | none | minLength 1; maxLength 250 |
| billingAddressSnapshot.addressLine1 | String | required | none | minLength 1; maxLength 250 |
| billingAddressSnapshot.addressLine2 | String | optional | none | minLength 1; maxLength 250 |
| billingAddressSnapshot.landmark | String | optional | none | minLength 1; maxLength 250 |
| billingAddressSnapshot.city | String | required | none | minLength 1; maxLength 250 |
| billingAddressSnapshot.state | String | required | none | minLength 1; maxLength 250 |
| billingAddressSnapshot.postalCode | String | required | none | minLength 1; maxLength 20 |
| billingAddressSnapshot.country | String | required | none | minLength 1; maxLength 2; pattern ^[A-Z]{2}$; uppercase |
| customerSnapshot | embedded | required | none | schema casting/strict types |
| customerSnapshot.name | String | required | none | minLength 1; maxLength 250 |
| customerSnapshot.email | String | required | none | minLength 1; maxLength 254; pattern ^[^\s@]+@[^\s@]+\.[^\s@]+$ |
| customerSnapshot.phone | String | optional | none | minLength 1; maxLength 250 |
| idempotencyKey | String | required | none | minLength 1; maxLength 250 |
| requestHash | String | required | none | minLength 1; maxLength 64; pattern ^[a-f0-9]{64}$ |
| confirmedAt | Date | optional | none | schema casting/strict types |
| shippedAt | Date | optional | none | schema casting/strict types |
| deliveredAt | Date | optional | none | schema casting/strict types |
| cancelledAt | Date | optional | none | schema casting/strict types |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| updatedAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| __v | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| order number | {"orderNumber":1} | yes | non-sparse |
| customer order request | {"customerId":1,"idempotencyKey":1} | yes | non-sparse |
| customer order history | {"customerId":1,"createdAt":-1,"_id":-1} | no | non-sparse |
| order status dashboard | {"status":1,"createdAt":-1} | no | non-sparse |
| order paymentStatus dashboard | {"paymentStatus":1,"createdAt":-1} | no | non-sparse |
| order fulfillmentStatus dashboard | {"fulfillmentStatus":1,"createdAt":-1} | no | non-sparse |
| orders by date | {"createdAt":-1} | no | non-sparse |
| orders by currency date | {"pricing.currency":1,"createdAt":-1,"_id":-1} | no | non-sparse |
| order status admin cursor | {"status":1,"createdAt":-1,"_id":-1} | no | non-sparse |
| order paymentStatus admin cursor | {"paymentStatus":1,"createdAt":-1,"_id":-1} | no | non-sparse |
| order fulfillmentStatus admin cursor | {"fulfillmentStatus":1,"createdAt":-1,"_id":-1} | no | non-sparse |

### payments

Purpose: Payment attempt and verified outcome. Lifecycle: Transactional / Historical. Multiple attempts/order; no deletion. Refund totals remain authoritative in refund rows.

State guards: {"status":"PaymentStatus"}. Initial-state restriction: {"status":["CREATED","PENDING"]}. Frozen paths: orderId, customerId, provider, amountMinor, currency, idempotencyKey, requestHash. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| orderId | ObjectId | required | none | ref Order |
| customerId | ObjectId | required | none | ref Customer |
| provider | String | required | none | minLength 1; maxLength 50 |
| providerOrderId | String | optional | none | minLength 1; maxLength 250 |
| providerPaymentId | String | optional | none | minLength 1; maxLength 250 |
| amountMinor | Number | required | none | min 1; max 9007199254740991; custom validator; see source/rules |
| currency | String | required | none | minLength 1; maxLength 3; pattern ^[A-Z]{3}$; uppercase |
| status | String | required | "CREATED" | enum CREATED, PENDING, AUTHORIZED, CAPTURED, FAILED, CANCELLED, PARTIALLY_REFUNDED, REFUNDED |
| idempotencyKey | String | required | none | minLength 1; maxLength 250 |
| requestHash | String | required | none | minLength 1; maxLength 64; pattern ^[a-f0-9]{64}$ |
| failureCode | String | optional | none | minLength 1; maxLength 250 |
| failureMessage | String | optional | none | minLength 1; maxLength 500 |
| paidAt | Date | optional | none | schema casting/strict types |
| metadata | Mixed | optional | none | custom validator; see source/rules |
| refundVersion | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| updatedAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| __v | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| order payment attempts | {"orderId":1,"createdAt":-1} | no | non-sparse |
| customer payments | {"customerId":1,"createdAt":-1,"_id":-1} | no | non-sparse |
| payment creation once | {"orderId":1,"idempotencyKey":1} | yes | non-sparse |
| provider payment once | {"provider":1,"providerPaymentId":1} | yes | partial {"providerPaymentId":{"$type":"string"}} |
| provider order lookup | {"provider":1,"providerOrderId":1} | no | non-sparse |
| payment dashboard | {"status":1,"createdAt":-1} | no | non-sparse |
| captured reporting | {"currency":1,"paidAt":1,"status":1} | no | non-sparse |
| recent payments by currency | {"currency":1,"createdAt":-1,"_id":-1} | no | non-sparse |

### payment_events

Purpose: Provider event dedupe/status. Lifecycle: Event / operational. No TTL, raw payload or automatic discard. Hash binds event content.

State guards: {"status":"PaymentEventStatus"}. Initial-state restriction: {"status":["RECEIVED"]}. Frozen paths: provider, providerEventId, eventType, payloadHash, receivedAt, paymentId, orderId. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| provider | String | required | none | minLength 1; maxLength 50 |
| providerEventId | String | required | none | minLength 1; maxLength 250 |
| eventType | String | required | none | minLength 1; maxLength 250 |
| paymentId | ObjectId | optional | none | ref Payment |
| orderId | ObjectId | optional | none | ref Order |
| status | String | required | "RECEIVED" | enum RECEIVED, PROCESSING, FAILED, PROCESSED |
| payloadHash | String | required | none | minLength 1; maxLength 64; pattern ^[a-f0-9]{64}$ |
| errorMessage | String | optional | none | minLength 1; maxLength 500 |
| receivedAt | Date | required | now | schema casting/strict types |
| processedAt | Date | optional | none | schema casting/strict types |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| __v | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| gateway event once | {"provider":1,"providerEventId":1} | yes | non-sparse |
| event recovery queue | {"status":1,"receivedAt":1} | no | non-sparse |
| payment event history | {"paymentId":1,"receivedAt":-1} | no | non-sparse |

### coupons

Purpose: Offer constraints and synchronized usage counter. Lifecycle: Transactional / Derived counter. Deactivate/expire; no silent discount rule changes to order history.

State guards: {"status":"CouponStatus"}. Initial-state restriction: {}. Frozen paths: append-only if event; see invariant rules. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| code | String | required | none | minLength 1; maxLength 250 |
| codeNormalized | String | required | none | minLength 1; maxLength 250; uppercase |
| discountType | String | required | none | enum PERCENTAGE, FIXED_AMOUNT |
| percentageBps | Number | optional | none | min 1; max 10000; custom validator; see source/rules |
| fixedAmountMinor | Number | optional | none | min 1; max 9007199254740991; custom validator; see source/rules |
| currency | String | optional | none | minLength 1; maxLength 3; pattern ^[A-Z]{3}$; uppercase |
| minimumOrderMinor | Number | optional | none | min 0; max 9007199254740991; custom validator; see source/rules |
| maximumDiscountMinor | Number | optional | none | min 0; max 9007199254740991; custom validator; see source/rules |
| usageLimit | Number | optional | none | min 1; max 9007199254740991; custom validator; see source/rules |
| perCustomerLimit | Number | optional | none | min 1; max 9007199254740991; custom validator; see source/rules |
| totalUsed | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| startsAt | Date | optional | none | schema casting/strict types |
| expiresAt | Date | optional | none | schema casting/strict types |
| status | String | required | "ACTIVE" | enum ACTIVE, INACTIVE, EXPIRED |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| updatedAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| __v | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| coupon code | {"codeNormalized":1} | yes | non-sparse |
| coupon validity | {"status":1,"startsAt":1,"expiresAt":1} | no | non-sparse |
| coupons admin cursor | {"createdAt":-1,"_id":-1} | no | non-sparse |

### coupon_redemptions

Purpose: Coupon application history. Lifecycle: Historical. Reverse status with counter transaction; never delete.

State guards: {"status":"RedemptionStatus"}. Initial-state restriction: {"status":["APPLIED"]}. Frozen paths: couponId, customerId, orderId, discountMinor. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| couponId | ObjectId | required | none | ref Coupon |
| customerId | ObjectId | required | none | ref Customer |
| orderId | ObjectId | required | none | ref Order |
| discountMinor | Number | required | none | min 0; max 9007199254740991; custom validator; see source/rules |
| status | String | required | "APPLIED" | enum APPLIED, REVERSED |
| reversedAt | Date | optional | none | schema casting/strict types |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| __v | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| one coupon per order | {"orderId":1} | yes | non-sparse |
| customer coupon limit | {"couponId":1,"customerId":1,"status":1} | no | non-sparse |
| customer coupon history | {"customerId":1,"createdAt":-1,"_id":-1} | no | non-sparse |

### shipments

Purpose: Shipment/tracking lifecycle. Lifecycle: Transactional / Historical. Preserve history; tracking not unique because carrier/reuse policy unknown.

State guards: {"status":"ShipmentStatus"}. Initial-state restriction: {"status":["PENDING"]}. Frozen paths: orderId, customerId. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| orderId | ObjectId | required | none | ref Order |
| customerId | ObjectId | optional | none | ref Customer |
| carrier | String | optional | none | minLength 1; maxLength 250 |
| trackingNumber | String | optional | none | minLength 1; maxLength 250 |
| status | String | required | "PENDING" | enum PENDING, PROCESSING, SHIPPED, IN_TRANSIT, OUT_FOR_DELIVERY, DELIVERED, FAILED, RETURNED |
| shippingCostMinor | Number | optional | none | min 0; max 9007199254740991; custom validator; see source/rules |
| currency | String | optional | none | minLength 1; maxLength 3; pattern ^[A-Z]{3}$; uppercase |
| estimatedDeliveryAt | Date | optional | none | schema casting/strict types |
| shippedAt | Date | optional | none | schema casting/strict types |
| deliveredAt | Date | optional | none | schema casting/strict types |
| metadata | Mixed | optional | none | custom validator; see source/rules |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| updatedAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| __v | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| order shipments | {"orderId":1} | no | non-sparse |
| shipment tracking | {"carrier":1,"trackingNumber":1} | no | non-sparse |
| shipment dashboard | {"status":1,"createdAt":-1} | no | non-sparse |
| shipments admin cursor | {"createdAt":-1,"_id":-1} | no | non-sparse |

### invoices

Purpose: Immutable invoice content and issuance state. Lifecycle: Historical. One invoice/order v1; issue/void preserves content, corrections policy UNKNOWN.

State guards: {"status":"InvoiceStatus"}. Initial-state restriction: {"status":["DRAFT"]}. Frozen paths: orderId, customerId, sellerSnapshot, customerSnapshot, items, subtotalMinor, discountMinor, shippingMinor, taxMinor, grandTotalMinor, currency. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| invoiceNumber | String | optional | none | minLength 1; maxLength 250 |
| orderId | ObjectId | required | none | ref Order |
| customerId | ObjectId | required | none | ref Customer |
| status | String | required | "DRAFT" | enum DRAFT, ISSUED, VOID |
| sellerSnapshot | embedded | required | none | schema casting/strict types |
| sellerSnapshot.name | String | required | none | minLength 1; maxLength 250 |
| sellerSnapshot.address | String | optional | none | minLength 1; maxLength 1000 |
| sellerSnapshot.email | String | optional | none | minLength 1; maxLength 254; pattern ^[^\s@]+@[^\s@]+\.[^\s@]+$ |
| sellerSnapshot.phone | String | optional | none | minLength 1; maxLength 250 |
| sellerSnapshot.taxId | String | optional | none | minLength 1; maxLength 250 |
| customerSnapshot | embedded | required | none | schema casting/strict types |
| customerSnapshot.name | String | required | none | minLength 1; maxLength 250 |
| customerSnapshot.email | String | optional | none | minLength 1; maxLength 254; pattern ^[^\s@]+@[^\s@]+\.[^\s@]+$ |
| customerSnapshot.phone | String | optional | none | minLength 1; maxLength 250 |
| customerSnapshot.billingAddress | embedded | required | none | schema casting/strict types |
| customerSnapshot.billingAddress.recipientName | String | required | none | minLength 1; maxLength 250 |
| customerSnapshot.billingAddress.phone | String | optional | none | minLength 1; maxLength 250 |
| customerSnapshot.billingAddress.addressLine1 | String | required | none | minLength 1; maxLength 250 |
| customerSnapshot.billingAddress.addressLine2 | String | optional | none | minLength 1; maxLength 250 |
| customerSnapshot.billingAddress.landmark | String | optional | none | minLength 1; maxLength 250 |
| customerSnapshot.billingAddress.city | String | required | none | minLength 1; maxLength 250 |
| customerSnapshot.billingAddress.state | String | required | none | minLength 1; maxLength 250 |
| customerSnapshot.billingAddress.postalCode | String | required | none | minLength 1; maxLength 20 |
| customerSnapshot.billingAddress.country | String | required | none | minLength 1; maxLength 2; pattern ^[A-Z]{2}$; uppercase |
| items | embedded[] | optional | [] | custom validator; see source/rules; bounded array |
| items[].description | String | required | none | minLength 1; maxLength 1000 |
| items[].sku | String | optional | none | minLength 1; maxLength 250 |
| items[].quantity | Number | required | none | min 1; max 9007199254740991; custom validator; see source/rules |
| items[].unitPriceMinor | Number | required | none | min 0; max 9007199254740991; custom validator; see source/rules |
| items[].discountMinor | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| items[].taxMinor | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| items[].totalMinor | Number | required | none | min 0; max 9007199254740991; custom validator; see source/rules |
| subtotalMinor | Number | required | none | min 0; max 9007199254740991; custom validator; see source/rules |
| discountMinor | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| shippingMinor | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| taxMinor | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| grandTotalMinor | Number | required | none | min 0; max 9007199254740991; custom validator; see source/rules |
| currency | String | required | none | minLength 1; maxLength 3; pattern ^[A-Z]{3}$; uppercase |
| documentUrl | String | optional | none | minLength 1; maxLength 2048; pattern ^https:\/\/ |
| issuedAt | Date | optional | none | schema casting/strict types |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| updatedAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| __v | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| invoice number | {"invoiceNumber":1} | yes | partial {"invoiceNumber":{"$type":"string"}} |
| one invoice per order | {"orderId":1} | yes | non-sparse |
| customer invoices | {"customerId":1,"createdAt":-1,"_id":-1} | no | non-sparse |
| invoices admin cursor | {"createdAt":-1,"_id":-1} | no | non-sparse |

### refunds

Purpose: Refund requests/reserved amounts/provider outcomes. Lifecycle: Transactional / Historical. Pending/completed reserve capacity; definite failure/cancellation releases capacity; no deletes.

State guards: {"status":"RefundStatus"}. Initial-state restriction: {"status":["REQUESTED"]}. Frozen paths: orderId, paymentId, customerId, amountMinor, currency, provider, requestedAt, idempotencyKey, requestHash. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| orderId | ObjectId | required | none | ref Order |
| paymentId | ObjectId | required | none | ref Payment |
| customerId | ObjectId | required | none | ref Customer |
| amountMinor | Number | required | none | min 1; max 9007199254740991; custom validator; see source/rules |
| currency | String | required | none | minLength 1; maxLength 3; pattern ^[A-Z]{3}$; uppercase |
| reason | String | optional | none | minLength 1; maxLength 500 |
| provider | String | required | none | minLength 1; maxLength 50 |
| providerRefundId | String | optional | none | minLength 1; maxLength 250 |
| status | String | required | "REQUESTED" | enum REQUESTED, PROCESSING, FAILED, CANCELLED, COMPLETED |
| requestedBy | ObjectId | optional | none | ref User |
| requestedAt | Date | required | now | schema casting/strict types |
| completedAt | Date | optional | none | schema casting/strict types |
| metadata | Mixed | optional | none | custom validator; see source/rules |
| idempotencyKey | String | required | none | minLength 1; maxLength 250 |
| requestHash | String | required | none | minLength 1; maxLength 64; pattern ^[a-f0-9]{64}$ |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| updatedAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| __v | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| refund request once | {"paymentId":1,"idempotencyKey":1} | yes | non-sparse |
| gateway refund once | {"provider":1,"providerRefundId":1} | yes | partial {"providerRefundId":{"$type":"string"}} |
| order refunds | {"orderId":1,"createdAt":-1} | no | non-sparse |
| payment refund history | {"paymentId":1,"createdAt":-1} | no | non-sparse |
| customer refunds | {"customerId":1,"createdAt":-1,"_id":-1} | no | non-sparse |
| refund dashboard | {"status":1,"createdAt":-1} | no | non-sparse |
| refund reporting | {"currency":1,"completedAt":1,"status":1} | no | non-sparse |
| recent refunds by currency | {"currency":1,"createdAt":-1,"_id":-1} | no | non-sparse |

### finance_events

Purpose: Operational money event postings. Lifecycle: Historical / Event. Append-only; reversal is a new opposite-direction linked row. Not formal accounting.

State guards: {}. Initial-state restriction: {}. Frozen paths: append-only if event; see invariant rules. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| type | String | required | none | enum PAYMENT, REFUND, DISCOUNT, SHIPPING, TAX, ADJUSTMENT |
| orderId | ObjectId | optional | none | ref Order |
| paymentId | ObjectId | optional | none | ref Payment |
| refundId | ObjectId | optional | none | ref Refund |
| amountMinor | Number | required | none | min 0; max 9007199254740991; custom validator; see source/rules |
| currency | String | required | none | minLength 1; maxLength 3; pattern ^[A-Z]{3}$; uppercase |
| direction | String | required | none | enum CREDIT, DEBIT |
| status | String | required | "POSTED" | enum POSTED, REVERSED |
| reversesEventId | ObjectId | optional | none | ref FinanceEvent |
| referenceId | String | optional | none | minLength 1; maxLength 250 |
| eventKey | String | required | none | minLength 1; maxLength 250 |
| metadata | Mixed | optional | none | custom validator; see source/rules |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| __v | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| finance effect once | {"eventKey":1} | yes | non-sparse |
| finance reverse once | {"reversesEventId":1} | yes | partial {"reversesEventId":{"$type":"objectId"}} |
| order finance | {"orderId":1,"createdAt":-1} | no | non-sparse |
| finance reporting | {"type":1,"createdAt":-1} | no | non-sparse |

### notifications

Purpose: Notification delivery state. Lifecycle: Operational. No auto retention until policy; dedupe unique. Provider send/retry worker not part of DB task.

State guards: {"status":"NotificationStatus"}. Initial-state restriction: {"status":["PENDING"]}. Frozen paths: append-only if event; see invariant rules. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| customerId | ObjectId | optional | none | ref Customer |
| orderId | ObjectId | optional | none | ref Order |
| type | String | required | none | minLength 1; maxLength 250 |
| channel | String | required | none | enum EMAIL, SMS, WHATSAPP, PUSH |
| status | String | required | "PENDING" | enum PENDING, FAILED, SENT |
| providerMessageId | String | optional | none | minLength 1; maxLength 250 |
| attempts | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| lastError | String | optional | none | minLength 1; maxLength 500 |
| sentAt | Date | optional | none | schema casting/strict types |
| dedupeKey | String | required | none | minLength 1; maxLength 250 |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| updatedAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| __v | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| notification once | {"dedupeKey":1} | yes | non-sparse |
| customer notifications | {"customerId":1,"createdAt":-1,"_id":-1} | no | non-sparse |
| order notifications | {"orderId":1,"createdAt":-1} | no | non-sparse |
| notification retry | {"status":1,"createdAt":1} | no | non-sparse |
| notifications admin cursor | {"createdAt":-1,"_id":-1} | no | non-sparse |

### audit_logs

Purpose: Bounded redacted actor/entity history. Lifecycle: Historical / Event. Append-only, retention/PII anonymization policy UNKNOWN; no secrets.

State guards: {}. Initial-state restriction: {}. Frozen paths: append-only if event; see invariant rules. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| actorId | ObjectId | optional | none | ref User |
| actorRole | String | optional | none | enum CUSTOMER, ADMIN, OWNER, SYSTEM; minLength 1; maxLength 250 |
| action | String | required | none | minLength 1; maxLength 250 |
| entityType | String | required | none | minLength 1; maxLength 250 |
| entityId | ObjectId | optional | none | schema casting/strict types |
| customerId | ObjectId | optional | none | ref Customer |
| previousState | Mixed | optional | none | custom validator; see source/rules |
| newState | Mixed | optional | none | custom validator; see source/rules |
| requestId | String | optional | none | minLength 1; maxLength 250 |
| ipAddress | String | optional | none | minLength 1; maxLength 64 |
| userAgent | String | optional | none | minLength 1; maxLength 500 |
| metadata | Mixed | optional | none | custom validator; see source/rules |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| __v | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| entity audit | {"entityType":1,"entityId":1,"createdAt":-1} | no | non-sparse |
| actor audit | {"actorId":1,"createdAt":-1} | no | non-sparse |
| customer activity | {"customerId":1,"createdAt":-1,"_id":-1} | no | non-sparse |
| recent audit | {"createdAt":-1} | no | non-sparse |
| audit logs admin cursor | {"createdAt":-1,"_id":-1} | no | non-sparse |

### admin_settings

Purpose: Explicit reporting preferences and one-time owner bootstrap guard. Lifecycle: Configuration. Unique operations key; no secrets or payment/tax policy defaults. Revision protects concurrent edits.

State guards: {}. Initial-state restriction: {}. Frozen paths: append-only if event; see invariant rules. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| key | String | required | "operations" | enum operations; minLength 1; maxLength 50 |
| timezone | String | optional | none | minLength 1; maxLength 80 |
| currency | String | optional | none | minLength 1; maxLength 3; pattern ^[A-Z]{3}$; uppercase |
| revision | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| bootstrapOwnerId | ObjectId | optional | none | ref User |
| bootstrapCompletedAt | Date | optional | none | schema casting/strict types |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| updatedAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| __v | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| one operations setting | {"key":1} | yes | non-sparse |

### admin_commands

Purpose: Actor-scoped idempotent administrative operation receipts. Lifecycle: Historical / Event. Append-only compact resource references and payload hashes; unique actor/key. No request bodies, credentials or customer payloads stored.

State guards: {}. Initial-state restriction: {}. Frozen paths: append-only if event; see invariant rules. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| actorId | ObjectId | required | none | ref User |
| key | String | required | none | minLength 1; maxLength 100 |
| action | String | required | none | minLength 1; maxLength 100 |
| requestHash | String | required | none | minLength 1; maxLength 64; pattern ^[a-f0-9]{64}$ |
| resource | String | required | none | minLength 1; maxLength 80 |
| resourceId | ObjectId | required | none | schema casting/strict types |
| resourceVersion | Number | required | none | min 0; max 9007199254740991; custom validator; see source/rules |
| requestId | String | optional | none | minLength 1; maxLength 100 |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| __v | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| admin command once | {"actorId":1,"key":1} | yes | non-sparse |
| admin command history | {"actorId":1,"createdAt":-1,"_id":-1} | no | non-sparse |

### admin_rate_limits

Purpose: Shared operations request buckets. Lifecycle: Temporary. Hashed identities and short-lived counts; TTL cleanup. Counter updates are transactionally serialized and fail closed.

State guards: {}. Initial-state restriction: {}. Frozen paths: append-only if event; see invariant rules. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.

| Field | Type | Required | Default | Constraint/reference |
| --- | --- | --- | --- | --- |
| key | String | required | none | minLength 1; maxLength 64; pattern ^[a-f0-9]{64}$ |
| count | Number | required | 0 | min 0; max 9007199254740991; custom validator; see source/rules |
| expiresAt | Date | required | none | schema casting/strict types |
| _id | ObjectId | required | none | schema casting/strict types |
| createdAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| updatedAt | Date | optional | Mongoose timestamp | schema casting/strict types |
| __v | Number | optional | 0; optimistic version | schema casting/strict types |

| Index / query purpose | Keys | Unique | Sparse / partial / TTL |
| --- | --- | --- | --- |
| admin rate bucket | {"key":1} | yes | non-sparse |
| admin rate expiry | {"expiresAt":1} | no | TTL 0s |

### Central state transition graphs

Same-state saves are allowed. Transitions not listed are rejected on document save. Graphs constrain persistence, not business permission; repositories implement only selected flows. Inventory status is derived from quantity/explicit threshold unless DISABLED. Finance postings are immutable; REVERSED is a new row referencing the original.

| Graph | Current | Allowed next |
| --- | --- | --- |
| UserStatus | ACTIVE | SUSPENDED, DISABLED |
| UserStatus | SUSPENDED | ACTIVE, DISABLED |
| UserStatus | DISABLED | terminal |
| CustomerStatus | ACTIVE | INACTIVE, BLOCKED |
| CustomerStatus | INACTIVE | ACTIVE, BLOCKED |
| CustomerStatus | BLOCKED | ACTIVE, INACTIVE |
| CategoryStatus | ACTIVE | INACTIVE |
| CategoryStatus | INACTIVE | ACTIVE |
| ProductStatus | DRAFT | ACTIVE, ARCHIVED |
| ProductStatus | ACTIVE | DRAFT, ARCHIVED |
| ProductStatus | ARCHIVED | terminal |
| VariantStatus | ACTIVE | INACTIVE |
| VariantStatus | INACTIVE | ACTIVE |
| OrderStatus | CREATED | PAYMENT_PENDING, CANCELLED |
| OrderStatus | PAYMENT_PENDING | CONFIRMED, CANCELLED |
| OrderStatus | CONFIRMED | PROCESSING, CANCELLED, REFUNDED |
| OrderStatus | PROCESSING | SHIPPED, CANCELLED, REFUNDED |
| OrderStatus | SHIPPED | DELIVERED |
| OrderStatus | DELIVERED | REFUNDED |
| OrderStatus | CANCELLED | terminal |
| OrderStatus | REFUNDED | terminal |
| OrderPaymentStatus | PENDING | PAID, FAILED |
| OrderPaymentStatus | FAILED | PENDING, PAID |
| OrderPaymentStatus | PAID | PARTIALLY_REFUNDED, REFUNDED |
| OrderPaymentStatus | PARTIALLY_REFUNDED | REFUNDED |
| OrderPaymentStatus | REFUNDED | terminal |
| FulfillmentStatus | UNFULFILLED | PROCESSING, CANCELLED |
| FulfillmentStatus | PROCESSING | SHIPPED, CANCELLED |
| FulfillmentStatus | SHIPPED | DELIVERED |
| FulfillmentStatus | DELIVERED | terminal |
| FulfillmentStatus | CANCELLED | terminal |
| PaymentStatus | CREATED | PENDING, AUTHORIZED, CAPTURED, FAILED, CANCELLED |
| PaymentStatus | PENDING | AUTHORIZED, CAPTURED, FAILED, CANCELLED |
| PaymentStatus | AUTHORIZED | CAPTURED, FAILED, CANCELLED |
| PaymentStatus | CAPTURED | PARTIALLY_REFUNDED, REFUNDED |
| PaymentStatus | FAILED | terminal |
| PaymentStatus | CANCELLED | terminal |
| PaymentStatus | PARTIALLY_REFUNDED | REFUNDED |
| PaymentStatus | REFUNDED | terminal |
| PaymentEventStatus | RECEIVED | PROCESSING, PROCESSED, FAILED |
| PaymentEventStatus | PROCESSING | PROCESSED, FAILED |
| PaymentEventStatus | FAILED | PROCESSING, PROCESSED |
| PaymentEventStatus | PROCESSED | terminal |
| InventoryStatus | IN_STOCK | LOW_STOCK, OUT_OF_STOCK, DISABLED |
| InventoryStatus | LOW_STOCK | IN_STOCK, OUT_OF_STOCK, DISABLED |
| InventoryStatus | OUT_OF_STOCK | IN_STOCK, LOW_STOCK, DISABLED |
| InventoryStatus | DISABLED | IN_STOCK, LOW_STOCK, OUT_OF_STOCK |
| CouponStatus | ACTIVE | INACTIVE, EXPIRED |
| CouponStatus | INACTIVE | ACTIVE, EXPIRED |
| CouponStatus | EXPIRED | terminal |
| RedemptionStatus | APPLIED | REVERSED |
| RedemptionStatus | REVERSED | terminal |
| ShipmentStatus | PENDING | PROCESSING, FAILED |
| ShipmentStatus | PROCESSING | SHIPPED, FAILED |
| ShipmentStatus | SHIPPED | IN_TRANSIT, FAILED, RETURNED |
| ShipmentStatus | IN_TRANSIT | OUT_FOR_DELIVERY, FAILED, RETURNED |
| ShipmentStatus | OUT_FOR_DELIVERY | DELIVERED, FAILED, RETURNED |
| ShipmentStatus | DELIVERED | RETURNED |
| ShipmentStatus | FAILED | PROCESSING, RETURNED |
| ShipmentStatus | RETURNED | terminal |
| InvoiceStatus | DRAFT | ISSUED, VOID |
| InvoiceStatus | ISSUED | VOID |
| InvoiceStatus | VOID | terminal |
| RefundStatus | REQUESTED | PROCESSING, CANCELLED |
| RefundStatus | PROCESSING | COMPLETED, FAILED |
| RefundStatus | FAILED | terminal |
| RefundStatus | CANCELLED | terminal |
| RefundStatus | COMPLETED | terminal |
| NotificationStatus | PENDING | SENT, FAILED |
| NotificationStatus | FAILED | PENDING |
| NotificationStatus | SENT | terminal |
