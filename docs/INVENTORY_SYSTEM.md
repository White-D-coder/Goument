# Inventory System

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Current authority and lifecycle

Product.inventory and variants[].inventory are nonnegative Number fields. Adding to Redis cart checks availability, without reservation. Checkout decrements stock in a Mongo transaction. Product-level filter includes inventory >= quantity. Variant filter uses SKU at parent level and stock condition in arrayFilters; returned parent document can exist even if no variant element met the stock condition. Review matched modification behavior before claiming oversell protection.

A15-minute BullMQ job restores pending-order quantities then writes expired. Failure/canceled webhook calls separate restore implementation then writes cancelled. Both read status before updates; no atomic claim or shared release ledger exists. Per-item errors are logged and processing can continue to terminal status. Duplicate/concurrent jobs or worker/webhook races can double-restore, partially restore or confirm released stock.

No inventory movement ledger, supplier replenishment workflow, reservations collection or reconciliation tooling found. Required before commerce activation: conditional variant guard, atomic state/release coordination and failure tests. Exact desired backorder/partial fulfillment policy UNKNOWN.

Sources: product.model.js; cart.service.js; order.service.js; order.worker.js.

## Quantities, adjustment and restoration contract

| Concept | Current implementation | Missing / unknown |
| --- | --- | --- |
| Stock quantity | Product.inventory or matched variant.inventory | No separate on-hand vs available vs reserved columns |
| Cart quantity | Positive integer validator; check current stock | Cart is not reservation; quantities can become stale |
| Checkout reservation | Immediate decrement inside order transaction, pending order holds reservation implicitly | No dedicated reservation identity/expiry ledger |
| Manual adjustment | Admin generic product PUT can change inventory/variants | No adjustment endpoint, reason, audit event or reconciliation |
| Negative prevention | Schema min0; product checkout query inventory>=quantity | Variant array-filter null-check gap; direct updates and concurrency need tests |
| Restoration | Service loops then cancelled; worker loops then expired | No exactly-once claim; partial item failure can still terminally mark order |
| Out of stock | Cart/checkout can reject400; inactive/missing Product404 | Catalogue visibility not generally stock-filtered |
| Low stock | No configured threshold/alert worker found | UNKNOWN U11: threshold, recipients, backorder/partial fulfillment policy |
| Refund/return | No linked stock action | Do not infer cancellation/refund implies resale-ready return |

SKU changes or product removal between order and restore can mean query matches nothing; returned values are not checked for every restore. Worker catches each item error and continues; once marked expired, a later job skips whole order. Payment success racing release can create confirmed order without reserved stock or expire a paid order. These are inferred source risks, not reproduced incidents. Future fix needs coupled order eligibility and inventory effects, not an arbitrary retry count.

Authoritative inventory is Mongo product data, not frontend box capacities, local cards, Redis cart or UI availability labels. Operational recovery and movement history are NOT IMPLEMENTED.

## B2C database increment — 2026-09-28

Inventory is authoritative per variant; zero initial balance plus movement ledger, optimistic versions, transactional reservation/sale/release/restock/return/adjustment and payload-bound keys implemented. Last-stock concurrency verified. Reservation expiry/return authorization/operational reconciliation remain partial.
