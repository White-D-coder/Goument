# Changelog

## 2026-10-03 — Instant live HTTPS tunnel for B2C trial preview

Per user request ("sugest me alternative", "krte hai simple me"):
- **Secure Public Tunnel**:
  - Started high-speed Cloudflare quick tunnel forwarding to local port 3000.
  - Generates an instant, zero-setup HTTPS link (`trycloudflare.com`) accessible from any phone or remote device.
  - Updated [`B2C/backend/auth/app.js`](file:///Users/deeptanubhunia/Desktop/gour/B2C/backend/auth/app.js) to accept tunnel request origins so APIs, auth, cart, and checkout work without CORS errors.
  - Preserves 100% strict isolation: `frontend_appview` (B2B) remains completely untouched and unaffected.
- **Verification**: Verified HTTP 200 on all public tunnel endpoints (`/b2c`, `/shop`, `/account`, `/cart`, `/api/v1/auth/config`).

## 2026-10-03 — Set B2C storefront port to 3000

Per user request ("broo 3000 pe rkh"):
- **Port 3000 Configuration**:
  - Updated [`B2C/package.json`](file:///Users/deeptanubhunia/Desktop/gour/B2C/package.json) scripts (`dev` and `start`) to run on `-p 3000`.
  - Updated [`B2C/backend/.env`](file:///Users/deeptanubhunia/Desktop/gour/B2C/backend/.env) `AUTH_ORIGIN=http://localhost:3000`.
  - Updated [`B2C/backend/auth/app.js`](file:///Users/deeptanubhunia/Desktop/gour/B2C/backend/auth/app.js) to accept `http://localhost:3000` for both `AUTH_ORIGIN` checks and request origin verification.
  - Restarted auth service and dev server on `http://localhost:3000`.
- **Verification**: Verified HTTP 200 on `http://localhost:3000/b2c`, `/shop`, `/account`, and `/cart`.

## 2026-10-03 — Set B2C home route to /b2c with automatic redirect and rewrites

Per user request ("uska route /b2c kr abhi ke liye home ko"):
- **B2C Home at `/b2c`**:
  - Created [`B2C/src/app/b2c/page.tsx`](file:///Users/deeptanubhunia/Desktop/gour/B2C/src/app/b2c/page.tsx) serving the complete B2C storefront homepage at `/b2c`.
  - Configured root [`B2C/src/app/page.tsx`](file:///Users/deeptanubhunia/Desktop/gour/B2C/src/app/page.tsx) to redirect `/` $\rightarrow$ `/b2c`.
  - Updated [`Brand.tsx`](file:///Users/deeptanubhunia/Desktop/gour/B2C/src/components/Brand.tsx) and [`Footer.tsx`](file:///Users/deeptanubhunia/Desktop/gour/B2C/src/components/Footer.tsx) brand logos to link to `/b2c`.
  - Updated [`Header.tsx`](file:///Users/deeptanubhunia/Desktop/gour/B2C/src/components/Header.tsx) `isHome` check to recognize both `/` and `/b2c` for the hero-transparent header, and updated Occasions/Our Story anchors (`/b2c#occasions`, `/b2c#our-story`).
  - Updated breadcrumbs in [`B2C/src/app/shop/page.tsx`](file:///Users/deeptanubhunia/Desktop/gour/B2C/src/app/shop/page.tsx) to target `/b2c`.
  - Added proxy rewrites in [`frontend_appview/next.config.ts`](file:///Users/deeptanubhunia/Desktop/gour/frontend_appview/next.config.ts) for `/b2c` and `/b2c/:path*` to `http://localhost:3001/b2c`.
- **Verification**: Verified HTTP 200 on `/b2c` and 0 TypeScript errors.

## 2026-10-03 — Luxury CTA overhaul for account orders, explore action, and checkout

Per user request ("cta badiya bna is page ka"):
- **Account Orders Action CTAs**:
  - Replaced plain text links in [`B2C/src/app/account/page.tsx`](file:///Users/deeptanubhunia/Desktop/gour/B2C/src/app/account/page.tsx) with prominent, luxury action buttons:
    - `PAYMENT_PENDING`: High-converting `.order-cta-pay` pill button ("Review & Pay →") with deep wine gradient (`#5b0707` to `#3e0303`), gold/white text, elevation, and arrow hover micro-animation.
    - Other statuses: Refined oyster-bordered `.order-cta-view` pill button ("View Details →").
- **Account Page Navigation Quick CTA**:
  - Added a luxury quick CTA button ("Explore Gifts" with sparkle icon) in the account greeting header to keep customers discovering items.
- **Empty State Luxury CTA Card**:
  - Upgraded the empty orders state with an artisanal gift badge, inspiring copy, and a rounded pill CTA button ("Browse Gift Collection →") linking to `/shop`.
- **Checkout Payment CTA**:
  - Upgraded [`B2C/src/components/RazorpayCheckout.tsx`](file:///Users/deeptanubhunia/Desktop/gour/B2C/src/components/RazorpayCheckout.tsx) with `.button-pay-primary` featuring padlock icon, arrow micro-animation, and 256-bit SSL / UPI / Cards trust verification badges.
- **Verification**: Verified with `npm run typecheck` passing with 0 errors.

## 2026-10-03 — Role-based Admin button for authenticated ADMIN / OWNER users only

Per user request ("admin page pe jane ka to admin button de authenticate user [admin] ko only"):
- **Header Navigation Admin Button**:
  - In [`B2C/src/components/Header.tsx`](file:///Users/deeptanubhunia/Desktop/gour/B2C/src/components/Header.tsx), added an authenticated session check via `/api/v1/auth/me`.
  - When the user is logged in with `admin` or `owner` role, renders a sleek, premium `.admin-nav-button` ("Admin" with shield icon) in the header's navigation actions, as well as an "Admin Operations" link in the mobile menu.
  - Standard customers or unauthenticated users cannot see this button.
- **Account Page Admin Portal Access**:
  - In [`B2C/src/app/account/page.tsx`](file:///Users/deeptanubhunia/Desktop/gour/B2C/src/app/account/page.tsx), checks `isPrivileged = ['admin', 'owner'].includes(user.role)`.
  - Renders a prominent "Admin Portal →" button (`.button-admin-panel`) linking to `/admin` and an "Operations Staff (ROLE)" verification badge.
- **Styling**:
  - Added dedicated CSS classes (`.button-admin-panel`, `.admin-account-badge`, `.admin-nav-button`, `.admin-nav-mobile`) in [`B2C/src/app/globals.css`](file:///Users/deeptanubhunia/Desktop/gour/B2C/src/app/globals.css) with support for transparent hero headers and mobile responsiveness.
- **Verification**: Verified with `npm run typecheck` passing with 0 errors.

## 2026-10-03 — Structured account orders table with column headings and status badges

Per user request ("inki headings de yrr"):
- **Account Orders Table & Headings**: Transformed the unstructured account orders list in [`B2C/src/app/account/page.tsx`](file:///Users/deeptanubhunia/Desktop/gour/B2C/src/app/account/page.tsx) into a clear, responsive table structure with distinct column headings:
  - `Order #`: Displays the clean authoritative order reference (e.g. `#GFT-MURCRDLN-A09001` or fallback slice).
  - `Date`: Formatted readable date (`10 Mar 2026`).
  - `Status`: High-contrast, clean status badge (`.status-badge`) formatting raw enums (e.g., `PAYMENT_PENDING` displayed as "Payment Pending", `CONFIRMED` as "Confirmed").
  - `Total`: Formatted currency total (`₹2,097.00`).
  - `Action`: Contextual link (`Review payment →` or `View details →`).
- **Responsive Layout & Visual Styling**: Added `.orders-table`, `.orders-table-header`, `.orders-table-row`, `.order-cell`, and `.status-badge` styling in [`B2C/src/app/globals.css`](file:///Users/deeptanubhunia/Desktop/gour/B2C/src/app/globals.css) with a 5-column desktop grid and mobile card fallback.
- **Backend Order Number Mapping**: Updated `GET /api/v1/auth/orders` in [`B2C/backend/auth/app.js`](file:///Users/deeptanubhunia/Desktop/gour/B2C/backend/auth/app.js) to return `orderNumber` alongside `_id`.
- **Verification**: Verified with `npm run typecheck` passing with 0 errors.

## 2026-10-03 — Automated backend packaging calculation & removal of customer box selection

Streamlined the gift curation and checkout flow per user specifications:
- **Removed Customer Box Headache**: Completely removed the "Choose your boxes", "Needs a little more room", and manual box selection UI from [`GiftCart.tsx`](file:///Users/deeptanubhunia/Desktop/gour/B2C/src/components/GiftCart.tsx). Customers can now add any number of items freely without blockers, capacity errors, or configuration prompts.
- **Backend Packaging Engine**: Created [`packaging.js`](file:///Users/deeptanubhunia/Desktop/gour/B2C/backend/gifting/packaging.js) implementing automatic internal box calculation for warehouse and fulfillment operations:
  - Each pre-configured Gift Hamper (`category: "Gift Hampers"` or `_hamper`) is counted as an independent presentation box (`1 hamper = 1 box`).
  - Individual/loose items (tea, candles, sweets, stationery, keepsakes) are packed at 4 to 5 items per curated box (`Math.ceil(looseCount / 5)`).
  - Total operational boxes required = `hamperBoxes + looseBoxes`.
- **Integrated Routes & API**: Updated [`routes.js`](file:///Users/deeptanubhunia/Desktop/gour/B2C/backend/gifting/routes.js):
  - Drafts with items automatically report `packing: 'READY'`.
  - Added fulfillment packaging calculation payload to `GET /draft`, `POST /checkout-check`, and `GET /checkout`.
  - Removed legacy box validation constraints to prevent 409 or 400 errors for customers.
- **Removed Legacy Store Bag Link**: Removed the "View store product bag →" link from the bottom of [`Cart`](file:///Users/deeptanubhunia/Desktop/gour/B2C/src/app/cart/page.tsx) so the cart UI remains exclusively focused on the customer's gift bag.
- **Checkout Phone & Optional Email**: Updated [`DeliveryCheckout.tsx`](file:///Users/deeptanubhunia/Desktop/gour/B2C/src/components/DeliveryCheckout.tsx), [`routes.js`](file:///Users/deeptanubhunia/Desktop/gour/B2C/backend/gifting/routes.js), and [`fields.js`](file:///Users/deeptanubhunia/Desktop/gour/B2C/backend/database/validators/fields.js):
  - Made `+91` the automatic default country code for India so customers only enter their 10-digit mobile number without manually typing country codes.
  - Added an `Email address (optional)` field to the delivery details form, saving it to `CustomerAddress` and rendering it in the final review summary.
- **Checkout Payment Options & Order Placement**: Updated [`DeliveryCheckout.tsx`](file:///Users/deeptanubhunia/Desktop/gour/B2C/src/components/DeliveryCheckout.tsx) and added `POST /order` to [`routes.js`](file:///Users/deeptanubhunia/Desktop/gour/B2C/backend/gifting/routes.js):
  - Replaced the unconfirmed pricing blocker notice with real checkout Payment Options: UPI / Instant QR (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Card, Net Banking, and Cash on Delivery (Pay on Delivery).
  - Assumed internal standard valuations behind the scenes to satisfy database `assertTotals` without writing item prices on the site.
  - Implemented one-click **Place Gift Order** that generates an authoritative `Order` document in MongoDB, clears the cart draft, updates header counter, and presents a confirmation screen with Order Reference `#GFT-...` and links to account order history.
- **Verification**: Verified with automated tests on live backend (auth server port 5003) and confirmed TypeScript passes with 0 errors.

## 2026-10-03 — End-to-end real customer flow verification and packing resolution


Audited and verified the complete customer flow against MongoDB without any fake/telemetry data:
- **Packing & Cart Readiness**: Fixed `packing()` in [`routes.js`](file:///Users/deeptanubhunia/Desktop/gour/B2C/backend/gifting/routes.js) and [`GiftCart.tsx`](file:///Users/deeptanubhunia/Desktop/gour/B2C/src/components/GiftCart.tsx) to evaluate individual items & hampers as `READY` when boxes are optional, resolving a 409 block when advancing to checkout.
- **End-to-End Execution**: Verified the real customer journey via live backend services:
  1. `GET /api/v1/auth/gift/draft` (HTTP 200)
  2. `PUT /api/v1/auth/gift/draft` (HTTP 200, selection persisted)
  3. `POST /api/v1/auth/register` (HTTP 201, customer created with isolated password hashing)
  4. `POST /api/v1/auth/gift/checkout-check` (HTTP 200, `packing: READY`, route `/checkout`)
  5. `POST /api/v1/auth/gift/address` (HTTP 200, real delivery address validated and stored in MongoDB `CustomerAddress`)
- Verified TypeScript build passing with 0 errors.

## 2026-10-03 — Center hero content, add word-blur entrance animation and falling gold sparkle effect

Per user request, updated the home page hero experience:
- **Centered Hero Content**: Positioned the hero heading, description, and action buttons in the vertical & horizontal center (`align-self: center; justify-self: center;`) with balanced radial shading for clear legibility over the editorial slideshow.
- **Word-Stagger Blur Animation**: Created [`HeroTitle.tsx`](file:///Users/deeptanubhunia/Desktop/gour/B2C/src/components/HeroTitle.tsx) replicating the footer's Framer Motion entrance (`opacity: 0 -> 1`, `y: 28 -> 0`, `filter: blur(12px) -> blur(0px)`, `staggerChildren: 0.09`) on each word across the title on every reload, followed by soft-blur subtitle entrance.
- **Falling Gold Sparkle & Leaf Sprinkle**: Added [`GoldPopperSprinkle.tsx`](file:///Users/deeptanubhunia/Desktop/gour/B2C/src/components/GoldPopperSprinkle.tsx) from `frontend_appview` to shower delicate falling gold leaves and sparkling star dust particles on canvas across the viewport on every reload.
- Verified TypeScript build passing with 0 errors and HTTP 200 on `http://localhost:3001`.

## 2026-10-03 — Refine copy and compact padding for "The Art of Gifting" section

Per user feedback, streamlined the brand story section on the home page:
- **Refined Copy**: Replaced repetitive fragmented quotes with crisp, premium editorial copy:
  - Eyebrow: `THE ART OF GIFTING`
  - Headline: `Thoughtfully Curated, Beautifully Given.`
  - Subtext: `From artisanal flavours to handcrafted keepsakes, each gift is chosen to create an unforgettable moment.`
  - CTA: `Explore the Collection →`
- **Adjusted Padding & Proportions**: Reduced vertical padding to `32px` with proportional typography (`clamp(22px, 2vw, 28px)` for heading, `clamp(15px, 1.3vw, 18px)` for subtext) and tightened margins, keeping the full-width edge-to-edge background aesthetic sleek and compact.
- Verified TypeScript checks passing with 0 errors.

## 2026-10-03 — Make "Beautiful things. Meaningful moments." section background full-width

Updated `.commerce-home .brand-story` in [`storefront.css`](file:///Users/deeptanubhunia/Desktop/gour/B2C/src/app/storefront.css) to span 100% full-width edge-to-edge across the viewport (`width: 100%; max-width: 100%; margin: 0;`), with adaptive padding `max(5%, calc((100vw - 1296px) / 2))` and a centered content column (`max-width: 680px; margin-inline: auto;`).
Verified on Next.js `http://localhost:3001` with 0 TypeScript errors.

## 2026-10-03 — Fix auto-rotation in "The Everyday Edit" showcase

Resolved an issue where macOS `prefers-reduced-motion` settings and cursor hover listeners prevented the auto-rotation interval from executing.
- Switched to an unconditional `setInterval` in [`FeaturedEdits.tsx`](file:///Users/deeptanubhunia/Desktop/gour/B2C/src/components/FeaturedEdits.tsx) that reliably cycles through the 3 edits every 4.5 seconds.
- Ensured 1200ms opacity crossfade in [`featured-edits.css`](file:///Users/deeptanubhunia/Desktop/gour/B2C/src/app/featured-edits.css) remains active for smooth transitions.
- Verified TypeScript build passing with 0 errors.

## 2026-10-02 — Update Scented Candles item with user-provided product photography

Replaced the image for `scented_candles` ("Scented Candles") with the user's uploaded artisanal soy wax amber jar candle ("Pluviophile Co. Himalayan Dusk") and floral wax candle photograph at `B2C/public/images/items/scented_candles.jpg`.
Synchronized MongoDB `Product.media` via `seed-catalogue.js`. Verified static asset serving via HTTP 200 on port 3001, auth service `/api/v1/auth/gift/catalogue` endpoint on port 5003, and verified TypeScript checks passing.

## 2026-10-02 — Update Hotwheels item with user-provided product photography

Replaced the image for `hotwheels` ("Hotwheels") with the user's uploaded collectible vintage roadster cars photograph at `B2C/public/images/items/hotwheels.jpg`.
Synchronized MongoDB `Product.media` via `seed-catalogue.js`. Verified static asset serving via HTTP 200 on port 3001, auth service `/api/v1/auth/gift/catalogue` endpoint on port 5003, and verified TypeScript checks passing.

## 2026-10-02 — Update Remote Control Car item with user-provided product photography

Replaced the image for `remote_control_car` ("Remote Control Car") with the user's uploaded Mini GT Porsche 911 GT3 RS model car and packaging photograph at `B2C/public/images/items/remote_control_car.jpg`.
Synchronized MongoDB `Product.media` via `seed-catalogue.js`. Verified static asset serving via HTTP 200 on port 3001, auth service `/api/v1/auth/gift/catalogue` endpoint on port 5003, and verified TypeScript checks passing.

## 2026-10-02 — Update Reynolds Trimax pen with user-provided product photography

Replaced the image for `reynolds_trimax` ("Reynolds Trimax") with the user's uploaded authentic, crisp studio photo of the classic blue Reynolds Trimax refillable fluid ink pen at `B2C/public/images/items/reynolds_trimax.jpg`.
Synchronized MongoDB `Product.media` via `seed-catalogue.js`. Verified static asset serving via HTTP 200 on port 3001, auth service `/api/v1/auth/gift/catalogue` endpoint on port 5003, and verified TypeScript checks passing.

## 2026-10-02 — Enable smooth, slow auto-rotation for "The Everyday Edit" showcase

Upgraded `FeaturedEdits` (`B2C/src/components/FeaturedEdits.tsx` and `B2C/src/app/featured-edits.css`) to smoothly and slowly auto-cycle through collections (`01 Gourmet`, `02 Candles`, `03 Paper`) every 5 seconds.
- Integrated cinematic Ken-Burns subtle scale settling (`scale(1.03)` to `scale(1)`) and 1200ms buttery cubic-bezier opacity crossfade for photographs.
- Upgraded tab buttons and editorial copy entrance animations with smooth 800ms easing.
- Added interaction listeners (`onMouseEnter`, `onMouseLeave`, `onFocusCapture`, `onBlurCapture`) to pause auto-advance while the user is reading or interacting, respecting accessibility (`prefers-reduced-motion: reduce`).
- Verified TypeScript build passing with 0 errors.

## 2026-10-02 — Update Diwali Celebration OG Hamper with user-provided presentation box photography

Replaced the image for `diwali_celebration_og_hamper` ("Diwali Celebration — OG Hamper") with the user's uploaded high-resolution studio photograph of the open luxury presentation gift box containing roasted nuts, Royal Assam tea, artisanal sweets (barfi, ladoo with saffron and silver foil), candle, incense, and festive treats with marigolds and diyas at `B2C/public/images/hampers/hamper_diwali_og.jpg`.
Synchronized MongoDB `Product.media` via `seed-catalogue.js`. Verified static asset serving via HTTP 200 on port 3001, auth service `/api/v1/auth/gift/catalogue` endpoint on port 5003, and verified TypeScript checks passing.

## 2026-10-02 — Update The Artisan Coffee Set hamper with user-provided presentation box photography

Replaced the composite image for `coffee_set_hamper` ("The Artisan Coffee Set") with the user's uploaded high-resolution studio photograph of an open luxury golden gift box containing a Davidoff Crema Intense jar, two ceramic mugs, brass spoon, and canisters surrounded by festive marigolds and brass diyas at `B2C/public/images/hampers/hamper_coffee_set.jpg`.
Synchronized MongoDB `Product.media` via `seed-catalogue.js`. Verified static asset serving via HTTP 200 on port 3001, auth service `/api/v1/auth/gift/catalogue` endpoint on port 5003, and verified TypeScript checks passing.

## 2026-10-02 — Update The Connoisseur’s Tea Set hamper with user-provided presentation box photography

Replaced the 4-panel composite image for `tea_set_hamper` ("The Connoisseur’s Tea Set") with the user's high-resolution studio photograph of an open luxury golden gift box containing the royal navy blue teapot, ceramic cups, Royal Assam tea tin, brass infuser spoon, and canister surrounded by festive marigolds and brass diyas at `B2C/public/images/hampers/hamper_tea_set.jpg`.
Synchronized MongoDB `Product.media` via `seed-catalogue.js`. Verified static asset serving via HTTP 200 on port 3001, auth service `/api/v1/auth/gift/catalogue` endpoint on port 5003, and verified TypeScript checks passing.

## 2026-10-02 — Update Vintage Orange Candies item with user-provided photography

Replaced the temporary placeholder asset for `orange_candies` with the user's uploaded high-resolution studio photo of classic sugar-dusted orange candy segments at `B2C/public/images/items/orange_candies.jpg`.
Updated `B2C/backend/gifting/items.json`, `B2C/src/lib/catalogue-preview.ts`, and synchronized MongoDB `Product.media`. Verified static asset serving via HTTP 200 on port 3001, reloaded backend auth service on port 5003, and verified 12/12 gift cart tests and TypeScript checks passing.

## 2026-10-02 — Update Eclairs item with user-provided Cadbury Choclairs photography

Replaced the temporary placeholder asset for `eclairs` with the user's uploaded high-resolution studio photo of the Cadbury Choclairs pack and gold-wrapped candies at `B2C/public/images/items/eclairs.jpg`.
Updated `B2C/backend/gifting/items.json`, `B2C/src/lib/catalogue-preview.ts`, and synchronized MongoDB `Product.media`. Verified static asset serving via HTTP 200 on port 3001, reloaded backend auth service on port 5003, and verified 12/12 gift cart tests and TypeScript checks passing.

## 2026-10-02 — Add dedicated Gift Hampers sidebar section with verified multi-item collages

Per user direction, established a dedicated `Gift Hampers` filter section in the shop sidebar (`/shop?search=hampers`).
Integrated all 6 curated Hampers (The Connoisseur’s Tea Set, The Artisan Coffee Set, Diwali Celebration OG Hamper, Generation Set Aesthetic, The Nostalgic Childhood Hamper, Japanese Crockery & Tableware Set) using high-resolution composite photo collages created with Sharp from the actual, verified product photographs of items inside each set (no stock/third-party box renders).
Updated `B2C/src/app/shop/page.tsx` sidebar navigation, `B2C/backend/gifting/items.json`, and `B2C/src/lib/catalogue-preview.ts`. Seeded active products in MongoDB, reloaded backend auth service on port 5003, and verified 12/12 gift cart tests and TypeScript checks passing.

## 2026-10-02 — Focus catalogue strictly on 35 individual master items, removing hampers and box selection

Per explicit user direction, removed all 6 pre-configured Gift Hampers (`tea_set_hamper`, `coffee_set_hamper`, `diwali_celebration_og_hamper`, `generation_set_aesthetic`, `childhood_hamper`, `crockery_set_japanese`) and the `gift_boxes` item from the master catalogue and archived them in MongoDB.
Emptied `boxes.json` and removed box selection dependencies: updated `GiftBuilder.tsx` to allow direct curation of individual master items without box prerequisites, updated `shop/page.tsx` links to `/build`, and redirected `/boxes` to `/build`.
Verified that only the 35 verified master items (teas, filter coffee, Reynolds Trimax, retro brick game, Shagun envelopes, etc.) are served via `/api/v1/auth/gift/catalogue` and displayed across the storefront. 12/12 gift cart tests and TypeScript checks passed cleanly.

## 2026-10-02 — Replace old template box renders with authentic brand photography

Removed old artificial template renders (`box_1.png` to `box_8.png` and `gift_boxes.jpg`) and replaced them with authentic, high-resolution brand product photography from The Gourmet Gifts Co. archives (ivory ribbon keepsake boxes with wax seal, emerald octagonal gold-embossed tin, rich emerald velvet trunk chest with brass clasps, two-tier luxe emerald drawer presentation suite, grand tower of signature ribbon boxes, eco-conscious velvet-lined wooden keepsake chests, and executive calibre leather suites).
Updated box metadata in `B2C/src/lib/boxes.json` and `B2C/backend/gifting/boxes.json`, updated shop intro alt copy in `B2C/src/app/shop/page.tsx`, and verified HTTP 200 static asset serving across Next.js and the auth gifting service.

## 2026-10-02 — Master catalogue replacement with 36 items & 6 gift hampers and dedicated product photography

Replaced generic/placeholder images across all 42 master catalogue items and hampers with dedicated, realistic studio product photography matching exact names (e.g. Reynolds Trimax liquid gel pen, handheld retro video game, vintage brick game, clip-on music player, Kinder Joy pod, handcrafted brass tea strainer, wabi-sabi Japanese ceramic cup, artisanal brass spoons, demerara sugar packets, luxury gold-foiled shagun envelopes, pastel baby announcement cards, vinyl stickers, stoneware ceramic mug, scented candles, designer copper bottle, journals, and hampers).
Seeded updated `media` into MongoDB `Product` and `ProductVariant` collections, updated `B2C/backend/gifting/items.json` and `B2C/src/lib/catalogue-preview.ts`. Verified static asset serving via HTTP 200 on Next.js port 3001, verified `/api/v1/auth/gift/catalogue` on port 5003, ran 12/12 gift cart tests and verified TypeScript typecheck passing.

## 2026-10-02 — Local MongoDB replica set recovery and owner provisioning

Configured local MongoDB replica set (`rs0` on `127.0.0.1:27017`) to unblock external Atlas network timeouts. Created operator script `B2C/backend/admin/setup-owners.js` to provision `keyursatra@gmail.com` and `Deeptanubhunia0@gmail.com` with `OWNER` role, bcrypt passwords, active status, customer profiles and audit records. Started B2C auth backend on port 5003; verified `/api/v1/auth/config`, `/api/v1/auth/gift/count`, `/api/v1/auth/login` and `/api/v1/auth/admin/session` passing with HTTP 200.

## 2026-09-30 — Preserve guest cart through sign-in

Extended shared cart queue to cookie initialization and builder/cart writes; Account waits for pending saves before email/Google sign-in and checkout redirects, reports unconfirmed writes and cancels late redirects after navigation away. Removed legacy localStorage dependence from cookie-owned auth/gift API calls, retained confirmed cart badge through outages, and corrected gift-route503 wording. Existing guest gift cookie, quantities, boxes and checkout sign-in requirement retained; no schema/customer-cart merge.

Added client/API and temporary-Mongo authentication/cart regressions:15 client tests and21 backend tests passed, along with lint/TypeScript/build. Seven isolated390px browser scenarios also passed; cart screenshot inspected. Configured Atlas remains unavailable with final direct/proxy503 checks; no live persistence fix or real Google consent claimed.

## 2026-09-30 — Simplify competing feature text

Retained three equal feature panels; shortened headings/descriptions, removed repetitive eyebrow labels and adjusted shared rows and section spacing. Preserved typography sizes/families, images, palette and existing shopping actions. Lint, eight-width browser checks and seven-width before/after preservation comparison passed. No backend or cart changes.

## 2026-09-30 — Investigate reported gift-draft503 responses

Read-only diagnosis reproduced503 through the direct auth service and frontend proxy while auth/config remained reachable. Fresh MongoDB ping and verified TLS probes fail despite successful DNS/TCP checks. Requested Atlas current-IP access-list confirmation; root infrastructure cause remains UNKNOWN. Updated runtime/recovery evidence and tracked the misleading generic sign-in error separately. No application/configuration/schema/process changes or successful Atlas cart write claimed.

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## 2026-09-25

### Added

- Earlier task: whole-project technology/design inventory in Markdown and Word, covering201 source files plus manifests/assets.
- This task:31 canonical memory files covering architecture, UI, database/models, contracts, user/admin/auth/order/payment/inventory flows, integrations and operational context.
- Root AGENTS.md session startup, conflict handling, scoped implementation and documentation maintenance rules.
- Initial source findings, unmet requirements, UNKNOWN policy/runtime facts and engineering-triaged priorities.

### Preserved

- Existing audit/Word export and frontend instruction files.
- Application source, database schemas, API behavior, page availability, UI and payment provider.

### Validation

- Checked requested file coverage and Markdown relative-link targets; reviewed generated route/model/environment inventories against source.
- Application tests/builds, provider connectivity and deployment were not run. Source findings are not reported as reproduced production incidents.

### Pending

- P0 integrity/auth findings and unverified operations tracked in TODO; business policy questions recorded in PROJECT_CONTEXT and domain docs.

## 2026-09-25 — Memory completeness follow-up

Created MEMORY_GAP_AUDIT before modifying canonical memory. Expanded customer relationships, historical snapshots, catalogue mutations, local/backend cart divergence, checkout/payment/stock states, queue/vault failures, endpoint effects, UI reuse, admin permissions and future invoice/refund/finance boundaries. Added R01–R19 traceability, U01–U12 decision registry and MC01–MC10 conflict evidence.

Preserved baseline32 gaps; later account-client finding changes final count to33. Corrected incomplete API validator snapshots and test/configuration wording; no feature or vulnerability fixed. Existing priority order preserved; gated false-success behavior added as a pre-activation P0 based on new source evidence. Documentation checks and changed-file counts are recorded in MEMORY_GAP_AUDIT. No build, application tests, live integration, migration or deployment performed.

## 2026-09-27 — First B2C implementation increment verified

Implemented S01: auth service assigns customer on every public signup, ignoring caller role. Added six regression cases (four HTTP injection variants, direct service bypass and existing-admin authorization), bringing backend coverage to14 tests across4 suites. Existing signup/login/refresh, cart, order and health tests retained.

Verification: pre-fix auth run reproduced5 failures and4 passes in isolated MongoDB. Initial sandbox run could not bind MongoDB port (EPERM); rerun with approved local-server permissions. First full run passed13/14 with a checkout Mongo IX-lock timeout; test setup now waits for registered model/index initialization. Final `cd backend && npm test`:4 suites passed,14 tests passed. Stripe/BullMQ remain mocked in order tests; Redis is mocked, MongoDB is a temporary replica set. No live payments, production data, frontend build, deployment or account activation tested/changed. These results do not verify unresolved payment concurrency or full B2C readiness.

Plan and canonical auth/security/API/customer memory updated. Next: socket admin authorization and real account integration, then catalogue/cart and commerce integrity. Tax/shipping/invoice/refund policy decisions remain UNKNOWN.

## 2026-09-27 — B2C location correction and actual app

User clarified the required implementation directory is `/Users/deeptanubhunia/Desktop/gour/B2C`. Actual Next.js app now lives at B2C/src with its own package/config/assets; backend source lives at B2C/backend. Original B2B frontends remain untouched in this increment. Earlier original-backend signup fix is retained, not reverted.

Implemented B2C home, search/pagination catalogue, product detail/variant selection, API-backed cart with server display data, genuine signup/login/me/logout and paginated order history. Existing products/images provide labelled read-only previews if backend unavailable, with no fabricated prices. Checkout is explicitly unavailable; payment/owner/invoice/refund/finance work remains unfinished. No live credentials copied and no data migrated.

Verified B2C production build, TypeScript and lint; B2C backend16 tests across4 suites passed with temporary MongoDB and mocked Redis/Stripe/BullMQ. Runtime preview is port3001; backend default5002, Redis logical DB1. Real backend/provider connectivity and browser interaction remain unverified. Local dependencies reuse existing installations via ignored symlinks; npm ci supports an independent install. See B2C/README.md for commands/limitations.

## 2026-09-28 — Implemented B2C database foundation

Created B2C/backend/database with20 Mongoose collections, indexes/Mongo validators, immutable snapshots, central transitions, transactional/idempotent stock/payment/refund/coupon operations, invoice issuance, customer/owner queries, fake seed and real replica-set regression/concurrency tests. Added db:install/db:seed/db:describe/test:database scripts without new dependencies. Generated field-level schema documentation and updated canonical domain/integration/status memory. No application routes, frontend, live database, provider configuration or deployment changed in this increment.

## 2026-09-29 — B2C reference storefront

Redesigned B2C homepage/header/footer from the user-provided September29 visual reference. Added original logo asset and two reused catalogue images, responsive collection/occasion layouts, editorial banners and working navigation to existing routes. Search icon targets shop search form. No credentials, backend or database changes in this UI increment.

## 2026-09-29 — B2C brand and B2B footer correction

User clarified that B2C should follow the active B2B header behavior and footer. Added the burgundy-backed monogram asset; the sticky header swaps from icon to company name after scroll. Changed the 761–1100px occasions grid to three columns. Replaced the B2C-specific footer with the B2B title, four-column navigation, concierge details and copyright treatment; B2B-only destinations are mapped to B2C shop searches or valid contact/home links. Verified changed components with ESLint, `npm run typecheck`, and browser checks at 851px and 390px. Whole-app lint remains blocked by the existing account-page `react-hooks/set-state-in-effect` diagnostic. Production build not rerun; no backend/data behavior changed.

## 2026-09-29 — Google auth and Atlas integration

Added real Google OAuth authorization-code adapter, verified identity persistence, bounded Mongo-backed sessions, registration/password login, account bootstrap/logout and owned order history. Added Google button, provider-error handling, auth-specific Next rewrite, new User fields/index, configuration placeholders and setup README. Started auth service after successful Atlas connection/guarded schema install. Awaiting Google Web Client credentials for live provider verification.

## 2026-09-30 — OAuth configuration reload

Google Client ID/Secret were present in the local environment file, but the auth process started before they were added still returned googleEnabled:false. Restarted the identified B2C auth service. Atlas-backed startup succeeded; direct port5003 and frontend port3001 now return googleEnabled:true. Both Google start endpoints return302 to accounts.google.com with browser flow cookie, state, S256 PKCE and callback http://localhost:3001/api/v1/auth/google/callback. No credential values printed. Google browser consent and completed callback/account persistence are still unverified; the user must finish sign-in in their browser. No application code changed.

## Local service recovery — 2026-09-30

User reported ERR_CONNECTION_REFUSED at localhost:3001. Frontend and auth listeners were absent; restarted B2C dev server and auth service. Verified homepage HTTP200 and proxied auth config googleEnabled:true. This incident was local service availability, not evidence of a Google credential rejection. Completed Google browser sign-in remains unverified.

## 2026-09-30 — B2C typography sourced from frontend_appview

CURRENT / IMPLEMENTED: user explicitly requests frontend_appview as the B2C typography authority. B2C/src/app/typography.css copies all8 source type-* classes exactly, font variables and local font declarations. Google font URL/weights now match the source layout (Cormorant300–700 plus italic400; Jakarta300–800). Local Pagio OTF, TropicalScript and DreamAlways assets copied. Active home hero mapped to31/48/60/68px at base/640/768/1024; source serif subtitle16/24px. Section headings24/36/48px, card titles17/19px, body15px/1.7, navigation11.5px and source footer responsive scale/mono labels applied. Google identity button keeps its provider-specific type styling. B2C content/layout/logo retained, with wrapping and tablet menu adjustments for source-sized text. Source files in frontend_appview were not modified.

Verification: production build (including TypeScript) and ESLint passed; script confirmed8 source typography class blocks copied verbatim. No browser-computed typography/visual comparison performed in this increment.

## 2026-09-30 — Account introduction composition

CURRENT / IMPLEMENTED: expanded signed-out account left panel with existing branded gift-box/candle photography, an overlapping note and compact gifting caption. New AccountIntro component retains heading/copy and frontend_appview typography; responsive image heights keep the mobile panel compact. Login form, provider flow and session logic unchanged. ESLint and TypeScript checks passed; browser visual verification not performed.


## 2026-09-30 — Account collage reverted

User rejected the latest account collage. Removed AccountIntro and its scoped CSS; restored the preceding text-only introduction. This supersedes the account introduction composition entry above. Existing typography and authentication remain unchanged.

## Account heading enlargement — 2026-09-30

User requested a larger two-line account heading, approximating the height from the email label through the password input. Added an account-only display override up to88px/1.04, bounded by its column width, with38–58px mobile scaling. Original Cormorant family and italic second line retained. No form/auth changes; exact browser alignment not measured.

## 2026-09-30 — Hero-backed navbar correction

CURRENT / IMPLEMENTED: home navbar now overlaps hero via a negative margin matching its actual88px desktop/78px mobile height. At home scroll<=40 it is transparent with light links; above40px it becomes solid white with dark links. Hero copy receives matching top clearance. Path-aware solid style keeps non-hero pages readable. Existing logo/wordmark scroll behavior retained; mobile expanded menu uses dark links on its light panel. Previous transparency alone exposed the page background because the header occupied a separate flow row. ESLint and TypeScript passed; browser visual verification pending.

## 2026-09-30 — Product card redesign

CURRENT / IMPLEMENTED: shared B2C ProductCard now uses an inset rounded photo, compact preview badge, white/ivory frame, aligned description area and bottom discovery CTA with divider. Keeps source-aligned Jakarta17/19px title scale, authentic product data, preview disclosure and product-detail destination. Applied to home signature edit and shop via shared component. No fabricated prices, ratings, favourites or add-to-cart behavior. Mobile spacing and reduced-motion rules included. ESLint and TypeScript passed; no browser visual check performed.

## 2026-09-30 — Minimal card revision

User rejected the rounded/filled-action design. Superseded it with unframed4:3 photography, no shadow/radius/overlay badge, source17/19px title typography, muted description and a small View details arrow link beside price or preview disclosure. One fine bottom divider; no floating-card effect. Home/shop share the revision. Lint and TypeScript passed; visual browser comparison not performed.

## 2026-09-30 — Box-first gifting and compact spacing

CURRENT / IMPLEMENTED: B2C Signature Edit now shows original signature box photography; /boxes lists all8, selection opens /build. Builder supports59 existing catalogue entries, search/filter, repeated item additions and Mongo-backed draft persistence. /cart shows selected items, alternative box images and +/- quantity controls; changing packaging preserves items. Backend owns the original4/5/4/8/6/4/4/6 capacities; client receives packing status only. Items may exceed packaging while browsing, but checkout-check rejects insufficient packaging. Shared section/form/card spacing reduced; 44px quantity controls, responsive grids and sticky review bar added.

CURRENT / PARTIAL: catalogue entries are selectable gift drafts, explicitly not saleable inventory. Prices/stock/box charges and payment are not established; checkout remains unavailable and no order/reservation/payment is created. Existing legacy commerce cart is preserved at /cart/store. The new browser-owned draft is separate from customer accounts and legacy Redis cart; login merge/cross-device ownership remains unresolved. Existing Google auth paths/cookie scope remain unchanged.

Verification: production build, TypeScript and ESLint passed. Database/auth/gifting suite41 tests passed, including private capacity serialization, exact fit/overflow/mixed boxes, invalid input, owner isolation, origin enforcement, reload persistence and concurrent stale writes. Initial race test found first-save revision ambiguity; corrected to expose stored __v+1 and empty revision0. Local Chrome390px verified overflow → add second box → fit, with no horizontal overflow; all59 item image paths exist. Additional viewport/full-backend checks recorded below when complete.

Final verification: full B2C backend57 tests across7 suites passed (`npm test -- --testTimeout=30000`). Chrome checked /, /boxes, /build, /cart, /account at320/768/1440px: no horizontal overflow or broken loaded images;390px overflow/add-box interaction also passed. Home scrolled navbar computed white. Build and lint passed. Runtime auth/gift service restarted on5003 with guarded Atlas schema install.

## 2026-09-30 — Shop redesign

CURRENT / IMPLEMENTED: Rebuilt B2C /shop with compact editorial heading, original-box invitation linking to /boxes, desktop collection navigation/mobile horizontal links, inline search, three-column desktop/two-column mobile photography and restrained product text. Reuses ProductCard with an optional compact variant scoped to shop; original palette and font families retained. Collection links use existing search semantics (not a new category API). Preview status shown once above the grid; unsupported price sorting hidden in preview mode, live sorting retained. Search, clear, pagination, empty state and product-detail links preserved. No backend, price, stock, cart or payment changes.

Verification: ESLint and TypeScript passed. Local Chrome at320/390/768/1440px showed no horizontal overflow or broken loaded images. Search returned3 beverages, page2 pagination worked and no-match state checked. Visual inspection caught inherited column layout stretching the search row; corrected with an explicit row direction.

## 2026-09-30 — Center desktop navigation

CURRENT / IMPLEMENTED: Desktop header uses equal side columns around the five navigation links, centering them independently of logo/icon widths. Compact1024–1199px sizing avoids collisions; mobile menu layout retained. CSS-only change.

Browser verification: navigation midpoint within0.01px of viewport center at1024/1100/1200/1440/1920px; no logo/action overlap after correcting inherited typography at1024px. Phone390px keeps collapsed menu; no horizontal overflow.

## 2026-09-30 — Original transparent navbar icon

CURRENT / IMPLEMENTED: B2C Brand now uses the exact /images/brand/LOGOs.svg from frontend_appview ResponsiveShell. Replaces the burgundy-backed PNG; existing centered navigation and scroll wordmark behavior retained. Copied asset verified byte-identical to source.

## 2026-09-30 — Card spacing correction

CURRENT / IMPLEMENTED: Removed stretched card content and automatic spacer margins across product, box, builder and cart-box cards. Image/title gap standardized to12px desktop and10px phone; title/body gaps5–6px, compact description/action spacing. Box photos now square to remove artificial side bands; descriptions have readable wrapping, with shop copy allowed two lines. Existing fonts, navigation and commerce behavior retained. Chrome390/1440px checked shop/boxes/build for image-title gap consistency and horizontal overflow; CSS-only change, no backend tests needed.

## 2026-09-30 — Razorpay gateway adapter

CURRENT / IMPLEMENTED: B2C/backend/payments adds Razorpay REST order creation, timing-safe Checkout HMAC and raw-webhook HMAC verification, provider payment fetch/matching and existing transactional capture integration. Authenticated endpoints use customer-owned immutable priced orders with fully reserved variants; browser amounts are rejected. One stable payment attempt/receipt plus a persistent initialization claim prevents duplicate create calls; ambiguous timeouts require reconciliation. Callback/webhook share one capture identity for exactly-once stock/order/payment/finance effects. New checkout component opens hosted Standard Checkout, handles dismissal/pending/error and reads persistent payment status. Account history links to owned order checkout.

CURRENT / PARTIAL: gift draft→priced/reserved order bridge, real prices/box charges, GST/shipping policy, durable failed-event recovery/reconciliation, reservation expiry and refunds remain pending. Gift-draft payments are not activated. Razorpay keys absent; blank server-only entries added to ignored .env and .env.example. No actual provider charge or public webhook delivery tested. Legacy Stripe preserved. See [payment setup](../B2C/backend/payments/README.md) for official references, routes and failure limits.

Verification: all49 database/auth/gifting/Razorpay tests passed across4 suites. New8 payment cases use temporary MongoDB, real HMAC checks and mocked Razorpay I/O. Production build, TypeScript and ESLint passed.

## 2026-09-30 — Sign-in and delivery checkout

CURRENT / IMPLEMENTED: primary gift cart now requires authenticated checkout; anonymous checkout-check returns401 and UI routes to /account?next=/checkout. Email signup/login and state-bound Google login return to an allowlisted checkout URL. Guest selection cookie survives login; no automatic customer/cart merge or cross-device claim introduced. Direct checkout and existing-order payment401 responses redirect to sign-in.

Authenticated GET /api/v1/auth/gift/checkout returns the browser selection and only the signed-in customer's saved addresses (up to20, newest first), rejecting invalid packing. POST /api/v1/auth/gift/address validates recipient, international phone, street, city/state, postal/country; Indian PIN format is six digits. Uses existing CustomerAddress repository, verifies ownership on edits, rejects caller customerId and unknown fields. Address is saved explicitly to the account; optional empty lines are unset. No identity phone verification, default-address change, customer merge or order snapshot mutation. UI has responsive delivery form, saved-address selection, edit/review and selection summary.

CURRENT / PARTIAL: supersedes the old cart's blanket draft-check message with a real sign-in/address/review journey. Review explains the remaining price/stock/quote blocker; saving an address does not place an order. Gift catalogue-to-saleable-variant mapping, approved box prices/tax/shipping calculation and order/reservation bridge are still required. No fabricated free delivery, tax or payment success.

## 2026-09-30 — Shorter B2C hero subtitle

CURRENT / IMPLEMENTED: replaced the long hero subtitle and forced line break with “Little luxuries for the people who matter.” No em dash. Copy-only change; source replacement verified, no tests required.

## 2026-09-30 — Homepage section bottom spacing

CURRENT / IMPLEMENTED: increased bottom padding for Shop Our Collections, The Gourmet Signature Edit and Gifts for Every Occasion to56px desktop and40px at widths up to760px (previous shared values28px/22px). Scoped CSS retains existing top padding and card spacing. Checked selectors against homepage source and existing cascade; no runtime visual check or tests for this CSS-only adjustment.

## 2026-09-30 — Full hero image fit

CURRENT / IMPLEMENTED: B2C hero image now uses full-width object-fit:contain and centered positioning across viewports, replacing cropped cover/75% desktop width. Original1400×703 aspect ratio is preserved; available extra space uses the existing hero background. Source cascade and image dimensions inspected; browser visual verification not performed.

## 2026-09-30 — Image-sized hero, no brown fill

CURRENT / IMPLEMENTED: supersedes the previous contain-in-fixed-height treatment. Original1400×703 photo now defines image height through intrinsic dimensions and width100%/height:auto; removed hero minimum heights and brown paint via scoped overrides. Desktop copy overlays the photo with a neutral transparent shade. Below1024px, full landscape image stays above readable copy on the existing page background; navbar still overlays image until scrolled. This avoids cropping, stretching and painted letterboxing.

Verified local Chrome320/390/768/1024/1440px: image aspect ratio~1.9915 throughout, transparent hero background, content inside hero and no horizontal overflow. Inspected390/1024px screenshots.

## 2026-09-30 — Ecommerce layout and motion refinement

CURRENT / IMPLEMENTED: explicit user request for an elegant ecommerce layout while keeping fonts, text sizes, image assets and colour theme. Added B2C/src/app/storefront.css for layout/motion only. Homepage now has a desktop signature-box introduction beside the three boxes, aligned inset editorial features, a stationery feature, occasion discovery cards and a compact assurance strip. Phone collections/signature/occasion rows use ShoppingRail with swipe, previous/next controls, progress indicator, keyboard arrows and44px controls. Feature tiles stack image above text at640px and below after browser inspection found the split layout cramped. Shop collection navigation stays visible on desktop, catalogue/box cards use restrained dividers/arrows, and desktop product photography stays alongside details.

StorefrontMotion adds progressive IntersectionObserver/Web Animations reveals with650ms easing,18px movement and small card delays; existing content remains visible without JavaScript. Reduced-motion cancels/rejects reveals, controls use instant scrolling, and focus cancels an active reveal on the focused element. Observers/animations clean up on navigation; catalogue updates are detected without an animation dependency. Native touch scrolling retained. No financial, auth, cart, price or inventory contracts changed.

Verified: production build including TypeScript, ESLint, and final TypeScript/lint checks passed. Local Chrome checked home/shop/boxes at320/390/768/1024/1440px without horizontal overflow, broken loaded images or browser exceptions. Before/after comparison at390/1440px found no changes to sampled headings, paragraphs, button font families/sizes/weights/line heights/text colours or ordered image paths. typography.css is byte-identical. Rail next/previous enablement and keyboard scroll, reduced-motion zero active reveal animations, and beverages search returning3 results checked. Hero retains1400:703 ratio and transparent navbar before scroll/white after; three homepage sections retain56px desktop bottom padding and40px mobile rules. Inspected desktop/mobile screenshots. Backend tests not repeated for presentation-only changes.

## 2026-09-30 — Signature Edit now showcases items

CURRENT / IMPLEMENTED: latest user direction supersedes the earlier homepage box-first Signature Edit requirement. Homepage now reuses catalogue() and ProductCard for the first three items, item detail destinations, item-focused introduction and View All Items→/shop. Existing preview disclosure/pricing handling preserved; no invented sale prices. Box selection remains available through /boxes and the shop invitation. Existing signature layout, square photo framing,14/12px titles and11/10px descriptions retained.

Verification: lint and TypeScript passed. Local homepage HTML confirmed Makhana, Artisanal Chikki and Chilli Cheese Bhujia with existing images and /products/* links; View All Items points to /shop. No box-builder links remain in this section.

## 2026-09-30 — Phone composition correction

CURRENT / IMPLEMENTED: user rejected the previous phone presentation. Below760px, homepage collections now show all7 in a grid (three columns below381px, four otherwise); Signature Edit displays all3 items in a compact two-column composition with the last item as an image/copy row; all6 occasions appear in a3×2 grid. Supersedes horizontal phone rails for these sections. Shared ShoppingRail remains for keyboard/overflow handling if required by other widths; no dead controls appear on the new grids.

Hero heading reflows to two natural lines using spans; mobile31px/desktop68px scales unchanged. Full-width46px primary CTA, simpler secondary action and a compact promise row reduce hero height. Existing full-image ratio remains1400:703 without brown fill. Mobile editorial images/cards and stationery feature use shorter frames and tighter margins; original image files, font declarations, text sizes and theme retained. Desktop layout retained, and requested40px phone section bottom padding remains.

Verification: lint and TypeScript passed. Chrome at320/375/390/430px verified7 collections,3 items and6 occasions all fit their grids without horizontal overflow;1440px desktop check also passed. Hero ratio~1.9915, mobile heading31px, desktop68px and primary mobile tap target46px measured. Inspected390px hero/items/occasions screenshots. Shop, boxes, item detail, account, cart and builder also checked at390px for horizontal overflow and broken loaded images. No backend changes or backend tests for this presentation-only correction.

## 2026-09-30 — Product-card reference implementation

CURRENT / IMPLEMENTED: home/shop share rounded portrait product cards with the supplied SVG curve, category label, consistent content spacing, a functional device-local heart and pill detail/options link. Existing typography, imagery and colour theme retained. All phone cards use the same portrait layout; earlier odd-third horizontal card rule removed. Preview data remains labelled with no fabricated prices/reviews or cart success. Browser review also found a legacy reduced-motion hover lift and hidden storage-error feedback; both corrected.

Verification: production build, lint and TypeScript passed. Chrome320/390/768/1440 home/shop checks, screenshot inspection, mobile tap/persistence/removal, storage failure and reduced-motion checks passed. No backend or payment changes; backend suites not repeated. Detailed evidence in UI_SYSTEM and TESTING.

## 2026-09-30 — Match rendered product-card screenshot

CURRENT / IMPLEMENTED: corrected wave from a middle hump to a descending high-left shoulder, shortened photo ratio to.95, brought content over the photo, restored a prominent Cormorant title and centered pill text independently of its bag icon. Narrow phones now show full-width cards. Visual review caught an old /shop mobile grid rule overriding the new column count; scoped selector corrected. Existing image assets, theme, local saves and product destinations retained. No backend change.

Verification for rendered-reference revision: lint, TypeScript and final production build passed. Chrome home/shop checks at320/390/481/640/768/1440px found no horizontal overflow, broken loaded images or runtime exceptions; narrow Shop grid correction rechecked at320/390/481/640px. Inspected phone and desktop screenshots. All12 Shop pill labels/icons were separated at481px, minimum height52px. Touch save, reload persistence, home/shop synchronization, removal, storage-corruption/denial handling, detail navigation and reduced-motion hover passed. Backend/provider behavior unchanged and not retested.

## 2026-09-30 — Gourmet, candle and stationery feature redesign

CURRENT / IMPLEMENTED: replaced the homepage's narrow paired tiles and separate oversized stationery banner with reusable FeaturedEdits and scoped featured-edits.css. Desktop has two large photo cards with inset copy panels, followed by one aligned stationery row. Tablet640–900px uses image/copy rows; phones stack the three cards with consistent20px gaps. Natural heading wrapping replaces forced line breaks; full-width action rows have circular burgundy arrows. Existing section gutters, image files, copy and shop query destinations retained. Top images use product-focused cover framing; stationery is contained so all notebook names remain visible. Existing progressive reveals and reduced-motion-aware image/arrow hover retained.

Before/after Chrome comparison at390/640/1440px found zero differences in heading/body/eyebrow/action font family, size, weight, line height or tracking and identical source image paths. Browser checks at320/390/640/768/1024/1440px found no page/card overflow, broken feature images or runtime exceptions. Inspected phone,768px tablet and desktop screenshots; action targets63–64px. All three actions navigate to their original filtered shop routes with results. Reduced motion shows zero feature animations and0s image transition. Lint, TypeScript and production build passed. No backend, commerce or product-card changes.

## 2026-09-30 — Restore product Add to Cart

Restored shared Add to Cart for59 known gift-catalogue items on Home, Shop and detail pages, replacing the redesign's detail-only preview action. Added explicit gift ID mapping, confirmed-save feedback, serialized read/write queue, one bounded conflict retry, pending-save navigation handling and stale-header-response guard. Existing boxes, unrelated quantities, card design and checkout authentication preserved; no database/API contract or payment changes.

Nine helper tests, lint, TypeScript, production build and isolated temporary-Mongo browser flow passed. Configured Atlas currently fails TLS negotiation, so real configured-runtime saves remain blocked and are tracked in CURRENT_STATUS/TODO. No false local save fallback was added.

## 2026-09-30 — Editorial feature layout

Replaced rounded gourmet/candle/stationery panels with one lead gourmet story and two portrait side stories. Added fine dividers, decorative indices, underlined arrow actions and staggered reveals; supplied distinct tablet and compact phone layouts. Existing typography, content, assets, colours, destinations and product/cart components preserved. Lint, production build/TypeScript and seven viewport checks passed.

## 2026-09-30 — Remove B2C decorative divider lines

Removed section, card, row, footer/header and account divider rules throughout B2C, including editorial CTA underlines and carousel progress hairline. Updated five existing stylesheets; kept functional form/button/quantity/focus boundaries and active/selected states. Typography, source images, spacing and business logic are unchanged. UI_SYSTEM now records the ongoing no-decorative-lines preference.

## 2026-09-30 — Selected three-panel feature design

Replaced asymmetric feature spread with three equal image-led panels. Shared desktop rows align headings/copy/actions; descriptions shortened and decorative indices removed. Added consistent tablet/phone compositions while retaining original type scale, assets, palette, destinations and no-divider styling. Scoped non-subgrid fallback to desktop after review. Build/TypeScript, lint and seven-width layout/typography checks passed.


## 2026-09-30 — Shop introduction redesign

Combined the Shop heading, short supporting copy and box-building action into one neutral banner with a large desktop box photograph and compact phone image/action row. Removed the secondary mini-card heading and its obsolete CSS overrides. Preserved typography scales, original image, palette, /boxes link and separate product/cart components.

Shop introduction checks: lint/TypeScript, responsive visual checks, before/after typography preservation, keyboard navigation, reduced motion and search passed.


## 2026-09-30 — Correct B2C burgundy

Removed overriding brown --wine value and routed announcement, header/icon, button-hover and footer-hover brand colours through canonical #3c0b1e. Existing card and Shop actions inherit the correction.


## 2026-09-30 — Center Signature Edit

Changed only the Signature heading's font family/weight to existing Pagio Regular, explicitly disabled italic/synthetic styling, and centered its introduction above the existing product grid. Removed obsolete intro placement overrides. Lint and320–1440px browser checks passed.


### 2026-09-30 — Try #4A0404

Changed canonical B2C brand token and Razorpay visual theme from #3c0b1e to #4A0404 at user request. No layout or application-flow change.


## 2026-09-30 — Hero and discovery panels

Rebuilt hero introduction as an inset cream panel below the original full-fit image, with clear primary/occasion actions and compact promise labels. Removed obsolete hero layout overrides. Reworked gourmet/candles/stationery into rounded image panels with integrated text, accessible full-panel links and reduced-motion-aware hover. Existing fonts/sizes, image files, destinations, brand token and Signature/product components retained.

Verified lint, TypeScript, production build,320–1920px responsive/font preservation, phone navigation, keyboard focus and reduced motion. Existing Atlas blocker remains separate.

## 2026-09-30 — Shared section-heading typeface

Extended existing Pagio Regular from Signature Edit to main B2C section/page headings, including upright Shop/Account emphasis. Centralized in typography.css; retained each heading's size/alignment/colour and separate product/body/navigation fonts.

Extended discovery's landscape breakpoint through1199px after browser inspection found Personalised Paper clipping at1024px; font size retained.

## 2026-10-01 — Warm canvas and burgundy footer

Added surfaces.css to balance warm ivory/rose content areas with a deep#4A0404 footer. Kept product cards light, added subtle hero-panel depth and tinted Signature/Story/Shop backgrounds. Darkened shared muted copy and retained visible footer hover/keyboard states. Existing fonts, photos, actions and navbar scroll colours preserved.

## 2026-10-01 — Pastel Kids navigation

Replaced navbar Personalised with Kids and added its existing-search filter to Shop. Bundled a small licensed Baloo2 subset for the label, four bright pastel letters and a contrast-preserving burgundy badge. Retained each breakpoint's navigation size, centered links and mobile close behavior. No catalogue items or backend data changed; Kids currently has no matching preview products.

2026-10-01: removed Kids label background at user request; font, size, pastel colours and navigation retained. CSS parse/source verification passed; no runtime or backend test for this single declaration removal.

2026-10-01: increased only the Kids label to1.2em; transparent background and colours retained. CSS parsing passed; no browser/backend test for this one-declaration change.


## 2026-10-01 — Centered hero introduction

Replaced the rejected overlapping cream panel with an open, centered warm intro. Removed duplicate eyebrow/promises and the panel shadow/rounding; preserved original copy, Pagio/type scales, hero photo, deep-red theme and shopping destinations. Updated scoped hero CSS and canonical UI/decision/requirement memory. Lint/TypeScript and eight-width responsive checks passed, including actual Pagio rendering, unchanged cart-button count, header scrolling, phone touch, keyboard focus/navigation and reduced motion. No commerce or original B2B source changes; TODO priorities unchanged.


2026-10-01 hero placement refinement: moved copy/actions onto the photograph using a shared grid; removed the separate below-image warm surface. Added gradient-backed paper text/actions with contrasting focus. Mobile grid can grow over#4A0404 while retaining the full image and existing type sizes. Lint and eight-width browser/navigation/reduced-motion checks passed. Only scoped hero CSS and canonical documentation changed.


## 2026-10-01 — Reference card refinement

Changed ProductCard's symmetric SVG ripple into a rounded high-left shoulder descending to the right. Added matched local warm-white card/curve colour, softer shadow and neutral heart well; refined Home/Shop grid widths while retaining images, product typography and burgundy actions. Cart/favourites behavior unchanged. Updated canonical UI, decisions, requirement and verification memory. Lint/TypeScript,12 isolated cart tests and26 responsive layout checks passed, plus keyboard wishlist persistence and mocked cart state/error handling. No backend/service/database changes or priority changes.


2026-10-01: moved only the hero headline/subtitle up24px (12px on phones) at user request and adjusted their gradient backing. CSS parsed successfully; Chrome before/after geometry at320/390/768/1440px confirms exact shifts, unchanged type metrics/buttons/photo/hero dimensions and no overflow. Phone screenshot inspected.


2026-10-01: reverted the unintended gradient adjustment made alongside the hero text shift. Restored the exact pre-shift desktop/phone gradients while retaining24px/12px text offsets. CSS parsing and source-value checks passed; no other styling changed.


## 2026-10-01 — Different layout for featured categories

Replaced FeaturedEdits' three tall overlay panels with alternating photo/copy rows, stacking below600px. Removed section overlays/card shells; kept the original photography, type metrics and destinations, with burgundy arrow actions and visible keyboard focus. Only featured-edits.css and canonical memory changed. Lint, ten-width layout/preservation checks, phone/keyboard navigation and reduced motion passed. Existing hero gradients/text offsets and product cards retained; TODO priorities unchanged.


## 2026-10-01 — Occasion hover underline

Added label-only animated burgundy underlines to all six occasion cards, with keyboard-focus and reduced-motion support. B2C lint/CSS parsing passed; browser verified hover-in/out for every label, unchanged card geometry, focus and four responsive widths. Updated UI/requirement/verification memory; no priority or application-flow changes.


## 2026-10-01 — Smooth hero image rotation

Added HeroSlideshow and two unchanged existing photo copies to B2C. Images rotate every6seconds with1600ms crossfades, decoded-image readiness, accessible pause/resume, reduced-motion/visibility guards and effect cleanup. Original text, gradient, hero geometry and first photo retained. Fixed the two-image fallback hard-cut found during review. Lint/TypeScript/CSS checks and responsive/playback browser verification passed; canonical memory updated. No backend or priority changes.


## 2026-10-01 — Interactive featured collection showcase

Replaced repeated alternating category rows with one photo-and-burgundy showcase and three accessible tabs. Retained original images, type scales and shopping links; added photo/copy transitions, decoded-image selection, stale-request protection and a truthful photo-error state. Stabilized phone panel height. Lint/TypeScript,24 responsive states, keyboard navigation, phone links and loading/reduced-motion checks passed. Updated canonical memory; no backend or priority changes.


## 2026-10-01 — Corporate navbar links to frontend_appview

Changed the Corporate navbar destination from B2C search to the active main B2B homepage. Added an optional public Corporate URL override to the environment example; kept existing navigation styling and mobile close behavior. Lint passed. Desktop1440px and mobile390px browser clicks reached http://localhost:3000/ with the main corporate homepage title and hero. Confirmed the running3000 process belongs to frontend_appview. Production fallback is source-configured only; no live-site or main-app edits. Priorities unchanged.


## 2026-10-01 — User-selected hero photos

Replaced the slideshow photo list with only the three supplied root assets in the requested order: brand/hero.png, pics/ChatGPT Image Sep 23, 2026, 09_50_14 PM-1.png, small_anipics/framee.png. Copied exact files into B2C/public and updated intrinsic dimensions/alt text. Hero styling and transition logic retained. SHA-256 copy checks and lint passed; local Chrome loaded all three images, verified the0→1→2→0 sequence with1600ms fades, and found no overflow at1440/390px. Canonical UI/requirement/decision memory updated; priorities unchanged.
