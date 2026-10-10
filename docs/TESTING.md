# Testing

## 2026-10-10 — Mobile product detail layout (R114)

VERIFIED: `npm run typecheck`; scoped ESLint on PDP route/gallery/purchase components; PostCSS parse of `product-detail.css`; `git diff --check`. The Shagun route could not be loaded from localhost because no server is listening on port3000. No screenshot/device interaction test was run. Responsive visual appearance and safe-area behavior remain UNKNOWN.

## 2026-10-07 — Consumer-first premium Home (R58)

VERIFIED: full B2C `tsc --noEmit`; scoped ESLint on Home, all new Home components/data/SEO, Header/Footer/chrome and loading components; PostCSS parsing of all five affected CSS files; `git diff --check`; 23 existing catalogue/performance/gift-cart Node cases pass. These existing tests cover catalogue merges, cart serialization/revisions/errors/quantity retention and retained header/effect lifecycle; they do not establish visual acceptance or live-service health.

VERIFIED isolated Chrome: widths320/360/375/390/430/700/768/1024/1100/1280/1440/1920 and844×390. Four product cards, all content bounds, header/footer/action targets, one H1, matching FAQ text/schema, exact confirmed canonical, two enquiry hampers without offers, existing799/499INR priced products, one responsive hero preload, no photo hover zoom and no horizontal overflow. Native FAQ Enter/exclusivity, mobile Shop's two destinations, India two-thumbnail keyboard switch, reduced-motion cancellation and non-Home footer/card/header isolation pass without uncaught browser exceptions. Initial header target sizes and short landscape clipping/focus failures were corrected and narrowly retested: 44px targets, vertical menu scrolling, link hit-tests and Escape focus return now pass. Browser artifacts are temporary evidence, not checked-in application assets.

VERIFIED isolated production copy: build compiles, TypeScript passes and13 static pages generate, including static `/b2c`. No real environment files/services were copied; service URLs deliberately point to an unavailable local endpoint. At1440/390 with JavaScript disabled, Home remains visible inside main with11 semantic sections, four products, two feature articles, three collection links, six functional native FAQ disclosures, Home footer, canonical/JSON-LD/hero preload and no overflow.24 viewport scan positions loaded every visible image. A CSS-import-only attempt failed to fix hidden content; removing root loading succeeded. The shared original loading UI now lives in route-specific boundaries for other routes. Production JS-enabled desktop/phone section previews also load and were inspected; repeated development image polling timeouts did not reproduce in this production preview.

VERIFIED mocked production controls: Home Add to Cart →1, plus→2, minus→1, mocked503 error keeps1 and remains contained at320px, minus→0 removes the selected item. Existing box/unrelated item stay unchanged. Label association, required/whitespace validation,300-character message bound and mailto action pass without launching a mail client.40 copied long-title/description card fixtures fit390px without overflow. Browser polling/variable-scope errors were test-harness mistakes, corrected before the passing run; no application change was inferred from those errors. No live draft/provider write or outbound message. Final isolated build was repeated after the landscape focus/scroll and phone-motion changes; all src files match the built copy.

Final motion timing/depth: source/scoped lint/build confirm900ms/5% desktop and600ms/3% phone. A final timing-only CDP attempt timed out during navigation in the long-lived test browser; bounded retries/test processes were stopped and the owned browser closed. No browser timing claim is made for those last constant changes. Reduced-motion cancellation and focus/navigation cleanup were verified before that constants-only change; physical frame pacing remains UNKNOWN.

Limits: no deployment, physical-device/assistive-technology run, production Core Web Vitals, search indexing/rich-result validation, live cart write, email delivery or payment/provider test. Visual acceptance and approved endorsements remain UNKNOWN. Existing commercial-policy/stock limitations are retained.


## 2026-10-07 — Hamper card rework verification

