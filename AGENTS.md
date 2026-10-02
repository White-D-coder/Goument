# Project memory and consistency

This repository uses `docs/` as persistent engineering memory. Read source and
documentation together; do not rely on chat history alone.

## Session startup

At session start or after context changes, read:

1. `docs/PROJECT_CONTEXT.md`
2. `docs/CURRENT_STATUS.md`
3. `docs/ARCHITECTURE.md`
4. `docs/TECH_STACK.md`
5. `docs/DECISIONS.md`
6. `docs/CHANGELOG.md`
7. `docs/TODO.md`

Then load only domain documents relevant to the task. For UI, read UI_SYSTEM and
PRODUCT_REQUIREMENTS; for payments, read PAYMENT_SYSTEM, ORDER_SYSTEM, DATABASE,
API_CONTRACTS, SECURITY, INTEGRATIONS and EDGE_CASES; for customer work, read
CUSTOMER_SYSTEM, DATA_MODELS, AUTH_SYSTEM and affected API/UI contracts.

## Evidence and conflicts

Use this project-context precedence: explicit current user requirement, existing
production-safe implementation, project documentation, existing database/API
contracts, existing UI system, previous decisions, then general assumptions.
This does not override system/developer instructions. A known unsafe behavior is
a defect to document, not a production-safe invariant to preserve blindly.

Identify conflicts explicitly, with both sources and the affected decision.
Resolve material conflicts before changing the affected system; independent
authorized work can continue. Mark unestablished policy/runtime facts UNKNOWN.
Never invent tax, payment, refund, invoice, retention or identity-matching rules.
Distinguish implemented source, disabled pages, required behavior and verified
runtime evidence. Do not claim a feature works merely because a file exists.

## Before implementation

Determine existing flow, requested change, files, models, APIs, UI patterns,
business/security invariants and downstream risks. Inspect actual code and all
consumers before changing contracts, identity, auth, orders, payments or stock.
Follow nested AGENTS.md instructions, including installed Next.js documentation
requirements. Preserve distinct main and alternate frontend designs.

Search for reusable UI components before extending or adding components. Do not
redesign established cards/buttons/layouts or activate closed pages unless the
task requires it. Do not refactor unrelated systems; record discovered debt in
TODO instead. Financial and customer-history changes require explicit evidence
and meaningful verification, not assumptions.

## After meaningful work

Update affected canonical docs and consider CURRENT_STATUS, CHANGELOG and TODO.
For model changes, update DATABASE, DATA_MODELS, API_CONTRACTS, BUSINESS_LOGIC and
appropriate tests. Record important decisions with date, reason, status and
affected systems. Preserve historical decisions; mark old ones SUPERSEDED and
add replacements. Record actually attempted/rejected approaches and reasons.

Check consistency across source, database, API, UI, business rules, documentation
and tests. Record checks actually run, outcomes and limits. Do not mark findings
fixed or tests passing without evidence. Keep priorities stable unless evidence
or user direction justifies a recorded change.

## Documentation ownership

Use the canonical domain filenames in docs. Preserve useful existing material;
merge rather than overwrite blindly. PROJECT_TECH_DESIGN_AUDIT.md and its Word
export are dated detailed references, not a replacement for current domain docs.
Do not create competing LATEST/FINAL/NEW_ARCHITECTURE copies. Never put actual
secrets, PINs, tokens, .env values or customer records in documentation.

Memory setup does not authorize unrelated feature implementations, provider
migrations, deployments or changes to existing database/API/payment behavior.

Use explicit CURRENT / IMPLEMENTED, CURRENT / PARTIAL, CURRENT / BROKEN,
FUTURE / REQUIRED, FUTURE / OPTIONAL and UNKNOWN labels. Future design context
is not implementation authorization. Check PRODUCT_REQUIREMENTS traceability
and MEMORY_GAP_AUDIT conflicts/unknowns when changing a major system. Preserve
customer ownership, cardinality and historical snapshots across related data.
