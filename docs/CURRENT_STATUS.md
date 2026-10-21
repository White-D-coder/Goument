## 2026-10-21 — First four UX audit fixes (R281)

CURRENT / IMPLEMENTED locally: user-approved fixes restore desktop hero-dot clicks, correct gift-note FAQ guidance to the existing email, use the existing muted description colour and expose the phone Home H1 without visible hero copy. Images/layout/theme/shopping flow preserved. Before/after geometry/image-source checks atnine widths320–1920px,27 pointer dot selections, accessible heading/FAQ checks and synthetic native phone shopping/desktop CTA navigation pass; typecheck/scoped lint/diff checks pass. UI_SYSTEM/TESTING contain detail and limits. UX01–UX04 audit findings resolved locally; remaining audit proposals unchanged. No backend/schema/financial changes or deployment.

## 2026-10-21 — B2C UX audit (no UI changes)

CURRENT / IMPLEMENTED audit only: source/history review and 40 local route/viewport samples across 320–1920px, with synthetic customer APIs. All samples have zero horizontal page overflow. Reproduced desktop hero-dot interception at1440/1920px; confirmed stale gift-note FAQ guidance, phone Home H1 hidden from accessibility tree and a4.39:1 description contrast sample. Phone search removal and autoplay without pause are intentional R128/R131/R70 decisions to revisit, not silently reverse. Fifteen prioritized theme-preserving recommendations/evidence/limits live in UI_SYSTEM; checks in TESTING. No UI/backend/schema/commerce behavior, commit or deployment changed; findings remain open.

## 2026-10-21 — Center phone account heading and add one-line copy (R280)

CURRENT / IMPLEMENTED locally: center the signed-out phone Account eyebrow/title and show “Your gifts, all in one place.” below the heading. Use10px title-to-paragraph margin and12px/1.6 muted body copy. Explicit phone paragraph styling overrides the legacy hidden introductory-paragraph rule. Above640px retain the original left-aligned heading and order-history sentence. Sources: account/page.tsx and storefront-ui.css. No auth/data behavior change, commit, push or deployment.

## 2026-10-21 — Center phone cart introduction (R279)

CURRENT / IMPLEMENTED locally: hide the heading's “Add more items” link at <=640px and center the gift-cart title group and saved-selection paragraph. Desktop link and layout retained; no cart-data or checkout changes. Source: gift-cart.css. Phone-scoped selectors inspected and `git diff --check` passes; no browser/test-suite rerun, commit, push or deployment for this CSS-only correction.

## 2026-10-21 — Remove enquiry-price label beside results (R278)

CURRENT / IMPLEMENTED locally: remove the “Final pricing on enquiry” label from the Shop result-count/Filter row, as requested. Count, inline Filter, catalogue prices, preview availability behavior and other page content retained. Source: B2C/src/app/shop/page.tsx. Targeted source check and `git diff --check` pass; no browser/test-suite rerun, commit, push or deployment for this text deletion. Supersedes R277's inline preview-note rendering only.

## 2026-10-21 — Filter beside phone result count (R277)

CURRENT / IMPLEMENTED locally: relocate the single ShopMobileFilters instance into the result-count row on Shop and collection pages. At <=640px, the44px burgundy Filter button aligns to the right of the count above product cards; the preview pricing note wraps below that row. Collection toolbar remains available with zero results so filters remain reachable. Native category/sort dialog and its destinations retained. Remove fixed-bottom filter styling, extra filter-only bottom clearance and cart-popup-driven hiding, since the inline control no longer overlaps the dock/popup. Supersedes R267/R270 floating filter placement/hide coordination only; cart popup and bottom navbar remain as specified. Sources: shop/page.tsx, ShopCollectionPage.tsx, shop.css, navigation.css, cart-tray.css. No commit, push or deployment.

## 2026-10-21 — Consistent phone page-intro spacing (R276)

