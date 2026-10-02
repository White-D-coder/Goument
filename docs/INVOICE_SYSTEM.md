# Invoice System

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

No Invoice model, invoice route, invoice PDF generator or numbering service found. XLSX admin export is an analytics report, not an invoice.

Number sequence, seller/business fields, tax identifiers, customer/seller snapshots, issue/cancel/correction lifecycle and PDF format are UNKNOWN. Historical accuracy is REQUIRED by user instruction. Future implementation must reference Order/User and preserve purchase-time information; do not fabricate invoice numbers or tax policy. See ORDER_SYSTEM, DATA_MODELS and FINANCE_SYSTEM.

## Implementation boundary

CURRENT / IMPLEMENTED foundation: Order._id, User ref, price/quantity/boxing/address snapshots, discount/tax/shipping/total/currency and paymentIntentId. CURRENT / PARTIAL historical source: product name/seller/tax line snapshots absent. NOT IMPLEMENTED: Invoice model, sequence, issue endpoint, PDF/storage/download, correction/cancellation or customer invoice history.

## FUTURE / REQUIRED architecture responsibilities (not approved schema)

| Concern | Required relationship / preservation goal | UNKNOWN decision |
| --- | --- | --- |
| Identity/number | Stable invoice identity linked to originating order/customer; distinguish identifier from displayed number | Number series, legal/business constraints, uniqueness scope, numbering timing |
| Order/customer | Record issuing order reference and customer identity; access must follow ownership/approved staff permissions | One/many invoices per order, split deliveries and identity correction rules |
| Seller/customer snapshot | Preserve names/contact/address/business identifiers at issuance, independent of live profile | Required fields, seller entity, GST/business policy U05 |
| Items | Snapshot descriptions/SKU/quantity/unit amounts/boxing, not mutable product lookup | Line structure and missing historical-data remediation |
| Discounts/tax/shipping | Preserve allocation and totals/currency at issue time | Tax rates, allocation/rounding, shipping treatment U03/U04 |
| Payment state | Link actual verified payment evidence without treating UI confirmation as settlement | Paid/unpaid issue trigger, partial payments, settlement semantics |
| Generation/storage | Reproducible document version and protected access; retain original historical record | PDF engine, storage/provider, signed-download mechanism, retention |
| Correction/cancellation | Preserve original and trace permitted changes rather than mutate history silently | Required document/state types and authorization U06 |

These are design constraints for a future system, not fabricated APIs/models. Download access, cancellation rules, staff permissions and backup/restore are UNKNOWN. No migration should fill historical seller/product names from today's values as if purchase-time facts. Next documentation step: obtain business/accounting answers U03/U05/U06, then draft approved lifecycle and traceability before implementation.

## B2C database increment — 2026-09-28

Draft invoice schema, frozen content and ADMIN/OWNER issuance transaction implemented. Issued number/date/document URL immutable; one invoice per order. Numbering, seller tax/legal requirements, PDF production and credit-note workflow remain UNKNOWN/partial.
