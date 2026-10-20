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

Product and collection breadcrumbs are visible on phones again, with 44px link targets. Product names truncate in the breadcrumb instead of widening the viewport. The Ivory-only All hampers shortcut is replaced by the shared Home / Hampers / product trail. Existing destinations, product/card/gallery design, cart state, auth requests and commerce contracts are retained. Sources: Header.tsx, navigation.css, shop.css, products/[slug]/page.tsx and product-detail.css. No commit, push or deployment performed for R269.

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

R261 CURRENT / IMPLEMENTED locally: requested compact phone reference structure with existing brand theme and contents. Scope Home hamper/collection and shared catalogue cards; image-overlay Add/quantity control, price before title/description, two phone columns. Keep collection navigation, underlying prices, cart/checkout data and desktop design. Scoped lint/typecheck and responsive interaction checks pass; no deployment.

## 2026-10-13 — Latest-three phone cart thumbnails (R260)

CURRENT / IMPLEMENTED locally: phone cart photo stack renders a reversed copy of the final three gift rows, so newly appended products appear first and older thumbnails leave the three-photo preview. Latest photo layers above overlapping older photos. Only presentation changes: original row order, quantities, full tray/cart, checkout and API payloads retained. No in-place reverse of draft items; repeat quantity increments do not reorder distinct product rows. Scoped lint and local browser fixture pass; no deployment.

## 2026-10-13 — Smaller animated phone cart bar (R259)

CURRENT / IMPLEMENTED locally: reduce phone cart pill from360px maximum width/70px measured height to300px/58px, with38px overlapping photos and14px/11px label/count. Retain44px link/close touch targets. Add360ms slide/fade entrance and short photo/count update animation using transform/opacity only; count animation restarts on confirmed quantity change. Reduced-motion disables animations/transitions. Theme, routing and larger-screen tray retained. Scoped lint/typecheck and six-width local browser checks pass; no deployment.

## 2026-10-13 — Compact phone cart bar (R258)

R258 CURRENT / IMPLEMENTED locally: latest supplied compact-cart reference replaces expanded phone tray with themed thumbnail/count/View cart bar while shopping remains possible. Reuses confirmed event state, closes on navigation/dismissal and retains desktop tray. Six-width browser verification and scoped lint/typecheck pass; no deployment.

## 2026-10-13 — Mumbai auth placement and single-query profile (R257)

R257 CURRENT / IMPLEMENTED locally: address reported signed-in /me4s latency via Mumbai function configuration, one-query safe profile and initializer/query timing diagnostics. Existing auth/admin ownership/privacy preserved;40 targeted regressions pass. CURRENT / PARTIAL: user confirms Mumbai DB and request shows US execution; both-project deployment and measured signed-in improvement remain outstanding. No universal latency promise or unrelated commerce changes.

## 2026-10-13 — Image-only linked phone hero (R256)

CURRENT / IMPLEMENTED locally: at <=640px hide Home hero copy/brand/Shop now CTA, remove image blur and dark tint, and expose a full-frame accessible link to the same /shop destination. Keep the260px compact frame and existing responsive slideshow photographs. Slideshow dots stay above the link and switch slides independently; larger viewport copy/CTA remains. Sources HomeHeroSlideshow.tsx/home.css. SUPERSEDES R251 visible phone headline and R227 phone blur/shade only. Scoped ESLint/typecheck and local browser checks at320/375/430/640/768/1440px pass: hidden phone copy, no filter/tint, exact full-frame link, no overflow; real pointer dot selection stays on Home and image click navigates to /shop. Phone screenshot inspected; git diff --check passes. No deployment.

## 2026-10-13 — Remove redundant pre-add draft read (R255)

R255 CURRENT / IMPLEMENTED locally: address reported me600ms/draft400ms adding delay by removing redundant GET before normal mounted-card Add/quantity saves. Keep price/name/cart correctness and concurrent-edit protection. Sources gift-cart.ts/AddGiftToCartButton.tsx and gift-cart tests.88 client regressions, typecheck/scoped lint and fixture browser one-PUT additions/409 recovery pass. Actual hosted improvement requires deployment and measurement; no latency SLA claimed.

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

R249 CURRENT / IMPLEMENTED locally: product-page thumbnails must be smaller and vertical to the main image’s left; selecting one displays that photo in the main frame. Sources ProductGallery.tsx, products/[slug]/page.tsx and product-detail.css. Existing hamper detail photos are selectable gallery entries, including all four Ivory close-ups. Browser verification at1440/1024/768/375/320px confirms layout, all image selections, desktop height alignment and no horizontal overflow; single-photo behavior verified at1440/375px. No deployment.

## 2026-10-13 — Compact Ivory product layout (R248)

CURRENT / IMPLEMENTED locally: above900px, Ivory’s four existing photographed close-ups span both hero columns in one row, replacing the left-only2×2 supplement that left the purchase-column bottom empty. Main gallery/purchase heights remain aligned. Reduce hero bottom padding and related-section top padding to32px each; no added copy/content. Phone retains all four close-ups in2×2 and related carousel. Source products/[slug]/product-detail.css. Browser at1440/1024px verifies full-width supplement, single-row figures,18px panel-to-photos gap and32px supplement-to-related section gap;375/320px preserve2×2,three related cards and no overflow. Desktop screenshot inspected; git diff --check passes. No deployment.

## 2026-10-13 — Match philosophy heading to packaging heading (R245)

CURRENT / IMPLEMENTED locally: Gifting made easy uses the same responsive font-size rule as Beautifully packaged / Thoughtfully curated:clamp34px/4vw/48px,31px at641–700px,34px <=640px. Shared selector in home.css prevents heading-size drift. Supersedes only R242 philosophy heading reduction; smaller paragraph/value text retained. Browser verified equal computed sizes/no horizontal overflow at1440/1024/768/700/640/375/320px. git diff --check passes; no deployment.

## 2026-10-13 — Match collection card widths to hampers (R244)

CURRENT / IMPLEMENTED locally: remove the Home collection grid1020px desktop cap and match hamper gaps/columns above640px (3 columns/18px gap above900px;2 columns/16px at641–900px). This completes R243 width matching; previous work matched card internals but retained narrower collection grid. Existing phone two-column grid/fourth Explore tile preserved. Browser at1440/1024/950/900/768/641px verifies equal card widths within fractional rounding (1440:392px each, previously collection326.66px);375px phone regression passes; no overflow. CSS/diff checks pass; no deployment.

## 2026-10-13 — Collection cards match hamper layout (R243)

R243 CURRENT / IMPLEMENTED: pictured Home Envelopes/Candles/Stationery cards match hamper layout while retaining collection navigation and From prices. Sources HomeSections.tsx/storefront-cards.css/storefront-ui.css. Browser checks1440/768/375/320px compare matching corners/borders/photo ratios/content padding/title size, flush photographs and full-width actions; no overflow, correct collection links and phone Explore tile preserved. Scoped lint/typecheck pass; no deployment.

## 2026-10-13 — Four FAQs followed by dropdown (R241)

R241 CURRENT / IMPLEMENTED: show first4 Home FAQs and put all remaining questions in an expandable dropdown immediately after question4. Sources HomeFAQ.tsx/home.css/storefront-ui.css. Supersedes earlier3-row scroll instruction. Browser verifies4→6→4 visible questions, Space-key expansion, nested answer opening and no horizontal overflow at1440/375/320px; scoped lint/typecheck pass.

## 2026-10-13 — Phone Explore all gifts card (R237)

R237 CURRENT / IMPLEMENTED: phone Home collection grid gets a white-text/burgundy Explore card opening All gifts (/shop). Sources b2c/page.tsx and home.css. Local browser verified320/375/430px visibility, adjacent equal height, no overflow;768/1440px hidden; navigation to /shop succeeds. Scoped lint/typecheck pass; no deployment.

## 2026-10-13 — Compact Home card title spacing (R236)

R236 CURRENT / IMPLEMENTED: reduce pictured Home collection title/paragraph gap. Source storefront-cards.css; reserve two title lines only on phone. Local browser verifies8px element gap at1440/1024/375px, natural one-line desktop titles, aligned phone titles and no horizontal overflow. No deployment.

## 2026-10-13 — Fixed full cart and complete phone thumbnails (R234–R235)

| Requirement | Current status and traceability |
| --- | --- |
| R234 /cart fixed after two products; scroll products only | CURRENT / IMPLEMENTED: GiftCart.tsx/gift-cart.css/useTwoRowScroll.ts; >2 distinct rows enable viewport containment; heading/summary/checkout fixed; <=2 restores ordinary scroll/footer. Clarifies R230 applies to full cart, beyond earlier tray-only interpretation. |
| R235 all product-page thumbnails visible on phone | CURRENT / IMPLEMENTED: product-detail.css wraps all gallery views and unhides real photographed close-ups, preserving empty-block hiding and related carousel. |

TESTING owns responsive/browser evidence. Existing pricing, required Lotus names, customer ownership, stock/payment authority and included charges remain unchanged; no deployment claimed.

## 2026-10-13 — Ivory close-up photos and packaging panel opacity (R231–R233)

R231 CURRENT / IMPLEMENTED: supplied Farmley Panchmeva pouch appears beside existing Ivory Thekua/Chilli close-ups. R232 CURRENT / IMPLEMENTED: Laddoo candles joins the same area via existing approved photo. Sources product-editorial.ts, products/[slug]/page.tsx, supplied/compressed public asset; no new product/SKU. R233 CURRENT / IMPLEMENTED: pictured Home packaging-copy background90% opacity, copy/actions fully opaque; home.css. PERFORMANCE/TESTING own asset and browser checks.

## 2026-10-13 — Non-blocking cart tray and two-item scroll cap (R229–R230)

