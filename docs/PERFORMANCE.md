## 2026-10-21 — Bounded frontend delivery and feedback (R282)

CURRENT / IMPLEMENTED locally: only the first Shop/collection ProductCard uses existing eager/high photo loading; all subsequent/related photos retain lazy loading. Existing responsive picture gains a positioned full-size wrapper; sources/crops/quality/cache/slideshow preloading retained. Static skeletons add no requests, timers or animations; gallery spinner exists only while requested differs from selected and is static under reduced motion. Current main image stays until readiness; original-image fallback remains bounded. No new dependency, auth cache or request replay.

VERIFIED source/image geometry equality across Home/Shop/Ivory at375/768/1440px and first-only priority at runtime; loading/form/gallery fault checks and isolated production build pass (TESTING). This task did not measure production LCP/INP/CLS or establish a20ms/network budget. A dev LCP warning remains for a shared Lotus main/thumbnail source during the image-failure fixture despite eager main rendering; real-device/deployed measurement and diagnostic remain open. No blanket eager-image change or unsupported speedup claim.

## 2026-10-18 — Audit measurements and limits

CURRENT / IMPLEMENTED: source inventory870 media/font files,439,924,613 total repository bytes/202 duplicate groups,42 page entries and25 schemas. These are storage/source counts, not page-transfer or runtime metrics. No new image/cache/query optimization, indexes or performance benchmark; no LCP/INP/CLS/latency/throughput improvement claim. Existing historical lab results remain dated below. Root FLOW sections11–15 records actual cache/timeout/fanout/retry paths; hosted/device/load/explain-plan measurements remain required before optimization or capacity estimates.

## 2026-10-13 — Mumbai auth placement and single-query profile (R257)

CURRENT / PARTIAL evidence: user reports signed-in GET auth/me200 taking4s; supplied x-vercel-id has bom1 ingress and iad1 execution. User confirms Atlas Mumbai. This establishes a cross-region route, not the exact fraction of4s caused by it. Anonymous read-only samples (no customer cookies) observed proxy me503~554ms, direct backend me503~528ms, later proxy me401~281ms; Home200~81ms/count200~261ms. Intermittent503 cause remains UNKNOWN. Public deployed JS includes R255 confirmed-draft save shortcut, so stale frontend is not established as this cause.

CURRENT / IMPLEMENTED locally: both Vercel configs set regions:[bom1]. Auth bootstrap uses indexed user/session match plus owned active-customer lookup in one aggregate with safe projection and5s maxTimeMS. Server-Timing init measures handler initialization/connect wait (not platform scheduling/module loading/network); profile measures token validation and aggregate await. Metrics survive errors and combine through wrapper. No identity caching, extra retries or authentication shortcut.40 regressions pass; no deployment or claimed hosted speedup.

## 2026-10-13 — Remove redundant pre-add draft read (R255)

CURRENT / IMPLEMENTED: normal mounted-card Add uses one PUT instead of GET→PUT, with no added debounce, optimistic success or global/private settled cache. Multiple queued stale snapshots can require409→GET→PUT; initial cookie handshake remains serialized. Existing Header me runs independently on mount/auth events and is not an Add dependency; long React initiator stack does not establish duplicate requests. CURRENT / PARTIAL measurements: read-only anonymous hosted me401 TTFB0.363139s/total0.363262s;count200 TTFB0.282883s/total0.283455s. No customer cookies used and no hosted draft write. Exact region/cold-start/database contribution UNKNOWN; no claim that this frontend change reduces me latency or has been deployed.

## 2026-10-13 — Fixed full cart and complete phone thumbnails (R234–R235)

CURRENT / IMPLEMENTED: shared useTwoRowScroll measures only first two DOM rows and list padding through ResizeObserver while full-cart containment is active or tray visible; disconnects on update/unmount. Native overflow scrolling has no scroll handler or React updates. Phone gallery visibility changes reuse existing responsive/lazy ProductPhoto assets; no new fetch loop, eager hero source, dependency or timing SLA. Final fixtures confirm tray keeps one public metadata read and zero count GETs during additions. Short-viewport product area is bounded to keep checkout visible. Hosted latency/physical-device performance remain unverified; no deployment.

## 2026-10-13 — Ivory close-up photos and packaging panel opacity (R231–R233)

CURRENT / IMPLEMENTED Farmley supplied PNG1,991,078B/1254×1254 retains original and gains same-size quality82 WebP120,732B (93.9% smaller). Existing responsive/lazy ProductPhoto serves new close-up; Laddoo reuses already-compressed139,272B cn3-supplied.webp. No new eager hero image, dependency, API call or performance SLA. Home alpha change only updates background rgba, not whole-panel opacity or existing blur.

## 2026-10-13 — Non-blocking cart tray and two-item scroll cap (R229–R230)

