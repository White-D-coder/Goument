# DECISION.md

## 1. Project Context

Audit started 2026-10-18 under the user's attached Master Engineering Prompt. The Gourmet Gifts repository contains B2C commerce, the original B2B frontend, an alternate frontend and two backend trees. These are separate applications; deployed health is UNKNOWN.

This root register records this audit's operations. Existing historical decisions in [docs/DECISIONS.md](docs/DECISIONS.md) and canonical domain documents remain authoritative historical/domain references. The explicit current request adds these two root entry points; it does not replace domain documentation or authorize production changes.

## 2. Discovered Stack and Constraints

Source manifests identify Next.js 16/React 19/TypeScript, Express 4, Mongoose 8, Redis/BullMQ, Stripe and a separate B2C auth/database/payment implementation. Verified installed versions/checks are in FLOW section2 and the audit report. npm lockfiles exist per application; there is no root package manifest. Initial `git status --short` was empty. No pre-existing DECISION.md or FLOW.md was found.

## 3. Engineering Principles

Inspect consumers before changes; preserve designs, ownership and historical snapshots. Distinguish source evidence, local tests and hosted runtime. Never copy secrets/customer records into audit artifacts. No speculative schema, tax, retention, identity or payment policy. Prefer bounded fixes and meaningful regression tests.

## 4. Risk and Approval Policy

Class A read-only inspection and Class B reversible documentation/tests are authorized by this request. Class C local security/quality changes require a recorded bounded decision, consumer review and regressions. Class D destructive/data/payment/production operations require explicit separate approval and recovery evidence. No commit, push, deploy, live migration, credential rotation, bulk deletion or provider charge is authorized by this audit.

## 5. Decision Register

### DEC-001 — Repository baseline and audit strategy

**Status:** VERIFIED  
**Category:** Testing / Security / Architecture / Assets  
**Priority:** P1  
**Risk:** LOW  
**Date:** 2026-10-18  
**Related decisions:** Historical domain decisions in docs/DECISIONS.md  
**Related FLOW.md section:** Sections 1–20

#### 1. Problem statement
The requested audit needs current source-backed inventories and fresh verification without confusing historical local results with production readiness.
#### 2. Evidence
Root startup instructions and docs exist. Five application manifests are present. Root audit entry points were absent. Initial working tree was clean.
#### 3. Current behavior
Each application owns its manifest, dependencies and configuration. Domain docs contain dated history and acknowledged security/operational gaps.
#### 4. Proposed decision
Create root audit references, inspect all application boundaries, execute isolated local checks, and produce supporting inventories linked to canonical domain documents.
#### 5. Alternatives considered
Replacing existing domain memory would discard history; documentation-only inspection would not satisfy the request for actual verification and improvements. Retain memory and add evidence-backed execution records.
#### 6. Selected approach and rationale
Inventory first; fix confirmed defects only in small documented batches; use existing tooling and disposable test data. Preserve deployment/payment boundaries.
#### 7. Expected outcome
Reviewable audit, reproducible local baseline, verified bounded fixes and explicit unresolved findings.
#### 8. Scope of impact
Root audit files, affected docs, local generated inventories and test/build artifacts. Application source changes require subsequent dedicated decisions.
#### 9. Security and data implications
Do not read/output .env values, real customer documents or production logs. Inspect environment variable names from code and templates. Run DB tests only after confirming disposable database setup.
#### 10. Execution plan
Read required memory and source/config/test entry points; inventory routes/models/assets; run existing isolated checks and supported dependency audits; document confirmed remediation before edits; verify and synchronize canonical memory.
#### 11. Commands and operations
`rg`, source/config reads and Git status/diff: Class A, no intended state changes. Existing npm lint/typecheck/build and isolated test commands: local cache/build/test artifacts only after script review. `npm audit --json --ignore-scripts`: read-only registry advisory lookup, no dependency updates. Inventory generation writes only audit documentation; no asset relocation or data mutation. Commands/results will be recorded below; do not run seed/install/migrate/provision/worker scripts.
#### 12. Risks and trade-offs
Large histories may contain superseded claims. Builds can need unavailable network/services; record failures rather than substituting historical passes. Static asset reference analysis cannot establish external/CMS usage.
#### 13. Approval requirement
NOT REQUIRED for this authorized read-only/local reversible baseline. Separate Class D work remains unapproved.
#### 14. Validation plan
Inspect all results, run appropriate available lint/types/tests/builds, check generated route/asset inventories against source and inspect `git diff --check`. Record missing services and blocked checks.
#### 15. Recovery or rollback plan
Revert only this audit's edits if necessary; never reset working tree. No database/infrastructure rollback is needed for read-only investigation. Build outputs remain ignored.
#### 16. Pre-execution review
WHAT I AM ABOUT TO DO: inspect repository source and run reviewed local baseline checks; create audit inventories.  
WHY I AM DOING IT: requested comprehensive audit lacks fresh execution evidence/root entry points.  
WHY THIS APPROACH: existing tooling and canonical memory minimize compatibility risk.  
WHAT IT WILL DO: create reviewable evidence and identify justified fixes.  
WHAT IT WILL NOT DO: mutate live data, activate commerce, move/delete assets, update dependencies or deploy.  
RISKS: unavailable services, historical contradictions and generated local artifacts.  
VALIDATION: inspect command exit results and documentation/source consistency.  
RECOVERY: restore only audit-owned files/edits.  
AUTHORIZATION: user authorized this Class A/B baseline.
#### 17. Execution result
Completed local baseline/inventories and bounded remediation; all results/limits linked in docs/audit/REPOSITORY_AUDIT.md. No production/data/key/asset migration.

