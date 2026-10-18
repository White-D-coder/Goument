# Current schema overview

CURRENT / IMPLEMENTED: generated disconnected model metadata on 2026-10-18 under DEC-001. No database connection, schema installation or production query was performed. Detailed canonical contracts remain in [DATA_MODELS](../DATA_MODELS.md) and [DATABASE](../DATABASE.md); [complete generated fields/indexes/states](schema-inventory.json) reflect current source. Mongo references are application-validated, not database foreign keys.

| B2C model | Collection | Explicit indexes | Unique indexes | Referenced models |
| --- | --- | ---: | ---: | --- |
| User | users | 4 | 2 | embedded/standalone; see fields |
| OAuthFlow | oauth_flows | 2 | 1 | embedded/standalone; see fields |
| Customer | customers | 5 | 1 | User |
| CustomerAddress | customer_addresses | 3 | 2 | Customer |
| Category | categories | 4 | 1 | Category |
| Product | products | 4 | 1 | Category |
| ProductVariant | product_variants | 3 | 1 | Product |
| Inventory | inventory | 4 | 2 | ProductVariant |
| InventoryTransaction | inventory_transactions | 5 | 1 | Inventory, ProductVariant, User |
| Cart | carts | 3 | 2 | Customer, ProductVariant |
| GiftDraft | gift_drafts | 1 | 1 | embedded/standalone; see fields |
| Order | orders | 13 | 3 | GiftDraft, Customer, Product, ProductVariant, Coupon |
| Payment | payments | 8 | 2 | Order, Customer |
| PaymentEvent | payment_events | 3 | 1 | Payment, Order |
| Coupon | coupons | 3 | 1 | embedded/standalone; see fields |
| CouponRedemption | coupon_redemptions | 3 | 1 | Coupon, Customer, Order |
| Shipment | shipments | 4 | 0 | Order, Customer |
| Invoice | invoices | 4 | 2 | Order, Customer |
| Refund | refunds | 8 | 2 | Order, Payment, Customer, User |
| FinanceEvent | finance_events | 4 | 2 | Order, Payment, Refund, FinanceEvent |
| Notification | notifications | 5 | 1 | Customer, Order |
| AuditLog | audit_logs | 5 | 0 | User, Customer |
| AdminSetting | admin_settings | 1 | 1 | User |
| AdminCommand | admin_commands | 2 | 1 | User |
| AdminRate | admin_rate_limits | 2 | 1 | embedded/standalone; see fields |

Both legacy backend trees separately define User/Product/Category/Order/Coupon/Review, including embedded addresses/variants and Redis carts. User and auth model imports alias the same model rather than creating a seventh collection. The original B2B encrypted file vault is separate from both Mongo domains. No cross-store identity merge is established.
