## 2026-10-12 — Storefront/admin gap confirmed (R221)

CURRENT / PARTIAL, source-verified: preview products/display prices do not automatically create admin Product/Variant records; GiftDraft print names have no admin read/display flow, and draft Add is not an Order. FUTURE / REQUIRED alongside the existing catalogue/quote/order bridge: connect approved catalogue prices and confirmed order/printing snapshots to staff views before end-to-end operation claims. Do not expose anonymous drafts, seed/publish products or enable payments from this status question. ADMIN_FLOWS owns evidence; priorities unchanged.

## 2026-10-12 — Required Lotus names and envelope UI (R216–R219)

CURRENT / IMPLEMENTED locally: required Lotus PDP/cart print-name capture and server checkout/address gate; all envelope card strips with Home exception; desktop gallery/purchase equal-height CSS. Latest required policy supersedes initial optional/Skip approach. Existing pricing/payment/security priorities retained; no production deployment.

FUTURE / REQUIRED within the already tracked authoritative order bridge: explicitly validate and snapshot confirmed print-name metadata into the eventual order/fulfillment contract before activating paid envelope orders. Current GiftDraft persistence/review does not claim an order-printing integration. Other environment additive GiftDraft validator rollout/runtime remains UNKNOWN; local compatible validator update is recorded in DATABASE/TESTING. No new customer-retention/matching or printing-price policy inferred.

## 2026-10-12 — R213–R214 follow-through

- [x] Remove extra GST/delivery from inclusive-price cart display and center shared card text; add single bounded503 retry for allowlisted reads while preserving mutations/errors/checkout guards. TESTING records69 client tests,16 gifting tests and20 responsive/fixture checks.
- [ ] Investigate hosted transient503 if it recurs: first public catalogue request503 then count/draft200/me401; root hosting/dependency cause UNKNOWN without server logs. Local direct/proxied reads healthy. Client resilience is not a deployed backend fix; no deployment performed.
- Latest inclusive user policy supersedes old extra18%/delivery-range planning policy. Authoritative inclusive prices/reservations, included-tax allocation, packaging and delivery serviceability remain open; existing P0 priorities retained.

## 2026-10-12 — R206–R210 follow-through

- [x] Separate bounded bootstrap rate traffic, deduplicate concurrent bootstrap reads, remove envelopes from Stationery, remove requested PDP extras while retaining related carousel, and replace Lotus main with supplied photo. Evidence: TESTING.
- Existing distributed-rate/deployed-proxy and authoritative commerce priorities remain unchanged; no policy/schema/financial activation inferred.

## 2026-10-12 — R196–R205 follow-through

- [x] Numeric preview-card display prices, removal of Sample suffix, photographed-envelope/candle draft actions, phone gallery spacing/height, divider/FAQ exception, continuous Home wallpaper, static image hover and larger PDP prices implemented locally; UI_SYSTEM/TESTING own scope/evidence.
- Existing authoritative-price/reservation/delivery/payment activation priorities below remain open. Registered draft IDs are not saleable stock mappings, and UI sample figures do not resolve commercial-price policy. No priority reordering.

## 2026-10-12 — R190–R192 follow-through

- [x] Shared Ivory title role, filled product-photo frames, mild cart corners, larger desktop cart, supplied candle cards/sub-images and calculated phone/desktop cart estimates implemented and verified; see UI_SYSTEM/TESTING.
- [x] Unsafe flat-price gift-order path removed;409 preserves drafts and address capture no longer advertises payment readiness. Existing authoritative-quote/reservation activation priority below remains open.
- [ ] Before final cart checkout: exact inclusive per-candle/per-pack prices and saleable mappings/stock, confirmed inclusive hamper prices, serviceability, internal included-GST accounting treatment, box/packaging pricing and authoritative quote/reservation bridge. R213 user-inclusive GST/delivery policy SUPERSEDES earlier R192 extra18% and R193 internal delivery-range/before-delivery policy; candle₹200–500 range is not a final saleable quote. New candle names remain descriptive pending official catalogue data. Legacy checkout permits address preparation; order creation safely rejects until the authoritative bridge exists. Existing P0 priorities retained.

# Prioritized TODO

Last reviewed: 2026-10-12 for B2C R161 fixes; other-system priorities retain their prior source evidence. Production deployment remains unverified.

Priorities below are initial engineering triage from source findings, not an approved feature schedule. P0=critical, P1=important, P2=enhancement, P3=future. Preserve ordering unless new evidence/user priority changes it; record reason in CHANGELOG.

## P0

- [x] B2C R160 dependency security review — R161 corrected2026-10-12: independent B2C installs, Next16.4/compatible updates and unused frontend dependency removal; both production audits0, build/typecheck/lint/regressions pass. Historical baseline and advisory limits retained in SECURITY.

- [x] S01: public registration assigns customer server-side; malicious-role and existing-admin regression tests added (2026-09-27).
- [ ] S02/S03: authorize socket admin membership and remove reliance on source fallback admin/encryption credentials; establish required configuration.
- [ ] E01/S05: atomic user/payload-bound idempotency plus provider request idempotency and duplicate webhook handling.
- [ ] E02–E04: variant stock guard, atomic payment/expiry/release transitions and recovery across DB/Stripe/Redis failures.
- [ ] E05–E07: validate authoritative shipping/boxing totals; fix coupon shape mismatch; resolve tax policy/fallback conflict before commerce activation.