#### 18. Verification evidence
2026-10-18: initial Git status clean; five manifests and three nested frontend AGENTS files inspected. Root entry points absent before this operation.

Final2026-10-18 evidence: All3 builds/types pass; B2C lint/88 client; original scoped lint/7 admin-mail; B2C full177 and original full40 backend tests pass. Main whole lint remains57 errors/108 warnings; alternate2 warnings. Inventories870 assets/42 pages/6 Next handlers/116 API declarations/25 schemas; production advisories0 in4 scopes,1 high XLSX in main. Dev advisories remain. Selected512-file scan only synthetic test URI hits; no full-history/runtime certification.

#### 19. Deviations
None. Supporting material will extend/link canonical docs instead of duplicating their ownership.
#### 20. Remaining risks
Production state, backup restoration, provider credentials/access and operational policies UNKNOWN until evidenced. Historical findings are not automatically current defects.
#### 21. Final status
VERIFIED (bounded local scope; remaining risks above remain open)


### DEC-002 — Legacy socket authorization and exact origin enforcement

**Status:** VERIFIED  
**Category:** Security  
**Priority:** P0 (S02), P1 (S04)  
**Risk:** MEDIUM  
**Date:** 2026-10-18  
**Related decisions:** DEC-001; historical S02/S04  
**Related FLOW.md section:** Sections 6–8, 18

#### 1. Problem statement
Unauthenticated sockets can join the legacy admin room; both legacy Express apps reflect credentials to arbitrary origins.

#### 2. Evidence
backend/src/shared/utils/socket.js and B2C/backend/src/shared/utils/socket.js unconditionally join admins. Both src/app.js CORS callbacks return true for unlisted origins. rg consumers: only src/server.js initializes sockets; order.controller.js calls notifyAdmins; no in-repository browser socket consumer found.

#### 3. Current behavior
Any socket can request join_admins and receive new_order data. REST CORS allowlist is ineffective. New B2C api/index.js/auth/app.js does not initialize these legacy sockets or use this legacy CORS middleware.

#### 4. Proposed decision
Use existing legacy auth('admin') with cookie/Bearer or Socket.IO auth.token credentials for room admission, and recheck identity/current role/token on each notification before delivery. Deny and remove stale members, including authorization/storage failure. Share exact existing REST origin allowlist with sockets and reject unlisted browser origins.

#### 5. Alternatives considered
Connection-only checks leave expired/demoted room members authorized indefinitely. Trusting token role skips the existing persisted-user role boundary. Reuse the current auth middleware and revalidate notification recipients instead of introducing another identity system.

