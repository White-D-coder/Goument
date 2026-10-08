# Performance

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