| Requirement | Current status and traceability |
| --- | --- |
| R229 Add opens closable right tray; keep adding with it open | CURRENT / IMPLEMENTED: CartTray/cart-tray.css/StorefrontChrome; successful Add/builder/legacy additions → gift-cart-events; existing quantity/cart pricing; tests/browser evidence in TESTING |
| R230 two options then fixed tray with list-only scrolling | CURRENT / IMPLEMENTED: first-two-row cap, fixed heading/summary/action, viewport-bound flex list and limited ResizeObserver; responsive browser evidence in TESTING |

Existing prices/included GST-delivery/stock reservations/customer identity/required Lotus names/payment authorization unchanged. No hosted deployment claimed.

## 2026-10-12 — Hosted count request optimization (R228)

R228 CURRENT / IMPLEMENTED locally: investigate user-reported hosted gift/count wait and reduce duplicate requests without corrupting badge/session ownership. Header/gift-cart share pending shopping draft; routes.js projects count quantities; tests cover freshness/failure/owners/streamed hydration. CURRENT / PARTIAL hosted: warm samples260–320ms and initial503; no deployment or20ms guarantee. PERFORMANCE/TESTING own measurements and limitations.

## 2026-10-12 — New bookmarks and responsive Home polish (R225–R227)

| Requirement | Status and traceability |
| --- | --- |
| R225 two new supplied bookmark cards, ₹349 each | CURRENT / IMPLEMENTED: bookmark-photos/catalogue-preview/catalogue + gifting/items/prices/provisioned ProductVariant/Inventory; existing card preserved; catalogue and checkout regressions |
| R226 balanced counter and supplied phone hero photos | CURRENT / IMPLEMENTED: storefront-cards.css/HomeHeroSlideshow/ProductPhoto/home.css; responsive native picture and existing controls; TESTING |
| R227 white hero copy/subtle dark blur and level collection text | CURRENT / IMPLEMENTED: latest steering supersedes gold/burgundy/no-overlay request; mobile home.css + shared collection title2lh; TESTING |

No change to existing included GST/delivery, five-minute reservations, ownership or payment authority. Hosted deployment remains separate.

## 2026-10-12 — Inclusive checkout, envelope packs and spacing (R222–R224)

| Requirement | Current scope | Source / data / API / UI / tests |
| --- | --- | --- |
| R222 hosted delay/lag | CURRENT / PARTIAL: smaller Home photos/deferred alternatives/reveal; no physical-device or universal20ms proof | home-photos/HomeHeroSlideshow/useWordReveal; PERFORMANCE/TESTING |
| R223 direct payment,100 stock,5min hold,included18% GST | CURRENT / IMPLEMENTED locally; deployment/provider/scheduler partial | gifting/catalogue/checkout; Order/Inventory/Payment/Finance; gift/order + Razorpay; DeliveryCheckout/admin; gift-checkout/razorpay regressions |
| R224 envelope packs/spacing/no strip | CURRENT / IMPLEMENTED locally:10 ₹1,499;20 ₹2,499;PDP-only selectors;all card strips removed | catalogue-items/prices + distinct ProductVariant/GiftDraft IDs; BuyPanel/EnvelopePackSelector/ProductCard/cart; pricing/browser/backend tests |

Latest R224 removal SUPERSEDES R215/R217 strips; R223 approved server mappings SUPERSEDES earlier blanket unavailable-order guards for mapped valid stock only. Required Lotus names and retained related carousel continue. Production activation, actual printing/fulfillment and hosted latency remain separately unverified.

R220 (2026-10-12) CURRENT / IMPLEMENTED locally: user reports card prices disappearing in cart. Preserve the same existing displayed unit price across card/PDP/cart, quantities, printing-name saves and reload; sum inclusive amounts without extra GST/delivery. Shared display-price resolver covers all registered gift IDs/slugs; replace stale candle range and missing envelope/bookmark amounts. Do not silently assign a price to unknown/unregistered items, enable payments or rewrite orders/basePrice. SUPERSEDES R196/R213 “preview figures excluded from cart” and old range presentation only. Sources: product-pricing.ts/gift-cart-pricing.ts/GiftItem type; TESTING/API_CONTRACTS/BUSINESS_LOGIC.

R219 (2026-10-12) CURRENT / IMPLEMENTED locally: latest explicit instruction makes Lotus print name compulsory, SUPERSEDING R216's initial optional/Skip implementation. Remove Optional/Skip UI, block blank PDP Add/Buy now/name save and require PRINT name before server checkout/address preparation. Existing legacy Skip is unresolved; never invent/rewrite customer names. User may close dialog and continue browsing. Sources: PrintNameField/AddGiftToCartButton/GiftCart and gifting/personalisation.js; API_CONTRACTS/TESTING.

R218 (2026-10-12) CURRENT / IMPLEMENTED locally: desktop product main image plus thumbnails must equal the adjacent text/purchase panel's total height. CSS grid containment/flex follows content changes; supplementary photos/caption retain a separate left row. Phone/tablet framing and related products remain. Sources: product page/product-detail.css; UI_SYSTEM/TESTING.

R217 (2026-10-12) CURRENT / IMPLEMENTED locally: expand R215 Pack of 20 strip to every envelope ProductCard, excluding Home collection navigation. Preserve existing white90%/burgundy treatment, identities and price/quantity arithmetic. ProductCard category predicate; UI_SYSTEM/TESTING.

R216 (2026-10-12) CURRENT / IMPLEMENTED locally with optional/Skip behavior SUPERSEDED by R219: add Lotus name-print field under purchase controls; save name with draft, retain it across cart edits/reload/sign-in, prompt at cart checkout if missing and expose edits/review. Strict bounds, cookie ownership, revisions, errors and unavailable-payment guards retained. Shared cards may save an unnamed selection for later completion. Sources: BuyPanel/PrintNameField/AddGiftToCartButton/GiftCart/DeliveryCheckout, gift-cart/hooks and GiftDraft/gifting routes. DATABASE/DATA_MODELS/API_CONTRACTS/BUSINESS_LOGIC/TESTING own persistence and evidence.

R215 (2026-10-12) CURRENT / IMPLEMENTED locally: add thick90%-white full-width strip with centered Pack of 20 at bottom of pictured Lotus product card image. Scope this presentation to Lotus; retain theme and existing purchase behavior. ProductCard/storefront-cards.css; UI_SYSTEM/TESTING.

R213 (2026-10-12) CURRENT / IMPLEMENTED locally: current user says listed prices include GST and delivery. Cart sums inclusive item prices × quantity, removes extra18%/delivery rows and before-delivery/excl.GST wording. SUPERSEDES R192/R193 extra-charge policy; internal included-tax allocation remains UNKNOWN, existing unknown-price/packaging and order/payment guards retained. BUSINESS_LOGIC/UI_SYSTEM/TESTING.

R214 (2026-10-12) CURRENT / IMPLEMENTED locally for UI/resilience: center shared card text and handle temporary503 on allowlisted GETs with one bounded retry; never replay mutations. CURRENT / PARTIAL hosted: first public catalogue read503 then subsequent reads200; actual hosting/dependency cause UNKNOWN and no deployment performed. API_CONTRACTS/UI_SYSTEM/TESTING.

R212 (2026-10-12) CURRENT / IMPLEMENTED locally: Home Lotus discovery card shows From ₹99.00 and opens /shop/envelopes through image/title/action; use collection navigation instead of direct product Add. Retain photo/theme/product catalogue/PDP behavior. Source: b2c/page.tsx; UI_SYSTEM/TESTING.

R211 (2026-10-12) CURRENT / IMPLEMENTED locally: supplied card reference governs simple photo → title → one short paragraph line → large price → Add to Cart hierarchy, preserving ivory/burgundy/serif theme and no capsule above image. Share ProductCard across catalogue and retained related carousel; update Home card hierarchy/price/action where product identity exists. Existing cart counter/error behavior and commerce guards retained; category cards remain collection links. Sources: ProductCard/HomeSections/Home/PDP/storefront-cards.css; UI_SYSTEM/TESTING.

R210 (2026-10-12) CURRENT / IMPLEMENTED locally: supplied envelopes/ep1_3.png becomes Lotus ep1 main/card/gallery photo; compress web copy, retain original and prior gallery views. UI_SYSTEM/PERFORMANCE/TESTING.

R209 (2026-10-12) CURRENT / IMPLEMENTED locally: retain other-product carousel on product pages, correcting R207 removal interpretation. Existing related cards/prices/links and phone scroll restored. UI_SYSTEM/TESTING.

R208 (2026-10-12) CURRENT / IMPLEMENTED locally: remove nine envelopes from Stationery because they belong to Envelopes; online/offline filtering and discovery copy/photo updated, other collections/identities retained. catalogue.ts/catalogue-preview.ts; UI_SYSTEM/TESTING.

R207 (2026-10-12) CURRENT / IMPLEMENTED locally: remove pasted product lower enquiry/personalisation/editorial/corporate content and product-page footer; other-route footers retained. Related products explicitly retained by R209. Product page/StorefrontChrome; UI_SYSTEM/TESTING.

R206 (2026-10-12) CURRENT / IMPLEMENTED locally: fix reported browsing429 for count/me/draft by isolating bounded frequent bootstrap reads from credential/write rate budget, coalescing concurrent bootstrap calls and preserving authentication/security/ownership guards. auth/rate-limit.js/api.ts; API_CONTRACTS/SECURITY/TESTING.

R205 (2026-10-12) CURRENT / IMPLEMENTED locally: product-page purchase price font30% larger than previous at each breakpoint; existing font/weight and card/cart roles retained. Source: product-detail.css; UI_SYSTEM/TESTING.

R204 (2026-10-12) CURRENT / IMPLEMENTED locally: restore horizontal line only beneath FAQ Q1–Q5, superseding R200 removal for those rows only. Source: storefront-ui.css; UI_SYSTEM/TESTING.

R203 (2026-10-12) CURRENT / IMPLEMENTED locally: remove image hover zoom across B2C; preserve existing card hover and keep standalone image hover static. Sources: existing global/catalogue/Home styles; UI_SYSTEM/TESTING.

