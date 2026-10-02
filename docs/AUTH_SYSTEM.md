# Authentication System

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
