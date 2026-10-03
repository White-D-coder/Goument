# Current Status

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Working

Documentation initialization is complete; canonical files and references were structurally checked. Application capabilities below are implemented in source, with runtime behavior UNVERIFIED: main catalogue/occasion/inquiry UI, Next internal APIs, Express ecommerce services, Mongo models and Redis cart logic.

## In Progress

B2C incremental implementation. Merged `feature/hampers` into `main` cleanly with `frontend_appview` completely untouched and isolated. B2C home route set to `/b2c` on port 3000. Full-stack running locally with public tunnel active for external device preview (Cloudflare quick tunnel).

## Blocked

Initialization has no blocker. Live integration verification lacks established service/deployment evidence. Tax, shipping, invoice, refund and identity-merging policies remain UNKNOWN for future implementation.

## Known Issues

- S01 signup role escalation corrected locally 2026-09-27. S02–S04 remain open: unauthenticated admin socket room, fallback secrets, permissive CORS.
- EDGE_CASES E01–E08: idempotency/races, variant stock update, shipping/surcharge trust, coupon field mismatch, tax fallbacks, incomplete order snapshots.
- Active UI and backend catalogue can diverge: local data/demo fallbacks are present.
- PAGE_ROUTES_CONFIG flags are not the effective whitelist; `/studio-admin`, `/checkout`, `/account`, `/privacy` and other legacy pages are blocked while associated APIs can remain reachable.
- Health route is `/healthz` or `/api/v1/healthz`; frontend config advertises `/api/v1/health`.
- Main build ignores TS errors; no build/test/Lighthouse/live provider run performed during setup.

## Next Priority

Follow [TODO.md](TODO.md). Priorities are engineering triage based on inspected impact, not a user-approved delivery schedule.

## Deferred

No explicit historical postponement rationale is known. Disabled pages stay disabled until requested. Invoice/refund/finance/Customer360 expansion is not implemented by this setup. Do not treat illustrative workflow examples in the user's memory policy as proof of completed features.

## Memory completeness audit follow-up

Documentation expansion is complete; see [MEMORY_GAP_AUDIT.md](MEMORY_GAP_AUDIT.md) for domain findings, final verification and count definitions. Source capabilities remain runtime UNVERIFIED. New source details, not new production incidents:

- Gated account catches failed auth as local success and renders static orders; S01 was open at audit time and is now corrected in source (2026-09-27).
- Gated checkout ignores Stripe clientSecret and fabricates confirmation on catch. This is not a completed payment flow.
- Local cart IDs/variant/boxing shapes and server response mapping conflict; offline sync is only mounted in legacy MobileShell. No automatic login merge caller found.
- InquiryModal reports success without awaiting the endpoint; endpoint persists before SMTP and can succeed without SMTP configured.
- Vault keeps at most2000 inquiries and5000 sessions, decrypt errors return empty state, and subsequent writes can replace history; no established backup/recovery protocol.
- Queue job defaults, late-payment handling and paid-order side-effect retry gaps now explicit. Eight backend test cases were inspected; no suite executed.

Next documentation work is resolving business-policy U01–U12 and operational ownership with evidence. The 2026-09-27 directive now authorizes incremental B2C implementation; the earlier audit itself did not change code.

## 2026-09-27 — First B2C implementation increment verified

Implemented S01: auth service assigns customer on every public signup, ignoring caller role. Added six regression cases (four HTTP injection variants, direct service bypass and existing-admin authorization), bringing backend coverage to14 tests across4 suites. Existing signup/login/refresh, cart, order and health tests retained.

Verification: pre-fix auth run reproduced5 failures and4 passes in isolated MongoDB. Initial sandbox run could not bind MongoDB port (EPERM); rerun with approved local-server permissions. First full run passed13/14 with a checkout Mongo IX-lock timeout; test setup now waits for registered model/index initialization. Final `cd backend && npm test`:4 suites passed,14 tests passed. Stripe/BullMQ remain mocked in order tests; Redis is mocked, MongoDB is a temporary replica set. No live payments, production data, frontend build, deployment or account activation tested/changed. These results do not verify unresolved payment concurrency or full B2C readiness.

