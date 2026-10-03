# Decisions and Conflicts

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## DECISION-001

Date: 2026-09-25

Decision: Use repository /docs as persistent engineering memory with root AGENTS.md startup/update instructions.

Reason: Explicit user request. Chat context alone is insufficient.

Status: ACTIVE

Affected systems: All project domains and future implementation tasks.

## DECISION-002

Date: 2026-09-25

Decision: Preserve PROJECT_TECH_DESIGN_AUDIT.md and its Word export as dated evidence; canonical domain docs reference exact inventories rather than replace them blindly.

Reason: Existing useful extraction; avoid parallel competing design inventories.

Status: ACTIVE

Affected systems: UI, tech stack, SEO, assets, documentation.

## DECISION-003

Date: 2026-09-25

Decision: Distinguish source implementation, required invariants, disabled surfaces and UNKNOWN runtime/policy facts. This initialization changes documentation only.

Reason: Source contains incomplete commerce/admin flows; user prohibits inventing business rules or starting features before memory setup.

Status: ACTIVE

Affected systems: Auth, customers, orders, money, deployment, testing.

## Observed architecture, rationale UNKNOWN

MongoDB/Mongoose, Stripe, two frontends, encrypted local analytics vault and closed page whitelist are current source choices, not newly ratified architectural decisions. Original reasons/dates and previously rejected approaches are UNKNOWN. Do not invent history.

## CONTEXT CONFLICT C01 — README fonts

Template READMEs claim Geist through next/font. Main layout loads Cormorant/Jakarta with a Google stylesheet; alternate uses those plus Playfair/local fonts. Action: follow actual source for current behavior; retain README as template and flag mismatch rather than silently assume Geist.

## CONTEXT CONFLICT C02 — Page flags vs whitelist

Config comments say enabled flags control pages. isPageRouteActive actually uses hardcoded whitelist. Action: document whitelist as current behavior; resolve intended control mechanism before changing route availability.

## CONTEXT CONFLICT C03 — Desired integrity vs current implementation

User asks persistent identity/historical accuracy and reliable financial behavior. Current schema lacks full product snapshots/Customer360; money paths have E01–E08 gaps. Action: record unmet requirements; do not describe them as delivered or make money-policy assumptions.

## CONTEXT CONFLICT C04 — Comments vs runtime paths

Socket comment says verified admins but listener has no auth; Redis log mentions offline cache fallback but no functional non-test memory fallback exists. Tax order comment says5% fallback while breaker can supply0. Action: source expressions are current evidence; track defects instead of trusting comments.

## History rule

Never delete historical decisions. Supersede an old decision with a dated new entry, explicit rationale, affected systems and status. Rejected approaches must include actual evidence; no prior rejected attempts are known from this initialization.

## DECISION-004

Date: 2026-09-25. Status: ACTIVE.

Decision: Preserve the pre-expansion gap baseline; expand existing canonical files with per-relationship, per-state and per-endpoint detail and a requirement traceability matrix. Use CURRENT / IMPLEMENTED, CURRENT / PARTIAL, CURRENT / BROKEN, FUTURE / REQUIRED, FUTURE / OPTIONAL and UNKNOWN explicitly.

Reason: User requested reconstruction accuracy rather than line count and explicitly prohibited feature implementation. Future architecture records required responsibilities without approving schemas, transitions, financial rules or activation. Source inspection corrected incomplete validator excerpts and configuration/test-coverage wording.

Affected systems: All35 audit domains. [MEMORY_GAP_AUDIT.md](MEMORY_GAP_AUDIT.md) owns countable MC01–MC10 conflicts and U01–U12 unknown decisions; C01–C04 above are preserved historical groupings, not additional counted conflicts. Account/inquiry discoveries were added after baseline rather than rewriting it. No application fixes or historical business decisions were fabricated.

## DECISION-005 — B2C direction and signup trust boundary

