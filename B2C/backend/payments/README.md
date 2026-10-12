# Razorpay integration

Implemented for customer-owned MongoDB orders with trusted immutable pricing and reserved inventory. The gift-draft adapter now quotes explicitly mapped active variants and reserves stock transactionally. Listed prices include18% GST and delivery; separate unpriced gift-box selections reject. This is locally verified source, not a live-provider/deployment claim.

## Local configuration

Set these server-only entries in `B2C/backend/.env` (start with test credentials):

```dotenv
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
```

Restart `npm --prefix B2C/backend run auth:start` after editing. All three values must be present. Never expose Key Secret or Webhook Secret in frontend variables. The public Key ID is returned only with prepared checkout options.

Use a publicly reachable HTTPS endpoint for Razorpay webhooks:

`https://<your-public-host>/api/v1/auth/payments/razorpay/webhook`

Subscribe to `payment.captured` and `order.paid`. Configure automatic capture in the Razorpay dashboard. This implementation does not call the manual capture API or mark an authorization as paid. Localhost needs a developer-controlled public forwarding URL to receive provider webhooks; no tunnel/deployment was created here.

## Flow

1. `gifting/checkout.js` persists a `PAYMENT_PENDING` order and reserves every selected mapped variant for5minutes. `/auth/gift/order` accepts only an owned address ID, draft revision and expected total; Mongo prices own the payable amount.
2. Customer signs in and opens `/checkout?order=<MongoDB-order-id>` (also linked from account order history).
3. Backend checks ownership, pending state, INR total (integer paise, at least100), full reservation and absence of competing payment attempts. Browser sends an order ID only; amount fields reject.
4. One durable Payment attempt per order claims initialization before contacting Razorpay. Provider request uses its immutable total and a unique Payment ID receipt, with partial payment disabled. Reopening checkout reuses the stored Razorpay order.
5. Razorpay Standard Checkout opens from `https://checkout.razorpay.com/v1/checkout.js`. Returned HMAC is checked against the **stored** gateway order ID; backend additionally fetches the payment and verifies ID, order, amount, currency and captured status.
6. Webhook verifies HMAC on raw bytes with the independent webhook secret, before browser-origin middleware/JSON parsing. Both completion channels use the same capture identity `captured:<payment-id>` so stock, Order, Payment, PaymentEvent and FinanceEvent commit exactly once.
7. Window closure/failure never confirms an order. Server expiry releases unpaid reservations once after5minutes; verified capture sells reserved stock once. Status refresh reads persistent order state. Authorized payments remain pending.

## Endpoints

Existing auth service5003, existing `/api/v1/auth/*` rewrite and session cookie:

- GET `/payments/config`: provider configuration state and draft-checkout capability; actual quote/stock validity is checked separately.
- GET `/payments/orders/:id`: authenticated owned order summary/status.
- POST `/payments/razorpay/order`: `{orderId}`; returns public Checkout options.
- POST `/payments/razorpay/verify`: `{orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature}`.
- POST `/payments/razorpay/webhook`: raw JSON + `X-Razorpay-Signature`; no browser session required.

## Failure and operational limits

Provider creation timeouts leave initialization `STARTED`. They are **not** automatically retried: the provider may already have created an order. An operator must reconcile receipt/internal Payment ID in Razorpay before repairing the association; no automated reconciliation command or job is supplied. Never erase the attempt and create a fresh receipt to bypass this guard.

Unknown payment references/legacy ineligible captures remain non-2xx for provider retry and reconciliation. A verified capture after a gift hold expires durably records the Payment/Finance receipt and staff-review reason, without selling released stock or confirming fulfillment; known recorded events ACK200. No automatic refund or reconciliation worker is supplied. Ignored non-capture events do not release stock. Existing legacy Stripe implementation remains separate.

Configure a trusted approximately1-minute scheduler to GET `/api/v1/auth/gift/maintenance/expire` with `Authorization: Bearer <CRON_SECRET>` (server-only token≥32characters), or run `node gifting/expire-checkouts.js` under supervision. Each invocation handles≤100 overdue orders; monitor backlog and repeat bounded batches when needed. On-demand cleanup and transactional capture deadline checks protect stock, but do not guarantee autonomous idle cleanup without a scheduler. None was installed by this change. Apply the additive Order migration and explicit catalogue provisioning before enabling the gateway; commands are in the application README. Hosted test Checkout and actual webhook delivery must pass before launch.

## Verification

`npm --prefix B2C/backend run test:database -- --runTestsByPath database/tests/razorpay.test.js`

Tests use temporary MongoDB and mocked Razorpay I/O, with real HMAC verification and transaction effects. No real charge, card information or provider credential is used. Test-mode hosted Checkout and actual webhook delivery remain unverified until credentials/public callback are configured.

Implementation references, checked2026-09-30:

- [Standard Checkout integration](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/)
- [Create an order](https://razorpay.com/docs/api/orders/create/)
- [Validate webhook signatures](https://razorpay.com/docs/webhooks/validate-test/)
- [Fetch payment](https://razorpay.com/docs/api/payments/fetch-with-id/)
