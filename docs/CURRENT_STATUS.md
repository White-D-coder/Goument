## 2026-10-10 — Trim product-detail copy on phones (R115)

CURRENT / IMPLEMENTED source: hide mobile breadcrumbs and repeated delivery/bulk/help copy, clamp product descriptions to two lines, and remove the phone-only image/story panel with no visible copy. Keep product title, short description, primary price/cart bar, gift-note personalize control and collapsed product detail disclosures. Typecheck, scoped ESLint, CSS parse and `git diff --check` pass; visual browser review remains UNKNOWN because localhost:3000 is unavailable.

## 2026-10-10 — Product detail phone layout (R114)

CURRENT / IMPLEMENTED source: make product detail pages phone-first around a square rounded gallery, compact product information and a fixed safe-area-aware purchase bar. Existing price/enquiry state, AddGiftToCartButton quantity state and checkout action remain unchanged. Gallery thumbnails render as pagination dots on phones when multiple real images exist; the Shagun local fallback currently supplies one image, so no extra slides are invented. Typecheck, scoped ESLint, CSS parse and `git diff --check` pass. Local page/browser rendering is UNKNOWN because localhost:3000 is unavailable.

## 2026-10-10 — Restore local B2C auth and gift-draft runtime

CURRENT / IMPLEMENTED: `B2C/backend/.env` now targets an isolated local Mongo replica set (`gourmet_b2c_schema_dev`) instead of the previously configured Atlas database. The ignored `B2C/backend/data/local-mongo` directory holds local dev data. Local Mongo and auth service are running; Next auth proxy on port3000 returns200 for gift-draft GET/PUT and the written selection reads back after reload. Signed-out `/auth/me` returns the expected401. The disposable test draft was cleared.

UNKNOWN / EXTERNAL: the former Atlas TLS failure is not fixed or retested; local auth no longer depends on it. No credentials or customer records were copied. Verification only establishes local development persistence, not production database connectivity.

## 2026-10-09 — Remove Home navbar/hero partition (R112)

CURRENT / IMPLEMENTED source: remove the top spacer so the Home hero begins directly after the in-flow navbar. Keep initial transparency and scroll background behavior. Verification pending; visual appearance UNKNOWN.

## 2026-10-09 — Keep Home hero below navbar (R111)

CURRENT / IMPLEMENTED source: keep the transparent-at-top, ivory-on-scroll navbar in normal flow. Restore 40px desktop/24px phone spacing before the hero; do not move the hero upward. Production build and `git diff --check` pass; browser appearance UNKNOWN.

## 2026-10-09 — Transparent Home navbar overlays hero (R110, SUPERSEDED by R111)

CURRENT / IMPLEMENTED source: overlay the navbar transparently over the hero at page top so the image shows through; retain the ivory background on scroll. Remove the extra top padding. Production build and `git diff --check` pass; browser appearance UNKNOWN.

## 2026-10-09 — Move watermark to top and whiten hero text (R109)

CURRENT / IMPLEMENTED source: extend the page-edge mandala into the transparent header, and set hero copy/promise labels white with a contrast fade or dark stacked copy panel. Production build, focused ESLint and `git diff --check` pass; browser appearance UNKNOWN.

## 2026-10-09 — Increase Home hero top spacing (R108, SUPERSEDED by R110; restored by R111)

CURRENT / IMPLEMENTED source: create a 40px desktop/24px phone gap between the in-flow navbar and the full-width hero using page top padding. Production build and `git diff --check` pass; browser appearance UNKNOWN.

## 2026-10-09 — Space Home hero below navbar (R107, SUPERSEDED by R108)

CURRENT / IMPLEMENTED source: keep the transparent Home navbar in normal flow; use an 18px desktop/12px phone gap before the full-width hero. Production build and `git diff --check` pass; browser appearance UNKNOWN.

## 2026-10-09 — Overlay transparent Home navbar on hero (R106, SUPERSEDED by R107)

CURRENT / IMPLEMENTED source: Home navbar overlays the hero with a transparent background at the top; scrolling reveals an ivory background, divider and shadow. Negative header margin keeps the hero behind the navbar without adding a gap. Verification pending.

## 2026-10-09 — Full-width Home hero images (R105)

CURRENT / IMPLEMENTED source: use the three supplied 2129 × 739 hero images as full-width fading slides, with hero text over the open left portion and centered dots. Keep complete image framing; stack the image above copy on phones. Production build and `git diff --check` pass; browser appearance UNKNOWN.