CURRENT / IMPLEMENTED: CartTray mount has no network request, and successful gift additions provide their confirmed response directly. First gift opening reads public catalogue once per mounted tray; later additions/quantity changes do not trigger tray cart/count refetches. Existing mandatory serialized versioned cart operations remain. Public fallback metadata reuses existing photographed items and same price resolver; no new image assets, dependency or settled private request cache. Small80px responsive thumbnails, row DOM omitted while closed.

Animate only transform240ms; desktop main reflows once when opening/closing, no continuous width animation. No backdrop blur/body scroll lock/polling/per-scroll React updates. Two-row height observer attaches to first two items only while visible and disconnects on updates/close/unmount. List scroll is independently contained; heading/summary stay still. Existing hosted latency/universal20ms and physical-device performance limitations remain; no new timing SLA or deployment.

## 2026-10-12 — Hosted count request optimization (R228)

CURRENT / PARTIAL hosted evidence: user count timing459.92ms total,458.04ms waiting,0.33ms download. Long React initiator stack alone is not evidence of a request loop. Read-only curl against b2c-tau-weld.vercel.app: Home200 TTFB74ms/total81ms; first anonymous count503 TTFB284ms, draft200576ms, next count200273ms. Separate warm anonymous samples: configured backend count320/274ms; storefront rewrite288/260ms. These samples do not isolate cold start, database, routing or region costs; exact503/latency cause UNKNOWN. No private customer cookie or response data inspected.

CURRENT / IMPLEMENTED locally: Header starts/joins existing queued draft on Home/Shop/product routes so streamed controls can join it. Shared response supplies quantities; other pages use count-only endpoint, no settled private cache/timer/debounce delay. Backend count uses indexed owner lookup with items.quantity-only projection and lean(), avoiding other fields/document hydration. Production browser fixture shows one draft and zero count calls on Home/Envelopes/PDP, accurate badge and confirmed mutation update. No claim that every delayed mount avoids an additional fresh draft, nor that remote network response becomes20ms. Hosted verification after deployment remains required.

## 2026-10-12 — New bookmarks and responsive Home polish (R225–R227)

CURRENT / IMPLEMENTED assets: new bookmark originals2,601,835B +2,780,213B retain full originals and gain1024×1536 WebP253,412B +245,182B (90.7% combined reduction). Supplied phone_hero.png340,493B gains788×1400 phone-hero.webp79,154B (76.8% smaller). Reuse existing compressed vibrant-collection.webp for third phone slide, original Ivory WebP for first. Native picture media≤640px selects responsive optimized phone sources; existing deferred alternatives/manual dots/reduced-motion/data-saving behavior retained. Separate packaging imagery may still request the desktop festive source; do not claim no such asset downloads anywhere on mobile.

Latest requested1px static photo blur/32% shade applies only to phone hero. No new whole-page timing benchmark or physical-device20ms guarantee; prior performance follow-ups remain open.

## 2026-10-12 — Inclusive checkout, envelope packs and spacing (R222–R224)

CURRENT / IMPLEMENTED R222: first/third Home source PNGs2493294B/2185273B gain content-hashed1920px WebP171168B/123634B (93.1%/94.3% smaller); originals retained. Slideshow loads one alternative after first readiness+2s, honors reduced-motion/Save-Data/2g/hidden/offscreen, manual dots still request slides. Remove reveal blur; keep opacity/transform. Only new hashed paths get1-year immutable cache. Existing responsive Next image optimization means source savings do not equal whole-page transfer savings.

2026-10-12 synthetic Chrome samples, auth fixtures, cold browser cache, isolated production builds phone390/desktop1440/slowphone4×CPU1.6Mbps100ms: phone LCP292→288ms, transfer507366→505313B; slowphone LCP764→692ms, transfer507367→505311B, load2487.6→2485.6ms; slowphone main-thread long task72→69ms persists. Desktop carousel changes later LCP candidate, so7764→172ms is not a valid claimed speedup.100-frame scripted scroll p95~16.7–16.8ms/max16.8ms before AND after, no>32ms samples. These are one lab sample per mode, not physical-device SLA or proof hosted lag fixed.

Hosted read-only Home200 TTFB~130ms/total137ms in one curl sample; sampled scroll did not reproduce reported lag, no503 in that browser sample. Historical transient503/dependency cause remains UNKNOWN. R223 quote/public variant-stock reads batch; no broad polling/load test guarantee. FUTURE / REQUIRED physical-device/hosted follow-up and unresolved69ms task/universal20ms target.

## 2026-10-12 — Transient-read retry limit (R214)