Plan and canonical auth/security/API/customer memory updated. Next: socket admin authorization and real account integration, then catalogue/cart and commerce integrity. Tax/shipping/invoice/refund policy decisions remain UNKNOWN.

## 2026-09-27 — B2C location correction and actual app

User clarified the required implementation directory is `/Users/deeptanubhunia/Desktop/gour/B2C`. Actual Next.js app now lives at B2C/src with its own package/config/assets; backend source lives at B2C/backend. Original B2B frontends remain untouched in this increment. Earlier original-backend signup fix is retained, not reverted.

Implemented B2C home, search/pagination catalogue, product detail/variant selection, API-backed cart with server display data, genuine signup/login/me/logout and paginated order history. Existing products/images provide labelled read-only previews if backend unavailable, with no fabricated prices. Checkout is explicitly unavailable; payment/owner/invoice/refund/finance work remains unfinished. No live credentials copied and no data migrated.

Verified B2C production build, TypeScript and lint; B2C backend16 tests across4 suites passed with temporary MongoDB and mocked Redis/Stripe/BullMQ. Runtime preview is port3001; backend default5002, Redis logical DB1. Real backend/provider connectivity and browser interaction remain unverified. Local dependencies reuse existing installations via ignored symlinks; npm ci supports an independent install. See B2C/README.md for commands/limitations.

## 2026-09-28 — Twenty-collection B2C database layer

CURRENT / IMPLEMENTED under B2C/backend/database: explicit Mongoose connection,20 schemas,79 explicit indexes/26 unique constraints, generated Mongo structural validators, reference/state/snapshot guards, stock/capture/refund/coupon/invoice transaction primitives, cursor-paginated Customer360, bounded owner reporting and repeatable fake development seed. See DATABASE and generated DATA_MODELS for exact scope.

CURRENT / PARTIAL: this module is isolated from existing HTTP controllers; no live gateway, migration, quote calculator, legal invoice/PDF, workers or frontend work. Checkout stays unavailable. Temporary replica-set tests verify DB behavior; live service readiness is not established. Test results are recorded in TESTING.

## 2026-09-29 — B2C reference storefront

CURRENT / IMPLEMENTED: B2C reference-inspired storefront in src/app/page.tsx, globals.css and shared Header/Brand/Footer. Header uses the burgundy-backed monogram at the top and swaps to the company name after scrolling; header is sticky. Occasions use three columns at 761–1100px. Footer matches the B2B storefront structure and style, with links mapped to active B2C routes/search. Browser verified at 851px (sticky brand transition, three-column occasions, four footer columns) and 390px (two-column footer, no horizontal page overflow). Post-change TypeScript check and scoped ESLint passed. Full ESLint still reports the existing `react-hooks/set-state-in-effect` issue in src/app/account/page.tsx; a new production build was not run. Commerce backend integration remains unchanged; preview prices/purchasing stay unavailable when catalogue API is offline.

## 2026-09-29 — Google auth and Atlas integration

Real database-backed auth adapter implemented and running locally against Atlas: connection ping and schema initialization succeeded. Frontend /account includes Google sign-in plus existing email form now wired to new User/Customer persistence and revocable sessions; auth proxy live check returns googleEnabled:false because Google Client ID/Secret are not yet configured. Live Google login has NOT been completed. No fabricated login. Auth test results in TESTING; legacy commerce endpoints remain separate.

## 2026-09-30 — OAuth configuration reload

Google Client ID/Secret were present in the local environment file, but the auth process started before they were added still returned googleEnabled:false. Restarted the identified B2C auth service. Atlas-backed startup succeeded; direct port5003 and frontend port3001 now return googleEnabled:true. Both Google start endpoints return302 to accounts.google.com with browser flow cookie, state, S256 PKCE and callback http://localhost:3001/api/v1/auth/google/callback. No credential values printed. Google browser consent and completed callback/account persistence are still unverified; the user must finish sign-in in their browser. No application code changed.

