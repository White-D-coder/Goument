# Customer System

## 2026-09-30 — Shopping before and after sign-in

CURRENT / IMPLEMENTED: the user's requirement to retain pre-login items is handled by keeping the existing browser-owned GiftDraft through registration/password/Google authentication. Items and boxes stay in the same document; sign-in does not copy, clear or double quantities. A second browser, even signed into the same account, cannot discover the first browser's draft. Customer/address/order ownership and historical snapshots are unchanged. Pending writes finish before Account navigation. Verified in isolated DB tests; actual Atlas connectivity remains broken. Cross-device cart association/merge remains FUTURE / REQUIRED policy and implementation, distinct from this same-browser requirement.

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Required

User instruction requires persistent lifetime customer identity and valid matching of future orders to history, with historical accuracy. Do not equate anonymous browser sessions, email strings or enquiry records with authenticated customers without a defined matching rule.

## Current data

Mongo User has unique normalized email, name, phone, role, password hash, embedded addresses and hashed refresh token records. Order.user references User; user-scoped order history is paginated. Review.user also references User. Profile service excludes passwordHash and refreshTokens.

Encrypted inquiries and telemetry sessions live separately. A unified Customer360 model linking notes, invoices, payments, refunds, coupons, notifications and activity was not found. No approved account merge, identity reconciliation, deletion/retention or anonymization policy exists in inspected docs.

## Gaps

Lifetime order association is structurally supported by Order.user but not fully verified end-to-end. Product-name snapshots are missing. Guest→user cart merge helper is present but no login/register caller was found in the inspected source. `/account` page disabled. Identity matching rules, consent/retention and data export scope remain UNKNOWN.

Sources: auth/auth.model.js, user/user.service.js, order/order.service.js, src/lib/security/vault.ts; see DATA_MODELS and AUTH_SYSTEM.

## Customer relationship map

CURRENT / PARTIAL: Mongo User is the durable authenticated identity; no separate Customer360 aggregate exists. FUTURE / REQUIRED: coherent lifetime history and accurate snapshots, as directed by the user. The following defines relationship responsibilities and missing decisions, not proposed collection/endpoint names.

| Relation | Current ownership / cardinality / identity | Deletion and historical preservation | Privacy / future boundary |
| --- | --- | --- | --- |
| Profile | One User document per _id; unique normalized email; phone not unique | No account-delete endpoint or cascade found; profile updates beyond addresses not provided | User-scoped profile excludes credentials; name/email changes and merge policy UNKNOWN |
| Authentication | User owns0..N embedded refresh-token hashes; passwordHash on same identity | Expired tokens pruned on token generation; logout removes supplied refresh token; reuse clears all refresh tokens | Never expose hashes/secrets; no password recovery/MFA flow found |
| Addresses | User owns0..N embedded addresses, each subdocument _id | Owner can add/update/delete; copied order addresses separate from these records | Restrict to current user; historical order addresses must not track later changes |
| Orders | User1→0..N Orders; each Order.user required | No cascade/delete endpoint; sorted paginated reads. Physical DB deletion could leave dangling ref; policy UNKNOWN | List scoped to user; detail owner or admin; name/email population is current profile, not historical identity |
| Order items | Order owns0..N embedded items without _id; each references1 Product | Copies price/variant/boxing/image/address data, not product name. Product soft deletion leaves ref | Future invoices need stable purchase-time item identity; backfill missing historical names cannot be guessed |
| Payments | Order has paymentIntentId string; no Payment model or User payment-history collection | No separate attempts/event ledger; provider record correlation only | FUTURE / REQUIRED history linkage; cardinality of retries/payment attempts and retention UNKNOWN |
| Refunds | NOT IMPLEMENTED; no customer/order/payment reference model | No deletion/correction lifecycle | FUTURE / REQUIRED design boundary only; policy and permitted staff access UNKNOWN |
| Invoices | NOT IMPLEMENTED | No invoice identity or immutable seller/customer snapshot | FUTURE / REQUIRED historical records; numbering/access/retention UNKNOWN |
| Coupons | Order stores couponCode+discount; Coupon stores global usedCount and restrictions | No per-customer redemption relation/history or deletion endpoint | Do not infer one-per-customer limits; future redemption ownership UNKNOWN |
| Notifications | Socket new_order event, SMTP enquiries and browser toasts; no durable customer notification collection | Delivery/read history and retention NOT IMPLEMENTED | FUTURE / OPTIONAL inbox/channel preferences; no durable customer notification promise |
| Notes | Order.notes string; no general customer notes store | Purchase record note is not CRM history | FUTURE / OPTIONAL notes system; staff author/audit/access UNKNOWN |
| Activity | Vault sessions identified by sessionId; Mongo User link absent | Last5000 recent sessions retained; not lifetime customer activity | No identity inference from IP or shared-device session |
| Communication | Vault inquiries have independent generated IDs and contact fields | Last2000 inquiries retained; no thread/customer foreign key | Customer support history linkage UNKNOWN; WhatsApp conversation contents not ingested |

