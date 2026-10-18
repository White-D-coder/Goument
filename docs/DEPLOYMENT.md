## 2026-10-18 — Audit release boundary

CURRENT / IMPLEMENTED locally: three builds/types and scoped security regressions pass after dependency/auth/origin hardening. No deploy/configured DB install/credential rotation or scheduler/provider operation. Existing Vercel configs/regions unchanged. Original Next admin now needs explicit existing ADMIN_SESSION_SECRET and ADMIN_PORTAL_PIN; missing settings deny access. Legacy cross-origin clients must use exact established origins. Confirm environment/configuration before any separately authorized release; do not restore source credential fallbacks.

CURRENT / PARTIAL: original whole-app lint57 errors/108 warnings; XLSX high and development advisory debt remain. Local Node22.12.0 produced transitive ESLint engine warnings (22.13+ supported patch needed on22.x). Actual hosting/proxy topology, original loopback rewrites, worker/cron operation, provider verification and backups/restoration remain UNKNOWN. Root FLOW17 is a proposed release/rollback process, not existing automated CI. DECISION records pre-execution intent/actual outcomes; no production-readiness claim.

## 2026-10-13 — Mumbai auth placement and single-query profile (R257)

CURRENT / IMPLEMENTED locally: B2C/vercel.json and B2C/backend/vercel.json explicitly set regions:[bom1]. User confirmed Atlas Mumbai; supplied authenticated response identifies an iad1 execution hop. This updates the earlier wholly-UNKNOWN region status for this request only. Both separate Vercel projects require new deployments; deploying only the storefront does not move its external auth backend. No database/provider migration or deployment performed.