Date: 2026-09-27. Status: ACTIVE. Context: user authorizes incremental B2C implementation, superseding the documentation-only execution scope in DECISION-003/004 while preserving their evidence/continuity rules.

Decision: retain existing stack/UI and first fix public signup privilege assignment at the service boundary. Ignore caller role and always create customer; do not change existing stored staff roles. Implementation plan owns dependency order; commercial-policy UNKNOWNs block only dependent paths.

Reason: admin APIs rely on DB role; public assignment undermines all owner/customer separation. Alternatives considered: rejecting role with400 (unnecessary response-contract change), stripping only at HTTP validation (direct service bypass), new RBAC schema (not required for this defect). Consequence: signup can no longer provision administrators; provisioning and additional staff roles need a separate governed design. Existing potentially misprovisioned accounts need operator review, not automatic demotion.

Affected systems: signup/token creation, protected admin access, auth regression tests and canonical docs. No schema/UI/payment/deployment change.

## 2026-09-28 — Isolated B2C MongoDB implementation

Status: CURRENT / IMPLEMENTED (DB layer), CURRENT / PARTIAL (commerce integration).

- Choose Mongoose already present in B2C. Rejected Prisma/Mongo for this task because it adds a separate generated client and contract migration; rejected native-driver primary DAL because guards/validation would need duplication. Driver commands through Mongoose remain administrative only.
- The user asked for a greenfield 20-collection schema while existing controllers consume six incompatible legacy models. Resolve by explicit new connection under B2C/backend/database; do not silently swap live model contracts. Legacy API integration/migration is FUTURE / REQUIRED.
- Preserve minor-unit snapshots; global SKU uniqueness makes productId+SKU uniqueness redundant. Customer contact matching stays nonunique pending merge policy; optional customer.userId remains unique.
- One coupon redemption and one invoice per order are explicit v1 implementation limits, not confirmed permanent business rules. Multiple payment attempts, shipments and refunds are supported structurally.
- Coupon rates use integer basis points; fixed discounts use minor units and currency. Pending refunds reserve capacity using a shared payment write. Coupon counter writes serialize concurrent usage checks. Inventory state derives from quantity and explicit threshold.
- Freeze category parent after creation, financial snapshots at creation, invoice identity at issuance; no cascade deletion or implicit retention. Future changes require a tested migration/policy.
- Mongo JSON Schema is a structural backstop. Application transitions/references/append-only behavior require the DAL, transaction entry points and trusted deployment credentials; no claim of universal protection from arbitrary native writes.

## 2026-09-29 — B2C reference storefront

CURRENT / IMPLEMENTED: user screenshot supersedes prior B2C homepage styling for this task. Reuse original monogram and existing product assets; preserve real catalogue data and truthful unavailable/preview behavior. Do not invent commercial prices, delivery thresholds, reviews or mailing-list integration from a visual reference. Reference sections without verified data use brand copy and existing account navigation.

## 2026-09-29 — Google auth and Atlas integration

CURRENT / IMPLEMENTED: wire Google and email authentication into the new schema using a small standalone auth adapter, avoiding unrelated Stripe/Cloudinary/Redis startup requirements and legacy-schema mutation. No email-only automatic provider linking or legacy migration. Use persistent opaque sessions rather than introducing a second ORM/auth database. Keep session digests bounded in users (no extra collection). Choose seven-day sessions as technical default. Process-local OAuth state supports current single-instance local run only. Legacy cart/login merge and checkout integration remain explicit follow-up work.

## Box-first gifting — 2026-09-30

CURRENT decision: user explicitly requests box-first Signature Edit and backend-private capacity with packing decisions deferred until cart. This supersedes earlier Signature Edit product-card content (shared product cards still used in /shop). Reuse source box catalogue/capacity rules; separate selectable draft catalogue from saleable stock because current source has no verified inventory/pricing. New GiftDraft avoids corrupting ProductVariant-based Cart or silently linking new Google identities to legacy users. Browser session owns draft; account merge/retention remain unresolved. No payment enabled. Minimal unframed cards and existing fonts retained; reduce spacing instead of adding decoration.

