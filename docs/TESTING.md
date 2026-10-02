# Testing

## 2026-09-30 — Guest/signed-in cart regression coverage

`node --test tests/gift-cart.test.cjs tests/api.test.cjs` in B2C:15 passed. Includes existing addition/quantity/conflict/failure coverage plus sign-in waiting for queued card and builder writes, writes added during the wait, failed-save navigation blocking without replay, queue recovery, cookie-owned auth/cart operation with localStorage denied, retained legacy guest headers and explicit503 errors.

`npx jest --runInBand --detectOpenHandles --forceExit --testTimeout=30000 database/tests/auth.test.js database/tests/gifting.test.js` in B2C/backend:21 tests across2 suites passed. Added real temporary-Mongo HTTP coverage for guest selections through registration/logout/password login; Google callback/replay/repeated login with mocked provider claims; signed-in additions; stable gift cookie, revisions, boxes and counts; second-browser isolation; guest checkout401; GET/PUT503 masking with no secret leakage or write. No Atlas/customer fixture data used. Lint, TypeScript and production build passed.

Isolated Chrome390×1000px with actual auth/gifting routes and temporary MongoDB passed seven scenarios: guest add + selected box through signup/password login and signed-in additions; delayed save completes before mocked Google callback navigation;503 save prevents navigation and preserves confirmed cart/badge; leaving Account cancels delayed Google redirect while the save completes; denied localStorage permits guest/signed-in cookie requests; a delayed first builder cookie read serializes before a Shop addition. Exact revision check also passed: empty0 → item addition1 → box selection2 → password login remains2 → signed-in addition3 → Google login remains3, with quantity2 and one box. No page overflow, runtime exceptions or forwarding errors; phone cart screenshot inspected. Test browser's requests alone were forwarded to the temporary backend, preserving query strings and separate Set-Cookie headers. Provider exchange/claims were mocked. Temporary browser/backend/Mongo were stopped; original3001/5003 services were untouched. One test-harness CDP evaluation initially attempted to serialize window after Object.defineProperty; returning a boolean corrected the harness, then the remaining checks passed. No application fix was needed for that harness issue.

Configured Atlas read-only ping was retried and still failed with MongooseServerSelectionError and ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR on all three reported nodes. Final actual draft GET checks still returned503 through direct5003 and proxy3001. No Atlas selection write or real Google consent was claimed. Existing5003 process was not restarted while connectivity is broken.

## 2026-09-30 — Feature text clarity verification

`npm run lint` in B2C passed. Local Chrome at320/390/640/768/1024/1200/1440/1920px: no page/card horizontal overflow, all three images loaded, heading/description/action bounds remain ordered with no text overlap, CTAs48px high, no runtime exceptions. Desktop shared rows retain equal panel widths and aligned copy/actions. Before/after comparison at seven common widths found no differences in heading/body/CTA font family, size, weight, line height or tracking, image source/height, panel width, action height or destination. Removed eyebrow labels are intentionally excluded from this comparison. Section-to-Occasions heading gap measured52px on phones and64px otherwise. Inspected desktop1440px and phone390px screenshots. Build/backend/payment tests were not rerun for this isolated copy/CSS refinement; existing Atlas failure is unresolved.

## 2026-09-30 — Current gift-draft503 connectivity checks

Read-only checks: GET auth/config returned200 and GET auth/gift/draft returned503 on both direct5003 and proxy3001. Fresh connectDatabase + ping failed with MongooseServerSelectionError/ReplicaSetNoPrimary; all reported server errors had MongoNetworkError with ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR. SRV/A DNS and TCP succeeded for all three nodes. Verified TLS with SNI failed on each; forcing TLS1.2 produced two identical alerts and one timeout. TLS validation remained enabled. Current environment values were parsed locally without printing credentials; no schema installation, account creation, cart write, service restart or dependency change occurred. No app build/tests rerun for this diagnosis-only work. Real cart persistence remains unverified until Atlas connectivity recovers.

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Existing test sources

Backend npm test = jest --runInBand --detectOpenHandles --forceExit. Suites: auth (registration/login/refresh reuse), cart (stock rejection/add), health, order (checkout decrement and repeated idempotency key; queue is mocked without a scheduling assertion). Order suite mocks Stripe and BullMQ. MongoMemoryReplSet supports transactions; ioredis-mock selected in test mode. Tests may require local Mongo binary/download.

Frontend scripts provide ESLint and Next build; no dedicated frontend unit/E2E suite found. Main build ignoreBuildErrors means build alone is not a typecheck. Use npx tsc --noEmit when code changes need TypeScript validation.

## Initialization verification

Canonical-file coverage, Markdown local-link resolution, source-path existence for generated inventories, and documentation-only diff checked. No application test/build/live integration run performed; do not report suites as passing.

