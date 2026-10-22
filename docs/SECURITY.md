## 2026-10-23 — Patch the B2C DevTools security finding (R287)

CURRENT / IMPLEMENTED locally: Next's security-policy selector identified installed16.4.0 as affected and selected16.4.2. Exact Next/eslint-config-next16.4.2 installed with updated framework transitives; sharp0.35.5 verified. The [official October14 advisory](https://nextjs.org/blog/nextjs-security-update-october-14-2026) identifies cache typed-array RCE, glibc/SVG image-optimizer RCE and Server Action DoS, with fixes in16.4.1; [16.4.2](https://github.com/vercel/next.js/releases/tag/v16.4.2) includes those fixes. This does not assert every advisory was exploitable in this deployment.

Repeat `next upgrade --agent=security` reports no security update needed for16.4.2. Fresh `npm audit --omit=dev --json`:0 advisories. Earlier zero-audit/16.4.0 statements are historical snapshots, not proof against later advisory metadata. Reminders stay on with experimental.agentUpgrade:'security'. Existing preview now runs16.4.2; source/lock/install, build/tests and scoped browser evidence recorded in TESTING. No production deployment, security certification, real customer/provider write or unrelated backend/auth/payment change. Hosted runtime/exposure remains UNKNOWN until patched deployment verification; unrelated security debt remains open.

## 2026-10-18 — Current audit remediation (DEC-002–004)

CURRENT / IMPLEMENTED and locally regression-verified: S02 corrected in both legacy trees. Socket admin admission and each notification use the existing JWT signature/expiry/current persisted admin role; cookie/Bearer/auth.token supported, invalid/customer/deleted/demoted/dependency-failed members denied/removed. Redis adapter failure denies join without an unhandled rejection. Exact existing origins now govern REST CORS and WebSocket handshakes (S04 origin subfinding corrected); no wildcard/prefix exception. Nonbrowser missing-Origin is allowed at transport but never authorizes admin data. CORS is not a universal CSRF control; socket flood/load/distributed-adapter runtime remains unverified.

S03 CURRENT / PARTIAL: original B2B admin PIN/HMAC defaults removed. Missing either explicit setting denies all sessions/token creation and returns login503; configured seven-day format/cookie retained, canonical token expiry/64hex signature and constant-time PIN digest comparison tested. Invalid bodies/JSON generic400; auth status/login/logout private,no-store. The separate vault encryption fallback, empty-on-decrypt-error/concurrent/ephemeral storage risks remain OPEN; no key rotation or records changed. Original admin data endpoint still needs an explicit private/no-store policy; export already sets no-store. Shared-PIN accountability and process-local limiter remain limitations.

Fresh production audits after original Next16.4.2/Nodemailer10.1.2/compatible fixes/unused backend UUID removal: B2C, B2C backend, original backend and alternate0; original main1 high XLSX/no registry fix. Development advisories remain (including ESLint/Jest/nodemon); see sanitized audit/dependency-audit.json. This does not establish deployed exploitability or certification. Selected512 tracked-text pattern scan found only two synthetic URI fixtures; no env values read/output, no full history-content secret scan. [Audit](audit/REPOSITORY_AUDIT.md), [TESTING](TESTING.md) record evidence/limits. S05 and other legacy money/public-ingress/vault/privacy findings remain open.

## 2026-10-13 — Mumbai auth placement and single-query profile (R257)

CURRENT / IMPLEMENTED R257: single-query /me preserves token syntax/digest, session expiry, ACTIVE User, active owned Customer gate and staff fallback. Explicit projection prevents aggregate defaults from exposing password/session/Google identity fields. Private/no-store, Origin and rate limits remain. Tests cover malformed/forged/expired/revoked/disabled sessions, inactive/missing customers, ownership, safe DTO and staff access. Server-Timing contains numeric init/profile durations only. No supplied private cookies replayed or stored in project memory.

## 2026-10-12 — Inclusive checkout, envelope packs and spacing (R222–R224)