VERIFIED: installed B2C TypeScript, scoped ESLint on Home/ProductCard/ShopCollectionPage, PostCSS parsing of product-cards.css and git diff --check pass. Isolated Chrome checks Home and `/shop/hampers` at1934/1440/1024/768/640/390/320px (14 combinations): no horizontal overflow, all card text/actions inside the full-card bounds, contained loaded images, filigree absent on hampers and View hamper actions at least44px high. Final measured grids have exactly two tracks above600px and one below on both routes. Home cards measure546px each at1440/1934px, replacing the squeezed four-track layout. Desktop Home and phone Home/Hampers screenshots inspected.

Initial visual pass exposed a remaining three-track default on the dedicated Hampers route; collection-scoped two/one-column rules fixed it and the final responsive checks passed. A later check verifies keyboard product navigation, unchanged photo transform on hover, preserved Home section order and the envelope's original filigree frame. Existing backend/cart behavior was not altered; no new implementation-mirroring unit tests or live cart/provider writes were added. No production build/deployment or device performance benchmark. User visual acceptance UNKNOWN. Temporary evidence: `/tmp/gour-hamper-rework-check.json`, corresponding scripts/screenshots.

## 2026-10-07 — Product detail editorial verification

VERIFIED: installed B2C TypeScript (`./node_modules/.bin/tsc --noEmit`), scoped ESLint on the product route/BuyPanel/ProductGallery/ProductPhoto/GiftNoteRequest/product-editorial, PostCSS parsing of product-detail.css, and23 existing Node cases across catalogue, storefront-performance and gift-cart pass. Initial root-level npx attempted to fetch `tsc` and failed with restricted-network ENOTFOUND; rerunning the already-installed B2C binary succeeded without a dependency change. Local Ivory product HTTP200 in0.75s was observed on the warm development server, not a production benchmark.

VERIFIED in isolated Chrome: Ivory Hamper, India Hamper and Laddoo Candles at1440/1024/768/390/320px (15 combinations) have no horizontal overflow, contain photographs, >=44px purchase controls, <=3 related gifts, correct preview/price display and mobile normal-flow information. India mouse/keyboard thumbnail selection, actual sticky position at112px, short-height fallback, expanded-note sticky release, Unicode/ampersand email encoding, keyboard accordions/single-open behaviour and reduced-motion suppression pass. Desktop/phone hero, story and personalisation screenshots inspected. A React duplicate-key console warning was found and fixed with distinct purchase/note keys; the final responsive suite reports no uncaught exceptions or console errors. The unauthenticated `/auth/me`401 is an existing shell response, not a product error.

VERIFIED with mocked browser cart responses: add → confirmed counter1 → increment2 → failed503 increment retains2 and shows error → decrement1 → reload restores1 → final decrement removes the item/counter. Counter/button fit checked at320/390/768/1440px. Existing23 regression cases include packaging/unrelated-item preservation, conflicts and ambiguous-write behaviour. No live cart write was made by these interaction checks.

VERIFIED: client navigation from India to Ivory resets gallery/gift-note state; returning Home retains the gold full-card frame and Hampers-before-Collections order. A separate no-JavaScript development navigation found the inherited Next loading shell still visible with streamed product markup hidden; complete no-JS rendering is not established. This was separated from the client-navigation check, not reported as passing.

Limits: source/browser presentation and mocked interactions do not establish live inventory, confirmed prices, payment readiness or email delivery. No production build/deployment/Core Web Vitals measurement or live provider mutation. Legacy variant purchase controls are typechecked/linted but have no independently supplied saleable-variant browser fixture. Visual approval is UNKNOWN. Scripts/screenshots are temporary `/tmp/gour-product-detail-check*`, `/tmp/gour-pdp-*`; canonical evidence is this section.

## 2026-10-07 — Restore the previous homepage