## 2026-10-09 — Transparent Home navbar until scroll (R104)

CURRENT / IMPLEMENTED source: the Home header starts transparent and gains an ivory background with divider/shadow when scrolled. Header remains in normal flow, preserving the no-gap hero placement. Production build and `git diff --check` pass; browser appearance remains UNKNOWN.

## 2026-10-09 — Fade Home hero photos with slide dots (R103)

CURRENT / IMPLEMENTED source: three existing gift photos crossfade in the Home hero. Bottom-centered dots select images; keep full photos visible and disable autoplay for reduced motion. Typecheck, focused ESLint, production build and `git diff --check` pass; browser appearance remains UNKNOWN.

## 2026-10-09 — Restore B2C navbar and close hero gap (R102)

CURRENT / IMPLEMENTED source: Home header uses the original monogram, Shop trigger and Hampers/Collections/Corporate links. Preserve all four Shop categories and hover/touch behavior. Header occupies normal flow and Home hero has no top margin. Typecheck, focused ESLint, production build and `git diff --check` pass; browser appearance remains UNKNOWN.

## 2026-10-09 — Increase Home watermark opacity (R101)

CURRENT / IMPLEMENTED source: increase the side mandala watermark from 10% to 20% opacity, retaining its edge mask and background stacking. `git diff --check` passes.

## 2026-10-09 — Refresh the Home hero banner (R100)

CURRENT / IMPLEMENTED source: restyle the hero as a rounded inset banner with a separate left copy panel and 16:9 right-side photo frame; retain brand copy and actions. Phone view stacks the framed photo above its copy. Production build, focused ESLint and `git diff --check` pass.

## 2026-10-09 — Center Home section titles (R99)

CURRENT / IMPLEMENTED source: center all Home section-level and card titles except the left-aligned hero headline. Keep section actions alongside headings on desktop and place them beneath centered titles on phones. Typecheck, production build, focused ESLint and `git diff --check` pass.

## 2026-10-09 — Remove Home flavour-story section and contain hero imagery (R98)

CURRENT / IMPLEMENTED source: remove the complete “Familiar flavours. Fresh discoveries.” section and carousel from Home. Confine the hero photo to its right-hand visual panel using explicit grid areas and stacking; make card/feature photos fill their frames without hover scaling. `npm run typecheck`, production build, focused ESLint and `git diff --check` pass; browser appearance remains UNKNOWN.

## 2026-10-09 — Redesign B2C Home to the gifting storefront reference (R97)

CURRENT / IMPLEMENTED source: replace the monogram full-screen Home with a solid editorial navbar, split copy/photo hero, three visual hamper cards built from the two existing hamper identities and India color photos, compact catalogue favourites with cart quantity controls, and a packaging feature. Retain existing story, philosophy, FAQ and corporate content. Phone hamper cards remain a swipe rail and show only image/title; favourites use a two-column layout. Use current catalogue data; do not invent hamper prices or delivery claims. `npm run typecheck`, `npm run build`, focused ESLint and `git diff --check` pass. Full ESLint still reports a pre-existing `no-explicit-any` error in `src/lib/types.ts`; no browser automation is available, so visual behavior remains UNKNOWN.

## 2026-10-09 — Redesign the lower product-detail sections (R96)

CURRENT / IMPLEMENTED source: combine product lifestyle photography and the giving statement into a balanced image-and-copy editorial row; tighten the personalization area into a three-step layout; place finer details in a contained ivory panel. Preserve copy, links, accordions and phone behavior. `npm run typecheck`, `npm run build`, CSS parsing and `git diff --check` passed. Browser appearance remains UNKNOWN; no browser automation package is installed in this app.

## 2026-10-09 — Remove the PDP “What’s inside” story section (R95)

CURRENT / IMPLEMENTED source: remove the numbered “What’s inside” editorial section, its alternating product photos/copy, and its link to product details from `/products/[slug]`. Keep the main product gallery, its existing close-up thumbnails, and the separate collapsed “What’s included” accordion. Typecheck, production build, CSS parsing and `git diff --check` passed. Browser appearance remains UNKNOWN.

## 2026-10-09 — Use regular title font on phones (R94)

CURRENT / IMPLEMENTED source: use Plus Jakarta Sans for B2C phone titles/headings through 640px, including Home hamper titles; keep display Cormorant on larger viewports. Existing sizes, text and layout remain. Admin headings are excluded. CSS parsing and `git diff --check` passed; browser appearance is UNKNOWN.

## 2026-10-09 — Unify B2C title typography (R93)