CURRENT / IMPLEMENTED R223: server-only mapped price/stock quote; body only owned address/revision/expected-total stale check; no client amount authority. Draft/customer/publication/variant price and inventory transaction fences; unique request-bound order reuse; existing exact Origin, cookie ownership/private no-store preserved. Provider I/O outside retried Mongo transactions, captured signature/order/amount/currency checks retained. Expiry endpoint accepts exact constant-time Bearer CRON_SECRET≥32; missing secret fails closed. Additive migration refuses unknown schema/incompatible history; provisioning refuses unmapped slug conflict and never resets stock. Late money receipt stored without false sale; no secret/customer record in docs. Scheduler/provider production tests and operator reconciliation remain required; original B2B security debt not claimed fixed.

## 2026-10-12 — Preserve auth limits while fixing browsing429 (R206)

CURRENT / IMPLEMENTED and locally regression-verified: frequent allowlisted me/config/gift count/draft/catalogue GET/HEAD traffic uses300/minute per-IP bucket, separate from original60/minute general auth/OAuth/write budget. Admin persisted buckets/login persisted protections retained. Process-local storage bounded10,000 entries with expiry; Retry-After on429. Client bootstrap deduplication holds in-flight promises only, invalidates sharing on mutations, does not share drafts or cache settled private responses. Backend identity/ownership/Origin/private,no-store enforcement unchanged. Tests cover exhausted read/general budget isolation, window expiry, spoofed forwarding headers, persisted admin/login checks and existing auth/gift ownership. Proxy trust was not enabled; distributed enforcement/deployed proxy remains FUTURE / REQUIRED / UNKNOWN. No claim of removing429 for abusive bursts or production certification.

## 2026-10-12 — Refuse unquoted gift-order money (R192)

CURRENT / IMPLEMENTED locally: observed gift/order placeholder valuation was a defect: authenticated non-hamper selections could be priced flat₹299 with zero GST/delivery and saved without authoritative quote/reservation. Removed the write/cart-clear branch, retaining identity/readiness/hamper guards and returning409 for remaining selections. Address capture now reports paymentAvailable:false; cart respects checkoutAvailable:false. Browser estimates/user ranges cannot authorize orders or payments; hostile amount fields in the regression request do not create an order/change the draft. No schema/customer/ownership/history/payment-provider changes.15 gifting tests pass; hosted behavior UNKNOWN until deployment. Existing quote/reservation and other P0 tasks remain required; see ORDER_SYSTEM/TESTING.

## 2026-10-12 — Current B2C remediation (R161)

CURRENT / IMPLEMENTED and regression-verified locally; supersedes the open status of the corresponding R160 B2C findings below. Frontend Next16.4 and compatible backend/transitive updates plus removal of unused frontend runtime dependencies produce zero vulnerabilities in both `npm audit --omit=dev --json` results. This is production-dependency evidence, not an all-development-dependency or exhaustive penetration-test claim.

Unsafe `backend/admin/setup-owners.js` now fails without DB access; `admin:setup-owners` invokes the existing guarded explicit-user-ID provisioning command. No default credentials, identity relinking or account resets remain in that retired CLI. Existing approved local owner and sessions preserved. All browser auth mutations require the exact configured Origin (including rejecting missing Origin); signed provider webhook is mounted separately before JSON. Session/gift/payment/admin responses have no-store; private auth responses use `private, no-store`. Wrapper/catalogue failures return generic503 without internal DB details. Public products expose a bounded safe DTO and escaped literal search only.

Google handshake state/binding are stored as hashes in private temporary OAuthFlow records, atomically consumed across app instances before token exchange; nonce/PKCE verifier excluded from ordinary queries, ten-minute expiry enforced at lookup plus TTL cleanup. General non-admin request rates remain bounded process-local; distributed limiter and deployed trusted-proxy behavior are FUTURE / REQUIRED / UNKNOWN respectively. Persisted login/admin buckets retain their existing implementation. No new customer/admin bypass observed in scoped tests; production hosting/CDN, full authenticated browser audit, provider transactions and git-history secret scan remain unverified. Legacy S02–S08 findings below are not fixed by this B2C change. TESTING contains exact evidence.

## 2026-10-12 — B2C security audit (R160)

CURRENT / PARTIAL: read-only audit of current B2C source, isolated production browser and local signed-out APIs; no security remediation or deployment. No customer-data leak or admin bypass was observed in tested paths. This is not a certification or an exhaustive secret/history scan. See TESTING for exact checks and limits.

