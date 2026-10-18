# Recovery and rollback boundary

CURRENT / IMPLEMENTED audit changes2026-10-18 (DEC-001–004) are local source/dependency/documentation edits. Preserve the review diff and restore only those edits if needed; never discard pre-existing/user work. To restore dependencies, restore corresponding manifests/locks then use the existing app's npm ci after reviewing lifecycle policy. No database, provider, encryption-key or deployment state was changed.

**UNKNOWN:** an exercised recovery of configured production databases or encrypted vault. A Git revert is not a database/key rollback. Do not claim data is recoverable until a safe restore has been performed.

FUTURE / REQUIRED for schema/key/data changes: owner-approved backup location/access, consistent encrypted snapshot and required key custody, disposable restore rehearsal, old/new app compatibility, exact rollback trigger, record/invariant reconciliation and preservation of orders/payment/customer history. Financial compensation must be policy-approved; never delete captured-money receipts or overwrite history to force a clean rollback. Vault fallback removal/rekeying must prove old records can be read and restored before any write/key change.