FUTURE / REQUIRED in existing release follow-up: deploy reviewed backend and frontend, verify function execution in bom1 and inspect signed-in /me Server-Timing init/profile on cold and warm requests, plus cart interactions. Metrics omit network/platform scheduling overhead; no guaranteed latency threshold. Keep private/no-store and inspect backend logs if503 recurs. [Vercel region configuration](https://vercel.com/docs/functions/configuring-functions/region) and [region identifiers](https://vercel.com/docs/regions).

## 2026-10-12 — Inclusive checkout, envelope packs and spacing (R222–R224)

FUTURE / REQUIRED before enabling hosted B2C paid gift checkout (not deployed in R223): review intended transaction-ready B2C Mongo DB/backups, apply additive orders validator/index migration, explicitly provision approved catalogue mapping/opening100 stock only where not already mapped, configure Razorpay test keys/automatic capture and public signed webhook, then verify real test payment/order/stock/history across instances. Never run schema/provision from cold starts. Commands and recovery in B2C/README.md.

Configure a trusted approximately1-minute invocation of GET /api/v1/auth/gift/maintenance/expire with exact Bearer CRON_SECRET≥32, or supervised gifting/expire-checkouts.js. Each call≤100 overdue orders; monitor examined/released/backlog and repeat bounded calls if capacity requires. No cron was installed, so source5-minute logical deadlines do not prove autonomous idle release at exactly5minutes. Existing on-demand cleanup and transactional capture deadline protect money/stock; production scheduler/configuration/provider behavior UNKNOWN. No deployment performed.

## 2026-10-12 — Public hosted snapshot and pending UI release (R166)

CURRENT / PARTIAL: supplied https://b2c-tau-weld.vercel.app is publicly reachable; anonymous Home/Shop/Cart and gift GETs measured successfully. This supersedes wholly UNKNOWN public reachability for this specific B2C URL only. Deployment environment/region, backend cold-start cause, schema/index lifecycle, real checkout/provider health and release ownership remain UNKNOWN. R165/R166 counter/mobile cart/footer/request fixes are local and verified in an isolated production build; no Vercel deployment was performed. Hosted snapshot and local frontend-only lab conditions are separate in PERFORMANCE/TESTING. Do not claim the public site includes uncommitted local source or that the first-request API latency has been solved operationally.

## 2026-10-12 — Current B2C release requirements (R161)

CURRENT / IMPLEMENTED locally, unpublished: independent npm ci installs for B2C and backend; Next16.4. Explicit `npm --prefix backend run db:install` before startup/schema upgrade, including new OAuthFlow unique/TTL indexes. Startup/serverless no longer modify validators/indexes on cold start. Production requires explicit B2C database URI/name and exact AUTH_ORIGIN; connect uses isolated naming guard. Never run the new schema installer on legacy collections. Only new OAuth schema installed locally; deployed schema remains UNKNOWN.

Wrapper shares initialization across concurrent cold requests, caches success only, retries failure after1s, returns generic503/no-store/Retry-After on unready DB. Health is conditional on DB readiness; provider adapter matches standalone construction and raw webhook precedes JSON. Local dev3000/auth5003 restarted, approved accounts/session data preserved. Temporary production3002 and isolated Chrome closed after verification; no release. Proxy trust, distributed general rate limiting, CDN/private response behavior and real provider webhook/transaction checks remain required deployment evidence. Supersedes R160 wrapper defects, not operational unknowns.

## 2026-10-12 — B2C deployment-entrypoint audit (R160)

CURRENT / PARTIAL: B2C backend Vercel rewrite targets api/index.js; local auth uses auth/server.js. They differ in JSON/error middleware and payment adapter construction (see SECURITY/PAYMENT_SYSTEM). Wrapper runs schema installation during cold initialization, caches the app even after an initialization failure and reports healthz ok without DB readiness. Thus a temporary DB failure can leave a warm function serving cached500s and health200; production occurrence not established. Initialization also lacks a shared in-flight promise across concurrent cold requests. Distributed OAuth state remains unresolved. The isolated storefront build used default public backend rewrites without copying .env; this does not verify deployed release, env values, proxy trust, CDN caching, Atlas, backups or recovery. Existing local3000/5003/Mongo services were retained.

# Deployment

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Current evidence

Live deployment provider/status, domain ownership, CI pipeline, release process and backup/restore schedule: UNKNOWN. Local frontend_appview/.vercel/project.json is evidence of Vercel project linkage/configuration, not proof of a running deployment; identifiers are intentionally omitted. README Vercel instructions are template guidance; serverless env detection is not evidence of an actual deployment.

Each frontend: npm run dev / build / start / lint from its own directory. Backend: npm run dev (nodemon) or npm start (node src/server.js), default port5001. Main Next rewrite hardcodes localhost:5001; separate-service production topology needs deliberate configuration. Use distinct frontend dev ports if running both apps.

Mongo transaction-capable deployment, Redis/BullMQ worker, SMTP, Stripe keys/webhook routing and asset storage are prerequisites for their respective features. HTTP listener starts before DB connects; listening is not readiness. Correct health paths: /healthz and /api/v1/healthz,200 only if Mongo/Redis healthy, otherwise503.

Vault serverless storage is ephemeral by current design; durable persistence and key backup are unresolved. Security P0 and checkout-integrity findings must be reviewed before exposing commerce/admin capabilities. This setup did not deploy or activate pages. Rollback/migration/restore steps cannot be claimed until established.

## Component run/dependency/recovery matrix

| Component | Commands from directory | Required dependencies / readiness | Rollback / recovery status |
| --- | --- | --- | --- |
| frontend_appview | npm run dev; npm run build; npm start; npm run lint | Node/npm; env; local backend rewrite for ecommerce; SMTP/vault for inquiry | Host/release artifact strategy UNKNOWN; no deployment performed |
| frontend_responsive | same frontend scripts; distinct port if concurrent | Separate app deps/font build access; not a main-app device branch | Deployment intent UNKNOWN |
| backend HTTP | npm run dev or npm start in backend | Joi config, MongoDB, Redis, provider credentials; healthz readiness | Supervisor/restart topology UNKNOWN |
| Inventory worker | Bootstrapped by backend server except NODE_ENV=test | BullMQ Redis + Mongo; job eligibility and pending status | No standalone worker script/dead-letter/reconciliation runner |
| MongoDB | No repo-proven production provisioning command | Transaction-capable topology and declared indexes | Migration/version/backup/restore scripts NOT FOUND |
| Redis | No repo-proven production provisioning command | Cart/queue durability, memory/eviction settings UNKNOWN | Backup and queue recovery runbook UNKNOWN |
| Vault | Created by Next API; local data or serverless tmp | Persistent writable location not established; key required for decrypt | Key rotation, backup restores and multi-instance sync UNKNOWN |

No source changes, migration or rollback steps were executed. A future deployment runbook needs actual owner/host/service evidence, not generic commands pretending to provision production. Releasing code, rolling back a process and reversing paid-order data are different operations; no data rollback policy exists. Current gated routes stay gated.
