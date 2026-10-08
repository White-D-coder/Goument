# Business Logic

## 2026-09-30 — Gift cart authentication invariant

CURRENT / IMPLEMENTED: shoppers can add catalogue gift items before or after sign-in. Signing in preserves the browser's existing item quantities and packaging selections without duplicating them or switching to a different cart owner. Shared queue covers initial cookie creation and writes; pending saves finish before account redirects, while failed writes require cart review. Existing revision conflicts,99-unit bounds, private packing checks and checkout authentication remain. No customer merge, stock reservation, pricing or order rule changes. Configured Atlas failure remains separate from these source rules.

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Required continuity rules

The user's 2026-09-25 memory policy requires persistent customer identity/history and historically accurate records. Do not silently change price units, identity relationships, payment/provider behavior, route availability or UI patterns. Proposed invoice/refund workflows remain unimplemented; their policy details remain UNKNOWN.

## Existing implementation

- Catalogue products have active flags, category membership, optional variants/boxing; backend delete is soft-deactivation.
- Cart key is user ID or guest session ID. Item match uses productId + variantSku, not gifting-message/boxing identity. Re-adding may replace boxing; quantities combine. Cart additions validate stock but do not reserve it.
- Cart sync server wins conflicting items unless force/forceClient supplied; invalid stock items are discarded. Merge helper exists; automatic login wiring must be verified before claiming it occurs.
- Backend money convention is paise, currency INR. Product/variant price is re-read during checkout. Boxing surcharge may fall back to cart value; shippingCost is accepted from payload. Therefore fully server-authoritative totals are NOT established.
- Coupon checks dates, active flag, minimum, restrictions and usage count. Percentage discount rounds; fixed discount caps at eligible subtotal. Used count increments on success webhook. Product restriction evaluation has a product/productId mismatch in checkout.
- Checkout order.subtotal stores post-discount subtotal. Tax uses pre-discount item snapshots; fallback paths disagree. Commercial tax/shipping policy is UNKNOWN.
- Review rating1–5, one per user/product; approval required for published reviews.
- Inquiry only requires name/email truthiness at endpoint; records precede email dispatch. Success does not always mean email was sent.

## Invariants to enforce before enabling money flows

Server-authoritative complete totals; no overselling; verified payment before confirmation; idempotent gateway/webhook/release effects; preserve purchase-time identity and prices. Current gaps are tracked in EDGE_CASES, SECURITY and TODO, not described as already solved.

Sources: backend/src/features/{cart,order,coupon,review,product}; frontend_appview/src/app/api/send-inquiry/route.ts.

## Product / catalogue mutation rules

CURRENT / IMPLEMENTED Mongo catalogue: Product name/slug, descriptions, paise prices (base/compareAt/cost), currency, sparse SKU, active/featured flags, quantity, Category refs, images with public_id/alt/context/dimensions/placeholder, embedded variants and boxing, tags/origin/nutritional map. See DATA_MODELS for types/constraints.

| Change | Current effect | Historical/integration limitation |
| --- | --- | --- |
| DELETE/archive | DELETE product sets isActive=false; active lookup/list excludes it | Order refs persist; no hard-delete cascade or archived version store |
| Base/variant price | Admin update changes future checkout lookup | Existing Order unitPrice/totalPrice preserved; frontend local price may diverge |
| Product name | Admin can update name; slug only generated if absent in model pre-validate | Order does not snapshot product name; old name cannot be safely reconstructed |
| SKU/variant replacement | Generic admin update can change fields | Redis cart matches variantSku; old cart may404; order has old variant SKU/name but no versioned product |
| Zero stock | Cart/checkout checks quantities | Catalogue query filters active, not generally inventory>0; product may remain visible |
| Image change | Public IDs/arrays mutable; order stores imagePublicId | No immutable file version or guarantee Cloudinary media retained |
| Category inactive/reparent | Tree query changes; unknown/missing parent treated as root | No explicit cycle/cascade validation; frontend category pages use local data |

Local catalogue in `frontend_appview/src/data/catalogueSeoData.ts` and constants/feature arrays is not Mongo-synchronized. Local box IDs are descriptive strings. Backend static boxing tiers have surcharge50000/80000/150000 paise; frontend fallback tiers0/799/499 are different values with no established conversion contract. Do not silently standardize prices; preserve this discrepancy as an integration gap. Category SEO Product data is local content, not evidence of inventory-backed checkout.