## Local service recovery — 2026-09-30

User reported ERR_CONNECTION_REFUSED at localhost:3001. Frontend and auth listeners were absent; restarted B2C dev server and auth service. Verified homepage HTTP200 and proxied auth config googleEnabled:true. This incident was local service availability, not evidence of a Google credential rejection. Completed Google browser sign-in remains unverified.

## 2026-09-30 — B2C typography sourced from frontend_appview

CURRENT / IMPLEMENTED: user explicitly requests frontend_appview as the B2C typography authority. B2C/src/app/typography.css copies all8 source type-* classes exactly, font variables and local font declarations. Google font URL/weights now match the source layout (Cormorant300–700 plus italic400; Jakarta300–800). Local Pagio OTF, TropicalScript and DreamAlways assets copied. Active home hero mapped to31/48/60/68px at base/640/768/1024; source serif subtitle16/24px. Section headings24/36/48px, card titles17/19px, body15px/1.7, navigation11.5px and source footer responsive scale/mono labels applied. Google identity button keeps its provider-specific type styling. B2C content/layout/logo retained, with wrapping and tablet menu adjustments for source-sized text. Source files in frontend_appview were not modified.

Verification: production build (including TypeScript) and ESLint passed; script confirmed8 source typography class blocks copied verbatim. No browser-computed typography/visual comparison performed in this increment.

## 2026-09-30 — Hero-backed navbar correction

CURRENT / IMPLEMENTED: home navbar now overlaps hero via a negative margin matching its actual88px desktop/78px mobile height. At home scroll<=40 it is transparent with light links; above40px it becomes solid white with dark links. Hero copy receives matching top clearance. Path-aware solid style keeps non-hero pages readable. Existing logo/wordmark scroll behavior retained; mobile expanded menu uses dark links on its light panel. Previous transparency alone exposed the page background because the header occupied a separate flow row. ESLint and TypeScript passed; browser visual verification pending.

## 2026-09-30 — Box-first gifting and compact spacing

CURRENT / IMPLEMENTED: B2C Signature Edit now shows original signature box photography; /boxes lists all8, selection opens /build. Builder supports59 existing catalogue entries, search/filter, repeated item additions and Mongo-backed draft persistence. /cart shows selected items, alternative box images and +/- quantity controls; changing packaging preserves items. Backend owns the original4/5/4/8/6/4/4/6 capacities; client receives packing status only. Items may exceed packaging while browsing, but checkout-check rejects insufficient packaging. Shared section/form/card spacing reduced; 44px quantity controls, responsive grids and sticky review bar added.

CURRENT / PARTIAL: catalogue entries are selectable gift drafts, explicitly not saleable inventory. Prices/stock/box charges and payment are not established; checkout remains unavailable and no order/reservation/payment is created. Existing legacy commerce cart is preserved at /cart/store. The new browser-owned draft is separate from customer accounts and legacy Redis cart; login merge/cross-device ownership remains unresolved. Existing Google auth paths/cookie scope remain unchanged.

Verification: production build, TypeScript and ESLint passed. Database/auth/gifting suite41 tests passed, including private capacity serialization, exact fit/overflow/mixed boxes, invalid input, owner isolation, origin enforcement, reload persistence and concurrent stale writes. Initial race test found first-save revision ambiguity; corrected to expose stored __v+1 and empty revision0. Local Chrome390px verified overflow → add second box → fit, with no horizontal overflow; all59 item image paths exist. Additional viewport/full-backend checks recorded below when complete.

Final verification: full B2C backend57 tests across7 suites passed (`npm test -- --testTimeout=30000`). Chrome checked /, /boxes, /build, /cart, /account at320/768/1440px: no horizontal overflow or broken loaded images;390px overflow/add-box interaction also passed. Home scrolled navbar computed white. Build and lint passed. Runtime auth/gift service restarted on5003 with guarded Atlas schema install.

## 2026-09-30 — Shop redesign