## Razorpay — 2026-09-30

CURRENT: User explicitly requested Razorpay for B2C. Integrate with isolated Order/Payment domain; preserve legacy Stripe. INR amounts from trusted persisted quote only; stock must already be reserved. Do not invent gift prices/box costs/tax/shipping. Frontend draft remains non-payable until upstream quote setup. Uncertain remote-create outcome requires reconciliation instead of a new receipt.

## 2026-09-30 — Checkout requires customer sign-in

CURRENT / IMPLEMENTED, explicit user requirement: browse/build remains guest-capable; continuing to checkout requires a real session, then delivery details saved under that customer. Supersedes anonymous gift checkout-check behavior. No merging browser draft ownership into customer identity; no invented saleable prices. Affected auth return paths, gift API, cart and checkout UI. Payment availability remains conditional on trusted priced/reserved orders.

## 2026-09-30 — Layout-only ecommerce direction

ACTIVE / IMPLEMENTED. User explicitly authorized ecommerce layout/animation redesign while prohibiting font, text-size, image and colour-theme changes. Preserve typography.css and source imagery; use a separate storefront.css for composition and native progressive motion. Supersedes earlier homepage section composition, retaining full-image hero and requested section bottom padding. Shopping actions continue existing destinations; no simulated purchases or additional payment scope.

## 2026-09-30 — Signature homepage content change

ACTIVE: user now requests items instead of boxes in The Gourmet Signature Edit. SUPERSEDED: earlier box-first homepage showcase only. Existing box-builder/cart packing mechanism remains unchanged. Reuse shared catalogue/product cards and link View All Items to shop.

## 2026-09-30 — Pasted card reference supersedes minimal card silhouette

CURRENT / IMPLEMENTED: user's latest product-card reference authorizes rounded cards, portrait photography, a curved content edge and pill actions, superseding the earlier minimal unframed product-card styling and phone third-card row. Preserve established fonts/sizes, assets and palette from the preceding user constraint. Use real category/price data and existing product destinations; omit sample reviews and prices. Heart is explicitly device-local bookmarking because no account wishlist contract exists. No cart, order, payment or database changes. Affected home/shop ProductCard, catalogue presentation mapping and product-cards.css.

## 2026-09-30 — Rendered screenshot is the product-card visual authority

CURRENT / IMPLEMENTED: user reiterated the desired design using a rendered diffuser card. SUPERSEDED: the previous symmetric wave, small sans product titles and two-column narrow-phone card presentation. Match the descending curve and editorial serif hierarchy using already-loaded Cormorant/Jakarta, retaining product photos and brand palette. This revises card-specific font sizes/family assignment only; broader site typography constraints remain. Single-column cards below481px preserve readable reference proportions. Existing product destinations and truthful preview status remain; no commercial/review data invented.

## 2026-09-30 — Cohesive homepage feature edit

CURRENT / IMPLEMENTED: latest user request authorizes redesign of the gourmet/candle/stationery group. Supersedes earlier feature-pair/paper-feature layout only; use one FeaturedEdits group with matched gutters, photo/copy panels and touch-sized discovery links. Keep original typography scales, source imagery, copy, colour theme and search destinations. Product cards, hero, authentication and commerce remain outside this increment.

## 2026-09-30 — Restore Add to Cart after card redesign

CURRENT / IMPLEMENTED: the user reports lost Add to Cart functionality. SUPERSEDED: the detail-only action for known gift-catalogue preview items in the earlier card redesign. Missing sale prices do not prevent saving an existing gift selection. Restore Home/Shop and item-detail actions through the existing browser-owned GiftDraft API; retain image/title detail links and the requested card design. Explicit giftItemId maps the59 matching source catalogue IDs, without guessing a live ProductVariant mapping. Live product option/legacy bag behavior remains separate.

