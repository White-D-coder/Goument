## 2026-10-12 — Local healthy, hosted temporary503 (R214)

VERIFIED read-only: existing local Next3000/auth5003/Mongo27017 remain running; direct/proxied gift catalogue/count/draft200, signed-out me401/private,no-store. First configured public backend catalogue read503/no-store then count/draft200/me401; underlying hosted cause UNKNOWN without logs. No environment/config/schema/provider change, restart or deployment. Client adds bounded temporary-read retry locally; TESTING/API_CONTRACTS own limits. Temporary isolated Chrome stopped after fixture checks; user services retained.

## 2026-10-12 — Apply local429 fix and Lotus metadata (R206/R210)

CURRENT / IMPLEMENTED locally: guarded existing auth5003 process/cwd and unchanged loopback development config before restart to load rate-bucket fix and ep1_3.webp metadata. Proxied count/draft/catalogue200, signed-out me401, private,no-store preserved. No env edits/schema installer/seed/customer mutation. Next3000/Mongo retained; no hosted deployment. TESTING records final browser evidence.

## 2026-10-12 — Reload registered photo metadata (R197/R201)

CURRENT / IMPLEMENTED locally: existing standalone auth5003 process/cwd and unchanged known loopback rs0 dev DB/localhost3000 config guarded before restart to load11 registered draft selections, then latest Laddoo image metadata. No env edits/values printed/schema installer/seed/customer mutation. Proxied catalogue/count/draft200 and signed-out me401/private,no-store retained. User Next3000/Mongo retained. Temporary browser uses fixtures for writes; no hosted deployment/autostart claim. See TESTING.

## 2026-10-12 — Reload supplied bookmark metadata (R195)

CURRENT / IMPLEMENTED locally: verified existing5003 process/cwd, guarded unchanged ignored configuration for known loopback rs0 dev database/currentlocalhost3000 origin, then reloaded standalone auth so cart/builder catalogue serves the new bookmark main image. Direct catalogue and proxied catalogue/count/draft200, signed-out me401; private,no-store retained. No env edits/values printed/schema install/seed/customer writes. Next3000/Mongo retained, temporary browser stopped. TESTING owns evidence; deployment/autostart health unchanged.

## 2026-10-12 — Load candle metadata and gift-order guard locally (R191–R192)

CURRENT / IMPLEMENTED locally: verified existing5003 process is B2C auth/server.js and guarded existing ignored configuration targets only the known loopback rs0 development database/currentlocalhost3000 origin. Restarted that process using unchanged config/ignored log so new Laddoo photo metadata and fail-closed gift-order route load. No schema install/seed/env edit/customer write. Direct catalogue200 exposes cn3.webp; proxied count/draft200 and signed-out me401 retain private,no-store. Existing Next3000/Mongo27017 retained. Isolated production preview3100/browser9337 used fixture-only checks and were stopped afterward; no env copied into preview. Deployment/autostart health UNKNOWN; see TESTING.

## 2026-10-12 — Restore stopped local auth/cart services (R188)

CURRENT / IMPLEMENTED locally: Next3000 was listening while Mongo27017/auth5003 were stopped, reproducing plain proxy500s and direct ECONNREFUSED. Confirmed existing ignored config targets only the known loopback rs0 development DB and current local storefront origin; no values changed or printed. Restarted installed Mongo8.0.13 using existing `B2C/backend/data/local-mongo`, loopback27017/rs0, `--fork --logpath B2C/backend/data/local-mongo.log --logappend`; verified ping and writable primary. Started existing `auth/server.js` as a detached process with ignored `B2C/backend/data/local-auth.log`, leaving Next untouched. Auth startup connects without schema installation. All three listeners remain running; direct/proxied gift count/draft200 and signed-out me401 verified. Existing sessions/data retained; no seed, schema installer or customer/cart write. Why services stopped is UNKNOWN. This restores current local availability, not automatic startup after logout/reboot or hosted health; see existing local startup instructions below.

## 2026-10-12 — Separate India Hamper colour selections (R178)

CURRENT / IMPLEMENTED locally: restarted the verified B2C standalone auth service on5003 using its existing ignored configuration so Node loads the two new colour entries from gifting/items.json. Existing loopback Mongo/session/customer data retained; no environment values copied/printed/edited and no schema installer/seed. Proxied catalogue HTTP200 exposes both new IDs. Frontend3000 retained; hosted deployment unchanged. Temporary browser verification uses fixture carts only.

## 2026-10-12 — Isolated B2C installs and local verification (R161)