R202 (2026-10-12) CURRENT / IMPLEMENTED locally: smooth Home navbar/hero wallpaper by sharing one continuous ivory/pattern canvas; remove boundary border/shadow and independent pattern restart. Sources: home.css/navigation.css; UI_SYSTEM/TESTING.

R201 (2026-10-12) CURRENT / IMPLEMENTED locally: supplied scented_candle/cn3.png is Artisanal Laddoo Candles main/card/gallery image; compressed distinct WebP used throughout, original retained. Existing product/gift identity retained; PERFORMANCE/TESTING.

R200 (2026-10-12) CURRENT / IMPLEMENTED locally: remove decorative horizontal margin/section/row dividers throughout B2C public storefront, preserving functional control/card borders. Latest R204 exception adds FAQ Q1–Q5 bottom lines only. Source: storefront-ui.css; UI_SYSTEM/TESTING.

R199 (2026-10-12) CURRENT / IMPLEMENTED locally: phone product image gets18px top space and45% less gallery height; preserve larger layouts and filled framing. Source: product-detail.css; UI_SYSTEM/TESTING.

R198 (2026-10-12) CURRENT / IMPLEMENTED locally: navbar bottom margin0, Home hero directly follows masthead. Source: navigation.css; UI_SYSTEM/TESTING.

R196–R197 (2026-10-12) CURRENT / IMPLEMENTED locally: every preview card shows numeric sample display price, followed by explicit removal of Sample suffix and enquiry-only photographed PDP controls. Register nine envelopes/two candles as draft selections and reuse Add/counter/cart behavior; preserve preview commercial fields and unavailable checkout/order guard. Sources: pricing/card/PDP/Home/catalogue/gift metadata; API_CONTRACTS/BUSINESS_LOGIC/UI_SYSTEM/TESTING.

R195 (2026-10-12) CURRENT / IMPLEMENTED locally: user supplies two brand PNGs for Eternal Paper Co. bookmarks. Use Six Stories in Color and Culture as main/card photo and Vibrant Indian-Inspired Bookmark Collection as second gallery view; update existing bookmark/Home/stationery/gift metadata consumers, compress web copies and retain originals. Existing product identity/commercial fields preserved. Sources: bookmark-photos.ts/catalogue and photo consumers; UI_SYSTEM/PERFORMANCE/TESTING.

R194 (2026-10-12) CURRENT / IMPLEMENTED locally: fix reported footer brand stacking/spacing. Restore full-width heading/navigation/bottom rows on Home and standard footer, stack tablet tagline and retain centered phone layout. Existing design/type/links/reveal retained. Source: home-footer.css;16 responsive checks and visual evidence in UI_SYSTEM/TESTING. Earlier hero3.png404 no longer reproduced with supplied asset now in B2C/public; third slide verified.

R193 (2026-10-12) CURRENT / IMPLEMENTED locally: make cart total larger; hide variable delivery range/copy (user provided it as planning input); match reference's large image/title, aligned pricing and spacing. Show Delivery confirmed before payment; prominently display item subtotal+18% GST as Total before delivery. Desktop photos260×270px, titles32px, right price column, quantity/Remove actions; tablet adapts, phone remains compact. This supersedes R192 delivery-inclusive display and R190 cart-title size above640px; other card titles unchanged. Sources: GiftCart/gift-cart.css/gift-cart-pricing.ts; UI_SYSTEM/DECISIONS/TESTING.

R192 (2026-10-12) CURRENT / IMPLEMENTED locally / checkout CURRENT / PARTIAL: user requests a larger desktop cart like supplied reference and visible/calculated price, GST and delivery. Preserve theme/shared title type, enlarge desktop photos/rows, show unit/quantity amounts and summary at all widths. Explicit follow-up policy:18% GST extra on item prices; delivery₹100–300; candles₹200–500. Calculate quantities/ranges in paise and label estimated totals; unpriced items/packaging stay pending. Exact candle/delivery prices, delivery tax and authoritative quote/reservation remain required. Block placeholder-priced gift orders, retain draft on409 and respect unavailable checkout. Sources: GiftCart/gift-cart.css/gift-cart-pricing.ts/backend gifting routes; traceability: UI_SYSTEM/API_CONTRACTS/ORDER_SYSTEM/PAYMENT_SYSTEM/DECISIONS/TESTING.

R191 (2026-10-12) CURRENT / IMPLEMENTED locally: supplied scented_candle images become three candle cards and corresponding sub-image galleries; cn3 is Laddoo Candles. Add cn1/cn2 previews, retain existing Laddoo ID and commercial fields; update Home/catalogue imagery, compress web copies and preserve originals. Descriptive names/unknown exact price/stock remain truthful. Sources: photographed-candles.ts/catalogue.ts and photo consumers; traceability: UI_SYSTEM/PERFORMANCE/TESTING.

R190 (2026-10-12) CURRENT / IMPLEMENTED locally: slightly round cart photo corners, enlarge cart item titles, fit product photos to their frames, and use the Home Ivory Hamper card's font/size for every product card title. Latest Ivory matching requirement governs exact responsive sizes: Cormorant Garamond500,19px phone/17px tablet/clamp(19px,1.7vw,28px) desktop. Apply shared role across Home/catalogue/cart/builder/related products, keep long names wrapping, use12px cart photo corners and centered cover without image padding/stretching. Preserve existing components/commerce and decorative/hero framing. Sources: storefront-cards.css, layout.tsx, gift-cart.css; traceability: UI_SYSTEM / DECISIONS / TESTING.

R189 (2026-10-12) CURRENT / PARTIAL: user requests individual operations≤20ms and authorizes optimization/compression for better UX. Preserve as requested performance budget, not an achieved universal SLA. Implemented local increment: confirmed cart event reuse, native existing word reveals, static Home server sections, deferred secondary hero photos and43.4% smaller decorative pattern. Two slow-phone LCP samples~3.1→2.3s; busy DOM feedback0.7–1.1ms, but24ms interactions and73–106ms initial tasks remain. Physical-device/hosted/network ceiling UNKNOWN/unmet. Sources: HomeHero/HomeSections/HomeHeroSlideshow, useWordReveal, gift-cart-events, cart/Header consumers, pattern CSS/config; traceability: PERFORMANCE / TESTING / API_CONTRACTS / UI_SYSTEM.

R187 (2026-10-12) CURRENT / IMPLEMENTED locally: provide a purchase option directly on phone Home hamper cards. Reveal existing Add to Cart below each price; after confirmed add show the existing quantity counter and restore Add at zero. Preserve independent Ivory/Burgundy/Lavender IDs and checkout guards. Source: b2c/home.css;21 responsive card checks and browser fixture interactions pass, evidence: UI_SYSTEM / TESTING.

R186 (2026-10-12) CURRENT / IMPLEMENTED locally: replace the old Luxury Shagun Envelopes card on Home too, extending R182's removal scope. Home now shows the existing Lotus photo/name/description with a working Lotus product link. Preserve other cards and established layout. Sources: b2c/page.tsx/HomeSections.tsx; typecheck/lint and five responsive Home checks plus navigation pass, evidence: UI_SYSTEM / TESTING.

R185 (2026-10-12) CURRENT / IMPLEMENTED locally: on phones, move the Frequently asked questions heading slightly right toward the gift, keep the title/artwork composition centered and enlarge the gift20%. Reuse existing artwork, preserve title typography and wider layouts. Source: b2c/home.css; seven responsive browser checks pass, evidence: UI_SYSTEM / TESTING.

R184 (2026-10-12) CURRENT / IMPLEMENTED locally: center all phone footer content, including brand/tagline, navigation, contact/company details and copyright, on Home and other storefront pages through640px. Retain existing columns/design and wider layouts. Source: home-footer.css;14 browser viewport checks pass, evidence: UI_SYSTEM / TESTING.

R183 (2026-10-12) CURRENT / IMPLEMENTED locally: fix Home heading responsiveness on medium/large phones. Center the existing Hampers/Favourites heading groups, keep text within available width, scale titles smoothly and prevent View all/title collisions through tablet widths. Preserve established typography/design, phone carousel and desktop size. Source: b2c/home.css;26 browser heading/viewport checks pass, evidence: UI_SYSTEM / TESTING.

R182 (2026-10-12) CURRENT / IMPLEMENTED locally: remove the old Luxury Shagun Envelopes product card from storefront listings/related gifts, retain the nine new photo designs. Preserve existing saved selections and direct legacy lookup. Sources: catalogue.ts/PDP; evidence: TESTING.

R181 (2026-10-12) CURRENT / IMPLEMENTED locally: shorten Ivory Hamper’s card description to A thoughtful gift in ivory. to avoid the two-line sentence. Source: curated-hampers.ts; copy-only diff reviewed, layout unchanged.

R180 (2026-10-12) CURRENT / IMPLEMENTED locally: add cards for supplied B2C/envelops images and attach matching sub-images to each product gallery. Nine designs/12 photos, existing responsive theme, Envelopes/Stationery/All Gifts listings and working product details. Names are descriptive pending official catalogue data; prices/stock/pack sizes UNKNOWN, existing enquiry flow used. Sources/checks: UI_SYSTEM / PERFORMANCE / TESTING.

R179 (2026-10-12) CURRENT / IMPLEMENTED locally: show prices on Hampers for every occasion cards while retaining theme/layout; larger bold centered price type. Reuse existing temporary display labels for Ivory/Burgundy/Lavender, preserve checkout rules. Sources: HomeSections.tsx/home.css; verification: TESTING.

R178 (2026-10-12) CURRENT / IMPLEMENTED locally: India Hamper Burgundy and Lavender are separate product/cart selections with matching photos and independent quantities across phone/desktop. Preserve existing unspecified legacy cart rows and non-saleable hamper guards. Supersedes earlier shared India identity for new selections. Sources and checks: UI_SYSTEM / API_CONTRACTS / TESTING.