CURRENT / IMPLEMENTED: Rebuilt B2C /shop with compact editorial heading, original-box invitation linking to /boxes, desktop collection navigation/mobile horizontal links, inline search, three-column desktop/two-column mobile photography and restrained product text. Reuses ProductCard with an optional compact variant scoped to shop; original palette and font families retained. Collection links use existing search semantics (not a new category API). Preview status shown once above the grid; unsupported price sorting hidden in preview mode, live sorting retained. Search, clear, pagination, empty state and product-detail links preserved. No backend, price, stock, cart or payment changes.

Verification: ESLint and TypeScript passed. Local Chrome at320/390/768/1440px showed no horizontal overflow or broken loaded images. Search returned3 beverages, page2 pagination worked and no-match state checked. Visual inspection caught inherited column layout stretching the search row; corrected with an explicit row direction.

## 2026-09-30 — Razorpay gateway adapter

CURRENT / IMPLEMENTED: B2C/backend/payments adds Razorpay REST order creation, timing-safe Checkout HMAC and raw-webhook HMAC verification, provider payment fetch/matching and existing transactional capture integration. Authenticated endpoints use customer-owned immutable priced orders with fully reserved variants; browser amounts are rejected. One stable payment attempt/receipt plus a persistent initialization claim prevents duplicate create calls; ambiguous timeouts require reconciliation. Callback/webhook share one capture identity for exactly-once stock/order/payment/finance effects. New checkout component opens hosted Standard Checkout, handles dismissal/pending/error and reads persistent payment status. Account history links to owned order checkout.

CURRENT / PARTIAL: gift draft→priced/reserved order bridge, real prices/box charges, GST/shipping policy, durable failed-event recovery/reconciliation, reservation expiry and refunds remain pending. Gift-draft payments are not activated. Razorpay keys absent; blank server-only entries added to ignored .env and .env.example. No actual provider charge or public webhook delivery tested. Legacy Stripe preserved. See [payment setup](../B2C/backend/payments/README.md) for official references, routes and failure limits.

Verification: all49 database/auth/gifting/Razorpay tests passed across4 suites. New8 payment cases use temporary MongoDB, real HMAC checks and mocked Razorpay I/O. Production build, TypeScript and ESLint passed.

## 2026-09-30 — Sign-in and delivery checkout

CURRENT / IMPLEMENTED: primary gift cart now requires authenticated checkout; anonymous checkout-check returns401 and UI routes to /account?next=/checkout. Email signup/login and state-bound Google login return to an allowlisted checkout URL. Guest selection cookie survives login; no automatic customer/cart merge or cross-device claim introduced. Direct checkout and existing-order payment401 responses redirect to sign-in.

Authenticated GET /api/v1/auth/gift/checkout returns the browser selection and only the signed-in customer's saved addresses (up to20, newest first), rejecting invalid packing. POST /api/v1/auth/gift/address validates recipient, international phone, street, city/state, postal/country; Indian PIN format is six digits. Uses existing CustomerAddress repository, verifies ownership on edits, rejects caller customerId and unknown fields. Address is saved explicitly to the account; optional empty lines are unset. No identity phone verification, default-address change, customer merge or order snapshot mutation. UI has responsive delivery form, saved-address selection, edit/review and selection summary.

CURRENT / PARTIAL: supersedes the old cart's blanket draft-check message with a real sign-in/address/review journey. Review explains the remaining price/stock/quote blocker; saving an address does not place an order. Gift catalogue-to-saleable-variant mapping, approved box prices/tax/shipping calculation and order/reservation bridge are still required. No fabricated free delivery, tax or payment success.

## 2026-09-30 — B2C ecommerce layout refinement

CURRENT / IMPLEMENTED: homepage discovery layout, mobile shopping rails, staggered reveals and restrained hover motion; shop/box listing alignment and desktop sticky navigation/product image. Existing typography, image assets, palette, full hero image and navbar behaviour preserved. Browser layout/interaction checks across320–1440px and build/lint/TypeScript passed; detailed scope/evidence in UI_SYSTEM. Existing payment/catalogue readiness limits remain unchanged.

