# User Flows

## 2026-10-07 — Consumer-first Home discovery (R58)

CURRENT / IMPLEMENTED: Home → Shop Gifts or Explore Collections → browse eight occasion covers/four favourites → existing collection/product page → priced gift cart action or enquiry-only hamper details. Occasion covers link to existing suitable destinations; they do not create backend occasion categories. The three principal collections remain Hampers, Laddoo Candles and merged Premium Stationery. India remains one product with Burgundy/Lavender detail thumbnails.

The quieter lower-page story explains flavours, photographed hamper contents and presentation, then introduces Wedding/Tea-Coffee gifts. Make it personal → required recipient/message, optional sender and occasion → native text validation/300-character bound → prepare an encoded email draft. The visitor sends from their own mail client; no note is saved to cart/order and no complimentary service is implied. Corporate links reach the separate corporate site. Home's focused footer retains existing email/company/GST details; account remains reachable through the phone menu.

Shop opens Envelopes/Hampers; in short mobile viewports the menu scrolls vertically. Escape closes Shop to its trigger, then the main menu to its button. Native FAQs remain usable without JS. Approved testimonials render only when actual endorsed data is supplied. Earlier Home order/restoration records below are SUPERSEDED ON HOME by R58; Shop/PDP/cart contracts remain. Evidence and limits: TESTING.


## 2026-10-07 — Editorial product detail and personalisation enquiry

CURRENT / IMPLEMENTED: collection → product gallery (India thumbnail switch retained) → product name/short description → catalogue price and existing cart action, or Price on enquiry for preview hampers → contents/lifestyle/personalisation → expandable finer details → related gifts or corporate enquiry. Desktop purchase information remains beside gallery scrolling; phones/short viewports use ordinary flow. Gift product add/+/- retains the existing cookie/revision/queue flow and failure retention.

Personalise → expand gift-note module → enter up to300 characters → Email this request opens the visitor's email composer with product and note encoded. Bulk/preview/delivery links also compose enquiries to the existing footer concierge address. No email is sent by the site; no note is attached to a cart/order; availability/charges are explicitly subject to confirmation. Product navigation resets local note, purchase and gallery state. Actual email delivery/live backend writes were not verified.

## 2026-10-07 — Restore the previous homepage

CURRENT / IMPLEMENTED: Home again follows the earlier hero → two hamper cards → three collection choices → occasion rail → assurance/brand story journey. Hero, Shop dropdown and product detail destinations retain prior behavior; India Hamper keeps its Burgundy/Lavender thumbnail gallery. Removed the recently introduced scroll-story/stacking interaction at the user’s request.

## 2026-10-07 — Editorial Home journey

SUPERSEDED / REVERTED: user explicitly rejected this redesign and requested the previous homepage. The implementation and its dedicated tests/assets have been removed; details below record the attempted design and its historical checks.

HISTORICAL / REVERTED: arrive on burgundy → image mask/headline introduction → scroll or activate the discover cue → same photo contracts into an ivory brand statement → continue through three sticky gift-story chapters → four collection pages stack in order → choose an existing collection route or continue to the two hamper product cards. Reverse scrolling restores prior scene/chapter states. Our Story anchors to ProductStory and Occasions anchors to the collection stack. Reduced motion/short screens expose normal unpinned content; no-JS retains sequential content and links. Catalogue/cart/payment behavior is unchanged. Checks: TESTING.

## 2026-10-07 — Shop collection navigation

CURRENT / IMPLEMENTED: open Shop → choose Envelopes or Hampers → dedicated collection page → existing product detail/cart actions. On smaller screens, open the main menu before expanding Shop; choosing a collection closes both menus. Keyboard users open with Enter/Space, Tab through links and press Escape to close/refocus Shop. Sort submissions and pagination remain on the selected collection route; Home/Shop breadcrumbs return to the broader catalogue. Empty collections offer all gifts and the existing gift builder. Product/cart/payment contracts are unchanged. Runtime evidence: TESTING.

## 2026-10-05 — Compact gift detail quantity controls