R177 (2026-10-12) CURRENT / IMPLEMENTED locally: replace phone Personalise panel with inline Add to Cart / Buy now purchase UI; Add opens the saved quantity counter, no fixed bottom bar. Extend existing Ivory pattern to mapped gift product pages, preserve desktop note and existing cart review/price guards. Sources: BuyPanel.tsx/product-detail.css/storefront-ui.css; verification: TESTING.

R175 (2026-10-12) CURRENT / IMPLEMENTED locally: shared Shop/collection product cards give images more space and titles primary text emphasis. Use4:5 media, stronger centered titles and compact one-line phone descriptions; preserve purchase behavior and image fitting. Sources: product-cards.css/shop.css; responsive browser evidence: TESTING.

R174 (2026-10-12) CURRENT / IMPLEMENTED: animate The Gourmet Gifts and Good gifts. Great moments. on phones with the footer wordmark reveal, replaying on every reload. Preserve final readability and reduced-motion preferences. Sources: HomeSections.tsx/home.css; three reloads and responsive/reduced-motion browser checks pass, evidence: TESTING.

R173 (2026-10-12) CURRENT / IMPLEMENTED: phone product price/Add to Cart controls scroll normally below the description and no longer stay fixed at the bottom. Remove obsolete fixed-bar clearance, preserve controls/desktop behavior. Source: product-detail.css;15 browser checks pass, evidence: TESTING.

R172 (2026-10-12) CURRENT / IMPLEMENTED: add a small The Gourmet Gifts line above phone hero heading using navbar’s Plus Jakarta Sans font. Centered and phone-only; R171 font increase/shadow removal retained. Sources: HomeSections.tsx/b2c/home.css; verification: TESTING.

R171 (2026-10-12) CURRENT / IMPLEMENTED: enlarge Good gifts. Great moments. phone hero text25–30% and remove its text shadow. Source: b2c/home.css; CSS checks/four browser widths pass, evidence: TESTING.

R170 (2026-10-12) CURRENT / IMPLEMENTED: bold shared product-card prices using700 weight on phone and desktop. Source: product-cards.css; verification: TESTING.

R169 (2026-10-12) CURRENT / IMPLEMENTED: center shared product-card titles, descriptions and prices on phone/desktop, with price above centered purchase controls. Preserve established photos/type/counter behavior. Source: product-cards.css; verification: TESTING.

R168 (2026-10-12) CURRENT / IMPLEMENTED: remove Sample wording from shared hamper price labels and Shop/collection notices on phone and desktop. Preserve amounts/final confirmation/preview gates. Supersedes R142 visible Sample suffix only. Sources: product-pricing.ts, ShopCollectionPage.tsx, shop/page.tsx; verification: TESTING.

R167 (2026-10-12) CURRENT / IMPLEMENTED: remove “Collection preview” from shared product cards on phone and desktop, including the now-empty price wrapper; preserve real/sample/enquiry prices and existing quantity/preview/checkout behavior. Source: ProductCard.tsx; verification: TESTING.

R166 (2026-10-12) CURRENT / IMPLEMENTED locally, unpublished: fix shown Add-to-Cart feedback, redesign phone cart using supplied image-left/detail-right rows and separate summary in the established theme, investigate hosted slowness and pasted signed-out me401. Mobile cart only≤640px; desktop presentation retained. Confirmed quantities, row order, preview gates and truthful unpriced totals preserved. Reduce repeated auth requests, eager wallpaper transfer and footer prefetch. Sources: GiftCart/gift-cart.css, useGiftDraft, Header/Account, Footer/home-footer.css and next.config. Traceability: UI_SYSTEM, AUTH_SYSTEM, PERFORMANCE, DEPLOYMENT, TESTING. Typecheck/lint/build/44 client tests and responsive fixture checks pass. Hosted first API~3.2s observed; no deployment or infrastructure remediation claimed.

R165 (2026-10-12) CURRENT / IMPLEMENTED: product cards replace Add to Cart with saved minus/quantity/plus; zero restores Add, reload preserves quantities, pending/errors/99 limit remain. Compact shared controls and coalesced in-flight reads; no private snapshot cache or API/ownership change. Sources: ProductCard, AddGiftToCartButton, QuantityControl, product-cards.css, gift-cart.ts and tests. Verification combined with R166 in TESTING.

R164 (2026-10-12) CURRENT / IMPLEMENTED: clean excess margins/stacked section padding beneath the removed product finer-details section. Apply existing Ivory64/48/24px single-gap pattern to all B2C products, preserve card/image/purchase sizing and required fixed phone action clearance. Source: product-detail.css;12 responsive browser comparisons pass, detailed evidence in TESTING. No Home/backend changes.

R163 (2026-10-12) CURRENT / IMPLEMENTED: completely remove the supplied “Good to know / The finer details” section from every B2C product page on desktop and phone. Remove markup/content/styles rather than hide at a breakpoint. Supersedes R151’s Ivory-only scope; other product content retains existing behavior. Sources: shared products/[slug]/page.tsx and product-detail.css; verification: TESTING.

R162 (2026-10-12) CURRENT / IMPLEMENTED locally: user requires reliable image loading after optimization. Preserve photos/fitting and verify slow-phone loading, optimizer fallback and failed/delayed gallery/hero transitions; avoid rotating into unloaded images or carrying recovery state between sources. Sources: ProductPhoto, ProductGallery, HomeHeroSlideshow, HomeContentsCarousel and image CSS. Traceability: UI_SYSTEM, PERFORMANCE and TESTING.24 local assets decode; four slow-phone pages, responsive gallery and six deliberate failure checks pass; build/typecheck/lint/41 client tests pass. No commercial/backend changes or deployment.

R161 (2026-10-12) CURRENT / IMPLEMENTED locally: user requests fixing and further optimizing the final B2C audit. Correct R160 security/backend/dependency/catalogue issues, reduce image/font/request/render cost and preserve the established responsive design, existing owner identity/sessions and non-saleable preview/payment gates. Source: B2C dependency manifests, auth/serverless/catalogue/model and storefront components/assets. Traceability: SECURITY, AUTH_SYSTEM, DATABASE, API_CONTRACTS, BUSINESS_LOGIC, PERFORMANCE, DEPLOYMENT and TESTING. Verified build/typecheck/lint,103 database/41 client tests,12 layouts and lab performance; no deployment/real payment. Remaining distributed rate/proxy/production integration evidence tracked in TODO. Supersedes current R160 remediation/test status only.

R157 (2026-10-12) CURRENT / IMPLEMENTED: fix missing browser favicon by registering the existing GG PNG in shared B2C root metadata. Source: root layout; local response verification: TESTING.

R156 (2026-10-12) CURRENT / IMPLEMENTED: apply the “Hampers for every occasion” heading family throughout the B2C storefront and unify styled buttons across phone/tablet/desktop using the current rounded Shop now appearance. Preserve responsive title sizing, button destinations/handlers, accessible focus/disabled states and contextual colour variants. Supersedes prior phone/card font exceptions and disparate button appearance. Sources: root layout/shared storefront-ui.css; evidence: TESTING.

R155 (2026-10-12) CURRENT / IMPLEMENTED: phone navbar must keep only the GG logo after scrolling and must not replace it with the full The Gourmet Gifts name. Apply to the shared phone header; preserve larger-screen branding and navbar controls. Sources: Brand/navigation.css; verification: TESTING.

R154 (2026-10-12) CURRENT / IMPLEMENTED: keep the existing desktop Home navbar options on every B2C page. Clicking Collections must not remove Collections or insert Our Story. Use stable Shop/Hampers/Collections/Corporate options and matching footer public links. Sources: Header, Footer, shared navigation; verification: TESTING.

R153 (2026-10-12) CURRENT / IMPLEMENTED: fix the supplied Home screenshot’s double gap after hamper cards. Consecutive content sections use one padding amount instead of bottom+top padding, preserving card design and other section edges. Source: Home CSS; verification: TESTING.

R152 (2026-10-12) CURRENT / IMPLEMENTED: remove stacked padding between the current Ivory product sections following the finer-details removal. Each visible content transition uses one responsive gap instead of adding neighboring top/bottom padding. Preserve existing photos, cards, controls and other product pages. Source: product CSS; verification: TESTING.

R151 (2026-10-12) CURRENT / IMPLEMENTED: remove the previously hidden Ivory phone “The finer details” panel from desktop too. Omit that entire section for Ivory at all sizes while preserving other product pages and surrounding purchase/related content. Supersedes R141 phone-only scope. Sources: product page/CSS; verification: TESTING.

R150 (2026-10-12) CURRENT / IMPLEMENTED: B2C footer should contain B2C navbar options and categories, with the rest of its design retained. Match visible main navbar options for Home/other-page variants and all four Shop dropdown labels/search destinations. Preserve footer contact details and40% wallpaper. Sources: Footer, Header, ShopNavigation, shared storefront-navigation; verification: TESTING.

R149 (2026-10-12) CURRENT / IMPLEMENTED: fix spacing between Home sections without another card/content redesign. Use consistent responsive vertical section padding and eliminate doubled FAQ padding. Preserve current typography, cards, actions and section contents. Source: Home CSS; verification: TESTING.

R148 (2026-10-12) CURRENT / IMPLEMENTED: replace desktop Home favourites prices with a button opening that specific card’s Shop collection. Use burgundy “Shop now” links to Envelopes, Candles and Stationery respectively. Preserve prior centered bold titles and inset photo frames. Sources: Home page/component/CSS; verification: TESTING.

R147 (2026-10-12) CURRENT / IMPLEMENTED: center desktop favourites card copy, bold the title and remove “From” from the displayed price. Apply consistently across the three collection cards, preserving their amounts, destinations and inset photos. Sources: Home page/CSS; verification: TESTING.

