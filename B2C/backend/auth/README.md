# Real B2C authentication

This service uses the new MongoDB `users` and `customers` collections. It runs independently of the legacy payment/Redis backend, so those provider credentials are not required to sign in.

1. Create a **Web application** OAuth client in Google Cloud / Google Auth Platform. Configure the consent screen, audience and test users if the app is in testing.
2. Add authorized redirect URI: `http://localhost:3001/api/v1/auth/google/callback` (use your exact HTTPS origin in production).
3. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `B2C/backend/.env`. Set `AUTH_ORIGIN` to the same storefront origin, and retain `B2C_DATABASE_URI` / `B2C_DATABASE_NAME`. Never put the secret in a `NEXT_PUBLIC_*` variable.
4. Run `npm --prefix B2C/backend run auth:start`. Restart after environment changes. Start B2C separately with `npm --prefix B2C run dev`, then open `/account`.

Next proxies `/api/v1/auth/*` to `AUTH_BACKEND_URL` (default `http://127.0.0.1:5003`). The auth server listens on loopback; production reverse proxy/container networking needs explicit deployment configuration.

Startup connects to Mongo and installs guarded B2C validators/indexes. The installer refuses nonempty foreign collections. Do not point it at legacy data. Google login creates user and customer in one transaction; repeat logins use Google's stable subject identifier. Existing email/password identities are not silently linked. Email login/signup also use the new schema; old legacy accounts are not migrated automatically.

Authorization code flow uses browser-bound, single-use state, PKCE S256 and nonce. The server verifies Google's RSA signature, issuer, audience, expiry, nonce and verified-email claim. Google access/refresh tokens are not stored. The browser receives an opaque HttpOnly SameSite=Lax cookie; only its SHA-256 digest is stored in a bounded user session list, with seven-day expiry and immediate logout revocation. Cookies are Secure on HTTPS. POST requests require the exact configured Origin.

The OAuth state and rate-limit maps are bounded and process-local. Production multi-instance hosting needs sticky routing or a shared store. A process restart invalidates in-progress OAuth flows, not persisted sessions. No email verification/reset, MFA, account linking, legacy migration or cart merge is implemented. Legacy cart/payment endpoints do not consume this new session; checkout remains unavailable. `/auth/orders` reads only the signed-in customer's new-schema orders with cursor pagination.

References: [Google OpenID Connect](https://developers.google.com/identity/openid-connect/openid-connect), [ID token claims](https://developers.google.com/identity/openid-connect/reference).