#### 6. Selected approach and rationale
Bounded changes to both duplicated legacy trees preserve JWT/model semantics and event names. New helper owns exact origin policy; no wildcard/suffix or new deployment variables.

#### 7. Expected outcome
Anonymous/customer/forged/expired/deleted/demoted identities cannot receive admin broadcasts; named origins remain usable and unlisted origins receive no credentialed CORS headers.

#### 8. Scope of impact
Both legacy src/app.js, src/shared/utils/socket.js; new shared/config/origins.js and security regression tests. No schema, money, order/controller payload, provider, new B2C auth or frontend design changes.

#### 9. Security and data implications
Load current User for every attempted join and each recipient delivery. Only synthetic identities/tokens in tests; generic denial responses. CORS does not replace CSRF or authorization. No stored credential/hash change.

#### 10. Execution plan
Add regression tests; reproduce defects with isolated mocked Socket.IO/DB fixtures. Apply origin/socket changes. Run regressions in both trees plus existing suites. Inspect diff, synchronize SECURITY/AUTH/API/TESTING and audit docs.

#### 11. Commands and operations
Class B: add Jest regression fixtures. Class C: patch the two legacy boundary implementations. Existing jest commands use test mode, mocked Redis/providers and disposable Mongo replsets only. Sandbox denied local bind in initial DB/Supertest tests; retry these same local checks with sandbox escalation to allow local ephemeral listeners. Builds/audits remain DEC-001.

#### 12. Risks and trade-offs
Cross-origin clients outside existing exact list lose credentialed browser access; no such required consumer found. Revalidating broadcasts adds one DB authorization lookup per room member/event; no throughput improvement claimed. Existing access-token logout semantics remain (refresh revocation does not immediately revoke access JWT).

#### 13. Approval requirement
NOT REQUIRED: user explicitly authorized local security hardening/Class C after documentation and tests. No production execution or auth identity migration. Sandbox escalation requests permission only for disposable local test listeners.

#### 14. Validation plan
Jest regressions for anonymous/customer/admin, Bearer/cookie/auth.token, invalid/expired credentials, demotion/deletion/DB failure, no unauthorized delivery, allowed/unlisted/prefix-lookalike origins, and existing auth/cart/order/health suites. Pre-change failure must be observed. Post-change checks documented separately.

#### 15. Recovery or rollback plan
Revert only DEC-002 source/test patches if incompatible; do not deploy insecure rollback or modify data. No dependency/schema/config migration.

#### 16. Pre-execution review
WHAT I AM ABOUT TO DO: secure legacy socket room admission/delivery and exact CORS origins in both copies.
WHY I AM DOING IT: source confirms anonymous admin-room membership and unconditional credentialed CORS.
WHY THIS APPROACH: reuse persisted role checks and existing origin list; avoid incompatible identity changes.
WHAT IT WILL DO: reject unauthorized membership/delivery and unlisted CORS origins.
WHAT IT WILL NOT DO: change payments, schemas, hashes, frontend layouts, live data or deployment.
RISKS: additional per-recipient auth query; undocumented external clients may need explicit future origin review.
VALIDATION: reproduce then pass adversarial regressions and existing suites.
RECOVERY: revert audit-owned local patches; no DB rollback.
AUTHORIZATION: within user-authorized local hardening; production operations excluded.

#### 17. Execution result
Implemented/tested exact legacy origins and authenticated admin room admission plus per-notification current-role/token revalidation in both copies. All26 security cases pass per copy; no financial/schema change.

#### 18. Verification evidence
Initial baseline DB/HTTP tests encountered sandbox listen EPERM; this is an environment failure, not a regression verdict.

Final2026-10-18 evidence: Before fix14/14 socket regressions fail;6/10 CORS cases fail (4 valid origins already pass). Final full suites: B2C17/177, original6/40, including adapter failure/spoofed role. No repository browser socket consumer found. Distributed adapter/load/deployed state unverified.

#### 19. Deviations
None.

#### 20. Remaining risks
Source fallback PIN/session/vault secrets, legacy idempotency/stock/payment races and vault durability require separate decisions. Existing priority order preserved.

#### 21. Final status
VERIFIED (bounded local scope; remaining risks above remain open)