VERIFIED after revert: npm run typecheck; scoped ESLint on Home, Header and StorefrontMotion; node --test tests/catalogue.test.cjs tests/storefront-performance.test.cjs (7/7 currently present tests); git diff --check. Local GET /b2c returns200 with hero-slideshow/hero-title, Shop Our Collections, Gifts for Every Occasion, Ivory Hamper and India Hamper, with no new editorial-stage/product-story-stage/collection-pages markup. Source search finds no rejected-scene imports/controller references; StorefrontMotion matches its prior tracked version. Gallery source retained. No new browser visual/build/deployment/backend/provider run for this exact restoration. Historical15-test editorial evidence below does not describe the current test set; its dedicated test file was removed with the rejected implementation.

## 2026-10-07 — Editorial hero, product story and stacking collections

SUPERSEDED / REVERTED: user explicitly rejected this redesign and requested the previous homepage. The implementation and its dedicated tests/assets have been removed; details below record the attempted design and its historical checks.

VERIFIED: `npm run typecheck`; scoped ESLint on EditorialHero, ProductStory, CollectionStack, editorial-scene, Header, StorefrontMotion and Home. `node --test tests/editorial-scene.test.cjs tests/catalogue.test.cjs tests/storefront-performance.test.cjs`15/15. Five new controller tests cover forward/reverse phases, accessible active chapter/inert hidden hero links, event coalescing and idle behavior, cleanup, dynamic reduced-motion preference and background-tab recovery. Three new CSS files parse with PostCSS; git diff --check passes. Same-image WebP additions total517,506 bytes; original photos retained.

VERIFIED final-source isolated Chrome at1440×1000,1024×768,768×1024,390×844 and320×640: hero media width decreases at start/middle/end; final statement fits viewport; reversing restores introductory actions/header contrast; hero mask can be observed fully closed, partly revealed and fully open. Three story stages switch forward and backward with one accessible active chapter, full-opacity final copy and identical sticky image bounds. Each of four collection links stays visible/clickable above preceding panels; no horizontal overflow, mounted canvas or slideshow. Final desktop/tablet/phone screenshots inspected. Runtime exceptions array is empty.

VERIFIED supplementary checks: changing reduced motion while scrolled removes pinning, exposes all chapter copy, disables entry animation and retains correct header contrast when returning to the top.844×390 uses the short-height fallback. Keyboard Enter on the hero action navigates to Hampers, two existing previews load, Home scene attributes clean up on route change and initialize on return. A fresh JS-disabled document retains all three story chapters and four collection links. Disposable browser context/profile; temporary scripts/screenshots in /tmp, no user cart/account writes.

Initial controller test found reduced-motion header tone skipped when progress remained zero; moving tone updates before the progress cache fixed it. The first comprehensive browser run passed motion/layout/fallback assertions but counted products during Next's streamed loading fallback; final harness waits for cards, then passes. Preview checks also captured all stage/card screenshots at1440/390/320px before final assertions. No production build/deployment, Safari/Firefox/touch-hardware validation, real-device frame-rate/Core Web Vitals benchmark, authenticated-admin or live database/payment/provider run. Existing full-lint debt remains outside this scoped change. User aesthetic acceptance remains UNKNOWN.

## 2026-10-07 — Complete card inside the gold frame

VERIFIED: PostCSS parses product-cards.css; git diff --check passes. Final-source isolated Chrome checks Home, Shop and Envelopes at320/390/768/1440px (36 cards): border-image is attached to article pseudo-element with outer dimensions matching the entire card and48px/30px corner bands; media has no separate frame; photo/title/amount/button rectangles remain inside all four padded card edges; no horizontal overflow. Buttons remain44px and elementFromPoint confirms the frame does not intercept them. Actual pointer hover leaves the image untransformed. Final desktop Home and phone Shop screenshots inspected.

DOM-only simulation of a longer product title and cart error message at320px fits inside the expanded frame; no cart/API write occurred. Initial geometry assertion omitted content-box pseudo-element border thickness; corrected measurement includes both borders, with final checks passing. Temporary browser context/profile disposed; scripts/screenshots remain in /tmp. No asset regeneration, new unit test, TypeScript/build/backend/provider run for this CSS-only placement correction. User visual acceptance remains UNKNOWN.