R146 (2026-10-12) CURRENT / IMPLEMENTED: place the desktop favourites image frame inside the card frame, with a visible white inset and rounded corners matching the surrounding card curve. Use8px margins and11px image corners inside the20px card. Retain compact cards and phone/tablet layouts. Source: Home CSS; verification: TESTING.

R145 (2026-10-12) CURRENT / IMPLEMENTED: make the latest desktop favourites cards a little smaller, retaining their reference appearance. Reduce photo height, grid width, internal spacing and typography at1024px+; preserve phone/tablet cards. Source: Home CSS; verification: TESTING.

R144 (2026-10-12) CURRENT / IMPLEMENTED: style desktop “Thoughtful picks just for you” cards like the supplied reference: large flush photographs, rounded white surfaces, left-aligned title/description and bold bottom price. Keep the three existing collection identities/photos/destinations and derive starting prices from the existing local catalogue. Apply through a1024px minimum breakpoint; phone/tablet presentation and actions remain. Sources: HomeCollectionCard and Home page/CSS; verification: TESTING.

R143 (2026-10-12) CURRENT / IMPLEMENTED: use the supplied Pale Baroque Swirl Wallpaper as the B2C footer background at40% opacity on phone and desktop. Apply opacity to the background layer, preserving fully visible text/links. Source: home-footer.css; verification: TESTING.

R142 (2026-10-12) CURRENT / IMPLEMENTED: add temporary sample prices Ivory ₹2,499 and India ₹2,999 consistently to PDP, related cards and Shop. Label Sample and retain final confirmation. Keep authoritative product/variant prices, preview status, checkout eligibility and unrelated product prices unchanged. Sources: product-pricing and consumers; verification: TESTING.

R141 (2026-10-11) CURRENT / IMPLEMENTED: remove “The finer details” section from the current Ivory phone view through640px. Preserve larger-screen and other-product details. Source: product CSS; checks: TESTING.

R140 (2026-10-11) CURRENT / IMPLEMENTED: fit Ivory phone related-card photos edge-to-edge in their existing equal frames using centered cover. Retain card dimensions, content, destinations and main gallery framing. Source: product CSS; verification: TESTING.

R139 (2026-10-11) CURRENT / IMPLEMENTED: make Ivory phone “You may also like” cards the same size with aligned images, title areas, prices and buttons. Retain current content, card width and destinations. Source: product CSS; verification: TESTING.

R138 (2026-10-11) CURRENT / IMPLEMENTED: replace the Ivory phone summary/Personalise panel with a conventional product title, short description, enquiry price, Add to Cart changing into a quantity counter after confirmed add, and Buy now alongside it. Controls sit below the description in normal flow through640px. Buy now ensures a saved draft selection without increasing an existing quantity, then opens cart review; payment remains unavailable for unpriced hampers. Failed saves do not navigate. Larger-screen controls and other products retain their presentation. Supersedes R137 summary/note/floating-bar layout only. Sources: `BuyPanel`, `AddGiftToCartButton`, `gift-cart`, product CSS; verification: TESTING.

R137 (2026-10-11; summary/note/floating controls SUPERSEDED by R138) CURRENT / IMPLEMENTED: redesign `/products/ivory-hamper` for phones through640px with a photo-led layout, centered compact summary, clean gift-note/details panels, rounded related cards and reachable floating burgundy purchase controls. Keep actual product images/thumbnails, Price on enquiry, gift-draft quantity/checkout rules and note enquiry behavior. Larger layouts and other product routes retain existing presentation. Sources: `products/[slug]/page.tsx`, `product-detail.css`; verification: TESTING.

R136 (2026-10-11) CURRENT / IMPLEMENTED: center the phone packaging kicker, “Beautifully packaged. / Thoughtfully curated.” heading, description and Shop gifts action through640px. Preserve copy/link and larger-screen alignment. Source: `b2c/home.css`; verification: TESTING.

R135 (2026-10-11) CURRENT / IMPLEMENTED: put rounded photo thumbnails below the product-page main image on phones, matching the supplied horizontal-strip reference. Use only actual images for that product; retain selection and accessible buttons. Show one phone preview for single-photo products without inventing additional angles. Supersedes R114/R116 phone pagination dots; larger gallery presentation retained. Sources: `ProductGallery`, `product-gallery.css`, `product-detail.css`; verification: TESTING.

R134 (2026-10-11) CURRENT / IMPLEMENTED: redesign the phone “Gifting made easy” section with compact heading, balanced2×2 value tiles and clean spacing. Preserve existing value names and larger-screen presentation. Source: `b2c/home.css`; verification: TESTING.

R133 (2026-10-11) CURRENT / IMPLEMENTED locally: resolve reported `/auth/gift/count`, `/auth/me`, `/auth/gift/catalogue` and `/auth/gift/draft`500s by restoring the existing isolated local Mongo/auth services. No API/auth/customer contract changes or error-to-success masking. Evidence: TESTING/ENVIRONMENT; production health UNKNOWN.

R132 (2026-10-11) CURRENT / IMPLEMENTED: make the screenshot's Home collection cards resemble the latest Shop phone cards, with compact centered text, rounded photos and burgundy actions. Preserve existing collection destinations and larger layout. Sources: `HomeSections`, `b2c/home.css`; verification: TESTING.

R131 (2026-10-11) CURRENT / IMPLEMENTED source: omit search from phone Shop for now, including its header search icon. Extends R128's hidden inline field to the header entry on Shop/collections through640px. Source: `shop/shop.css`; verification: TESTING.

R130 (2026-10-11) CURRENT / IMPLEMENTED: keep phone Shop filtering accessible at the bottom during scrolling. Use a fixed Filter action opening collection choices and available sorting in a bottom sheet; preserve existing category destinations, active query/collection when sorting and preview restrictions. Apply to main Shop and dedicated collections through640px. Supersedes R127/R128's in-flow phone sort placement; photo rail and larger layouts remain. Sources: `ShopMobileFilters`, Shop renderers and `shop.css`; verification: TESTING.

R129 (2026-10-11) CURRENT / IMPLEMENTED source: add colour to phone Shop card buttons using the existing burgundy/ivory palette. Preserve existing action labels, handlers and dimensions. Source: `shop/shop.css`; verification: TESTING.

R128 (2026-10-11) CURRENT / IMPLEMENTED: remove the Shop phone search bar and center product-card text, including descriptions and price/preview labels. Apply through640px to the existing Shop presentation, preserving category navigation, sort form queries and larger-screen search/alignment. Supersedes R127's phone search visibility and card alignment only. Source: `shop/shop.css`; verification: TESTING.

R127 (2026-10-11) CURRENT / IMPLEMENTED: make the phone Shop catalogue resemble the supplied reference with photo category navigation, selected badge, two-column rounded product cards, short descriptions and full-width outlined controls. Use existing categories/products/photos and preserve actual current price/preview/cart/link semantics; the reference does not establish new category assignments or an enquiry-only commerce policy. Apply shared presentation to dedicated Shop collections while preserving their routes. Sources: `shop/page.tsx`, `shop/shop.css`, `ProductCard`, `ShopCategoryLink`, `ShopCollectionPage`; verification: TESTING. Larger storefront layouts and Home are outside this redesign.

R126 (2026-10-11) CURRENT / IMPLEMENTED: add a short single-line paragraph below each phone Home hamper title, matching the supplied card reference. Supersedes the phone image/title-only description visibility requirement; preserve existing larger descriptions and preview/cart rules. Sources: `b2c/page.tsx`, `b2c/home.css`, `HomeSections.tsx`; verification: TESTING.

R125 (2026-10-11) CURRENT / IMPLEMENTED: redesign phone hero text and Shop now after the user rejected their presentation. Use compact two-line sans copy “Good gifts. / Great moments.” and an ivory rounded-rectangle button. Supersedes R122's phone copy/serif exception and action proportions; retain R123 centering, R124's removed overlay,260px frame and larger layouts. Sources: `b2c/home.css`, `HomeSections.tsx`; verification: TESTING.

R124 (2026-10-11) CURRENT / IMPLEMENTED source: remove the red/burgundy-looking shade behind phone hero text. Supersedes R120's phone contrast-gradient overlay; keep R123 alignment and other hero elements. Source: `B2C/src/app/b2c/home.css`; verification: TESTING.

R123 (2026-10-11) CURRENT / IMPLEMENTED source: center the Home hero text and action on phones through640px, retaining R122 content and larger-screen alignment. Source: `B2C/src/app/b2c/home.css`; evidence: TESTING.

R122 (2026-10-11) CURRENT / IMPLEMENTED: improve the phone hero's headline after the user rejected R121's text presentation. Use short two-line copy “Thoughtful gifts. / Made special.” with the bundled serif family, softer second-line colour and refined spacing/button proportions. Hero-only exception to R94 phone title family; retains minimal content, photo frame and larger-screen headline. Sources: `HomeSections.tsx`, `b2c/home.css`; evidence: TESTING.

R121 (2026-10-11) CURRENT / IMPLEMENTED: reduce phone Home hero text to the existing headline and Shop now action. Hide the small intro, supporting paragraph and benefit row through640px, with a shorter260px minimum hero frame. Keep larger-screen content and the existing photo slideshow. Supersedes R120's phone copy/promise visibility and minimum height. Source: `B2C/src/app/b2c/home.css`; evidence: TESTING.

R120 (2026-10-11) CURRENT / IMPLEMENTED: remove the phone Home search bar, fill the entire hero frame background with the existing gift images behind its text, and reduce frame height. At widths up to640px, use a compact cover-photo overlay with content allowed to grow; retain slideshow/dots, copy, promises, Shop now and larger layouts. Supersedes the earlier stacked phone photo/copy presentation. Sources: `B2C/src/app/b2c/home.css`, `page.tsx`, `HomeSections.tsx`; local browser evidence: TESTING.