| Finding | Evidence and boundary | Required follow-up |
| --- | --- | --- |
| Dependency advisories | `npm audit --omit=dev --json`: frontend9 affected packages (1critical,7high,1moderate); backend8 (1critical,3high,4moderate). Installed/locked Next16.2.10, Express4.22.2 and proxy-addr2.0.7 agree. Package severity does not prove exploitability of every advisory in this deployment. | Review reachable paths and update patched dependencies with regressions; no automatic force fix was attempted. npm reports no registry fix for the current xlsx line. |
| Privileged CLI defaults | `backend/admin/setup-owners.js:8,14` contains hardcoded fallback privileged passwords; script can also reset credentials/ownership. CLI was not run; no credential values recorded. | Remove unsafe defaults and preserve existing identities through an authorized correction. R159 used the separate guarded bootstrap. |
| Error detail exposure | `backend/api/index.js` returns connection `err.message` publicly. Isolated mocked failure reproduced500 containing an internal marker; product handlers also return raw error messages. | Generic public errors; private operational logging. No actual production connection values were retrieved. |
| Origin policy broader than documented | `backend/auth/app.js:24` admits any Vercel/tunnel suffix and permits absent Origin. Isolated nonexistent-route POST rejects unrelated example403 but admits untrusted Vercel/Cloudflare origins to routing404. SameSite/host scoping still apply; no authenticated cross-site exploit was attempted. | Establish explicit supported origins and enforce intended policy. Earlier exact-Origin descriptions are superseded for current B2C runtime by this evidence. |
| Missing explicit private cache policy | Current `/auth/me`, `/auth/orders`, gift and browser payment routes lack a general no-store middleware. Local signed-out me/orders and public gift responses have no Cache-Control; admin has no-store. No shared-cache customer exposure was demonstrated. | Set explicit private/no-store policy for session-owned responses and verify authenticated headers with fixtures. Earlier blanket no-store claims for gifting are not supported by current source. |
| Deployment-wrapper parser divergence | Outer JSON parser bypasses8KiB auth policy (9KiB fixture413 standalone,404 wrapper) and generic auth parser error handling. Malformed JSON produces an HTML stack in development mode; production-mode stack disclosure was not established. | Mount raw webhook before JSON; keep one intended parsing/error boundary. See PAYMENT_SYSTEM. |

Scoped pattern scan of152 source/public/generated-client text files found no matches for the selected provider-token/private-key/credential-URI signatures; this does not negate the separately verified CLI fallback passwords, detect arbitrary secrets, or audit git history. Actual .env files were not printed/copied; only example env files are tracked. Signed-out admin/customer APIs401; `.env` and `backend/.env`404. Legacy socket/CORS findings remain separate from the database-backed admin portal.