### DEC-003 — Compatible production dependency remediation

**Status:** VERIFIED  
**Category:** Security / Dependencies  
**Priority:** P0  
**Risk:** MEDIUM  
**Date:** 2026-10-18  
**Related decisions:** DEC-001, DEC-002  
**Related FLOW.md section:** Sections 2, 16–18

#### 1. Problem statement
Fresh production-dependency audits show critical advisories in the original backend and both original frontends. B2C frontend/backend currently report zero production vulnerabilities.

#### 2. Evidence
2026-10-18 npm audit --omit=dev --ignore-scripts --json: backend 8 (1 critical/3 high/4 moderate), frontend_appview 9 (1 critical/7 high/1 moderate), frontend_responsive 5 (1 critical/4 high). Registry marks Next 16.4.2 as a compatible fix. xlsx has no registry fix; uuid remediation requires a major version change.

#### 3. Current behavior
Original frontends install Next 16.2.x. Backend locks contain vulnerable compatible transitive dependencies. Baseline original frontend build/types pass despite 58 pre-existing lint errors; alternate types/lint pass (two warnings). Original backend existing tests pass.

#### 4. Proposed decision
Update original frontends to registry-reported patched Next/eslint-config-next 16.4.2, and apply npm audit fix without --force in original backend. Preserve xlsx and uuid until their compatibility migrations are separately designed; do not modify B2C's clean dependency sets.

#### 5. Alternatives considered
Force-updating all packages risks breaking CommonJS uuid and export behavior. Removing Excel exports to eliminate an advisory changes functionality. Compatible targeted updates plus explicit residual findings preserve working flows.

#### 6. Selected approach and rationale
Use existing npm lockfiles/toolchain, explicit Next patch target and compatible backend remediation. Inspect resolved diff and audit results, then rerun app builds/types and backend tests.

#### 7. Expected outcome
Remove registry-fixable critical/high production dependency advisories in these scopes without rewriting APIs/UI. Residual unpatched xlsx and incompatible uuid are documented.

#### 8. Scope of impact
frontend_appview and frontend_responsive package.json/package-lock.json/node_modules; backend package-lock.json and possibly manifest only if npm updates compatible entries. No deployment, schema, payment or data operation.

#### 9. Security and data implications
Registry lookup/install only; --ignore-scripts prevents dependency lifecycle execution. Dependencies are not security certification. No environment/customer data copied.

#### 10. Execution plan
Record decision; inspect backend audit-fix dry-run; explicitly install patched Next/eslint-config-next in each original frontend with --ignore-scripts; apply backend compatible audit fix; inspect changes, rerun production audits, builds/typechecks and backend suite.

#### 11. Commands and operations
Class C: npm audit fix --dry-run --ignore-scripts --json (preview); npm install --ignore-scripts next@16.4.2 eslint-config-next@16.4.2 in each original frontend; npm audit fix --ignore-scripts in backend and both original frontends, without --force. Each changes local dependencies/locks only, never production. Use registry access escalation if sandbox DNS prevents execution. Existing validation commands stay local/disposable.

#### 12. Risks and trade-offs
Next minor-version upgrade may reveal framework/compiler compatibility issues. Preview audit operations may include dev packages; inspect results. xlsx remains an unresolved high advisory and uuid remains moderate if incompatible.

#### 13. Approval requirement
NOT REQUIRED for this documented user-authorized Class C local dependency hardening. No major uuid migration or Excel replacement is authorized by this decision.

#### 14. Validation plan
Reaudit production packages, inspect package/lock diff, rebuild both original frontends, rerun tsc/lint and full original backend isolated tests. B2C dependencies/source remain unchanged.

#### 15. Recovery or rollback plan
Restore only DEC-003 package/lock changes from the known clean baseline and reinstall locked versions if checks fail; do not commit/deploy. Keep failure/deviation evidence.