## 2026-10-07 — Gold filigree frame checks

VERIFIED: PostCSS parses product-cards.css; git diff --check passes. Generated PNG1203×1308 has alpha; project WebP900×979 is171982bytes with transparent centre. Pixel analysis against the rounded photo opening:11% preview inset allowed34 pixels with alpha>60;12% final inset reduces maximum alpha within the opening to2/255 and centre alpha to0. This preserves visible clearance from corner/side ornaments.

VERIFIED final-source isolated Chrome on Home, Shop and Envelopes at320/390/768/1440px (36 card instances): frame asset loads, overlay URL and pointer-events:none match,12% inset/24% photo radius computed, photos loaded and contained, no page/card overflow, titles/actions fit and44px buttons. Actual pointer hover keeps image transform:none with zero transition. Likes/capsules/descriptions remain absent. Final desktop Home and phone Shop screenshots inspected; additional route captures in /tmp. Preview stage used two routes at390/1440px before final source. Context/profile disposable; no real cart/account writes.

No new unit tests, TypeScript/production build/backend/provider tests or device frame-rate benchmark for this CSS/asset-only increment. Local visual rendering does not establish user approval or production browser coverage.

## 2026-10-07 — Stationery-frame verification

VERIFIED: PostCSS parses product-cards.css; git diff --check passes. An isolated style preview on Home/Envelopes at390/1440px was inspected before source changes. Final-source Chrome checks Home, Shop and Envelopes at320/390/768/1440px (36 card instances): outer/inner polygon clipping active, correct responsive corner variables, images inset at least12px desktop /8px phone inside the frame, loaded photos, pointer-transparent paper layer, no card/page overflow, title/action fit and44px buttons. Images retain transform:none and zero transition; actual pointer hover also confirms no zoom. Removed capsules/likes/descriptions remain absent. Final desktop Home and phone Shop screenshots visually inspected. Disposable context/profile; temporary scripts/screenshots in /tmp; no user cart/account writes.

No new unit tests, TypeScript, build/backend/provider or performance benchmark rerun for this CSS-only change. Clip geometry and responsive rendering verified locally, not visual approval or production browser coverage.

## 2026-10-07 — Shop dropdown and collection routes

VERIFIED: `npm run typecheck`; scoped ESLint on Header, ShopNavigation, ShopCollectionPage, shop-collections, root layout, Home, Shop and both new route pages; `node --test tests/catalogue.test.cjs tests/storefront-performance.test.cjs` (7/7); PostCSS parses navigation.css; `git diff --check` passes.

VERIFIED in a disposable Chrome context: Shop has exactly Envelopes/Hampers; desktop Home white trigger and solid-page burgundy trigger; click opens; native Enter activates; Tab visits both links then dismisses; Escape closes and returns focus; outside click closes; selecting a child navigates and closes disclosure/mobile nav; active child gets aria-current. Tested menus and envelopes navigation at320/390/640/768/1024/1440px, with panel and hamburger bounds inside viewport and no horizontal page overflow. Phone Home supports nested Escape (first closes Shop, second main nav). Direct Hampers route and reload work; titles are Envelopes/Hampers | Gourmet. Envelopes shows only Luxury Shagun Envelopes; sort form remains `/shop/envelopes?sort=price_desc`. Hampers has no matching products and shows the empty state. Desktop envelope and final phone envelope/menu screenshots visually inspected.

Initial two script attempts timed out on the keyboard-open assertion because the CDP Enter event omitted its carriage-return text; correcting the native event passed without changing the component. The first passing screenshot exposed a separate existing mobile wordmark overflow: document scrollWidth alone did not catch clipping. Added explicit menu-button bounds assertions and fixed phone header spacing/wordmark wrapping; final checks pass. The isolated profile/context was not the user's browser session; no account or cart writes. Scripts/screenshots remain temporary in /tmp, not new repository tests. No production build/deployment, live persistence/payment/provider, authenticated admin, Space-key automation or multi-page collection pagination run. Backend search matching/count integrity is not established by this local rendered sample; outstanding source findings are in TODO.

