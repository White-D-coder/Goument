# Repository audit — 2026-10-18

CURRENT / PARTIAL: source audit and bounded local remediation completed under [DEC-001–004](../../DECISION.md); [actual flows](../../FLOW.md). **This is not production-readiness certification.** Initial Git working tree was clean; no commit/push/deploy, configured database mutation, real provider payment/email, secret rotation or asset migration performed.

## Scope and current evidence

Three Next applications, two legacy Express trees and separate B2C database/auth/admin/gifting/payment/catalogue/serverless modules inspected. Inventory covers42 page entry points, six Next API handlers,116 backend method/path declarations and25 B2C collections. [Routes](ROUTE_INVENTORY.md), [schema](../database/CURRENT_SCHEMA.md), [asset inventory](../assets/ASSET_INVENTORY.md). Loop-generated endpoints, inherited middleware and dynamic asset references still need contextual interpretation; inventory is not an access-control proof.

Root DECISION.md/FLOW.md were absent and are now audit entry points; canonical docs/ memory/history retained. The attachment ends partway through its scalability section; no missing text was invented. Applicable instructions read: root/nested AGENTS and installed Next route-handler/auth documentation before original admin code changes.

## Verified changes

| Decision | Before | After / evidence |
| --- | --- | --- |
| DEC-002, legacy S02 | Any socket joined admins and received order notices | Existing JWT/current DB admin checks on join and each notification; invalid/expired/deleted/demoted/storage-failed recipients denied; same event/payload retained |
| DEC-002, legacy S04 | Credentialed CORS returned true for all origins | Shared exact established origins; lookalike/suffix/unlisted origins denied CORS credentials; WebSocket handshake policy aligned. No-Origin nonbrowser requests still need authorization |
| DEC-003, dependencies | Critical production advisories in backend/main/alternate | Original frontends Next/eslint-config-next16.4.2, compatible original dependencies, main Nodemailer10.1.2; zero critical production advisories in all five package scopes |
| DEC-004, partial S03 | Missing PIN/session configuration used predictable fallbacks; malformed token suffix accepted | Missing config fails closed at admin APIs; configured HMAC/cookie format preserved; canonical expiry/signature, constant-time PIN digest comparison, typed body checks, generic errors, auth private/no-store |
| DEC-001, memory | No root audit references/current whole-repo inventories | Root decisions/flows, reproducible read-only inventory script, schema/asset/route/dependency evidence and canonical updates |

## Fresh baseline and final checks

All results below were actually run2026-10-18. Node22.12.0/npm10.9.0. Local listeners and registry access required sandbox escalation; initially blocked runs are not treated as code defects. No automatic approval rejection occurred.

| Scope / command | Before remediation | Final evidence |
| --- | --- | --- |
| B2C `node --test tests/*.test.cjs` |88/88 pass | Client source unchanged by audit; baseline retained |
| B2C `npm run lint`, `npm run typecheck`, `npm run build` | All pass | Build passed; final typecheck also passed after restoring build-generated next-env-only edits |
| backend `NODE_ENV=test npm test -- --silent` |14 pre-existing tests pass; added security regressions fail20/24 (four valid-origin cases already pass) | Final6 suites40/40 pass after dependencies and26 adversarial security cases |
| B2C/backend same full command |151 pre-existing tests pass; added security regressions fail20/24 | Full17 suites177/177 pass after all26 new security scenarios,116.506s |
| Original `node --test tests/*.test.cjs` | New admin tests fail4/5 before fix; no-network mail compatibility2/2 before upgrade |7/7 pass: five admin cases and two actual-handler/in-memory MIME cases; no mail sent or vault read/write |
| Original `npm run build`; separate tsc | Build/types pass | Next16.4.2 build/types pass; final Nodemailer10.1.2 rebuild and separate types pass |
| Original `npm run lint` |58 errors/108 warnings |57 errors/108 warnings after removing touched route any; audit-owned source/tests scoped lint clean. Existing app debt retained, no disabled rules on production source |
| Alternate build/types/lint | Build/types pass, lint0 errors/2 warnings | Same after Next16.4.2 update |
| `node scripts/audit-repository.cjs --write` | No such reproducible inventory |870 assets,42 pages,116 API declarations,25 disconnected schemas generated |

Whole-app original lint remains **CURRENT / BROKEN**, despite successful build (which still has ignoreBuildErrors enabled) and an independent successful TypeScript check. No rule was globally disabled. Node CJS test files locally document their require-import rule exception. Installs emitted an ESLint transitive-engine warning requiring Node22.13+ on the22.x line; actual checks passed, but upgrading the development runtime remains follow-up.

## Current dependency evidence

[Sanitized complete npm advisory evidence](dependency-audit.json), including advisory titles/links, affected ranges and fix flags. Counts are affected packages, not exploit counts. --ignore-scripts used; no --force. npm's fixAvailable alone was not treated as verified remediation; all scopes were reaudited.

| Scope | Baseline production (critical/high/moderate) | Final production | Final including development (critical/high/moderate) |
| --- | --- | --- | --- |
| B2C |0/0/0 |0 |0/5/0 |
| B2C/backend |0/0/0 |0 |0/30/8 |
| backend |1/3/4 |0 |0/30/8 |
| frontend_appview |1/7/1 |1 high XLSX |0/6/0 |
| frontend_responsive |1/4/0 |0 |0/5/0 |

