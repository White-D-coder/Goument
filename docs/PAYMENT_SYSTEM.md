## 2026-10-12 — Inclusive checkout, envelope packs and spacing (R222–R224)

CURRENT / IMPLEMENTED locally: R223 trusted gift-draft order bridge replaces previous blanket409 for mapped valid selections. Mongo ProductVariant gross INR prices are authoritative;18% GST is allocated inside each gross unit (net round(gross×10000/11800), tax difference×quantity), no extra shipping/discount. Client expectedTotalMinor is a stale-price check only. Owned immutable order/address/customer/pack/print snapshots and inventory hold commit before existing Razorpay initialization; provider calls stay outside retryable transactions. Missing config/mapping/stock or separate unpriced boxes rejects safely.

Capture still requires checkout HMAC+server fetch or raw signed webhook, matching order/payment/amount/currency and captured:true. One capture event commits SALE, PAID/CONFIRMED, Payment/Finance/audit once and clears only the unchanged draft revision. Five-minute deadline is rechecked inside capture transaction; expiry releases once and cancels unpaid order. Actual money captured after expiry records Payment CAPTURED+Finance credit+FAILED event/staff-review metadata; no SALE/false order confirmation/automatic refund. Known durably recorded late events ACK200; unknown captures remain retryable503. Browser shows do-not-pay-again review status.

Uncertain provider order creation remains STARTED and cannot blindly retry. FUTURE / REQUIRED: staff reconciliation tooling, true provider test/automatic capture/webhook, scheduler and production rollout. CURRENT / PARTIAL deployment: no deployment or real provider charge/webhook was performed. Hosted payment config was read-only verified configured:false/draftCheckoutAvailable:false. Production migration, explicit catalogue provisioning, Razorpay test/webhook verification and a trusted expiry scheduler remain required; local success does not establish hosted readiness.

## 2026-10-12 — Consistent cart figures without payment activation (R220)

CURRENT / IMPLEMENTED locally: shared card/PDP/cart display amounts replace pending registered-envelope/bookmark amounts and old candle range. Inclusive quantity totals do not add GST/delivery. This supersedes R196/R213 exclusion of preview figures from cart display arithmetic only; server-owned saleable quote/reservation, included-GST accounting and payment authority remain separate. checkoutAvailable:false/paymentAvailable:false/order409 retained, with required Lotus name an additional preparation gate. No provider/order/charge/history changes.

## 2026-10-12 — Inclusive shopper prices (R213)

CURRENT / IMPLEMENTED locally: latest explicit user policy SUPERSEDES R192/R193 extra18%/delivery-charge display rules. Cart Total equals known inclusive item subtotal, with no additional GST/delivery amount. Existing unknown-price/candle-range handling retained. Included-tax accounting allocation and authoritative saleable inclusive quote/reservation remain UNKNOWN/FUTURE / REQUIRED; no zero-tax inference, gateway amount change or historical money rewrite. Gift-order409, address paymentAvailable:false and checkoutAvailable:false retained. TESTING covers16 gifting regressions plus client arithmetic/UI; no payment/provider/deployment action.

## 2026-10-12 — Display-price and draft-action boundary (R196–R197)

CURRENT / IMPLEMENTED locally: numeric card/PDP prices without Sample suffix and new photographed-item Add/cart actions are presentation/draft behavior only. Sample figures never enter server quotes/payments; authoritative pricing/reservation bridge remains FUTURE / REQUIRED. Existing unavailable checkout/payment responses and gift-order409 retained and regression checked. No payment/provider/model change. See BUSINESS_LOGIC/API_CONTRACTS/TESTING.

## 2026-10-12 — Shopper total excludes unconfirmed delivery (R193)

CURRENT / IMPLEMENTED locally: user clarifies variable delivery range is internal input, not shopper copy. SUPERSEDES R192 delivery-inclusive display estimate. Cart now shows subtotal+18% extra item GST as Total before delivery, Delivery confirmed before payment, and no delivery-range/prices-vary paragraph. Internal planning range remains; exact delivery charge/tax and authoritative final quote still UNKNOWN/required. Gift-order409/paymentAvailable:false guards from R192 remain unchanged; no payment activation. Evidence: TESTING.

## 2026-10-12 — Display estimates and fail-closed gift order bridge (R192)

CURRENT / IMPLEMENTED locally: user approves extra18% GST on item prices, candle₹200–500 estimates and variable delivery₹100–300. Cart displays integer-paise subtotal/GST/delivery/total ranges and keeps missing prices pending. These are display estimates, not a signed/server-owned quote or accounting/invoice policy. U03/U04 partially clarified only for B2C cart estimates: shipping tax, jurisdiction/allocation, exact SKU/pack/box charges, serviceability and delivery-price selection remain UNKNOWN. Existing hamper display amounts remain unverified sale authority.

Source defect corrected: gifting/routes.js no longer saves flat₹299 item orders with zero tax/delivery or clears the cart. Order bridge returns409 pending authoritative quote/reservation; address capture reports paymentAvailable:false; cart respects checkoutAvailable:false. Existing real immutable-order/Razorpay adapters remain separate/unchanged; no payment activation, charge, invoice or historical money rewrite.15 gifting tests verify rejection and draft preservation; TESTING owns remaining evidence. FUTURE / REQUIRED: implement/verify server-owned quote and atomic stock/order bridge once exact commercial rules/mappings exist.

## 2026-10-12 — B2C wrapper payment parity (R161)

CURRENT / IMPLEMENTED and fixture-verified: serverless entrypoint constructs the existing Razorpay adapter from explicit provider configuration and passes it to auth/payment routes. Signed webhook is mounted before JSON; raw body/signature handling now matches standalone auth. Browser payment routes retain exact Origin/private-cache protections; generic errors conceal internals. No external provider transaction, capture, refund, order/stock mutation, or checkout activation performed. Real provider/deployed webhook verification remains FUTURE / REQUIRED; missing keys keep existing availability gates. Standalone/schema-backed tests passing do not prove production commerce readiness. Supersedes R160 wrapper-specific parser/adapter findings only; legacy Stripe/integrity debt remains separate.

## 2026-10-12 — B2C serverless payment integration gap (R160)

CURRENT / BROKEN in inspected wrapper integration: unlike standalone `auth/server.js`, `backend/api/index.js` never initializes/passes razorpayGateway, so createAuthApp defaults paymentGateway to null even if provider environment exists. Its outer express.json also consumes webhook bytes before express.raw. With only a mocked gateway and ignored fixture event, the identical JSON request returns200 standalone and400 Invalid webhook signature through wrapper, without calling the raw verifier. This is reproducible middleware failure; no real charge/webhook or deployed function was invoked. Standalone Razorpay regression suite passes but does not cover this entrypoint. Deployed route/configuration is UNKNOWN; payments must remain gated until this integration and provider verification are complete. No activation or financial-data changes authorized/performed by the audit.

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