## 2026-09-30 — Phone layout revision

CURRENT / IMPLEMENTED: phone homepage now shows full collection/item/occasion grids instead of oversized swipe cards, with a compact hero and shorter feature sections. Previous mobile rail composition is superseded. Typography, source images, theme and desktop composition retained; responsive browser checks and lint/TypeScript passed. See UI_SYSTEM for measured scope.

## 2026-09-30 — Reference product cards

CURRENT / IMPLEMENTED: rounded portrait/curved-edge cards applied to home Signature items and shop, with device-local save hearts and product-detail pill links. Existing fonts, text sizes, image assets and palette retained. New card silhouette supersedes previous flat product styling and mobile third-card row. Responsive/browser interaction checks, build, lint and TypeScript passed. Local saves are not account-synced; existing preview catalogue and payment-readiness limits remain unchanged.

## 2026-09-30 — Rendered card reference revision

CURRENT / IMPLEMENTED: latest product-card screenshot now governs the descending curve, overlapping panel, serif title hierarchy and full-width cards on narrow phones. Supersedes previous product-card typography and two-column presentation below481px. Site-wide fonts/assets/theme and commerce readiness remain unchanged; card preview/detail behavior is retained.

Verification: build/lint/TypeScript and responsive browser/interaction checks passed; detailed evidence in TESTING.

## 2026-09-30 — Homepage feature group

CURRENT / IMPLEMENTED: gourmet/candles now use larger photography and inset text panels; stationery is an aligned compact feature row. Phone/tablet compositions, spacing and circular action buttons redesigned. Existing fonts/sizes/image files/theme and destinations retained. Responsive visual checks, typography comparison, build/lint/TypeScript passed; see UI_SYSTEM for scope.

## 2026-09-30 — Add to Cart restoration and current DB blocker

CURRENT / IMPLEMENTED: Home/Shop gift-item cards and their detail pages now add to the primary gift cart. Queued additions preserve quantities/boxes, update the header after confirmation, handle conflicts/failures and remain consistent when navigating immediately to cart. Nine helper tests, lint, TypeScript, production build and isolated390px browser flow passed.

CURRENT / BROKEN runtime dependency: the configured Atlas connection currently fails server selection with underlying ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR on all three reported servers. Gift draft requests return503 through both direct service and frontend proxy. A fresh read-only connection also failed; root cause beyond TLS connectivity is UNKNOWN, and incorrect credentials/IP access have not been established. Earlier successful Atlas checks are historical. Browser persistence was verified using unchanged auth/gifting routes with temporary MongoDB, not Atlas. No production credentials, TLS settings, orders or existing service processes were changed.

## 2026-09-30 — Frontend connection check

User reported ERR_CONNECTION_REFUSED at localhost:3001. Inspection found the existing B2C Next development process listening on3001. Direct requests to localhost,127.0.0.1 andIPv6 loopback each returned HTTP200; homepage HTML contained Signature Edit and restored Add to Cart. An isolated Chrome load also rendered both successfully without ERR_CONNECTION_REFUSED. The reported refusal was not reproduced, so its cause is UNKNOWN. No server restart or code/config change was needed. This frontend reachability check does not resolve the separate Atlas TLS/persistence blocker above.

## 2026-09-30 — Editorial feature section revision

CURRENT / IMPLEMENTED: gourmet/candle/stationery section rebuilt as an asymmetric editorial spread with a lead photograph, portrait side stories, fine rules and underlined actions. Responsive compositions replace the previous rounded panels; typography/image sources/links preserved. Seven viewport checks and before/after computed typography comparison passed; lint and production build including TypeScript passed. Existing product cards/Add to Cart and the separately tracked Atlas blocker remain unchanged.

## 2026-09-30 — B2C decorative dividers removed

CURRENT / IMPLEMENTED: removed decorative horizontal/vertical rules across homepage/features, navigation/footer, Shop/boxes, account, builder/cart/order and payment presentation. Existing typography, spacing, image assets and cart logic retained; input/control/focus boundaries remain. This supersedes earlier feature-section fine rules. Canonical styling preference recorded in UI_SYSTEM for subsequent work.

