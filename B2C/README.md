# Gourmet B2C application

This directory contains the actual B2C application. Next.js storefront is at this root; Express backend is in `backend/`. It does not replace either original frontend or the original backend.

## Run the storefront

```sh
cd /Users/deeptanubhunia/Desktop/gour/B2C
npm ci
npm run dev
```

Open http://localhost:3001. Home, searchable/paginated catalogue, product detail, bag, account and checkout-availability screens exist. Existing catalogue imagery appears as explicitly labelled read-only previews when the backend is unavailable; no invented prices or purchasable preview products.

## Connect the backend

Install with `npm --prefix backend ci`. Create `backend/.env` using `.env.example`, with your own credentials, a separate B2C Mongo database and Redis logical database. Do not point this development copy at live B2B data. Start MongoDB/Redis, then `npm run backend` in another terminal. Default port is5002; `.env.example` also sets this. Set BACKEND_URL in `.env.local` if different.

Actual backend product records are needed for shopping. No automatic seed/import or customer migration is performed. Product images accept local paths, HTTPS URLs or Cloudinary public IDs; bare IDs need NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME. Existing source catalogue prices are zero placeholders, so previews intentionally have no price.

## Current boundaries

Real product retrieval, server cart add/update/remove, session header, signup/login/me/logout and paginated order history are wired. No fake success, static order history, client-side payment confirmation or real-money checkout. Guest cart login merge, addresses UI, owner portal, invoice/refund/finance and payment verification still need implementation. Checkout displays unavailable until totals/business rules and payment integrity are implemented.

Backend source is copied from the existing service including the tested signup-role fix. It inherits the documented socket/CORS/payment/inventory risks; this is not a production-ready backend. This increment does not open checkout or resolve those inherited defects. Original backend/docs changes from the prior turn are retained; not silently reverted.

Validation: `npm run typecheck`, `npm run build`, `npm run lint`, `npm run test:backend`. External Mongo/Redis/Stripe/SMTP connectivity is not established by a frontend build. Local dependency symlinks may be present for verification using existing installations; use npm ci for an independent install.
