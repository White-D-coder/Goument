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