R119 (2026-10-11) CURRENT / IMPLEMENTED source: hide the small collection-photo strip below the Home hero on phone screens, as requested in the supplied screenshot. Keep desktop presentation and other shopping entry points. Source: `B2C/src/app/b2c/home.css`; verification: TESTING. Supersedes earlier phone category-strip visibility only.

R118 (2026-10-11) CURRENT / IMPLEMENTED source; visual acceptance UNKNOWN: improve the phone Home hero shown in the supplied screenshot. Keep the image-first slide and existing content, but scale the headline to avoid narrow one-word wrapping, compact supporting text and reduce action/promise spacing. Preserve desktop layout, image assets, links and slide behavior. Source: `B2C/src/app/b2c/home.css`.

R117 (2026-10-11) CURRENT / IMPLEMENTED source; hosted rendering UNKNOWN: ensure B2C local image paths are deployment-root assets and recover local photos if Next's optimizer request errors. Home slides use the three tracked optimized files under `B2C/public/images/brand`; `ProductPhoto` falls back to its original local URL on error. Do not alter remote image providers or invent replacement artwork. Sources: `B2C/src/components/home/HomeHeroSlideshow.tsx`, `B2C/src/components/ProductPhoto.tsx`.

R116 (2026-10-11) CURRENT / IMPLEMENTED source; visual acceptance UNKNOWN: refine `/products/[slug]` into a polished, easy-to-scan product detail page using the existing ivory, burgundy and antique-gold theme. Desktop uses a balanced contained gallery and clear purchase card; phones prioritize a square contained photo, compact copy, safe-area-aware fixed gift-cart/enquiry bar and concise detail disclosures. Keep variant selection in normal flow; preserve current catalogue price, preview/enquiry state, cart quantity/checkout and note-enquiry rules. No content, image or commerce policy is invented. Source: `B2C/src/app/products/[slug]/product-detail.css`, `BuyPanel`.

R115 (2026-10-10) CURRENT / IMPLEMENTED phone behavior; desktop-only layout was refined by R116: reduce secondary copy and repeated navigation on phone PDPs while keeping the product name, short description, enquiry/cart action, gift-note entry point and collapsed detailed terms. Source: `B2C/src/app/products/[slug]/product-detail.css`.

R114 (2026-10-10) CURRENT / IMPLEMENTED phone behavior; desktop layout later refined by R116: make `/products/[slug]` phone layout resemble the supplied product-detail reference with a large rounded square photo, compact details and fixed bottom price/Add to Cart area. Preserve existing real catalogue price or enquiry-only status, gallery data, gift-draft quantity control, and checkout eligibility; do not invent additional images/variants. Commerce contracts remain unchanged. Source: `B2C/src/app/products/[slug]/product-detail.css`, `ProductGallery`, `BuyPanel`.

R96 (2026-10-09) CURRENT / IMPLEMENTED source; visual acceptance UNKNOWN: recompose the product page's lower lifestyle, personalization and details areas into a paired image/story row, concise three-step personalization panel and contained finer-details accordion card. Preserve existing copy, enquiry paths, accordion behavior and phone-specific content treatment. Do not add assets or alter commerce. Sources: `B2C/src/app/products/[slug]/page.tsx`, `product-detail.css`.

R94 (2026-10-09) CURRENT / IMPLEMENTED source; visual acceptance UNKNOWN: use the regular Plus Jakarta Sans face for B2C headings/titles on phones through 640px, including Home hamper titles, while retaining Cormorant Garamond for larger viewports. Keep current text size/layout and exclude admin. Source: `B2C/src/app/typography.css`.

R93 (2026-10-09) CURRENT / IMPLEMENTED source; visual acceptance UNKNOWN: give B2C page, section and card titles a consistent polished gifting voice using the already bundled Cormorant Garamond. Preserve existing scales/layout, body/navigation/control fonts, admin styles and commerce behavior. Supersedes R65's Pagio Home titles and the later Manrope-wide title rule. Sources: `B2C/src/app/typography.css`, `B2C/src/app/b2c/design-tokens.css`, `B2C/src/app/home-fonts.css`.

R91–R92 (2026-10-09) CURRENT / IMPLEMENTED source; phone visual acceptance UNKNOWN: design the public B2C pages for phone screens with compact spacing, fewer secondary descriptions and image-forward cards while preserving core product selection/enquiry information, account forms, order details and delivery/checkout controls. Keep the Home hamper photo/title links and swipe behavior. Home philosophy hides its long paragraph and value-card descriptions on phones. Footer section/contact heading typography uses Cormorant Garamond. Desktop/tablet presentation is retained. Sources: `B2C/src/app/b2c/home.css`, `B2C/src/app/shop/shop.css`, `B2C/src/app/products/[slug]/product-detail.css`, `B2C/src/app/globals.css`, `B2C/src/components/home/home-footer.css`.

R90 (2026-10-09) CURRENT / IMPLEMENTED source: on phones, Home hamper cards show only a linked image and title; hide description and Explore action. Both image/title open the existing product detail page. Preserve larger screen card content. Source: `B2C/src/app/b2c/home.css`. Browser verification not run.

R89 (2026-10-09) CURRENT / IMPLEMENTED source: reveal the Shop dropdown on hover and dismiss it on pointer leave. Preserve focus access and touch click-to-toggle behavior. Source: `B2C/src/components/ShopNavigation.tsx`. Browser verification not run.

R88 (2026-10-09) CURRENT / IMPLEMENTED source: replace the Shop navbar dropdown's existing two links with Envelopes, Hampers, Laddoo Candles and Premium Stationery filters on `/shop`. Source: `B2C/src/components/ShopNavigation.tsx`. Browser verification not run.

R87 (2026-10-09) CURRENT / IMPLEMENTED source: prioritize phone hamper photography with taller images and more compact title/description/action panels. Preserve the swipe carousel and larger viewport styles. Source: `B2C/src/app/b2c/home.css`. Browser verification not run.

R86 (2026-10-09) CURRENT / IMPLEMENTED source: hide the Gourmet Story title, introduction and Explore gourmet hampers link on phones only. Keep the story carousel/cards and larger viewport layout. Source: `B2C/src/app/b2c/home.css`. Browser verification not run.

R85 (2026-10-09) CURRENT / IMPLEMENTED source: show Home hamper cards in a horizontal, touch-scrollable snap carousel on phones only. Keep tablet and desktop grid layouts unchanged. Source: `B2C/src/app/b2c/home.css`. Browser verification not run.

R84 (2026-10-09) CURRENT / IMPLEMENTED source: keep Envelopes and Hampers category browsing in the main `/shop` page by changing sidebar entries into search filters. Include the existing Ivory and India enquiry-only previews in unfiltered All gifts alongside the current catalogue and envelope products. Preserve preview pricing/cart restrictions and existing direct collection routes. Sources: `B2C/src/app/shop/page.tsx`, `B2C/src/lib/catalogue.ts`. Verification: source inspection and `git diff --check`; browser verification not run.

R83 (2026-10-09) CURRENT / IMPLEMENTED source: round the top two corners of the Home burgundy corporate CTA (32px desktop, 24px phone), keeping the lower edge square. Source: `B2C/src/app/b2c/home.css`.

R82 (2026-10-09) CURRENT / IMPLEMENTED source: add the approved mandala watermark to both upper corners of the Home hamper section, fading before the card area while leaving its centered heading readable. Reuse the existing image. Source: `B2C/src/app/b2c/home.css`. Browser verification not run.

R81 (2026-10-09) CURRENT / IMPLEMENTED source: visually hide the B2C Home viewport scrollbar while keeping page scrolling and horizontal carousel interactions available. Source: `B2C/src/app/b2c/home.css`. Browser verification not run.

R80 (2026-10-09) CURRENT / IMPLEMENTED source: apply the previously approved mandala image as a subtle page-edge watermark on B2C Home, with the center masked clear and content stacked above it. Reuse `diwali_mandala_bg.jpg`; no new artwork or dependency. Source: `B2C/src/app/b2c/home.css`. Browser verification not run.

# Product Requirements

R112 (2026-10-09) CURRENT / IMPLEMENTED source: remove the Home top spacer so the hero starts immediately below the navbar; retain the in-flow header, initial transparent background, and ivory scroll state. Verification pending; appearance UNKNOWN.

R111 (2026-10-09) SUPERSEDED by R112: restored 40px/24px spacing below the navbar; user clarified the spacer should be removed.

R110 (2026-10-09) SUPERSEDED by R111: the navbar overlay moved the hero too far upward; the current layout keeps the hero below the navbar.

R109 (2026-10-09) CURRENT / IMPLEMENTED source: extend the Home edge watermark into the initial transparent navbar. Set hero copy and promise labels white, with a left-side desktop contrast fade and a dark stacked text panel. Production build, focused ESLint and `git diff --check` pass; appearance UNKNOWN.

R108 (2026-10-09) SUPERSEDED by R110; RESTORED by R111: 40px/24px top padding separates the hero from the transparent navbar.

R107 (2026-10-09) SUPERSEDED by R108: initial in-flow spacing was too small; see the current 40px desktop/24px phone spacing requirement.

R106 (2026-10-09) SUPERSEDED by R111: briefly overlaid the Home navbar on the hero; R111 restores normal flow with space below the header while retaining transparent-on-load and ivory-on-scroll states.

R105 (2026-10-09) CURRENT / IMPLEMENTED source: remove the split Home hero. Use the provided 2129 × 739 images as complete banner-width slideshow frames, overlaying copy on left negative space and retaining fade/dots. Preserve full framing and stack photo before copy on phones. Production build and `git diff --check` pass; browser appearance UNKNOWN.

R104 (2026-10-09) SUPERSEDED by R111: Home navbar starts transparent and reveals an ivory background, divider and shadow after scroll; R111 retains the behavior with the restored spacing.

R103 (2026-10-09) CURRENT / IMPLEMENTED source: crossfade the Home hero through three existing gift photos and place direct-selection dots at the image's bottom center. Preserve full image framing; turn off autoplay when reduced motion is preferred. Typecheck, focused ESLint, production build and `git diff --check` pass; visual acceptance UNKNOWN.