CURRENT / IMPLEMENTED locally: one503 retry on allowlisted cookie-owned bootstrap/draft GETs after default1s or finite server cooldown≤1s; healthy requests add no delay. Existing pending-read sharing/serialized draft operations retained, no settled private cache and no mutation replay. Local read smoke1–17ms in this sample; hosted catalogue503289ms followed by count200238ms/draft200418ms/me401233ms. These observations do not meet or establish requested universal20ms budget; actual hosted cause UNKNOWN, no deployment. TESTING owns reproducible fixture evidence.

## 2026-10-12 — Lotus main and concurrent bootstrap reads (R206/R210)

CURRENT / IMPLEMENTED locally: supplied ep1_3.png1024×1536,2,413,161B retained; ep1_3.webp1024×1536,129,656B (94.6% smaller) is Lotus card/gallery/main/gift metadata image. Sharp rotate/inside1600/no enlargement/quality82/effort6; prior photos retained as gallery views. API coalesces concurrent me/count/config reads without settled caches, reducing duplicate development mount traffic. Bootstrap read/general rate buckets separated and still bounded. No new timing SLA/full performance benchmark; universal20ms remains unmet/UNKNOWN as documented in R189.

## 2026-10-12 — Latest supplied Laddoo image (R201–R203)

CURRENT / IMPLEMENTED locally: supplied cn3.png1448×1086 (2,266,634B) retained; optimized cn3-supplied.webp1448×1086 (139,272B),93.9% smaller. Sharp rotation/inside1600/no enlargement/quality82/effort6; output decoded. All Laddoo photo consumers use the distinct optimized URL, preserving identity and avoiding stale old-photo cache. Earlier cn3.webp was removed by the user and is not restored. Home background now uses one decorative canvas instead of duplicated header/content canvases; image hover zoom removed per user while card hover remains. No new timing benchmark or universal20ms claim; R189 limits remain.

## 2026-10-12 — Bookmark photo derivatives (R195)

CURRENT / IMPLEMENTED locally: preserve supplied brand PNG originals; Sharp normalized WebP quality82/effort6 with max1600px inside/no enlargement. Six Stories1024×1536 stays1024×1536,2,808,667→254,464B. Vibrant Collection1672×941 becomes1600×900,2,693,609→241,118B. Combined5,502,276→495,582B (91.0% smaller); both decode and browser main/gallery selection verified. Existing ProductPhoto responsive optimizer/lazy behavior retained; distinct filenames avoid old-image cache reuse. This is asset-byte evidence, no new latency/20ms SLA claim. TESTING owns checks.

## 2026-10-12 — Supplied candle derivatives and local cart arithmetic (R191–R192)

CURRENT / IMPLEMENTED / VERIFIED locally: five supplied candle originals total9,644,956B; normalized WebP web copies total353,138B (96.34% smaller). cn1/cn1.1/cn2/cn2.1 fit within1600px portrait bounds, cn3 is1600×1200. Quality82/effort6; originals retained. EXIF normalization plus cn2 upright correction verified visually; cn3 native HEIC decoding used because installed Sharp lacks HEVC decoder. Existing ProductPhoto optimizer/gallery lazy secondary loading reused. Desktop cart sizes hint220px/tablet144px replaces72px hint to match larger frames. Cart calculations are bounded local arithmetic on existing confirmed rows, with a reused currency formatter; no extra quote request/private cache. No new field-performance/LCP20ms claim; R189's unmet universal20ms limit remains.63 client tests/build and responsive/gallery browser checks pass; TESTING owns detailed evidence.

## 2026-10-12 — Measured Home/cart optimization and requested20ms budget (R189)

CURRENT / PARTIAL: user explicitly requests individual operations within20ms and authorizes optimization/compression. Persist this as the requested performance budget; it is not an achieved universal SLA. Target immediate local interaction feedback within20ms and measure complete rendering/network separately. Network latency, cold starts and physical-device paint cannot be guaranteed within20ms. Existing R166 hosted latency remains unresolved/unpublished.

CURRENT / IMPLEMENTED: publish the just-confirmed gift response's item quantities to mounted badge/counters, removing redundant post-save count/draft reads. Keep the fresh pre-write draft, serialized cookie handshake, revision conflict guard and ambiguous-failure behavior. Generic login/logout/legacy/order events still fetch; generations invalidate older reads. No private snapshot cache or HTTP/ownership change. Home static sections render on the server; phone hero and footer preserve the existing700ms rise/blur/80ms stagger through bounded native browser animations, removing Framer Motion from this route's initial delivery. Extra hero images mount1200ms after a loaded first slide while visible, with immediate dot requests, reduced-motion suppression and failed-first recovery. Desktop image sizes now describe the actual full banner rather than54vw; this restores appropriate desktop resolution, not a claim of reduced desktop image bytes.

