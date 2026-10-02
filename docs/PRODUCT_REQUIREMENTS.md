# Product Requirements

Current direction (2026-09-27): user explicitly requests B2C gifting commerce implementation in this repository. Existing public B2B inquiry journey remains the observed baseline, not the target limitation. Earlier documentation-only scope below is historical and superseded for new work by this directive. Follow [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md); do not claim unfinished commerce is live.

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Explicit requirements

2026-09-25: provide whole-project technology/design extraction (completed audit). Initialize and maintain persistent engineering memory before major implementation; preserve continuity, architecture, UI and contracts; record changes and conflicts; never store secrets or invent unknown commercial policies. Maintain lifetime customer identity/history when valid matching exists; implementation gaps tracked in CUSTOMER_SYSTEM.

## Observed product scope (not newly approved requirements)

Main B2B catalogue, occasion-specific gifting pages, box/product curation, enquiry forms, WhatsApp contact and lead analytics. Alternate responsive frontend and dormant ecommerce backend/pages exist.

## Boundaries

Do not activate closed pages, change payment providers, redesign cards, merge frontends, introduce financial models or silently alter order states through memory setup. Exact business tax, shipping, refund, invoice, customer matching and retention requirements remain UNKNOWN. Example diagrams in memory instructions are documentation categories, not evidence that full ecommerce/finance systems exist.

## Acceptance for initialization

Canonical docs describe implemented/disabled/unknown states, cite source paths, preserve audit, record findings and known conflicts, establish session startup/update rules, and provide next priorities. Completed via documentation-only changes.

## Requirement traceability

REQUIRED describes the explicit memory/continuity/historical-integrity requirement; observed features are not newly approved scope. IMPLEMENTED means source exists, PARTIAL means a dependency/consumer/invariant is missing. DEFERRED applies to implementation during this documentation-only task, not an invented historical roadmap. UNKNOWN decisions U01–U12 are owned by [MEMORY_GAP_AUDIT.md](MEMORY_GAP_AUDIT.md). Test references below are source coverage, not passing results.