## 2026-10-05 — Font source/runtime audit

VERIFIED: source font-family/font/@font-face/token/import scan plus isolated Chrome Home, Shop, diary product detail, Account and Cart at1440/390px. Captured computed family/size/weight/line-height/letter-spacing/casing and font-face status; CDP CSS.getPlatformFontsForNode confirms actual desktop Cormorant/Plus Jakarta rendering and account Arial exception. Footer-column headings use Cormorant despite their Jakarta declaration; global important h2 rule explains the mismatch. Authenticated admin, builder, boxed/filled cart and hidden mobile menu were not runtime inspected; their mentions remain source-only. Fonts/state artefacts stayed in /tmp; no user account/cart mutation, source-style changes or test-suite run. Browser context disposed. Canonical interpretation: UI_SYSTEM.

## 2026-10-05 — Arched card layout checks

VERIFIED: PostCSS parses product-cards.css; git diff --check passes. Isolated browser style preview inspected at390/1440px before applying source. Final-source isolated Chrome Home/Shop at320/390/768/1440px checks32 cards: all four image rectangle edges fit inside the gold media frame; titles/prices center, title/action widths fit and actions are at least44px high. No page/card overflow; loaded images; no description/flourish/capsule/like elements or active card pseudo-elements. Computed image transform:none/transition:0s retained. Preview desktop/phone screenshots inspected; final-source desktop/phone captures produced. Contexts disposed without cart writes. No TypeScript/build/backend/cart/provider tests rerun for this CSS-only change; visual approval not established by layout tests.

## 2026-10-05 — Photo-framed card verification

VERIFIED: PostCSS parses product-cards.css; git diff --check passes. Isolated Chrome Home/Shop at320/390/768/1440px checks32 cards: each image physically fits within all four sides of the gold media frame, titles/prices align left, title/action widths fit and actions are at least44px high. No page/card overflow, images loaded, card pseudo-elements disabled and descriptions/flourish/capsules/likes absent. Image computed transform:none/transition:0s retained. Desktop Home and phone Shop screenshots inspected. Browser context disposed; no cart writes. No new tests or TypeScript/production build/backend/cart/provider rerun for this CSS-only redesign; previous TypeScript/markup checks remain scoped to the preceding revision.

## 2026-10-05 — Compact border-accent card checks

VERIFIED: npm run typecheck; scoped ESLint on src/components/ProductCard.tsx; PostCSS parses product-cards.css; git diff --check passes. Isolated Chrome Home/Shop at320/390/768/1440px checks32 cards: crest position is absolute, width<=56px, photographs start31px/39px inside the outer top edge and clear the crest/inner gold lines. No descriptions/flourish/capsules/likes; images loaded, titles/actions fit and no page/card overflow. Image computed transform:none/transition:0s retained. Desktop Home and phone Shop screenshots inspected. Browser context disposed; no real cart writes. No new tests for this reversible presentation change; production build/backend/cart/provider checks not rerun.

## 2026-10-05 — Gold crest/open-top frame checks

VERIFIED: PostCSS parses product-cards.css; Sharp parses new SVG768×1088 /789bytes and crest WebP720×405 /163028bytes with alpha; two sampled empty/background pixels have alpha0. git diff --check passes. Isolated Chrome Home/Shop at320/390/768/1440px,32 card samples: crest CSS uses the new asset, stays centered/capped at180px in reserved space, and leaves8px clearance above loaded inset photographs. Top border is transparent, open-top overlay is active and pointer-transparent, side containment/action fit/no page or card overflow pass. No zoom computed transforms/transitions and removed capsule/like controls remain. Desktop Home and phone Shop screenshots inspected; decoration is visible without photo overlap. Context disposed; no cart writes.