## P1

- [x] B2C R160 serverless entrypoint — R161 raw webhook/provider wiring, parser/error boundaries, explicit schema lifecycle, coalesced/retryable init and readiness503 corrected; entrypoint regressions pass. Real deployed/provider verification remains separate.
- [ ] B2C R160 privacy/auth boundaries — CURRENT / PARTIAL R161: exact Origin, private no-store and cross-instance persistent atomic OAuth implemented/tested. Remaining: distributed general rate limiter and deployed trusted-proxy/CDN evidence. Preserve existing cookies, identity and permissions; no tested customer leak/admin bypass demonstrated.
- [x] B2C R160 catalogue contracts — R161 safe DTO/literal bounded query,2.5s shared fetch budget/bounded fanout and truthful preview/price/stock fallback tested; checkout gates retained. Historical findings in SECURITY/PERFORMANCE.

- [x] B2C owner setup CLI security — R161 retired unsafe bulk/default-password CLI; guarded explicit-user-ID operator command retained. Regression proves retired script cannot touch DB; no account mutation. R159 approved local owner remains. Historical finding in SECURITY; no credential values recorded.

- [ ] S04/S06: restrictive credentialed CORS, public endpoint validation/abuse controls, template/PII exposure review.
- [ ] E08/S07/S08: complete historical data/identity strategy, durable vault storage, retention and concurrent-write handling.
- [ ] Align effective page controls and health path; preserve current availability until explicitly changed.
- [ ] Establish runtime/deployment ownership, transaction-ready DB, backups and integration verification evidence. B2C R161 additionally requires explicit OAuthFlow schema/index installation before release and real provider webhook verification; local tests do not establish production readiness.
- [ ] Run relevant existing suites and add regression scenarios from TESTING; establish separate typecheck because build ignores errors.

## P2

- [ ] B2C requested20ms per-operation budget (R189,2026-10-12) — CURRENT / PARTIAL: local busy DOM feedback0.7–1.1ms, but24ms Event Timing samples and73–106ms initial long tasks remain. Cart request/delivery optimizations verified in PERFORMANCE/TESTING; verify real-device interaction/scroll/startup and hosted APIs before claiming the ceiling. No universal network SLA established; existing hosted-latency/infrastructure follow-up remains open.

- [x] B2C reliable image loading (R162,2026-10-12): per-source bounded recovery, load-aware hero/gallery, optimized thumbnails;24 assets decode, slow-phone/responsive and injected-failure checks pass. Deployed/physical-device image delivery remains unverified; see TESTING.

- [x] B2C R160 measured delivery — R161 compressed assets/responsive images/unused font removal/streaming layout and offscreen hero fixes verified. Slow-phone Home25.55→4.07s,4.89→0.71MB; physical-device/deployed field validation remains future. PERFORMANCE owns lab conditions and historical evidence.
- [x] B2C R160 test reliability — R161 fixtures/mocks adapted to current item-first/empty-box/Header contracts;103/103 database and41/41 client tests plus full lint pass. Ownership/cart/payment guards retained; historical failures in TESTING.

- [x] Wider B2C footer layout (R194,2026-10-12): user reports broken stacked brand. Both inner wrappers now override legacy flex at every width; tablet tagline stacks, phone stays centered.16 Home/Shop responsive checks and visual inspection pass; UI_SYSTEM/TESTING own evidence. Existing wallpaper/type/navigation/reveal retained.

- [ ] Home desktop slideshow dots (observed2026-10-11): at1440px the existing copy panel overlaps the centered dots, so pointer hit tests fail. Phone layering is corrected within R120; review desktop stacking separately without redesigning its hero.

- [ ] Supplied envelope catalogue (R180,2026-10-12): confirm official design names, prices, saleable mappings, stock and pack quantities for ep1–ep9 before enabling purchasing. Current nine photo previews use descriptive names and enquiry links; no invented commercial data.

- [ ] Product detail commercial completion (2026-10-07): confirm Ivory/India Burgundy/India Lavender prices, saleable product/variant mappings, final contents/pack quantities, dimensions, tax/shipping/lead-time/return terms and whether notes/branding are included or charged. Current PDP uses temporary Sample display prices (R142), final-price enquiries and photographed contents; these display constants do not establish authoritative sale prices. Hamper Add to Cart saves an enquiry-only draft selection; checkout/address/order routes reject it until pricing is confirmed. Gift-note requests compose email; no message field exists in GiftDraft and no note-to-order workflow is implemented. Confirmed commercial data and verified checkout must precede sale activation.
- [ ] Catalogue photography mismatch observed during PDP work (2026-10-07): `diary-bottle-pen-set` source describes a diary/bottle/pen trio, but its existing `sustainable_diary_bottle_pen.webp` photograph shows a desk organiser. Confirm the intended product and obtain matching photography; this UI task does not rewrite its existing identity/price/contents or pretend that photograph depicts individual included items.