Compression: retained original JPEG and previous WebP; new same576×1024 diwali-mandala-light.webp is54,680bytes versus96,562 (43.4% smaller), generated from the original JPEG using Sharp WebP quality45/effort6. Pattern size, opacity/mask and artwork retained in Home/header/legacy storefront CSS. Native browser animations replace the animation implementation, not the approved reveal appearance. Existing public24h/stale cache headers follow the new derivative; private API no-store remains unchanged.

VERIFIED isolated production Chrome lab:390×844,DPR1, cold browser cache,4×CPU,1.6Mbps/100ms, optimized image server cache warmed, anonymous auth/cart browser fixtures. Two final before/after slow samples:

| Metric | Before | After |
| --- | --- | --- |
| LCP | 3.096 /3.172s | 2.348 /2.268s |
| loadEventEnd | 3.112 /3.141s | 2.528 /2.568s |
| transferred through12s | 569,211 /569,212bytes | 505,357 /505,362bytes |
| transferred JavaScript | 189,196bytes | 164,556bytes (~13% less) |
| longest initial task | 80 /76ms | 106 /73ms |

Normal local sample: LCP244→240ms, load226→231ms, no tasks≥50ms. Home transfer falls~11.2%; samples do not prove improved initial-task duration. Cart browser fixture first Add:4→2requests (GET+PUT only); Add/retry click-to-busy DOM feedback0.7–1.1ms after versus0.5–0.9ms before. This feedback metric excludes paint/server completion. Event Timing includes24ms interactions after (32ms before), so the universal20ms ceiling is NOT achieved. No field INP/physical-device/deployed guarantee.

Separate real local read-only API sampling:5 requests/endpoint direct/proxied, anonymous and no cookie retained. Warm direct/proxy count/draft/me generally~0.3–2.5ms; first direct count24.2ms and first proxy count17.8ms. Signed-out me401 is expected. These samples exclude authenticated/remote/loaded-service behavior. Detailed artifacts and checks: TESTING.

## 2026-10-12 — Supplied envelope designs and galleries (R180)

CURRENT / IMPLEMENTED:12 supplied JPEG photographs preserved and converted to WebP quality82 at original1200×1600, combined3,703,890→2,895,904bytes (~22% smaller). ProductPhoto retains responsive optimizer, lazy card photos, eager PDP image and bounded fallback. Product galleries retain load-aware switching and full portrait contain fitting. For All Gifts/envelope photo queries, reuse the existing bounded multi-page fetch (limit100, max20 pages, batch3, shared2.5s deadline) before merging/paginating; Stationery keeps its existing three-source shared deadline. This bounds completeness work while retaining API/fallback cards; no measured load-time improvement or hosted field-performance claim. Local assets decode and browser loading/gallery checks pass; evidence: TESTING.

## 2026-10-12 — Bounded phone hero word reveal (R174)

CURRENT / IMPLEMENTED: use the already installed/footer-used Framer Motion primitives for one finite seven-word hero entrance per mount/reload. Each word0.7s with0.08s stagger, no interval/persistent storage; desktop and reduced-motion skip. Cleanup completes controls, preserving readable final styles. Browser repeated reload/reduced-motion/layout evidence is in TESTING; no new load-time/bundle/field-performance claim. Existing image/hero lifecycle optimization retained.

## 2026-10-12 — Hosted snapshot and cart/footer delivery follow-up (R165/R166)

CURRENT / IMPLEMENTED locally, unpublished: card draft readers share only their in-flight promise (cookie/write queue retained, no private snapshot cache). Header cart events refresh only count; successful Account login/logout emit a separate auth event. Native lazy responsive ProductPhoto replaces eager footer CSS wallpaper, retaining original40% artwork. New footer-wallpaper-light.webp1200×675, quality72,56,136bytes versus original1672×941/145,932bytes (~62% smaller before responsive optimization); original retained. Footer category links disable speculative route prefetch. Cart row photos use optimized responsive sources with existing bounded recovery. No infrastructure/provider/DB/region settings changed.

VERIFIED hosted b2c-tau-weld.vercel.app public anonymous snapshot390px,4×CPU,1.6Mbps/100ms, cold browser cache (single lab run): Home transfer713,891bytes/LCP3.688s/load4.428s; Shop659,459/LCP2.508s/load4.032s; empty Cart469,781/LCP2.772s/load2.745s. Initial me/draft/count responses~3.2s; subsequent warm-looking requests~0.25–0.65s. Infrastructure cause/cold-start attribution remains UNKNOWN. Eager footer wallpaper146,232bytes including transfer overhead was the largest Home/Cart resource. No observed500 or JS exception; signed-out401 expected. This establishes a deployed snapshot, not traffic/physical-device field metrics or exhaustive backend health.