Initial crest-clearance assertion failed because computed pseudo-element dimensions were rounded slightly beyond the physical rectangle. Rerun with0.1px tolerance passed; no application behavior was changed for the assertion. No TypeScript/production build/cart/backend/provider tests rerun for this asset/CSS-only change.

## 2026-10-05 — Inner-frame photo containment

VERIFIED: PostCSS parses product-cards.css; git diff --check passes. Isolated Chrome Home/Shop at320/390/768/1440px checks32 card samples: loaded photos stay inside the SVG inner border and secondary corner strokes, with symmetric horizontal insets and sufficient top clearance. Image computed transform:none/transition:0s remains; no page/card overflow, actions fit, capsules/likes remain absent. Desktop Home and phone Shop screenshots inspected. Browser context disposed; no cart writes. No production build, TypeScript or backend tests rerun for this CSS-only adjustment. Earlier flush-photo evidence below is historical and superseded for placement.

## 2026-10-05 — Remove card overlays verification

VERIFIED: npm run typecheck; scoped ESLint on src/components/ProductCard.tsx; PostCSS parses product-cards.css; git diff --check passes. Source search finds no remaining capsule/heart/like-feedback/favourite-key references in B2C/src. No new test file for this reversible UI removal.

VERIFIED: isolated Chrome Home/Shop at390/1440px,16 card samples: zero category capsules, wishlist/like controls or photo-stage buttons. Royal SVG frame, loaded full-width photos starting1px inside the border,3px inset, fitting card actions and no page/card layout overflow retained. Desktop homepage screenshot inspected. Cart was not written; context disposed. Existing no-zoom browser evidence remains scoped to the preceding increment.

Initial broader harness also checked old pointer-hover behavior: Home hover passed; Shop pointer failed to establish:hover after viewport/scroll changes, after all removal/layout assertions already passed. This is not evidence of image scaling or a failed removal. Scoped DOM/layout rerun above passed; no application change made for the unrelated pointer assertion. Production build, live backend/payment and cart regressions were not rerun for this markup/dead-style cleanup.

## 2026-10-05 — Minimal royal frame and hover verification

VERIFIED: PostCSS parses product-cards.css; Sharp parses SVG metadata768×1088 /941bytes; git diff --check passes. Isolated Chrome Home/Shop at320/390/768/1440px:32 card samples use royal-minimal-card-frame.svg, retain3px inset/1px outline, full-width photos starting1px from top, loaded images, no page/card layout overflow and fitting/separate controls. Action/heart centre hit targets pass all eight route/width combinations. Desktop/phone screenshots inspected. Actual mouse hover on the first card at1440px in each route matches:hover and keeps photo transform:none/transition:0s after850ms, verifying the earlier zoom-removal request alongside the new frame. Context disposed; no cart writes.

Earlier hover-only check timed out in Runtime.evaluate around the user-interrupted turn; its finally cleanup ran and it establishes no success. Final combined frame/pointer-hover check above passed. No TypeScript/build/backend/provider rerun for this CSS/SVG-only work; previous limits remain scoped below.

## 2026-10-05 — Blue-and-gold frame trial checks

VERIFIED: PostCSS parses product-cards.css; git diff --check passes. WebP metadata768×1085,hasAlpha:true,210,652bytes. Centre pixel alpha0; sampled centre75,143/75,306 pixels alpha0 and163 alpha1/255. Strict all-zero-region assertion initially failed on this negligible matting residue; refined check verifies centre0 and region alpha<=1. No alpha mask/edit was used to hide the result.

VERIFIED: isolated Chrome Home/Shop at320/390/768/1440px,32 card samples: new blue-gold overlay URL, pointer-events:none,3px inset, zero card padding, continuous1px border, loaded photos starting1px from card top and spanning card width minus2px. No page/card layout overflow; action width and badge/heart separation pass. First-card action and heart centre hit targets pass across all eight route/width combinations. Desktop/phone homepage screenshots inspected; old frame URL is no longer the active overlay. Browser context disposed. No real cart write, production build, TypeScript or backend/provider check rerun for this asset/CSS refinement; previous increment evidence remains scoped below.