Sources: `backend/src/features/auth/auth.model.js`, `backend/src/features/user/user.service.js`, `backend/src/features/order/order.model.js`, `backend/src/features/order/order.service.js`, `frontend_appview/src/lib/security/vault.ts`.

## Repeat customer:1,10,100,1000 orders

Authenticated orders reuse User._id through the middleware identity, not an email match on each order. Order history queries use `{user:userId}`, descending createdAt, skip/limit (default20). Thus1..1000 orders can be represented without embedding all orders into User; correctness/performance at scale not measured and Order.user has no declared dedicated index in current schema. Totals/pages returned; pagination is not bounded by a controller maximum.

No automatic login cart merge call was found outside mergeCarts definition/export. `/account` is gated and shows a hardcoded order list; auth catch sets local authenticated state on API failure. It does not load lifetime order history or prove server identity. The missing real account/history UI is CURRENT / BROKEN as an integration, not completed Customer360.

## Profile changes and identity matching

Address edits affect User.addresses; saved shipping/billing copies on existing Order stay separate. Order.user population can show a new profile name/email, so it is unsuitable as an invoice-time snapshot. No general name/email/phone update endpoint, profile-version history or automatic merge algorithm found. Same email normalization/unique constraint is registration behavior, not authority to merge anonymous inquiries, guest sessions or historical customers. Shared phone/IP/device is not a verified customer key.

UNKNOWN U01/U02: identity corrections, email ownership verification, duplicate account resolution, retention/deletion/anonymization and the required balance with historical records. Future implementation must preserve explicit ownership and history, but this audit does not decide matching or deletion policy.

## B2C identity foundation — 2026-09-27

Public registration now creates only customer-role User records. User._id, normalized email uniqueness and existing order/address relationships remain unchanged. No automatic matching/merging or historical account demotion is introduced. Full Customer360 remains FUTURE / REQUIRED; see IMPLEMENTATION_PLAN.

## B2C database increment — 2026-09-28

Customer360 query implemented with independently paginated addresses, orders, payments, invoices, refunds, redemptions, notifications and audit. Registration creates persistent customer identity; default address writes serialize. Tested a customer with1000 orders. Derived customer totals are caches and are not automatically rebuilt. HTTP ownership checks/guest merge remain future work.

## 2026-09-29 — Google auth and Atlas integration

Google first sign-in atomically creates new-schema User and Customer, using verified Google subject as identity; repeated/concurrent logins reuse one pair. Account bootstrap and cursor order history use the authenticated persistent customer. Existing account with matching email is not auto-linked. User/profile changes do not rewrite historical snapshots; blocked/inactive customer cannot access account. Legacy user/customer migration and guest cart merge remain unimplemented.

## 2026-09-30 — Sign-in and delivery checkout

CURRENT / IMPLEMENTED: primary gift cart now requires authenticated checkout; anonymous checkout-check returns401 and UI routes to /account?next=/checkout. Email signup/login and state-bound Google login return to an allowlisted checkout URL. Guest selection cookie survives login; no automatic customer/cart merge or cross-device claim introduced. Direct checkout and existing-order payment401 responses redirect to sign-in.

Authenticated GET /api/v1/auth/gift/checkout returns the browser selection and only the signed-in customer's saved addresses (up to20, newest first), rejecting invalid packing. POST /api/v1/auth/gift/address validates recipient, international phone, street, city/state, postal/country; Indian PIN format is six digits. Uses existing CustomerAddress repository, verifies ownership on edits, rejects caller customerId and unknown fields. Address is saved explicitly to the account; optional empty lines are unset. No identity phone verification, default-address change, customer merge or order snapshot mutation. UI has responsive delivery form, saved-address selection, edit/review and selection summary.

CURRENT / PARTIAL: supersedes the old cart's blanket draft-check message with a real sign-in/address/review journey. Review explains the remaining price/stock/quote blocker; saving an address does not place an order. Gift catalogue-to-saleable-variant mapping, approved box prices/tax/shipping calculation and order/reservation bridge are still required. No fabricated free delivery, tax or payment success.