## Required future regression coverage

Public role injection and socket room authorization; concurrent/cross-user idempotency; variant stock exhaustion; duplicate webhook/worker execution; queue failure after commit; Stripe rollback/retry; late payment; restricted coupon field shape; authoritative shipping/boxing/tax; Customer360 ownership/history; vault concurrent writes and SMTP no-send behavior. Only add tests with meaningful behavior assertions; don't mirror implementation mechanically.

Run relevant checks after changes and record command, date, outcome and limits in CURRENT_STATUS/CHANGELOG. Never run destructive tests against production data.

## Scenario-to-test map (source evidence only)

| Scenario | Existing suite/assertion | What remains MISSING |
| --- | --- | --- |
| Register/login/rotation | auth/__tests__/auth.test.js:9 tests as of2026-09-27 | Client fake-auth handling, recovery/MFA, concurrent refresh |
| Cart quantity | cart/__tests__/cart.test.js:2 tests, explicit guest header | Frontend payload/identity/session mismatch, replay duplication, capacity/removal |
| Health | health/__tests__/health.test.js:1 test expects200 and service fields | Real deployment dependency outage/fail-open limiter behavior |
| Checkout | order/__tests__/order.test.js:2 tests: returned IDs, base stock decrement, sequential same orderId replay | Variant guard, concurrent keys, clientSecret confirmation, side effects and rollback |
| Queue | Mock queue.add exists in order test | Test title mentions scheduling but no queue.add assertion; real delayed worker not exercised |
| Webhook | Signature function mocked in order suite | No webhook endpoint request/test assertion in existing suite |
| Customer | User ownership checks implemented in service | Repeat1000-order history, name/address snapshot changes, cross-user access tests |
| Admin | Role middleware / PIN APIs exist | Socket auth, PIN multi-instance rate limit, exports/PII authorization tests |
| Invoice/refund/finance | Systems absent | Tests depend on approved future requirements; no working behavior claimed |
| Vault/email | Implementations exist | Corruption/key change/pruning/concurrent writers/SMTP missing/unawaited submit tests |

Historical audit: eight backend test cases found in four suites on2026-09-25; current executed count14 after signup regression coverage. Test names are not sufficient evidence of assertions. No suite was executed in this audit. Full frontend E2E, browser accessibility, live Stripe/SMTP and restore tests remain MISSING. Critical future scenarios in EDGE_CASES should map to requirements before adding tests.

## 2026-09-27 — First B2C implementation increment verified

Implemented S01: auth service assigns customer on every public signup, ignoring caller role. Added six regression cases (four HTTP injection variants, direct service bypass and existing-admin authorization), bringing backend coverage to14 tests across4 suites. Existing signup/login/refresh, cart, order and health tests retained.

Verification: pre-fix auth run reproduced5 failures and4 passes in isolated MongoDB. Initial sandbox run could not bind MongoDB port (EPERM); rerun with approved local-server permissions. First full run passed13/14 with a checkout Mongo IX-lock timeout; test setup now waits for registered model/index initialization. Final `cd backend && npm test`:4 suites passed,14 tests passed. Stripe/BullMQ remain mocked in order tests; Redis is mocked, MongoDB is a temporary replica set. No live payments, production data, frontend build, deployment or account activation tested/changed. These results do not verify unresolved payment concurrency or full B2C readiness.

Plan and canonical auth/security/API/customer memory updated. Next: socket admin authorization and real account integration, then catalogue/cart and commerce integrity. Tax/shipping/invoice/refund policy decisions remain UNKNOWN.

## 2026-09-28 — B2C database verification

Final `cd B2C/backend && npm test`: **5 suites passed, 41 tests passed**, including25 new database cases and16 existing backend cases. Temporary local MongoDB replica set with installed indexes/structural validators; legacy suites retain their Redis/Stripe/BullMQ mocks. No production database or real gateway was used. Initial restricted run could not bind MongoDB ports (EPERM); approved local-server rerun succeeded. Final full-suite run followed the issued-invoice immutability change.

New coverage:20-collection installation/indexes; normalized identity/password projection/signup role restriction; missing references/invalid money; native structural validator; last-stock concurrency; payload-bound stock dedupe; duplicate and distinct capture events; capture mismatch and rollback; competing payment attempts; pending refund cap and completion replay; coupon global/per-customer races; immutable snapshots; state/append-only/metadata guards; concurrent default addresses;1000-order Customer360 pagination and index explain; bounded owner metrics; optional provider uniqueness; invoice staff issuance and immutable document reference; repeatable fake seed; cross-record customer/SKU mismatch; finance-conflict rollback; quote arithmetic; cart owner/variant/expiry declarations.