## 2026-10-05 — Photo top alignment and border correction

VERIFIED: PostCSS parses product-cards.css; git diff --check passes. Isolated Chrome `/b2c` and `/shop` at320/390/768/1440px: all32 card samples have zero outer padding, photo top exactly1px from card top, and photo width equal to card width minus its two1px borders. The overlay is inset3px with retained z-index5/pointer-events:none and readable content z-index6. All photos loaded; page/card layout has no horizontal overflow; action widths and badge/heart separation pass. Centre hit-testing reaches each first card's action and heart at all eight route/width combinations. Inspected390/1440px homepage screenshots; the photo fills the formerly blank top strip and the frame stays inside a continuous peach perimeter. Test context disposed.

No product/component/API/asset code changed in this correction, so cart tests, TypeScript and production build were not rerun. No cart/database writes or live-commerce claim. Existing full lint limitations remain recorded below.

## 2026-10-05 — Cut-out overlay checks

VERIFIED: PostCSS parses product-cards.css; new WebP metadata768×1152,4 channels,hasAlpha:true,137,586bytes. Centre alpha is0. In the sampled centre region239,183/239,259 pixels are fully transparent,76 have alpha1/255. Initial strict all-zero region assertion failed on this negligible matting residue; refined check verifies exact centre0 and region alpha<=1, without modifying alpha to hide the result.

VERIFIED: isolated Chrome `/b2c` and `/shop` at320/390/768/1440px. All cards retain loaded photos, no document/card layout overflow, fitting actions and separate badge/heart bounds. Main card background-image:none; `::after` uses the new overlay with z-index5/pointer-events:none; content z-index6. Centre hit-testing returns the action and heart controls at all eight route/width combinations. Desktop/phone screenshots inspected. No cart write or production build/typecheck rerun for this CSS/asset-only refinement; earlier cart checks below remain scoped to their increment. Temporary browser context disposed after the check.

## 2026-10-05 — Floral frame and compact detail checks

VERIFIED: `npm run typecheck`; scoped ESLint on AddGiftToCartButton, BuyPanel, gift-cart and product detail; `node --test tests/gift-cart.test.cjs tests/api.test.cjs`:19/19 passed. Four added delta cases cover decrement/removal retaining boxes/other items,409 decrement against the latest quantity, ambiguous-write non-replay/no-success, and absent-item decrement without a zero row/write. Existing add/session/sign-in/API cases retained. PostCSS parses globals.css/product-cards.css. Sharp metadata confirms768×1152,38,042byte WebP.

VERIFIED: isolated Chrome renders `/b2c` and `/shop` at320/390/768/1440px. All four cards per route have the floral background, loaded product photographs, no page/card horizontal overflow, fitting buttons and non-overlapping badge/heart bounds. Inspected390/1440px homepage screenshots. Static styling introduces no new canvas/animation. Screenshots and scripts are temporary local review artifacts, not repository fixtures.

VERIFIED using browser-only mocked draft/count responses: detail Add to Cart shows confirmed1 beside button; control alignment/no overflow at320/390/768/1440px; no duplicate open description/success/pricing instruction. Add→1, increment→2, failed503 retention with visible alert, decrement→1, restored1 after reload and removal→0 all passed. Final removal leaves no mocked item row or visible counter. No real cart writes or application runtime exceptions in the final run. Live database/provider persistence and production build are outside these checks.

Harness history: initial synthetic clicks before explicit React hydration and early pointer attempts stalled without a request. Waiting for the button's React handler and then dispatching its DOM click established initial addition; subsequent +/- checks use pointer events. A DOM-presence assertion returned an unserializable element to CDP and timed out despite the error alert being present; explicit boolean corrected it. First reload attempt exceeded the short development-page wait; a later assertion briefly observed the previous document before the reload committed, so its following click found no counter. Waiting for a changed performance.timeOrigin and complete new document before checking restored quantity corrected the harness; final full flow passed. The older stalled script was stopped without changing application source for these harness issues. Full lint's existing types.ts/GiftBuilder findings remain documented above.