CURRENT / IMPLEMENTED: remove tracked B2C/node_modules symlink and use independent ignored installs in B2C and B2C/backend; package locks support npm ci without upgrading B2B modules. Next16.4/React19.2.4. Existing local storefront3000 and standalone auth5003 restarted with updated code; existing Mongo loopback service retained. No .env content copied/printed, credential changes or account/session revocation. Only new OAuthFlow schema installed using a guarded loopback dev/test connection. Production build/browser checks used private temporary artifacts/server/profile; checks complete and temporary services closed. Production environment/proxy/schema configuration remains UNKNOWN. See DEPLOYMENT for explicit installer before startup.

## 2026-10-12 — Local first OWNER provisioned (R159)

CURRENT / IMPLEMENTED locally: the user-approved existing account now has OWNER in the isolated loopback dev database. Bootstrap/audit/session revocation verified; Google reauthentication produced a new persisted session. No environment settings, service processes, production databases or Google Console settings changed. No user identifiers or secrets recorded. Earlier first-owner-not-provisioned status describes the prior increment. Evidence: TESTING.

## 2026-10-12 — Reported Google error environment clarified (R158)

CURRENT / PARTIAL: user confirms the redirect mismatch occurred on localhost:3000. The verified callback remains `http://localhost:3000/api/v1/auth/google/callback`; actual Google Console registration and completed consent are still unverified.

## 2026-10-12 — Verify callback before changing OAuth settings (R158)

CURRENT / PARTIAL: running local auth emits `http://localhost:3000/api/v1/auth/google/callback`. Register that exact URI under Authorized redirect URIs for the OAuth client used by this service; JavaScript origins alone are insufficient. Earlier3001 registration examples do not describe current local runtime. Production callback must match its explicitly configured storefront origin; actual production origin/Google Console registration remain UNKNOWN. No environment secrets read, logged or edited; no service restart. Auth README now specifies the current3000 development origin. Evidence: TESTING.

## 2026-10-11 — Restore stopped local auth dependencies (R133)

CURRENT / IMPLEMENTED locally: the Next storefront was running while its existing Mongo and auth listeners were stopped, causing proxy500s. Restarted the existing replica set from `B2C/backend/data/local-mongo` with loopback27017 and `rs0`, then `npm --prefix B2C/backend run auth:start` on5003. Confirmed the existing configuration targets only the isolated local development database; no `.env` values changed. Count/catalogue/draft now return200 through Next; signed-out me returns401. This is a running local session, not an autostart or production fix. If stopped again, follow the Mongo/auth startup commands in the2026-10-10 entry below; the storefront alone does not start them. No new initialization/seed was needed.

# Environment

## 2026-09-30 — Atlas runtime recovery check

CURRENT / BROKEN: configured B2C Atlas connection fails verified TLS despite working DNS and TCP. Earlier successful Atlas checks below are historical. Confirm the cluster is available and the application's current public egress IP has an Active, unexpired project IP access-list entry. If access is already correct, investigate the network/VPN/proxy path and Atlas configuration; TLS alert80 alone does not prove incorrect credentials. References: [Atlas connection troubleshooting](https://www.mongodb.com/docs/atlas/troubleshoot-connection/) and [IP access list](https://www.mongodb.com/docs/atlas/security/ip-access-list/).

Retest with connectDatabase + database ping + close only. Do not invoke installSchema for a diagnostic ping or disable TLS verification. After ping succeeds, verify direct/proxied gift-draft loading and a real selection save/reload. Startup runs guarded schema initialization, so restarting the service is not a read-only connectivity probe.

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Handling