| ID / requirement and status | Canonical documentation | Database/storage | API | UI/source | Tests |
| --- | --- | --- | --- | --- | --- |
| R01 Preserve reconstructable memory — REQUIRED / IMPLEMENTED |PROJECT_CONTEXT, DECISIONS, MEMORY_GAP_AUDIT; root AGENTS |Repository Markdown |N/A |N/A |Documentation structure/link/hash checks |
| R02 Public gifting catalogue — IMPLEMENTED with divergent catalogues |BUSINESS_LOGIC, UI_SYSTEM |Local data; Product/Category separately |products, categories, gift-boxing |app/page.tsx, CollectionsClientView, OccasionPageTemplate |MISSING frontend/catalogue tests |
| R03 Inquiry and contact — PARTIAL acknowledgement/delivery |USER_FLOWS, INTEGRATIONS, DATABASE |Encrypted inquiries; no User relationship |POST /api/send-inquiry |InquiryModal, CuratedInquirySection, StickyInquiryDrawer |MISSING |
| R04 Real account authentication — PARTIAL gated client |AUTH_SYSTEM, SECURITY |User + refresh hashes |auth/*, users/profile |app/account/page.tsx contains mock fallback |auth.test.js including role-injection regressions; client tests MISSING |
| R05 Coherent lifetime customer history — REQUIRED / PARTIAL |CUSTOMER_SYSTEM, DATA_MODELS |User→Order; complete360 MISSING |orders reads; unified history MISSING |Real lifetime-history UI MISSING, account list static |1000-order/snapshot/access tests MISSING |
| R06 Cart persistence — PARTIAL incompatible consumers |USER_FLOWS, BUSINESS_LOGIC |Zustand/localStorage/IndexedDB; Redis cart |cart/* |useCart/useCartSync; sync only legacy shell |cart.test.js server only; replay/consumer tests MISSING |
| R07 Authoritative checkout — PARTIAL / current client BROKEN |ORDER_SYSTEM, API_CONTRACTS |Order/Product; Redis |POST /orders |Gated checkout ignores clientSecret |order.test.js stock and sequential replay; full flow MISSING |
| R08 Payment integrity — PARTIAL |PAYMENT_SYSTEM, EDGE_CASES |Order.payment, no event ledger |orders/webhook |Stripe browser confirmation MISSING |Webhook/reconciliation tests MISSING |
| R09 Stock conservation — PARTIAL |INVENTORY_SYSTEM, ARCHITECTURE |Product base/variant quantities; BullMQ |orders; products admin updates |Admin stock UI MISSING |Base decrement covered; concurrent variant/release tests MISSING |
| R10 Coupon correctness — PARTIAL |BUSINESS_LOGIC, DATA_MODELS |Coupon usedCount/restrictions |coupons/*; order validation |Gated checkout entry |MISSING |
| R11 Shipment calculation/tracking — PARTIAL fields only |ORDER_SYSTEM |Order addresses/cost/tracking |Order input; carrier/rate APIs MISSING |Address form; delivery promise not validated |MISSING |
| R12 Established tax treatment — UNKNOWN policy / PARTIAL integration |PAYMENT_SYSTEM |Order.tax |Stripe tax via orders, no standalone tax API |Gated checkout estimates |MISSING |
| R13 Invoice lifecycle — FUTURE / REQUIRED design context, implementation DEFERRED |INVOICE_SYSTEM |MISSING |MISSING |MISSING |MISSING |
| R14 Refund lifecycle — FUTURE / REQUIRED design context, implementation DEFERRED |REFUND_SYSTEM |MISSING |MISSING |MISSING |MISSING |
| R15 Financial history/reconciliation — PARTIAL operational / FUTURE formal |FINANCE_SYSTEM |Order totals; financial ledger MISSING |admin/stats; reconciliation API MISSING |No formal finance UI |MISSING |
| R16 Governed admin access — PARTIAL |ADMIN_FLOWS, SECURITY |User.role vs separate PIN/vault |Express admin; Next admin auth/data/export |Gated studio-admin |Role/socket/PIN tests MISSING |
| R17 Lead analytics — IMPLEMENTED with durability/privacy gaps |DATABASE, INTEGRATIONS |Encrypted sessions/section map |telemetry/collect, geo/detect |useSilentTelemetry, LocationPromptBar |MISSING |
| R18 Search discoverability — IMPLEMENTED source / runtime UNKNOWN |SEO, UI_SYSTEM |Local page metadata/data |sitemap.ts, robots.txt, metadata |Public routes and structured data |Rendered SEO tests MISSING |
| R19 Recovery/deployment — UNKNOWN operations / PARTIAL source |DEPLOYMENT, ENVIRONMENT, TESTING |Mongo/Redis/vault dependencies |healthz |offline page; service worker MISSING |health.test.js only; restore/outage tests MISSING |

Sources are relative to frontend_appview/src unless backend/API is named; test suites live under backend/src/features/<domain>/__tests__. Entity field definitions and endpoint request/response tables are canonical in DATA_MODELS and API_CONTRACTS. This matrix links requirements to missing dependencies rather than inventing endpoints or policies.

## Box-first gifting — 2026-09-30

R20 CURRENT / IMPLEMENTED: box-first Signature Edit, freely add draft items, server-private packing limits, cart replacement/multi-box counters and compact responsive spacing. Source: B2C/backend/gifting, database GiftDraft, src/components/BoxCard/GiftBuilder/GiftCart, src/hooks/useGiftDraft. Verification: database/tests/gifting.test.js plus local browser checks. CURRENT / PARTIAL: real saleable inventory, box charges, packing/order snapshots, payment and account merge remain outstanding; draft does not promise order placement.

## Razorpay — 2026-09-30

R21 CURRENT / PARTIAL: Razorpay adapter and hosted Checkout integration for existing priced/reserved orders. Sources B2C/backend/payments and RazorpayCheckout; tests database/tests/razorpay.test.js. Credentials, real test payment, public webhook delivery, pricing/stock/packing quote bridge and recovery dependencies remain open.

R22 (2026-09-30) CURRENT / IMPLEMENTED: mandatory sign-in before checkout, delivery phone/address capture and customer-owned address reuse. Source GiftCart, DeliveryCheckout, account, backend/auth and gifting/routes. Tests database/tests/auth.test.js and gifting.test.js. CURRENT / PARTIAL: gift quote/order/payment bridge still missing; review states this explicitly.

R23 (2026-09-30) CURRENT / IMPLEMENTED: ecommerce layout and animations preserving typography, text sizes, source images and theme. Sources storefront.css, ShoppingRail, StorefrontMotion and home/shop/boxes/product layouts. Verified responsive layouts, keyboard/touch-rail controls, reduced motion, before/after typography/image comparison, production build and lint.

## 2026-09-30 — Signature Edit now showcases items

CURRENT / IMPLEMENTED: latest user direction supersedes the earlier homepage box-first Signature Edit requirement. Homepage now reuses catalogue() and ProductCard for the first three items, item detail destinations, item-focused introduction and View All Items→/shop. Existing preview disclosure/pricing handling preserved; no invented sale prices. Box selection remains available through /boxes and the shop invitation. Existing signature layout, square photo framing,14/12px titles and11/10px descriptions retained.

R24 (2026-09-30) CURRENT / IMPLEMENTED: apply user's pasted product-card design to B2C home/shop while retaining existing fonts/sizes/images/theme. Shared ProductCard/product-cards.css implements rounded portrait photo, supplied curve, category, device-local heart and pill detail/options action. Supersedes previous product-card silhouette and mobile third-card row, retaining R23's other layout requirements. Sample rating/pricing is not business data. Verified responsive rendering, local-save interactions, product navigation, reduced motion, build/lint/TypeScript; no database wishlist or cart mutation added.

R24 refinement (2026-09-30): latest rendered diffuser screenshot supersedes the original code sample where they differ. Product cards now use a descending curve, overlapping panel, larger existing Cormorant title and single-column layout below481px. Surrounding site typography and original imagery/palette remain. Review/price samples are not business data; preview cards keep truthful detail actions.

R25 (2026-09-30) CURRENT / IMPLEMENTED: redesign the homepage gourmet, candles and personalised stationery group. FeaturedEdits.tsx/featured-edits.css supplies aligned desktop photo cards and stationery row, tablet rows and phone stacks, preserving source assets, font scales and existing shop destinations. Responsive screenshots, computed-typography comparison, navigation, reduced motion, build/lint/TypeScript verified.

R26 (2026-09-30) CURRENT / IMPLEMENTED in source, CURRENT / PARTIAL in configured runtime: restore Add to Cart lost during card styling. Known gift items on Home/Shop/detail save through existing GiftDraft, preserving quantities, packaging and checkout sign-in. Supersedes R24's detail-only preview actions. Nine helper tests and isolated database/browser flow passed; current Atlas TLS connection failure prevents configured-runtime persistence. Commerce pricing/order bridge remains unfinished.

R27 (2026-09-30) CURRENT / IMPLEMENTED: latest user request supersedes R25's rounded feature-card presentation. FeaturedEdits now uses asymmetric editorial hierarchy, compact phone image/heading pairs, fine rules, numbered labels and text-link actions. Existing fonts/sizes/images/theme/copy/destinations preserved. Source and responsive verification recorded in UI_SYSTEM/TESTING. Product cards and Add to Cart are outside this layout change.

R28 (2026-09-30) CURRENT / IMPLEMENTED: remove decorative margin/divider lines across the active B2C storefront. Supersedes R27's feature dividers and older B2C decorative row/section rules. Five existing stylesheets updated; control boundaries, keyboard focus, selected-state indications and application flows retained. No B2B frontend changes.

R29 (2026-09-30) CURRENT / IMPLEMENTED: user selected three equal image-led panels with compact copy. Supersedes R27's asymmetric hierarchy while retaining R28's no decorative lines. Equal desktop photo stages and aligned copy/actions; consistent tablet rows and phone panels. Existing font scale, images, palette, destinations and separate product/cart features retained. Sources: FeaturedEdits.tsx/featured-edits.css.

R29 refinement (2026-09-30) CURRENT / IMPLEMENTED: user accepts the layout but requests less competing text. Short titles and descriptions replace long marketing copy; eyebrow labels removed. Preserve font sizes and shared alignment, with clearer whitespace before Occasions. Browser checks at320–1920px and lint passed; source/verification details in UI_SYSTEM and TESTING.

R30 (2026-09-30) CURRENT / IMPLEMENTED in source, CURRENT / PARTIAL in configured runtime: Add to Cart must work for guests and signed-in users, retaining pre-login items through sign-in. Existing browser gift ownership is preserved; pending save/cookie operations serialize and Account redirects await them. Cookie-based APIs do not depend on localStorage. Sources: gift-cart.ts, useGiftDraft.ts, account/page.tsx, api.ts, Header.tsx, backend/auth/app.js. Tests: gift-cart.test.cjs, api.test.cjs, database/tests/gifting.test.js and auth.test.js. Current Atlas TLS failure still blocks actual configured-runtime saves; cross-device account cart merging is outside this increment.


R31 (2026-09-30) CURRENT / IMPLEMENTED: redesign the screenshot's Shop introduction. One cohesive banner combines the existing heading, compact description, original box photo and Build your gift action; phones use a compact photo/action row. Preserves existing font scales, palette, /boxes destination and no-decorative-lines requirement. Source: B2C/src/app/shop/page.tsx, shop.css and storefront.css. Product cards and cart behavior remain separate. Verification: TESTING.


R32 (2026-09-30) CURRENT / IMPLEMENTED: B2C primary brand/action colour must be exact #3c0b1e, replacing the brown override and hardcoded brown accents. Canonical token and consumer corrections in globals.css; no font, layout, image or cart changes. Verification recorded in TESTING.


R33 (2026-09-30) CURRENT / IMPLEMENTED: The Gourmet Signature Edit must use a distinctive elegant non-italic font and centered text. Existing local Pagio Regular400 now renders this heading; header/subtitle/action are centered above items. Other headings, existing font-size scale, burgundy and product/cart components retained. Sources: typography.css/storefront.css; verification in TESTING.


R32 colour refinement (2026-09-30) CURRENT / IMPLEMENTED: latest user request to try #4A0404 supersedes #3c0b1e for current brand/action styling. Canonical token and checkout visual theme updated; Signature typography/alignment retained.


R34 (2026-09-30) CURRENT / IMPLEMENTED: redesign homepage hero and screenshot's gourmet/candles/stationery section. Full-fit hero photography plus inset shopping introduction; three immersive desktop discovery panels and responsive tablet/phone variants. Reuse original imagery/type scales and #4A0404; preserve transparent-before-scroll navigation, no decorative lines, Signature typography and commerce components. Source: page.tsx/globals.css/storefront.css and FeaturedEdits.tsx/featured-edits.css. Supersedes previous hero and R29 feature presentation, preserving its equal desktop weighting. Verification in TESTING.

R35 (2026-09-30) CURRENT / IMPLEMENTED: use Signature Edit's Pagio font for every B2C section heading. Shared typography.css rule covers main page/section h1/h2, with upright Regular400 and existing sizes/alignments. Product-name headings, card labels, body and navigation remain separate. Supersedes R33's Signature-only font exception; Signature centering remains specific to that section.

R35 responsive fit: featured-edits.css keeps landscape panels through1199px so wider Pagio headings fit without shrinking the existing type scale. Three equal desktop columns begin at1200px.

R36 (2026-10-01) CURRENT / IMPLEMENTED: reduce the overly white appearance with warmer backgrounds and existing#4A0404 contrast. Tinted canvas/selected sections plus deep-red footer, with readable muted/hover/focus states. Preserve Pagio/type sizes, original images, light card surfaces, navbar scroll behaviour and application flows. Sources: surfaces.css, layout.tsx import and shop.css muted tokens. Verification in TESTING.

R37 (2026-10-01) CURRENT / IMPLEMENTED navigation, CURRENT / PARTIAL catalogue: replace Personalised with Kids, playful font at the same nav size, each letter a different bright pastel. Header.tsx and kids-nav.css use accessible decorative letters and local licensed Baloo2; Shop filter routes to search=kids. No existing Kids products were established, so empty results remain until user-confirmed assignments are supplied.

R37 refinements: user subsequently removed the background and requested slightly larger Kids text. Current label is transparent and1.2em of the responsive link size; this supersedes the initial exact-size match.


R38 (2026-10-01) CURRENT / IMPLEMENTED: redesign the rejected hero text/action panel. Original headline/copy and actions now form a centered open composition on the warm surface, without the rounded cream card, overlap, eyebrow or repeated promise icons. Preserve existing fonts/sizes, full-fit photography, navbar behavior, #4A0404 and /shop/#occasions destinations. Supersedes R34's hero introduction only; its discovery section remains. Source: B2C/src/app/page.tsx, globals.css, surfaces.css. Verification: TESTING.


R38 placement refinement (2026-10-01) CURRENT / IMPLEMENTED: latest request moves copy/actions onto the hero image, superseding the introduction underneath. Preserve font sizes, full-fit photo and shopping links; phone hero may grow over the existing burgundy background to fit readable copy below navbar clearance. Source: globals.css; verification in TESTING.


R39 (2026-10-01) CURRENT / IMPLEMENTED: shared Home/Shop product cards follow the supplied diffuser reference: tall rounded photo, high-left curved paper content panel descending to the right, category/title/description, independent circular heart, price or truthful preview label, and full-width pill action. Preserve original images, established product fonts and#4A0404; no invented ratings/prices. Card grids retain useful phone/tablet width and existing AddGiftToCartButton/detail-link branches. Sources: ProductCard.tsx, product-cards.css; verification: TESTING.


R38 spacing refinement (2026-10-01) CURRENT / IMPLEMENTED: user requests the hero headline/subtitle slightly higher; scoped24px desktop/tablet and12px phone lift, with other hero geometry preserved.


R38 spacing correction (2026-10-01) CURRENT / IMPLEMENTED: explicit user clarification requires only the text-position change. Original hero gradients restored; headline/subtitle lift retained.


R40 (2026-10-01) CURRENT / IMPLEMENTED: featured gourmet/candle/stationery section must have a different composition from product cards above. Three alternating wide photo/copy rows from600px, photo-above-copy stacks below600px, separate readable copy and circular-arrow actions. Preserve images, typography metrics, theme, links and no decorative lines. Supersedes only R34/R35 discovery-layout details; R38 hero and R39 product cards remain. Source: B2C/src/app/featured-edits.css; verification: TESTING.


R41 (2026-10-01) CURRENT / IMPLEMENTED: animate an underline beneath the six occasion-card labels on hover. Label-width burgundy line also appears on keyboard focus; reduced motion disables its transition. Preserve card layout and links. Sources: page.tsx/storefront.css; verification: TESTING.


R42 (2026-10-01) CURRENT / IMPLEMENTED: hero images smoothly crossfade; user confirmed existing project photos. Three-photo rotation,6-second cadence,1600ms fades, decode-before-display, pause/resume and reduced-motion support. Preserve full foreground images, hero size, text position/fonts, CTA destinations and the corrected gradient. Latest explicit selection limits rotation to root `images/brand/hero.png`, `images/pics/ChatGPT Image Sep 23, 2026, 09_50_14 PM-1.png`, then `images/small_anipics/framee.png`, copied unchanged into B2C/public. Sources: HeroSlideshow.tsx, page.tsx, globals.css and the three copied assets. Verification: TESTING.


R43 (2026-10-01) CURRENT / IMPLEMENTED: redesign the rejected alternating gourmet/candle/paper rows into one interactive photo-and-burgundy collection showcase. Compact category tabs update the photograph and matching copy/CTA; preserve source imagery, shared Pagio/type sizes, theme and destinations. Responsive stacked presentation, keyboard tabs, image-readiness handling and reduced-motion support required. Supersedes R40 presentation; R41 occasion underlines and R42 hero slideshow remain. Sources: FeaturedEdits.tsx/featured-edits.css; verification: TESTING.


R44 (2026-10-01) CURRENT / IMPLEMENTED: Corporate in B2C navigation must open frontend_appview. Header links to the active main homepage in the same tab, with local3000/production canonical defaults and an optional public URL override. Desktop/mobile navigation verified locally. Source: Header.tsx; configuration: ENVIRONMENT.

R45 (2026-10-01) CURRENT / PARTIAL overall: the user's owner/admin operations directive requires a real permission-controlled `/admin` portal in B2C, using existing login/session/Mongo architecture, audited operations, truthful exception-first reporting and complete vertical workflows. The original app's PIN/vault admin is not an authorization model for this portal. The pre-implementation frontend/backend audit identified the path-scoped cookie, staff-without-Customer login constraints, existing guarded database transactions, preview-vs-saleable catalogue split and unavailable provider/business policies; those boundaries constrain the implemented scope.

| Requirement area | Current traceability / scope |
| --- | --- |
| Admin workspace and access | CURRENT / IMPLEMENTED source: `/admin/[[...segments]]`, noindex metadata, client session gate through `/api/v1/auth/admin/session`, exact `/admin` login return, server-permission navigation and API enforcement. No private SSR props or browser role/storage authority. A client403 view is distinct from the initial HTML status. |
| Business overview and analytics | CURRENT / IMPLEMENTED source: explicit currency/timezone/date interval, authoritative needs-attention links, formula/source-labelled payment/order/refund/stock metrics, product-unit results and truthful unavailable states. Revenue recognition remains UNKNOWN pending policy. |
| Read operations and customer360 | CURRENT / IMPLEMENTED source: bounded server lists, supported filters, record details and separately paginated related records for orders, customers, catalogue, inventory, payments, refunds, invoices, coupons, shipping, notifications and audit. Customer/order/invoice snapshots remain historical. |
| Supported commerce writes | CURRENT / IMPLEMENTED source: category/product/variant/coupon creation, supported product/variant/coupon changes, reasoned stock adjustment, and confirmed paid/unfulfilled order → processing. Forms use version checks and idempotency keys; the server validates, authorizes and records mutations. |
| Owner controls | CURRENT / IMPLEMENTED source: reporting defaults and explicit existing-user staff access management. Public registration cannot grant privilege; owner identities are protected. Staff suspension affects account sign-in and is disclosed. Real owner provisioning must use the protected operational procedure, not a seeded production fixture or public form. |
| Refund/cancellation/shipping/notification/invoice fulfilment | CURRENT / PARTIAL: existing records, snapshots and capability reasons are visible. Executable refund, cancellation compensation, carrier/delivery jobs, notification retries and private invoice generation remain unavailable until policy/provider/worker prerequisites are established. No manual payment-success control exists. |
| End-to-end B2C commerce readiness | CURRENT / PARTIAL: the prior gift-draft → saleable-variant/order mapping and tax/delivery/pricing policies remain outstanding. The portal does not convert storefront preview placeholders into inventory or activate those flows implicitly. |
| Verification | CURRENT / IMPLEMENTED checks: full frontend lint, TypeScript, eight admin client contract tests and an isolated production build pass. Backend authorization/transaction and real API/browser checks are tracked in TESTING. Provider consent, payment capture, invoice legality and production deployment are not established by frontend tests. |

Sources: `B2C/src/app/admin`, `src/components/admin`, `src/lib/admin`, `backend/admin` and existing auth/database services. Canonical UI details: UI_SYSTEM; operational/security rules: ADMIN_FLOWS, AUTH_SYSTEM, SECURITY and API_CONTRACTS. This requirement authorizes the scoped operations implementation, not invented business policies, unrelated storefront redesigns, automatic owner grants, dependency migrations or production deployment.