## 2026-10-05 — B2C performance checks

VERIFIED: `npm run typecheck`; scoped ESLint on layout/Header/HeroSlideshow/GoldPopper; PostCSS parsing of globals.css. `node --test tests/storefront-performance.test.cjs tests/catalogue.test.cjs`:7/7 passed. Four new VM-hook lifecycle cases cover threshold-only header state and pending-frame cleanup, canvas timer release, no mobile/reduced-motion allocation, and stopping on a motion-preference change. Browser/React integration is not established by this harness. Sharp metadata verifies unchanged dimensions for all three WebP transcodes; combined file size1,409,130→443,720bytes.

VERIFIED: fresh local homepage HTML contains the smooth-scroll marker and three WebP paths, omits blurred hero-backdrop markup; final warm curlHTTP200, response start0.579s/total0.593s. Initial curl timed out during development recompilation. Local trace76.5/98.2s webpack compilations and99.5–183.3s invalidation spans observed. Before-change Chrome390/1440px scroll/navigation samples are recorded in PERFORMANCE. Initial browser harness was interrupted; revised bounded polling completed. Further layer-isolation browser run was declined; post-change frame timing/visual playback and production build were not run.

Full `npm run lint` still fails on existing types.ts explicit-any and warns on GiftBuilder unused selection. GoldPopper's former synchronous-effect-state lint error no longer appears. No auth/cart/database/payment/provider/deployment changes were verified or made in this increment.

## 2026-10-05 — Merged collection image refinement

VERIFIED: `npm run typecheck` and scoped ESLint on home/shop/category metadata passed; PostCSS parsed storefront.css successfully. Fresh `GET /b2c` HTML on local port3000 was parsed to verify exactly Hampers, Laddoo Candles and Premium Stationery, with `/images/items/shagun_envelopes.webp` inside the stationery link. Previous four-link evidence below describes the superseded intermediate state. No new tests added for this link/image refinement; existing search logic is unchanged. Browser visual/geometry inspection and production build were not run.

## 2026-10-05 — B2C collection grouping verification

VERIFIED: `npm run typecheck` passed; scoped ESLint across the five changed source files passed. `node --test tests/catalogue.test.cjs` passed3/3 cases covering envelope/bookmark/diary grouping, singular/plural stationery searches, retained separate shortcuts, complete multi-page API union, deduplication, sorting before pagination, unchanged ordinary pagination and fallback after one source fails. Fetches in these regression cases are mocked; no database writes occur.

VERIFIED: local HTTP-rendered `/b2c` and `/shop?search=stationery` on port3000 contain the four named collection destinations. Shop renders Luxury Shagun Envelopes, Handcrafted Artisanal Bookmarks and Custom Diary Gift Set, excluding candles from stationery. This establishes server-rendered results, not browser visual behavior or provider health. Full `npm run lint` failed on existing GoldPopperSprinkle `set-state-in-effect` and types.ts `no-explicit-any`; GiftBuilder has an existing unused-variable warning. No production build or browser geometry test run for this filter/link change.

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

## 2026-10-10 — Local auth runtime recovery

Started MongoDB8.0 as a loopback-only single-node replica set using the ignored `B2C/backend/data/local-mongo` directory and isolated `gourmet_b2c_schema_dev`; started `npm --prefix B2C/backend run auth:start` from `B2C/backend/.env`. Through the already-running Next proxy on port3000, guest GET draft returned200, PUT returned200 with revision1, and a subsequent GET returned the saved item. The temporary test item was cleared. Signed-out GET `/auth/me` returned401 as expected. No Atlas request was made; live Atlas connectivity remains unverified. This verifies local development only.