Nodemailer9.x remained vulnerable after compatible audit fix. Registry metadata established10.1.2/Node>=20; dedicated pre-execution extension and actual MIME regression justified the major update. UUID registry recommendation crossed major versions; a full backend source search found it only in the manifest/lock. A pre-recorded extension removed the unused direct dependency, then the full40-test suite and production audit passed. XLSX reports no registry fix; inspected app usage is authenticated export rather than workbook import. Do not remove export functionality or force a major dependency migration silently. Development advisories include Jest/nodemon/ioredis-mock and ESLint transitives; their compatible versus breaking remediation needs separate review.

## Security review coverage and remaining findings

| Area | Observed evidence / current controls | Limits / follow-up |
| --- | --- | --- |
| Input / injection | B2C body/query/ID allowlists, bounded JSON, escaped catalogue search; legacy mongo sanitization/validators; no SQL store found | Original public enquiry validation weak and HTML interpolates unescaped fields; legacy product filters need further adversarial coverage |
| Auth / password | Legacy bcrypt10/JWT refresh hashes; B2C bcrypt12/opaque session digests, active-user checks, fixed-cost dummy compare; signup forces customer | Password reset/MFA not found; no hash migration justified; legacy access JWT survives refresh-token logout until expiry |
| Object/function access | B2C session/customer ownership and explicit admin permissions exercised by isolated suites; legacy persisted admin roles and socket revalidation now covered | No production tenant/identity audit; shared B2B PIN accountability/process-local rate controls remain |
| CORS / CSRF | Legacy CORS fixed; B2C unsafe methods require exact configured Origin; HttpOnly cookies | CORS is not general CSRF prevention; trusted-proxy/CDN routing/general distributed rate limiting unverified |
| XSS / redirects | React rendering and B2C safeNext allowlist/Google state present | Original enquiry HTML/attributes need contextual escaping/validation; no claim of exhaustive DOM/email sanitization |
| SSRF / traversal / commands | Reviewed geo/Google/gateway hosts are fixed; upload folder server prefix exists; no demonstrated request-to-shell execution | Geo query/header trust and provider policies need review; prefix alone does not establish upload namespace or file security |
| Upload/media | Admin-only Cloudinary signature; local public assets inventoried | MIME magic, limits, decompression, SVG handling, metadata and storage ACLs not verified by a signature-only endpoint |
| Payments / concurrency | B2C quote/reserve/capture/idempotency/expiry/mismatch tests pass with fake providers | Legacy idempotency global GET+SET, client shipping/tax fallback, stock/provider/queue races remain P0; B2C failed-event reconciliation/live scheduler incomplete |
| Secrets / crypto | Source admin PIN/HMAC fallbacks removed; selected512 tracked text-file scan emitted only file/category, with two known synthetic URI fixtures; sensitive env filename history query found no matching committed paths | Vault encryption fallback remains; full Git-history secret content scan, credential rotation/key custody and production config unverified. No actual env values printed/copied |
| Private responses / logs | B2C private/no-store/generic errors; original admin auth now private/no-store; export has no-store | Original admin data response lacks explicit private/no-store; enquiry may log PII and error details; no operational redaction/retention policy established |
| Storage / recovery |25 source collections/103 indexes/33 unique; existing disposable integrity tests | No configured DB explain plans/privilege/TLS/backups/restore verification; vault empty-on-decrypt-failure/concurrent overwrite/ephemeral storage remain |
| Headers / deployment | Helmet backend, selected Next headers, existing Vercel region/rewrites inspected | No broad CSP/HSTS change without real provider/asset compatibility; hosted HTTPS/headers/CDN/cold-start behavior UNKNOWN |

## Database, assets and performance

No new ORM, schema, index, cascade, identity merge or financial policy. [Database supporting review](../database/CURRENT_SCHEMA.md) includes current/target/relationships/index recommendations/migration/rollback/validation links. Existing snapshots and document cardinality preserved.

Assets:870 files/439,924,613 bytes;202 exact duplicate groups;549 with no static reference match. These are storage/source observations, not page payload/unused-file proof. One missing literal occurs in the unimported OtherProductsSection; no live broken page established. No moves/deletions or speculative optimization. Existing independent designs/public roots remain.

Performance: local build/test execution and asset metadata only; no new LCP/INP/CLS, physical-device, latency, workload, explain-plan or scalability benchmark. Existing public-cache/in-flight-request/timeout/fanout implementations documented in FLOW; no new speedup/capacity claim.

## Documentation conflicts resolved

1. Root AGENTS originally prefers domain memory; explicit current request requires root DECISION/FLOW. These are audit entry points linking domain docs, not replacement schemas or competing LATEST copies.
2. TODO still described synthetic catalogue price/stock defaults, while current B2C catalogue.ts uses zero/unavailable preview and existing R161 documented remediation. Mark that specific stale task source-resolved; retain historical observation.
3. TODO's blanket B2C full-lint-failing entry conflicts with actual current full lint passing and R161 history. Mark the historical item resolved, preserving separate original B2B57-error debt.
4. Original legacy quote/stock/Stripe issues remain open even though the newer B2C R223 quote/reservation bridge exists. Do not merge those statuses or infer hosted commerce readiness.

## Follow-up priorities and operation gates

Existing priority ordering retained. P0: legacy scoped atomic idempotency/payment/stock compensation and safe vault key/durability recovery; P1: deployed B2C scheduler/reconciliation/backup/proxy/distributed controls, remaining dependencies and public ingress hardening; P2: original lint debt, measured performance and asset-reference cleanup. Confirmed runtime/policy unknowns remain UNKNOWN.

Class D financial/data/production/key operations were not executed. A future decision must provide exact consumers, proposed code/data operation, disposable/staging checks, backup/restore/compensation and explicit approval under the user's attached Part5 gate. No outstanding operation was attempted and rejected by automatic approval review. No deployment claim follows from these local results.