R102 (2026-10-09) CURRENT / IMPLEMENTED source: restore the prior Home navbar's monogram and Shop/Hampers/Collections/Corporate labels. Keep the four requested Shop categories and hover behavior. Place the header in normal flow and remove the split hero's top margin. Typecheck, focused ESLint, production build and `git diff --check` pass; visual acceptance UNKNOWN.

R101 (2026-10-09) CURRENT / IMPLEMENTED source: raise the B2C Home side watermark opacity from 10% to 20%, preserving its edge mask and background stacking. `git diff --check` passes.

R100 (2026-10-09) CURRENT / IMPLEMENTED source: style the B2C hero as an inset rounded split banner, with left-aligned brand copy in its own panel and the existing product photo in a right-side 16:9 frame. Stack image above copy on phones and retain the existing Shop link. Production build, focused ESLint and `git diff --check` pass.

R99 (2026-10-09) CURRENT / IMPLEMENTED source: center all section-level and card titles on B2C Home while leaving the hero headline left aligned. Retain right-side section actions on desktop and place them beneath the heading on phones. Typecheck, production build, focused ESLint and `git diff --check` pass.

R98 (2026-10-09) CURRENT / IMPLEMENTED source: remove the complete Home “Familiar flavours. Fresh discoveries.” regional story section, including images and Explore gourmet hampers action. Keep the hero image restricted to the visual side of the split hero and ensure Home imagery fills its intended card frames without hover scaling. Preserve remaining Home sections, links and commerce behavior. Typecheck, production build, focused ESLint and `git diff --check` pass; visual acceptance UNKNOWN.

R97 (2026-10-09) CURRENT / IMPLEMENTED source: restyle B2C Home around a gifting storefront: split hero, three hamper tiles from existing preview images, favourite catalogue gifts and packaging story. Use actual catalogue prices/IDs and existing product pages/cart behavior; previews remain enquiry-only. Keep existing secondary Home content. On phones, hamper previews are image/title links in a horizontal snap row; favourites use a compact two-column grid. Do not claim unverified delivery coverage. Typecheck, production build, focused ESLint and `git diff --check` pass. Full ESLint reports a pre-existing error in `src/lib/types.ts`; browser appearance remains UNKNOWN. Sources: `B2C/src/app/b2c/page.tsx`, `home.css`, `Header.tsx`, `HomeSections.tsx`.

R79 (2026-10-08) CURRENT / IMPLEMENTED source: center the Home FAQ title and accordion content in a constrained responsive column. Center question/answer copy while keeping the disclosure icon at the row edge; preserve native details/summary interaction. Source: `B2C/src/app/b2c/home.css`, `B2C/src/components/home/HomeFAQ.tsx`. Verification: `git diff --check`; visual acceptance UNKNOWN.

R78 (2026-10-08) CURRENT / IMPLEMENTED source; visual acceptance UNKNOWN: turn the Home regional flavour cards into a responsive horizontal carousel with native swipe/scroll, scroll snapping, keyboard focus and previous/next buttons. Move one card per button activation, omit autoplay and honor reduced motion. Preserve all three images, captions, source copy and the Hampers link. Source: `B2C/src/components/home/HomeStoryCarousel.tsx`, `B2C/src/components/home/HomeSections.tsx`, `B2C/src/app/b2c/home.css`. Verification: TypeScript, scoped ESLint and `git diff --check`; browser preview not available.

R77 (2026-10-08) CURRENT / IMPLEMENTED source: remove the complete Home packaging section, three image/caption items and dedicated responsive styling. Preserve adjacent Home content and other uses of assets. Source: `B2C/src/app/b2c/page.tsx`, `B2C/src/components/home/HomeSections.tsx`, `B2C/src/app/b2c/home.css`. Verification: TypeScript, scoped ESLint and `git diff --check`; no browser preview.

R76 (2026-10-08) CURRENT / IMPLEMENTED source: remove the Shop Gifts, Explore Collections and Corporate Gifting actions from the Home hero and center the monogram alone. Preserve header/Hampers navigation and the later Corporate section. Source: `B2C/src/app/b2c/page.tsx`, `B2C/src/app/b2c/home.css`. Verification: TypeScript, scoped ESLint and `git diff --check`; no browser preview.

R75 (2026-10-08) CURRENT / IMPLEMENTED source; visual acceptance UNKNOWN: replace visible Home hero headline and support copy with the supplied TGG monogram, recolor its transparent artwork white with CSS, keep accessible h1 text and retain existing CTA destinations/reveal motion. Source: `B2C/src/components/HeroTitle.tsx`, `B2C/src/app/b2c/home.css`, `B2C/public/images/brand/hero-monogram.png`. Verification: TypeScript, scoped ESLint and `git diff --check`; no browser preview.

R74 (2026-10-08) CURRENT / IMPLEMENTED source; visual acceptance UNKNOWN: consolidate vertical spacing between hero title, supporting copy and actions, remove the duplicated nested mobile margin above actions, and tighten padding without obscuring content beneath the overlaid header. Preserve copy, routes and motion. Source: `B2C/src/app/b2c/home.css`. Verification: TypeScript, scoped ESLint and `git diff --check`; no browser preview.

R73 (2026-10-08) CURRENT / IMPLEMENTED source; visual acceptance UNKNOWN: improve Home hero copy/action visibility across image slides and avoid clipping at short viewports. Switch the headline to bundled Manrope, strengthen contrast and give both shop actions visible separation. Preserve text, destinations, slideshow and animation. Source: `B2C/src/app/b2c/home.css`, `HeroTitle.tsx`. Verification: TypeScript, scoped ESLint and `git diff --check`; no browser preview.

R72 (2026-10-08) CURRENT / IMPLEMENTED source; visual acceptance UNKNOWN: redesign the Home regional flavour stories as a premium editorial section with a split heading/intro/action, numbered image-led items and compact phone layout. Preserve the three stories, source copy, images/alt text, `/shop/hampers` route, and existing reveal behavior. Source: `B2C/src/components/home/HomeSections.tsx`, `B2C/src/app/b2c/home.css`. Verification: TypeScript, scoped ESLint and `git diff --check`; no browser preview.

R69 (2026-10-08) CURRENT / IMPLEMENTED source: remove the three-link Home collection strip and the entire “Good gifts, in good company” Wedding/Tea & Coffee feature section. Route the hero and Home navbar Collections actions to `/shop` instead of removed anchors. Preserve other Home sections and all dedicated Shop/product/enquiry routes. Source: `B2C/src/app/b2c/page.tsx`, `home.css`, `Header.tsx`, `HomeSections.tsx`, `home-content.ts`. Verification: TypeScript, scoped ESLint and `git diff --check`; no browser preview.

R68 (2026-10-08) CURRENT / IMPLEMENTED source, visual acceptance UNKNOWN: center the Home hero brand line, headline, supporting copy and actions. Set “The Gourmet Gifts” above “A little something. / A lot of thought.” and supporting copy “Gourmet hampers, little indulgences and thoughtful keepsakes. / For the people who matter.” Use Cormorant for the display lines and Jakarta for supporting copy, responsively sized. Match the `frontend_appview` footer's word rise/blur/stagger animation and respect reduced motion. Keep image, destinations, SEO and Home structure unchanged. Source: `HeroTitle.tsx`, `B2C/src/app/b2c/home.css`. Verification: TypeScript and `git diff --check`; no browser preview.

R67 (2026-10-08) SUPERSEDED by R69: the collection navigation that followed Hampers was later removed from Home; collection actions lead to `/shop`.

R66 (2026-10-08) SUPERSEDED IN PART by R67: removed the “The considered edit / For the moments worth marking.” heading block. The user clarified that the feature cards should also be removed; R67 preserves only the collection links after Hampers.

R65 (2026-10-08) SUPERSEDED by R93 for font family: the earlier Home section/card titles used Pagio Regular. Its reduced scale and separation from body/navigation/actions remain historical; R93 unifies title families in Cormorant Garamond. Sources: `B2C/src/app/b2c/design-tokens.css`, `home.css`.

R64 (2026-10-08) SUPERSEDED ON HOME by R67: the Home Candles/Shagun feature cards have been removed. Dedicated Shop/product pages and catalogue/cart behavior remain current.

R63 (2026-10-08) CURRENT / IMPLEMENTED source, visual acceptance UNKNOWN: put the two Home hamper product texts directly over their images, centered and gently revealed on hover/focus; keep visible on touch. Remove the top capsule and separate text panel. Animate the card slightly but never zoom the photo. Replace the oversized Home hero title and copy with a smaller, more refined, conversational version. Keep the brand palette, existing product destinations, enquiry states, Home structure and SEO data. Sources: B2C/src/app/b2c/page.tsx, home.css, HeroTitle, HomeSections. Verification: `git diff --check`; no build/browser preview.

R62 (2026-10-08) CURRENT / IMPLEMENTED section replacement; card interaction superseded by R63. Replace the Home occasion-discovery section after the hero with the existing Ivory/India hamper previews. Preserve full-screen photo hero layering, enquiry-only states, destinations, no duplicate hamper cards in favourites, and Home's Hampers quick links. Dedicated `/shop/hampers`, Shop dropdown, product identity/gallery and unknown price/stock/cart boundaries stay unchanged. Sources: B2C/src/app/b2c/page.tsx, home.css, HomeSections, Header, Footer, curated-hampers.ts.