Serialize complete read/write additions, including first-cookie creation. Preserve selected boxes and unrelated items; retry only an explicitly rejected409 once against fresh state. Do not retry ambiguous writes or show success before server confirmation. Cart loading waits for pending additions, and header count discards stale responses. Payment/stock/customer ownership contracts are unchanged.

## 2026-09-30 — Editorial hierarchy for feature stories

CURRENT / IMPLEMENTED: user rejects the previous paired rounded cards as insufficiently elegant. SUPERSEDED: the earlier feature-only rounded/inset-panel composition. Give gourmet the lead and place candle/stationery stories alongside it with portrait photography, fine dividers and text links. Preserve established typography, copy, image assets and palette; change composition at1200/640px instead of shrinking the existing font scale. The separate product-card design and restored cart actions remain intact. Affected files: B2C/src/components/FeaturedEdits.tsx and src/app/featured-edits.css.

## 2026-09-30 — No decorative margin lines in B2C

CURRENT / IMPLEMENTED: user explicitly rejects margin/divider lines throughout the active project. SUPERSEDED: fine divider rules and permanently underlined feature actions from the immediately preceding editorial revision, plus older B2C section/row separators. Apply consistently across B2C frontend styles, using the existing whitespace and surfaces for hierarchy. Preserve functional control boundaries and accessible focus indicators; no application flow changes. Original frontend_appview/frontend_responsive remain separate from the active B2C implementation.

## 2026-09-30 — User-selected equal feature panels

CURRENT / IMPLEMENTED: after rejecting the asymmetric composition, user selected “3 equal image-led panels — balanced row, compact copy.” SUPERSEDED: dominant gourmet image and smaller candle/stationery stories. Use equal columns/image heights and shared content alignment on desktop, consistent category treatment at smaller widths. Shorten supporting copy and remove indices; preserve fonts/sizes/images/theme and the no-divider-lines preference. Full-width slider and alternating banners were offered but not selected.

### 2026-09-30 — Reduce competing feature text

CURRENT / IMPLEMENTED: user approves the panel composition but reports text clash. Retain that layout and the typography-size invariant; shorten marketing headings/descriptions, remove redundant eyebrows and increase separation before Occasions. SUPERSEDED: the prior four text layers and forced gourmet title wrapping. Affected files are FeaturedEdits.tsx and featured-edits.css; commerce, navigation and product cards are outside this correction.

## 2026-09-30 — Preserve the cart across authentication

CURRENT / IMPLEMENTED: user explicitly requires guest/signed-in Add to Cart and retention of pre-login items. Keep existing b2c_gift ownership through auth, rather than introducing an unrequested account/customer merge. Fix pending-write navigation and late cookie-response races using a shared queue; block sign-in navigation on an unconfirmed in-flight save and cancel delayed redirects after Account unmounts. Remove legacy storage dependence from cookie-owned APIs; retain last confirmed badge count during an outage. SUPERSEDED: immediate Account redirects and generic sign-in messaging for gift-route failures. Atlas recovery remains necessary for configured-runtime saves; temporary tests must not be represented as Atlas success.


## 2026-09-30 — Unified Shop introduction

CURRENT / IMPLEMENTED: user rejects the Shop introduction shown in their screenshot. SUPERSEDED: disconnected heading plus small box invitation card. Group the heading, shorter copy and a single box-building action, with the existing box photograph as the banner visual; keep fonts/sizes/theme and line-free styling. Initial inset, rotated-photo treatment was replaced after visual review because it retained a small isolated image and excess empty space; the final desktop treatment uses a full-height photo. Shortened the CTA to Build your gift after320px inspection found the longer label wrapping. Affected systems: B2C Shop presentation only; no auth/cart/backend contracts changed.


## 2026-09-30 — Burgundy colour is explicit