CURRENT / IMPLEMENTED: open gift detail → read existing draft quantity → Add to Cart → confirmed saved quantity shows beside the button → +/- apply one-unit changes → minus at1 removes row/counter. Pending controls are disabled; failures keep the last confirmed quantity and show an alert. Add remains an increment action while the counter is visible. Reopening reads the same cookie-owned draft. Duplicate/open copy and redundant success/pricing paragraphs removed. Card additions, cart packaging and sign-in continuity retain their current paths. No live persistence checked in this increment; browser responses are mocked (TESTING).

## 2026-09-30 — Guest shopping through sign-in

CURRENT / IMPLEMENTED: guest Add to Cart → confirmed saved selection → Account → finish pending cart work → email signup/login or Google redirect → same cart with previous quantities/boxes → continue adding while signed in. Refresh and repeated login read the existing draft; no login-time copying/merging. Builder/cart reads that can create a cookie and quantity/box writes share the card queue so a late old page cannot replace the active cookie. Failed pending work blocks sign-in navigation with a review-cart message; no ambiguous write replay. Checkout remains authenticated. Configured Atlas is currently unavailable; isolated Mongo tests establish code behavior only.

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Current main UI journey

Home → occasion or category catalogue → select products/box / curation → enquiry modal or inline form → name/contact/context → submit Next inquiry API → confirmation. WhatsApp contact is an alternate path. Dynamic category/occasion pages are limited by the effective whitelist; the occasion index itself is blocked.

## Network and alternate behavior

Offline banner/toast and persisted browser state exist. Reconnection can trigger confetti. No service-worker registration found. Form may succeed without SMTP delivery when configuration is missing; geo can fall back to Mumbai. Empty cart/missing session, invalid coupon, inactive product or insufficient stock produce backend errors. Stock-invalid sync items can be silently discarded.

## Dormant ecommerce journey

Backend capability sequence: auth → Redis cart → POST order with addresses and Idempotency-Key → clientSecret; webhook can later update order → order history API. Browser Stripe confirmation is MISSING; this is not an implemented end-to-end UI journey. `/account`, `/cart`, `/checkout`, `/gift-boxing`, `/customize`, `/gourmet-gifts` are currently blocked as pages; do not present this as a complete working public purchase journey.

Payment browser-close success depends on webhook; delayed payment vs15-minute expiry is unresolved. Address edits should not mutate embedded historical order addresses. Invoice/refund/tracking interfaces are not established.

Sources: main app page/shell and whitelist; backend cart/order controllers; see API_CONTRACTS and EDGE_CASES.

## Public enquiry: actual acknowledgement boundaries

CURRENT / PARTIAL: global InquiryModal requires name,email,phone in client; API requires only truthy name/email. Modal starts fetch without awaiting or checking HTTP status, opens WhatsApp, immediately shows success and closes/resets. Thus its email-dispatched toast is not server delivery evidence. Budget is sent by modal, but endpoint destructuring/vault InquiryRecord omit budget; WhatsApp helper does receive it. Other inline forms have their own submit handlers; inspect each before normalizing behavior.

CURRENT / BROKEN gated account integration: API error catch sets isAuthenticated=true locally; order history is hardcoded. It cannot bypass server auth by itself, but is misleading UI. Gated checkout confirms immediately on pending response, and on caught failure fabricates order ID/clears local cart. No Stripe clientSecret confirmation found. Existing static delivery text is not an approved delivery SLA.

## Local cart versus backend cart sequence

| Step | Browser curation | Backend contract / gap |
| --- | --- | --- |
| Add | Optimistic local append/combine; opens drawer for first item | Sends variantId/giftBoxingType; backend expects variantSku/giftBoxing; local non-Mongo IDs can400 |
| Guest identity | Axios credentials enabled | No X-Session-Id injection or sessionId-cookie creation found in frontend client; telemetry __gour_sid is different |
| Remove/update/clear | Mutates local persisted state only | No corresponding DELETE/PATCH in those store actions; server can retain old items |
| Add offline/error | IndexedDB offline_cart_queue ADD record | No per-entry server idempotency; retry after partial application can double quantity |
| Replay helper | Replays entire queue then deletes it, posts full sync, reloads server cart | Hook only called from legacy MobileShell; current ResponsiveShell does not mount it |
| Sync mapping | Server productName/unitPrice/imagePublicId mapped to local display | Server cart generally stores IDs/quantity/boxing only; fallback name/zero price/image used; empty server cart does not replace nonempty local state |
| Login merge | Backend mergeCarts helper exists | No auth service/controller caller found; no automatic merge established |