CURRENT / IMPLEMENTED source: use the locally bundled Cormorant Garamond for B2C page, section, and card headings on desktop/tablet, including Home's “Our Gift Hampers.” R94 uses Plus Jakarta Sans for titles on phones. Preserve Plus Jakarta Sans for body copy, navigation, controls and admin. This supersedes R65's Pagio/Manrope title direction. `npm run typecheck`, `npm run build`, CSS parsing and `git diff --check` passed; browser appearance is UNKNOWN.

## 2026-10-09 — Phone-first storefront pass (R91–R92)

CURRENT / IMPLEMENTED source: compact phone layouts across Home, Shop and collections, product details, gift builder, cart, account and delivery checkout. Keep catalogue/build cards photo-forward, hide secondary descriptions where the item title/action carries the choice, tighten page rhythm and use horizontal snap rails for long photo-story groups. Preserve essential product/pricing/enquiry facts, form labels, order details and checkout actions. On Home, remove the long philosophy paragraph and four secondary card descriptions on phones. Footer section titles now use the storefront serif display face. Sources: `B2C/src/app/b2c/home.css`, `shop/shop.css`, `product-detail.css`, `globals.css`, `B2C/src/components/home/home-footer.css`. Browser appearance is UNKNOWN.

## 2026-10-09 — Simplify Home hamper cards on phones (R90)

CURRENT / IMPLEMENTED source: show only each hamper photo and linked title on phones; hide the description and Explore button. Photo and title continue to open the existing product page. Larger viewports are unchanged. Browser appearance not verified.

## 2026-10-09 — Open Shop menu on hover (R89)

CURRENT / IMPLEMENTED source: open the Shop dropdown when the pointer enters and close it when the pointer leaves, while preserving keyboard focus and touch click-to-toggle behavior. Browser interaction not verified.

## 2026-10-09 — Expand Shop navbar menu (R88)

CURRENT / IMPLEMENTED source: replace the Shop dropdown's two direct collection links with four same-page catalogue filters: Envelopes, Hampers, Laddoo Candles, and Premium Stationery. Browser interaction not verified.

## 2026-10-09 — Prioritize hamper photos on phones (R87)

CURRENT / IMPLEMENTED source: enlarge phone hamper photos relative to their information panels by giving images a taller aspect ratio and tightening title, copy, spacing and action dimensions. Larger breakpoints and carousel behavior remain unchanged. Browser appearance not verified.

## 2026-10-09 — Hide Gourmet Story intro on phones (R86)

CURRENT / IMPLEMENTED source: hide the Gourmet Story title/paragraph block and its Explore gourmet hampers link at phone widths only. Keep the story cards and controls, and leave larger viewports unchanged. Browser appearance not verified.

## 2026-10-09 — Phone-only hamper carousel (R85)

CURRENT / IMPLEMENTED source: the Home hamper cards form a horizontal swipe/scroll-snap carousel at phone widths, with the next card peeking into view. Tablet and desktop retain their grid. Browser appearance not verified.

## 2026-10-09 — Keep Shop category browsing on All gifts (R84)

CURRENT / IMPLEMENTED source: the Shop sidebar's Envelopes and Hampers links now filter `/shop` instead of navigating to dedicated collection routes. The unfiltered All gifts catalogue includes the Ivory and India hamper previews alongside its existing products; these retain enquiry-only status and receive no price/cart mapping. Existing envelope catalogue entries remain in the combined results. Browser/runtime verification not run.

## 2026-10-09 — Rounded corporate CTA top corners

CURRENT / IMPLEMENTED source: round the top corners of the Home burgundy corporate CTA section (32px desktop, 24px phone). Browser appearance not verified.

## 2026-10-09 — Hamper section corner watermark

CURRENT / IMPLEMENTED source: reuse the approved mandala at the upper-left and upper-right corners of the Home hamper showcase, fading down before it reaches the card area. Existing page-side watermark remains. Browser appearance not verified.

## 2026-10-09 — Hide the B2C Home page scrollbar

CURRENT / IMPLEMENTED source: hide the viewport scrollbar while retaining normal page scrolling when `.tgg-home` is present. Inner horizontal rails keep their own scrolling behavior. Browser verification not run.

## 2026-10-09 — Home side watermark

CURRENT / IMPLEMENTED source: restore the existing Diwali mandala artwork as a faint, edge-masked page watermark behind the B2C Home content, at 26% opacity. Reuse `B2C/public/images/patterns/diwali_mandala_bg.jpg`; no new image or route change. No browser verification was run for this increment.