Verification for divider removal: final build/TypeScript and lint passed;390/1440px route checks found no overflow/decorative borders in rendered states. Hydrated account form retained input boundaries; navbar scroll colour and keyboard focus passed. See TESTING for runtime-state limits.

## 2026-09-30 — Equal feature panels

CURRENT / IMPLEMENTED: selected three-panel layout is applied to gourmet/candles/stationery, with equal image widths/heights and aligned desktop text/actions. Short descriptions and consistent responsive patterns replace the rejected asymmetric spread. Typography, images, palette and line-free presentation preserved. Final build/TypeScript and lint passed; seven viewport checks confirm no overflow, matching desktop alignment and unchanged computed typography. Cart/payment behavior unchanged.

## 2026-09-30 — Repeated gift-draft503 diagnosis

CURRENT / BROKEN: direct auth service5003 and frontend proxy3001 both return503 for GET /api/v1/auth/gift/draft; their auth/config endpoints return200. A fresh read-only connection using the current local configuration also fails its MongoDB ping. SRV DNS resolves three nodes, all node IPv4 lookups resolve and TCP connections succeed. Certificate-verifying TLS with SNI fails on all three nodes with ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR; explicit TLS1.2 also fails (two TLS alerts, one timeout). Node22.12.0/OpenSSL3.0.15+quic was used. This narrows the failure to the secure database connection, not a refused frontend port; it does not establish whether Atlas access configuration or the intervening network causes it.

UNKNOWN / EXTERNAL CHECK PENDING: asked the user to confirm the current application's public IP has an Active Atlas IP access-list entry. No Atlas management integration is available in this session. No configuration, credentials, schema, application code or running service changed. Existing generic error handling calls gift failures a sign-in outage; this message is misleading, not proof of an authentication failure.

## 2026-09-30 — Feature text clarity

CURRENT / IMPLEMENTED: retained the approved three-panel layout and reduced text competition with short category headings, single-sentence descriptions, removed eyebrows and clearer separation before Occasions. Fonts/sizes, images, palette and actions retained. Lint and eight-width browser checks passed; seven-width computed typography/image/link comparison found no preservation differences. Existing Atlas blocker remains open and separate.

## 2026-09-30 — Guest/signed-in cart continuity

CURRENT / IMPLEMENTED in source: guest and signed-in gift additions retain one browser-owned selection through registration, password login and Google callback. Shared queue now includes builder/cart cookie reads and writes; Account waits before sign-in/checkout navigation, reports unconfirmed saves and cancels late redirects after unmount. Auth/gift APIs work without legacy localStorage; transient errors retain the last confirmed badge count and gift failures have cart-specific wording. No model/ownership/checkout-authentication change.

Verified:15 client tests,21 auth/gift database tests, lint, TypeScript and build passed. Seven isolated phone-browser scenarios passed, including retained items/boxes through signup/password/Google callback, signed-in additions, delayed/failed saves, leaving Account, storage denial and first-cookie ordering. Tests use disposable MongoDB and mocked Google provider exchange. CURRENT / BROKEN configured runtime remains the Atlas TLS connection; fresh ping fails and final direct/proxied draft GETs still return503. No live cart persistence/Google consent success claimed and existing5003 process has not loaded the new error wording pending a healthy restart.


## 2026-09-30 — Shop introduction redesign

CURRENT / IMPLEMENTED: replaced the disconnected Shop heading/box invitation with one photo-and-copy banner and a clear Build your gift action. Compact phone composition retains the original font scales, image, palette and /boxes destination. Product/cart behavior is outside this presentation change. Existing Atlas connectivity blocker remains open; this work does not establish live cart persistence.

Verification for Shop introduction: lint/TypeScript passed; twelve viewport/boundary checks, eight-width typography/image preservation, keyboard /boxes navigation, search and reduced motion passed. Details in TESTING.


## 2026-09-30 — Brand colour correction