Primary advisories consulted: [Next AVIF image optimization](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4), [proxy-addr trust-subnet spoofing](https://github.com/jshttp/proxy-addr/security/advisories/GHSA-jqcg-44mw-7w3h). The latter requires relevant proxy trust configuration; no deployed exploitability claim is made.

# Security

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Existing mechanisms

JWT and DB role checks, bcrypt, token-hash rotation, admin HMAC cookie, Helmet, mongo sanitization, express-validator/Joi, Redis rate limiter, signed Stripe webhook and encrypted vault. This inventory is not a security certification. No live exploitation was performed. S01 was remediated locally on 2026-09-27; remaining findings below are open.

## Findings

| ID | Priority | Finding | Evidence / next action | Source |
| --- | --- | --- | --- | --- |
| S01 | P0 — corrected locally | Public registration formerly accepted role | Service now forces customer; malicious HTTP/direct-service inputs covered by regression tests. Existing accounts untouched. | backend/src/features/auth/auth.service.js |
| S02 | P0 | Socket admin room lacks auth | join_admins listener joins admins without credential/role check; possible new_order data exposure. | backend/src/shared/utils/socket.js |
| S03 | P0 | Fallback secret material in source | Next admin PIN/session and encryption defaults exist. Production use/configuration UNKNOWN; fail-closed handling/key management needed. | frontend_appview/src/lib/security/adminAuth.ts; frontend_appview/src/lib/security/vault.ts |
| S04 | P1 | Credentialed CORS accepts all origins | Fallback callback allows true; named list does not enforce restriction. | backend/src/app.js |
| S05 | P0 | Idempotency not scoped or atomic | GET+SET lock with global client key; concurrent and cross-user replay risks. | backend/src/shared/middleware/idempotency.middleware.js |
| S06 | P1 | Public inquiry/telemetry ingestion | Limited validation; template interpolation and payload abuse require review; Express limiter does not protect Next endpoints. | frontend_appview/src/app/api/send-inquiry/route.ts |
| S07 | P1 | Vault durability and concurrency | Read/modify/write file store, ephemeral serverless path; encryption alone does not ensure retention or concurrent consistency. | frontend_appview/src/lib/security/vault.ts |
| S08 | P1 | Customer data/geo controls unresolved | IP/GPS/session tracking, Clarity and Excel exports exist; consent, retention and deletion policy UNKNOWN. | frontend_appview/src/hooks/useSilentTelemetry.ts |

## Rules

Never store actual secrets, tokens, PINs, customer data or .env contents in docs. Never rely on hidden page routes for API protection. Scope authorization independently on REST, Next admin and WebSocket interfaces. Validate client inputs and externally confirmed payment identity/amount/currency before state transitions. Inspect all consumers before auth or contract changes.

Webhook/stock/totals integrity findings are in EDGE_CASES and PAYMENT_SYSTEM. Do not silently mark findings resolved without code and validation evidence.

## Source observation vs potential impact vs future action

| Finding | Observed source issue | Potential risk (not reproduced) | Remediation / current status |
| --- | --- | --- | --- |
| S01 | Former public role assignment reproduced in isolated tests | Unauthorized admin assignment before fix; no production incident asserted | Applied: service forces customer; adversarial HTTP/service and existing-admin tests |
| S02 | join_admins unconditionally joins room | New-order broadcast disclosure | Authenticated, role-checked connection/room access |
| S03 | Admin/session/encryption fallbacks exist | Predictable credentials if deployment unset; wrong key destroys readability | Required secure config, rotation/recovery design |
| S04 | CORS fallback callback allows all with credentials | Cross-origin credential exposure/CSRF surface depends on browser/deployment | Explicit origins and CSRF/trust-boundary review |
| S05 | Idempotency key not user/payload scoped; non-atomic lock | Cross-user cached response/clientSecret replay or concurrent orders | Atomic scoped request ledger/provider idempotency |
| S06 | Enquiry HTML interpolates input; missing-SMTP path logs enquiry fields | Template/content injection, PII in logs, spam/storage abuse | Validation/escaping, rate limits, redacted structured logs |
| S07 | Decrypt errors yield empty vault; whole-file read/replace | Data loss, concurrent overwrite, ephemeral eviction | Durable store, serialized writes, fail-safe recovery/backups |
| S08 | Public telemetry/geo IDs, IP data, GPS and analytics | Spoofed metrics/session association, privacy exposure | Identity boundary, payload validation and established privacy policy |
| S09 | Account/checkout catch paths render fabricated success | Misleading users if gates opened; not server auth/payment bypass | Remove demo fallbacks only in separately authorized implementation |
| S10 | Shared secret-based admin identity, in-process rate map | No individual accountability; multi-instance lock evasion | Explicit staff model and distributed controls after requirements |

## Webhooks, limits, secrets and logging boundaries

Raw Stripe signature verification exists before JSON parsing. Amount/currency/event replay matching and exactly-once effects are missing; signature alone does not solve money integrity. Express limiter100/IP/min applies before webhook route too; test bypass and Redis-error fail-open exist. Middleware does not rate-limit separate Next inquiry/telemetry APIs. Admin PIN limiter five failures/15min is local process memory; restart/instance scaling resets/splits it.

Winston console uses debug development/info otherwise; error handler logs message, URL, method and IP. Development errors include stack; production masks non-operational errors. Next handlers can expose error.message; missing-SMTP enquiry logging includes contact/message data. No retention/redaction policy proven. Do not paste real records into docs or tests. .env and encrypted vault paths are gitignored, which is not proof deployment secrets are secure.

Observed behavior and recommended changes are deliberately separate. S01 locally reproduced and corrected; other findings remain source observations without a remediation claim. See EDGE_CASES for source-identified money/storage failure scenarios and CURRENT_STATUS/TODO for priorities.

## B2C database increment — 2026-09-28

New module guards query writes/deletes, snapshots, state changes and bounded metadata with secret-key rejection. These controls do not establish arbitrary-text redaction, API authorization or native-driver bypass protection. Trusted callers must enforce ownership and verified gateway input; existing socket authorization issue remains open.

## 2026-09-29 — Google auth and Atlas integration

New Google adapter verifies token signature with fixed Google keys, issuer, client audience/azp, expiry, nonce and verified email; authorization-code exchange uses PKCE and one-time browser-bound state. Callback cancellation/failure never authenticates. Session digests hidden in model projections, opaque HttpOnly cookies, exact-Origin POST checks, bounded rate/state maps; no logging of provider tokens or credentials. Google identity cannot self-assign staff role or silently take over a same-email password account. Sessions revoked on logout, expired/disabled identities denied. Production multi-instance state store, trusted-proxy/rate-limit deployment and account recovery remain pending.

## Box-first gifting — 2026-09-30

New gifting endpoints inherit exact-Origin mutation checks/no-store/rate limiting from auth middleware. Draft ownership is a separate server-generated256-bit HttpOnly SameSite=Lax cookie, hashed in Mongo; no caller-supplied customer/session header used. API projects safe fields and never returns private capacity. Unknown request fields reject. Optimistic revisions prevent stale overwrites; no identity/account linking, stock reservation or money mutation. Cookie is a browser-session cookie, not account-scoped; retention and cross-device restoration unresolved.

## Razorpay — 2026-09-30

Owned order/current auth/exact Origin required on browser payment routes. Webhook uses raw-body timing-safe HMAC with a separate secret. Fixed Razorpay HTTPS API,10second timeout and bounded bodies. Stored gateway order ID and exact captured amount/currency/identity must match. Unknown create outcome remains STARTED and is not blindly retried. No payment/customer secret logging.

## 2026-10-01 — B2C owner operations security boundary

CURRENT / IMPLEMENTED: operations APIs live under the existing cookie scope `/api/v1/auth/admin`; server middleware checks persisted sessions, active status, existing OWNER/ADMIN roles and an explicit permission catalog. ADMIN is deny-by-default. Owner-only staff/settings permissions cannot be delegated to ADMIN. Browser role flags and permissions never authorize a request. Staff grants target existing IDs; public signup/Google creation cannot assign privileged roles. Staff deactivation and grant changes revoke all target sessions. OWNER identities are not editable through general staff management.

Administrative command requests require an actor-scoped Idempotency-Key and fingerprint of action/input. A Mongo transaction rechecks authorization, writes an actor version lock shared with access/session mutations, applies the validated handler, stores only resource/id/version in the receipt and appends an audit event. Same-key/different-payload reuse conflicts. Concurrent revocation causes fresh authorization on transaction retry. Audit failure rolls back the command effect. Order command audit associates customerId by reading the actual stored Order, never from request ownership fields.

Shared Mongo rate buckets apply per minute: entry240/IP before session lookup; reads120 per actor and IP; writes30 per actor and IP; sensitive staff/settings writes10 per actor and IP; password login10/IP before bcrypt. Rate identities are hashed, rows have short TTL expiry, and storage failure fails closed. These controls are distinct from the remaining process-local general auth/OAuth state. Production trusted-proxy and distributed Google-flow configuration remain UNKNOWN.

Mutation fields, enums, IDs, integers, expected versions, pagination and reporting windows are bounded. Admin JSON is limited to128KiB; other auth requests retain8KiB. Malformed/oversized JSON returns generic messages without echoing payload fragments. Internal failures never return database queries, stack traces or connection values. DTOs explicitly project fields; session digests, password hashes, provider/internal metadata and private invoice document URLs are excluded. Private-resource details create audit records; reporting currency/timezone configuration contains no provider secrets.

CURRENT / PARTIAL: no deployed security certification, MFA, account recovery, private-file storage provider or integration-secret management is established. Legacy B2C `src/shared/utils/socket.js` still has unauthenticated admin-room membership and is not used by this portal. Earlier root/B2B findings remain separate and unresolved unless explicitly noted. First-owner bootstrap is only an operator CLI and has not been executed on live data. Actual Atlas connectivity remains blocked; isolated tests do not verify production access.