CURRENT / IMPLEMENTED locally: Account, GiftCart and Shop/collection sections now share16px top/20px side padding at <=640px. Their leading eyebrow/breadcrumb rows share44px height,11px type/1.5 line-height and12px following gap; remove Account heading's extra top margin and Shop intro's4px top padding. This aligns heading tops72px below the masthead. Shared rules live in storefront-ui.css, with `.section` specificity to beat later cart route styles (initial browser pass caught Cart's6px margin/9px font override). Account layout's min-height is reset across the full phone breakpoint. Desktop/tablet typography and alignment retained; no commerce changes. No commit/push/deployment.

## 2026-10-21 — Correct phone footer cascade conflict (R275)

CURRENT / IMPLEMENTED locally: R273/R274's normal-priority hide declaration was overridden by existing `display:block !important` rules on `.b2b-store-footer` in globals.css (base and <=760px). Their source-only checks missed this runtime conflict. Add a scoped important override to `footer.tgg-reference-footer:not(.tgg-home-footer)` at <=640px in home-footer.css. Home remains visible; inner-page footers hide; existing product-page omission and tablet/desktop footers remain. R274 behavior was CURRENT / BROKEN until this correction. TESTING records actual browser checks for R275. No commit, push or deployment.

## 2026-10-21 — Home-only phone footer (R274)

CURRENT / IMPLEMENTED locally: latest user correction restores the Home footer on phones while keeping inner-page storefront footers hidden at <=640px. Narrow the R273 hiding selector to `footer.tgg-reference-footer:not(.tgg-home-footer)` in home-footer.css. Home routing already selects this variant for / and /b2c. Bottom navigation and tablet/desktop behavior retained. Supersedes R273 Home footer hiding only. Footer variants and selector inspected; `git diff --check` passes. No browser/test-suite rerun, commit, push or deployment for this CSS-only scope correction.

## 2026-10-21 — Hide storefront footer on phones (R273)

CURRENT / IMPLEMENTED locally: hide both Home and inner-page storefront footers at <=640px using their shared `footer.tgg-reference-footer` selector in home-footer.css. Phone bottom navigation and its content clearance remain; tablet/desktop footer styles are retained. Explicit user request supersedes previous phone footer visibility. Verified both Footer.tsx variants share the selector, inspected the media rule, and `git diff --check` passes. No browser/test-suite rerun, commit, push or deployment for this CSS-only visibility change.

## 2026-10-21 — Flat selected phone navigation tab (R272)

CURRENT / IMPLEMENTED locally: per user correction, remove the selected bottom-navigation tab's inset/3D shadow (`box-shadow: none`). Keep its flat warm background and burgundy icon/label, dock surface, dimensions and navigation behavior. Supersedes R271 active-tab relief only. Source: B2C/src/app/navigation.css. CSS rule inspected and `git diff --check` passed; no browser/test-suite rerun, commit, push or deployment for this one-property visual change.

## 2026-10-21 — Matte phone dock finish (R271)

CURRENT / IMPLEMENTED locally: user rejected the bright glow in R270. Remove the white outer highlight and white active inset; use warm ivory #f5f0e8, a muted beige border, one low-opacity brown drop shadow and shallow warm inset relief for the active burgundy icon/label. Badge rim matches the dock. Supersedes R270 shadow/color treatment only; dimensions, navigation, safe-area spacing and cart/filter positioning retained. Source: B2C/src/app/navigation.css. No commit, push or deployment.

## 2026-10-21 — Neumorphic phone bottom navigation (R270)

CURRENT / IMPLEMENTED locally: replaces R269's top quick-navigation strip with a phone-only (<=640px) floating bottom dock: Home, Shop, Cart and Account. Ivory raised surface, paired soft shadows, inset active tab, burgundy accents,56px link targets, focus outlines, reduced-motion support and safe-area spacing. Shop remains selected for collection/product routes; Cart for cart/checkout; Account for account routes. Cart badge reuses Header's confirmed count/events without another API subscription. Phone header returns to its preceding height and hides duplicate cart/account icons; its menu and R269 parent breadcrumbs remain. Admin chrome and tablet/desktop navigation are retained.

Cart popup and compact Filter button sit above the dock with shared clearance; Filter still yields to an open cart popup. Body end spacing keeps content reachable. Cart dismissal's focus fallback now targets the visible phone Cart link. At <=740px viewport height on phones, a cart with >2 rows allows page scrolling while retaining an independently scrollable product list (minimum140px), since a fixed whole-page layout otherwise collapsed the list to0–26px after adding the dock. Taller-phone/desktop contained-cart behavior remains. This explicitly supersedes the all-phone fixed-page constraint only for these short viewports, to keep products and checkout usable.

R270 supersedes R269's top strip presentation. Existing gift prices, quantities, payment/auth behavior and product/gallery designs retained. No commit, push or deployment for R270; TESTING records local verification and limits.

## 2026-10-21 — Visible phone navigation and parent links (R269)

CURRENT / IMPLEMENTED locally: phone storefront header (<=640px) now includes a 44px quick-navigation row with explicit Home and All gifts links, burgundy icons/text and an active-page underline. The mobile/tablet menu includes Home and Your account on every public route, scrolls within the available viewport, and Escape restores focus to its trigger on inner pages as well as Home. Account remains accessible through the menu on phones. Admin chrome remains excluded; desktop masthead layout is retained.

Product and collection breadcrumbs are visible on phones again, with 44px link targets. Product names truncate in the breadcrumb instead of widening the viewport. The Ivory-only All hampers shortcut is replaced by the shared Home / Hampers / product trail. Existing destinations, product/card/gallery design, cart state, auth requests and commerce contracts are retained. Sources: Header.tsx, navigation.css, shop.css, products/[slug]/page.tsx and product-detail.css. No commit, push or deployment performed for R269. Typecheck, scoped lint, 26 responsive route checks, menu navigation/Escape checks and git diff --check pass; TESTING records scope and limits.

## 2026-10-18 — Full-repository audit and bounded security remediation (DEC-001–004)

CURRENT / IMPLEMENTED locally: created root DECISION.md/FLOW.md and reproducible route/asset/disconnected-schema inventories; secured both legacy admin socket boundaries and exact CORS; removed original B2B PIN/session fallback credentials, hardened tokens/body validation and set auth private/no-store; patched original Next/dependencies/Nodemailer and removed an unused vulnerable backend UUID dependency. Existing B2C commerce/designs, customer history, schemas, prices, assets and deployment configuration preserved.

VERIFIED locally: all three builds/types; B2C lint/88 client tests; complete B2C backend177 tests; original backend40 tests; original admin/mail7 tests and scoped lint; alternate lint0 errors/2 warnings. Original whole-app lint remains CURRENT / BROKEN57 errors/108 warnings (baseline58/108). Production audits: zero in B2C/B2C-backend/original-backend/alternate; original main retains1 high XLSX with no registry fix. Development tooling advisories remain. [TESTING](TESTING.md)/[audit](audit/REPOSITORY_AUDIT.md) own exact commands and limits. CURRENT / PARTIAL: legacy financial/idempotency/stock defects, vault key/durability/recovery, distributed/deployed controls, scheduler/provider/backup evidence remain open; no production-readiness claim.

## 2026-10-13 — Compact cart/filter handoff and restored Home cards (R267–R268)

CURRENT / IMPLEMENTED locally: R267 phone cart bar shrinks to260px max width/50px measured height,32px thumbnails and13px/10px text, retaining44px link/close targets and existing animations. While a visible nonempty bar is open, hide the phone bottom Filter bar; restore it on dismissal or empty selection. Filter dialog remains functional. R268 removes compact-phone marker from HomeCollectionCard and deletes its now-unused joined-frame override, restoring original centered title/description/From price and below-photo burgundy Explore button. Home hampers and compact Shop/category cards remain as previously specified. SUPERSEDES R261/R263/R265 Home collection presentation only. Scoped lint, responsive fixture checks and git diff --check pass; no deployment.

## 2026-10-13 — Center phone catalogue actions below titles (R266)

CURRENT / IMPLEMENTED locally: on phone Shop/collection ProductCards, hide the short description and move the existing Add/quantity control from the photo into that row, centered below the title. Keep burgundy Add/white border, price/title/image styling, cart behavior and current Home collection/hamper treatment. Desktop descriptions/actions retained. CSS-only change in storefront-cards.css. Responsive fixture checks and git diff --check pass; no deployment.

## 2026-10-13 — White frame scoped to Home (R265)

CURRENT / IMPLEMENTED locally: user clarified R263 joined white image/text frame applies only to Home. Scope white background,12px lower corners, square lower photo corners and inset text to Home collection cards. Restore catalogue/category phone cards to R261 transparent body, individually rounded photo and preceding copy spacing. Preserve R264 burgundy Add with white text/border, original Home hamper layout and desktop styling. SUPERSEDES R263 catalogue white-frame scope, which was too broad. Local browser checks and git diff --check pass; no deployment.

## 2026-10-13 — Joined white phone cards and burgundy Add (R263–R264)

CURRENT / IMPLEMENTED locally: compact phone Home collection/catalogue cards now join square photo and copy on one white surface with12px outer/bottom corners and square lower photo corners. Text receives8px horizontal inset; vertical spacing is redistributed to retain compact frame height. Home hampers retain R262 layout. R264 corrects the earlier inverse Add interpretation: phone Add fill is burgundy #4a0404, text/border white, hover dark burgundy. Existing action variables carry the correction through the shared theme layer; Explore links and quantity controls retain their existing treatments. Responsive browser checks and git diff --check pass; no deployment.

## 2026-10-13 — Preserve Home hampers and white Add borders (R262)

CURRENT / IMPLEMENTED locally: latest correction removes the compact-phone marker from HomeHamperCard and removes R261 Home hamper grid override, restoring its preceding layout and below-photo purchase controls. Compact Home collection/catalogue cards remain. Phone card Add buttons use white border/hover-border via shared action variables; fill, text, quantity controls and desktop borders unchanged. SUPERSEDES R261 Home hamper redesign only. Scoped HomeSections lint and responsive browser checks pass; no deployment.

## 2026-10-13 — Compact phone product cards (R261)

CURRENT / IMPLEMENTED locally: <=640px Home hamper/collection and shared catalogue cards use square rounded photos with inset cream/burgundy Add or Explore controls, followed by left-aligned price, serif title and short description. Home hampers now use two columns on phones. Existing quantity controls replace Add in place; desktop/tablet layout and commerce state retained. Scoped lint/typecheck and18 route/viewport browser checks plus Add/increment/decrement pass. No deployment.

## 2026-10-13 — Latest-three phone cart thumbnails (R260)

CURRENT / IMPLEMENTED locally: phone cart photo stack renders a reversed copy of the final three gift rows, so newly appended products appear first and older thumbnails leave the three-photo preview. Latest photo layers above overlapping older photos. Only presentation changes: original row order, quantities, full tray/cart, checkout and API payloads retained. No in-place reverse of draft items; repeat quantity increments do not reorder distinct product rows. Scoped lint and local browser fixture pass; no deployment.

## 2026-10-13 — Smaller animated phone cart bar (R259)

CURRENT / IMPLEMENTED locally: reduce phone cart pill from360px maximum width/70px measured height to300px/58px, with38px overlapping photos and14px/11px label/count. Retain44px link/close touch targets. Add360ms slide/fade entrance and short photo/count update animation using transform/opacity only; count animation restarts on confirmed quantity change. Reduced-motion disables animations/transitions. Theme, routing and larger-screen tray retained. Scoped lint/typecheck and six-width local browser checks pass; no deployment.

## 2026-10-13 — Compact phone cart bar (R258)

CURRENT / IMPLEMENTED locally: <=640px replaces the open cart tray with a centered70px burgundy pill, up to three overlapping product thumbnails, white View cart label, quantity count, chevron and close control. Uses confirmed cart state and existing cart destination; further shopping/additions remain available. Desktop/tablet full tray retained; phone empty selection hidden. Scoped lint/typecheck and six-width fixture browser checks pass; no deployment.

## 2026-10-13 — Mumbai auth placement and single-query profile (R257)

CURRENT / IMPLEMENTED locally: set both B2C Vercel projects to bom1; GET auth/me verifies the active unexpired session and joins its owned active customer in one aggregate instead of two sequential reads. Existing profile DTO, staff-without-customer access, private/no-store and revocation remain. Add Server-Timing init/profile metrics.40 targeted backend regressions pass; both config files parse and git diff --check passes. CURRENT / PARTIAL hosted: user confirmed Mumbai Atlas and supplied a signed-in200 response with iad1 execution hop; no authenticated replay or deployment performed. Exact contribution to reported4s remains UNKNOWN until both projects redeploy and timings are measured.

## 2026-10-13 — Image-only linked phone hero (R256)

CURRENT / IMPLEMENTED locally: at <=640px hide Home hero copy/brand/Shop now CTA, remove image blur and dark tint, and expose a full-frame accessible link to the same /shop destination. Keep the260px compact frame and existing responsive slideshow photographs. Slideshow dots stay above the link and switch slides independently; larger viewport copy/CTA remains. Sources HomeHeroSlideshow.tsx/home.css. SUPERSEDES R251 visible phone headline and R227 phone blur/shade only. Scoped ESLint/typecheck and local browser checks at320/375/430/640/768/1440px pass: hidden phone copy, no filter/tint, exact full-frame link, no overflow; real pointer dot selection stays on Home and image click navigates to /shop. Phone screenshot inspected; git diff --check passes. No deployment.

## 2026-10-13 — Remove redundant pre-add draft read (R255)

CURRENT / IMPLEMENTED locally: mounted AddGiftToCartButton passes its existing server-confirmed draft to the versioned save, removing the preliminary GET for ordinary Add/quantity operations. Missing/invalidated state retains GET→PUT;409 reloads latest draft before one retry; ambiguous writes never replay. Header me remains an independent mount/auth-change read.88 frontend tests, scoped lint/typecheck and fixture browser checks pass. CURRENT / PARTIAL hosted: anonymous me401 TTFB363ms and count200 TTFB283ms measured once; reported me600ms/draft400ms cannot identify hosting/DB cause. No deployment.

## 2026-10-13 — Compact desktop catalogue frames (R254)

CURRENT / IMPLEMENTED locally: latest reference specifies compact card frame size with only existing contents. Replace R253 oversized desktop tracks with equal300px-minimum auto-fill tracks, landscape4:3 media and19–22px desktop Shop titles. This yields three columns at1280/1440/1920px and two at1024px. Preserve centered copy, description, price, cart controls, theme and phone layout; no reference-only wishlist/badges/image arrows added. Source storefront-cards.css. Local browser verifies all12 shown titles remain single-line and cards equal width with no overflow at1024/1280/1440/1920px; first-card heights approximately471/433/474/464px.375px phone regression unchanged. Desktop screenshot inspected; git diff --check passes. CSS-only; no deployment.

## 2026-10-13 — Wider desktop catalogue cards (R253)

CURRENT / IMPLEMENTED locally: widen desktop (>900px) Shop catalogue tracks using equal auto-fill columns with a responsive320–420px minimum. This gives the shown Diary/Laddoo/Bookmarks titles sufficient space without truncating or shrinking their shared typography. Existing phone/tablet grid, card styling and interactions remain. Source storefront-cards.css. Local browser at1024/1280/1440/1920px verifies all12 displayed catalogue titles on one line and equal card widths (approximately349/464/536/512px);375px retains two phone columns and no page overflow. git diff --check passes. CSS-only change; no deployment.

## 2026-10-13 — Phone thumbnail carousel (R252)

CURRENT / IMPLEMENTED locally: phone product thumbnails now form one horizontally scrollable, snap-aligned row beneath the main image. Each preview takes44% of the rail, showing two photos plus a next-photo peek. Native overflow scrolling replaces R250 two-column wrapping; existing click-to-select, full-width phone main photo, desktop/tablet vertical rail and single-image layout remain. CSS-only change in products/[slug]/product-detail.css; no timer, dependency or scroll-event JavaScript. Local browser checks at1440/1024/768/375/320px verify Ivory/India/Lotus layout and all photo selections, last thumbnail reachable through horizontal scrolling, no page overflow, and single-photo pages at1440/375px. Phone screenshot inspected and git diff --check passes. No deployment or physical-device swipe test.

## 2026-10-13 — Refined phone hero headline (R251)

CURRENT / IMPLEMENTED locally: replace phone hero Good gifts / Great moments with “Fine gifts. Lasting joy.” Retain four words/two lines; increase responsive heading from clamp34.5px/9vw/41px to36px/9.6vw/44px and explicitly use pure white #FFFFFF. Desktop headline, light dark photo shade, slideshow and CTA retained. Sources HomeHero.tsx/home.css. Scoped ESLint and local browser checks at320/375/430/640px verify two lines,36–44px text, computed white on every word and no overflow;768/1440px retain desktop headline mode. No deployment.

## 2026-10-13 — Restore phone product gallery layout (R250)

CURRENT / IMPLEMENTED locally: latest user correction supersedes R249 phone left rail only. At <=640px the main photo fills the available width with its earlier shortened aspect ratio; remove244px minimum and restore two-column thumbnail rows beneath it. All supplied gallery views remain selectable; desktop/tablet64px left rail remains. Responsive image sizes now match the wider phone main/thumbnail frames. Sources ProductGallery.tsx and product-detail.css. Scoped ESLint and local browser checks at1440/1024/768/375/320px verify Ivory/India/Lotus geometry, all thumbnail selections and no overflow; single-photo behavior checked at1440/375px. Phone screenshot inspected. No deployment or commerce changes.

## 2026-10-13 — Vertical product thumbnail gallery (R249)

CURRENT / IMPLEMENTED locally: product pages use compact left-side thumbnail rails (64px desktop/tablet,44px phone); clicking a thumbnail replaces the main photo after loading. Photographed hamper close-ups join the selectable gallery, including Ivory’s Thekua, Chilli Cheese, Laddoo and Farmley pouch. Single-photo products reserve no empty rail. Phone main frame has244px minimum height, showing all five current Ivory thumbnails. Main/purchase desktop heights and related carousel retained. Scoped ESLint/typecheck and local browser checks pass; TESTING owns evidence. No deployment.

## 2026-10-13 — Compact Ivory product layout (R248)

CURRENT / IMPLEMENTED locally: above900px, Ivory’s four existing photographed close-ups span both hero columns in one row, replacing the left-only2×2 supplement that left the purchase-column bottom empty. Main gallery/purchase heights remain aligned. Reduce hero bottom padding and related-section top padding to32px each; no added copy/content. Phone retains all four close-ups in2×2 and related carousel. Source products/[slug]/product-detail.css. Browser at1440/1024px verifies full-width supplement, single-row figures,18px panel-to-photos gap and32px supplement-to-related section gap;375/320px preserve2×2,three related cards and no overflow. Desktop screenshot inspected; git diff --check passes. No deployment.

## 2026-10-13 — Restore value-strip captions (R247)

CURRENT / IMPLEMENTED locally: user clarified that the four icon/value-strip captions must remain. Restore all four original sentences in HomeSections.tsx; keep the shortened introductory paragraph. SUPERSEDES only R246 caption removal, which was an over-broad interpretation. Existing typography/phone visibility rules retained. Scoped ESLint and git diff --check pass; no browser rerun or deployment for this text restoration.

## 2026-10-13 — Shorter philosophy copy (R246)

CURRENT / IMPLEMENTED locally: shorten philosophy intro to “Thoughtful gifts, chosen with care.” and remove the four redundant caption sentences below the value titles. Keep icons, value titles, packaging-matched heading size and layout. Source HomeSections.tsx. Scoped ESLint and git diff --check pass; no browser rerun or deployment for this copy reduction.

## 2026-10-13 — Match philosophy heading to packaging heading (R245)

CURRENT / IMPLEMENTED locally: Gifting made easy uses the same responsive font-size rule as Beautifully packaged / Thoughtfully curated:clamp34px/4vw/48px,31px at641–700px,34px <=640px. Shared selector in home.css prevents heading-size drift. Supersedes only R242 philosophy heading reduction; smaller paragraph/value text retained. Browser verified equal computed sizes/no horizontal overflow at1440/1024/768/700/640/375/320px. git diff --check passes; no deployment.

## 2026-10-13 — Match collection card widths to hampers (R244)

CURRENT / IMPLEMENTED locally: remove the Home collection grid1020px desktop cap and match hamper gaps/columns above640px (3 columns/18px gap above900px;2 columns/16px at641–900px). This completes R243 width matching; previous work matched card internals but retained narrower collection grid. Existing phone two-column grid/fourth Explore tile preserved. Browser at1440/1024/950/900/768/641px verifies equal card widths within fractional rounding (1440:392px each, previously collection326.66px);375px phone regression passes; no overflow. CSS/diff checks pass; no deployment.

## 2026-10-13 — Collection cards match hamper layout (R243)

CURRENT / IMPLEMENTED locally: three Home collection cards reuse hamper card/photo/content/price/action layout, with edge-to-edge photographs, matching corners and content padding, centered typography and full-width collection buttons. Retain collection destinations, From prices, phone two-column grid and fourth Explore tile. Scoped lint/typecheck and four-viewport comparison pass; no deployment.

## 2026-10-13 — Smaller philosophy-section typography (R242)

CURRENT / IMPLEMENTED locally: reduce pictured Gifting made easy section typography slightly: desktop heading clamp28px/3.2vw/40px (previous30px/3.5vw/44px), value labels15px (previous16px), introductory paragraph/captions14px (previous rendered15px global paragraph rule). Existing phone heading/labels/layout retained. Source home.css. Browser verified1440/1024/375px rendered sizes and no horizontal overflow; git diff --check passes. No deployment.

## 2026-10-13 — Four FAQs followed by dropdown (R241)

CURRENT / IMPLEMENTED locally: Home initially displays four FAQ questions, followed by native More questions disclosure for remaining entries. Expand changes label to Fewer questions; each answer retains existing accordion behavior. Latest instruction supersedes the interrupted R239 three-row scroll approach. Scoped lint/typecheck and browser checks at1440/375/320px pass. No deployment.

## 2026-10-13 — Explore card matches button burgundy (R240)

CURRENT / IMPLEMENTED locally: phone Explore All gifts card uses solid #4a0404 background/border, matching the adjacent Explore button. Supersedes R237 gradient only; white text/link/layout retained. Source home.css. CSS comparison and git diff --check verified; no deployment.

## 2026-10-13 — More visible Home watermark (R238)

CURRENT / IMPLEMENTED locally: increase the active Home body mandala watermark opacity from20% to25% for greater visibility on desktop and phone. User referenced15%; actual active source was20%. Existing mask, continuous header/Home background and foreground opacity retained. Source: B2C/src/app/b2c/home.css. CSS value and git diff --check verified; no browser rerun or deployment for this single-value change.

## 2026-10-13 — Phone Explore all gifts card (R237)

CURRENT / IMPLEMENTED locally: fourth Home collection-grid slot on phones is an Explore / All gifts link to /shop, with white text and burgundy gradient, matching the adjacent stationery card height. Hidden above640px. Scoped lint/typecheck and local browser checks pass; no deployment.

## 2026-10-13 — Compact Home card title spacing (R236)

CURRENT / IMPLEMENTED locally: Home collection titles no longer reserve a blank second line above640px; existing8px title-to-description margin retained. Phone two-line title reservation still aligns adjacent copy/prices. Browser checks at1440/1024/375px pass; no deployment.

## 2026-10-13 — Fixed full cart and complete phone thumbnails (R234–R235)

CURRENT / IMPLEMENTED locally: R234 corrects the earlier tray-only interpretation of R230. On /cart with more than two distinct product rows, viewport stays fixed; only the product list scrolls, capped by the first two measured rows and available height. Heading/order summary/checkout remain visible. Removing down to two rows restores ordinary page/footer scrolling. R235 shows every main-gallery thumbnail in wrapping phone rows and unhides actual photographed hamper close-ups (Ivory4/India2); empty supplements stay hidden. Shared useTwoRowScroll preserves tray behavior. TESTING owns verified evidence. No financial/API/model change or deployment.

## 2026-10-13 — Ivory close-up photos and packaging panel opacity (R231–R233)

CURRENT / IMPLEMENTED locally: Ivory product page adds supplied Farmley Panchmeva pouch and existing approved Laddoo candles photo alongside Thekua/Chilli Cheese in the established two-column close-up area. Render photographed story entries with images instead of hard limit2; India retains2. User supplied exact local pouch path after existing jar photo was found to differ; compressed web copy retains original. Home Beautifully packaged panel background now90% alpha at desktop/mobile, text/button opacity1. TESTING owns evidence; no commerce/model/deployment change.

## 2026-10-13 — Non-blocking cart tray and two-item scroll cap (R229–R230)

CURRENT / IMPLEMENTED locally: successful Home/catalogue/PDP/builder Add opens a right-side cart tray, showing confirmed items/photos/pack/print names, quantities and the existing inclusive subtotal. Further additions remain possible. Desktop browsing area reflows alongside it; smaller screens use a compact lower-right tray without backdrop/body scroll lock. Close/Escape dismiss it; full cart remains the review/required-name/checkout surface. Latest follow-up caps visible list to two measured rows, subject to viewport height; only the list scrolls while heading/subtotal/View Cart remain fixed. TESTING owns validation and limits; no deployment or financial/backend model change.

## 2026-10-12 — Hosted count request optimization (R228)

CURRENT / IMPLEMENTED locally: shopping Header uses the same pending cookie-owned draft read as Home/catalogue/PDP purchase controls, avoiding a separate count request. Non-shopping pages retain count-only fallback; confirmed mutation events still update the badge immediately and stale responses cannot replace them. Count query now projects only quantities and uses lean(), preserving ownership/private no-store/freshness. Browser and regression evidence in TESTING.

CURRENT / PARTIAL hosted: user screenshot459.92ms total/458.04ms waiting. Public hosted read-only sample observed initial count503, later200~273ms; subsequent warm direct/proxied samples~260–320ms. Underlying transient failure/hosting dependency cause UNKNOWN. No deployment performed; hosted20ms target remains unverified.

## 2026-10-12 — New bookmarks and responsive Home polish (R225–R227)

CURRENT / IMPLEMENTED locally: two distinct new bookmark cards/PDPs, Vibrant Art Bookmarks and Wanderlust Bookmarks, use the supplied compressed photographs and explicitly approved ₹349 each. Existing bookmark remains. Catalogue/cart/server mappings keep distinct identities; guarded local provisioning created only two new 100-unit stock pools without resetting existing inventory. Current mapped catalogue:20 products/29 SKU pools,30 registered gift IDs. Hosted provisioning/deployment remains unverified.

Home quantity controls now place minus/quantity/plus across the frame. Phone hero uses supplied Ivory, phone_hero and Vibrant Indian-Inspired Bookmark Collection photos in order through responsive picture sources, with original desktop slides retained. Latest user steering SUPERSEDES no-overlay/gold-burgundy text: white text,32% dark shade and1px image blur on phone only. Home collection titles reserve two line heights so adjacent descriptions/prices align. TESTING/PERFORMANCE own evidence and limits.

## 2026-10-12 — Inclusive checkout, envelope packs and spacing (R222–R224)

CURRENT / IMPLEMENTED locally: R224 puts 20 pcs/10 pcs selection only inside envelope PDPs above price (20 ₹2,499;10 ₹1,499), keeps independent draft/SKU identities and required Lotus names, removes every translucent Pack of 20 image strip and tightens paragraph→selector→price spacing. Home remains Envelopes navigation, now From ₹1,499; related carousel retained.

R223 replaces mailto final-total confirmation with account-owned delivery/review→reserved order→existing Razorpay checkout. Server Mongo variants own inclusive amounts; 18% GST is allocated inside the listed total, shipping surcharge0. Five-minute holds and verified capture/expiry are transactional/idempotent; late captured money is recorded for review without selling released stock. Local recognized development DB only: additive Order validator/index migration and explicit100 opening stock per27 mapped SKU/pack pools across18 products, with India alias sharing Burgundy stock. Admin reads pack, price and print-name snapshots.

R222 compresses first/third Home images by93.1%/94.3%, delays alternative slides, preserves manual selection/reduced motion and removes reveal blur. Hosted lag not reproduced in the sampled synthetic scroll test; universal20ms remains unverified. TESTING/PERFORMANCE own evidence. CURRENT / PARTIAL deployment: no deployment or real provider charge/webhook was performed. Hosted payment config was read-only verified configured:false/draftCheckoutAvailable:false. Production migration, explicit catalogue provisioning, Razorpay test/webhook verification and a trusted expiry scheduler remain required; local success does not establish hosted readiness.

## 2026-10-12 — Keep card prices in cart (R220)

CURRENT / IMPLEMENTED locally: fixed mismatch where Lotus/envelopes/bookmarks lost displayed prices in cart and candles reverted to the old₹200–500 range. Cards/PDP/cart now share existing numeric display amounts; registered item IDs/slugs map to the same inclusive unit price, quantities and mixed totals calculate in paise. No extra GST/delivery added. Unknown unregistered items/packaging remain pending. SUPERSEDES R196/R213 exclusion of preview figures from cart calculations and old candle-range display only; order/payment/stock authority guards retained.73 client tests include all19 registered items at quantities1/2/99; TESTING owns browser/typecheck/backend evidence. No order/model/price-figure change or deployment.

## 2026-10-12 — Required Lotus print names and aligned galleries (R216–R219)

CURRENT / IMPLEMENTED locally: Lotus PDP has a required Name to print field below purchase controls. Name edits persist in the cookie-owned gift draft, survive reload/sign-in/quantity changes and appear in cart/delivery review. Direct card Add may save an unresolved selection; Continue opens a native name dialog, with no Optional/Skip choice. Missing names and legacy Skip cannot pass server checkout/address preparation. Final required-name steering SUPERSEDES the initially implemented optional/Skip approach. Existing checkout/payment availability and order409 guards remain.

All envelope ProductCards now show the existing90%-white Pack of 20 image strip, SUPERSEDING R215 Lotus-only scope; Home collection navigation stays strip-free. Above900px main gallery plus thumbnails tracks purchase-panel height through CSS; existing extra photo details/caption occupy a separate grid row. Phone gallery spacing/short height and related carousel retained. TESTING owns checks and limits; no deployment, payment/order/history mutation or priority change.

## 2026-10-12 — Lotus card pack strip (R215)

CURRENT / IMPLEMENTED locally: Lotus product card image has a full-width48px bottom strip with90% white background and centered opaque burgundy Pack of 20 text. Reuses ProductCard across listings/related cards; other products/Home category navigation unchanged. Display-only pack wording, no quantity/price/order semantics changed. Typecheck/scoped lint, CSS/diff and four responsive checks pass; TESTING owns evidence. Priorities unchanged.

## 2026-10-12 — Inclusive cart prices, centered cards and transient-read recovery (R213–R214)

CURRENT / IMPLEMENTED locally: latest explicit user policy includes GST and delivery in listed prices, SUPERSEDING R192/R193 extra18%/delivery-planning rules. Cart total sums inclusive item prices × confirmed quantities in paise; no extra GST/delivery result fields, rows, exclusion labels or before-delivery total. Existing unknown-price/packaging handling and checkout/order guards remain. Shared Home/catalogue/related card title, description and price now centered, superseding R211 left alignment only.

CURRENT / PARTIAL: reported503 was not reproduced locally (direct/proxied draft/count/catalogue200, anonymous me401). First hosted catalogue read returned503, subsequent hosted reads succeeded; underlying hosted failure cause UNKNOWN. Allowlisted bootstrap/draft GETs now retry503 once after an allowed ≤1s server cooldown; writes/401/429/network failures are not automatically replayed. Persistent failures remain visible with manual Retry.69 client tests,16 gifting tests, typecheck/lint and20 responsive fixture checks pass; TESTING owns evidence. No deployment/payment activation or financial/history/model mutation; existing priorities retained.

## 2026-10-12 — Home Lotus discovers Envelopes (R212)

CURRENT / IMPLEMENTED locally: Home Lotus discovery card image/title/Shop now all link to /shop/envelopes and display From ₹99.00, using existing starting-price prefix. No Home direct Add action; catalogue/PDP Lotus identity/cart controls retained. Supersedes R211 Home Lotus direct draft action only. Typecheck/scoped lint and local rendered-link/price/destination checks pass; TESTING owns evidence. Other card styling/priorities unchanged.

## 2026-10-12 — Simple reference-led product cards (R211)

CURRENT / IMPLEMENTED locally: product cards follow photo → existing serif title → one short description line → prominent burgundy price → full-width Add to Cart/counter. Catalogue/collections and retained PDP related carousel reuse ProductCard; Home hampers share the same hierarchy and Lotus discovery uses its existing draft action. Home category discovery remains navigation to collections. Existing ivory/burgundy theme, card hover, static images, identities/pricing/checkout guards retained; image remains capsule-free. Typecheck/lint/66 client tests and responsive/fixture checks pass; UI_SYSTEM/TESTING own scope/evidence. No backend/payment/model/deployment changes; priorities unchanged.

## 2026-10-12 — Browsing 429 fix and latest product scope (R206–R210)

CURRENT / IMPLEMENTED locally: separate bounded bootstrap-read rate bucket from existing auth/write allowance; coalesce concurrent me/count/config client reads without settled/private caching. Local auth reloaded with guarded unchanged development config. Stationery online/fallback excludes envelopes; envelope discovery/history IDs remain. Product pages remove delivery/bulk enquiry links, note panel, lifestyle/editorial and corporate blocks plus product-only footer; latest user correction explicitly retains related-product carousel. Lotus main now supplied ep1_3.png via94.6% smaller WebP, keeping previous three gallery photos. Typecheck/lint/66 client tests/48 auth/admin-security/gifting backend tests pass; TESTING owns browser evidence. No financial-model/customer/order mutation or deployment; priorities unchanged.

## 2026-10-12 — Preview prices, draft actions and storefront refinements (R196–R205)

CURRENT / IMPLEMENTED locally: all preview product/Home/related cards show numeric display prices without Sample/estimated suffixes; nine photographed envelopes and two new candles have independent registered draft selections and existing Add/counter/cart actions. Preview basePrice/stock and checkout/order guards retained. Navbar bottom margin0; phone PDP gallery starts18px below its layout boundary and is45% shorter. Horizontal storefront section/row dividers removed, with current user exception under FAQ Q1–Q5 only. Home navbar/content share one ivory wallpaper canvas, avoiding colour/pattern restart; image hover zoom removed while card hover remains. PDP purchase prices enlarged30%. Latest supplied cn3.png now drives Laddoo cards/gallery/cart metadata through a93.9% smaller WebP. See UI_SYSTEM/TESTING/API_CONTRACTS/PERFORMANCE for evidence and limits. Existing financial activation/TODO priorities remain.

## 2026-10-12 — Supplied Eternal Paper Co. bookmark photos (R195)

CURRENT / IMPLEMENTED locally: supplied Six Stories in Color and Culture is the existing bookmark/Home stationery main photo; Vibrant Indian-Inspired Bookmark Collection is its second PDP gallery view. Shared photo mapping covers online/fallback listings and product lookup; Home, stationery discovery and cart/builder metadata use the new main. Existing bookmarks identity, prices/stock/variants and preview/checkout behavior retained. Copy describes observed designs instead of unsupported tassels/foil. Two WebP copies total495,582B versus5,502,276B originals (91.0% smaller); originals preserved. Typecheck/scoped lint/12 catalogue tests, online/offline assertions and8 phone/desktop page/gallery checks pass. Local auth reloaded with unchanged guarded development config for metadata; private API smoke passes. No DB writes/full build/deployment; TESTING/UI_SYSTEM/PERFORMANCE own evidence. TODO priorities unchanged.

## 2026-10-12 — Restore footer layout at every width (R194)

CURRENT / IMPLEMENTED locally: reported stacked footer brand was caused by legacy `footer > div:nth-child(2)` flex styling shrinking the heading/navigation/bottom into one row. Both Home and standard footer inner wrappers now use block flow at every width; tablet heading/tagline stack through1023px, phone centering remains. Existing wallpaper, fonts, links and reveal retained.16 Home/Shop width checks320–1440px, CSS parse/diff and desktop/phone visual checks pass. Existing user-supplied public hero3.png also verified loading through the third slide. No backend, asset replacement, build or deployment; TESTING owns evidence. Wider-footer TODO closed; other priorities unchanged.

## 2026-10-12 — Cart detail/total refinement and hidden delivery planning range (R193)

CURRENT / IMPLEMENTED locally: user clarifies delivery range must not be shown and requests much stronger image/title/price spacing and total emphasis. Final cart uses260px photos/32px titles and separate right-side item prices on desktop, quantity/Remove together, and28px bold total (26px phone). Shopper delivery is To be confirmed; Total before delivery includes items+extra18% GST, excluding any guessed delivery charge. Internal₹100–300 range stays planning data. Remove prices-vary/redundant confirmation copy. Supersedes R192 displayed delivery-inclusive total and R190 exact cart size above640px; other card titles unchanged. Final checkout still requires authoritative quote/reservation. Source/test evidence: UI_SYSTEM/TESTING; no additional backend/model changes in this refinement.

## 2026-10-12 — Responsive cards, supplied candles and calculated cart estimates (R190–R192)

CURRENT / IMPLEMENTED locally: shared measured Ivory card-title typography and filled product-photo frames;12px cart photo corners; desktop cart photos220×240px (144×180px tablet) with larger rows; three supplied candle cards/five matching gallery photos, cn3 mapped to existing Laddoo identity. Web derivatives total353,138B versus9,644,956B originals (96.34% smaller); originals retained. Cart now shows unit/quantity prices, subtotal, extra18% item GST, delivery₹100–300 and estimated total on phone/desktop. Candle₹200–500 range and18% extra GST are explicit current user instructions. Unknown item/packaging amounts prevent a complete total. Existing hamper display prices remain estimate inputs, not sale authority.

CURRENT / PARTIAL: exact candle prices, delivery pricing/tax and authoritative priced/reserved order bridge remain required. Removed unsafe₹299-per-item gift-order creation with zero GST/delivery; order endpoint now409 without saving/clearing the draft, address response paymentAvailable:false and cart respects checkoutAvailable:false. No model migration or payment activation. Typecheck/full lint/63 client tests/15 gifting tests/build,60 responsive route-width checks and fixture cart/gallery interactions pass. Existing local-only auth restarted and APIs verified; user dev/Mongo retained. TESTING owns evidence; TODO priorities retained; no deployment.

## 2026-10-12 — Home/cart performance pass and20ms target (R189)

CURRENT / IMPLEMENTED locally: cart changes reuse server-confirmed quantities (4→2requests), static Home sections render on server, native hero/footer word reveals preserve design, secondary hero photos defer until first loaded/visible, and same-size background derivative is43.4% smaller. Production phone lab transfer569→505KB, JavaScript~13% less, two slow LCP samples3.10–3.17→2.27–2.35s. Typecheck/full lint/57 client tests/build/CSS checks and responsive cart/image-failure/reveal browser checks pass. CURRENT / PARTIAL: requested universal20ms ceiling remains unmet; busy DOM feedback0.7–1.1ms, but24ms paint-related events and73–106ms initial tasks remain. No private caching, backend/ownership/commercial changes or deployment; live/physical-device verification remains UNKNOWN. PERFORMANCE / TESTING own evidence; TODO priorities retained.

## 2026-10-12 — Restore local auth/cart services (R188)

CURRENT / IMPLEMENTED locally: reproduced reported proxy500s; frontend3000 was running but Mongo27017 and auth5003 were absent. Restarted existing loopback rs0 Mongo from its ignored local data directory, verified ping/writable primary, then started existing standalone auth detached from the terminal. Existing local configuration retained and validated without printing values. Direct/proxied count/draft return200 with correct response shapes; signed-out me returns expected401; private no-store retained. No application/schema/env/identity/cart edits, seed or deployment. Stop cause UNKNOWN; not a boot-autostart fix. Evidence/startup: TESTING / ENVIRONMENT; TODO priorities unchanged.

## 2026-10-12 — Phone Home hamper Add to Cart (R187)

CURRENT / IMPLEMENTED locally: reveal existing Home hamper AddGiftToCartButton controls through640px, full width below prices on Ivory/Burgundy/Lavender. Saved quantity uses the existing centered counter. CSS-only; existing identities, handlers, previews and checkout guards retained. PostCSS/diff checks and21 card/viewport checks at320/375/425/600/640/768/1440px pass; browser-only fixtures verify Add/counter/zero/failure/retry/independent colours/reload.375px screenshot inspected. Source: b2c/home.css; evidence: TESTING. No real cart/customer writes, backend/build/deployment; TODO priorities unchanged.

## 2026-10-12 — Replace legacy Home envelope card (R186)

CURRENT / IMPLEMENTED locally: replace the remaining Home Luxury Shagun Envelopes discovery card with Lotus Shagun Envelope, using the photographed preview's shared name/description/image and product destination. Refresh the still-hidden Home category-strip envelope photo too. Retain card styling, other collections and commercial guards. Typecheck/scoped lint/diff and five Home widths320/375/425/640/1440px pass; actual Explore click reaches Lotus PDP;375/1440px screenshots inspected. Sources: b2c/page.tsx/HomeSections.tsx; evidence: TESTING. No new tests/backend/build/deployment; TODO priorities unchanged.

## 2026-10-12 — Phone FAQ title and gift alignment (R185)

CURRENT / IMPLEMENTED locally: center the FAQ title/artwork group on phones through640px, move centered title text8px toward the gift and enlarge the existing gift artwork80→96px (20%). Preserve title font/line count and larger layouts. PostCSS/diff and seven viewport checks320/375/425/640/641/768/1440px pass;375/425px screenshots inspected. Source: b2c/home.css; evidence: TESTING. No new tests/build/backend/deployment; TODO priorities unchanged.

## 2026-10-12 — Center phone footer content (R184)

CURRENT / IMPLEMENTED locally: center both Home and standard storefront footers through640px, including wordmark, tagline, navigation, contact/entity details and bottom copy. Override the inherited inner-container flex rule with block flow on phones; retain existing columns, wallpaper, typography, links and44px targets. PostCSS/diff and14 Home/Shop viewport checks320–1440px pass;375px Home/425px Shop screenshots inspected. Wider layouts match the before snapshot. Source: home-footer.css; evidence: TESTING. No build/backend/deployment changes; existing priorities retained, wider inherited footer layout recorded in TODO.

## 2026-10-12 — Responsive Home section headings (R183)

CURRENT / IMPLEMENTED locally: center the hamper heading/action on medium and large phones by overriding the more specific `align-items: end` rule at compact widths. Constrain heading copy to its row; replace the inverted 64px-min/46px-max clamp with `clamp(36px, 5vw, 64px)`, retaining phone sizes and the 1440px desktop size. Stack View all actions below titles through900px to remove tablet overlap. CSS parse/diff and26 heading/viewport checks at13 widths320–1440 pass;375/425/768px screenshots inspected. Source: B2C/src/app/b2c/home.css. No backend, build, deployment or commerce changes; evidence: TESTING. Existing TODO tablet-heading finding closed; other priorities retained.

## 2026-10-12 — Remove legacy generic envelope card (R182)

CURRENT / IMPLEMENTED locally: remove Luxury Shagun Envelopes (/products/shagun-envelopes) from public product-card listings across widths and replace its related-gift slot with Lotus. Filter both backend and local fallback products before merged pagination; Envelopes now9 designs, Stationery11 and fallback All Gifts15. Keep direct legacy product lookup and backend gift ID/cart/history untouched. Sources: catalogue.ts and products/[slug]/page.tsx. Typecheck/scoped ESLint,49 client tests, diff and actual browser checks of Envelopes/Stationery/All Gifts pages1–2 pass; new designs remain. No new backend changes/full build/deployment; TODO priorities unchanged.

## 2026-10-12 — Short Ivory card description (R181)

CURRENT / IMPLEMENTED locally: shorten the shared Ivory preview description to A thoughtful gift in ivory. so Home cards use the same compact wording already shown on phones. Preserve layout, typography, pricing, images and backend gift metadata. Source: curated-hampers.ts. Source diff and git diff --check reviewed; no browser/build/new tests for this copy-only change. TODO priorities unchanged; no deployment.

## 2026-10-12 — Supplied envelope designs and galleries (R180)

CURRENT / IMPLEMENTED locally: add nine photographed envelope preview cards from B2C/envelops/ep1–ep9 with descriptive display names, distinct product routes and matching photos. ep1 groups ep1_1/ep1_2 as gallery details; ep3 groups ep3_1; remaining designs have one photo. Cards appear in Envelopes, relevant search, Stationery and All Gifts alongside existing products. Reuse ProductCard/ProductPhoto/ProductGallery; preserve theme and contain complete portrait PDP photos. Originals retained;12 WebP derivatives keep1200×1600 dimensions and reduce combined source bytes3,703,890→2,895,904 (~22%). New previews have no invented prices/stock/pack quantities or cart mappings: existing View Details/enquiry flow applies. No backend/API/model/payment change. Local previews merge by slug before12-card pagination; existing bounded100/page,20-page and2.5s request budget is reused for combined catalogue queries. Ordinary unrelated searches retain remote pagination. Checks: TESTING. No deployment; existing TODO priorities retained.

## 2026-10-12 — Bold Home hamper card prices (R179)

CURRENT / IMPLEMENTED locally: show existing shared display prices on the three Hampers for every occasion Home cards: Ivory₹2,499, India Burgundy₹2,999 and India Lavender₹2,999. Add centered burgundy Plus Jakarta Sans price text beneath each description,20–24px/700 weight, using the existing pricing helper. Preserve card photos/grid/phone carousel and existing purchase controls. These remain temporary display amounts, not cart totals or price authority; checkout guards unchanged. Sources: HomeSections.tsx and b2c/home.css. Typecheck/scoped ESLint/CSS parse/diff and15 card/viewport browser checks at320/390/640/768/1440 pass; phone/desktop screenshots inspected. No new tests/full build/deployment for this presentation change; TODO priorities unchanged.

## 2026-10-12 — Separate India Hamper colour selections (R178)

CURRENT / IMPLEMENTED locally: Burgundy and Lavender India Hampers now have distinct preview products, colour-specific photos, names, slugs and gift cart IDs (india_hamper_burgundy / india_hamper_lavender). Home cards, contents links, Shop/collection listings, related gifts and product colour links use the matching product. Reuse existing Add/counter/Buy now handlers; quantities stay independent. Preserve legacy india_hamper catalogue entry and saved rows without guessing their colour; old /products/india-hamper links open the Burgundy page for new selections. Both colours retain the existing India temporary display amount and non-saleable preview/hamper checkout guards. No database schema/history migration or payment activation. Sources: curated-hampers/catalogue/home-content/product-editorial/product-pricing, Home/PDP and backend gifting/items.json. Checks: TESTING. No deployment; TODO priorities unchanged.

## 2026-10-12 — Inline phone purchase actions replace gift note (R177)

CURRENT / IMPLEMENTED locally: hide the A note, from you / Personalise panel on phone product pages through640px and reuse Ivory’s inline two-column purchase pattern for all mapped gift product pages. Outlined Add to Cart becomes the saved minus/quantity/plus counter after confirmation, beside filled burgundy Buy now; zero restores Add. Controls remain below description in normal document flow. Buy now reuses ensureGiftItem and existing /cart review, preserving selected quantities and existing price/checkout guards. Desktop note and purchase behavior remain. Sources: BuyPanel.tsx, products/[slug]/product-detail.css and storefront-ui.css. Typecheck, scoped ESLint,44 client tests, both CSS parses/diff and12 responsive browser checks pass; fixture cart Add/counter/zero and Buy now empty/existing flows verified, phone screenshots inspected. No real customer/cart/payment mutation or deployment; TODO priorities unchanged.

## 2026-10-12 — Reverify requested hero reveal and removed details (R176)

CURRENT / IMPLEMENTED locally, reverified: existing R174 footer-style reveal animates all seven words across The Gourmet Gifts and Good gifts. Great moments. on three consecutive reloads; reduced-motion remains readable without animation. Existing R163 Good to know / The finer details markup is absent from B2C source and rendered Candles/India/Ivory pages. Existing R173 purchase controls scroll after the description on phones, rather than sticking to the viewport.15 product/width checks at320/390/600/640/1440 pass, with no overflow and desktop purchase-column behavior retained. No additional animation/PDP source change required. This verifies local source only; no hosted release or deployment was performed. Evidence: TESTING.

## 2026-10-12 — Image-led shared product cards (R175)

CURRENT / IMPLEMENTED locally: enlarge Shop/collection ProductCard media to4:5 at all widths; strengthen titles to600 weight (17px desktop), reduce content padding and limit phone descriptions to one quiet11px line. Retain centered copy, bold prices, existing image fitting and44px purchase controls. Sources: product-cards.css and shop/shop.css. CSS parse/diff checks and30 browser card/width comparisons at320/390/640/768/1440 pass: every image area grows, text area does not grow, no overflow, fitting retained and actions remain44px;390px before/after screenshots inspected. No new tests/typecheck/build/deployment for this CSS-only change; TODO priorities unchanged.

## 2026-10-12 — Replay footer-style phone hero reveal (R174)

CURRENT / IMPLEMENTED: apply footer wordmark’s opacity0→1, y24→0, scale.98→1 and blur10px→0 reveal to the phone hero brand and Good gifts. / Great moments. words. Reuse existing Framer Motion useAnimate/stagger primitives with matching0.7s easing and0.08s word delay; every fresh hero mount/reload starts anew, with no persistent seen flag. Inline word spans preserve readable server HTML, current fonts/spacing/two lines and R171 shadow removal. Desktop copy/footer behavior unchanged; reduced-motion skips animation and cleanup completes to readable final state. Sources: HomeSections.tsx and home.css. Typecheck/scoped ESLint/CSS parse/diff checks pass. Browser verifies all seven words on three consecutive reloads, final opacity1/blur0, reduced-motion no animation, no320/390/640/1440 overflow and no desktop hero word animation; final390px screenshot inspected. No new test suite/full build/deployment for this scoped presentation change. Temporary browser closed; TODO priorities unchanged.

## 2026-10-12 — Phone purchase controls after description (R173)

CURRENT / IMPLEMENTED: phone product BuyPanel is in normal document flow after the description instead of fixed to the screen bottom. Retain price/action grid and quantity/checkout handlers, remove floating background/blur/shadow and obsolete130/138px safe-area footer reserves; add18px description-to-controls gap. Ivory already inline stays inline, desktop purchase-column sticky behavior retained. Supersedes R164 fixed-phone-clearance preservation only. Source: product-detail.css. CSS parse/diff and15 isolated browser product/width checks (Candles/India/Ivory at320/390/600/640/1440) pass: normal scrolling, placement after description, no overflow or reserved bottom gap, desktop column unchanged; phone screenshot inspected. No new tests/typecheck/build or deployment for CSS-only change. Temporary browser closed; TODO priorities unchanged.

## 2026-10-12 — Small brand line above phone hero title (R172)

CURRENT / IMPLEMENTED: add The Gourmet Gifts above Good gifts. Great moments. on phones≤640px, centered in white11px/500 Plus Jakarta Sans using navbar’s font variable,1.5 line height/.12em tracking and8px bottom gap. Hide the new line above640px; preserve R171 larger shadow-free heading and desktop hero. Sources: HomeSections.tsx and b2c/home.css. Typecheck, scoped ESLint, CSS parse and git diff --check pass. No new tests/build/browser/deployment check for this small presentation change; TODO priorities unchanged.

## 2026-10-12 — Larger phone hero title without shadow (R171)

CURRENT / IMPLEMENTED: increase Good gifts. / Great moments. phone hero type from clamp(27px,7vw,32px) to clamp(34.5px,9vw,41px), approximately28%, and remove its text shadow through640px. Existing center alignment/font family/two-line copy/button/photo/desktop title retained. CSS parse/diff checks and isolated Chrome320/390/640/1440 pass: requested25–30% increase, shadow none, two lines, no text/page overflow; desktop mobile copy hidden.390px screenshot inspected. No typecheck/build/new tests or deployment for CSS-only change. Temporary browser closed; TODO priorities unchanged.

## 2026-10-12 — Bold card prices (R170)

CURRENT / IMPLEMENTED: shared B2C product-card price text uses700 weight at every width; centered alignment and existing amounts/actions retained. Source: product-cards.css. CSS parse and git diff --check pass; no browser/build/new test for this CSS-only weight change. TODO priorities unchanged.

## 2026-10-12 — Center shared product-card copy (R169)

CURRENT / IMPLEMENTED: center product-card title, inherited description and full-width price text across phone/desktop. Stack price above the centered purchase control so text aligns with the card center; preserve existing phone full-width actions, counter sizing, imagery, fonts and handlers. Source: product-cards.css. PostCSS parsing and git diff --check pass; no typecheck/build/new tests/browser check for this CSS-only alignment change. TODO priorities unchanged.

## 2026-10-12 — Remove Sample wording (R168)

CURRENT / IMPLEMENTED: remove the Sample suffix from shared temporary hamper price labels and Sample wording in Shop/collection preview notes at every width. Cards, related cards and purchase panel inherit the shared label change. Keep display amounts, final-price/availability confirmation copy and preview/checkout eligibility unchanged. Current user instruction supersedes R142’s visible Sample-label requirement only; temporary amounts remain display-only, never payable totals. Typecheck, scoped ESLint and git diff --check pass; no new tests/build/browser or deployment check for this copy-only change. TODO priorities unchanged.

## 2026-10-12 — Remove collection-preview card label (R167)

CURRENT / IMPLEMENTED: remove “Collection preview” and its empty price wrapper from shared B2C product cards at all widths. Preserve actual price/sample/enquiry labels, descriptions, quantity controls and existing preview/checkout eligibility. Source: ProductCard.tsx. Typecheck, scoped ESLint and git diff --check pass; no new tests/build/browser check or deployment for this presentation-only removal. TODO priorities unchanged.

## 2026-10-12 — Phone gift bag and measured delivery follow-up (R166)

CURRENT / IMPLEMENTED locally, unpublished: phone cart uses image-left rows, category/price-confirmation copy, inline burgundy quantity controls and a separate rounded order summary. Desktop retains its existing two-column presentation. Quantity edits preserve row order; actual totals remain unconfirmed and existing preview/checkout gates remain. Header refreshes auth on sign-in/out rather than every cart change. Footer uses lazy responsive photography at40% opacity, with a56,136-byte derivative instead of eager145,932-byte artwork; footer category links opt out of speculative prefetch. Typecheck/full lint/final isolated production build and44 client tests pass; fixture browser flows/responsive checks and local slow-phone delivery pass. Hosted anonymous Home/Shop/Cart snapshot observed no500 or JS exception; first API responses~3.2s, later~0.25–0.65s. No deployment/backend/account/history/payment change. PERFORMANCE/TESTING own evidence and limits; TODO priorities retained.

## 2026-10-12 — Product-card saved quantity controls (R165)

CURRENT / IMPLEMENTED: shared ProductCard opts into compact saved-cart controls; Add to Cart is replaced by minus/quantity/plus after confirmation, zero restores Add and reload restores saved quantity. Shared in-flight draft reads avoid one request per card without caching customer state. Existing cookie/write queue, revision retry,99 limit and failure behavior preserved. Combined R165/R166 verification is in TESTING.

## 2026-10-12 — Product section padding after removal (R164)

CURRENT / IMPLEMENTED: extend Ivory’s single-gap rule to every B2C product page after R163 removal. Hero bottom/editorial bottom padding0; editorial/related own64px desktop,48px through900px,24px through640px. Corporate inner padding/loading placeholder use the same token; fixed purchase-bar clearance retained. CSS parse/diff and12 browser comparisons across Ivory/India/Candles at390/640/768/1440 pass; image/purchase dimensions unchanged, no overflow. Phone/desktop screenshots inspected. TODO priorities unchanged; TESTING owns evidence.

## 2026-10-12 — Remove product finer-details section everywhere (R163)

CURRENT / IMPLEMENTED: remove the entire “Good to know / The finer details” accordion section from shared B2C product rendering, all products/all widths. Delete its unused content array and dedicated CSS, preserving shared related-section styles. Supersedes R151’s Ivory-only scope. Typecheck, scoped ESLint, CSS parse/diff and local HTTP checks on Ivory/India/Shagun/Candles pass; gallery/purchase/related content remains. No new tests/build/browser viewport check or backend/deployment change. TODO priorities unchanged; evidence in TESTING.

## 2026-10-12 — B2C reliable image loading (R162)

CURRENT / IMPLEMENTED locally: shared ProductPhoto resets recovery for each source, attempts original local asset after optimizer failure and shows an accessible bounded placeholder only if the original also fails. Hero chooses only loaded photos and recovers from a failed initial slide; gallery retains current photo until requested image loads and preserves it on failure. Gallery thumbnails now responsive optimized images. Existing fitting/frames/corners/content retained. All24 referenced local images exist/decode; slow-phone Home/Shop/Ivory/India and six deliberate failure/recovery scenarios pass, with phone/desktop gallery screenshots inspected. Typecheck/lint/build and41 client tests pass. No backend/account/payment/deployment change. TESTING owns limits/evidence.

## 2026-10-12 — B2C audit corrections and delivery optimization (R161)

CURRENT / IMPLEMENTED locally: R160 dependency, unsafe owner CLI, wrapper/parser/error, Origin/private-cache, OAuth state and public catalogue findings corrected in B2C. Next16.4 and independent dependency installs; both production dependency audits report zero vulnerabilities. Existing accounts, ownership, sessions, payment/preview gates and established design preserved. Production Home transfer ~4.89MB→0.71MB; simulated slow-phone load25.55s→4.07s and LCP9.83s→3.34s (single local lab samples). Typecheck, lint, production build,103 database tests,41 client tests and12 responsive layouts pass. No deployment or real provider transaction. Distributed general rate limits/trusted proxy, production schema installation and integration verification remain open; legacy applications' findings remain separate. SECURITY, PERFORMANCE and TESTING own details. Supersedes R160's current B2C remediation/test status, preserving its historical evidence.

## 2026-10-12 — B2C security/backend/performance audit completed (R160)

CURRENT / PARTIAL: no observed customer-data leak or signed-out admin bypass in tested local paths; not release-clean. Dependency audits report critical/high alerts; privileged CLI defaults, wrapper error exposure/raw-webhook/parser/provider wiring, broad Origin and missing private-cache policy remain. Slow-network Home LCP9.83s/load25.55s with heavy decorative transfers; no persistent headless scroll stall. Build/typecheck pass; lint fails; client37/38 and database87/97 pass, failures traced to stale mocks/box fixtures. No corrective source/dependency change, deployment or user-data mutation. Scope, limits and evidence: SECURITY, PERFORMANCE, TESTING. Existing legacy priorities remain; newly evidenced B2C audit work added to TODO with explicit rationale in CHANGELOG.

## 2026-10-12 — Local OWNER access and Google sign-in confirmed (R159)

CURRENT / IMPLEMENTED locally: approved first-owner bootstrap completed for the explicitly selected existing account; Google identity/customer ownership preserved, prior sessions revoked and one audit recorded. Browser Google flow uses `/admin` return and a new nonexpired OWNER session was observed. Supersedes earlier pending approval. Authenticated admin UI/API contents were not directly inspected; production unchanged. Evidence: TESTING; TODO priorities unchanged.

## 2026-10-12 — B2C admin sign-in prepared (R159)

CURRENT / PARTIAL: local admin/sign-in pages return200 and browser opening succeeds; Google is enabled. Selected existing account is Google-only CUSTOMER, with no local OWNER/ADMIN provisioned. Full local OWNER bootstrap approval requested; no elevation or login has been completed. Two existing isolated bootstrap/admin-return tests pass. Evidence: TESTING. Record provisioning-script security debt in TODO without changing priority ordering.

## 2026-10-12 — Google400 redirect mismatch investigated (R158)

CURRENT / PARTIAL: local Google login start is healthy302 and emits the3000 storefront callback. Reported provider rejection requires matching registration in that OAuth client's Google Console; actual registered list and reported environment are UNKNOWN. Setup README corrected; auth code/configuration unchanged. No completed Google sign-in verified. Evidence: TESTING; TODO priorities unchanged.

## 2026-10-12 — Missing favicon fixed (R157)

CURRENT / IMPLEMENTED: root metadata links the existing GG PNG as icon/shortcut icon. Typecheck and diff check pass; scoped layout ESLint has zero errors and one existing unused-disable warning. Home/Shop/Ivory HTTP responses contain both correct links; icon returns200 with matching file bytes. TODO priorities unchanged.

## 2026-10-12 — Consistent title font and buttons (R156)

CURRENT / IMPLEMENTED: public headings use Cormorant Garamond at every width; styled actions share9px corners,44px minimum height and12px Jakarta text. Tablet collection actions show labels. Typecheck, CSS parse/diff and42 responsive page/width checks pass; scoped layout ESLint has zero errors and one pre-existing unused-disable warning. Navigation, keyboard focus and filter dialog checks pass; phone/tablet/desktop screenshots inspected. Existing tablet heading/action overlap recorded in TODO; priorities unchanged.

## 2026-10-12 — Phone navbar keeps GG logo (R155)

CURRENT / IMPLEMENTED: phone header retains GG before/after scroll; full brand name stays hidden. Typecheck/scoped lint, CSS parse/diff and seven-width checks on Home/Shop/PDP pass, including scroll-return, no overflow/brand-action overlap, and logo navigation. Phone screenshots inspected. TODO priorities unchanged.

## 2026-10-12 — Stable B2C navbar options (R154)

CURRENT / IMPLEMENTED: route changes retain Shop/Hampers/Collections/Corporate; Our Story no longer replaces Collections. Footer matches. Typecheck/scoped lint/diff and responsive browser checks pass, including actual Home→Collections→product→Collections navigation and mobile menu/dropdown controls. Navbar screenshot inspected. TODO priorities unchanged.

## 2026-10-12 — Single gaps between Home content sections (R153)

CURRENT / IMPLEMENTED: remove following top padding between adjacent Home content sections. Hampers→Favourites and Philosophy→FAQ now measure40/32/24px across desktop/tablet/phone. CSS parse/diff and six-width browser checks pass; desktop screenshot inspected. TODO priorities unchanged.

## 2026-10-12 — Remove stacked Ivory section padding (R152)

CURRENT / IMPLEMENTED: Ivory hero/editorial/related gaps are owned once at64/48/24px, replacing adjacent padding sums. CSS parse/diff and390/768/1440px browser comparisons pass; gallery/purchase/related-card dimensions and India layout retain baseline values. Desktop/phone screenshots inspected. TODO priorities unchanged.

## 2026-10-12 — Remove Ivory desktop finer details (R151)

CURRENT / IMPLEMENTED: Ivory’s finer-details panel is absent from rendering at every width. Typecheck/scoped lint, CSS parse/diff and Ivory/India browser checks at390/768/1024/1440px pass; desktop screenshot inspected. Related content follows normally; India details remain. TODO priorities unchanged.

## 2026-10-12 — B2C footer navigation (R150)

CURRENT / IMPLEMENTED: both B2C footer variants use shared navbar destinations and four Shop categories instead of legacy category/occasion content. Design/contact details remain. Typecheck/scoped lint/diff checks and Home/Shop/PDP browser checks at320/390/768/1440px pass, including a footer category click and dropdown Escape dismissal. Phone/desktop screenshots inspected. TODO priorities unchanged.

## 2026-10-12 — Even Home section spacing (R149)

CURRENT / IMPLEMENTED: Home sections share40/32/24px responsive vertical padding; remove nested FAQ vertical padding. CSS parse/diff and eight-width browser checks pass, including FAQ expansion and unchanged collection-card dimensions. Phone/desktop screenshots inspected. TODO priorities unchanged.

## 2026-10-12 — Shop buttons on favourites (R148)

CURRENT / IMPLEMENTED: desktop favourites show centered burgundy Shop now buttons instead of prices. Each opens its own collection; all three browser click navigations pass. Typecheck, scoped lint (two existing artwork warnings), CSS parse/diff and eight-width checks pass; desktop screenshot inspected. TODO priorities unchanged.

## 2026-10-12 — Centered favourites text (R147)

CURRENT / IMPLEMENTED: desktop favourites now have centered copy, bold titles and price amounts without “From.” Scoped page lint, CSS parse/diff and eight-width browser checks pass; desktop screenshot inspected. TODO priorities unchanged.

## 2026-10-12 — Inset desktop card images (R146)

CURRENT / IMPLEMENTED: favourites photos now have an inset white frame and four rounded corners following the card curve. CSS parse/diff and eight-width browser checks pass; desktop screenshot inspected. Phone/tablet measurements retain R145 values. TODO priorities unchanged.

## 2026-10-12 — Smaller desktop favourites (R145)

CURRENT / IMPLEMENTED: desktop collection cards are more compact; at1440px each is about327×491px instead of357×589px. CSS parse/diff and eight-width browser checks pass; desktop screenshot inspected. Phone/tablet metrics retain R144 values. TODO priorities unchanged.

## 2026-10-12 — Desktop collection-card redesign (R144)

CURRENT / IMPLEMENTED: desktop favourites now use photo-led rounded white cards, sans titles, muted copy and aligned starting prices from the existing local catalogue. Phone/tablet cards retain their layout/actions. Typecheck, scoped lint (two existing artwork warnings), CSS parse/diff and eight-width browser checks pass; phone/desktop screenshots inspected. TODO priorities unchanged.

## 2026-10-12 — Footer background wallpaper (R143)

CURRENT / IMPLEMENTED: Home and standard B2C footer backgrounds use the supplied wallpaper at40% opacity. Text/links remain fully opaque. CSS parse/diff checks and390/1440px Chrome checks on both footer variants pass; screenshot inspected. TODO priorities unchanged.

## 2026-10-12 — Temporary hamper prices (R142)

CURRENT / IMPLEMENTED: Ivory ₹2,499 and India ₹2,999 Sample labels appear in PDP, related cards and Shop. Authoritative data stays unpriced/preview and existing checkout restrictions remain. TypeScript/scoped lint,23 catalogue/cart tests, helper/data assertions and responsive Chrome checks pass; screenshot inspected. Commercial completion remains on TODO; priorities unchanged.

## 2026-10-11 — Hide Ivory phone details (R141)

CURRENT / IMPLEMENTED: remove the complete “The finer details” section from Ivory phone presentation. CSS parse/scoped-rule and diff checks pass. Existing TODO priorities unchanged.

## 2026-10-11 — Phone related-photo fit (R140)

CURRENT / IMPLEMENTED: Ivory phone related photos fill their equal frames with centered cover; main photos and larger related photos retain their fit. Five-width Chrome, CSS parse and diff checks pass;390px screenshot inspected. TODO priorities unchanged.

## 2026-10-11 — Equal related-card sizing (R139)

CURRENT / IMPLEMENTED: Ivory phone related cards now use equal photo/title areas and bottom-aligned actions. CSS parse, diff check and Chrome320/390/640px dimension/alignment assertions pass;768/1440px remain overflow-free.390px screenshot inspected. Existing TODO priorities unchanged.

## 2026-10-11 — Ivory phone ecommerce purchase layout (R138)

CURRENT / IMPLEMENTED: Ivory phone summary now has a normal left-aligned title/short description, enquiry price and in-flow Add to Cart/Buy now row. Confirmed add becomes a quantity counter; Buy now retains any selected quantity, ensures a saved draft and opens cart review. Primary phone note panel and floating bar are removed. Price confirmation/checkout restrictions remain. Typecheck, scoped lint,23 cart/API tests, CSS parse and five-width browser checks pass, including mocked failure/quantity/navigation and desktop/India comparisons. Screenshots inspected. Commercial completion remains on the existing TODO; priorities unchanged.

## 2026-10-11 — Ivory Hamper phone redesign (R137; summary/note/floating controls SUPERSEDED by R138)

CURRENT / IMPLEMENTED: Ivory Hamper now has a phone return link, centered summary card, compact note/accordion panels, rounded related cards and an inset floating burgundy cart bar. Preserve source imagery, enquiry pricing and cart/note semantics. Typecheck, scoped lint, CSS parse and five-width Chrome checks pass; note keyboard access, details, scroll states, mocked cart add/remove/503 feedback and footer clearance pass. Screenshots inspected; larger Ivory/India phone comparisons retain prior layout. TODO priorities unchanged.

## 2026-10-11 — Phone Home/PDP refinements and local API recovery (R132–R136)

CURRENT / IMPLEMENTED: Home collection cards match the compact centered Shop phone cards with burgundy actions; philosophy uses balanced2×2 tiles; packaging copy/Shop gifts are centered. PDP phone galleries show rounded real-photo thumbnails and retain selection, including one preview when only one image exists. Correct the6px phone related-carousel overflow found during checks. Typecheck, scoped lint (two existing artwork warnings), CSS parse and browser checks pass; screenshots inspected.

CURRENT / IMPLEMENTED locally: the reported auth500s were caused by stopped local Mongo/auth listeners. Restarted the existing isolated replica-set database and auth service. Through Next, gift count/catalogue/draft return200 and signed-out me returns expected401. No environment values, contracts or customer records changed; local services remain running. Startup commands are in ENVIRONMENT; no autostart or deployment implied. TODO priorities unchanged.

## 2026-10-11 — Hide phone Shop header search (R131)

CURRENT / IMPLEMENTED source: phone Shop/collections hide the header search entry as well as the existing inline field. CSS parse and diff checks pass; no new browser review. TODO priorities unchanged.

## 2026-10-11 — Sticky bottom phone filter (R130)

CURRENT / IMPLEMENTED: phone Shop/collections have a fixed bottom Filter action opening category links and available sorting in a modal sheet. Reserve safe-area/footer space; preserve query/route/preview behavior and larger layouts. Typecheck, scoped lint, CSS parse and five-width Chrome checks pass; keyboard dismissal/focus return, category navigation, query-preserving sort, resize closure and preview collection checks pass. Screenshots inspected. TODO priorities unchanged.

## 2026-10-11 — Colour phone Shop buttons (R129)

CURRENT / IMPLEMENTED source: phone Shop/collection buttons now have burgundy fill and ivory text. CSS parse and diff checks pass; no new browser review. TODO priorities unchanged.

## 2026-10-11 — Hide Shop phone search and center card text (R128)

CURRENT / IMPLEMENTED: hide Shop search through640px and center card titles, descriptions and prices across Shop/collections. CSS parse and five-width Chrome checks pass; filtered form retains its search query and phone screenshot inspected. Larger-screen search/alignment and TODO priorities unchanged.

## 2026-10-11 — Reference-style Shop phone catalogue (R127)

CURRENT / IMPLEMENTED: Shop and dedicated collections use a photo category rail with selected check badge, two-column phone cards, two-line descriptions and full-width outlined actions. Keep existing category destinations, product prices, preview labels and cart handlers. Compact the phone introduction and retain search/sort; larger layouts keep their current presentation. Typecheck, scoped lint, CSS parsing, final production build and responsive/navigation checks pass. Mocked cart success/error checks pass without real writes; phone/desktop screenshots inspected. Existing catalogue fallback debt recorded in TODO; priorities unchanged.

## 2026-10-11 — One-line phone hamper descriptions (R126)

CURRENT / IMPLEMENTED: show a concise centered description below each Home hamper title on phones. All three descriptions fit one line at320/390/640px; desktop descriptions retain their existing copy. Typecheck, scoped lint, CSS parse and five-width browser checks pass; phone screenshot inspected. TODO priorities unchanged.

## 2026-10-11 — Redesign phone hero text and button (R125)

CURRENT / IMPLEMENTED: use compact “Good gifts. / Great moments.” sans-serif copy and an ivory Shop now button with burgundy text and8px corners on phones. Keep centered alignment,260px frame and unfiltered photos. Typecheck, scoped lint, CSS parse and five-width Chrome checks pass; all three phone slide screenshots inspected. Larger hero presentation and TODO priorities unchanged.

## 2026-10-11 — Remove phone hero colour overlay (R124)

CURRENT / IMPLEMENTED source: remove the warm red/brown gradient behind the phone hero text. Keep centered text, photo slideshow and Shop now. CSS parse and five-width overlay checks pass; no new browser review. TODO priorities unchanged.

## 2026-10-11 — Center phone hero copy (R123)

CURRENT / IMPLEMENTED source: center the phone hero heading and Shop now. CSS parse and five-width alignment-rule checks pass; no new browser review. TODO priorities unchanged.

## 2026-10-11 — Refine phone hero headline (R122)

CURRENT / IMPLEMENTED: replace the phone headline with “Thoughtful gifts. / Made special.” using the bundled Cormorant serif, a warm second line, wider insets and compact Shop now button. Keep the260px photo frame and minimal R121 content. Typecheck, scoped lint, CSS parse and five-width browser checks pass;390px screenshot inspected. Larger headline remains unchanged; TODO priorities unchanged.

## 2026-10-11 — Simplify phone hero text (R121)

CURRENT / IMPLEMENTED: on phones through640px, keep only the existing hero headline and Shop now button over the slideshow. Hide the kicker, description and benefit row; reduce the minimum frame height to260px with content growth allowed. CSS parsing and five-width browser checks pass; phone screenshot inspected. Desktop/tablet copy remains visible. TODO priorities unchanged.

## 2026-10-11 — Remove phone search and overlay hero photo (R120)

CURRENT / IMPLEMENTED: remove the Home-only phone search bar and place the existing slideshow behind the complete phone hero frame. Use a transparent copy panel, dark contrast fade and compact content-driven height (340–360px in checked phone widths). Browser checks at320/390/640/768/1440px confirm no page overflow; phone photo coverage, CTA/dot hit targets and manual slide selection pass. Phone screenshot inspected. Tablet/desktop hero rules retained. Existing desktop dot overlap recorded in TODO; no priority change.

## 2026-10-11 — Hide Home phone collection strip (R119)

CURRENT / IMPLEMENTED source: hide the small collection-photo strip beneath the Home hero on phones. Desktop visibility remains unchanged; search and main hamper/collection sections remain available. CSS parse and seven-width display-rule checks pass; browser visual acceptance UNKNOWN. TODO priorities unchanged.

## 2026-10-11 — Compact Home hero on phones (R118)

CURRENT / IMPLEMENTED source; visual acceptance UNKNOWN: reduce the mobile Home hero's oversized headline to a balanced two-line scale, shorten supporting copy typography, and tighten padding, CTA and four promise icons. Keep the image-first slide, destinations, copy and all desktop rules. CSS parse, B2C checks and diff checks recorded in TESTING.

## 2026-10-11 — Fix hosted B2C image paths and optimizer fallback (R117)

CURRENT / IMPLEMENTED source: the first Home hero image referenced a root-level file outside `B2C/public`, so the B2C deployment could not serve it. All three slides now use the tracked, optimized WebP hero assets under `B2C/public/images/brand`. Shared `ProductPhoto` retries the original local asset if Next image optimization errors. Typecheck, focused lint and production build pass. Live hosted requests remain UNKNOWN; this environment cannot resolve the configured Vercel hostname or bind a local test server.

## 2026-10-11 — Refine product detail presentation (R116)

CURRENT / IMPLEMENTED source: polish shared product pages in the existing ivory/burgundy/gold theme. Desktop uses a framed gallery and purchase card; phones use a contained square gallery, shorter text and an accessible fixed cart/enquiry area with safe-area padding. Gift quantity/checkout behavior is preserved, while catalogue variant controls remain in page flow. B2C typecheck, focused lint, stylesheet parse, production build and diff checks pass. Visual browser acceptance UNKNOWN because localhost:3000 is unavailable.

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
