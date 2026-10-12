## 2026-10-12 — Separate account refresh from cart changes (R166)

CURRENT / IMPLEMENTED client optimization: Header checks /auth/me on mount and b2c-auth-change, while b2c-cart-change updates only its bag count. Account emits auth event after confirmed password sign-in/profile read and successful logout, including return-to-admin/checkout cases; Google document navigation still mounts a fresh Header. Separate request IDs prevent stale auth/count responses winning. Endpoint, credentials, cookies, identity and server authorization unchanged. Anonymous me401 remains expected, not converted to fabricated authentication or guest200. Regression verifies cart changes avoid additional auth calls and sign-out clears staff link; hosted anonymous401 and successful gift GETs observed. TESTING owns scope; production publication not performed.

## 2026-10-12 — B2C durable OAuth and privacy (R161)

CURRENT / IMPLEMENTED: replace in-process Google flow Map with OAuthFlow in the isolated B2C database. State/binding hashed; nonce/verifier private; ten-minute expiry checked at atomic findOneAndDelete before exchange, with TTL cleanup and an active-flow admission check. Two app instances/concurrent callbacks tested: exactly one exchange. Session cookie names, path, SameSite/secure/HttpOnly settings, customer ownership and session digests preserved. No role grant or password reset in this increment; retired bulk owner CLI refuses to run, existing guarded provision-owner command remains.

All unsafe browser auth methods require exact configured Origin, absent Origin403. Signed webhook remains outside that browser-origin check. Auth prefix returns private,no-store; admin/webhook retain no-store overrides. General limiter remains process-local; login/admin buckets remain persisted. Trusted proxy deployment UNKNOWN. Explicit schema installation before startup now required; local install touched only the new OAuth collection/indexes. Existing approved owner/login preserved; a fresh real Google callback after this change is not runtime-verified. See DATABASE, DEPLOYMENT, SECURITY and TESTING. Supersedes R160 OAuth/cache/Origin open status only.

## 2026-10-12 — B2C origin/cache/deployment audit (R160)

CURRENT / PARTIAL: approved local OWNER session from R159 preserved. Signed-out me/orders/admin endpoints reject401; no session was fabricated/read from the user browser. Current auth mutation middleware additionally admits any Vercel/Cloudflare/localtunnel suffix and absent Origin, so earlier exact-Origin wording is superseded by source and isolated routing evidence. Cookie SameSite/HttpOnly/host scope remains a separate control. Session-owned customer routes lack blanket explicit no-store. OAuth flows/rate maps remain process-local; multi-instance callback reliability and trusted proxy handling remain UNKNOWN. These are unresolved findings, not a production login failure observed in this audit. See SECURITY/TESTING.

## 2026-10-12 — Approved local OWNER and genuine Google session (R159)

CURRENT / IMPLEMENTED locally: explicit user approval authorized first-owner provisioning for their selected existing Google-only account. Existing guarded bootstrap completed, prior sessions were revoked and Google identity/customer ownership were preserved. The user then completed the genuine browser Google flow: a fresh nonexpired persisted session was observed with OWNER role. No session was fabricated, authentication bypassed or password created/reset. Application auth code and production accounts are unchanged. Evidence: TESTING.

## 2026-10-12 — Local admin sign-in requires provisioned role (R159)

CURRENT / PARTIAL: the specified local account supports Google only and is currently CUSTOMER; there are no local privileged accounts. Public sign-in does not elevate permissions. Existing first-owner bootstrap would add OWNER to the selected existing User, record an audit and revoke previous sessions; explicit user confirmation is pending. Do not use the separate bulk setup-owners script to reset credentials or reassign customer ownership. Account remains unchanged. Evidence: TESTING.

## 2026-10-12 — Google redirect mismatch diagnosis (R158)

CURRENT / PARTIAL: user reports Google400 `redirect_uri_mismatch`. Local `/api/v1/auth/google` returns302 to Google's fixed authorization host with callback `http://localhost:3000/api/v1/auth/google/callback`, configured client presence, state and S256 PKCE. Callback is built from configured `origin` in auth/app.js and reused for token exchange. Google requires an exact registered URI for the same OAuth client. Console registrations and whether the reported failure was local/production are UNKNOWN; no live login success claimed. No auth implementation, identity, cookies, state validation or provider configuration changed. README's stale3001 setup example corrected to the verified current3000 origin with explicit AUTH_ORIGIN; fallback remains unchanged. Evidence: TESTING.

