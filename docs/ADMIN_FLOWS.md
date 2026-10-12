## 2026-10-12 — New bookmarks and responsive Home polish (R225–R227)

CURRENT / IMPLEMENTED locally: explicit guarded provisioning created two new bookmark Product/ProductVariant/Inventory records (100 opening units each, ₹349 inclusive). Existing admin resources read those records; draft additions are still not paid orders. No hosted admin provisioning/deployment verified; existing mappings/history untouched.

## 2026-10-12 — Inclusive checkout, envelope packs and spacing (R222–R224)

CURRENT / IMPLEMENTED locally: explicit catalogue provisioning populates existing Products/Variants/Inventory admin resources (18mapped products/27 SKU pools100 opening units), not guest drafts as paid orders. Order detail exposes chosen pack, gross unit amount, PRINT name and immutable checkout/address/customer/pricing snapshots. Orders appear only after a reserved checkout; payment/stock/finance status updates only on verified capture. Payment detail exposes safe reconciliationRequired reason for late capture; staff tooling/refund automation not added. Existing permission/ownership/history boundaries remain. No hosted admin data provision/deployment verified.

## 2026-10-12 — Storefront/admin integration check (R221)

CURRENT / PARTIAL, source-verified: user's question whether recent storefront work automatically appears in admin has answer no. Current admin resources list database Product/ProductVariant/Inventory/Order records; GiftDraft is not an admin resource, and serializers/order detail do not expose print-name metadata. New photographed storefront selections come from local preview data/gifting/items.json; display figures come from frontend product-pricing.ts, not automatically created admin variants. Required Lotus name is persisted in cookie-owned GiftDraft and reviewed in storefront, not displayed to staff. Gift order endpoint remains409/no created order, so adding a cart line does not create an admin Orders entry. No authenticated admin runtime inspection or customer data read in this check. Existing source protections/commerce gates retained; no data sync or activation inferred.

FUTURE / REQUIRED: connect approved catalogue/variant pricing and eventual validated order/printing snapshots to the existing admin flow before claiming end-to-end staff operations. This check is not authorization to seed/publish products, grant staff permissions, expose guest drafts or activate payment/order creation. Sources: backend/admin/resources.js/reads.js, frontend admin ResourceDetail, gifting/routes.js, product-pricing.ts; TODO tracks gap alongside existing authoritative commerce priority.

## 2026-10-12 — Approved local first-owner grant completed (R159)

CURRENT / IMPLEMENTED locally: after explicit user confirmation, the previously selected active Google account was promoted using existing `bootstrapOwner`. Local-only guard verifies loopback Mongo and dev/test database naming before access. The transaction adds OWNER, completes the singleton operations bootstrap, revokes prior sessions and records exactly one OWNER_BOOTSTRAPPED audit. Existing Google identity and Customer record/user ownership remain identical. No password was set/reset and the unsafe bulk setup script was not executed. Browser opened the genuine Google flow with allowlisted `/admin` return; a new nonexpired session was subsequently observed for that selected OWNER. Supersedes the preceding preparation/pending-approval status. Authenticated admin UI/API contents were not directly inspected. Evidence: TESTING.

## 2026-10-12 — Requested local admin sign-in (R159, pending owner authorization)

CURRENT / PARTIAL: opened local `/admin` in the user's browser. Both Google and password methods exist in the shared Account UI, but the user-selected existing active account currently has CUSTOMER role, Google identity and no password method. Read-only checks find zero OWNER/ADMIN users and no completed bootstrap in the isolated local development database. Login alone cannot provide administrative access. Prepared the existing first-owner bootstrap path for that explicitly selected account and requested confirmation for full local OWNER access; no role/account/password/session changes have been made. Source service refuses automatic Google-to-password linking by email. Evidence: TESTING. No customer identities or credential values recorded here.

# Admin Flows

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Two independent systems