`npm --prefix B2C/backend run db:describe -- --write-docs` succeeded:20 collections,79 explicit indexes,26 explicit unique constraints. Tests install the actual Mongo validators rather than mocking persistence. These checks do not establish live gateway delivery, HTTP authorization for the new module, production throughput, TTL deletion timing, backups, migration correctness or legal invoice/accounting compliance. Frontend tests/build not rerun because no frontend files changed in this database increment.

## 2026-09-29 — B2C reference storefront

B2C reference storefront: npm run build, npm run lint and npm run typecheck all passed. Static local image references checked. Local start initially blocked by sandbox; permitted start found port3001 already occupied. Read-only request to existing local server verified new page section/logo markup. No browser automation available, so mobile layout and interactive visual behavior remain source-checked, not browser-verified.

## 2026-09-29 — Google authentication verification

Final `cd B2C/backend && npm test -- --testTimeout=30000`:6 suites passed,51 tests passed (10 new auth tests). New tests use a real temporary MongoDB replica set; OAuth provider exchange is mocked for HTTP flows, while separate token-verifier assertions use actual RSA-signed JWTs and mock key retrieval. Covered user/customer atomic persistence, concurrent Google login uniqueness, signature/audience/issuer/nonce/expiry/verified-email rejection, browser-bound single-use state, denial/failure, role isolation, no email auto-link, password login, session expiry/revocation/disabled users, hidden session fields and customer-owned order history. No fake credentials were sent to live Google.

Initial new test fixture attempted a stale-version document save and was corrected to reload after session mutation. First full run passed48/49; legacy health test exceeded its five-second Mongo setup timeout. Final full run used30-second allowance and passed51/51 after two extra ownership/identity tests. Frontend production build and lint passed. Live Atlas read-only ping, guarded schema installation and auth server startup succeeded. Direct service and storefront proxy config checks returned googleEnabled:false, correctly reflecting missing client credentials. Live Google consent/browser round-trip remains unverified. No test account was created in Atlas.

## 2026-09-30 — OAuth configuration reload

Google Client ID/Secret were present in the local environment file, but the auth process started before they were added still returned googleEnabled:false. Restarted the identified B2C auth service. Atlas-backed startup succeeded; direct port5003 and frontend port3001 now return googleEnabled:true. Both Google start endpoints return302 to accounts.google.com with browser flow cookie, state, S256 PKCE and callback http://localhost:3001/api/v1/auth/google/callback. No credential values printed. Google browser consent and completed callback/account persistence are still unverified; the user must finish sign-in in their browser. No application code changed.

## Box-first gifting — 2026-09-30

Gifting regression suite6 cases covers authoritative packing (boundary/overflow/multiple/mixed/removal), catalogue capacity omission, cookie ownership/origin isolation, hostile quantities/IDs/extra capacity fields, reload persistence, simultaneous creation/update and stale revisions. Initial first-save version test failed; response revision now offsets __v by1 to distinguish a missing draft. Full database/auth suite41 passed. Production build and ESLint passed. Chrome local390px verified draft overflow and +box resolving fit; test browser draft cleared to empty after check. No purchase or stock/provider mutation performed.

Final verification: full B2C backend57 tests across7 suites passed (`npm test -- --testTimeout=30000`). Chrome checked /, /boxes, /build, /cart, /account at320/768/1440px: no horizontal overflow or broken loaded images;390px overflow/add-box interaction also passed. Home scrolled navbar computed white. Build and lint passed. Runtime auth/gift service restarted on5003 with guarded Atlas schema install.

## Razorpay — 2026-09-30

Razorpay8 cases and full database/auth suite49 tests passed: money tampering, ownership/origin, stock reservation, concurrent initialization/unknown timeout, forged signature, identity/amount/currency mismatch, authorized-pending, concurrent callback/webhook exactly-once capture, raw-byte tampering, unknown/cancelled capture and missing config. Gateway I/O mocked; provider test payment still unverified. Build/TypeScript/lint passed.

## Checkout sign-in/delivery verification — 2026-09-30

Production build including TypeScript and lint passed. Initial full database run:50 passed,1 failed because blank optional address strings violate schema minlength; fixed by unsetting empty optional fields. Post-fix auth/gifting suites18/18 passed, covering anonymous checkout/address401, retained guest selection after login, packing gates, required/invalid fields, origin protection, saved-address update and cross-customer isolation, OAuth allowlisted/state-bound return. Other database/Razorpay suites33 tests passed in the initial run and were not repeated (unmodified). A mistaken sandboxed rerun could not bind Mongo ports; rerun with local-port permission succeeded. Google consent, real Razorpay payment and final browser visual review were not performed in this increment.

## 2026-09-30 — Product-card reference verification

