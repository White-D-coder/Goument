# Razorpay integration

Implemented for existing, customer-owned MongoDB orders with trusted immutable pricing and reserved inventory. Gift drafts do not become payable orders yet: real variant/stock mappings, packaging charges, tax/shipping rules and draft-to-order quoting are still required. No fake prices, demo order or live payment is created by this integration.

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

1. A trusted quoting/order service must persist a `PAYMENT_PENDING` order and reserve every ordered variant. This upstream gift-draft adapter is not implemented.
2. Customer signs in and opens `/checkout?order=<MongoDB-order-id>` (also linked from account order history).
3. Backend checks ownership, pending state, INR total (integer paise, at least100), full reservation and absence of competing payment attempts. Browser sends an order ID only; amount fields reject.
4. One durable Payment attempt per order claims initialization before contacting Razorpay. Provider request uses its immutable total and a unique Payment ID receipt, with partial payment disabled. Reopening checkout reuses the stored Razorpay order.
5. Razorpay Standard Checkout opens from `https://checkout.razorpay.com/v1/checkout.js`. Returned HMAC is checked against the **stored** gateway order ID; backend additionally fetches the payment and verifies ID, order, amount, currency and captured status.
6. Webhook verifies HMAC on raw bytes with the independent webhook secret, before browser-origin middleware/JSON parsing. Both completion channels use the same capture identity `captured:<payment-id>` so stock, Order, Payment, PaymentEvent and FinanceEvent commit exactly once.
7. Window closure/failure never confirms an order or releases stock. Status refresh reads persistent order state. Authorized payments remain pending.

## Endpoints

Existing auth service5003, existing `/api/v1/auth/*` rewrite and session cookie:

- GET `/payments/config`: provider configuration state; draft checkout remains unavailable.
- GET `/payments/orders/:id`: authenticated owned order summary/status.
- POST `/payments/razorpay/order`: `{orderId}`; returns public Checkout options.
- POST `/payments/razorpay/verify`: `{orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature}`.
- POST `/payments/razorpay/webhook`: raw JSON + `X-Razorpay-Signature`; no browser session required.

## Failure and operational limits

Provider creation timeouts leave initialization `STARTED`. They are **not** automatically retried: the provider may already have created an order. An operator must reconcile receipt/internal Payment ID in Razorpay before repairing the association; no automated reconciliation command or job is supplied. Never erase the attempt and create a fresh receipt to bypass this guard.

Unknown/cancelled-order captures return non-2xx for provider retry and require reconciliation. There is no durable failed-event inbox, reconciliation worker, reservation-expiry policy, refund adapter or shipping/tax calculator in this increment. Ignored non-capture events do not release stock. Existing legacy Stripe implementation is separate and untouched. Do not launch saleable gift-draft checkout until these upstream/operational requirements and a real Razorpay test payment are verified.

## Verification

`npm --prefix B2C/backend run test:database -- --runTestsByPath database/tests/razorpay.test.js`

Tests use temporary MongoDB and mocked Razorpay I/O, with real HMAC verification and transaction effects. No real charge, card information or provider credential is used. Test-mode hosted Checkout and actual webhook delivery remain unverified until credentials/public callback are configured.

Implementation references, checked2026-09-30:

- [Standard Checkout integration](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/)
- [Create an order](https://razorpay.com/docs/api/orders/create/)
- [Validate webhook signatures](https://razorpay.com/docs/webhooks/validate-test/)
- [Fetch payment](https://razorpay.com/docs/api/payments/fetch-with-id/)