1. Express admin: JWT/Bearer or cookie → DB role=admin → stats/orders reads and catalogue/category/coupon/upload/review mutation routes. No complete owner dashboard→Customer360→finance/invoice/refund workflow found.
2. Next telemetry admin: POST /api/admin/auth with login action/PIN → HMAC cookie → GET /api/admin/data or /api/admin/export → Excel download; logout clears cookie. `/studio-admin` page exists but whitelist disables it. APIs still apply their own cookie checks.

Express GET /admin/stats aggregates confirmed/processing/shipped/delivered orders, order totals and top5 products; it is not settled cash/reconciliation accounting. GET /admin/orders supports status/page/limit and populates user name/email.

Portal data groups inquiries, sessions and section engagement from encrypted vault; it does not share Mongo user identity. PIN session7days; five failed attempts trigger15min lock using in-process map. No individual staff role hierarchy/audit trail established.

Socket `join_admins` currently joins without authentication despite its comment. Public registration now forces customer (S01 corrected locally 2026-09-27); socket authorization S02 remains open in SECURITY; admin safety must not be inferred from page hiding.

Sources: backend/src/features/admin, shared/utils/socket.js; frontend_appview/src/app/api/admin; src/lib/security/adminAuth.ts.

## Role and permission matrix

| Role / identity | Current permissions | Status / boundaries |
| --- | --- | --- |
| customer (Mongo role) | Own profile/addresses/orders; authenticated review creation; user cart | CURRENT / IMPLEMENTED role; account UI gated/mock, not identity authority |
| admin (Mongo role) | Product CRUD/images, category create/update, coupon create/list, review approve, upload signing, admin stats/orders and any order detail | CURRENT / IMPLEMENTED role gates, compromised by public role assignment finding |
| Next PIN-session holder | Analytics data and XLSX export via own cookie auth | Separate shared identity; no mapping to Mongo admin/staff user |
| Owner | No distinct enum/permission map | UNKNOWN whether separate from admin |
| Operations | No distinct role/permission map | UNKNOWN; no operations-only authorization |
| Viewer | No read-only staff role/permission map | UNKNOWN; cannot infer from GET endpoints |

## Owner-domain coverage

| Domain | Implemented surface | Missing boundary |
| --- | --- | --- |
| Dashboard | Express stats API; gated telemetry page/data/export | Not a unified owner dashboard |
| Orders | Admin list/filter/read | No fulfillment/cancel mutation endpoint |
| Payments | Order paymentIntentId visible through order records | No payment ledger, reconcile, capture/refund admin commands |
| Customers | User populated in order data | No customer directory/Customer360 admin CRUD |
| Inventory/products | Admin Product PUT and catalogue endpoints | No stock-adjustment audit/reason/low-stock operations |
| Invoices/refunds/finance | Operational order statistics only | Full systems NOT IMPLEMENTED |
| Audit logs | Console/Winston logging | No durable staff-action ledger or before/after records |
| Settings | Env/config files | No approved settings UI/permissions |

No owner→admin→operations hierarchy is implemented. Mongo role checks and PIN cookies protect different data stores; changing one does not secure the other. Never create staff permissions from this table as assumed requirements. Exact boundaries U10 remain UNKNOWN.

## 2026-10-01 — B2C owner operations portal

CURRENT / IMPLEMENTED: the new `/admin` portal uses `B2C/backend/admin` and the explicit B2C MongoDB connection. The earlier sections describe the original Express/Next telemetry systems and are historical evidence, not the authorization or data contract of this portal. Neither legacy JWT administration nor the shared telemetry PIN is reused.

Entry flow: `/admin` → existing `/account?next=/admin` login if unauthenticated → existing HttpOnly `b2c_session` → `/api/v1/auth/admin/session` → persisted active User/session → centralized role/permission checks. Staff can authenticate without a fabricated Customer record. Customer identities cannot enter administrative APIs. Frontend role/navigation state is presentation only; every API checks its own permission. Existing Google/password authentication and logout remain the authority.

OWNER receives the explicit permission catalog. ADMIN receives only stored grants; it starts with no implicit grants. Settings and staff administration are owner-only even if an ADMIN has crafted grant data. Public signup/Google account creation cannot assign privileged roles or permissions. First-owner provisioning is a separate operator CLI for an explicitly selected existing User ID; it is not a public route, automatic first-signup rule or development seed. No real owner identity was selected/provisioned in this implementation increment.