B2C lint, TypeScript and production build passed. Isolated local headless Chrome checked home and /shop at320/390/768/1440px: no horizontal overflow, broken loaded images or runtime exceptions; inspected320px shop,390px home and1440px home screenshots. Existing title/description/CTA families and sizes measured unchanged: home14/11/11px desktop and12/10/11px phone; shop14/11/10px desktop and13/10/10px phone. Mobile pill and heart outer tap targets44px.

Real emulated touch saved an item; reload and home→shop retained pressed state; removal emptied the saved list. Invalid JSON recovered without failure. Simulated browser storage denial showed a visible message without a false saved state. Pill navigated to /products/makhana. With reduced motion enabled and card hovered, transform:none, transition:0s and zero active animations measured. Test storage was cleared. No live catalogue-price branch, database-backed wishlist, purchases or payment-provider behavior tested/changed.

## 2026-09-30 — Rendered card image follow-up

Verification for rendered-reference revision: lint, TypeScript and final production build passed. Chrome home/shop checks at320/390/481/640/768/1440px found no horizontal overflow, broken loaded images or runtime exceptions; narrow Shop grid correction rechecked at320/390/481/640px. Inspected phone and desktop screenshots. All12 Shop pill labels/icons were separated at481px, minimum height52px. Touch save, reload persistence, home/shop synchronization, removal, storage-corruption/denial handling, detail navigation and reduced-motion hover passed. Backend/provider behavior unchanged and not retested.

## 2026-09-30 — Homepage feature edit verification

Lint, TypeScript and production build passed. Chrome320/390/640/768/1024/1440px: three feature cards render without page/card overflow, broken images or runtime exceptions. Inspected phone, tablet and desktop screenshots;768px rows measured approximately327/327/402px. Baseline390/640/1440 comparison found unchanged font families/sizes/weights/line heights/tracking for headings, body, eyebrows and actions, plus identical three image paths. Actions63–64px high; actual Tab navigation reached Explore Candles with a visible2px solid focus outline. Reduced motion produced no feature animations and0s image transition. Clicking gourmet/candles/stationery navigated to the original shop filters with6/1/6 preview results respectively. No backend/payment tests repeated for this presentation-only change.

## 2026-09-30 — Restored Add to Cart verification

`node --test B2C/tests/gift-cart.test.cjs`:9 passed. Covers preserved boxes/other items, incrementing, serialized first-cookie/read/write operations across cards, bounded409 reread/retry,99-item limit, queue recovery after503, no retry/success on ambiguous write,59 preview/backend ID parity and waiting for pending saves before cart loading. B2C lint, TypeScript and final production build passed. Read-only second-agent review found no additional material issue.

Chrome390px with real auth/gifting routes against an isolated MongoMemoryReplSet: touch added first item and badge1; same-tick repeat clicks were suppressed while another card queued, giving quantities2+1; selected box survived Shop and detail additions; reload retained quantities4+1; overflow returned NEEDS_BOXES; anonymous checkout-check returned401. An injected503 showed visible error and retained quantity/badge5. Navigating to cart immediately during a delayed PUT waited for completion and showed5+1. No runtime exceptions or horizontal overflow; phone success screenshot inspected. Initial browser run timed out awaiting the dev product route; rerun after route compilation with a longer wait and boolean DOM checks passed. Isolated selection cleared after verification.

Configured Atlas attempts returned503; a fresh read-only connection failed with MongooseServerSelectionError and underlying MongoNetworkError/ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR (SSL alert80) on all three reported servers. No actual Atlas save succeeded. Exact root cause remains UNKNOWN; generic driver IP-allowlist guidance is not proof of the cause. Browser verification forwarded only this isolated test browser's auth requests to a temporary backend; existing5003 service, environment, accounts and orders were untouched. Google consent, live product/variant bag and Razorpay were not retested.

## 2026-09-30 — Editorial feature spread verification

B2C lint and production build including TypeScript passed. Chrome checked320/390/640/768/1024/1200/1440px: no document/card horizontal overflow, all three images loaded,48px action targets and no runtime exceptions. Compared before/after computed font family/size/weight/line-height/tracking for every heading, eyebrow, description and CTA at all seven widths: unchanged. Image source paths and destination links also match. Inspected390px lead/secondary layouts,768px tablet and1200/1440px desktop screenshots.

Actual keyboard Tab reached a feature CTA with2px solid focus outline. Reduced motion measured zero feature animations and0s image transition. Gourmet/candles/stationery actions navigated to original shop filters with6/1/6 results. Initial320px image measurement ran before lazy image loading finished; rerun waited for completion and confirmed all images loaded. A read-only independent CSS/accessibility review found no actionable issue. This presentation-only change did not modify or retest database/payment flows.

## 2026-09-30 — B2C decorative-line removal verification

