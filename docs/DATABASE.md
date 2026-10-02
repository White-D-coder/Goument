# Database

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Persistence systems

MongoDB is the primary ecommerce store, using Mongoose. Models infer default pluralized collections: users, products, categories, orders, coupons, reviews (actual deployed collection/index state UNKNOWN). `user/user.model.js` reexports auth's User model; it is not a second collection.

Mongo transaction checkout requires a transaction-capable deployment (replica set/sharded deployment); tests use MongoMemoryReplSet. There is no migration/deployed-index verification record.

Redis stores guest carts24h and user carts7days, refreshed on save. Cart data is temporary, not lifetime order history. Idempotency entries processing120s/completed24h. BullMQ queues implement delayed stock release. Browser localStorage and IndexedDB are separate caches.

Inquiry/telemetry vault uses encrypted `data/analytics_vault.enc` locally or `/tmp/gourmet_vault/analytics_vault.enc` in detected serverless environments. A temporary filesystem is not established durable multi-instance storage. Key rotation, backup/restore, retention, deletion and migration policies are UNKNOWN.

## Relationships and lifecycle

User→embedded addresses/token hashes; Order→User and embedded price/address snapshots with Product references; Product→Category and embedded variants/boxing/images; Category→parent Category; Review→User/Product; Coupon→Product/Category restrictions. Product deletion currently sets isActive=false.

No dedicated Payment, Invoice, Refund, Customer360, inventory ledger or finance ledger model found. Missing models must not be fabricated in docs.

Full schema fields/indexes: [DATA_MODELS.md](DATA_MODELS.md). Before model changes inspect all consumers and update models, database docs, APIs, business rules and meaningful tests together. Never replace user identity or historical snapshots silently.