#### 16. Pre-execution review
WHAT I AM ABOUT TO DO: update the two original Next app dependencies to patched16.4.2 and compatible original-backend dependencies.
WHY I AM DOING IT: fresh npm audits report critical/high vulnerabilities.
WHY THIS APPROACH: explicit patch target and no-force remediation avoid unnecessary migrations.
WHAT IT WILL DO: change local manifests/locks/installations and allow fresh verification.
WHAT IT WILL NOT DO: change B2C dependencies, remove exports, migrate data, upgrade uuid across majors or deploy.
RISKS: framework compatibility; residual advisories without compatible fixes.
VALIDATION: audits, builds, types/lint, isolated backend tests and diff review.
RECOVERY: restore this decision's manifest/lock edits and prior locked local installations.
AUTHORIZATION: user-authorized Class C local security hardening.

#### 17. Execution result
Implemented patched original Next/eslint16.4.2, compatible fixes, main Nodemailer10.1.2 and unused backend direct UUID removal. No --force/lifecycle scripts/deployment; B2C dependency sets unchanged.

#### 18. Verification evidence
Intermediate evidence before the bounded extensions below: original backend40/40; original/alternate production builds and typechecks pass. Production audits then had0 critical; backend1 moderate UUID, main frontend2 high (Nodemailer/XLSX), alternate and B2C scopes0. Final results below supersede these intermediate advisory counts. Development advisories remain.

**Bounded extension recorded before execution (2026-10-18):** compatible npm audit fix leaves Nodemailer9.x vulnerable. Read-only npm view reports10.1.2, Node>=20 (local22.12 satisfies). WHAT I AM ABOUT TO DO: add a no-network stream-transport regression exercising the actual enquiry handler/MIME assembly, then install nodemailer10.1.2 with --ignore-scripts in frontend_appview. WHY: registry advisories remain across9.x. WHY THIS APPROACH: preserve createTransport/sendMail API and mail contract; verify the major dependency change with real MIME compilation and build/types. WHAT IT WILL DO: update local Nodemailer manifest/lock/install only; no real message sent. WHAT IT WILL NOT DO: change enquiry policy/templates, vault, SMTP settings, XLSX or provider accounts. RISKS: address/MIME behavior changes in the major release. VALIDATION: fake vault/geo plus real stream transport, admin regressions, typecheck/build and fresh production/all-dependency audits. RECOVERY: restore only this dependency delta if compatibility fails. AUTHORIZATION: user-authorized Class C dependency hardening; no external delivery/production operation.

Final2026-10-18 evidence: Final source/manifest/lock review; all3 builds/types pass; original full40 backend and7 admin/mail tests pass. Prod audits: four scopes0, main1 high XLSX. All-dependency high/moderate counts: B2C5/0; B2C backend30/8; backend30/8; main6/0; alternate5/0. Node transitive-engine warning and main57-error lint debt remain. Registry DNS retries/alternate build-lock failure recorded.

#### 19. Deviations
After compatible remediation, Nodemailer required the separately pre-recorded10.1.2 extension above. Further source inspection found **no uuid/UUID references anywhere in backend except its manifest/lock** (rg excludes node_modules and generated logs). Before execution: remove the unused vulnerable direct dependency with `npm uninstall --ignore-scripts uuid` rather than a major migration with no consumer. Expected impact: backend manifest/lock/install only; no source/data/API change. Risk: undocumented external scripts outside this repository cannot be assessed. Validation: full40-test suite and repeat production/all-dependency audits. Recovery: restore only this dependency delta. Authorization: documented user-authorized Class C unused-dependency/security cleanup, no --force/production action.

#### 20. Remaining risks
xlsx has no registry fix; development tool advisories remain. Provider/deployed exploitability is UNKNOWN.

#### 21. Final status
VERIFIED (bounded local scope; remaining risks above remain open)


### DEC-004 — Fail-closed original admin configuration and input validation

**Status:** VERIFIED  
**Category:** Security  
**Priority:** P0 (partial S03)  
**Risk:** MEDIUM  
**Date:** 2026-10-18  
**Related decisions:** DEC-001–003  
**Related FLOW.md section:** Sections 6–8, 18

#### 1. Problem statement
Original B2B admin authentication falls back to predictable source PIN/HMAC values when configuration is absent. Token parser also accepts noncanonical signature suffixes because Buffer hex decoding truncates invalid characters.