## Cart rules and capacity

Frontend key: productId_variantId-or-base_giftBoxingType-or-none. Backend matches productId+variantSku and may replace boxing on add. Frontend capacity by box ID: maroon4,midnight5,lavender4,two-tier8,magnetic6,corrugated4,tin4,premium-tray6; unknown selected box defaults4. Boxes recognized by name prefix Signature Box: or productId prefixes box_,box-,custom-box. Delicacy addition/update blocks if selected capacity>0 and exceeded. No selected boxes means no capacity check. Reducing/removing boxes does not revalidate all current delicacies. These are local UI rules, not backend stock or packability guarantees.

## Coupon contract

CURRENT / IMPLEMENTED: code unique/uppercase, percentage or fixed value, minPurchase, validFrom/validUntil, maxUses (0 unlimited), usedCount, active flag, Product/Category restrictions. No per-customer limit, redemption ledger, separate percentage maximum-discount field or refund reversal exists. Create validator requires value integer≥1 but does not cap percentage at100. Date-order constraints are not explicit.

Global minimum uses supplied cartSubtotal; restriction eligibility is Product OR Category match. Fixed discount caps at eligible subtotal; percentage uses rounded value. Checkout clamps post-discount subtotal≥0, separately adds tax/shipping. Preview builds productId snapshots and excludes boxing surcharge; checkout snapshots use product and include boxing. Restricted-product lookup can fail in checkout. Preview variant-price truthiness handles zero differently from checkout's null/undefined test. Coupon expiry/limits are checked before checkout transaction, but usage increments only on success webhook; concurrent uses are not reserved. Policy for per-customer limits and discount/tax ordering is UNKNOWN.

Sources: `backend/src/features/product/product.service.js`, `backend/src/features/category/category.service.js`, `backend/src/features/coupon/coupon.service.js`, `backend/src/features/coupon/coupon.controller.js`, `frontend_appview/src/hooks/useCart.ts`.

## B2C database rules — 2026-09-28

CURRENT / IMPLEMENTED: minor-unit arithmetic and immutable historical snapshots; unique payload-bound operation identities; nonnegative authoritative inventory; pending/completed refund cap; coupon global/per-customer counters; centralized transition graphs; bounded history queries. State graphs are technical persistence constraints, not approved tax/refund/fulfillment policy. Order quote input is trusted internal data; a customer-facing quote calculator is not implemented. No UI/business workflow is activated by this database module.

## Box-first gifting — 2026-09-30

CURRENT / IMPLEMENTED: Box rules reused from frontend_appview CustomGiftBoxesSection/useCart (no new commercial values invented): Maroon4, Midnight5, Lavender4, Two-tier8, Magnetic6, Corrugated4, Tin4, Tray6. Count each item quantity as one slot, as existing source does. Server compares sum(item quantities) with sum(box quantity * private capacity), returning EMPTY / CHOOSE_BOX / NEEDS_BOXES / READY. No item addition blocked solely by packing overflow; packaging is resolved in cart. Replacing a style keeps all items; mixed box styles and multiple quantities are allowed. This is count-based draft packing, not verified physical volume compatibility or stock availability. All products remain previews pending confirmed inventory/prices/box charges; no checkout or finance activation.

## 2026-10-01 — Owner operations rules

CURRENT / IMPLEMENTED: administrative rules below apply to `B2C/backend/database` models and `B2C/backend/admin`; legacy product/Stripe/Redis rules earlier in this file remain separate historical evidence. This portal does not convert preview gift IDs into saleable variants or change the guest cart/sign-in continuity rule.

Supported command boundary: authenticate existing session → authorize exact capability → validate body/path → inside one MongoDB transaction recheck active session/grants and write the actor concurrency version → check actor/key/payload receipt → apply domain mutation → save command receipt and audit → return only resource ID/version. External provider/network calls never run in the retried transaction. A failed receipt or audit write rolls back domain changes. Existing-key replay rechecks authorization; a different payload is409, including when the browser reuses a key after changing fields.