CURRENT / IMPLEMENTED: user's explicit #3c0b1e requirement takes precedence over prior screenshot-derived brown accent choices. SUPERSEDED: #401c19 brand override and separate brown announcement/navigation/button/footer accents. Use the single existing --wine token throughout brand/action states, including primary-button hover; retain neutral surfaces and product photography. Source change confined to B2C/src/app/globals.css.


## 2026-09-30 — Signature heading font exception

CURRENT / IMPLEMENTED: explicit user request authorizes a font-family change only for The Gourmet Signature Edit, with normal upright styling and centered alignment. Choose already-bundled Pagio Regular400; no new font service or dependency. SUPERSEDED for this heading: Cormorant300 and the left desktop introduction. Preserve current responsive font sizes and other heading styles. Source: B2C/src/app/typography.css and storefront.css.


### 2026-09-30 — Revised brand colour trial

CURRENT / IMPLEMENTED: explicit user choice to try #4A0404 supersedes the earlier exact #3c0b1e requirement for the current preview. Update the existing brand token and matching checkout theme only; no payment-flow change.


## 2026-09-30 — Hero and discovery redesign

CURRENT / IMPLEMENTED: latest user request supersedes the preceding open feature-photo/copy layout and hero text overlay. Keep three equal desktop feature panels, but integrate copy over imagery with sufficient dark backing and one accessible link per panel. Use a cream hero introduction overlapping the lower edge of the complete-ratio photo so product branding and copy have separate emphasis. Preserve explicit full-fit hero, transparent-before-scroll/white-after-scroll navbar, no-decorative-lines, #4A0404 theme and existing typography-size requirements. This is a layout-only exception to the previous section compositions, not authorization to change Signature cards or commerce behavior.

## 2026-09-30 — Pagio across section headings

CURRENT / IMPLEMENTED: user explicitly extends the Signature Edit font to every section heading, superseding its prior font-family-only exception. Reuse bundled Pagio Regular400 for main B2C page/section headings and normalize nested italic emphasis. Preserve responsive sizes and current alignment; this request does not authorize centering every heading or changing product-name/body/navigation typography. One shared rule in typography.css avoids changing --font-cormorant, which has unrelated consumers.

Verified fit correction: the first font pass clipped Personalised Paper at1024px. Keep its48px heading and extend the existing landscape feature treatment through1199px; three equal columns start at1200px. This resolves the observed font-width issue without reducing sizes or splitting words mid-word. Source: featured-edits.css.

## 2026-10-01 — Reduce white surfaces

CURRENT / IMPLEMENTED: explicit request authorizes warmer background treatment while retaining the established deep-red brand and typography. Use a separate canvas token instead of changing --paper, whose consumers include product-card curves and foregrounds on dark images/buttons. Add rose Signature/Story/Shop surfaces and a deep-red footer, with darker muted copy and visible footer hover/focus. Supersedes prior white-footer/paper-canvas styling in B2C only. No commerce, auth or asset changes; source is surfaces.css, its root-layout import and Shop muted-token replacements.

## 2026-10-01 — Kids replaces Personalised in navigation

CURRENT / IMPLEMENTED: user explicitly requests Kids in the third navbar slot, a playful font at the same navigation size and different bright pastel letters. Reuse the existing search route with search=kids, replacing the stationery destination. Use local Baloo2 Bold700 with an open licence; a small brand-colour badge provides contrast for pastel letters on the white scrolled/open menu. Preserve heading fonts and nav centering. Catalogue audit found no established Kids products; use the truthful empty result until the user supplies item/category assignments. This does not authorize relabelling unrelated products or changing stock/prices.

2026-10-01 refinement — CURRENT / IMPLEMENTED: explicit request to remove the Kids background supersedes the burgundy badge choice. Preserve the requested pastel letters and font/size; remove only the fill.

