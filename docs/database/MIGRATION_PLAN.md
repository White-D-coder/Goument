# Migration plan and boundary

2026-10-18, DEC-001: **No migration generated or applied in this audit.** Local changes are auth/origin logic, dependency locks, tests and documentation. They do not alter models/validators/indexes. Existing B2C install/provision/checkout migration scripts were inspected as source only; their prior execution history is separate in [DEPLOYMENT](../DEPLOYMENT.md).

FUTURE / REQUIRED before a database operation: identify exact environment/owner, deployed app versions and existing schema fingerprint; prepare backup and exercise restoration on disposable/staging data; generate bounded additive change/dry-run with record/integrity counts; map consumers and immutable snapshots; validate compatibility/concurrency; obtain explicit approval for production or destructive/data transformations; apply a small authorized batch and verify before continuing. Never run db:install/seed/provision automatically during an audit or serverless cold start.

Known production schema/index state, backup ownership and restore evidence remain UNKNOWN. Existing monetary policy is not inferred from a proposed schema. [Current schema](CURRENT_SCHEMA.md), [target decision](TARGET_SCHEMA.md), [rollback](ROLLBACK_PLAN.md).
