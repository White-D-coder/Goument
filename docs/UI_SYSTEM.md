# UI System

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Preserve the existing system

Before changing UI, search existing components; reuse, then extend, then create only when justified. Keep current product-card patterns, enquiry forms, spacing and responsive behavior unless the task requires a change. Main and alternate themes are distinct.

B2C current preference (2026-09-30): no decorative horizontal/vertical margin rules, section separators, card dividers or permanently underlined feature actions anywhere in the storefront. Use spacing, alignment and surfaces for grouping. Preserve visible form/control boundaries, selected-state text/colour and keyboard focus. This supersedes earlier B2C divider-line guidance below; original B2B frontend designs remain separate.

## Main design tokens

Charcoal #1A1A18; ivory #F6F4EF; silk #FAF8F5; sage #7A8B6F; gold #D4AF37 / #DFC299 accents. Burgundy CTA #3C0B1E, hover #4F1028. Body Jakarta, editorial headings Cormorant Garamond, local Pagio/TropicalScript/DreamAlways accents. `--font-geist` aliases Jakarta; Geist is not loaded as implied by template README.

Body15px/1.7. Display clamp48–120px; heading32–64px; title22–36px; meta10px; nav11px. Tokens use 4px spacing increments; containers1440/1080/720px. Tailwind sm640/md768/lg1024/xl1280/2xl1536px at 16px root. `xs:` occurs without a defined custom breakpoint.

