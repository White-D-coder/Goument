# Prioritized TODO

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

Priorities below are initial engineering triage from source findings, not an approved feature schedule. P0=critical, P1=important, P2=enhancement, P3=future. Preserve ordering unless new evidence/user priority changes it; record reason in CHANGELOG.

## P0

- [x] S01: public registration assigns customer server-side; malicious-role and existing-admin regression tests added (2026-09-27).
- [ ] S02/S03: authorize socket admin membership and remove reliance on source fallback admin/encryption credentials; establish required configuration.
- [ ] E01/S05: atomic user/payload-bound idempotency plus provider request idempotency and duplicate webhook handling.
- [ ] E02–E04: variant stock guard, atomic payment/expiry/release transitions and recovery across DB/Stripe/Redis failures.
- [ ] E05–E07: validate authoritative shipping/boxing totals; fix coupon shape mismatch; resolve tax policy/fallback conflict before commerce activation.

## P1

- [ ] S04/S06: restrictive credentialed CORS, public endpoint validation/abuse controls, template/PII exposure review.
- [ ] E08/S07/S08: complete historical data/identity strategy, durable vault storage, retention and concurrent-write handling.
- [ ] Align effective page controls and health path; preserve current availability until explicitly changed.
- [ ] Establish runtime/deployment ownership, transaction-ready DB, backups and integration verification evidence.
- [ ] Run relevant existing suites and add regression scenarios from TESTING; establish separate typecheck because build ignores errors.

## P2

- [ ] Verify rendered canonicals/schema/sitemap coverage; reduced-motion and xs breakpoint behavior.
- [ ] Measure image/bundle/query performance; then address demonstrated bottlenecks.
- [ ] Resolve template README font claims and catalogue local-data/backend divergence.

## P3

- [ ] Define unified Customer360 scope and valid identity matching.
- [ ] Define invoice/refund/finance policies and workflows before implementation.
- [ ] Decide future of alternate frontend and dormant ecommerce surfaces; B2C implementation authorized 2026-09-27; activation depends on tested integration.

## Completed

- [x] Detailed source technology/design audit and Word export.
- [x] Canonical project-memory initialization and root startup/update instructions.

## Audit follow-up — documentation and source findings

- [x] Completeness audit created before canonical expansion; source-aligned relationship/state/API/traceability tables added.
- [ ] Documentation next: obtain explicit answers/evidence for U01–U12 in MEMORY_GAP_AUDIT; record decisions and affected requirements. Deployment/backup ownership also UNKNOWN.
- [ ] P0 before any commerce activation: replace gated account/checkout false-success behavior with an approved real flow and verification. Added due to newly inspected client fallbacks; does not authorize activation or reprioritize existing P0 entries.
- [ ] P1: reconcile frontend cart/session/response contracts and safe offline replay; establish truthful inquiry acknowledgement/delivery handling.
- [ ] P1: document/test vault corruption and count-cap recovery guarantees before treating it as durable customer history.

Historical audit note: S01 was open on 2026-09-25; code remediation was implemented on 2026-09-27. No business-policy unknown was silently resolved during this audit.

## B2C/ next increments

Actual application location is B2C/. Storefront/catalogue/account/cart foundation implemented; continue here. Remaining: guest login cart merge, refresh UX, address management, admin/socket security, authoritative quotes/checkout/payment concurrency, owner and financial domains. Existing commercial-policy unknowns still apply. Configure separate backend services/product data for live shopping; do not treat preview products as stock.

## 2026-09-28 — Follow-up after database foundation

Current DB task complete at internal-module scope. FUTURE / REQUIRED before commerce activation: authorize and implement legacy API adapter/migration; server-owned quote/tax/shipping rules; authenticated customer/owner endpoints; signed gateway ingress + durable retry/reconciliation; checkout/cancellation/stock-expiry/coupon compensation saga; refund provider integration; invoice legal numbering/PDF/credit-note policy; shipment/notification workers; cache refresh; operational index/load monitoring and backup/restore. UNKNOWN: guest/account merge, tax jurisdiction, payment provider/rules, reservation duration, refunds/returns, invoice numbering, retention/anonymization and accounting recognition. Existing socket authorization issue remains open; this task did not fix it.

## 2026-09-29 — Google auth and Atlas integration

Google auth integration: add Google Web Client ID/Secret locally, configure exact callback/consent test users, restart auth and complete browser consent/login/logout check. Remaining: explicit account linking/recovery, legacy identity migration, new-session cart integration, guest-cart merge and production shared OAuth/rate state. No old customer data is silently migrated.

## Box-first gifting — 2026-09-30

- [ ] Before selling gift drafts: confirm live variant/stock mappings, physical packaging compatibility, box pricing and shipping/tax policy; integrate authoritative quote and order packing snapshot, then payment guard. Current draft fit does not reserve stock.
- [ ] Establish draft retention and explicit guest/account merge + cross-device ownership policy. Browser session currently owns the draft.
- [ ] Production multi-instance rate limit and end-to-end paid checkout still pending; unchanged priorities above.

## Razorpay — 2026-09-30

- [ ] Add Razorpay test credentials locally and public HTTPS webhook; complete hosted test payment with automatic capture.
- [ ] Confirm prices, stock mappings, box costs, GST/shipping; implement trusted draft→priced/reserved order creation.
- [ ] Implement durable reconciliation/failed-event inbox, reservation expiry/cancellation and refunds before commerce launch; unknown order-create outcomes currently require operator reconciliation.

## Checkout remaining dependency — 2026-09-30

Sign-in and account-owned delivery capture implemented. FUTURE / REQUIRED: connect59 gift selections/8 boxes to saleable variants, establish approved prices/box charges/tax/delivery rules, create immutable delivery/pricing/packing order snapshots and reserve stock atomically before Razorpay. Address capture alone is not completed paid checkout. Real Google return and browser checkout visual checks remain unverified.

## Current runtime blocker — 2026-09-30

- [ ] Restore configured Atlas connectivity and repeat a real gift-cart save/reload. Existing service and a fresh read-only Mongoose connection fail; underlying server errors report ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR, causing draft503 responses. Follow-up confirmed SRV/A DNS and TCP succeed; verified SNI TLS and explicit TLS1.2 fail. User confirmation of the current public IP's Active Atlas access-list entry is pending; exact infrastructure/network cause is UNKNOWN. Do not disable TLS validation or infer invalid credentials from this error. Restored Add to Cart passed against a temporary local database; that does not close this blocker.
- [x] Gift-route503 source handler now uses cart-specific messaging with no connection-detail leakage; GET/PUT failure regression passes. Existing5003 process still needs a healthy restart after Atlas recovers to load this source change. This does not close the connectivity blocker.

## Same-browser cart continuity — 2026-09-30

CURRENT / IMPLEMENTED: guest/signed-in additions and pre-login cart retention through signup, password login and Google callback; pending writes/cookie handshakes serialize and Account waits before redirects. Existing cross-device/customer-cart merge task remains separate; no schema/ownership merge implemented. Real configured-runtime validation remains blocked by Atlas above.
