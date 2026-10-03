# Performance

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