Final production build including TypeScript and lint passed. Parsed all six B2C stylesheets: remaining nonzero borders belong only to buttons/navigation controls, form inputs, quantities and the loading spinner. Decorative rules removed at their source; no global border/outline reset. Existing focus outlines retained.

Chrome390/1440px visited home, filtered Shop, boxes, item detail, account, cart, builder and legacy bag: no horizontal overflow or computed borders on the inspected decorative selector set in available rendered states. Home/Shop retained3/6 Add to Cart buttons. Initial rapid page traversal measured account/header before hydration; an explicit hydrated follow-up confirmed both account inputs retain1px borders, email divider pseudo-elements are absent, and the scrolled navbar is white with0px border and no hairline shadow. Keyboard Tab showed2px solid focus; follow-up had no runtime exceptions. Source inspection confirms selected-box check/text and selected-category colour/weight remain.

Cart/builder service-dependent populated states and authenticated order/payment views were not exercised; their separator styles were source-checked. No backend, auth, cart mutation or payment logic changed. Existing Atlas connectivity issue remains separate.

## 2026-09-30 — Equal feature-panel verification

Final production build/TypeScript and lint passed. Chrome320/390/640/768/1024/1200/1440px: no page/card overflow, all images loaded, equal panel/photo widths within subpixel rounding,48px action targets. Desktop heading/description/action top coordinates match across all three panels. Tablet768px rows each measured315.81px high. Before/after computed font families/sizes/weights/line heights/tracking and original image/link paths match at all seven widths; descriptions were intentionally shortened. Inspected phone and desktop screenshots.

Keyboard Tab reaches a CTA with2px solid focus. Reduced motion yields zero feature animations and0s image transition. All three links navigate to the original gourmet/candles/stationery filters with6/1/6 results. No runtime exceptions in viewport checks. Review caught overly broad non-subgrid fallback overriding tablet geometry; scoped fallback to desktop and repeated responsive/build verification. Older non-subgrid browser rendering itself remains untested. Product/cart/backend/payment behavior was not changed or retested.


## 2026-09-30 — Shop introduction verification

B2C lint and TypeScript passed. Isolated Chrome checked the revised intro at320/390/640/768/1024/1200/1440/1920px and additionally checked375/641/1000/1001px breakpoint boundaries: no horizontal overflow, heading overflow, clipped content or image/action overlap; original image loaded. Before/after computed heading, description and action font family/size/weight/line-height/tracking are unchanged at all eight comparison widths. Original box image path, /boxes destination and12 Shop Add to Cart buttons remain. CTA height44px; final320px inspection confirms the shortened Build your gift label fits on one line. Inspected phone/tablet/desktop screenshots.

Actual Tab navigation reached the CTA with a2px solid focus outline; Enter opened /boxes. Reduced motion yielded zero intro animations and0s arrow transition. Submitting the search form for makhana reached the existing filtered Shop with one result. No runtime exceptions in responsive checks. Read-only independent review identified boundary checks; these passed in the final layout. No new UI unit tests or production build were needed for this scoped markup/CSS change; backend/cart/payment behavior was not modified or retested. Existing Atlas outage remains separate.


## 2026-09-30 — Burgundy colour verification

B2C lint passed. Isolated Chrome visited Home, Shop and Account at390/1440px: --wine resolves to #3c0b1e and announcement, solid-header navigation/icons/wordmark, available card actions/hearts, Shop CTA, feature links, assurance icons and sign-in button compute to rgb(60, 11, 30). Forced hover/focus checks on Shop CTA, footer link and Account button also matched. Homepage header remains transparent before scrolling and white after scrolling. No document overflow or runtime exceptions in these checks. Source scan confirms one canonical --wine declaration and removal of the targeted brown overrides. No backend tests or production build for this CSS colour-only correction; existing Atlas blocker remains open.


## 2026-09-30 — Signature heading verification

B2C lint passed. Isolated Chrome at320/390/640/768/1024/1440px confirmed Pagio, font-style:normal, weight400, font-synthesis:none and existing24/36/48px sizes. CSS.getPlatformFontsForNode identified custom PagioRegular rendering all26 glyphs, not just a declared fallback. Heading/subtitle centers match viewport center within0.008px; no heading or page horizontal overflow. Existing /shop action retains44px target and three Signature Add to Cart buttons remain. Collection heading still uses Cormorant; --wine remains#3c0b1e. Phone/desktop screenshots inspected; no runtime exceptions. Source change is CSS only; no backend tests/build or cart mutations performed.


### 2026-09-30 — #4A0404 trial check