2026-10-01 size refinement — CURRENT / IMPLEMENTED: latest request to enlarge Kids supersedes its original same-size constraint. Use1.2em so the modest increase follows the existing responsive navigation scale.


## 2026-10-01 — Simplify the rejected hero panel

CURRENT / IMPLEMENTED: latest user rejection supersedes the September30 hero's overlapping cream card and split headline/action composition. Use an open centered introduction on the existing warm surface token, reducing competing elements by removing its eyebrow/promises. Keep the original headline/copy, upright Pagio, existing responsive sizes, full-fit photo, deep-red theme and shopping destinations. This decision affects the hero only; approved featured panels and commerce components remain separate. Replaced existing scoped CSS rather than adding another competing override; removed the later hero shadow in surfaces.css.


### 2026-10-01 — Hero placement correction

CURRENT / IMPLEMENTED: user requested moving the rejected text block “hero ke uper.” Implemented as an overlay on the hero image; optional clarification offered overlay versus a separate section above, with no answer received during implementation. This supersedes the preceding below-image introduction. Preserve full-fit photography and type sizes by allowing the shared hero grid to grow on phones over the existing burgundy background, rather than cropping the photo to force all copy into its short natural height. Light copy and a gradient provide readable foreground contrast. Scope remains presentation only.


## 2026-10-01 — Match the supplied product-card reference

CURRENT / IMPLEMENTED: latest image reference authorizes refining the shared Home/Shop cards. Correct the existing symmetric wave to the reference's descending shoulder, match fill/card surface, soften shadow and provide sufficient responsive card width. Reuse established image/type/control proportions and#4A0404 rather than copying the screenshot's brown action colour. Preserve actual product data: preview products retain their label, real prices use money(), and unestablished ratings remain absent. Add to Cart, device-local favourites and all persistence logic are outside the visual change.


## 2026-10-01 — Distinguish featured categories from product cards

CURRENT / IMPLEMENTED: user rejects the screenshot's layout because it repeats the cards above. Replace three tall overlay cards with alternating photo/copy rows and compact phone stacks. This supersedes the discovery portion of the September30 hero/discovery decision and its subsequent Pagio-fit breakpoint; the current hero is outside this change. Reuse the existing component, images, text, type scale and links. Remove the discovery overlays only, preserving the separately corrected hero gradient. Affected system: B2C FeaturedEdits CSS; no application-flow or API changes.


## 2026-10-01 — Existing-photo hero slideshow

CURRENT / IMPLEMENTED: user explicitly requests smooth fading image changes and confirms reuse of existing project photos. Reuse the original hero and two existing Gourmet-branded wide gifting photographs; preserve original image pixels and full-fit foregrounds using blurred same-photo side fill for the slightly narrower alternatives. Candidate highres images with unrelated brand names and a baked-in website mockup were rejected. Keep the established text and gradient fixed while images rotate. No carousel dependency or new generated asset added.

Independent review identified hard cuts after an image failure left only two ready slides: the previous layer was still opaque when reused. Clear the outgoing layer after each fade; failed alternatives remain excluded. Affected systems: B2C hero presentation/assets only.

2026-10-01 selection refinement — earlier agent-selected royale4/royale3 alternatives are SUPERSEDED by the user's exact three asset paths: root `images/brand/hero.png`, `images/pics/ChatGPT Image Sep 23, 2026, 09_50_14 PM-1.png`, then `images/small_anipics/framee.png`. CURRENT / IMPLEMENTED: use byte-identical public copies and matching intrinsic dimensions. Existing contain fitting and same-photo side fill accommodate their different aspect ratios without changing hero geometry, text or gradients.


## 2026-10-01 — Replace repeated editorial rows with a collection selector

CURRENT / IMPLEMENTED: user requests a better composition for the screenshot's gourmet/candle/paper section. Supersede the earlier alternating-row decision with one compact interactive showcase: prominent photo, burgundy detail panel and three accessible category tabs. Preserve existing assets, heading sizes/font, descriptions and shopping destinations; introduce no automatic rotation or new dependency.

