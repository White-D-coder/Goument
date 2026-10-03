# Order System

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Current states

Enum: pending, confirmed, processing, shipped, delivered, cancelled, expired. Creation defaults pending. Implemented transitions: pending→confirmed on success webhook; pending→cancelled on failure/canceled event through release service; pending→expired via15min worker. No complete transition API for processing/shipped/delivered, customer cancellation or refunds found. Enum membership is not permission to set a state arbitrarily.

## Relationships and snapshots

Order.user→User; items.product→Product. Embedded variant SKU/name, unitPrice/totalPrice, quantity, boxing surcharge, gift message/from, imagePublicId; shipping/billing address copies. Header contains subtotal after discount, discount, shippingCost, tax, total, currency, coupon, requested delivery date, recipient, trackingNumber, notes, paymentIntentId and unique idempotencyKey.

No product-name snapshot, invoice relation, separate payment ledger or refund records. Preserve existing embedded snapshots; extending historical data requires explicit migration/backfill behavior.

## Lifecycle

Server cart validation → coupon/tax → stock decrement and order in transaction, Stripe intent inside transaction → commit → clear cart → schedule release. Cross-service effects aren't atomic. Read-by-ID checks owner/admin; list is scoped to user. Main UI checkout is disabled.

E01–E08 in EDGE_CASES capture concurrency, stock, coupon and money gaps. Sources: backend/src/features/order/*; API contract example in API_CONTRACTS.

## Checkout responsibilities and order creation

| Stage | Actual responsibility / sequence | Limit |
| --- | --- | --- |
| Authentication | Express auth loads User; controller requires Idempotency-Key | Gated account's local authenticated boolean is not credential proof |
| Address input | Client sends shipping/billing; express-validator requires fullName,line1,city,state,postalCode,country,phone; optional recipient email/date validated | No carrier/serviceability or address authenticity check |
| Cart | Server reads user's Redis cart; rejects empty | Browser state not input to order directly |
| Pricing | Reads active Product, optional variant price and boxing option | Unknown box falls back to supplied cart surcharge; variant boxing availability not authoritative |
| Discount | Validates coupon before Mongo transaction | Restricted snapshot mismatch, concurrency usage limits unresolved |
| Shipping | Accepts payload shippingCost, defaults0 | No validator/rating provider; authoritative rate NOT IMPLEMENTED |
| Tax | Stripe Tax over item totals before discount; documented fallback | Business tax policy UNKNOWN |
| Inventory | Session transaction decrements each stock record | Variant match guard risk; retry max3 for WriteConflict/code112 |
| Payment | Stripe intent called inside transaction, amount finalTotal/inr | External effect not rolled back; no provider request idempotency option |
| Order | Save pending Order with embedded snapshots; commit | Mongo _id is ID; no durable human order-number sequence |
| Post-commit | Clear server cart, then enqueue15min release; return orderId/clientSecret | Clear/queue failure can occur after committed order; no outbox recovery |
| Browser display | Existing gated page ignores clientSecret and declares completion, even in catch | CURRENT / BROKEN; not verified payment or stored order |

## State-transition table (implemented transitions only)

| Current | Trigger/guard | Next | Side effects / missing guarantees |
| --- | --- | --- | --- |
| No order | Successful checkout transaction | pending | Inventory decremented; intent ID stored; queue scheduled after commit |
| pending | Signed payment_intent.succeeded matching paymentIntentId | confirmed | Save then remove job, increment coupon, notify; not atomic |
| pending | Signed payment_intent.payment_failed or payment_intent.canceled | cancelled | Restore each item then save; remove delayed job; no refund issued |
| pending | Delayed worker sees pending | expired | Restore items then save; provider intent cancellation not called |
| confirmed/processing/shipped/delivered/cancelled/expired | Same handled webhook type | unchanged by pending-only logic | Late success on expired/cancelled has no recovery path |
| Any | Customer cancel / fulfillment update / refund command | NOT IMPLEMENTED | No corresponding order mutation route found |

processing/shipped/delivered are allowed enum values and report filters, not implemented transition services. Do not add arbitrary transitions. No human invoice/order numbering should be inferred from frontend ORD_ timestamp fallback. Invoice/refund/payment-ledger relations are MISSING; one order has one stored paymentIntentId field, not full attempt history.

## Shipping system — CURRENT / PARTIAL

Implemented fields: shippingAddress, billingAddress, shippingCost, recipient, requestedDeliveryDate, trackingNumber, status values shipped/delivered. ShippingCost defaults0 from client body; no shipping rate calculation, zones, carrier, shipment entity, dispatch/tracking webhook, delivery confirmation endpoint, return workflow or customer cancellation API found. All those are NOT IMPLEMENTED.

The gated success UI says2–3 business days, but no source establishes a fulfillment promise/policy. UNKNOWN U04: serviceability, charge ownership, carrier, transit dates, multi-address/partial shipment, cancellation and returns. FUTURE / REQUIRED documentation must establish ownership and state effects before implementing a shipping system. A return is not automatically a refund or inventory restoration.

Sources: `backend/src/features/order/order.service.js`, `backend/src/features/order/order.controller.js`, `backend/src/features/order/order.worker.js`, `frontend_appview/src/app/checkout/page.tsx`.

## B2C database increment — 2026-09-28

Order snapshots, line/header arithmetic, graph guards, payload-bound creation and cursor history implemented. Capture atomically confirms order with reserved stock and payment/finance effects. Quote calculation, unified checkout/cancellation saga and fulfillment integration remain partial.

## 2026-09-30 — Razorpay gateway adapter

CURRENT / IMPLEMENTED: B2C/backend/payments adds Razorpay REST order creation, timing-safe Checkout HMAC and raw-webhook HMAC verification, provider payment fetch/matching and existing transactional capture integration. Authenticated endpoints use customer-owned immutable priced orders with fully reserved variants; browser amounts are rejected. One stable payment attempt/receipt plus a persistent initialization claim prevents duplicate create calls; ambiguous timeouts require reconciliation. Callback/webhook share one capture identity for exactly-once stock/order/payment/finance effects. New checkout component opens hosted Standard Checkout, handles dismissal/pending/error and reads persistent payment status. Account history links to owned order checkout.

CURRENT / PARTIAL: gift draft→priced/reserved order bridge, real prices/box charges, GST/shipping policy, durable failed-event recovery/reconciliation, reservation expiry and refunds remain pending. Gift-draft payments are not activated. Razorpay keys absent; blank server-only entries added to ignored .env and .env.example. No actual provider charge or public webhook delivery tested. Legacy Stripe preserved. See [payment setup](../B2C/backend/payments/README.md) for official references, routes and failure limits.

Verification: all49 database/auth/gifting/Razorpay tests passed across4 suites. New8 payment cases use temporary MongoDB, real HMAC checks and mocked Razorpay I/O. Production build, TypeScript and ESLint passed.