| Module | CURRENT implementation | Permission / remaining boundary |
| --- | --- | --- |
| Dashboard / Analytics | Real MongoDB counts, captures/refunds and bounded product quantities with explicit reporting window, currency, timezone and formula descriptions | `dashboard.read` / `analytics.read` grants aggregate operational metrics across domains; it does not grant underlying customer/payment records. Revenue recognition and settlement remain UNKNOWN. |
| Attention Center | Current failed payments, stock exceptions, pending refunds, failed shipments/notifications; up to5 entries per exception type with resource links | Each alert requires its domain read permission. No invented aging thresholds, job failures or integration-health readings. |
| Orders | Cursor list, date/status/payment/fulfillment/customer-ID/amount filters, immutable snapshots and permission-filtered related records | `orders.read`; `orders.update` can only begin processing a persisted paid, confirmed, unfulfilled order. No arbitrary status, cancellation or mark-paid command. |
| Customer360 | One detail response with customer profile, addresses and independently paginated related orders/payments/refunds/invoices/shipments/notifications/coupon usage/audit history | `customers.read` plus each related domain permission; omitted sections cannot be fetched through their related endpoints without that permission. No account merging or internal-note workflow. |
| Products / Categories / Variants | Validated category/product creation, product editing/archiving, variant creation/editing; price and inventory have distinct authorities | `products.create` / `products.update`; new variant and zero-balance inventory are created together. SKU and variant product identity stay immutable. No hard delete. |
| Inventory | Current stock, movement history and signed quantity adjustment with required reason, expected version and durable ledger/audit | `inventory.read` / `inventory.adjust`; stock is never directly assigned from the browser. |
| Payments / Refunds / Invoices | Protected lists, historical detail and linked records; payment detail can calculate completed/reserved/remaining refund amounts | Separate read permissions. Invoice document URLs are excluded. Provider refund execution, approval and invoice issuance/download are unavailable. |
| Coupons | Create/edit amount/rate, dates, status and limits using existing coupon schema | `coupons.create` / `coupons.update`; client usage counters are rejected; redemption remains the existing transactional service. |
| Shipping / Notifications | Persisted records and exception visibility | Read-only. Carrier integration, notification delivery and retries are not implemented by this portal. |
| Audit Logs | Bounded protected action/resource/actor/request records; detail access is audited | `audit_logs.read`; raw metadata, secrets and private document URLs are not serialized. |
| Settings / Staff | Reporting timezone/currency; explicit ADMIN grants/revocation, permissions and staff suspension/reactivation | OWNER only. Access changes revoke sessions and are audited; OWNER targets cannot be changed through staff management. No integration-secret editor or owner-transfer workflow. |

All supported writes use an actor-scoped `Idempotency-Key`, exact field allowlists, transaction-time session/permission recheck, expected versions on edits, a durable command receipt and audit. Repeated identical commands return the original compact receipt; changed payload under the same key returns409. Unsupported actions have unavailable states and no executable fake controls.

CURRENT / PARTIAL: this is an operations interface over persisted B2C records, not completion of saleable storefront checkout or business automation. Refund policy/provider reconciliation, cancellation compensation, legal invoice generation/private storage, carrier integration, notification providers, compatible BullMQ jobs and financial recognition rules remain FUTURE / REQUIRED or UNKNOWN / REQUIRES BUSINESS DECISION. Legacy workers use different models and are not connected to this portal.

Verification evidence for mutation paths: `admin-mutations.test.js`11 tests and `admin-commands.test.js`8 HTTP tests passed against temporary MongoDB, including replay/concurrency/audit rollback; see TESTING for combined-suite/browser evidence and limits. No live-provider, production-load or real-owner provisioning claim follows from these tests.

Sources: `B2C/backend/admin/{permissions,security,commands,routes,reads,resources,dashboard,mutations,staff,settings,provision-owner}.js`; `B2C/backend/auth/{app,service}.js`.
