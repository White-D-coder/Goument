# Document relationship map

CURRENT / IMPLEMENTED, source/disposable tests reviewed2026-10-18 under DEC-001. This is MongoDB, not a relational FK schema; references are application-validated. [FLOW diagram](../../FLOW.md#9-database-entity-and-data-flow) and [exact metadata](schema-inventory.json).

| Relationship | Cardinality / boundary |
| --- | --- |
| User → Customer | Optional unique userId; staff can lack Customer; profiles are not matched automatically by email/phone |
| Customer → CustomerAddress | One-to-many; default address partial-unique constraints; order receives an immutable copy |
| Product → ProductVariant | One-to-many, unique global SKU; variants own current price |
| Category → Product | Product categoryIds array; category parent reference forms hierarchy |
| ProductVariant → Inventory | One-to-one unique variantId and SKU; only authoritative stock pool |
| Inventory → InventoryTransaction | One-to-many append-only movements; operationKey unique for dedupe |
| GiftDraft → Order | Browser cookie-owned draft, not Customer-owned; order stores draft/revision checkout snapshot after ownership+quote validation |
| Customer → Order | One-to-many, user request idempotency scoped to customer; frozen customer/address/item/money snapshots preserve history |
| Order → Payment | One-to-many attempts; provider identity/indexes and request-key uniqueness |
| Payment → PaymentEvent / Refund | One-to-many events/refunds; independent dedupe/reserved-refund guards |
| Order → Invoice | Existing v1 one-invoice-per-order constraint; legal numbering/correction policy separate |
| Order → Shipment / FinanceEvent | One-to-many; finance receipts append-only, reversals add records |
| Customer → AuditLog / Notification | Historical/operational reference; retention/deletion policy remains UNKNOWN |
| Coupon → CouponRedemption → Order | Usage history and synchronized counter, one redemption per order |
| User → AdminCommand | Actor-scoped command receipts and audit; rate buckets store hashed identifiers |

Legacy embedded variants/addresses/Redis carts and the encrypted enquiry vault are separate contracts. No cross-store foreign key, identity merge, migration or cascade deletion exists because this audit adds no such behavior. Detailed source field/index maps remain canonical DATA_MODELS.