# Current Status

## 2026-10-08 — Center Home FAQ (R79)

CURRENT / IMPLEMENTED source: centered Home FAQ heading and disclosure rows in a responsive max-width column; question/answer text is centered and plus controls remain row-aligned. `git diff --check` passed; visual acceptance UNKNOWN.

## 2026-10-08 — Smooth flavour-story carousel (R78)

CURRENT / IMPLEMENTED source: Home regional flavour stories use a responsive horizontal scroll-snap carousel with labelled previous/next controls and native swipe/scroll. No autoplay; reduced motion is respected. `npm run typecheck`, scoped ESLint on both touched components and `git diff --check` passed; browser preview unavailable, visual acceptance UNKNOWN.

## 2026-10-08 — Remove Home packaging feature (R77)

CURRENT / IMPLEMENTED source: removed the “Picked well. Packed beautifully.” block, its three image/caption items and related CSS. Adjacent Home sections remain. TypeScript, scoped ESLint and `git diff --check` passed; visual acceptance UNKNOWN.

## 2026-10-08 — Remove hero calls to action (R76)

CURRENT / IMPLEMENTED source: removed all three links beneath the Home monogram and centered the monogram within the hero. Navbar, Hampers and later Corporate entry remain. TypeScript, scoped ESLint and `git diff --check` passed; visual acceptance UNKNOWN.

## 2026-10-08 — Replace Home hero copy with TGG monogram (R75)

CURRENT / IMPLEMENTED source: hero headline and supporting copy are replaced by the supplied TGG monogram, recolored white with a CSS filter over its transparent background. Accessible heading text and existing actions/motion remain. TypeScript, scoped ESLint and `git diff --check` passed; visual acceptance UNKNOWN.

## 2026-10-08 — Remove stacked Home hero spacing (R74)

CURRENT / IMPLEMENTED source: consolidated spacing between hero title, supporting copy and actions into controlled gaps; removed the mobile action row's duplicated top margin and tightened vertical padding. TypeScript, scoped ESLint and `git diff --check` passed; visual acceptance UNKNOWN.

## 2026-10-08 — Improve Home hero readability and title font (R73)

CURRENT / IMPLEMENTED source: hero content can increase the section height instead of clipping; a darker image shade and outlined secondary action improve contrast, with the Corporate link clarified. The headline uses bundled Manrope. TypeScript, scoped ESLint and `git diff --check` passed; visual acceptance UNKNOWN.

## 2026-10-08 — Editorial Gourmet Story section (R72)

CURRENT / IMPLEMENTED source: redesigned the regional flavour section with a split editorial header and three numbered, image-led stories. The mobile layout keeps each image and its caption together. Existing copy, assets, alt text, `/shop/hampers` action and reveal behavior remain. TypeScript, scoped ESLint and `git diff --check` passed; visual acceptance UNKNOWN.

## 2026-10-08 — India hamper Home hero and larger display headline (R71)

CURRENT / IMPLEMENTED source: the first hero slide is now the supplied India hamper photo; the remaining slideshow images still crossfade. The hero uses the bundled Cormorant Garamond font directly at a larger responsive size. Removed the divider before Brand Philosophy but retained its content and spacing. TypeScript, scoped ESLint and `git diff --check` passed; visual acceptance UNKNOWN.

## 2026-10-08 — Remove Home hero pause/play control (R70)

CURRENT / IMPLEMENTED source: removed the Home slideshow pause/play button; timed image rotation, tab visibility handling and reduced-motion behavior remain. TypeScript and scoped ESLint checks passed; visual acceptance UNKNOWN.

## 2026-10-08 — Remove Home collection and occasion feature sections (R69)

CURRENT / IMPLEMENTED source: removed the three-link collection strip and complete Wedding/Tea & Coffee feature section from Home. Hero and navbar collection actions now lead to `/shop`. R77 also removes the packaging feature. Remaining Home content and dedicated Shop/product/enquiry routes stay in place. TypeScript and `git diff --check` passed; visual acceptance UNKNOWN.

## 2026-10-08 — Centered Home hero typography and animation (R68)

CURRENT / IMPLEMENTED source: centered the brand line, headline, supporting copy and actions. The hero now uses Cormorant Garamond and the exact footer wordmark rise/blur/stagger variants, triggered once on entry; reduced-motion users see it statically. Supporting copy now reads “Gourmet hampers, little indulgences and thoughtful keepsakes. For the people who matter.” TypeScript and diff checks passed; visual acceptance UNKNOWN.

