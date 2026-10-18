# Asset migration log

2026-10-18, DEC-001: **No asset migration performed.**870 media/font files inventoried;202 exact-content duplicate groups. No files moved, renamed, deleted or recompressed; established public paths preserved.

One confirmed missing literal: frontend_appview/src/features/hero/OtherProductsSection.tsx → /images/Category_image/Classics/thumb.jpeg. Source search finds no importer of OtherProductsSection; existing constants refer to thumb.png. CURRENT / PARTIAL: stale source reference, not a demonstrated active-page failure. Product-photo equivalence is UNKNOWN; no automatic substitution.

Future migration requires its own pre-execution decision, exact old→new path map, imports/CSS/metadata/dynamic/external-reference review, bounded batch, build/browser checks and rollback restoring old paths. A missing static reference is not evidence an asset can be deleted. Historical B2C image changes remain in canonical UI_SYSTEM/PERFORMANCE/CHANGELOG.
