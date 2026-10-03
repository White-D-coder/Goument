# Payment System

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Provider and protocol

Stripe is implemented; no provider switch was requested. `stripe.js` sets API version2023-10-16 and wraps PaymentIntent/Tax calls in Opossum breakers. Secret variables: STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET (values never recorded).

Checkout returns `{success:true, orderId, clientSecret}`. Signature verification uses raw request buffer and stripe-signature. app.js mounts raw webhook before JSON parser; order router also declares it. Signed payment_intent.succeeded confirms a pending order, removes delayed job, increments coupon usage and emits new_order. payment_failed/canceled releases stock and cancels pending order. Ignored event types return `{received:true}`.

## Current protection and gaps

Unique Order.idempotencyKey plus Redis response cache exist. Redis lock is GET then SET without NX, not user/payload scoped. Stripe metadata includes idempotencyKey but SDK call does not supply it as request option. No webhook event ledger/deduplication table, amount/currency reconciliation check or atomic side-effect completion record found. Sequential pending-state guard does not establish concurrency-safe idempotency.

Worker expiry can race with success. Late payment handling/reconciliation is UNKNOWN. PaymentIntent creation within retryable Mongo transaction can leave external effects after rollback. Queue/email/socket work cannot be assumed part of DB transaction.

## Tax and finance

Order service catches tax errors with5% estimate; Stripe Tax breaker normally returns0-tax fallback instead. Country strings other than India with >2 characters become US. These are implementation facts, not approved tax rules. Business tax, settlement, refund and shipping policy remain UNKNOWN; no legal/tax recommendation is being made.

No invoice/refund/payment ledger implementation. See ORDER_SYSTEM, INVENTORY_SYSTEM, REFUND_SYSTEM and SECURITY before changes.

## Payment event and recovery matrix

| Event/situation | Internal behavior | Missing recovery / current boundary |
| --- | --- | --- |
| Intent creation succeeds | ClientSecret returned; order pending, stock deducted | No client confirmPayment/confirmCardPayment found in app source |
| Creation errors / breaker | Throws; transaction attempts rollback | Gated UI catches and invents success; no real receipt |
| Valid success + pending | Order confirmed then job removal, coupon increment, socket | Side effects after status save can fail; retry sees confirmed and skips them |
| Duplicate success sequential | Already nonpending skipped | No event-ID ledger; concurrent duplicate reads may both increment coupon |
| Invalid webhook signature |400 text signature error | No order processing; no auth cookie required |
| Success has no matching order |200 received, no action | No orphan-event persistence/retry reconciliation |
| Failure or cancellation + pending | Release stock and set cancelled | No provider refund; retry/race semantics incomplete |
| Timeout worker | Restock and expire after15min eligibility | Does not cancel gateway intent; later payment may succeed externally |
| Browser closes | Webhook independent of browser | If no gateway confirmation happened, no payment proved; UI closure not settlement |
| Paid externally, order expired/cancelled | Handler ignores due to pending guard | UNKNOWN U12 recovery/refund/escalation; no reconciler |
| Mongo transaction retries | Max3 WriteConflict attempts | New external intents possible; metadata key is not SDK idempotency option |
| Redis queue fails after commit | Handler errors with persisted order possible | No recovery/outbox and customer retry identity not assured |

No separate payment-state enum is persisted; status is an Order enum. External IDs: paymentIntentId; webhook event.id is not stored. Signature validity is not an explicit amount/currency/order-metadata match in handler. No settlement/payout records, reconciliation job, refund calls or administrative payment-resolution endpoint found.

## Tax system — CURRENT / PARTIAL

Input: item.totalPrice (unit price + boxing)*quantity in paise, shippingAddress, currency INR. Country India→IN; other strings longer than2→US; missing country falls backIN in tax helper, though endpoint requires nonempty country. Stripe Tax returns tax_amount_exclusive. Final total = max(0, items subtotal − discount) + tax + payload shippingCost. Tax input precedes discount and does not include separately submitted shipping amount. Stored tax is aggregate; tax-calculation ID/jurisdiction/rate/line allocation not saved.

Two failure paths: Opossum Tax fallback returns0 tax; outer calculateOrderTax catch returns rounded5% item subtotal if an exception reaches it. Neither is documented approved policy. Invoice/tax allocation relationship NOT IMPLEMENTED. UNKNOWN — BUSINESS/ACCOUNTING CONFIRMATION REQUIRED (U03) for jurisdiction, rates, discounts, shipping tax, rounding and failure behavior. This audit describes code and gives no tax-law advice.

Source dependency chain: order.validation/controller/service → shared/utils/stripe.js → circuitBreaker.js → provider; webhook → Order/Coupon/BullMQ/Socket.IO. Check all before any future change.

## B2C database increment — 2026-09-28

Payment-attempt schema and capture transaction implemented; provider event dedupe and content hash commit atomically with effects. Gateway adapter/signature verification/live connectivity and durable reconciliation remain partial. A failed transaction does not retain its event row. Legacy payment APIs are unchanged.

## 2026-09-30 — Razorpay gateway adapter

CURRENT / IMPLEMENTED: B2C/backend/payments adds Razorpay REST order creation, timing-safe Checkout HMAC and raw-webhook HMAC verification, provider payment fetch/matching and existing transactional capture integration. Authenticated endpoints use customer-owned immutable priced orders with fully reserved variants; browser amounts are rejected. One stable payment attempt/receipt plus a persistent initialization claim prevents duplicate create calls; ambiguous timeouts require reconciliation. Callback/webhook share one capture identity for exactly-once stock/order/payment/finance effects. New checkout component opens hosted Standard Checkout, handles dismissal/pending/error and reads persistent payment status. Account history links to owned order checkout.

CURRENT / PARTIAL: gift draft→priced/reserved order bridge, real prices/box charges, GST/shipping policy, durable failed-event recovery/reconciliation, reservation expiry and refunds remain pending. Gift-draft payments are not activated. Razorpay keys absent; blank server-only entries added to ignored .env and .env.example. No actual provider charge or public webhook delivery tested. Legacy Stripe preserved. See [payment setup](../B2C/backend/payments/README.md) for official references, routes and failure limits.

Verification: all49 database/auth/gifting/Razorpay tests passed across4 suites. New8 payment cases use temporary MongoDB, real HMAC checks and mocked Razorpay I/O. Production build, TypeScript and ESLint passed.