#### 2. Evidence
frontend_appview/src/lib/security/adminAuth.ts defines source fallback credentials; api/admin/auth/route.ts compares an unchecked body PIN. Consumers are api/admin/auth,data,export; studio-admin page is disabled by the existing whitelist while APIs remain reachable.

#### 3. Current behavior
Missing config still permits token generation/verification; login body type errors become public500 with error.message. Existing properly configured HMAC sessions use a seven-day payload and HttpOnly/SameSite=Strict cookie.

#### 4. Proposed decision
Remove PIN/HMAC fallback values. Missing config rejects session verification/token creation and returns generic503 on login. Validate JSON object/action/PIN type, compare PIN digests in constant time, enforce canonical token timestamp/signature, return generic parser errors and private/no-store for auth responses. Preserve configured token format/cookie and logout.

#### 5. Alternatives considered
Throwing at module load would break public-site builds and unrelated routes. Replacing auth provider or rekeying the vault risks unrelated data/identity changes. Fail closed at admin operations only; keep vault migration separate.

#### 6. Selected approach and rationale
Use existing crypto and NextResponse, without dependencies or identity changes. Read installed Next route-handler/auth docs before edits.

#### 7. Expected outcome
Unconfigured admin APIs cannot authenticate; configured sessions/login continue; malformed tokens and bodies fail without internal error detail.

#### 8. Scope of impact
Only original B2B adminAuth.ts, api/admin/auth/route.ts and a Node regression file. No vault/encryption/data, B2C auth, page gating or UI changes.

#### 9. Security and data implications
No key rotation or stored-data writes. Existing configured secret stays untouched; source-default sessions intentionally cease authorization. Vault's separate fallback encryption key remains unresolved to avoid stranding historical data.

#### 10. Execution plan
Add regressions and reproduce missing-config/malformed-token issues; patch helper/handler; run tests, scoped lint, types and original frontend build.

#### 11. Commands and operations
Class B add Node tests using existing TypeScript and Next dependencies; node --test tests/admin-auth.test.cjs executes helpers/handlers with isolated synthetic env/request data, no listener/provider/vault. Class C patch helper/route after reproduction. No env file writes.

#### 12. Risks and trade-offs
Operators missing explicit config lose unsafe default admin access and must supply existing ADMIN_PORTAL_PIN and ADMIN_SESSION_SECRET in their own environment before release. General process-local limiter and shared-PIN accountability remain.

#### 13. Approval requirement
NOT REQUIRED for documented local security hardening under the current request. No live credential change or vault migration. Encrypted vault rekeying needs a separately reviewed recovery proposal and production approval.

#### 14. Validation plan
Configured and unconfigured helpers; valid/invalid/expired/noncanonical tokens; configured login/logout and invalid payloads; no-store responses; existing failed-attempt limit. Scoped ESLint/typecheck/build.

#### 15. Recovery or rollback plan
Restore only DEC-004 helper/route/test edits if checks fail. Never restore default credentials in deployment; no persisted-data rollback needed.

#### 16. Pre-execution review
WHAT I AM ABOUT TO DO: remove original admin PIN/session fallbacks and harden token/body validation.
WHY I AM DOING IT: current source authorizes predictable defaults and accepts malformed signature suffixes.
WHY THIS APPROACH: fail closed within admin APIs, preserving configured HMAC/cookie format.
WHAT IT WILL DO: reject missing configuration and invalid input with generic private responses.
WHAT IT WILL NOT DO: rotate secrets, modify vault data, open closed pages or change B2C identity.
RISKS: unconfigured deployments need explicit operator-managed settings.
VALIDATION: reproduce and pass isolated helper/handler tests, scoped lint/types/build.
RECOVERY: restore only local patches; no database/key operation.
AUTHORIZATION: user-authorized Class C local hardening; production excluded.

#### 17. Execution result
Implemented original admin config fail-closed, canonical token/body/PIN validation, generic errors and private/no-store auth responses. Vault key/data/config and page availability unchanged.

#### 18. Verification evidence
No earlier verification recorded.

Final2026-10-18 evidence: New admin tests fail4/5 before correction, then5/5 pass; combined actual-handler/no-network-MIME suite7/7 pass. Audit-owned production/test scoped lint clean; full build/types pass. Existing configured HMAC/cookie/login/logout/rate boundaries retained. No real account/customer/vault records touched.

