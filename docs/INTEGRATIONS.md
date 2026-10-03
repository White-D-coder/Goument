# Integrations

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

| Service | Purpose / API | Configuration | Failure / security |
| --- | --- | --- | --- |
| Stripe | PaymentIntent, Tax; POST orders/webhook | STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET; frontend publishable config | Raw signature verification; breaker; tax fallback inconsistency and idempotency gaps |
| Cloudinary | Signed upload, image URLs | CLOUDINARY_*; NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME | Sign endpoint admin-only; folder prefix gourmet-gem; actual uploads not tested |
| SMTP/Nodemailer | HTML enquiry email | SMTP_*, INQUIRY_RECIPIENT_EMAIL | Missing credentials returns success/log path; thrown errors500; vault write precedes send |
| WhatsApp | wa.me outbound contact | NEXT_PUBLIC_WHATSAPP_PHONE plus literals | Link-based; no verified Business API/webhook |
| Microsoft Clarity | Browser analytics | Project identifier inline in layout | afterInteractive script; no delivery/consent verification |
| IP geolocation | ip-api.com HTTP request | Source URL | Fallback defaults possible; validate proxy-derived IP/trust boundary |
| GPS reverse geocoding | BigDataCloud reverse-geocode-client → Nominatim on thrown primary error | Source endpoints in geo/detect | Primary timeout2500ms; non-OK primary response may fall through to defaults without Nominatim; no API-key config inferred |
| MongoDB | Durable ecommerce data | MONGODB_URI | Startup may listen before connection; health reports disconnected |
| Redis/BullMQ | Cart/cache/queue/socket adapter | REDIS_URI | Connection retry logging is not a functional offline fallback |
| Winston | Backend logs | Existing logger config | SENTRY_DSN/LOGTAIL_TOKEN declared; dedicated transports not established |

No SMS, shipping carrier, invoice SaaS or refund integration found. Inspect actual service and failure paths before extending; do not introduce duplicate integrations. Full variable names in ENVIRONMENT.

## Request / response / retry / stored-data details

| Integration | Request/result and data stored | Application retry behavior | Environment/security boundary |
| --- | --- | --- | --- |
| Stripe | Server amount/currency/metadata→intent id/clientSecret; Order stores id; Tax→aggregate amount; signed webhook mutates Order/Coupon | Opossum timeout5s,error threshold50%,reset10s; no explicit retry loop in SDK wrapper; transaction may call again | Backend secrets only; provider defaults not assumed; frontend public key config not completed checkout |
| Cloudinary | Admin sign request→timestamp/signature/cloud/key/folder; browser/provider upload separate; Product public_id stores reference | No custom upload retry path established | Server signature secret; public cloud/key identifiers separate from secret |
| SMTP | Enquiry HTML with contact/items→sendMail; vault record saved first | No durable mail queue/retry; error500, absent credentials success/log branch | SMTP host/port/TLS/user/pass and recipient; HTML escaping/PII log review |
| WhatsApp | Browser opens structured wa.me text; no provider callback | No custom retry/delivery status | Public destination; conversations not persisted by connector |
| Clarity | Browser afterInteractive script sends analytics to external provider | No application retry/store of provider event IDs | Inline project identifier; external delivery/retention settings UNKNOWN |
| IP geo | IP/provider header resolution→HTTP ip-api query with1.8s timeout→city/region/country defaults | Fallback rather than durable retry | IP stored in vault; forwarded-header trust needs deployment config |
| GPS geo | Coordinates→BigDataCloud2.5s timeout; thrown-error fallback Nominatim→location | Non-OK primary can return null without second provider; no durable job | Optional matching sessionId location update; coordinates and identity not authoritative customer matching |
| Redis | JSON cart/cache and pub/sub/queue persistence | Client strategy stops after>3 attempts, offline queue disabled; no app in-memory production fallback | REDIS_URI; persistence/eviction/deployment UNKNOWN |
| BullMQ | Order ID delayed15min job→restore stock/expire order | No configured attempts/backoff/cleanup jobs; failed-event logging | Worker is backend process; Redis dependency and Mongo effects |
| MongoDB | Model queries, snapshots, transactions and status changes | Order transaction max3 WriteConflict attempts; no universal retry policy documented | MONGODB_URI; transaction-ready topology; backups UNKNOWN |

`backend/src/shared/utils/circuitBreaker.js` contains breaker defaults. `backend/src/config/index.js` reexports shared/config; it is not an independent config system. Provider runtime health, external default retries and actual deployment credentials were not tested.

## 2026-09-30 — Razorpay gateway adapter

CURRENT / IMPLEMENTED: B2C/backend/payments adds Razorpay REST order creation, timing-safe Checkout HMAC and raw-webhook HMAC verification, provider payment fetch/matching and existing transactional capture integration. Authenticated endpoints use customer-owned immutable priced orders with fully reserved variants; browser amounts are rejected. One stable payment attempt/receipt plus a persistent initialization claim prevents duplicate create calls; ambiguous timeouts require reconciliation. Callback/webhook share one capture identity for exactly-once stock/order/payment/finance effects. New checkout component opens hosted Standard Checkout, handles dismissal/pending/error and reads persistent payment status. Account history links to owned order checkout.

CURRENT / PARTIAL: gift draft→priced/reserved order bridge, real prices/box charges, GST/shipping policy, durable failed-event recovery/reconciliation, reservation expiry and refunds remain pending. Gift-draft payments are not activated. Razorpay keys absent; blank server-only entries added to ignored .env and .env.example. No actual provider charge or public webhook delivery tested. Legacy Stripe preserved. See [payment setup](../B2C/backend/payments/README.md) for official references, routes and failure limits.

Verification: all49 database/auth/gifting/Razorpay tests passed across4 suites. New8 payment cases use temporary MongoDB, real HMAC checks and mocked Razorpay I/O. Production build, TypeScript and ESLint passed.