Review found eager image loading alone could still expose a blank frame on an immediate tab click. Selection now awaits decode and uses a request counter to ignore stale completions. Browser inspection also found a25.5px phone height difference between categories; reserve panel space to stabilize all three choices. Affected systems: B2C FeaturedEdits only.

## 2026-10-01 — Owner operations boundaries and authorization

Status: CURRENT / IMPLEMENTED core, CURRENT / PARTIAL full operations objective. Affected: B2C frontend, auth service, explicit database layer; original apps remain separate.

Problem: B2C has an active opaque-cookie/Google identity system and explicit commerce schema, alongside a legacy JWT/Stripe/BullMQ fork. A new unrelated admin login or legacy-model queue reuse would split identity and corrupt assumptions. Chosen: reuse `auth/service.sessionUser`, same HttpOnly cookie and `/api/v1/auth/admin` namespace; serve only a non-sensitive `/admin` shell before server API authorization. Reject broadening the session cookie Path just for server-rendered administration. Trade-off: the shell can render publicly, while all records and commands remain protected APIs; existing Google flow-state memory still needs production multi-instance planning.

RBAC uses existing CUSTOMER/ADMIN/OWNER roles. OWNER receives the known permission catalog; ADMIN starts with no grants and cannot hold OWNER-only settings/admin-user permissions. Current database session/permissions are read on every request; writes additionally lock the actor User inside the business transaction, so concurrent revocation wins before unauthorized effects. Permissions `dashboard.read`/`analytics.read` intentionally expose documented aggregate metrics across domains, while entity links and investigations require individual grants. Operators must understand that aggregate access is itself sensitive.

Owner provisioning uses one operator-only command targeting an existing authenticated-capable active User by internal ID, guarded by a unique bootstrap setting and transaction. No public role picker, auto-owner email heuristic or assumed owner identity. OWNER assignment has not run: user identification is pending. Staff account suspension deliberately also prevents customer sign-in, and the UI discloses this; a customer-only account cannot be suspended through staff removal.

Problem: repeated stock/content/admin requests and concurrent permission changes. Chosen: strict resource DTOs/input allowlists, optimistic expectedVersion, actor-scoped unique command receipt, request hash and atomic audit/effect transaction. Existing inventory/coupon/financial invariants remain the authority. Audit failure rolls back the action. Receipts store references rather than copied private request payloads. Trade-off: actor writes serialize that actor's mutations; no provider side effect occurs inside these admin transactions. Future external commands require durable job/outbox and reconciliation design, not reuse of this local-only handler pattern.

Problem: unknown commercial rules and unavailable service integrations. Chosen: expose genuine stored payments/refunds/invoices/shipment/notification records and explicit capability limitations. Do not enable arbitrary paid/completed/cancelled states, refund calls, legal invoice issuance or carrier jobs without policy/provider evidence. Reusing legacy queues with incompatible collections was rejected. Reporting requires explicit currency/timezone/window; captured payment totals are labelled gross captures, not recognized revenue. Date boundaries are UTC instants with an explicit display timezone; no mixed-currency totals or fabricated growth/AOV values.

Schema additions: admin_settings, admin_commands and admin_rate_limits; bounded User permission/session version fields and supporting cursor indexes. Chosen MongoDB/Mongoose to preserve current invariants rather than introduce Prisma or a second datastore. Rate counters are shared Mongo records with atomic increments and TTL cleanup; unavailable storage fails closed. Trade-offs: added database load and proxy/IP configuration remain deployment concerns. No production benchmark, Atlas migration or live owner grant is implied.

Security guidance reviewed against [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) and [MongoDB production transaction considerations](https://www.mongodb.com/docs/manual/core/transactions-production-consideration/); implementation claims are grounded in local tests, not those references alone.