Lint passed. Chrome Home/Shop/Account at390/1440px confirmed rendered primary accents, available actions/icons and sampled hover/focus states are rgb(74,4,4), matching #4A0404. Transparent-before-scroll/white-after-scroll header retained; no page overflow or runtime exceptions. Razorpay visual theme source matches; hosted payment UI was not opened and no payment operation was performed.

## 2026-09-30 — Hero and immersive discovery verification

B2C lint, TypeScript and production build passed. Isolated Chrome checked320/390/640/768/1024/1200/1440/1920px: no document or feature-panel horizontal overflow; original hero and three feature images loaded. Before/after computed family, size, weight, style, line height and tracking matched for sampled hero/feature headings, descriptions and actions at all eight widths. Hero retains contain fitting and its1400:703 aspect ratio; original image paths and destination sets match. Centered upright Pagio Signature heading, three Signature Add to Cart buttons and #4A0404 token remain. Inspected phone/tablet/desktop screenshots.

At390px, touch navigation opened Shop, the Occasions anchor and all three feature filters, returning6/1/6 gourmet/candle/stationery results. Header remained transparent at the top and white after scrolling. Keyboard Tab reached the full-panel link with a2px solid focus outline; three panels contain exactly three links and no nested controls. Reduced motion produced zero hero/feature animations and0s image/arrow transitions. No runtime exceptions were observed.

The first automated feature tap timed out while scroll/reveal timing had not been accounted for. A follow-up hit-target inspection confirmed the image belongs to the expected link and a settled touch navigates correctly. Repeating with instant test positioning and a reveal wait passed every destination; no application change was needed. Independent review questioned the1024–1199px52px hero heading; the before-change browser capture confirms that size already rendered at1024px, with68px at1200px. Retained the scoped rule to preserve actual prior typography after removing obsolete overrides.

These are presentation/navigation checks, not cart-save, authentication or payment verification. Existing Atlas connectivity and commerce readiness limitations remain open.

## 2026-09-30 — Shared Pagio heading verification

B2C lint passed. Isolated Chrome compared Home, Shop, Account, Boxes, Cart, Builder,404, empty search and product detail at320/390/768/1024/1440px. All85 visible section-heading samples render Pagio, normal style and weight400; nested Shop/Account emphasis is upright. Their sizes, line heights, tracking, alignment and colours match the before snapshot. Sampled product-name/card/category/navigation/footer/body typography and #4A0404 remain unchanged. Chrome platform-font inspection confirms actual custom PagioRegular glyphs in hero, collections, Signature, feature and story headings.

Initial1024px inspection found Personalised Paper wider than its column. Extended the existing landscape feature layout through1199px and repeated comparison; no page/heading overflow remains. Additional640/767/1023/1199/1200/1280/1440px boundary checks passed, with three columns from1200px and the original heading sizes retained. Phone Home/Account and1200px feature screenshots inspected. No runtime exceptions observed.

Only typography.css and the feature breakpoint changed. No build, backend tests or commerce mutation was needed for this CSS change. Populated service-dependent cart/builder/checkout states were not exercised; shared selector coverage was checked against source. Existing Atlas issue remains separate.

## 2026-10-01 — Warmer surface verification

B2C lint passed; PostCSS parsed surfaces.css and shop.css. Chrome Home/Shop/Account at390/1440px retained every sampled font family/size/weight/style/line-height/tracking, image path, link destination and available Add to Cart button count. No document overflow or runtime exceptions. Inspected phone hero/Signature and desktop Signature/Story/footer screenshots; additional homepage320/768/1200px overflow checks passed.

Rendered footer background is exact#4A0404. Footer wordmark/link hover becomes light paper; real Tab focus has a2px solid light outline. Header remains transparent at homepage top and white after scrolling. Measured text contrast on rose4.63:1, assurance band4.98:1 and footer9.40–15.09:1. Shop intro/results/preview/navigation muted copy resolves to#665E5A after literal-to-token cleanup. Existing paper card/curve fills are unchanged. Independent source review found no material issue.

Initial automation sampled hover before its colour transition completed; waiting for the transition resolved the check. Its optional Shop sort selector was absent in preview mode; final check targets the actually rendered preview note. No application behavior change was required for those test corrections. No production build, backend tests or cart/payment mutations for this surface-only change; actual Atlas connectivity remains a separate open issue.

## 2026-10-01 — Kids navigation verification

B2C lint and TypeScript passed. Chrome checked320/390/640/768/1024/1199/1200/1440px at top and after scrolling: all16 states show exactly four distinct pastel letters, with each letter/label matching the adjacent link's computed font size. No Personalised nav label remains, no horizontal overflow, desktop navigation stays centered within1px and Kids points to /shop?search=kids. Platform-font inspection confirms all four glyphs render with custom Baloo2-Bold; accessibility tree reports the link name as Kids once.