- [ ] No-JavaScript storefront rendering (observed2026-10-07): disabling page scripts during a product navigation leaves the inherited Next loading shell visible while product markup is streamed into a hidden boundary. Full no-JS rendering is not verified; investigate inherited loading/streaming behavior within an explicit progressive-enhancement task. Current normal/reduced-motion JavaScript flows pass.

- [x] Home tablet heading/action overlap (R183,2026-10-12): corrected the inverted title clamp and stacked/centered heading actions through900px, also fixing medium/large phone hamper alignment.26 browser heading/viewport checks at320–1440px pass; see TESTING. No deployment.

- [ ] B2C typography cleanup (audit2026-10-05): resolve footer h2 Jakarta/Cormorant !important conflict; agree shared heading/body/action scales, casing and tracking; assess9–11px microcopy; remove unused Cinzel/script/Momcake declarations only within approved font scope while preserving admin Pagio/brand needs. Source/runtime mapping in UI_SYSTEM; this audit did not authorize a font redesign.

- [ ] B2C frontend lint debt (observed2026-10-05): types.ts explicit-any and GiftBuilder unused selection remain. GoldPopperSprinkle synchronous effect state resolved in the performance increment, with scoped/full lint evidence. Full lint remains failing.
- [ ] B2C hosted latency follow-up (R166,2026-10-12): public anonymous first auth/draft/count responses~3.2s, later~0.25–0.65s in one slow-phone lab snapshot. Verify deployed region/runtime/DB readiness and physical-device behavior; infrastructure cause UNKNOWN. Local counter/mobile cart/lazy footer/request fixes verified but unpublished; do not mark hosted latency resolved before deployment measurement. Existing performance priorities retained.

- [ ] B2C performance follow-up: measure post-change scroll cadence on the user’s device and investigate slow local webpack rebuilds. The2026-10-07 editorial experiment was rejected/reverted; prior optimized slideshow/canvas behavior is restored. Before-change jank and76–183s development compile/invalidation spans were observed; further layer-isolation diagnostic was declined2026-10-05. Smaller assets/lifecycle checks do not establish production frame-rate improvement.

- [ ] Verify rendered canonicals/schema/sitemap coverage; reduced-motion and xs breakpoint behavior.
- [ ] Measure image/bundle/query performance; then address demonstrated bottlenecks.
- [ ] Resolve template README font claims and catalogue local-data/backend divergence.
- [ ] B2C collection data/search integrity (source inspection2026-10-07): populate actual hamper products; local HAMPERS_CATALOG currently contains only individual gifts. Existing product.service Atlas totals count all active products instead of search matches, and an unknown category silently removes the filter. Establish explicit category membership and correct search counts before relying on category IDs or pagination totals. New Shop collection pages reuse existing search/fallback; this UI change does not fix these backend issues.

- [ ] B2C catalogue fallback integrity (observed2026-10-11): `catalogue.ts` synthesizes a `(match.price || 499) * 100` amount and inventory50 when API fields are absent; its offline branch also supplies inventory50. Treat these as source defects requiring authoritative pricing/availability or explicit unavailable states before commerce activation. R127 changes presentation only and does not verify these amounts or stock.

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

- [ ] Restore configured Atlas connectivity and repeat a real gift-cart save/reload. Historical read-only Mongoose checks reported ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR after SRV/A DNS and TCP succeeded; SNI TLS and explicit TLS1.2 failed. Exact infrastructure/network cause remains UNKNOWN. Local development now uses an isolated replica set and gift-draft GET/PUT/reload passed through Next; this does not close the Atlas/production connectivity item. Do not disable TLS validation or infer invalid credentials from this error.
- [x] Gift-route503 source handler now uses cart-specific messaging with no connection-detail leakage; GET/PUT regression passes. On 2026-10-10 the auth service was restarted against the isolated local replica set and the proxied gift-draft read/write was verified. This does not close the Atlas connectivity blocker.

## Same-browser cart continuity — 2026-09-30

CURRENT / IMPLEMENTED: guest/signed-in additions and pre-login cart retention through signup, password login and Google callback; pending writes/cookie handshakes serialize and Account waits before redirects. Existing cross-device/customer-cart merge task remains separate; no schema/ownership merge implemented. Real configured-runtime validation remains blocked by Atlas above.

## 2026-10-07 — R58 Home follow-through

- CURRENT / IMPLEMENTED: consumer-first Home design, semantic/static rendering, local fonts, responsive photo/card layouts and focused Home chrome. Verification/limits: TESTING.
- UNKNOWN: approved customer quotes/client logos are not supplied. TestimonialStrip exists but empty data remains hidden; never publish demo identities or fictional endorsements.
- UNKNOWN: final hamper prices/contents/stock, personalisation charges, delivery/tax/return terms and production Core Web Vitals remain unestablished. The UI uses existing catalogue amounts and explicit enquiry/photo-preview boundaries. No new commercial policy is authorized by R58.
- FUTURE / REQUIRED: after a real deployment, measure LCP/CLS/INP on physical phone/desktop and verify canonical/indexing with the configured storefront domain. This task did not deploy.
