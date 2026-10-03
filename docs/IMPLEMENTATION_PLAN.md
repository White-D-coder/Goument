# B2C implementation plan

Date: 2026-09-27. Status: incremental implementation authorized by the user's master directive. This supersedes the earlier documentation-only restriction for new work; prior audit remains dated evidence.

## Reconciliation

Target product is B2C gifting commerce. Existing public implementation remains B2B catalogue/curation/inquiry, with two frontends and gated commerce screens. Build inside B2C/ using the existing visual language and Express/Mongo/Redis architecture; preserve visual language and existing inquiry journey. No provider replacement, frontend merger or automatic deployment is planned. B2C activation is now requested in principle, but each surface needs real integrations and tests before opening.

The 2026-09-25 gap audit is the baseline. Pre-change reinspection confirmed registration consumed public role input, making customer/admin separation the first dependency. No model migration is needed for this fix. Tax, shipping, invoice seller/numbering, refund eligibility, retention and staff permissions remain UNKNOWN; do not turn those into invented policies. Implementation can proceed on independent foundations.

## Dependency order and acceptance

| Increment | Deliverable / dependencies | Acceptance before completion | State |
| --- | --- | --- | --- |
| 1 | Reconcile memory and public registration trust boundary | Persisted customer role, real JWT identity, injected roles denied admin access, normal auth/existing admin login preserved | IMPLEMENTED / locally verified:14 tests pass |
| 2 | Socket authorization, configured admin secrets, honest account authentication | Unauthenticated/customer sockets denied; no false client auth; required configuration documented; key migration plan before vault changes | NEXT |
| 3 | Mongo-backed catalogue/customer contracts | Pagination/validation, stable IDs, explicit price units; preserve current catalogue UI and customer identity | FUTURE / REQUIRED |
| 4 | Cart integration | Guest session, safe login merge, server price/stock revalidation; offline replay conflict tests | FUTURE / REQUIRED |
| 5 | Checkout/payment/order/inventory integrity | Scoped atomic idempotency, transactional stock guards, immutable snapshots, signed event amount/currency match; duplicate/concurrent/failure tests | FUTURE / REQUIRED; tax/shipping policy blocks final totals |
| 6 | Customer account/history and owner views | User isolation, server pagination/search, order history/snapshots, explicit staff permissions and audit | FUTURE / REQUIRED |
| 7 | Invoice/refund/financial events | Independent records, immutable snapshots, provider idempotency/reconciliation; business policies required | FUTURE / REQUIRED; policy dependent |
| 8 | Notifications/SEO/performance/release readiness | Notifications cannot roll back money state; rendered SEO; measured performance; recovery and security verification | FUTURE / REQUIRED |

Each increment follows domain specification → source/consumer inspection → implementation → regression tests → documentation updates. No automatic progression into policy-dependent money decisions. No production-ready claim before integration, recovery and deployment evidence.

## Increment 1 specification — server-controlled signup role

Purpose: prevent public registration from creating privileged customers. Actors: anonymous registrant, authenticated customer, existing administrator. Input: existing registration body (name/email/password/optional phone). Compatibility: extra role field is ignored, never authoritative; service always writes customer. Output: existing201 success/message and secure token cookies; error contracts unchanged.

Entity: existing User, no schema/index change. Identity remains User._id/normalized unique email; no merge, deletion or role-provisioning feature. State: anonymous → persisted customer → tokens; existing admin login preserves stored role. Authorization for admin routes continues to load the current database role. UI: no change or gate activation.

Security: enforce in service even when called without HTTP validation. Do not rely on model default or client field stripping. Failure: existing validation, duplicate identity and persistence errors unchanged. Concurrency: no new read/write operation; existing unique email index remains authority; concurrent refresh is a separate unresolved issue. Idempotency: signup contract unchanged. Audit: document/test this change without credentials; persistent staff audit log is a later domain, not silently introduced here.

Dependencies/consumers: auth controller/model/token generation, auth middleware, admin routes, account page and existing auth/order suites. Tests: malicious scalar/object/array role attempts persist as customer; /auth/me confirms customer; /admin/orders denies access; direct service call cannot bypass; existing admin can still log in. Existing suites must be run. Historical accounts are not auto-demoted; production review of prior privileged registrations remains an operator task with unknown deployment evidence.

## Location correction — 2026-09-27

User clarified B2C/ is the actual application root. Earlier main-frontend placement assumption is superseded. Storefront screens and copied backend now exist there; account/cart integration is partial and checkout remains unavailable. Continue implementation under B2C/, not the original B2B app. UI scaffold/integration work does not close payment, socket, policy or production-readiness gates.


## 2026-10-01 — Owner operations portal: audit and implementation scope

2026-10-01 OWNER operations directive: phase0 repository audit completed before implementation by parent plus auth, frontend and commerce reviewers. Active integration is B2C/backend/auth on5003 and explicit Mongoose database models; legacy JWT/Stripe/controllers on5002 are separate and unsuitable for portal authorization. Retain existing cookie scope and expose /api/v1/auth/admin; frontend /admin is a non-sensitive shell whose data/actions require backend session and permission checks. Existing CUSTOMER/ADMIN/OWNER roles retained. ADMIN deny-default grants are explicit OWNER configuration; no public elevation or automatic first-user owner. New staff session lookup must support existing staff records without a fake Customer. Unknown policies/integrations remain unavailable rather than being invented: taxable quoting/draft-to-order, refund eligibility/approvals/provider reconciliation, legal invoice numbering/PDF/private storage, carrier, notification delivery and deployment shared-state ownership. Implement actual database-backed read/operation paths where supported, validated audited/idempotent product/coupon/inventory mutations and constrained fulfillment start. Keep money and historical snapshots authoritative. Owner identity/reporting timezone/currency/refund approval questions sent; independent work proceeds. No production owner assignment, schema installation on Atlas or provider transaction authorized by the audit itself.