VERIFIED final local production frontend, same throttle profile, but auth GETs mocked to isolate delivery: Home561,950bytes/LCP3.180s/load3.182s; Shop528,818/LCP2.416s/load2.946s; empty Cart343,388/LCP1.812s/load1.863s. Home footer photo not requested before scroll, loads afterwards; no eager original wallpaper, visible loaded-photo failures, overflow or JS exceptions. Do not present these timings as before/after production improvement: host, API conditions and current source differ. Exact resource-size savings and deferred Home request are verified; redeployment and physical-device validation remain required. TESTING owns logs/screenshots.

## 2026-10-12 — Image loading reliability (R162)

CURRENT / IMPLEMENTED: shared per-source recovery prevents one optimizer error disabling optimization on subsequent gallery photos. Local optimizer failure retries original once; missing original yields accessible fixed-frame placeholder, avoiding a broken-image icon or retry loop. Main gallery keeps current decoded photo while requesting the next; responsive thumbnail sizes replace raw full-resolution downloads. Home hero rotates/selects only ready photos and can recover from a failed initial slide. Existing eager/high-priority first hero and product images, lazy offscreen cards, image fitting and reduced-motion/offscreen animation controls retained.

VERIFIED isolated production: all24 referenced local image assets exist and decode; cold390px4×CPU/1.6Mbps100ms Home/Shop/Ivory/India scrolled image checks report no broken loaded images, placeholders or overflow.390/1440 gallery switching and optimized thumbnail geometry pass. Six deliberate optimizer/original/delay/slide failures recover as intended. These are reliability checks; no new LCP/transfer comparison is claimed over R161. Offscreen horizontal lazy images are intentionally deferred until relevant. Physical devices, third-party image availability and deployed optimizer/CDN remain UNKNOWN. See TESTING.

## 2026-10-12 — Current optimized B2C delivery (R161)

CURRENT / IMPLEMENTED: lossily compressed derivatives preserve original artwork and existing geometry: footer wallpaper2,462,291→145,932bytes (40% opacity retained), FAQ illustration→49,552bytes (lazy600×400), GG logo→5,722bytes, mandala→96,562bytes. Originals retained. Product cards reuse the existing responsive Next ProductPhoto component; image fitting/radii unchanged. Removed unused Manrope preload/font face. A viewport-height streaming placeholder prevents the footer entering the initial loading viewport; loaded section spacing unchanged. Hero interval stops offscreen, hidden or under reduced motion. Derivatives have one-day public cache headers.

Public catalogue work shares a2.5s deadline, caps100items/page and20pages with batches of3; a15s per-process public-data cooldown suppresses repeated network/5xx/429 outage calls. Invalid4xx requests cannot trip it; no identity data cached. Public backend queries use projection, bounded inputs and3s maxTimeMS. These bounds improve failure latency without claiming cross-instance outage coordination.

| Production lab, cold390px,4× CPU,1.6Mbps/100ms | Home R160 | Home R161 | Shop R161 |
| --- | --- | --- | --- |
| Transferred bytes | 4,893,000 approximately | 707,661 | 650,728 |
| LCP | 9.828s | 3.344s | 2.204s |
| Full load | 25.549s | 4.073s | 3.794s |
| CLS | See historical audit | 0.00721 | 0.00340 |

Home measured bytes decrease~86%, full load~84%, LCP~66%. Single local samples are not field guarantees; Home LCP still exceeds2.5s under that simulated constraint. Shop baseline slow-network navigation did not finish measurement; no numerical load-time comparison is claimed. Unthrottled cold-cache Home/Shop/Ivory at390/1440px transfer~0.65–0.91MB; CLS0–0.00177, no JS exceptions/broken images/overflow. Scripted scroll median/p95~17ms, no intervals>50ms. Twelve320/390/768/1440px layouts, filter/Escape and hero lifecycle checks pass; phone Home/Shop screenshots inspected. Physical-device, deployed CDN, authenticated checkout and production traffic measurements remain UNKNOWN. TESTING owns commands/artifacts. Historical results below are retained.

## 2026-10-12 — Measured B2C delivery audit (R160)

CURRENT / PARTIAL: isolated production build passed (Next16.2.10, webpack; compile6.9s); source/public/node_modules copied or symlinked to a temporary build without .env/customer data. This avoids changing the running development build. Production rewrite defaults were used; deployed environment/CDN and real-device field metrics remain UNKNOWN.

Chrome cold-cache measurements on localhost at390px/4x CPU and1440px/normal CPU covered Home, Shop and Ivory. Resource transfer totals after settling were approximately4.75–6.49MB. The footer's raw `Pale Baroque Swirl Wallpaper.png` downloaded2,462,591bytes including response overhead on every checked page, despite0.4 visual opacity. Home's eager FAQ `icon2.png` added1,315,538bytes; shared LOGOs.svg about295,798bytes and mandala JPEG347,191bytes. Original-file size alone was not treated as network evidence. Compress/resize these decorations, use suitable delivery formats and defer offscreen decorations without changing the approved design.