## 2026-10-08 — Remove Home favourites heading (R66)

SUPERSEDED IN PART by R67: the heading block was removed, then the user clarified that the Candles/Shagun feature cards should also be removed.

## 2026-10-08 — Home hampers lead directly to collections (R67)

SUPERSEDED by R69: the collection strip that R67 placed after Hampers has now been removed; collection actions lead to `/shop`.

## 2026-10-08 — Home headline typography (R65)

CURRENT / IMPLEMENTED source, with the hero font superseded by R68: Home section headlines and product titles use the bundled Pagio display face with reduced desktop/mobile sizing and regular weight. Body, navigation and action typography remain unchanged. Source checks only; visual acceptance UNKNOWN.

## 2026-10-08 — Home favourites row redesign (R64)

SUPERSEDED ON HOME by R67: the Candles/Shagun feature cards were subsequently removed; Shop and product pages retain their cards.

## 2026-10-08 — Home hamper overlays and hero typography (R63)

CURRENT / IMPLEMENTED source: Home hamper details now sit centered over each photo, softly revealed on hover/focus and always visible on touch; the separate text panel and top capsule are removed. The image does not zoom. Hero headline/copy changed to “A little something. A lot of thought.” with a refined display face at a smaller scale and warmer supporting copy. R65 superseded its Cormorant assignment and R68 selects Cormorant again specifically for the hero. No browser check was run; visual acceptance is UNKNOWN.

## 2026-10-08 — Hampers lead the Home journey (R62)

CURRENT / IMPLEMENTED source: the section after the full-screen hero now showcases the two existing enquiry-only hamper previews instead of occasion discovery. The panel has rounded top corners and overlaps the hero image. Each hamper is one full image card with centered title/copy/enquiry/action overlay, revealed on hover or keyboard focus and permanently visible on touch. Top capsules and separate text panels are removed; card lift is subtle and image scale remains unchanged. Those hampers are filtered from the later favourites row, which now displays the existing Candles and Shagun products once. Home navigation/footer target the Hamper showcase. Dedicated Shop pages and dropdown remain. No prices, stock or cart mappings were added. No tests/build/browser checks were run; visual acceptance and runtime behavior are UNKNOWN.

## 2026-10-08 — Split-rail occasions layout (R61)

SUPERSEDED ON HOME by R62. The split-rail question and occasion mosaic are removed from the visible Home.

## 2026-10-08 — Home occasions mosaic (R60)

SUPERSEDED IN PART by R61's desktop/tablet layout. The full-bleed photo treatment, eight destinations and phone composition remain current.

## 2026-10-08 — Home scroll overlap and storefront titles (R59)

SUPERSEDED IN PART by R62: the full-width rounded section-over-hero behavior remains, but the visible section is now Hampers instead of “Who are you thinking of?”. The three-photo hero crossfade/frame remains. Manrope titles and Jakarta body/menu fonts remain; Home's former Occasions quick link now says Hampers. Runtime/visual acceptance remain UNKNOWN.

## 2026-10-07 — Premium consumer-first Home (R58)

CURRENT / IMPLEMENTED source, with opening content superseded by R62, favourites removed by R67 and collection/occasion sections removed by R69: the Home uses an ivory/burgundy design. Hero leads into the two enquiry-only hamper previews, then brand philosophy/assurance, regional flavours, photographed Ivory contents, packaging, personalisation, secondary corporate invitation, six FAQs and Home footer. Approved testimonial list remains empty. Other Shop/PDP layouts and India gallery grouping remain.

CURRENT / IMPLEMENTED source: typed content and reusable server-rendered sections, scoped Home tokens/CSS, composed phone layouts, responsive Next images, two self-hosted Latin variable brand fonts totaling65,048bytes and optional controlled mask motion with reduced-motion/focus/navigation cleanup. The confirmed canonical is `https://b2c-tau-weld.vercel.app/b2c`. Route-specific loading fallbacks keep Home outside the former root boundary; final isolated build, TypeScript/lint,23 regression cases,13 responsive viewports, production no-JS/photo checks and mocked cart/form checks pass; evidence and limits are recorded in TESTING.

CURRENT / PARTIAL commercial setup: hampers remain enquiry-only, photographed contents are illustrative, personalisation is an email request and Tea/Coffee is an enquiry feature. Hamper selections can be saved to the gift bag; checkout/address/order routes reject drafts containing an enquiry-only hamper until real pricing is confirmed. Existing candle/envelope catalogue prices and gift-cart controls are reused. Final hamper prices/stock/contents, delivery/tax/return policy, complimentary-note policy, real approved endorsements and deployed performance remain UNKNOWN. User visual acceptance remains UNKNOWN.