Variable names/purposes only; no values copied from actual .env files. Backend loads backend/.env through shared/config; backend/src/config/index.js reexports shared/config; there is one effective backend config module. Next uses its own app environment. Public-prefixed variables must not contain secrets.
| Name | Purpose | Source |
| --- | --- | --- |
| ADMIN_PORTAL_PIN | Portal login credential | frontend_appview/src/lib/security/adminAuth.ts; frontend_appview/src/app/api/admin/auth/route.ts |
| ADMIN_SESSION_SECRET | HMAC session signing | frontend_appview/src/lib/security/adminAuth.ts |
| AWS_LAMBDA_FUNCTION_NAME | Serverless runtime indicator | frontend_appview/src/lib/security/vault.ts |
| CLOUDINARY_API_KEY | Cloudinary API identifier | backend/src/shared/config/index.js |
| CLOUDINARY_API_SECRET | Cloudinary signing secret | backend/src/shared/config/index.js |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud | backend/src/shared/config/index.js |
| ENCRYPTION_SECRET | Vault key derivation seed | frontend_appview/src/lib/security/vault.ts |
| INQUIRY_RECIPIENT_EMAIL | Inquiry recipient | frontend_appview/src/config/appRoutes.config.ts; frontend_appview/src/app/api/send-inquiry/route.ts |
| JWT_ACCESS_EXPIRES_IN | Access token lifetime | backend/src/shared/config/index.js |
| JWT_ACCESS_SECRET | Access JWT signing secret | backend/src/shared/config/index.js |
| JWT_REFRESH_EXPIRES_IN | Refresh token lifetime | backend/src/shared/config/index.js |
| JWT_REFRESH_SECRET | Refresh JWT signing secret | backend/src/shared/config/index.js |
| LOGTAIL_TOKEN | Declared logging token; transport wiring not found | backend/src/shared/config/index.js |
| MONGODB_URI | MongoDB connection | backend/src/shared/config/index.js |
| NEXT_PUBLIC_API_BASE_URL | Axios API base | frontend_appview/src/utils/constants.ts |
| NEXT_PUBLIC_BACKEND_URL | Separate backend-base config; not used by hardcoded rewrite | frontend_appview/src/config/appRoutes.config.ts |
| NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME | Public cloud name / image loader | frontend_appview/src/config/appRoutes.config.ts; frontend_appview/src/shared/CloudinaryLoader.ts |
| NEXT_PUBLIC_STRIPE_KEY | Public Stripe config | frontend_appview/src/config/appRoutes.config.ts |
| NEXT_PUBLIC_WHATSAPP_PHONE | Public WhatsApp destination | frontend_appview/src/config/appRoutes.config.ts |
| NODE_ENV | Execution mode | backend/src/shared/middleware/rateLimiter.middleware.js; backend/src/shared/config/index.js |
| PORT | Backend HTTP listen port | backend/src/shared/config/index.js |
| REDIS_URI | Redis connection | backend/src/shared/config/index.js |
| SENTRY_DSN | Declared monitoring destination; SDK wiring not found | backend/src/shared/config/index.js |
| SMTP_FROM | Email sender | frontend_appview/src/app/api/send-inquiry/route.ts |
| SMTP_HOST | SMTP hostname | frontend_appview/src/config/appRoutes.config.ts; frontend_appview/src/app/api/send-inquiry/route.ts |
| SMTP_PASS | SMTP password | frontend_appview/src/config/appRoutes.config.ts; frontend_appview/src/app/api/send-inquiry/route.ts |
| SMTP_PORT | SMTP port | frontend_appview/src/config/appRoutes.config.ts; frontend_appview/src/app/api/send-inquiry/route.ts |
| SMTP_SECURE | SMTP TLS option | frontend_appview/src/config/appRoutes.config.ts |
| SMTP_USER | SMTP auth user | frontend_appview/src/config/appRoutes.config.ts; frontend_appview/src/app/api/send-inquiry/route.ts |
| STRIPE_SECRET_KEY | Stripe server credential | backend/src/shared/config/index.js |
| STRIPE_WEBHOOK_SECRET | Webhook signature secret | backend/src/shared/config/index.js |
| VERCEL | Serverless runtime indicator | frontend_appview/src/lib/security/vault.ts |

Missing SMTP credentials can return success without sending email. Never treat a public env variable or fallback configuration as proof of enabled integration.

## Configuration lifecycle and scope

CURRENT / IMPLEMENTED: shared/config uses Joi to validate env at import. Outside tests, MONGODB_URI, JWT signing secrets, Cloudinary cloud/key/secret and Stripe secret/webhook secret are required by schema; in test mode source defaults exist. PORT/REDIS_URI/token expirations have defaults. SENTRY_DSN/LOGTAIL_TOKEN may be empty and do not establish integrated monitoring. Values intentionally omitted.

Next SMTP has default host/port/TLS but user/pass optional in delivery branch. Admin/vault env are not fail-closed because source fallback values exist. NEXT_PUBLIC_* is public build/runtime frontend configuration, not safe for secrets. Main rewrite uses literal localhost5001 rather than NEXT_PUBLIC_BACKEND_URL. NEXT_PUBLIC_API_BASE_URL controls Axios independently. .env files were not read as audit evidence and actual provisioned values remain UNKNOWN.