On simulated1.6Mbps/100ms latency/4x CPU, Home LCP9.83s and load25.55s were observed, transferring4.90MB. This is one local lab sample, not a field CWV or live-site speed guarantee. Throttled Shop had LCP4.39s but did not finish loading within the measurement window (loadEventEnd0); its final transfer/load figures are therefore unavailable. No permanent scroll stall was observed:120-frame scripted scroll samples had median/p9517ms and zero intervals above50ms. Headless cadence does not establish physical-device smoothness.

One initial cold phone Shop sample had CLS0.469; three explicit repeat loads were0 and the throttled sample0.0034. Treat as intermittent timing evidence needing investigation, not a consistently reproduced layout defect. Home unthrottled phone LCP1.35s and normal desktop pages0.08–0.22s were local, cache/context-dependent samples. No broken loaded images, horizontal overflow or browser exceptions in the six settled page checks; anonymous me401 and canceled prefetch requests are expected, not500s.

Source risks: unused Manrope preload in layout (only its font declaration remains); stationery search can await up to100 pages per each of3 parallel search streams, with8s per-fetch timeout and no total deadline; serverless cold start installs schema/indexes. These are source findings, not measured high-load regressions. Local dev Cart response took8.14s once, without proving production Cart latency. See TESTING for artifacts and limits. Historical R58 static/no-slideshow description does not describe today's HomeHeroSlideshow implementation.

# Performance

## 2026-10-11 — B2C hero image assets (R117)

CURRENT / IMPLEMENTED: the Home slideshow now references the existing 2129×739 / 2126×740 WebP derivatives (home-hero-1/2/3) inside the B2C app's public directory. This replaces a root-level PNG reference that would not be included in a B2C-rooted deployment and avoids shipping the larger original PNG versions. Shared ProductPhoto retries a public asset URL if Next image optimization fails. Typecheck, focused lint and production build pass; hosted delivery and real-device transfer/LCP remain UNKNOWN.

## 2026-10-07 — Home image/font/motion delivery (R58)

CURRENT / IMPLEMENTED: Home is a static server-rendered composition with typed catalogue/editorial data. Its one open-hamper hero has reserved4:3 geometry and responsive Next Image preload; below-fold local photos remain lazy/responsive. No slideshow, sprinkle canvas, ornate frame bitmap, third-party motion library or continuous Home scroll loop is mounted. Optional IntersectionObserver-triggered mask decoration uses the Web Animations API once per element (900ms/5% desktop,600ms/3% phone), cancels on focus/reduced-motion changes and cleans up on navigation. Normal native scrolling remains.

Existing Cormorant Garamond and Plus Jakarta Sans are self-hosted Latin variable WOFF2 subsets (65,048bytes combined), with swap, one serif preload and official OFL/provenance. Removed external Google font stylesheet requests. Existing variable weight ranges remain available outside Home; rupee glyph uses the fallback stack. Home-specific grids/media ratios/44px touch controls prevent squeezed desktop layouts on phones. The old global loading boundary was moved to non-Home routes so normal server HTML remains visible without JavaScript.

Verified scope: TESTING, including production build/no-JS image scans and JavaScript-enabled production previews. Local development image polling timeouts were observed but did not reproduce in the clean production previews. Production LCP/CLS/INP, real-device frame pacing and network-budget results remain UNKNOWN. Earlier restoration/slideshow statements below are SUPERSEDED ON HOME by R58; retained components still exist for historical/reuse context.


## 2026-10-07 — Product detail image delivery

CURRENT / IMPLEMENTED: route-scoped editorial PDP uses Next Image for responsive local photographs; first image is eager/high priority, below-fold images are lazy with sizes and reserved aspect ratios. Existing optimized WebP assets reused; no new bitmap/dependency/scroll loop. Remote catalogue image URLs retain direct unoptimized delivery to preserve existing provider handling. Related products resolve under Suspense so their catalogue fetches do not block the primary product. Desktop close-ups are CSS-hidden on mobile; they remain lazy in the DOM. Warm local Ivory routeHTTP200 in0.75s is a single development observation, not production LCP/CLS evidence. Real-device/production performance remains UNKNOWN.

## 2026-10-07 — Restore the previous homepage

CURRENT / IMPLEMENTED: previous optimized HeroSlideshow and bounded GoldPopperSprinkle are mounted again; prior StorefrontMotion behavior restored. Rejected editorial controllers and their derivative assets are removed. Existing WebP optimizations, header threshold updates and canvas cleanup remain. No new frame-rate or production performance claim.

## 2026-10-07 — Bounded editorial scenes

SUPERSEDED / REVERTED: user explicitly rejected this redesign and requested the previous homepage. The implementation and its dedicated tests/assets have been removed; details below record the attempted design and its historical checks.

