# Target schema decision

2026-10-18, DEC-001: **No schema restructuring proposed or executed.** Current25-collection B2C model already separates identities/customer profiles, addresses, purchasable variants, stock ledger, frozen orders and operational financial records. Reformatting these relationships has no established business benefit.

CURRENT / IMPLEMENTED source shape: [CURRENT_SCHEMA](CURRENT_SCHEMA.md), [generated metadata](schema-inventory.json), canonical [DATABASE](../DATABASE.md)/[DATA_MODELS](../DATA_MODELS.md). FUTURE / REQUIRED: resolve actual deployed index/validator state, backup restoration and authoritative operations before any schema rollout. No retention, merge, refund or legal invoice policy invented.

A future change must map every producer/consumer, existing history, cardinality, indexes, validators, API, reporting and test impact and record its target under a dedicated root decision before generating a migration.
