# Gourmet B2C application

## Current B2C checkout — 2026-10-12 (R223–R224)

This section supersedes historical unavailable-commerce descriptions below for the new database-backed B2C auth service only. Local gift checkout uses mapped Mongo prices, owned address/order snapshots,5-minute atomic stock reservations and verified Razorpay capture. Listed prices include18% GST/delivery. Envelopes offer10pcs ₹1,499 or20pcs ₹2,499 inside the product page; Lotus requires a print name. Cart has direct checkout without a final-total email. Original backend/B2B frontends remain separate.

Deployment is pending: hosted gateway configuration was checked and is unavailable. No real provider payment, hosted migration, provisioning or expiry scheduler was performed. Review the intended transaction-ready B2C database and backups first. For an already recognized installed schema, the additive upgrade and explicit approved catalogue setup are:

```sh
cd B2C/backend
node database/migrations/gift-checkout-v1.js --apply
node gifting/provision-catalogue.js --apply --opening-stock=100
```

Provisioning creates29 mapped SKU/pack pools across20products, with100 ledger-backed opening units each. India generic/Burgundy share stock. Existing mapped stock/prices are never reset on rerun; unrelated existing slugs are refused for operator review. Only the recognized local development database was actually migrated/provisioned here. New databases need existing schema installation first; never migrate/seed during requests or serverless cold starts.

Configure existing server-only Razorpay credentials, automatic capture and public raw signed webhook, then verify a real test-mode payment/order/stock/history. Configure a trusted approximately1-minute expiry scheduler with server-only `CRON_SECRET`≥32characters, calling GET `/api/v1/auth/gift/maintenance/expire` with exact Bearer authorization; alternatively supervise `node gifting/expire-checkouts.js`. Both process≤100 overdue orders per invocation; monitor backlog. No scheduler is installed automatically. Late captured money is recorded for staff review without overselling; no automatic refund policy/tooling is invented. See backend/payments/README.md and root PAYMENT_SYSTEM/DEPLOYMENT/TESTING for limits.

This directory contains the actual B2C application. Next.js storefront is at this root; Express backend is in `backend/`. It does not replace either original frontend or the original backend.

## Run the storefront

```sh
cd /Users/deeptanubhunia/Desktop/gour/B2C
npm ci
npm run dev
```

Open http://localhost:3000. Home, searchable/paginated catalogue, product detail, bag, account and checkout-availability screens exist. Existing catalogue imagery appears as explicitly labelled read-only previews when the backend is unavailable; no invented prices or purchasable preview products.

## Connect the backend

Install with `npm --prefix backend ci`. Create `backend/.env` using `.env.example`, with your own credentials, a separate B2C Mongo database and Redis logical database. Do not point this development copy at live B2B data. Start MongoDB/Redis, then `npm run backend` in another terminal. Default port is5002; `.env.example` also sets this. Set BACKEND_URL in `.env.local` if different.

Actual backend product records are needed for shopping. No automatic seed/import or customer migration is performed. Product images accept local paths, HTTPS URLs or Cloudinary public IDs; bare IDs need NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME. Existing source catalogue prices are zero placeholders, so previews intentionally have no price.

## Current boundaries

Real product retrieval, server cart add/update/remove, session header, signup/login/me/logout and paginated order history are wired. No fake success, static order history, client-side payment confirmation or real-money checkout. Guest cart login merge, addresses UI, owner portal, invoice/refund/finance and payment verification still need implementation. Checkout displays unavailable until totals/business rules and payment integrity are implemented.

Backend source is copied from the existing service including the tested signup-role fix. It inherits the documented socket/CORS/payment/inventory risks; this is not a production-ready backend. This increment does not open checkout or resolve those inherited defects. Original backend/docs changes from the prior turn are retained; not silently reverted.

Validation: `npm run typecheck`, `npm run build`, `npm run lint`, `npm run test:backend`. External Mongo/Redis/Stripe/SMTP connectivity is not established by a frontend build. Local dependency symlinks may be present for verification using existing installations; use npm ci for an independent install.

## 2026-10-12 — Current optimized B2C runtime

Use independent npm installs in B2C and B2C/backend; the tracked frontend dependency symlink has been removed so updating B2C does not modify the B2B app. Next16.4 is pinned. Current database-backed auth/admin runs with `npm --prefix backend run auth:start` on loopback5003, with AUTH_ORIGIN explicitly set to the storefront3000. Install the owned schema with `npm --prefix backend run db:install` before startup/schema upgrades; startup/serverless handlers do not run schema migrations. Production requires exact AUTH_ORIGIN and B2C database settings. The older backend command/topology above is historical, distinct from this auth/admin entrypoint.

Private APIs use exact Origin mutation checks and no-store. OAuth handshakes share temporary Mongo state across instances. Preview/fallback records are never saleable inventory; temporary Ivory/India Sample labels remain separate. Checkout is still gated. Root docs SECURITY/PERFORMANCE/TESTING contain the actual validation and limits. WebP derivatives preserve the existing artwork; optimized decoration responses cache for one day and may revalidate stale for seven days. Change their URLs when replacing artwork during that cache window.