CURRENT / IMPLEMENTED: fixed the later brown CSS override and hardcoded brand accents; B2C primary actions, announcement and solid-header accents now share exact #3c0b1e. No application flow or persistence changes.

Colour verification: lint passed; Home/Shop/Account at390/1440px render the exact burgundy in primary, hover and focus states. Header scroll behaviour and responsive fit checked. See TESTING.


## 2026-09-30 — Signature heading update

CURRENT / IMPLEMENTED: Signature Edit uses upright Pagio Regular with a centered heading/subtitle/action above the items. Six-width browser checks confirm actual Pagio glyph rendering, normal style, centered geometry and no overflow; lint passed. Other section headings and brand colour retained.


### 2026-09-30 — Deep red preview

CURRENT / IMPLEMENTED: brand/action colour changed to user-requested #4A0404; checkout theme source matches. Signature heading remains centered upright Pagio.


## 2026-09-30 — Hero and featured discovery layout

CURRENT / IMPLEMENTED: hero photo now leads into an inset cream introduction with desktop split copy/actions and compact phone layout. Gourmet/candle/stationery features are immersive full-photo panels with gradient-backed text and one clickable area each. Existing photo assets, responsive font scales, Signature Pagio heading, product/cart components and #4A0404 retained. Runtime cart/Atlas limitations remain separate.

Verification: lint, TypeScript and production build passed; eight-width browser/font checks, phone touch destinations, keyboard focus and reduced motion passed. See TESTING for evidence and initial automation timing limitation.

## 2026-09-30 — Consistent section-heading font

CURRENT / IMPLEMENTED: main B2C section/page headings share the Signature Edit's upright Pagio Regular400 via typography.css. Sizes, alignment and #4A0404 remain; product names, body, navigation and footer fonts are separate. No commerce behavior changed.

Discovery panels use the existing landscape treatment below1200px to fit the wider typeface at its original size.

Verification: lint and85 visible heading comparisons across five widths passed, plus feature breakpoint checks. Actual Pagio glyph rendering confirmed; details and runtime limits in TESTING.

## 2026-10-01 — Warmer background treatment

CURRENT / IMPLEMENTED: warm tinted canvas, rose Signature/Story/Shop introduction, soft assurance band and#4A0404 footer replace the predominantly white presentation. Light card surfaces, Pagio headings, font sizes, photos and commerce components retained. Footer hover/focus and muted text colours account for their new backgrounds. Existing Atlas blocker remains separate.

Verified lint/CSS parsing, phone/desktop style preservation, responsive fit, footer contrast/focus/hover and unchanged navbar scroll treatment; evidence in TESTING.

## 2026-10-01 — Kids navigation entry

CURRENT / IMPLEMENTED: Kids replaces navbar Personalised, using a playful local Baloo font, four pastel letter colours and the existing responsive navigation size. Kids filter is reachable in Shop and mobile navigation closes after selection. CURRENT / PARTIAL: no Kids products are currently mapped; existing empty results remain truthful. Actual product assignments await user input.

Latest refinements: Kids background removed and label enlarged to1.2em of the responsive link size at user request.


## 2026-10-01 — Hero introduction simplified

CURRENT / IMPLEMENTED: rejected rounded cream hero panel replaced by a centered warm introduction beneath the full-fit photo. Headline, short copy and two actions remain; duplicate eyebrow/promises removed. Pagio/type sizes, navbar scrolling and commerce components preserved. Lint, TypeScript, eight-width browser checks, touch/keyboard navigation and reduced motion passed. See TESTING; existing Atlas connectivity limitation remains separate.


Hero placement refinement (2026-10-01) — CURRENT / IMPLEMENTED: text/actions now overlay the photo instead of occupying a separate warm section underneath. Phones extend the same burgundy hero to fit copy while keeping the full image. Lint, eight-width typography/fit comparisons, navbar states, keyboard/touch destinations and reduced motion passed; no commerce changes.


## 2026-10-01 — Reference product-card styling

