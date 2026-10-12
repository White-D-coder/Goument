## 2026-10-12 — Inclusive checkout, envelope packs and spacing (R222–R224)

CURRENT / IMPLEMENTED R223: verified capture of new gift checkout uses existing immutable FinanceEvent CREDIT once per payment. Listed gross total includes18% GST; Order stores matching net+tax allocation in paise, no extra delivery charge. Captured payment after released hold records receipt/CREDIT once and staff-review metadata without confirming order/selling stock. This is operational money history, not an approved legal invoice/accounting/refund policy. No historical totals rewritten; real provider verification remains pending.

## 2026-10-12 — Consistent card/cart display arithmetic (R220)

CURRENT / IMPLEMENTED locally: registered gift cart uses existing card/PDP amounts, replacing missing preview amounts and stale candle ranges. Quantity multiplication remains integer paise, listed prices include GST/delivery. This supersedes prior exclusion of preview figures from cart display only. No accounting/tax allocation, ledger, invoice, authoritative quote or historical money changes. Existing order/payment availability guards remain; unknown catalogue entries are not priced via generic fallback.

## 2026-10-12 — Inclusive price policy boundary (R213)

CURRENT / IMPLEMENTED storefront only: explicit current user includes GST and delivery in listed prices, superseding additive18%/delivery-planning display policy. Cart adds no separate surcharge. This is not a tax-rate0 instruction: internal GST allocation/jurisdiction and invoice treatment remain UNKNOWN pending approved accounting rules. No finance ledger, immutable order/payment amounts, historical records or database models changed. Authoritative inclusive quote/reservation remains FUTURE / REQUIRED; payment availability guards retained. BUSINESS_LOGIC/PAYMENT_SYSTEM/TESTING.

# Finance System

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

Existing backend stats aggregate order totals in confirmed/processing/shipped/delivered states and call that revenue. Currency defaults INR, amounts conventionally paise. Product has costPrice; no finance ledger/reconciliation implementation found.

Do not equate current order totals with settled funds, taxable revenue, profit or invoice value. Fee accounting, settlements, reconciliation, rounding, reporting periods, refunds and tax policy are UNKNOWN. Invoice and refund domains are unimplemented. See ADMIN_FLOWS, PAYMENT_SYSTEM and BUSINESS_LOGIC.

## Operational reporting — CURRENT / IMPLEMENTED

`backend/src/features/admin/admin.controller.js` sums Order.total for confirmed/processing/shipped/delivered into revenue, counts all orders separately and aggregates top5 products by quantity and items.totalPrice. Product names are joined from current products. activeCarts counts Redis guest/user keys except test mode. Top-product amounts use item totals before order-level discount/tax/shipping; global revenue includes total. Those metrics are not directly additive comparisons.

| Financial concept | Stored evidence | Current limitation |
| --- | --- | --- |
| Payment | paymentIntentId on Order | No attempt/event/settlement ledger; confirmed state may race external outcome |
| Subtotal/discount | Order.subtotal is after discount; discount stored separately | Do not subtract discount twice |
| Shipping/tax | Header shippingCost and tax | Shipping client-driven, tax fallback inconsistent; no verified jurisdiction/allocation |
| Order total | Post-discount subtotal + tax + shipping | Not proof captured/settled collections |
| Refund | No model or provider call | No subtraction/reversal history available |
| Fees/payouts | No persisted records | Net collections cannot be reliably derived |
| Financial event | No immutable event store | Retry/adjustment/reconciliation audit missing |
| Invoice | No implemented invoice linkage | Operational exports are not legal/commercial invoice documents |

## Formal accounting — NOT IMPLEMENTED / UNKNOWN

UNKNOWN U09: authoritative paid/captured/settled definitions, fee allocation, reporting periods/timezone, tax accounting, refund reversals, reconciliation ownership and ledger rules. Do not invent net-collection or profit formulas. FUTURE / REQUIRED design separates operational orders from verified payment/refund/settlement events and preserves references to customer/order/invoice; concrete ledger schema and accounting treatment require confirmation.

Next telemetry XLSX exports are enquiries/visitor analytics, not formal accounting. No financial export/audit assertion should be inferred from the presence of XLSX.

## B2C database increment — 2026-09-28

Append-only operational money postings with unique effect keys and linked opposite-direction reversals implemented. Capture/refund transaction postings and bounded currency/date owner reports implemented. Formal accounting, tax recognition and net-profit reporting are not implemented.
