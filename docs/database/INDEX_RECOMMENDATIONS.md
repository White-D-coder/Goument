# Index review

CURRENT / IMPLEMENTED source:25 B2C collections,103 explicit indexes,33 explicit unique constraints (128 indexes/58 unique including implicit _id). [Generated keys/options](schema-inventory.json); canonical [DATABASE](../DATABASE.md). Existing disposable tests assert schema indexes, uniqueness, stock/idempotency and ownership behavior.

2026-10-18, DEC-001: **No index added/dropped or installed on configured databases.** Workload/index usage statistics and explain plans are UNKNOWN. Existing indexes match named catalogue/status/createdAt cursor, owned history, variant stock, request/provider dedupe and expiry access patterns in source; this does not establish production efficiency.

FUTURE / REQUIRED: with approved read-only staging/production access, capture representative query filters/sorts, bounded result counts, winning/examined plans, collection/index sizes and write overhead. Check legacy Atlas search count/category issues separately. Recommend additions/removals only with workload evidence and explicit rollout/recovery. TTL indexes clean expired records asynchronously and never replace expiry authorization checks.