#### 19. Deviations
None.

#### 20. Remaining risks
Vault key/durability, shared PIN accountability, distributed limiter and deployed config remain UNKNOWN/open.

#### 21. Final status
VERIFIED (bounded local scope; remaining risks above remain open)

## 6. Execution History

- 2026-10-18: read attached request, root instructions and initial project-memory/source inventory; created root entry points before baseline execution.
- Baselines: initial sandbox listener/DNS failures retried with local/registry permission; old defects reproduced before source changes.
- Applied DEC-002; complete backend regressions passed. Applied DEC-003 compatible updates, then documented Nodemailer/unused-UUID extensions before each operation. Applied DEC-004 only after pre-fix regressions.
- Final local evidence: all3 builds/types,88 B2C client,177 B2C backend,40 original backend,7 admin/mail; original whole lint remains57 errors/108 warnings, dev/XLSX advisories remain. No deploy/live data/key/asset change.
- Final diff/inventory/documentation consistency checks recorded after execution below.
- Final2026-10-18: git diff --check clean; node --check inventory/both socket files passes; mirrored origin/socket/security-test implementations match; dry-run inventory matches stored870/42/6/116/25 counts; every inventoried asset/page path exists; all audit-local Markdown links resolve; required root sections and21 fields for each DEC-001–004 confirmed. No unexpected next-env or deployment/asset/configured-data edits remain.

## 7. Rejected and Superseded Decisions

Rejected alternatives: trusting JWT roles or connection-only socket checks; throwing admin-config errors at module import; npm --force/unsupported UUID major upgrade; deleting/export-removing XLSX; automatic asset dedupe or vault rekeying. Reasons are recorded in DEC-002–004 and audit report. Actual failed sandbox/DNS/build-lock and pre-fix test attempts are preserved in TESTING. Historical decisions remain in docs/DECISIONS.md.

## 8. Outstanding Approvals

No action is currently awaiting user approval. Production/destructive/payment/vault-key operations were not executed; they require a dedicated concrete proposal, recovery evidence and explicit authorization under the attached Part5 gate before execution.

## 9. Unverified Assumptions

Hosted application health, real provider flows, backups/restore, database privileges/network access and deployed config are UNKNOWN. No assumption is treated as verification.

## 10. Current Risks and Follow-up Actions

Current results and unresolved risks are in docs/audit/REPOSITORY_AUDIT.md. S02/exact CORS fixed, S03 partial; legacy money/vault/production/tooling risks remain. Existing prioritized [TODO](docs/TODO.md), [security](docs/SECURITY.md) and [memory conflicts](docs/MEMORY_GAP_AUDIT.md) remain in force.

## 11. Links to FLOW.md and Supporting Documentation

- [FLOW.md](FLOW.md)
- [Project context](docs/PROJECT_CONTEXT.md), [status](docs/CURRENT_STATUS.md), [architecture](docs/ARCHITECTURE.md), [stack](docs/TECH_STACK.md)
- [Historical decisions](docs/DECISIONS.md), [testing](docs/TESTING.md), [deployment](docs/DEPLOYMENT.md)

## Supporting audit references

[Repository audit](docs/audit/REPOSITORY_AUDIT.md), [route inventory](docs/audit/ROUTE_INVENTORY.md), [npm evidence](docs/audit/dependency-audit.json), [current schema](docs/database/CURRENT_SCHEMA.md), [target schema decision](docs/database/TARGET_SCHEMA.md), [relationships](docs/database/RELATIONSHIP_MAP.md), [index review](docs/database/INDEX_RECOMMENDATIONS.md), [migration boundary](docs/database/MIGRATION_PLAN.md), [rollback](docs/database/ROLLBACK_PLAN.md), [database validation](docs/database/VALIDATION_RESULTS.md), [assets](docs/assets/ASSET_INVENTORY.md), [folder map](docs/assets/ASSET_FOLDER_MAP.md), [migration log](docs/assets/ASSET_MIGRATION_LOG.md), [image report](docs/assets/IMAGE_OPTIMIZATION_REPORT.md).