Phone pointer interaction opens the Kids-filtered Shop, activates its sidebar item and closes the menu. Current preview returned zero matches and the existing empty state, as expected; no products invented. Phone menu/desktop header screenshots inspected; no runtime exceptions. Pastel contrast against the badge is8.89–12.59:1. Font asset is2072 bytes with OFL licence bundled. No production build or backend mutation/test was needed for this scoped navigation/font change.


## 2026-10-01 — Centered hero introduction verification

B2C lint and TypeScript passed. Isolated Chrome checked320/390/640/768/1024/1200/1440/1920px: no document overflow; centered deep-red headline; zero panel rounding/shadow; no photo/content overlap; original loaded image remains1400:703 with contain fitting. Compared heading/subtitle/CTA font family, size, weight, style, line-height and tracking against a before-change browser snapshot: all unchanged. Actual custom PagioRegular glyph rendering confirmed. All three Signature Add to Cart buttons remain present; no commerce mutation was exercised.

Hero description and actions have separate measured vertical gaps; both links remain at least48px tall and within the viewport. Inspected390px and1440px screenshots. Header remains transparent at top and white after scrolling. Real keyboard Tab gives the occasion action a2px solid focus outline; Enter reaches #occasions below the sticky header. Phone touch on the primary action opens /shop. Reduced-motion preference produces zero hero reveal animations and0s arrow transitions. No runtime exceptions observed. Independent source review found no material cascade/scope issues.

Evidence: temporary gour-hero-intro-report.json and390/1440px screenshots in /private/tmp, plus before-change typography snapshot. No production build, backend tests or auth/cart/payment persistence check was needed for this markup/CSS change. Existing Atlas connectivity limitation remains open.


### 2026-10-01 — Hero overlay verification

Lint passed. Chrome checked320/390/640/768/1024/1200/1440/1920px: hero content overlaps the image area, heading clears navigation, no horizontal overflow, image loads at1400:703 with contain fitting, both links remain at least48px tall and within viewport. Heading/subtitle/action font metrics still match the prior snapshot; PagioRegular actual glyphs confirmed. Original three Signature Add to Cart buttons remain. Phone390px and desktop1440px screenshots inspected; the phone hero intentionally extends onto burgundy to retain the uncropped photo.

Transparent-at-top/white-after-scroll navbar, keyboard focus and Enter to #occasions, phone touch to /shop, and reduced-motion zero hero animations/0s arrow transition passed. No runtime exceptions. Temporary evidence: /private/tmp/gour-hero-overlay-report.json and390/1440px screenshots. CSS-only increment: no new build/typecheck/backend or commerce persistence test; existing runtime limitations remain separate.


## 2026-10-01 — Reference product-card verification

B2C npm run lint and npm run typecheck passed. Independent agent ran node --test B2C/tests/gift-cart.test.cjs:12/12 passed without network/database/provider access. Coverage includes preserving other items/boxes, serialized additions, bounded revision retries,99-item limit, truthful failures, preview/server item mapping and waiting for pending writes before navigation/sign-in.

Chrome checked Home and Shop at320/390/481/600/639/640/641/768/1001/1023/1024/1200/1440px (26 layouts). No horizontal overflow; card widths250–480px, cart pills at least52px high and hearts at least44px. Category text corners fall inside the SVG paper fill, card/curve colours match, descriptions/actions do not overlap and controls remain inside cards. Preview labels and Cormorant product-title family retained. Inspected phone/desktop Home screenshots and a phone candle card. The one-column Shop layout at641/768px is expected beside the sidebar.

Keyboard Space toggles favourites; saved state survives reload and can be removed. Forced storage failure renders a visible error inside the growing card. Isolated browser-only mock cart responses verified a real phone tap, disabled/aria-busy pending state, one confirmed addition preserving existing unrelated items/boxes, visible successful feedback, and503 feedback with retry enabled and no false quantity increment. Real database writes were not used for these UI checks. Product-title navigation and reduced-motion zero reveal animations/0s image transition passed; no runtime exceptions. Independent source review found no material issue.

Temporary evidence: /private/tmp/gour-card-reference-report.json, gour-cards-report.json and Home/Shop/candle screenshots. No production build or live cart/Atlas/payment verification was performed for this scoped presentation change; existing runtime limitations remain open.


## 2026-10-01 — Alternating featured-row verification

B2C npm run lint passed. Isolated Chrome checked320/390/599/600/639/640/768/1024/1200/1440px against a before-change browser snapshot: no page/row overflow, stacked rows below600px, alternating media/copy positions above, all actions at least48px tall and content inside links. Heading/body/action computed font families, sizes, weights, styles, line heights and tracking match exactly. Images, copy and hrefs match; old feature overlay pseudo-elements are absent. Hero gradient strings/text offsets and Signature cart-button count remain unchanged. Inspected390/768/1440px screenshots; independent source review found no material issue.