Exact colors, fonts/formats, typography, radii, shadows, spacing, component overrides and animation values: [audit sections 3–5 and 11](PROJECT_TECH_DESIGN_AUDIT.md#3-css-system-aur-styling-approach). Source truth is globals.css plus active component styles, not just global token names.

## Components and patterns

- Shell: ResponsiveShell + Footer + InquiryModal + FloatingStickyInquireButton.
- Cards/catalogue: KeepsakeEcommerceSection, CustomGiftBoxesSection, CorporateArchitecturalCatalogue, CollectionsClientView; check active imports before reuse.
- Forms: InquiryModal, CuratedInquirySection, OccasionPageTemplate; inspect shared fields and payload compatibility.
- Modals/drawers: existing Framer Motion + AnimatePresence surfaces, curation drawer and capacity modal.
- Tables: backend analytics portal uses its own admin presentation; it is not the general customer UI pattern.
- Animation: GSAP scroll reveals/parallax; Framer Motion interaction; CSS hover/keyframes; canvas sprinkle and confetti. Existing reduced-motion support is partial.
- Responsive: main home separate mobile/desktop images and fixed/sticky overlays; preserve image sizing/priority and mobile scroll usability.

## Alternate theme

Pastel cream #FAF8FC / plum #3A2342 / purple #6B427B / lavender #E6D9FF. Cormorant, Jakarta and Playfair via next/font; local display fonts too. Its gold-gradient-btn is purple. Do not consolidate without explicit requirement.

## Known constraints

Main font-sans utilities can select the framework font stack rather than Jakarta. Raw img and next/image coexist. Component declarations do not guarantee mounting. No browser-computed style audit was run; accessibility gaps are in PERFORMANCE and TODO.

## Concrete component reuse and state map

All paths below relative to `frontend_appview/src/`. Exact literal style inventory remains in the audit; this map identifies responsibilities instead of creating a second design-token source.

| Component / surface | Current visual/state contract | Reuse / invariant |
| --- | --- | --- |
| features/shell/ResponsiveShell | Fixed navbar h16/lg68px; transparency on unscrolled home, blur20px after scroll40px; mobile overlay below lg | Use existing Catalogue/Occasions/Contact links, scroll reset and body-lock behavior; do not switch to MobileShell casually |
| features/shell/Footer | Responsive editorial columns, cream/charcoal, contact and policy links | Validate gated destinations; preserve typography/grid hierarchy |
| InquiryModal | Floating bottom-right card, no dark backdrop, page remains usable; viewport−2rem width,sm480px,max82vh,rounded3xl | Do not convert it to a full-screen blocking dialog without requirement |
| Modal inputs/selects | Transparent, bottom border #D0CBC0; focus charcoal; square input corners; text-xs/sm:text-sm | Reuse BUDGET_OPTIONS/QUANTITY_OPTIONS; native select, not a new dropdown library |
| Modal submit CTA | Burgundy/white, rounded-xl, uppercase mono tracking .18em, py3.5; disabled opacity50%, active scale.99 | Preserve submitting state; current fetch acknowledgement bug documented separately |
| CuratedInquirySection / OccasionPageTemplate | Larger inline forms, responsive grids and shared enquiry endpoint | Inputs/payload fields differ; inspect handler before moving shared form logic |
| Product/category cards | CollectionsClientView and existing catalogue/keepsake sections; rounded surfaces, border/soft shadow, hover image scale | Match the active surface; legacy ecommerce cards are not universal design authority |
| BoxCapacityModal | Existing capacity-error dialog with spring motion | Wire to useCartStore capacity state; no backend inventory promise |
| CurationDrawer / StickyInquiryDrawer | Separate drawers with existing Motion transitions | Mounting is component-specific; not automatically global shell services |
| Toaster / OfflineBanner / OnlineToast | Root top-center13px Jakarta toast; offline message and reconnect celebration | navigator.onLine only; do not claim it proves API readiness |
| ImageWithShimmer | Placeholder until load,300ms opacity; PackageX + Image unavailable fallback | animate-shimmer class occurs but no definition found in application CSS; don't claim shimmer motion verified |
| HeroSkeleton / GiftBoxingCardSkeleton | Loading placeholders in legacy components | Reuse only after confirming hook/loading path is mounted |
| Empty states | Collections search/no items, cart empty, not-found and offline screens | Preserve recovery CTA and contextual copy rather than hide errors silently |
| Tables | studio-admin data presentation/reporting | Admin visual pattern is separate from storefront; page gated |

## Visual specifics and responsive behavior

Main global typography: Cormorant weights300–700 plus italic400, Jakarta300–800; local fonts normal @font-face. Display line-height .95, heading1.08, title1.2, body1.7; label letter spacing .15em/nav .12em. Shadows include plinth/slab/daylight tokens and component-specific box shadows. Borders use linen/border/cream shades, mostly1px; prominent CTAs/cards use rounded-lg/xl/2xl/3xl or full pills, with arbitrary architectural corners in catalogue sections. No global mandatory radius token exists.

Home heading:31px base, sm text5xl, lg68px plus xs35px class with no configured xs breakpoint. Hero phones use sm-hidden image branch; desktop sm+ branch. Catalogue sidebars/grids and mobile horizontal scrolling are defined in their components, not a single universal grid. Main nav switches at lg; logo/text transition .28s and menu slide .4s. Global token nav64/56px is not necessarily rendered navbar height at every breakpoint.

Main UI backgrounds mix global ivory/silk and component colors; audit lists all. Alternate app uses pastel/plum tokens and next/font; keep separate. No universal page-transition wrapper found; animations are entrances, scroll reveals and component exits. CSS transitions200/400/700/900/1000ms tokens, hover scale1.03, grayscale650ms and image swap500ms; GSAP .9s reveal/.12s stagger; Motion durations/springs per component.

## Explicit UI invariants

Reuse current cards/forms before new variants; preserve breakpoint intent, alt/sizes/priority image contracts, reduced-motion handling and enquiry options. Do not interpret CSS class names as loaded fonts/implemented keyframes without definition. Do not copy gated mock success/error behavior as a design pattern. No browser rendering/accessibility measurements were performed; keyboard focus-trap/dialog semantics need verification rather than claims of compliance.

## 2026-09-29 — B2C reference storefront

User supplied a storefront screenshot and explicitly requested the B2C frontend match it while preserving the correct logo. Implemented cream/burgundy editorial home: dark gift hero, circular collection rail, three-column signature edit, paired gourmet/candle banners, stationery feature, occasion grid, value strip and B2B-style footer. Follow-up correction: B2C header now shows the burgundy-backed monogram before scrolling and “The Gourmet Gifts” after 40px; header remains sticky. At widths 761–1100px, the occasion cards use three columns rather than compressing six into one row. Footer adopts the active B2B white/black title, four navigation columns, concierge entity details and compact copyright bar; destination links are mapped to existing B2C routes/search. Browser checked at 851px and 390px; no horizontal page overflow at 390px. Local product photography reused; imagery is not an exact reproduction of the screenshot. No fabricated testimonials, prices, shipping offers or newsletter success; brand story/account CTA occupy those unverified areas.

## 2026-09-30 — B2C typography sourced from frontend_appview

CURRENT / IMPLEMENTED: user explicitly requests frontend_appview as the B2C typography authority. B2C/src/app/typography.css copies all8 source type-* classes exactly, font variables and local font declarations. Google font URL/weights now match the source layout (Cormorant300–700 plus italic400; Jakarta300–800). Local Pagio OTF, TropicalScript and DreamAlways assets copied. Active home hero mapped to31/48/60/68px at base/640/768/1024; source serif subtitle16/24px. Section headings24/36/48px, card titles17/19px, body15px/1.7, navigation11.5px and source footer responsive scale/mono labels applied. Google identity button keeps its provider-specific type styling. B2C content/layout/logo retained, with wrapping and tablet menu adjustments for source-sized text. Source files in frontend_appview were not modified.

Verification: production build (including TypeScript) and ESLint passed; script confirmed8 source typography class blocks copied verbatim. No browser-computed typography/visual comparison performed in this increment.

## 2026-09-30 — Account introduction composition

CURRENT / IMPLEMENTED: expanded signed-out account left panel with existing branded gift-box/candle photography, an overlapping note and compact gifting caption. New AccountIntro component retains heading/copy and frontend_appview typography; responsive image heights keep the mobile panel compact. Login form, provider flow and session logic unchanged. ESLint and TypeScript checks passed; browser visual verification not performed.


## 2026-09-30 — Account collage reverted

User rejected the latest account collage. Removed AccountIntro and its scoped CSS; restored the preceding text-only introduction. This supersedes the account introduction composition entry above. Existing typography and authentication remain unchanged.

## Account heading enlargement — 2026-09-30

User requested a larger two-line account heading, approximating the height from the email label through the password input. Added an account-only display override up to88px/1.04, bounded by its column width, with38–58px mobile scaling. Original Cormorant family and italic second line retained. No form/auth changes; exact browser alignment not measured.

## 2026-09-30 — Hero-backed navbar correction

CURRENT / IMPLEMENTED: home navbar now overlaps hero via a negative margin matching its actual88px desktop/78px mobile height. At home scroll<=40 it is transparent with light links; above40px it becomes solid white with dark links. Hero copy receives matching top clearance. Path-aware solid style keeps non-hero pages readable. Existing logo/wordmark scroll behavior retained; mobile expanded menu uses dark links on its light panel. Previous transparency alone exposed the page background because the header occupied a separate flow row. ESLint and TypeScript passed; browser visual verification pending.

## 2026-09-30 — Product card redesign

CURRENT / IMPLEMENTED: shared B2C ProductCard now uses an inset rounded photo, compact preview badge, white/ivory frame, aligned description area and bottom discovery CTA with divider. Keeps source-aligned Jakarta17/19px title scale, authentic product data, preview disclosure and product-detail destination. Applied to home signature edit and shop via shared component. No fabricated prices, ratings, favourites or add-to-cart behavior. Mobile spacing and reduced-motion rules included. ESLint and TypeScript passed; no browser visual check performed.

## 2026-09-30 — Minimal card revision

User rejected the rounded/filled-action design. Superseded it with unframed4:3 photography, no shadow/radius/overlay badge, source17/19px title typography, muted description and a small View details arrow link beside price or preview disclosure. One fine bottom divider; no floating-card effect. Home/shop share the revision. Lint and TypeScript passed; visual browser comparison not performed.

## 2026-09-30 — Box-first gifting and compact spacing

CURRENT / IMPLEMENTED: B2C Signature Edit now shows original signature box photography; /boxes lists all8, selection opens /build. Builder supports59 existing catalogue entries, search/filter, repeated item additions and Mongo-backed draft persistence. /cart shows selected items, alternative box images and +/- quantity controls; changing packaging preserves items. Backend owns the original4/5/4/8/6/4/4/6 capacities; client receives packing status only. Items may exceed packaging while browsing, but checkout-check rejects insufficient packaging. Shared section/form/card spacing reduced; 44px quantity controls, responsive grids and sticky review bar added.

CURRENT / PARTIAL: catalogue entries are selectable gift drafts, explicitly not saleable inventory. Prices/stock/box charges and payment are not established; checkout remains unavailable and no order/reservation/payment is created. Existing legacy commerce cart is preserved at /cart/store. The new browser-owned draft is separate from customer accounts and legacy Redis cart; login merge/cross-device ownership remains unresolved. Existing Google auth paths/cookie scope remain unchanged.

Verification: production build, TypeScript and ESLint passed. Database/auth/gifting suite41 tests passed, including private capacity serialization, exact fit/overflow/mixed boxes, invalid input, owner isolation, origin enforcement, reload persistence and concurrent stale writes. Initial race test found first-save revision ambiguity; corrected to expose stored __v+1 and empty revision0. Local Chrome390px verified overflow → add second box → fit, with no horizontal overflow; all59 item image paths exist. Additional viewport/full-backend checks recorded below when complete.

Final verification: full B2C backend57 tests across7 suites passed (`npm test -- --testTimeout=30000`). Chrome checked /, /boxes, /build, /cart, /account at320/768/1440px: no horizontal overflow or broken loaded images;390px overflow/add-box interaction also passed. Home scrolled navbar computed white. Build and lint passed. Runtime auth/gift service restarted on5003 with guarded Atlas schema install.

## 2026-09-30 — Shop redesign

CURRENT / IMPLEMENTED: Rebuilt B2C /shop with compact editorial heading, original-box invitation linking to /boxes, desktop collection navigation/mobile horizontal links, inline search, three-column desktop/two-column mobile photography and restrained product text. Reuses ProductCard with an optional compact variant scoped to shop; original palette and font families retained. Collection links use existing search semantics (not a new category API). Preview status shown once above the grid; unsupported price sorting hidden in preview mode, live sorting retained. Search, clear, pagination, empty state and product-detail links preserved. No backend, price, stock, cart or payment changes.

Verification: ESLint and TypeScript passed. Local Chrome at320/390/768/1440px showed no horizontal overflow or broken loaded images. Search returned3 beverages, page2 pagination worked and no-match state checked. Visual inspection caught inherited column layout stretching the search row; corrected with an explicit row direction.

## 2026-09-30 — Center desktop navigation

CURRENT / IMPLEMENTED: Desktop header uses equal side columns around the five navigation links, centering them independently of logo/icon widths. Compact1024–1199px sizing avoids collisions; mobile menu layout retained. CSS-only change.

Browser verification: navigation midpoint within0.01px of viewport center at1024/1100/1200/1440/1920px; no logo/action overlap after correcting inherited typography at1024px. Phone390px keeps collapsed menu; no horizontal overflow.

## 2026-09-30 — Original transparent navbar icon

CURRENT / IMPLEMENTED: B2C Brand now uses the exact /images/brand/LOGOs.svg from frontend_appview ResponsiveShell. Replaces the burgundy-backed PNG; existing centered navigation and scroll wordmark behavior retained. Copied asset verified byte-identical to source.

## 2026-09-30 — Card spacing correction

CURRENT / IMPLEMENTED: Removed stretched card content and automatic spacer margins across product, box, builder and cart-box cards. Image/title gap standardized to12px desktop and10px phone; title/body gaps5–6px, compact description/action spacing. Box photos now square to remove artificial side bands; descriptions have readable wrapping, with shop copy allowed two lines. Existing fonts, navigation and commerce behavior retained. Chrome390/1440px checked shop/boxes/build for image-title gap consistency and horizontal overflow; CSS-only change, no backend tests needed.

## 2026-09-30 — Homepage section bottom spacing

CURRENT / IMPLEMENTED: increased bottom padding for Shop Our Collections, The Gourmet Signature Edit and Gifts for Every Occasion to56px desktop and40px at widths up to760px (previous shared values28px/22px). Scoped CSS retains existing top padding and card spacing. Checked selectors against homepage source and existing cascade; no runtime visual check or tests for this CSS-only adjustment.

## 2026-09-30 — Full hero image fit

CURRENT / IMPLEMENTED: B2C hero image now uses full-width object-fit:contain and centered positioning across viewports, replacing cropped cover/75% desktop width. Original1400×703 aspect ratio is preserved; available extra space uses the existing hero background. Source cascade and image dimensions inspected; browser visual verification not performed.

## 2026-09-30 — Image-sized hero, no brown fill

CURRENT / IMPLEMENTED: supersedes the previous contain-in-fixed-height treatment. Original1400×703 photo now defines image height through intrinsic dimensions and width100%/height:auto; removed hero minimum heights and brown paint via scoped overrides. Desktop copy overlays the photo with a neutral transparent shade. Below1024px, full landscape image stays above readable copy on the existing page background; navbar still overlays image until scrolled. This avoids cropping, stretching and painted letterboxing.

Verified local Chrome320/390/768/1024/1440px: image aspect ratio~1.9915 throughout, transparent hero background, content inside hero and no horizontal overflow. Inspected390/1024px screenshots.

## 2026-09-30 — Ecommerce layout and motion refinement

CURRENT / IMPLEMENTED: explicit user request for an elegant ecommerce layout while keeping fonts, text sizes, image assets and colour theme. Added B2C/src/app/storefront.css for layout/motion only. Homepage now has a desktop signature-box introduction beside the three boxes, aligned inset editorial features, a stationery feature, occasion discovery cards and a compact assurance strip. Phone collections/signature/occasion rows use ShoppingRail with swipe, previous/next controls, progress indicator, keyboard arrows and44px controls. Feature tiles stack image above text at640px and below after browser inspection found the split layout cramped. Shop collection navigation stays visible on desktop, catalogue/box cards use restrained dividers/arrows, and desktop product photography stays alongside details.

StorefrontMotion adds progressive IntersectionObserver/Web Animations reveals with650ms easing,18px movement and small card delays; existing content remains visible without JavaScript. Reduced-motion cancels/rejects reveals, controls use instant scrolling, and focus cancels an active reveal on the focused element. Observers/animations clean up on navigation; catalogue updates are detected without an animation dependency. Native touch scrolling retained. No financial, auth, cart, price or inventory contracts changed.

Verified: production build including TypeScript, ESLint, and final TypeScript/lint checks passed. Local Chrome checked home/shop/boxes at320/390/768/1024/1440px without horizontal overflow, broken loaded images or browser exceptions. Before/after comparison at390/1440px found no changes to sampled headings, paragraphs, button font families/sizes/weights/line heights/text colours or ordered image paths. typography.css is byte-identical. Rail next/previous enablement and keyboard scroll, reduced-motion zero active reveal animations, and beverages search returning3 results checked. Hero retains1400:703 ratio and transparent navbar before scroll/white after; three homepage sections retain56px desktop bottom padding and40px mobile rules. Inspected desktop/mobile screenshots. Backend tests not repeated for presentation-only changes.

## 2026-09-30 — Signature Edit now showcases items

CURRENT / IMPLEMENTED: latest user direction supersedes the earlier homepage box-first Signature Edit requirement. Homepage now reuses catalogue() and ProductCard for the first three items, item detail destinations, item-focused introduction and View All Items→/shop. Existing preview disclosure/pricing handling preserved; no invented sale prices. Box selection remains available through /boxes and the shop invitation. Existing signature layout, square photo framing,14/12px titles and11/10px descriptions retained.

## 2026-09-30 — Phone composition correction

CURRENT / IMPLEMENTED: user rejected the previous phone presentation. Below760px, homepage collections now show all7 in a grid (three columns below381px, four otherwise); Signature Edit displays all3 items in a compact two-column composition with the last item as an image/copy row; all6 occasions appear in a3×2 grid. Supersedes horizontal phone rails for these sections. Shared ShoppingRail remains for keyboard/overflow handling if required by other widths; no dead controls appear on the new grids.

Hero heading reflows to two natural lines using spans; mobile31px/desktop68px scales unchanged. Full-width46px primary CTA, simpler secondary action and a compact promise row reduce hero height. Existing full-image ratio remains1400:703 without brown fill. Mobile editorial images/cards and stationery feature use shorter frames and tighter margins; original image files, font declarations, text sizes and theme retained. Desktop layout retained, and requested40px phone section bottom padding remains.

Verification: lint and TypeScript passed. Chrome at320/375/390/430px verified7 collections,3 items and6 occasions all fit their grids without horizontal overflow;1440px desktop check also passed. Hero ratio~1.9915, mobile heading31px, desktop68px and primary mobile tap target46px measured. Inspected390px hero/items/occasions screenshots. Shop, boxes, item detail, account, cart and builder also checked at390px for horizontal overflow and broken loaded images. No backend changes or backend tests for this presentation-only correction.

## 2026-09-30 — Reference product cards

CURRENT / IMPLEMENTED: shared B2C ProductCard on home and /shop now follows the user's pasted React reference: rounded portrait photo (aspect .86), SVG curved transition into paper content, category, product copy, heart and burgundy pill action. Source: B2C/src/components/ProductCard.tsx and src/app/product-cards.css. Existing title/description/action font families and sizes, product images and theme are retained. This supersedes earlier unframed/square product cards and the phone Signature third-card horizontal treatment; phone cards now share one portrait shape in two columns. BoxCard is unchanged.

Heart saves product IDs in localStorage under gourmet-b2c-favourite-products, capped at500, with same-tab/storage-event synchronization, aria-pressed and visible storage-error feedback. This is device-local bookmarking, not an account wishlist or database/customer merge. Category labels come from existing catalogue data. Preview items retain Collection preview and View details; live cards use existing price formatting and link to details/options. Reference sample price/rating/review counts and an unconnected Add to Cart button were deliberately not copied.

Verification: Chrome home/shop at320/390/768/1440px had no horizontal overflow, broken loaded images or runtime exceptions. Inspected phone/desktop screenshots; typography matched existing scales. Mobile heart and pill targets measured44px. Touch save, reload persistence, home/shop synchronization, removal, malformed storage, visible blocked-storage error and /products/makhana navigation passed. Reduced-motion hover measured transform:none, transition:0s and zero active animations. Build, lint and TypeScript passed; live saleable-catalogue data and database-backed wishlist were not part of this check.

## 2026-09-30 — Rendered card image correction

CURRENT / IMPLEMENTED: latest diffuser screenshot supersedes the preceding code-example approximation for product cards. Photo aspect is now .95, with a high left shoulder descending into a low right plateau; content overlaps the photo by7% of card width. Card title uses the existing Cormorant family at22–30px, body12–15px and a centered52–64px pill; surrounding site typography, theme and existing product imagery remain unchanged. This card-specific typography is an explicit revision to the previous small sans title treatment. Below481px home/shop use one full-width card per row; larger widths keep their existing grids. Preview disclosure/detail navigation, real price formatting and local favourite behavior remain. No sample reviews/prices or fake cart action added.

Verification for rendered-reference revision: lint, TypeScript and final production build passed. Chrome home/shop checks at320/390/481/640/768/1440px found no horizontal overflow, broken loaded images or runtime exceptions; narrow Shop grid correction rechecked at320/390/481/640px. Inspected phone and desktop screenshots. All12 Shop pill labels/icons were separated at481px, minimum height52px. Touch save, reload persistence, home/shop synchronization, removal, storage-corruption/denial handling, detail navigation and reduced-motion hover passed. Backend/provider behavior unchanged and not retested.

## 2026-09-30 — Gourmet, candle and stationery feature redesign

CURRENT / IMPLEMENTED: replaced the homepage's narrow paired tiles and separate oversized stationery banner with reusable FeaturedEdits and scoped featured-edits.css. Desktop has two large photo cards with inset copy panels, followed by one aligned stationery row. Tablet640–900px uses image/copy rows; phones stack the three cards with consistent20px gaps. Natural heading wrapping replaces forced line breaks; full-width action rows have circular burgundy arrows. Existing section gutters, image files, copy and shop query destinations retained. Top images use product-focused cover framing; stationery is contained so all notebook names remain visible. Existing progressive reveals and reduced-motion-aware image/arrow hover retained.

Before/after Chrome comparison at390/640/1440px found zero differences in heading/body/eyebrow/action font family, size, weight, line height or tracking and identical source image paths. Browser checks at320/390/640/768/1024/1440px found no page/card overflow, broken feature images or runtime exceptions. Inspected phone,768px tablet and desktop screenshots; action targets63–64px. All three actions navigate to their original filtered shop routes with results. Reduced motion shows zero feature animations and0s image transition. Lint, TypeScript and production build passed. No backend, commerce or product-card changes.

## 2026-09-30 — Product Add to Cart restoration

CURRENT / IMPLEMENTED: supersedes preview detail-only pill actions described above. Known gift-catalogue items now show Add to Cart on Home, Shop and item detail, using shared AddGiftToCartButton. Pending state disables repeat submission; confirmed save shows Added to cart, a status message and View cart. Errors remain visible without a false success or badge increment. Image/title detail links, local favourites, card shape, fonts, photographs and colours stay intact. Quantities and box choices are managed in the existing /cart.

Verified phone touch, repeated quantities, shared header count and reload against the real gift API in temporary MongoDB. Current configured Atlas connection fails TLS negotiation, so actual Atlas persistence is blocked; see TESTING and TODO. Saving a selection does not establish saleable stock, a quote or payment readiness.

## 2026-09-30 — Asymmetric editorial feature spread

CURRENT / IMPLEMENTED: user's latest rejection supersedes the rounded photo cards, overlapping panels and full-width stationery banner in the earlier FeaturedEdits revision. Gourmet is now the dominant left-hand story, with candle and stationery portrait stories to its right, separated by fine rules. Open copy, small decorative01–03 indices and underlined text/arrow links replace the nested panels and circular buttons. At640–1199px, gourmet becomes a horizontal lead with two stories below; below640px, it uses full-width photography while secondary image/heading pairs precede full-width descriptions/actions. Reuses existing StorefrontMotion with70ms stagger and reduced-motion-aware hover.

Source changes are confined to FeaturedEdits.tsx and featured-edits.css. Original content, three image files, category destinations, Cormorant24/36/48px and Jakarta15/10/12px styles remain. Product cards and Add to Cart are separate and unchanged. Browser320/390/640/768/1024/1200/1440px: no overflow, images load, all measured font families/sizes/weights/line heights/tracking and image/link sources match the prior revision. Actions are48px high. Visuals inspected on phone, tablet and desktop; lint and production build including TypeScript passed.

## 2026-09-30 — Remove decorative lines throughout B2C

CURRENT / IMPLEMENTED: removed decorative rules from global header/mobile menu/footer, homepage promises/assurances/occasions/story, editorial features, Shop intro/sidebar/toolbar/pagination, box listings, cart/order rows, builder context/bar, payment summaries and account email divider. Removed carousel progress hairline; previous/next buttons and keyboard scrolling remain. Source rules were edited in place across globals.css, typography.css, storefront.css, featured-edits.css and shop/shop.css. No blanket border/outline reset.

Form fields, Google/button boundaries, quantity/navigation controls, loading spinner and focus outlines remain functional. Active Shop collection retains wine colour and bold weight; selected boxes retain their checkmark/text. Original typography, images, spacing, card surfaces and cart logic retained. The header still changes from transparent to white after scrolling, without its previous hairline shadow.

## 2026-09-30 — Three equal discovery panels

CURRENT / IMPLEMENTED: user explicitly chose three equal image-led panels with compact copy, superseding the asymmetric gourmet lead/side-story layout. FeaturedEdits uses equal desktop columns and square image stages; shared subgrid rows align heading, description and CTA positions. Gourmet heading has a desktop width limit for balanced wrapping. Decorative numbering removed and descriptions shortened. At640–1023px, all three use the same horizontal image/copy pattern; below640px, all three stack with3:2 photography and compact copy. No decorative borders or lines. Non-subgrid fallback is scoped to desktop to preserve tablet/mobile layouts.

Source changes: FeaturedEdits.tsx and featured-edits.css only. Existing font families,24/36/48px heading scale,15px descriptions,10px eyebrows,12px CTAs,48px action targets, original images, palette and shop links retained. Image framing is consistent with individual object positions for product visibility. Existing staggered reveal and reduced-motion rules reused. Product cards and Add to Cart untouched.

### 2026-09-30 — Feature copy hierarchy refinement

CURRENT / IMPLEMENTED: user likes the three-panel layout but reports competing text. Supersedes its long marketing titles and eyebrow labels: headings are now Gourmet Special, Scented Candles and Personalised Paper, each with one short description and its existing action. Removed eyebrow markup/styles and changed desktop subgrid from five rows to four. Photo-to-heading gap is22px on desktop,18px on phone; tablet rows start copy without a top margin. Next section heading is separated by64px on desktop/tablet and52px on phone, including existing occasions padding. Existing fonts/sizes, photography, equal columns, colours, destinations,48px CTAs and line-free style retained. Eight-width browser checks and seven-width before/after preservation comparison passed; see TESTING.

## 2026-09-30 — Cart continuity feedback during sign-in

CURRENT / IMPLEMENTED: Account shows Saving your cart while pending selections settle and disables repeated sign-in/toggle actions. Failed pending saves display a review-cart error instead of leaving the page. Navigating away cancels deferred Google navigation. Header retains its last confirmed cart count on a temporary read failure; initial unavailable state does not fabricate a count. Gift failures use cart-specific503 wording in source. Product-card styling, fonts, imagery and layout are unchanged.


## 2026-09-30 — Shop introduction banner

CURRENT / IMPLEMENTED: /shop now groups its existing Small things / Beautifully given heading, one short description and Build your gift action into a single rounded neutral banner. The original Maroon Bloom photograph fills the right side on desktop/tablet; at640px and below it becomes a square image beside the action under the copy. The /boxes destination, Cormorant heading scale/weight, Jakarta description/action scales, existing palette and no-decorative-lines preference remain. CTA has a44px minimum height and existing keyboard focus; progressive reveal and reduced-motion handling remain.

SUPERSEDED: the detached MAKE IT YOURS / Start with a box mini-card. Removed its redundant heading and obsolete storefront.css layout/hover overrides; shop.css owns intro layout. Product cards, search/filter/sidebar and Add to Cart source are unchanged. Affected source: B2C/src/app/shop/page.tsx, shop.css and src/app/storefront.css. See TESTING for measured responsive and interaction evidence.


## 2026-09-30 — Exact burgundy brand accent

CURRENT / IMPLEMENTED: user specifies #3c0b1e as the B2C brand colour. globals.css now has one canonical --wine declaration; removed the later #401c19 brown override. Announcement background, primary button default/hover, solid-header navigation/icons, brand fallback, assurance icons and footer hover accents use var(--wine). Product-card actions/hearts, Shop intro CTA, category selection and focus rings already inherit this token. Cream/neutral surfaces, typography and existing image artwork remain as before. Razorpay's existing #3C0B1E theme already matches. SUPERSEDED: previous brown brand/hover values in the reference storefront CSS.


## 2026-09-30 — Centered Signature Edit typography

CURRENT / IMPLEMENTED: user requests a different elegant, explicitly non-italic font for The Gourmet Signature Edit. Its h2 now uses the existing local Pagio Regular400, font-style:normal and font-synthesis:none, preserving the24/36/48px responsive size scale. This scoped heading overrides the prior Cormorant treatment; other headings retain their current families. Signature intro is centered above the item grid with centered subtitle and /shop action, replacing the desktop sidebar introduction. Removed conflicting tablet/phone intro placement rules. ProductCard/grid styling and commerce logic remain unchanged; desktop cards naturally use the released full section width. Exact burgundy and no-decorative-lines preferences retained.


### 2026-09-30 — Deep red colour trial

CURRENT / IMPLEMENTED: user requests trying #4A0404, superseding the immediately preceding #3c0b1e choice. Canonical --wine and the existing Razorpay visual theme literal now use #4A0404. Shared brand/action states inherit the change. Pagio heading, alignment, neutral surfaces, imagery and application flows are retained.


## 2026-09-30 — Hero and immersive discovery panels

CURRENT / IMPLEMENTED: user requests redesign of the homepage hero and the gourmet/candles/stationery section. Hero retains the original1400×703 photo with contain fitting and intrinsic aspect ratio, plus a shallow neutral top shade for navigation. An inset cream introduction overlaps the lower image edge: upright headline on the left and description, shopping links and compact2×2 promises on the right at desktop widths. Tablet/phone reflow the introduction with smaller overlap and full-width primary action on narrow phones. Shop and #occasions destinations retained; secondary action shortened to By Occasion. Existing Cormorant/Jakarta font families and responsive sizes remain.

FeaturedEdits now has three equal rounded full-photo panels from1024px, landscape panels at640–1023px and shorter stacked phone panels. Each panel is one labelled Link containing its photo, heading, description and pill action; no nested interactive elements. A dark gradient follows the copy height so wrapping text remains backed. Original three assets, short copy, category destinations and24/36/48px heading,15px body and12px action scales remain. Existing progressive reveal, image/arrow hover and reduced-motion handling retained. No decorative divider lines.

SUPERSEDED: open square feature photos with copy underneath and the hero's left text overlay. Removed obsolete hero-only overrides from storefront.css; current hero presentation is scoped by hero-editorial in globals.css. Source: app/page.tsx, globals.css, storefront.css, components/FeaturedEdits.tsx and featured-edits.css. Centered Pagio Signature heading, product cards/cart source and #4A0404 brand token remain intact.

## 2026-09-30 — Shared Pagio section headings

CURRENT / IMPLEMENTED: user requests the Signature Edit typeface on every section heading. B2C typography.css now defines --font-heading using existing local Pagio and applies Regular400, upright styling and no synthetic faces to main-content page/section h1/h2 headings. Nested emphasis in Shop and Account headings also renders upright. The main-content selector takes precedence over component/route font rules while preserving their sizes, line heights, tracking, colours and alignment; Signature remains centered.

Product-detail names and builder item names are explicitly excluded; product/card/category h3 labels, navigation, footer labels and body text retain their existing fonts. Pagio's wider Personalised Paper heading overflowed its desktop column at1024px during verification. The existing landscape-panel layout now continues through1199px, with three equal columns from1200px, preserving heading sizes and avoiding clipped words. No asset, action or backend changes. SUPERSEDED: the earlier restriction of Pagio to Signature Edit alone and discovery's1024px three-column threshold; original B2B frontends remain separate.

## 2026-10-01 — Warmer storefront surfaces

CURRENT / IMPLEMENTED: user reports the website is too white. surfaces.css, imported after existing global styles, now owns presentation surface overrides: canvas#F2EAE7, rose#E9D9D5 for Signature/Story/Shop intro, soft#EDE2DC for assurances, and existing#4A0404 for the footer. Signature has rounded grouping,32px desktop/24px phone top padding and28px/24px separation before discovery. Hero introduction keeps light paper with a subtle shadow. Cards and their SVG curves continue using the unchanged --paper token; no images, fonts or type sizes change.

Footer wordmark/hover/focus use light paper, secondary copy#DEC9BD and column labels#DFC299. Removed its earlier glow so the background stays deep red. --muted is now#665E5A for readable copy on tinted surfaces; Shop's hardcoded muted colours use the same token. Transparent-before-scroll/white-after-scroll navbar, no decorative lines and all application flows remain. SUPERSEDED: predominantly paper body, white footer and flat uncoloured Signature/Story surfaces. Original B2B styles are unchanged.

## 2026-10-01 — Kids navigation

CURRENT / IMPLEMENTED: replaces only the navbar's Personalised entry with Kids, linking to /shop?search=kids; Shop sidebar includes the same filter. Existing personalised stationery products/links elsewhere remain. Kids uses locally hosted Baloo2 Bold700 in a small#4A0404 badge, with separate coral#FFA9BB, sky#A8DFFF, yellow#FFE28A and mint#A9E6C5 letters. The badge keeps bright pastel letters legible over both hero imagery and white/mobile menus. Font size inherits the adjacent navigation scale without overrides; no new animation.

Link accessible name is one word, Kids; decorative letter spans are hidden from assistive technology. Normal link focus/menu-close behavior and chevron retained. kids-nav.css is loaded after current styles. Local2072-byte Kids-only TrueType subset from Google Fonts is bundled with its SIL OFL1.1 licence; font family is used only for this label, leaving Pagio headings intact.

CURRENT / PARTIAL catalogue: no verified Kids category/items in the existing preview data. Filter currently shows the existing truthful empty-results state. Product assignment remains awaiting user input; no products were invented, reclassified or written to the database.

2026-10-01 refinement — CURRENT / IMPLEMENTED: user requests removing the Kids background. Removed the label's burgundy fill; it now renders transparently with the same Baloo font, inherited size and four pastel colours. SUPERSEDED: the badge-background treatment above; its earlier contrast measurements describe that prior state only.

2026-10-01 size refinement — CURRENT / IMPLEMENTED: Kids now uses1.2em relative to its navigation link, a20% increase requested by the user. This supersedes matching adjacent link sizes exactly; the responsive scale, transparent background and pastel colours remain.


## 2026-10-01 — Open, centered hero introduction

CURRENT / IMPLEMENTED: user rejected the inset cream hero panel. The complete1400×703 photograph now flows into a full-width --surface-soft introduction with no overlap, rounded container, shadow or decorative lines. Original headline is centered in#4A0404 and wraps naturally within1296px; subtitle and two shopping actions follow underneath. Removed the eyebrow and repeated four-icon promises; the separate assurance section remains.

Preserved Pagio Regular400 and the effective31/48/60/52/68px responsive heading scale, Cormorant16/24px subtitle, Jakarta12px actions, photo asset/contain fitting and navbar scroll behavior. Desktop padding32px/36px; phone24px/28px with20px side gutters. Both actions have48px minimum height; below480px they stack in a maximum320px column. Existing progressive reveals stagger the heading, subtitle and actions by0/70/140ms and respect reduced motion/focus. Destinations remain /shop and #occasions.

SUPERSEDED: the hero-only inset/split/promise layout in the September30 hero entry and its shadow in the earlier warm-surface entry. Featured discovery, Signature items and other surfaces retain their current treatment. Sources: B2C/src/app/page.tsx, globals.css and surfaces.css. Verification: TESTING.


### 2026-10-01 — Hero copy moved onto the photo

CURRENT / IMPLEMENTED: headline/copy/actions share a grid area with the original hero image, aligned at the bottom. The separate warm introduction below the photograph is SUPERSEDED. Copy is light paper over a dark gradient; primary action is paper with#4A0404 text, secondary action/focus outline are paper. Typography, copy, links and photo retain their previous values.

Image remains full-width at its intrinsic1400:703 ratio with contain fitting. On short/mobile layouts the grid grows for the copy, backed by the existing#4A0404, and the lower photograph fades into it; the image is not stretched or cropped. Phone content has128px top clearance and40px gradient padding before the heading. Desktop uses88px clearance and48px gradient padding. Navbar remains transparent over the top photo, white after scrolling. Source: scoped hero rules in B2C/src/app/globals.css.


## 2026-10-01 — Product cards matched to the diffuser reference

CURRENT / IMPLEMENTED: shared Home/Shop ProductCard uses a rounded high-left paper shoulder descending once to a low right shelf, replacing the previous symmetric ripple. The SVG is decorative/nonfocusable, with the same local#FCFBF9 surface as the card. Softened the shadow and used a neutral#F3F0EC heart-button well. Original photographs, Cormorant product titles, Jakarta copy/type scales, rounded photo/card corners and full-width#4A0404 cart pill remain. Main Pagio section headings are separate.

Cards cap at480px width; phone grids stay one column through639px, capped at420px. Signature uses two columns640–1023px and three above. Shop auto-fill requires260px per track, so the sidebar can cause a single wider card on narrow tablets. Existing content-based height accommodates wrapped names and save/cart feedback; no fixed screenshot height or decorative borders.

ProductCard's live price/preview distinction, item-ID AddGiftToCartButton branch, detail/options links and device-local heart remain unchanged. No verified rating/count is exposed by current catalogue types or endpoints, so the reference's sample rating and price are not fabricated. Sources: B2C/src/components/ProductCard.tsx and src/app/product-cards.css. SUPERSEDED: the prior symmetric SVG wave and overly narrow intermediate-width card grids. Verification: TESTING.


2026-10-01 hero copy spacing refinement — CURRENT / IMPLEMENTED: headline and subtitle sit24px higher on desktop/tablet and12px higher at≤760px. Scoped relative positioning preserves button/photo/hero geometry and the existing reveal transform. Gradient opacity reaches its readable stop equally earlier. Fonts, sizes and content unchanged. Source: globals.css --hero-copy-lift.


2026-10-01 correction — CURRENT / IMPLEMENTED: user clarified that only text should move. The gradient adjustment in the spacing refinement above is SUPERSEDED and reverted exactly: desktop opacity stop48px, phone40px. The24px/12px headline/subtitle lift remains. Future text-position tweaks must not alter the gradient without a separate request.


## 2026-10-01 — Alternating featured-category rows

CURRENT / IMPLEMENTED: Gourmet Special, Scented Candles and Personalised Paper now use three wide editorial rows. Photo and copy sit beside each other from600px; the candle row reverses their visual positions. Below600px every row stacks photo above copy. Images alone have12px corners, with separate text and a burgundy circular arrow. Removed this section's dark overlays and enclosing card treatment; no decorative lines added.

Preserved original assets, copy, shopping destinations, shared upright Pagio heading metrics (24/36/48px), Jakarta body/action metrics and theme tokens. Each row retains one labelled Link and existing reveal hooks. Focus is a wine outline outside the row; image/arrow motion respects reduced motion. Hero gradients/text offsets and ProductCard are unaffected. Source: B2C/src/app/featured-edits.css. SUPERSEDED: R34's three equal immersive discovery panels and R35's1199px landscape-panel breakpoint. Verification: TESTING.


### 2026-10-01 — Occasion-label underline

CURRENT / IMPLEMENTED: the six Gifts for Every Occasion labels reveal a 1px #4A0404 underline from left to right when their card is hovered; it retracts on exit. The label-only pseudo-element uses a 350ms transform transition and also reveals on keyboard focus. Reduced motion makes the state change immediate. Existing heading arrow, type, spacing and destinations remain. This explicit request is a scoped exception to the earlier no-decorative-lines preference. Sources: B2C/src/app/page.tsx and storefront.css.


## 2026-10-01 — Hero photo crossfade

CURRENT / IMPLEMENTED: HeroSlideshow rotates three existing Gourmet gifting photographs on a 6-second cadence with a 1600ms opacity crossfade. The incoming decoded photo fades over an opaque outgoing layer; outgoing state clears after1700ms so a two-photo fallback also fades correctly. The original hero remains the first server-rendered frame. Text, buttons, original gradient stops, responsive type and hero geometry stay fixed.

Retains the1400:703 frame and full foreground photos with contain fitting; alternatives use a softly blurred copy behind side gaps. Current user-selected order (2026-10-01): `images/brand/hero.png` (1770×889), `images/pics/ChatGPT Image Sep 23, 2026, 09_50_14 PM-1.png` (1448×1086), `images/small_anipics/framee.png` (1672×941). All three are byte-identical copies of the root assets under B2C/public. The earlier royale4/royale3 photo selection is SUPERSEDED; those photos no longer enter the slideshow. No generated or edited imagery.

A44px Pause/Resume button sits below navigation. Rotation pauses when offscreen, the document is hidden, a hero shopping link is focused, or reduced motion is requested; reduced motion also disables the fade and hides the autoplay control. Only decoded images enter rotation, and failed alternatives are skipped. Effects dispose timers, observers and listeners. Sources: B2C/src/components/HeroSlideshow.tsx, page.tsx and globals.css. Supersedes the single static photograph only; R38 text/gradient requirements remain.


## 2026-10-01 — Interactive collection showcase

CURRENT / IMPLEMENTED: FeaturedEdits is now one combined photograph/burgundy showcase. Desktop pairs the main photograph with a#4A0404 panel; below960px the photo stacks above the panel. Gourmet/Candles/Paper tabs select matching title, short description and the original shopping action. Photos softly fade650ms and copy enters400ms; selection is manual. Original images, upright Pagio24/36/48px headings and Jakarta body/action metrics retained. No decorative rules added.

Native buttons implement roving tabs with ArrowLeft/Right/Home/End focus movement and tab/panel ARIA relationships. Inactive panels use hidden, excluding their links from focus. White focus outlines contrast with wine. Await selected-image decode before committing photo/copy, retain the previous complete selection while waiting, ignore stale requests and provide Photo unavailable on failure. Reduced motion removes transitions/entry animation. Phone panels reserve182px to prevent tab-selection height jumps.

SUPERSEDED: R40's alternating rows, which the user rejected in the latest screenshot. Sources: B2C/src/components/FeaturedEdits.tsx and src/app/featured-edits.css. Other commerce components and hero styling are outside this change. Verification: TESTING.


### 2026-10-01 — Corporate navigation opens the B2B frontend

CURRENT / IMPLEMENTED: B2C's Corporate navbar entry opens the frontend_appview homepage in the same tab. Default development destination is http://localhost:3000/; production uses the source-declared canonical https://thegourmetgifts.co/. NEXT_PUBLIC_CORPORATE_SITE_URL can override the destination. Supersedes the navbar's /shop?search=corporate link only; product-category/filter links retain their existing meaning. Use the active B2B homepage because its legacy /corporate route is disabled; no closed route was enabled. Source: B2C/src/components/Header.tsx.

## 2026-10-01 — B2C owner and staff operations portal

CURRENT / IMPLEMENTED in source: `/admin` is a dedicated operations workspace in B2C. Its sidebar, compact data panels, filters, tables and forms use the existing #4A0404 wine colour, warm surfaces, upright Pagio headings and Jakarta body/control fonts. A scoped `admin.css` supplies an operations-appropriate heading scale and dense data spacing; storefront typography and commerce cards are unchanged. Desktop uses a 220px sidebar; below950px native expandable navigation replaces it. Tables scroll inside labelled focusable regions, with stacked filters/forms and16px inputs on phones. Decorative divider lines are not introduced; necessary form/focus outlines remain.

The root layout preserves one `main#main` and the existing skip link. A pathname-aware StorefrontChrome wrapper omits shopping Header, Footer, cart-count requests and storefront reveal effects only on `/admin` and its descendants. Admin metadata is noindex/nofollow/noarchive; this is a crawler instruction, not authorization. This operations portal does not reuse or activate the older frontend_appview PIN/vault dashboard.

CURRENT / IMPLEMENTED: AdminProvider checks the existing HttpOnly cookie through `/api/v1/auth/admin/session`. Because that cookie is scoped to `/api/v1/auth`, private data is not passed through Server Component props and the initial page contains only an access-check state. A401 clears the private view and returns to existing `/account?next=/admin`; a403 shows restricted access. These are client view states backed by HTTP401/403 APIs, not a claim that the initial `/admin` HTML response itself is HTTP403. Session checks repeat on navigation, when the tab regains focus and after an API403. An unchanged authorized session preserves the domain-specific403 message and unsaved form; changed or revoked authority clears/remounts the private view. Navigation/action visibility follows server-returned permissions, while every API independently authorizes access. No private records or role decisions are stored in localStorage.

CURRENT / IMPLEMENTED UI flows:

- Overview/Analytics: explicit date interval, currency and display timezone; needs-attention links; sourced metrics with definitions; product-unit results and workflow-readiness reasons. Missing reporting defaults require an explicit selection. Query failures show errors, never fabricated zero metrics. UTC interval boundaries are labelled and the end is exclusive.
- Orders, Customers, Products/Variants/Categories, Inventory, Payments, Refunds, Invoices, Coupons, Shipping, Notifications and Audit Logs: bounded server-driven search/filter/cursor pages, explicit empty/loading/error states, versioned detail views and permission-filtered related histories. Related address, coupon-use and stock-movement pages are separately paginated.
- Customer/order/invoice detail: recorded item/contact/address snapshots and linked history. Financial amounts are formatted from integer minor units and their recorded currency exponent; an absent currency is labelled unknown. No public invoice document URL or raw database/JSON dump is rendered.
- Catalogue/coupon creation and supported updates, stock adjustments with a reason, and a reviewed paid/confirmed-order processing action use explicit forms. Each request carries the expected version when applicable and a retained idempotency key for the same-payload retry. A409 asks the operator to refresh; an unconfirmed failure does not announce success or automatically replay a mutation.
- Owner settings configure reporting currency/timezone only. Staff access targets existing users, shows explicit grantable permission checkboxes, requires a reason, prevents OWNER/disabled-account editing in the view and discloses that suspending User sign-in affects customer sign-in too. Removing ADMIN clears permissions; every access change revokes that user's sessions on the server.

CURRENT / PARTIAL: refund initiation/approval, cancellation compensation, carrier writes, notification delivery/retry and private invoice/PDF generation are unavailable actions with server capability reasons. Existing records remain inspectable. Catalogue forms cover supported fields and approved image URLs; they do not provide an upload pipeline or every possible media/SEO/variant-attribute edit. Settings do not invent tax, refund, invoice, shipping or revenue-recognition policy. No export/bulk-action UI or customer-data editing is claimed.

Sources: `B2C/src/app/admin`, `B2C/src/components/admin`, `B2C/src/lib/admin`, the Account allowlisted return and root chrome wrapper. Verification performed for this increment: full frontend ESLint and TypeScript pass; eight admin client contract tests pass; production webpack build passes in a temporary source copy without .env files, preserving the live `.next` directory. Actual API/browser evidence and deployment limits are recorded separately in TESTING/CURRENT_STATUS; a build is not proof of live provider or database connectivity.