HISTORICAL / REVERTED: the new Home unmounts slideshow/canvas effects and skips StorefrontMotion's generic reveal observer. Hero/story controllers coalesce passive scroll events into one requested frame, cache clamped progress and stop scheduling once that frame completes; no React state updates per scroll tick. ResizeObserver caches scene geometry, pending frames stop in hidden tabs and all listeners/observers/styles clean up on navigation. Collection stacking uses CSS sticky without a JS scroll loop. Hero bounds animate inside a contained image layer; this does incur local layout/paint and is not claimed to be compositor-only.

Same-image WebP additions: Shagun detail304,808 bytes, Tea ritual144,816 bytes, Desk gifts67,882 bytes, total517,506 bytes. Existing optimized hero/hamper photographs are reused; non-hero photos load lazily. No new runtime dependency or font. Lifecycle/reversal/fallback tests and responsive browser checks are recorded in TESTING; real-device frame pacing and production Core Web Vitals remain UNKNOWN. Earlier slideshow/sprinkle optimization evidence below is historical for those now-unmounted Home components.

## 2026-10-05 — B2C lag investigation and bounded rendering work

CURRENT / IMPLEMENTED: root html declares `data-scroll-behavior="smooth"` for Next's route-scroll handling. Header submits React state updates only when crossing40px, with pending animation-frame cleanup. Hero no longer renders two blurred full-size backdrops hidden beneath the current cover photos. Three same-dimension WebP transcodes replace JPEG slide sources: total1,409,130→443,720bytes (68.5% smaller). Photos, framing, ordering and crossfade remain. GoldPopper uses one imperative canvas lifecycle, releases its backing store at2600ms, and stops for hidden tabs/reduced motion/mobile resizing; no effect-triggered React state update remains.

VERIFIED before-change local Chrome sample:390px scrolling8 frames/6 intervals>25ms/worst825ms;1440px32 frames/29 intervals>25ms/worst408.7ms during a1.8s scripted scroll. Shop navigation911/823ms. These development-machine samples reproduce choppiness but do not establish isolated GPU attribution or production performance. An initial browser harness was interrupted while awaiting a promise across navigation; bounded host-side navigation polling then completed. Further visual-layer isolation was declined by the user, so no post-change frame-rate claim is made.

VERIFIED after-change: TypeScript/scoped ESLint, four lifecycle/scroll regressions plus three catalogue regressions, CSS parsing, same image dimensions and local HTTP-rendered sources/scroll marker/no-backdrops. Final warm homepageHTTP200 with response start0.579s/total0.593s. One earlier HTTP request timed out during recompilation; `.next/dev/trace` showed webpack compilations76.5/98.2s and invalidations99.5–183.3s. Development rebuild cost remains separate from runtime rendering; no bundler or production deployment changed. Existing full-lint types.ts error and GiftBuilder warning remain; GoldPopper lint defect is resolved.

The supplied unused Shop-CSS preload warning alone does not establish a rendering error; framework-managed loading was preserved. Signed-out `/auth/me`401 is expected authentication behavior. Browser warning disappearance and improved frame timing remain unverified after the change.

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Existing mechanisms

Main next/image AVIF/WebP, qualities75/80/90,30-day minimum cache TTL, remote Cloudinary/Unsplash patterns; priority hero images/sizes. Raw img tags bypass optimizer. Google font preconnect/display swap; local fonts loaded too. TanStack queries stale5min/gc24h with persistence. Product search uses Atlas product_search/product_autocomplete with text/regex fallback; indexed product/category/review fields.

## Known limits

Disk asset sizes and duplicates are in audit section9; no transfer budget/Core Web Vitals measured. Serverless vault synchronous filesystem work/concurrent writes and Redis KEYS in admin stats can become bottlenecks. Atlas search total count uses matchStage without the search condition. Motion uses both GSAP and Framer Motion; reduced-motion checks are partial and canvas effects continue independently. Main build suppresses type errors.

Measure bundle/render/query behavior before optimizing. Preserve correct price/inventory/customer behavior over cache convenience. Runtime caching, DB index existence, pagination caps and memory footprint remain unverified.

## Rendering, query and payload boundaries

CURRENT / IMPLEMENTED: root layout and metadata pages are server-side source modules; main home, ResponsiveShell, curation, forms and stateful catalogue views use client components. Category/occasion server pages generate metadata and delegate UI to client views; marking use client does not mean there is no Next initial rendering. Internal geo/telemetry routes use force-dynamic; image generation/cache config is separate.

Client query cache stale5min/gc24h with localStorage persistence; Zustand local cart and IndexedDB replay exist independently. Redis stores cart/idempotency/limiter state, not automatically a catalogue cache. BullMQ offloads delayed release, not order pricing/tax/stock transaction work. No measured CDN hit rate, payload byte cap, concurrency capacity or rendering benchmark.