CURRENT / IMPLEMENTED: Home/Shop cards now match the supplied descending white-panel shape, rounded imagery, subtle shadow and full-width burgundy cart action. Intermediate-width grids avoid cramped cards. Existing cart/favourite handlers and truthful preview/pricing states retained. Lint, TypeScript,12 isolated cart tests and26 browser layout checks passed; wishlist persistence and mocked cart pending/success/failure UI verified. Existing Atlas/runtime readiness limitations remain separate.


## 2026-10-01 — Featured categories use alternating rows

CURRENT / IMPLEMENTED: replaced three immersive category cards with alternating wide photo/copy rows; phones stack each photograph above compact copy. Preserved fonts/sizes, assets, shopping links and existing hero/product cards. Lint, ten-width browser comparisons, phone taps, keyboard navigation and reduced-motion checks passed. See UI_SYSTEM/TESTING; commerce/runtime status and TODO priorities are unchanged.


## 2026-10-01 — Hero slideshow

CURRENT / IMPLEMENTED: hero now crossfades between the original photo and two existing Gourmet gifting photographs. Fixed copy/gradients and full-fit foregrounds retained, with pause/resume, reduced-motion and visibility guards. Lint, TypeScript, CSS parsing, four-width geometry comparisons and browser playback/failure-fallback checks passed. No commerce/runtime-service change; priorities unchanged. Details: UI_SYSTEM and TESTING.

Latest asset selection (2026-10-01): only the three user-specified root images (brand/hero.png, pics/ChatGPT Image Sep 23, 2026, 09_50_14 PM-1.png, small_anipics/framee.png) now rotate in that order. Earlier alternate-photo choices are superseded; slideshow behavior is retained.


## 2026-10-01 — Collection showcase replaces alternating rows

CURRENT / IMPLEMENTED: featured categories now share one interactive photo/burgundy panel with Gourmet/Candles/Paper tabs. Responsive layout, keyboard focus, decoded-image selection and unchanged shopping destinations verified. Lint/TypeScript and24 browser layout states passed, plus touch/loading/failure/reduced-motion checks. See UI_SYSTEM/TESTING; commerce-service status and TODO priorities remain unchanged.

## 2026-10-02 — Local MongoDB replica set & owner provisioning

CURRENT / IMPLEMENTED: resolved Atlas network timeout by launching local MongoDB replica set (rs0 on port 27017) with transaction support. Provisioned two OWNER identities (keyursatra@gmail.com and Deeptanubhunia0@gmail.com) with bcrypt hashes, full owner permissions and audit log entries via `B2C/backend/admin/setup-owners.js`. Started B2C auth service on port 5003; verified `/api/v1/auth/config`, `/api/v1/auth/gift/count`, `/api/v1/auth/login` and `/api/v1/auth/admin/session` returning 200 OK.

## 2026-10-02 — Catalogue replacement with 36 master items & 6 gift hampers

CURRENT / IMPLEMENTED: completely replaced previous catalogue across B2C backend and storefront. Replaced `B2C/backend/gifting/items.json` and `B2C/src/lib/catalogue-preview.ts` with the 36 unique items (Tea, Strainer, Japanese Cup, Brass Spoon, Sugar Packets, Filter Coffee, Mug, Small Brass Spoon, Bhujia, Chocolates, Cookies, Sweets, Envelope Bookmarks, Designer Copper Bottle, Eco Friendly Journal, Good Pen, Video Game, Brick Game, Orange Candies, Eclairs, Kinder Joy, Hotwheels, RC Car, Reynolds Trimax, Mini Diary, iPod Music Player, Bookmarks, Shagun Envelopes, Thank You Cards, Announcement Cards, Gift Boxes, Fridge Magnets, Diary Pen Sets, Cool Stickers, Sustainable Diary+Bottle+Pen, Scented Candles) plus the 6 curated Gift Hampers (Tea Set, Coffee Set, Diwali Celebration OG Hamper, Generation Set Aesthetic, Childhood Hamper, Japanese Crockery Set).
Seeded all 42 products, categories, variants, and inventory records into local MongoDB. All 12 gift-cart tests, TypeScript, 96 database tests, and production build passed.