Changing ENCRYPTION_SECRET without a migration/recovery plan makes prior vault ciphertext unreadable; current read fallback can return empty. Do not rotate or test production secrets in a documentation task. Node runtime/version and secret manager deployment are UNKNOWN.

## Isolated schema module configuration — 2026-09-28

B2C_DATABASE_URI: required MongoDB replica-set connection URI for the new module. B2C_DATABASE_NAME: required name starting gourmet_b2c_schema_. These are separate from legacy backend MONGODB_URI/DB settings. B2C_SEED_PASSWORD: operator-supplied fake-account seed password, at least16 characters and at most72 UTF-8 bytes. Never commit values. Seed requires non-production NODE_ENV and a dev/test database name. No production DB was contacted. Commands: npm --prefix B2C/backend run db:install; db:seed; db:describe; test:database. Existing package dependencies suffice; no new package installed.

## 2026-09-29 — Google auth and Atlas integration

Google auth needs server-only GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_ORIGIN (local http://localhost:3001), optional AUTH_PORT (5003), and existing B2C_DATABASE_URI/NAME. Placeholder keys added to local ignored .env and .env.example; values never logged. Google Web application redirect URI must exactly match AUTH_ORIGIN + /api/v1/auth/google/callback. Frontend AUTH_BACKEND_URL defaults localhost5003. Run npm --prefix B2C/backend run auth:start; restart after updating credentials. Atlas connection and schema installation verified; Google client credentials absent at implementation time.

## 2026-10-10 — Local B2C auth development database

The ignored `B2C/backend/.env` now targets `mongodb://127.0.0.1:27017/?replicaSet=rs0` and database `gourmet_b2c_schema_dev`. Local Mongo data is stored under ignored `B2C/backend/data/local-mongo`; start `mongod --dbpath B2C/backend/data/local-mongo --bind_ip 127.0.0.1 --port 27017 --replSet rs0`, initialize the replica set once if the data directory is new, then run `npm --prefix B2C/backend run auth:start`. `AUTH_ORIGIN` is set to `http://localhost:3000` for the current storefront; Google callback registration at that origin remains unverified. This is development-only and separate from legacy `MONGODB_URI`. Atlas connectivity remains unresolved; do not treat the local database as deployed/persistent customer storage.

## Razorpay — 2026-09-30

RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET are server-only fields in B2C/backend/.env. All three required; restart auth service5003 after editing. Start with test keys. Only public Key ID is returned in checkout options. Presence check found all three absent; no values printed.


## 2026-10-01 — Corporate site navigation URL

NEXT_PUBLIC_CORPORATE_SITE_URL is an optional public build-time URL in the B2C storefront. Blank/unset uses http://localhost:3000/ during development and https://thegourmetgifts.co/ in production, matching frontend_appview's source canonical. Configure it for another preview/deployment address and rebuild the frontend (restart development server for local changes). Documented in B2C/.env.example; no actual environment or credentials changed. Production destination is source-declared, not live-deployment verification.

## 2026-10-01 — Operations portal configuration and owner provisioning

CURRENT / IMPLEMENTED: the portal reuses `AUTH_ORIGIN`, `AUTH_BACKEND_URL`, `B2C_DATABASE_URI`, `B2C_DATABASE_NAME` and the existing Google/password authentication service. No public admin PIN, bootstrap web token, client database connection or new secret variable is introduced. `/api/v1/auth/admin/*` follows the existing auth rewrite and cookie path. Reporting timezone and currency are explicit owner-saved Mongo settings; no business timezone/currency is silently inferred from the workstation.

The updated owned schema must be installed before the operations APIs are used. Admin rate limits depend on Mongo and fail closed. Runtime Google OAuth state is still process-local; actual hosting, trusted-proxy and multi-instance routing configuration require deployment evidence.

An authorized operator can provision the first owner using `node B2C/backend/admin/provision-owner.js --user-id USER_OBJECT_ID --confirm` after replacing the placeholder with an explicitly chosen existing active account ID. The CLI loads the existing ignored backend environment, requires a password/Google sign-in method, uses an atomic singleton claim, refuses an existing owner and revokes the promoted account's sessions. It does not seed fake accounts, create a password, expose secrets or install schema automatically. This command has NOT been run against Atlas, and no live owner identity has been chosen or promoted by this implementation.

CURRENT / BROKEN remains the previously verified configured Atlas TLS connection. Do not disable TLS verification or interpret the new portal's temporary-database tests as Atlas recovery. No environment values, live settings or credentials were changed during portal implementation.