Persistent local key gourmet_cart_storage stores items; queue persists until helper success/delete. Server TTLs24h guest/7days user are not local TTLs. Sync force/forceClient overrides server items; otherwise server wins item conflicts. Invalid stock items silently filtered. Browser online events are connectivity hints, not backend health checks.

## Customer journey preservation

Repeat authenticated orders must retain same User._id history through API pagination; no automatic anonymous account merge is authorized. Address-book updates do not rewrite saved Order address copies. Customer notes, invoice downloads, refund requests and support-history journeys are MISSING; their future requirements/status are in CUSTOMER_SYSTEM/INVOICE_SYSTEM/REFUND_SYSTEM.

Sources: `frontend_appview/src/components/modals/InquiryModal.tsx`, `frontend_appview/src/hooks/useCart.ts`, `frontend_appview/src/shared/useCartSync.ts`, `frontend_appview/src/shared/api/client.ts`, `frontend_appview/src/features/shell/MobileShell.tsx`, `frontend_appview/src/features/shell/ResponsiveShell.tsx`.

## Automated packaging gifting — 2026-10-03 (Updated)

CURRENT / IMPLEMENTED: Home / Shop / Build → add items freely → /cart. Manual customer box selection, "more room" prompt, and box capacity limits have been removed from the customer interface. Cart displays the user's item list, and "Continue to checkout" is immediately available when items are present. Packaging calculation is executed automatically by the backend engine (`packaging.js`): pre-configured gift hampers count as individual presentation boxes (1 hamper = 1 box), and loose items are packed at 4-5 items per curated box (`Math.ceil(looseCount / 5)`).


## 2026-09-30 — Sign-in and delivery checkout

CURRENT / IMPLEMENTED: primary gift cart now requires authenticated checkout; anonymous checkout-check returns401 and UI routes to /account?next=/checkout. Email signup/login and state-bound Google login return to an allowlisted checkout URL. Guest selection cookie survives login; no automatic customer/cart merge or cross-device claim introduced. Direct checkout and existing-order payment401 responses redirect to sign-in.

Authenticated GET /api/v1/auth/gift/checkout returns the browser selection and only the signed-in customer's saved addresses (up to20, newest first), rejecting invalid packing. POST /api/v1/auth/gift/address validates recipient, international phone, street, city/state, postal/country; Indian PIN format is six digits. Uses existing CustomerAddress repository, verifies ownership on edits, rejects caller customerId and unknown fields. Address is saved explicitly to the account; optional empty lines are unset. No identity phone verification, default-address change, customer merge or order snapshot mutation. UI has responsive delivery form, saved-address selection, edit/review and selection summary.

CURRENT / PARTIAL: supersedes the old cart's blanket draft-check message with a real sign-in/address/review journey. Review explains the remaining price/stock/quote blocker; saving an address does not place an order. Gift catalogue-to-saleable-variant mapping, approved box prices/tax/shipping calculation and order/reservation bridge are still required. No fabricated free delivery, tax or payment success.

## 2026-09-30 — Direct item-to-cart entry

CURRENT / IMPLEMENTED: Home Signature Edit or Shop → Add to Cart → confirmed quantity/header update → View cart → choose quantities/boxes → authenticated checkout. Item detail shares the same action for known gift-catalogue IDs. Adding before choosing a box is allowed; the existing server packing gate applies before checkout. Existing box-builder entry remains available. Current Atlas TLS failure blocks real configured-runtime saves; successful browser verification used an isolated temporary database.