R58 (2026-10-07) CURRENT / IMPLEMENTED except opening content superseded by R62, priced Home cards by R67 and collection/Wedding/Tea feature blocks by R69; visual acceptance UNKNOWN: implement the latest attached ecommerce brief and the subsequent rejection of its first visual iteration as a minimal, premium, consumer-first Home. Keep the ivory/burgundy/sparse-gold brand and existing photography. Short “Good taste. Great gestures.” hero; R62 replaces eight occasion covers/four favourites with an Ivory/India hamper showcase followed by the two priced gifts. Three merged collection links; brand philosophy/assurance; regional gourmet stories; photographed contents; packaging; Wedding and Tea/Coffee features; personalisation; secondary corporate entry; approved testimonials only when real data exists; FAQ and a Home-only consumer footer. The latest supplied brief supersedes R55's earlier Home order and R54's restored slideshow direction; R52/R53's rejected scroll-stack scenes stay removed.

R58 boundaries: Ivory/India remain enquiry-only; the two existing priced gifts reuse catalogue IDs/amounts and the gift-cart control. India Burgundy/Lavender remains one detail-page gallery. Contents are illustrative photos, personalisation is a validated 300-character email enquiry, and Tea/Coffee has no invented saleable SKU. No demo endorsements, tax/delivery/return promises, fake inventory or new payment/cart contracts. Typed content, reusable server-rendered sections, scoped Home tokens/CSS, deliberate phone composition, responsive Next images, self-hosted Latin Cormorant/Jakarta fonts, restrained optional mask motion, reduced-motion/focus cleanup and crawlable content support the requested scalability, responsiveness and SEO. User confirms the public canonical as `https://b2c-tau-weld.vercel.app/b2c`. Sources: b2c/page.tsx and Home styles, components/home, home-content.ts, home-seo.ts, HeroTitle, Header, Footer, StorefrontChrome and local font assets. Verification/limits: TESTING; production deployment and commercial readiness are not inferred.

R57 (2026-10-07) SUPERSEDED ON HOME by R58; CURRENT / IMPLEMENTED for the dedicated Hampers collection, visual acceptance UNKNOWN: the earlier correction used two wide, balanced cards above600px and one readable card per row on phones, with a fine full-card border, large uncropped photos, compact title/enquiry copy and View hamper arrow. Removing Home's signature-grid coupling corrected its forced four tracks, but that Home presentation/order is now historical. Dedicated Hampers sizing, product links, India thumbnail grouping, enquiry-only previews and non-hamper/PDP styling remain. Sources: ProductCard, ShopCollectionPage, product-cards.css. Historical evidence: TESTING.

R56 (2026-10-07) CURRENT / IMPLEMENTED UI, CURRENT / PARTIAL commercial setup; editorial contents section superseded in part by R95: apply the user's attached premium product-detail brief to `/products/[slug]` only. Large contained gallery, desktop sticky purchase information, restrained Cormorant/Jakarta typography, burgundy/ivory/stone palette, truthful price/preview states, retained cart quantity controls, gift-note enquiry, lifestyle/philosophy/personalisation, accessible accordions, <=3 related gifts and corporate enquiry CTA. R95 removes the numbered “What’s inside” photo/story section and its CTA; the separate collapsed “What’s included” accordion remains. Sarkar Throne inspected for hierarchy only; original brand identity retained. Explicit commercial-policy UNKNOWNs take precedence over sample brief values: no fabricated₹1499, tax inclusion,3–5-day delivery, complimentary-note benefit or new cart mapping. R47's compact hero and confirmed post-add counter remain. Sources: product route/CSS, ProductGallery, ProductPhoto, BuyPanel, GiftNoteRequest, product-editorial.ts. Verification: TESTING. Home/card/navigation direction unchanged.

R55 (2026-10-07) SUPERSEDED ON HOME by R58's later supplied section brief: earlier user requested Hero → Curated Gift Hampers → Shop Our Collections. Product/gallery identities and commerce behavior remain preserved.

R54 (2026-10-07) SUPERSEDED ON HOME by R58's later explicit redesign request: the earlier restoration reversed R52/R53 to the slideshow, collection/occasion/assurance sections, header and motion. R52/R53 remain rejected and removed; supplied hamper products/gallery, Shop navigation and commerce boundaries remain. Historical verification: TESTING.

R52 (2026-10-07) SUPERSEDED / REVERTED after explicit user rejection: user requests a cinematic full-screen burgundy hero with a slow mask image reveal and subtle headline movement/tracking. Scroll shrinks the same visual into a gold-lined editorial image as the background becomes ivory and a brand statement appears beside it. Retain existing imagery/palette; remove Home slideshow/particles/generic fade-ups. Sources: EditorialHero, editorial-scene.ts, editorial-hero.css, Header and StorefrontMotion. Progressive/reduced-motion behavior and verification: TESTING.

R53 (2026-10-07) SUPERSEDED / REVERTED after explicit user rejection: extend R52 with a sticky three-stage product story (Thoughtfully Curated → Beautifully Presented → Made Personal), controlled close-up reveals and minimal image movement, then four stacking collection cards (Gourmet, Corporate, Wedding and Tea/Coffee). Existing imagery and routes; no invented products/prices/categories. Supersedes the old Home collection/occasion rows and assurance layout only; R46's stationery catalogue union, R49's Shop destinations and R51's two hamper products remain. Sources: ProductStory, CollectionStack, editorial-scene.ts, associated CSS and Home. Reduced-motion/short-screen fallback, accessibility and scroll checks: TESTING.

R50 full-card correction (2026-10-07) CURRENT / IMPLEMENTED, visual acceptance UNKNOWN: latest user clarification requires the frame around the whole product card, including photo, title, price and Add to Cart. Reuse the gold asset at article level, keep all content/feedback inside responsive padding, and preserve no zoom/commerce behavior. Supersedes the photo-only frame placement below. Source: product-cards.css; full-card responsive and long-content evidence in TESTING.

R50 reference refinement (2026-10-07) CURRENT / IMPLEMENTED, visual acceptance UNKNOWN: user rejects the plain frame and supplies gold filigree reference. Replace cut-corner mount with a transparent double-rule rectangular frame, ornate acanthus corners and fleur-de-lis motifs around the photograph.12% photo inset and rounded corners keep ornament clear; preserve no zoom and existing fonts/actions/content. Sources: product-cards.css and antique-gold-filigree-frame.webp. Supersedes R50's earlier frame geometry; generation/provenance in UI_SYSTEM, local rendering checks in TESTING.

R50 (2026-10-07) CURRENT / IMPLEMENTED, visual acceptance UNKNOWN: redesign the product frame to suit the burgundy/ivory/gold gifting theme. Shared Home/Shop/Envelopes cards use an ivory stationery mount, small diagonal corners and fine gold outer/inner edges. Preserve contained photographs, no hover zoom, existing fonts/content/actions and responsive grids. Supersedes R48's arch only. Source: product-cards.css; final browser checks at320/390/768/1440px and CSS/diff checks are recorded in TESTING.

R49 (2026-10-07) CURRENT / IMPLEMENTED: Shop navbar has exactly Envelopes and Hampers options with dedicated `/shop/envelopes` and `/shop/hampers` routes. Responsive disclosure, keyboard/focus dismissal, active collection links, route-specific metadata, fixed collection catalogue queries, sort/pagination and truthful empty states reuse the existing UI. Envelope hero uses the Shagun image; Hampers entry links on Home/Shop now use the dedicated route. R69 removes the separate Premium Stationery shortcut from the Home strip; the merged Premium Stationery destination remains available in Shop. This explicitly supersedes R46's navigation restriction for envelope access. Sources: Header, ShopNavigation, ShopCollectionPage, shop-collections.ts, navigation.css and shop route pages. Verification: TESTING. No backend/category/payment change.

R48 (2026-10-05) CURRENT / IMPLEMENTED, visual acceptance UNKNOWN: user again rejects the card; minimal royal is the working direction. Shared Home/Shop cards now use tall native-CSS gold arched photo frames with6px/4px inset, open details and no boxed surface/outer outline/shadow/lift. Centered burgundy23px/17px Cormorant names,15px/13px amounts and44px solid burgundy actions retain original images/fonts and existing cart/preview branches. Photos remain contained and do not zoom; descriptions/capsules/likes remain removed. Supersedes prior nested rounded photo/card treatment and outlined action. Source: product-cards.css. Checks: CSS parsing/diff check and final-source Home/Shop containment/fit at320/390/768/1440px; TESTING records limits. Earlier assets remain inactive.

R47 (2026-10-05) CURRENT / IMPLEMENTED source, runtime verification limited to mocks: simplify gift product detail copy and show +/- beside Add to Cart after confirmed addition. Reuse QuantityControl; reload existing quantity, remove at zero, retain truthful errors and existing cookie/revision/queue semantics. Sources: product detail, BuyPanel, AddGiftToCartButton, gift-cart.ts. API/model: existing GiftDraft GET/PUT with no contract change. Tests:19 helper/API cases plus isolated browser interaction checks documented in TESTING. No live cart/payment readiness claim.

R46 (2026-10-05) CURRENT / IMPLEMENTED: merge envelopes, bookmarks and diary/pen sets under Premium Stationery. Latest user clarification supersedes the initial four-link interpretation: show exactly Hampers, Laddoo Candles and Premium Stationery, remove separate Shagun collection navigation and use the Shagun envelopes photo for merged stationery. Sources: B2C home/shop, catalogue-preview, catalogue and storefront.css. Checks: three catalogue tests, TypeScript, scoped lint and local rendered links/results; latest three-link/photo verification in TESTING. Product identities and database contracts are preserved.

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
# 2026-10-09 — Correct Home hamper card labels

SUPERSEDED by R178 for new India colour selections; historical implementation: the ivory photo card uses the “Ivory Hamper” identity; both burgundy and lavender India photos use “India Hamper.” Keep each photo and its existing product destination aligned with that identity.

## 2026-10-09 — Home collection discovery

CURRENT / IMPLEMENTED: the Home discovery area contains three collection cards: Luxury Shagun Envelopes, Scented Candles, and Eternal Paper Co. (combining bookmarks and diary/stationery discovery). Each opens its full collection listing, not an individual product detail page. Keep the existing hamper showcase and its product destinations unchanged.