Sources: backend/src/features/*/*.model.js; backend/src/features/cart/cart.service.js; backend/src/shared/middleware/idempotency.middleware.js; frontend_appview/src/lib/security/vault.ts.

## Store lifecycle and index evidence

CURRENT / IMPLEMENTED declarations: User email unique/indexed; Product slug/SKU unique (SKU sparse), variant SKU unique/sparse, active/category/boxing indexes and text index; Category slug unique; Order status/paymentIntentId indexes and unique idempotencyKey; Coupon code unique plus code/isActive index; Review product/approved indexes plus product-approved-createdAt and unique user/product. Fields/types/options remain in DATA_MODELS. No runtime `listIndexes` or data migration audit performed. No explicit Order.user index declared.

User/order/coupon/review hard-delete or cascade API was not found. Address deletion only removes an embedded User address. Product DELETE soft-deactivates. Admin generic Product updates can change stock/SKU/prices; no inventory audit/version record is written. Category updates can deactivate/reparent; references are not checked as foreign keys. Current lifecycle is distinct from UNKNOWN retention/deletion policy.

## Encrypted file vault — complete read/write lifecycle

CURRENT / IMPLEMENTED source: `frontend_appview/src/lib/security/vault.ts`.

1. Derive32-byte key using scryptSync from ENCRYPTION_SECRET (source fallback exists; value omitted) and a source constant salt.
2. Select cwd/data/analytics_vault.enc locally; if VERCEL/AWS_LAMBDA_FUNCTION_NAME exists, select /tmp/gourmet_vault/analytics_vault.enc and attempt to seed from bundled file.
3. Missing file creates initial empty VaultData; read decrypts AES-256-GCM using stored IV/auth tag then JSON parses and normalizes top-level fields.
4. Encryption creates a fresh12-byte IV; file format is hex `iv:authTag:ciphertext`. This is authenticated encryption, not evidence of durable access controls.
5. Write serializes whole vault, updates lastUpdated, writes temporary filename with Date.now then renameSync replaces vault. No interprocess lock/CAS/journal/backup is implemented.
6. Inquiry prepend generates independent string ID and keeps newest2000. Sessions keep most recent5000 sorted by lastSeen. These are implemented count caps, not an approved time-based retention policy. Section engagement map has no explicit pruning cap.

## Failure and reconstruction limits

Empty/corrupt/wrong-key/read failure inside read try/catch returns a new empty state and logs an error. It does not recover historical data. A subsequent successful write can replace the existing file with that empty-derived state. Filesystem failures before the read try or during write can propagate. Same-millisecond temp names and concurrent read-modify-write can collide/lose updates; atomic rename alone does not serialize writers. Different instances have independent temporary disks; encryption does not synchronize them.

Backup frequency/location, restore tests, durable host volume, encryption-key escrow/rotation and access permissions are UNKNOWN. Never test recovery against real vault data in a documentation task. Recommended future recovery design must preserve encrypted originals and keys before experimentation; no automatic destructive reset is authorized here.

Session records use provided sessionId or sanitized-IP anonymous fallback; pagesVisited is a unique-path list, not an event-level history. Section totals accumulate pageview/heartbeat contributions. Therefore session/dashboard counts do not establish lifetime customer/order facts. See CUSTOMER_SYSTEM and FINANCE_SYSTEM.

## B2C greenfield database design — 2026-09-28 (implementation specification)

Primary DAL: Mongoose, reusing the installed v8 dependency and replica-set test tooling. Prisma/MongoDB would introduce generated-client migration and transaction semantics without compatibility benefit; the native driver would require independently rebuilding casting/validation/state guards. Neither is introduced as a second DAL. Native collection commands through the same Mongoose connection are limited to index/validator administration and explicit bypass tests.

Implement under B2C/backend/database. This is a new 20-collection schema, not a migration of src/features models. Use an explicit separate database connection named gourmet_b2c_schema_*; legacy HTTP controllers retain their existing connection/contracts until a separately tested adapter/migration is built. Do not run new validators on old collections. No frontend work, provider calls or live migration in this task.

All identities are ObjectId. Money is bounded nonnegative safe-integer minor units with explicit ISO-style currency codes; no inferred GST/shipping rates. Arrays/media/snapshots are bounded. References are checked by the DAL, not Mongo foreign keys. Histories are referenced/paginated; prices, SKU/name, addresses and customer identity on orders/invoices are frozen snapshots. Mutable records use optimistic versions and timestamps; events use creation/event times only. Direct DAL query updates are blocked for guarded models; transaction repositories load, validate and save documents. Database structural validators protect critical numeric/state constraints, but database credentials must still prevent bypasses of application transition/history rules.

Atomic boundaries: stock change + movement; captured event + payment + order + finance + audit; coupon counter + redemption; refund reservation/finalization + payment lock + refund/event/audit; customer/default address changes; order creation/snapshots. Gateway calls are outside DB transactions and not implemented here. Idempotency keys are unique and payload-bound; refunds reserve pending amounts before any future provider call. Payment event dedupe and DB business effects commit together; no arbitrary callbacks with external effects.

Seed only explicitly named development databases with fake .example identities, hashed operator-supplied passwords and fixed demo IDs; no real data or financial policy implied. Production indexes require an explicit install command; do not drop existing indexes. Validate last-stock, duplicate-webhook, refund and coupon races on a real temporary replica set.

## B2C database implementation — 2026-09-28

CURRENT / IMPLEMENTED at the database-module boundary: 20 collections, 79 explicitly declared indexes (99 including _id), 26 explicit unique constraints (46 including _id). Full field/default/validation/reference/index tables and lifecycle graphs are generated into DATA_MODELS.md from the actual Mongoose schemas. `npm --prefix B2C/backend run db:describe -- --write-docs` regenerates that section.

Relationships: User 0..1 Customer (unique optional userId); Customer 1..many addresses/orders/payments/refunds/invoices/redemptions; Category 0..1 parent and many children; Product many categories and many variants; Variant exactly one inventory record when provisioned; Order many payment attempts/shipments/refunds and at most one invoice/coupon redemption in v1; Payment many events/refunds. Historical collections do not embed growing histories in customers/orders. References are ObjectId, not email/phone. Email normalization identifies users; customer matching/merging remains UNKNOWN. Category parent is immutable after creation to avoid concurrent reparent cycles.

Partial unique indexes use a BSON-type predicate for optional identities, not sparse indexes: absent optional values do not collide. Explicit null should not be used as an identity. Default-address partial unique indexes enforce at most one shipping/billing default per customer. The only TTL index is carts.expiresAt with expireAfterSeconds=0; actual TTL deletion is asynchronous and callers must reject expired carts themselves. No financial/history collection has TTL.

Money authority: variant current price; order purchase-time quote; payment attempt amount exactly matches order grand total; refunds sum against the captured attempt. Quantities and money use bounded safe integers. Order/invoice totals are checked against lines; all currencies must agree. Invoice and order content is frozen; issued invoice number/date/document reference is frozen. Inventory opening balance is zero, with initial stock recorded through a ledger movement. Product documents carry neither price nor stock authority. No automatic tax, shipping, invoice numbering or gateway selection policy is invented.

Supported mutations are repositories/transactions. Model save guards reject invalid graph transitions, historical changes, broken references and invalid totals; query updates, bulk writes and deletes are blocked. Direct model saves are internal building blocks, not authorized HTTP entry points: they do not automatically perform every multi-record business effect. Native collection/admin access can bypass application guards; generated Mongo validators enforce structural/numeric constraints, not foreign keys, historical diffs, RBAC or all cross-field rules. Restrict deployment credentials accordingly.

Installation is explicit: provide B2C_DATABASE_URI and B2C_DATABASE_NAME (prefix gourmet_b2c_schema_) to db:install on a replica set. Installer creates/updates owned validators and creates indexes; it refuses nonempty unrecognized collections and never drops indexes. This turn installed only temporary test databases. Existing B2C/backend/src/features model consumers have NOT been migrated. No migration/backfill or production initialization occurred.

Atomic transaction boundaries (snapshot read concern, majority writes):

- Registration: user + customer. Default address replacement: customer serialization write + prior flags + address.
- Order creation: bounded immutable snapshots + request identity. Reservation and coupon redemption are separate explicit operations, not a completed checkout saga.
- Stock: authoritative quantity + movement + audit, with optimistic version and unique operation key.
- Capture: provider event + all reserved stock sales + payment + order + finance posting + audit, committed together.
- Coupon: counter + redemption + audit; reversal restores counter and preserves history.
- Refund request: shared payment serialization write + reservation row + audit; finalization: refund + payment/order payment state + finance posting + audit.
- Invoice issuance: staff validation + invoice status/identity + audit.

Unknown provider outcomes must remain PROCESSING; only definite failed/cancelled refunds free capacity. Failed capture processing rolls back its event row as well as effects; durable ingress/retry and provider reconciliation remain required. External calls must never occur inside retried Mongo transaction callbacks.

## 2026-09-29 — Google auth and Atlas integration

New auth fields on users: googleSubject optional string<=255, hidden by default, frozen, partial unique index user_google_identity; authSessions embedded array max10 of required SHA256 digest and expiresAt, excluded by default projection. No raw session/Google tokens stored. Collection count stays20; explicit indexes now80 and explicit unique constraints27 (100/47 including _id). Atlas ping and guarded schema installation succeeded for the configured isolated database. No test customer was created in Atlas; persistence tests use disposable local replica sets. Email/Google auth now has an HTTP adapter; legacy product/cart/payment APIs remain separate.

## Box-first gifting — 2026-09-30

CURRENT / IMPLEMENTED: Added isolated gift_drafts collection (GiftDraft);21 collections,81 explicit indexes,28 explicit unique constraints (102/49 including _id). Unique ownerHash is SHA256 of a server-issued256-bit HttpOnly session-cookie token. Guarded document saves + optimistic versioning prevent silent concurrent overwrite. Fields: ownerHash, bounded boxes[{id,quantity}], items[{id,quantity}], timestamps,__v. IDs reference the curated draft catalogue, not ProductVariant/inventory. No prices, customer identity, reservation or order stored; retention/expiry and account merge remain UNKNOWN. Startup guarded install loads the new owned collection; generated DATA_MODELS reference refreshed.

## Razorpay — 2026-09-30

No collection or field change for Razorpay. Existing Payment.provider='razorpay', idempotencyKey='razorpay-checkout-v1', providerOrderId, providerPaymentId and metadata.initialization STARTED/READY are used. PaymentEvent uses canonical captured:<provider-payment-id> identity shared across callback/webhook. Existing transactional stock/order/payment/finance capture reused. Failed/unmatched webhook persistence still pending.

## 2026-10-01 — Administrative authorization and operation receipts

CURRENT / IMPLEMENTED: isolated B2C schema now contains24 collections,99 explicit indexes and31 explicit unique constraints (123 indexes/55 unique constraints including `_id`). Counts were derived from `buildModels()`, not inferred from deployment. User adds bounded, enumerated `permissions` (default empty), `accessVersion` (staff access revision) and `adminCommandVersion` (authorization serialization write). Role names remain CUSTOMER/ADMIN/OWNER. Customer records and historical commerce snapshots are unchanged.

New collections:

- `admin_commands`: append-only actor/key unique receipts with action and request fingerprint, compact resource ID/version and request ID. No raw request payload, PII or credentials. Receipts commit in the same transaction as the protected effect and audit.
- `admin_settings`: unique `operations` singleton. Optional reporting timezone/currency stay unset until explicitly configured. Separate revision detects stale settings writes. Bootstrap owner reference/time provides a shared transaction claim for operator-only first-owner provisioning; it is not exposed in reporting DTOs.
- `admin_rate_limits`: unique hashed fixed-window bucket, count and expiresAt TTL. No plaintext IP, account email or credentials. These short-lived operational counters fail closed when unavailable.

Added createdAt/_id cursor indexes on User, Category, Customer, ProductVariant, Inventory, Coupon, Shipment, Invoice, Notification and AuditLog; added status/paymentStatus/fulfillmentStatus plus createdAt/_id indexes on Order. Existing indexes are retained; installer does not drop indexes. Schema metadata/reference generation remains in DATA_MODELS.

Transaction boundary: reauthenticate actor and lock the User document → validate current resource/version → guarded mutation → compact command receipt → audit. Staff changes additionally revoke sessions and append before/after access state. Order mutation audit customer association is read from the stored Order. Inventory reuses the existing atomic stock/movement/audit transaction helper. No payment-provider operation occurs inside a retried admin transaction. Session expiry, role revocation, duplicate commands and conflicting versions cannot be bypassed by replaying a receipt.

Schema installation and provisioning were exercised only with temporary local Mongo replica sets. No configured Atlas installation, live user promotion or migration/backfill was performed. Existing documents must be assessed during deployment of the updated owned schema; successful local tests are not evidence that production indexes/validators are installed.