## 2026-10-07 — Hamper card layout correction

SUPERSEDED ON HOME by R58. Dedicated Hampers collection rules and existing commerce/PDP invariants remain current; the following records the earlier correction.

CURRENT / IMPLEMENTED: user rejects the narrow, ornate homepage hamper cards in a screenshot. Removed Home's hamper grid from the legacy `signature-grid` class, whose four-column `!important` rule defeated the two-product layout. Home now uses a centered1120px maximum, two equal wide cards and one column at<=600px; the dedicated Hampers collection follows the same two/one-column rule. Hamper-only cards use a fine complete border, large contained photos, compact left-aligned names/enquiry copy and a View hamper arrow action. Non-hamper frames and product-detail design retain their existing styling. Preview pricing and commerce contracts remain unchanged. Responsive evidence: TESTING; user visual acceptance UNKNOWN.

## 2026-10-07 — Editorial product detail pages

CURRENT / IMPLEMENTED: `/products/[slug]` now uses large product photography, a desktop sticky purchase column, short descriptions, visible existing catalogue amounts, enquiry-only preview hampers, a gift-note request, alternating contents stories, lifestyle imagery, brand/personalisation sections, native detail accordions, up to three related gifts and a burgundy consultation CTA. Existing India Burgundy/Lavender thumbnail behaviour and gift-cart quantity semantics remain. Home order/design, shared card frames and header/footer remain unchanged by this increment.

CURRENT / PARTIAL: Ivory/India prices, saleable inventory mappings, final bundle contents/quantities, dimensions, delivery/tax/return terms and complimentary-note policy remain UNKNOWN. Photographed contents are explicitly illustrative; personalisation opens an email request, not a saved cart option. No fictional price, stock, delivery promise or included benefit was added. Verification and limits: TESTING.

SUPERSEDED ON HOME by R58 (2026-10-07): earlier homepage order was Hero → Hampers → Collections → Occasions → Assurance → Brand story. Scoped Home ESLint and local HTTP200 order checks passed for that historical version.

## 2026-10-07 — Restore the previous homepage

SUPERSEDED ON HOME by R58's later explicit redesign brief. The rejection/removal of R52/R53 remains effective.

CURRENT / IMPLEMENTED: user rejects the recent cinematic hero, sticky three-stage story and stacking collection redesign. Restored the prior HeroSlideshow/HeroTitle, GoldPopperSprinkle, three collection circles, occasion rail, assurance strip, brand story and previous Home header/motion behavior. Ivory/India hamper cards, their thumbnail gallery, Shop dropdown and earlier frame/performance changes remain. New redesign components, styles, controller, dedicated tests and derivative assets removed. TypeScript, scoped lint,7 existing catalogue/performance tests and local HTTP rendering checks pass; see TESTING.

## 2026-10-07 — Premium editorial Home

SUPERSEDED / REVERTED: user explicitly rejected this redesign and requested the previous homepage. The implementation and its dedicated tests/assets have been removed; details below record the attempted design and its historical checks.

HISTORICAL / REVERTED: burgundy mask-reveal hero contracts into a framed ivory brand statement; a pinned three-chapter gift story follows; four collection panels stack like magazine pages. Uses existing photography, Cormorant/Jakarta, burgundy/ivory/stone/gold and native scrolling. Home's slideshow, particles, mandala background and generic fade-ups are no longer mounted. Existing two hamper product cards and commerce/Shop navigation remain. Reduced-motion and<=600px-high viewports receive normal content flow. New collection themes reuse existing routes; no catalogue or pricing data added.

VERIFIED: TypeScript, scoped ESLint,15 lifecycle/catalogue/performance tests, three CSS parses and diff check pass. Isolated Chrome checks1440×1000,1024×768,768×1024,390×844 and320×640: reversible hero sizing, fixed story visual through all three stages, four stacking/clickable cards and no horizontal overflow. Mask start/middle/end, live reduced-motion change,844×390 short-height fallback, keyboard Enter navigation, client-route cleanup and no-JS content checks pass with no uncaught browser exceptions. Desktop/tablet/phone screenshots inspected. Visual acceptance, real-device frame pacing and production Core Web Vitals remain UNKNOWN. No build, deployment or commerce/provider writes; full scope in TESTING.

## 2026-10-07 — Full-card frame correction