| Domain | Authoritative mutation rules |
| --- | --- |
| Catalogue | Explicit scalar/nested allowlists reject role, stock, unknown fields and numeric-string money. Category references must exist. Products retain DRAFT/ACTIVE/ARCHIVED graph rules; archiving preserves historical order references and snapshots. |
| Variants | Server accepts safe-integer minor-unit prices and explicit currency. Creation atomically creates the variant and zero-balance Inventory. No initial stock field is accepted; inventory enters through a recorded movement. SKU and productId cannot be edited. |
| Inventory | Adjustment requires Inventory ID, `expectedVersion`, a nonzero signed integer quantity and a reason. Existing `applyStock` updates available quantity, records one movement and writes balance audit in the same transaction. Disabled inventory, negative resulting balances, overflow and stale versions reject. Reserved quantity cannot be assigned or consumed by a manual adjustment. Reservation/sale/release transactions retain the same stock authority. No default low-stock threshold or restock/refund policy is invented. |
| Orders | Only CONFIRMED + PAID + UNFULFILLED can become PROCESSING + PROCESSING; order payment status and historical pricing/items/addresses remain unchanged. Repeated new commands against an already-processing order conflict; same-key replay returns the receipt. Cancellation, shipment completion and refund-driven order transitions are not exposed. |
| Coupons | Percentage uses integer basis points bounded1..10000; fixed amount uses integer minor units plus currency. Dates must be valid canonical UTC timestamps with expiry after start. A usage limit cannot be lowered below recorded use. Browser-supplied `totalUsed` is rejected. Existing redemption counter/customer/global-limit transactions remain authoritative. |
| Staff | OWNER explicitly grants ADMIN and a subset of supported non-owner permissions to an existing account; customer signup cannot grant itself access. Revocation/suspension changes and permission changes clear existing sessions. OWNER targets are protected; a customer cannot be suspended by disguising the command as staff revocation. |
| Settings | OWNER can set reporting timezone and currency with a revision check. These are reporting preferences, not tax, payment, shipping, refund or invoice configuration. |

CURRENT / IMPLEMENTED reporting semantics: `dashboard.read` and `analytics.read` intentionally grant aggregate counts/amounts, while underlying records and Customer360 sections require their separate read permissions. Every report requires explicit currency and UTC `[from,to)` boundaries, a valid display timezone and a maximum93-day interval. Gross captured amount includes subsequently refunded captures; completed refunds are reported separately by completion date. Order count includes cancelled orders created in the window. Pending counts are current-state snapshots, not counts restricted to that historical window. Stock count spans SKUs; each SKU's configured threshold determines LOW_STOCK. Top products count units from paid/partially-refunded orders created in the selected window, excluding cancelled/fully-refunded orders; a partial monetary refund does not imply returned quantity. These values are not settled revenue, recognized revenue, profit or conversion rates.

Payment refund investigation derives `paidMinor - completedMinor - reservedMinor`, where REQUESTED and PROCESSING refunds reserve capacity. It requires `refunds.read` and rejects inconsistent/unsafe totals. This display does not authorize a refund or mark one completed. No admin API accepts browser payment success or an unrestricted “mark as paid.”

FUTURE / REQUIRED: configured provider refund execution/approval, invoice numbering/legal seller rules/PDF/private download, cancellation/stock/payment compensation, carrier automation, notification delivery and compatible durable jobs. UNKNOWN business policies stay explicit; no routine process is described as automated solely because a model/state enum exists.

Sources: `B2C/backend/admin/{commands,mutations,reads,dashboard,staff,settings}.js`; existing `database/transactions/{inventory,coupons,payments,refunds}.js`.

## 2026-10-05 — Gift detail quantity deltas

CURRENT / IMPLEMENTED client: addition and decrement share one serialized read/modify/PUT operation against the latest GiftDraft. Each change is exactly+1 or-1; maximum99 is retained, zero removes the row, absent decrement reads without writing. A409 rereads/reapplies once; ambiguous failures do not replay or emit success. Box selections and unrelated item rows are copied from the latest draft. Pending saves disable detail controls; only confirmed saved quantities are displayed. Server packing/ownership/pricing/order/payment contracts unchanged. Verification: TESTING; live cart persistence UNKNOWN in this increment.