Product/order/review/admin-order reads use default page1/limit20 but no uniform controller max limit. Gift-boxing products returns unpaginated list; category tree and admin data include complete matching arrays (vault itself caps inquiries/sessions); export builds workbook. Redis KEYS scans carts; vault reads/writes/encrypts full file synchronously; these are potential bottlenecks, not measured regressions. No explicit body-size policy override in app.js beyond framework defaults.

Source query/index details in DATABASE/DATA_MODELS; Atlas search count mismatch in existing notes. Preserve correctness before optimizing; no performance change made.

## B2C database increment — 2026-09-28

Customer360 uses limit<=100 timestamp/ObjectId seek pagination; tested1000 orders and explain using customer_order_history index. Owner report requires explicit currency/date interval and bounded recent lists; aggregations may still scan the selected period and need production load testing. Index count79 excludes20 implicit _id indexes.

## 2026-10-01 — Owner portal query and command budgets

CURRENT / IMPLEMENTED: `B2C/backend/admin` uses the isolated B2C models. The older unbounded controller/vault/Redis observations above remain legacy findings; the new portal does not call those endpoints or Redis KEYS.

| Surface | Implemented boundary |
| --- | --- |
| Resource tables | Default20, maximum50 rows, fetch limit+1 for continuation; `(createdAt,_id)` seek cursor, newest/oldest sorting, selective projections and lean reads. No complete collection or exact total count is loaded for table pagination. |
| Staff directory | Separate owner-only bounded cursor endpoint, maximum100 users; exact DTO fields exclude authentication/session data. |
| Detail / Customer360 | Parent fetched once; only permitted related domains are fetched in parallel, each initially5 rows with its own continuation. Internal related reads reuse the verified parent instead of repeating parent-existence queries. Direct related requests still validate parent and permissions. |
| Search / filters | Unknown fields reject; user search is escaped prefix regex, capped80 characters. IDs, statuses, UTC dates, currencies, sort and amount bounds are validated. Child address/coupon/movement lists expose only supported pagination controls. |
| Reports | Explicit `[from,to)` UTC interval of at most93days and one currency; validated timezone. Aggregates return counts/sums and at most10 top products, with source/formula/range information. Pending counts are clearly current snapshots. |
| Attention Center | At most5 records per implemented exception type, filtered by domain permission. Current authoritative states resolve/deduplicate entries without an ever-growing embedded alerts array. |
| Database reads | Administrative resource queries/counts/aggregations use `maxTimeMS:5000`; this is per query, not an end-to-end request latency guarantee. |
| Request parsing | Admin JSON body cap128KiB; existing public auth JSON cap8KiB. No unrestricted raw document update or request-driven aggregation pipeline. |
| Abuse limits | Persisted Mongo minute buckets: entry240/IP before authentication; read120 and write30 per actor/IP; sensitive settings/staff10; password login10/IP. Buckets expire through a TTL index; deletion timing is asynchronous and not used as authorization. |

CURRENT / IMPLEMENTED indexes include unique actor+key command receipts, rate-bucket key/TTL, settings singleton and administrative createdAt/_id cursor indexes for User, Customer, Category, ProductVariant, Inventory, Coupon, Shipment, Invoice, Notification and AuditLog; Order additionally has status/payment/fulfillment cursor indexes. Existing customer/order/payment/refund relationship indexes remain. Exact generated inventory is in DATABASE/DATA_MODELS. Declaration/install in disposable test databases does not prove indexes are installed in the configured live database.

Correctness trade-off: each privileged command writes the authenticated User's command version inside its MongoDB transaction, serializing that actor's concurrent commands with access/session changes. Commands also persist a receipt and audit; these writes are intentional integrity costs. No provider I/O occurs inside retried transactions. Inventory/manual adjustment shares the same balance/ledger transaction as reservations; caching is not used to authorize balances or permissions.

CURRENT / PARTIAL: bounded result size and5s query budgets do not prove high-volume latency. Case-insensitive prefix searches and mixed filters can still scan; no production query-plan/load/latency benchmark or broad aggregation cache was established in this increment. Persisted rate buckets can create contention for traffic sharing a reverse-proxy IP; deployment must establish trustworthy client-IP handling without trusting arbitrary forwarded headers. OAuth state still has existing process-memory limitations. Command/audit retention policy is UNKNOWN; no unapproved history TTL was added.

Verification: disposable Mongo integration suites exercise pagination/DTOs and transaction safety; the19 commerce mutation/HTTP cases passed together. The earlier1000-order index explain is a database-layer check, not a new portal production-load benchmark. See TESTING for the latest combined suite and browser evidence.

Sources: `B2C/backend/admin/{reads,dashboard,security,commands,staff}.js`; `B2C/backend/auth/app.js`; `B2C/backend/database/models/index.js`.