CURRENT / IMPLEMENTED: corrected the photo-only border after user points out the text is outside it. One gold filigree frame now surrounds photo, title, price, action and any feedback. Existing asset is reused through CSS border-image; responsive internal padding and wrapping keep content within the frame. No JSX, asset or commerce changes.

VERIFIED: CSS parsing, diff check and isolated Home/Shop/Envelopes checks at320/390/768/1440px (36 cards) confirm the frame covers each whole card, every content element fits within its inner padding, buttons remain44px/clickable and photos do not zoom. Long-title/error-message DOM simulation at320px also fits. Desktop/phone screenshots inspected; visual approval UNKNOWN. See TESTING for limits.

## 2026-10-07 — Ornate reference frame

CURRENT / IMPLEMENTED: user's new gold filigree reference replaces the rejected cut-corner mount. Shared cards use a transparent double-border/acanthus/fleur-de-lis overlay around inset photographs. Project WebP171982bytes; shared cached asset, no new JS. Existing card type/content/actions and no-zoom behavior retained; visual acceptance UNKNOWN.

VERIFIED: CSS parsing, alpha/ornament-clearance inspection, diff check and final-source browser checks on Home/Shop/Envelopes at320/390/768/1440px (36 cards). Frame loads, photos remain contained, no horizontal overflow or hover zoom, titles/actions fit and buttons stay44px high. Desktop/phone screenshots inspected; no production build or commerce retest for this CSS/asset-only increment. Prompt/provenance: UI_SYSTEM; checks: TESTING.

## 2026-10-07 — Product frame redesign

CURRENT / IMPLEMENTED: shared Home/Shop/Envelopes cards use a fine gold, cut-corner ivory mount inspired by premium stationery, replacing the arch. Existing photographs, typography, actions and no-zoom behavior retained. CSS-only; no new asset or runtime dependency. Visual acceptance UNKNOWN.

VERIFIED: PostCSS parsing and diff check; isolated final-source Chrome checks across Home, Shop and Envelopes at320/390/768/1440px (36 card instances). Images stay within the frame, decorations cannot intercept clicks, actions/titles fit, buttons remain44px high, and pointer hover causes no image transform. Desktop/phone screenshots inspected; full limits in TESTING.

## 2026-10-07 — Shop navigation and collection pages

CURRENT / IMPLEMENTED: Shop now expands to exactly Envelopes and Hampers, linking to `/shop/envelopes` and `/shop/hampers`. Responsive disclosure and shared collection pages reuse existing Shop styling, photos, ProductCard and catalogue searches. Home/Shop Hampers links use the new route. The envelope page renders the Shagun product; Hampers currently renders an honest empty state. The mobile wordmark now shrinks/wraps below640px so the menu button remains inside the viewport.

VERIFIED: TypeScript, scoped ESLint, seven existing catalogue/performance tests, CSS parsing and diff checks pass. Isolated Chrome checks at320/390/640/768/1024/1440px pass: desktop/mobile opening, two links, active route, keyboard Enter/Tab/Escape, outside-click/blur closure, collection navigation, mobile-menu closure, sort URL, direct page/reload and menu/viewport fit. Phone/desktop screenshots inspected. No production build/deployment, authenticated-admin, live cart/provider writes or multi-page catalogue data verified. Existing backend search/category issues remain recorded in TODO; source/API/model contracts were not changed.

## 2026-10-05 — Font audit

CURRENT / IMPLEMENTED evidence: five storefront routes at1440/390px use Cormorant Garamond and Plus Jakarta Sans; Account Google sign-in adds Arial. Pagio is assigned to the admin wordmark in source, unverified in authenticated runtime.7 globally configured custom families include unused declarations; separate Kids font is inactive. CURRENT / BROKEN: footer h2 renders Cormorant because global !important defeats the intended Jakarta rule. CURRENT / PARTIAL: action casing/weight/tracking and microcopy sizing lack a consistent shared role system. Findings recorded in UI_SYSTEM/TESTING/TODO; no styling changes made for the user's audit request.

## 2026-10-05 — Floral cards and compact product actions

CURRENT / IMPLEMENTED: shared Home/Shop cards now use tall arched photographs with a fine gold frame and open details, replacing the further-rejected rounded boxed-card treatment. Card outer surface/border/shadow/lift disabled; photos stay inside the gold arch with6px inset /4px phone and no zoom. Centered burgundy Cormorant names, restrained Jakarta amounts and44px solid burgundy cart/detail actions retain existing images/fonts/commerce branches. Descriptions, capsules and likes remain absent. Native CSS only; earlier ornaments preserved but inactive. Visual acceptance UNKNOWN; responsive layout evidence: TESTING.