Real phone touch opened all three expected Shop filters. Keyboard Tab reached the visually reversed candle row, with a2px solid#4A0404 focus outline and6px offset; Enter navigated correctly. Three rows retain exactly three links and zero nested controls. Reduced motion produces zero active section animations and0s image/arrow transitions. No runtime exceptions in the ten-width check.

Temporary evidence: /private/tmp/gour-feature-rows-before.json, gour-feature-rows-after.json, gour-feature-rows-interactions.json and screenshots. CSS-only change: no build/backend/cart-persistence/payment test required or claimed; existing Atlas issue remains separate. Isolated browser closed; existing development services left running.


## 2026-10-01 — Occasion underline verification

B2C lint and PostCSS parsing passed. Isolated Chrome checked 320/390/768/1440px: no horizontal overflow, all six labels fit their headings, pseudo-element widths match label widths, and existing arrow glyphs remain. Real pointer hover over each card image reveals its label underline (scaleX 0 to 1, 350ms, #4A0404); moving away retracts it. Card geometry stays identical between hover states. Keyboard Tab reveals the Weddings underline with focus-visible; reduced motion sets transition duration to 0s. Independent source review found no conflicting reset. Temporary evidence: /private/tmp/gour-occasion-underline-report.json. Browser closed; development services retained. No build/backend tests needed for this span/CSS-only change.


## 2026-10-01 — Hero crossfade verification

B2C lint and TypeScript passed after replacing an effect dependency on frame.current with a destructured activeIndex (the initial lint run reported one exhaustive-deps warning). PostCSS parsing passed. Chrome at320/390/768/1440px compared hero/image bounds, heading/subtitle/buttons geometry, typography and gradient strings with the original static layout reconstructed temporarily in the browser: all match exactly, with no horizontal overflow. The initial baseline helper failed because its wait returned a DOM node instead of a boolean; corrected the helper without changing application behavior.

Real-time browser verification observed all three images and wraparound: incoming opacity between0and1 over an outgoing opacity1 layer, then fully opaque; previous layer clears after the fade. Pause retained the frame beyond a full interval; Resume advanced again. Offscreen hero paused; reduced-motion preference stopped rotation and set transition duration to0s. Phone390px rendered without overflow; desktop/phone screenshots inspected. Blocking one secondary image through browser network interception verified that the remaining two images still crossfade on return to the first photo, covering the review finding. Final evidence: /private/tmp/gour-hero-crossfade-report.json and screenshots.

The first image is server-rendered and alternatives enter the rotation after decode. Hidden-document/focused-shopping-link guards and teardown were source-reviewed; those two pause conditions and JavaScript-disabled mode were not separately browser-tested. The isolated browser was closed and existing development services retained. No production build, live cart/database write or payment test was needed for this hero-only change.


## 2026-10-01 — Collection showcase verification

B2C lint and TypeScript passed. Chrome checked all three tabs at320/390/640/768/959/960/1024/1440px (24 states): no page or heading overflow, one selected/tabbable tab and one visible panel, tabs at least44px high, CTA at least48px high, controls inside the card, and original Pagio24/36/48px heading sizes. Each viewport retains identical height across its three selections after reserving phone panel space. Desktop and phone screenshots inspected.

Keyboard ArrowLeft/Right, wraparound, Home/End and Tab-to-active-CTA passed with a visible paper focus outline. Real phone taps selected every category and reached its original Shop filter. Browser-controlled decode promises verified retaining the complete current selection during a slow load, ignoring stale completion after a newer choice, and displaying Photo unavailable while preserving the selected shopping link after decode failure. Reduced motion removes photo/copy animation. Independent review's loading issue was corrected before these checks.

Evidence: /private/tmp/gour-showcase-report.json, gour-showcase-interactions.json and390/1440px screenshots. Isolated browser closed, development services retained. No production build or backend/commerce mutations for this scoped UI change. Initial patch attempt was rejected atomically for duplicate file operations; corrected the patch format with no partial source change.


## 2026-10-01 — Selected hero asset verification

SHA-256 comparisons confirm all three B2C public assets match the exact root files supplied by the user. B2C npm run lint passed. Local Chrome confirmed only the requested three sources and native dimensions1770×889,1448×1086,1672×941, including the filename containing spaces. Observed rotation0→1→2→0,1600ms incoming transitions over an opaque previous frame, contain fitting and no horizontal overflow at1440px and390px. Isolated browser closed; running application services retained. Temporary verification script: /private/tmp/gour-selected-hero-check.mjs. Existing slideshow guards were unchanged and were not exhaustively retested for this asset-only update; no backend or payment checks were needed.