# Authentication System

## 2026-10-11 — Local auth availability recovery (R133)

CURRENT / IMPLEMENTED locally: reported500s came from Next rewriting to the stopped loopback auth service, whose local Mongo dependency was also stopped. Restored the existing isolated Mongo/auth processes; Next-proxied guest count/catalogue/draft return200 and unauthenticated me returns401. Cookie/session/ownership logic and API payloads are unchanged. No login or production connectivity test; see ENVIRONMENT and TESTING.

## 2026-09-30 — Guest cart continuity through sign-in

CURRENT / IMPLEMENTED: adding/loading/updating a gift cart is guest-capable and uses the existing b2c_gift cookie independently of b2c_session. Registration, password login, Google callback and logout preserve its items, quantities and box selections. Account now waits for pending cart work before email sign-in, Google navigation and checkout redirects; an unconfirmed write shows a review-cart error instead of navigating. Leaving Account while waiting cancels the delayed redirect, not the cart save. Duplicate sign-in clicks are locked. Cookie-owned /auth/* calls no longer access legacy localStorage/X-Session-Id.

Verified with temporary MongoDB: registration/password/Google callback continuity, signed-in additions, repeated login without duplication and separate-browser isolation. Google provider exchange is mocked in these tests; live consent remains unverified. Checkout still requires a real session. Cart remains browser-owned; this is same-browser continuity, not customer-cart merging or cross-device synchronization. Configured Atlas TLS failure remains a runtime blocker.

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Express customer/admin auth

POST register/login issues httpOnly secure SameSite=None accessToken and refreshToken cookies; fixed cookie ages15min/7days. JWT lifetimes separately configurable; keep them aligned. Bearer header takes precedence over access cookie. Middleware verifies JWT and loads current DB User; auth('admin') checks DB role.

Passwords bcrypt10 rounds via pre-save hook. Refresh JWT includes random jti; SHA256 hash stored in User.refreshTokens. Rotation removes used hash; reuse clears all refresh tokens. Logout revokes presented refresh hash and clears cookies. Existing access JWT revocation on logout is not implemented as a denylist.

Register validator checks email/password≥6/name/optional phone. Since 2026-09-27, register service always assigns customer; any supplied role is ignored, including direct service calls. No public staff-provisioning API is introduced. Existing administrators retain their stored role on login.

## Separate Next admin auth

PIN login issues7-day gourmet_admin_session HMAC-SHA256 cookie; constant-time signature comparison; in-memory five-failure15min lock. This is not Mongo JWT identity. Page disabled but data/export routes remain cookie protected. Default fallback PIN/session secret present; never copy values into docs.

## Unknown / not found

No verified email/OTP/password-reset/MFA workflow found; config description mentioning OTP is not implementation evidence. CSRF strategy and secure-cookie behavior for actual deployment must be verified. See SECURITY/API_CONTRACTS.

## Browser consumer mismatch

CURRENT / BROKEN as an integration: gated `frontend_appview/src/app/account/page.tsx` sets local isAuthenticated on caught API error and shows hardcoded order history. Login/register backend return message and cookies, not a user object, so client supplies fallback profile data. No `/auth/me` refresh/bootstrap is wired on this page. This local UI fallback does not create a server JWT; protected Express endpoints still require server auth.

Refresh rotation exists server-side but Axios client has no refresh/retry interceptor. No frontend guest cart session header/cookie bootstrap or login→mergeCarts caller found. A fresh session must not assume account/login/cart history is complete because backend endpoints exist.

S01 implementation corrected 2026-09-27; regression evidence is in TESTING. Real account auth-state handling remains open before activation. Existing privileged accounts are not automatically changed; historical-account review requires operational evidence.

## B2C database increment — 2026-09-28

New internal registration always assigns CUSTOMER and creates customer identity with bcrypt12 password hashing and normalized unique email. User password hash excluded from default projection. New module has no HTTP session/login adapter; existing B2C auth contracts remain unchanged.

## 2026-09-29 — Google auth and Atlas integration

CURRENT / IMPLEMENTED: B2C/backend/auth is a standalone Express adapter over the new database, default port5003. Google authorization-code flow uses server exchange, PKCE, one-use browser-bound state and nonce, and RS256 verification against fixed Google JWKS with issuer/audience/expiry/email_verified checks. User.googleSubject is unique optional, frozen and hidden by default. No automatic email-based linking. User/customer creation is transactional. Opaque seven-day sessions have only SHA256 digests in bounded authSessions (max10); HttpOnly/Lax cookie, Secure with HTTPS; logout revokes persisted session. Public email signup/login/me/logout now use the new database through the auth-specific frontend rewrite. Password signup minimum12 characters/max72 UTF-8 bytes. Staff roles never accepted from public input. Google credentials remain required for live provider login.

## 2026-09-30 — Sign-in and delivery checkout

CURRENT / IMPLEMENTED: primary gift cart now requires authenticated checkout; anonymous checkout-check returns401 and UI routes to /account?next=/checkout. Email signup/login and state-bound Google login return to an allowlisted checkout URL. Guest selection cookie survives login; no automatic customer/cart merge or cross-device claim introduced. Direct checkout and existing-order payment401 responses redirect to sign-in.

Authenticated GET /api/v1/auth/gift/checkout returns the browser selection and only the signed-in customer's saved addresses (up to20, newest first), rejecting invalid packing. POST /api/v1/auth/gift/address validates recipient, international phone, street, city/state, postal/country; Indian PIN format is six digits. Uses existing CustomerAddress repository, verifies ownership on edits, rejects caller customerId and unknown fields. Address is saved explicitly to the account; optional empty lines are unset. No identity phone verification, default-address change, customer merge or order snapshot mutation. UI has responsive delivery form, saved-address selection, edit/review and selection summary.

CURRENT / PARTIAL: supersedes the old cart's blanket draft-check message with a real sign-in/address/review journey. Review explains the remaining price/stock/quote blocker; saving an address does not place an order. Gift catalogue-to-saleable-variant mapping, approved box prices/tax/shipping calculation and order/reservation bridge are still required. No fabricated free delivery, tax or payment success.

## 2026-10-01 — Operations portal uses existing B2C authentication

CURRENT / IMPLEMENTED: `/api/v1/auth/admin/*` shares the existing `b2c_session` cookie, Google/password login, seven-day persisted session digests, logout and exact-Origin mutation checks. No admin password, PIN, JWT or separate login system was introduced. `sessionUser()` verifies active persisted User/session; `identity()` still adds the active Customer requirement for customer-only endpoints. Existing OWNER/ADMIN accounts can now sign in without a Customer record, matching the existing development seed. `/auth/me` returns a safe staff profile with optional customerId; it does not create a synthetic Customer. Customer order/address/checkout ownership remains enforced.

Central `admin/security.js` resolves current Mongo roles and permissions on each request. OWNER receives the explicit known permission catalog; ADMIN starts with no permissions and receives only persisted supported grants. Settings and staff administration are owner-only even if a crafted grant is supplied. Public registration and new Google identities still force CUSTOMER with no grants. Google state now allows exactly `/admin` in addition to the existing checkout return; arbitrary internal/external returns remain rejected.

Owner-only staff management targets an explicit existing User, uses a separate accessVersion for stale-form detection, and revokes all target sessions after grants, revocations or suspension changes. OWNER targets cannot be edited by this API. Reversible suspension uses SUSPENDED/ACTIVE; terminal DISABLED identities cannot be reactivated. Customer-only accounts cannot be suspended through the staff endpoint without an explicit ADMIN grant. All privileged mutations use a transaction that rechecks session/grants and writes a shared actor lock before effects, protecting against concurrent access revocation. Request-scoped receipts and audit records commit with the effect.

CURRENT / IMPLEMENTED: password login uses a shared Mongo rate bucket of10 attempts/IP/min before password comparison. Admin entry, reads, writes and sensitive writes have separate persisted limits documented in SECURITY. The old general auth process-local bucket remains for other auth routes. CURRENT / PARTIAL: Google in-flight state still uses a bounded process map; multi-instance OAuth routing/shared state, MFA, recovery and deployment proxy configuration remain unresolved. Atlas availability is not established by passing local tests.

First-owner bootstrap is an operator-only CLI, not an HTTP route or startup side effect. It requires an explicit active existing identity with a sign-in method, serializes a singleton claim, refuses another owner, records SYSTEM audit and revokes prior sessions. It has not been executed against the configured database; no live owner has been assigned.