CURRENT / IMPLEMENTED: gift product details have shorter candle copy, no repeated open description or pricing instruction, and an opt-in quantity control beside Add to Cart after confirmed saving. Existing QuantityControl is reused; decrement-to-zero removes the selection. Delta writes retain the existing cookie-owned draft, queue, revision checks, packaging and other items. Home/Shop button behavior is unchanged.

VERIFIED: TypeScript, scoped ESLint,19 helper/API cases and CSS parsing pass. Isolated Chrome checks Home/Shop frame fit at320/390/768/1440px; desktop/phone screenshots inspected. Product add/increment/failed-save retention/decrement/reload/removal passed with mocked browser responses, not live persistence. Detailed limits: TESTING. Production build/payment/provider/deployment not verified in this increment.

## 2026-10-05 — B2C lag reduction

CURRENT / IMPLEMENTED: Next scroll-behavior marker, threshold-only header updates, removal of hidden blurred hero layers, same-size WebP hero assets (68.5% smaller), and bounded canvas allocation/cleanup. TypeScript/scoped lint, seven combined regression cases, CSS parsing and fresh homepage HTML passed. Warm local homepageHTTP200 in0.593s after a recompilation timeout. Local webpack trace includes76–183s compile/invalidation spans. CURRENT / PARTIAL: no post-change frame-rate measurement; second browser diagnostic was declined. Full lint still fails on types.ts and warns in GiftBuilder; prior GoldPopper lint finding is resolved. See PERFORMANCE/TESTING for limits.

2026-10-05 card refinement — CURRENT / IMPLEMENTED: standalone Price label removed from shared Home/Shop cards. Scoped lint/CSS parsing pass; fresh local homepage HTML retains all four card amounts and contains no price-label element. No backend or payment change.

## 2026-10-05 — B2C collection grouping

CURRENT / IMPLEMENTED: Home collection circles and Shop navigation use three collections: Hampers, Laddoo Candles and Premium Stationery. Latest user clarification merges Shagun into Premium Stationery and selects the Shagun envelopes photo for the merged collection. Premium Stationery combines the existing envelopes, bookmarks and custom diary gift set; the separate Shagun collection-navigation entry is removed. Existing occasion/product-specific Shagun searches remain. Hampers points to the existing `/b2c#hampers` section. Combined stationery API searches include all source pages, deduplicate and sort before storefront pagination; local fallback includes the same three groups.

VERIFIED: TypeScript, scoped ESLint and three catalogue regression cases passed. HTTP-rendered `/b2c` and `/shop?search=stationery` on local port3000 contain all four collection links and the three intended stationery products. Browser visual inspection and production build were not run for this increment. Full lint remains blocked by existing GoldPopperSprinkle effect and types.ts explicit-any errors, plus a GiftBuilder unused-variable warning. No database/category migration or financial behavior changed.

Latest refinement VERIFIED: TypeScript, scoped lint and CSS parsing pass; fresh local homepage HTML contains exactly three collection titles and the Shagun image on the stationery link. Earlier four-link evidence above describes the superseded intermediate state. Mobile collection links can shrink to fit the three-link row; browser geometry was not measured.

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
# 2026-10-09 — India hamper Home card label

CURRENT / IMPLEMENTED source: the ivory Home card displays “Ivory Hamper”; both burgundy/lavender cards display “India Hamper.” All keep their existing detail routes and photos. Verified with `npm run typecheck` and `git diff --check` on 2026-10-09.

## 2026-10-09 — Home collection cards

CURRENT / IMPLEMENTED source: Home presents three collection cards for envelopes, scented candles, and Eternal Paper Co. stationery. The Eternal Paper Co. card groups bookmark and diary discovery. Cards link to collection pages; `/shop/candles` and `/shop/stationery` now use the shared collection layout. The separate hamper showcase is unchanged. Typecheck and production build passed; focused ESLint has no errors (two existing `<img>` warnings in HomeSections). Build warns that it inferred the workspace root from multiple lockfiles.

## 2026-10-10 — Home packaging feature image

CURRENT / IMPLEMENTED source: the Home packaging feature uses `/images/brand/cta_1_1.png` with alternative text describing its open gift hamper. `npm run typecheck` and `git diff --check` pass; focused ESLint has no errors and reports two existing `<img>` warnings in HomeSections.
