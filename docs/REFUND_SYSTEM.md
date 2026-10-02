# Refund System

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

No Refund model, provider refund call, refund webhook handler or approval endpoints found. Order cancelled/expired is not evidence of refund processing.

User memory policy requires idempotent refund behavior. Requested→approved→processing→completed or requested→rejected is a conceptual workflow, not current implementation. Eligibility, amount limits, partial refunds, shipping/tax treatment, approval roles and stock-return behavior remain UNKNOWN. Establish them before coding. See PAYMENT_SYSTEM, INVENTORY_SYSTEM and FINANCE_SYSTEM.

## CURRENT / NOT IMPLEMENTED

No refund request entity/API, approval role, payment refund SDK call, refund webhook, refund amount history or retry worker found. pending→cancelled/expired releases inventory but does not return money. There is no persisted refundableAmount. Order enum has no refunded status.

## FUTURE / REQUIRED relationships and responsibilities

| Concern | Design responsibility | Unknown business boundary |
| --- | --- | --- |
| Request | Correlate customer, order, original verified payment and reason; preserve request identity | Eligibility window, required evidence and who can request |
| Authorization | Explicit permission on each action, distinct from hiding UI | Owner/admin/operations approval policy U07/U10 |
| Amount | Store currency and requested/approved/completed amounts with payment correlation | Refundable shipping/tax/discount allocation and partial/full rules |
| Bounds | Avoid refunding more than eligible paid amount after prior successful/in-flight operations | Definition of eligible amount and treatment of pending/failed refunds |
| Gateway execution | Stable operation identity and provider reference; verify external response | Retry/cancellation/reconciliation policy U08 |
| State | Distinguish request, decision, provider processing, success/failure | Exact enum/transitions are not approved; illustrative states are not current code |
| Idempotency | Duplicate request/event/retry must not create duplicate financial effect | Storage/locking/event ledger design not selected |
| Failures | Preserve attempts and reconcile provider success vs internal timeout | Who resolves ambiguous outcomes and when to retry |
| Relations | Link order/payment/customer; connect invoice corrections and financial events | Credit documents, stock return and cancellation policy remain UNKNOWN |

No automatic stock-restoration or invoice mutation follows from a refund unless separately established. FUTURE / OPTIONAL UI/admin workflow must follow explicit business permissions. Do not add endpoints or status values from this conceptual table without separate implementation instructions.

## B2C database increment — 2026-09-28

Database request reservation and completion/failure/cancel transitions implemented. Concurrent pending/completed requests cannot exceed captured money through transaction entry points; finalization updates payment/order payment state and emits one finance posting. Provider call, retry/reconciliation and approved refund policy remain partial.
