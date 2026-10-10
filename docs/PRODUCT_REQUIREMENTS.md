R114 (2026-10-10) CURRENT / IMPLEMENTED source; visual acceptance UNKNOWN: make `/products/[slug]` phone layout resemble the supplied product-detail reference with a large rounded square photo, compact details and fixed bottom price/Add to Cart area. Preserve existing real catalogue price or enquiry-only status, gallery data, gift-draft quantity control, and checkout eligibility; do not invent additional images/variants. Desktop and commerce contracts remain unchanged. Source: `B2C/src/app/products/[slug]/product-detail.css`, `ProductGallery`, `BuyPanel`.

R96 (2026-10-09) CURRENT / IMPLEMENTED source; visual acceptance UNKNOWN: recompose the product page's lower lifestyle, personalization and details areas into a paired image/story row, concise three-step personalization panel and contained finer-details accordion card. Preserve existing copy, enquiry paths, accordion behavior and phone-specific content treatment. Do not add assets or alter commerce. Sources: `B2C/src/app/products/[slug]/page.tsx`, `product-detail.css`.

R94 (2026-10-09) CURRENT / IMPLEMENTED source; visual acceptance UNKNOWN: use the regular Plus Jakarta Sans face for B2C headings/titles on phones through 640px, including Home hamper titles, while retaining Cormorant Garamond for larger viewports. Keep current text size/layout and exclude admin. Source: `B2C/src/app/typography.css`.

R93 (2026-10-09) CURRENT / IMPLEMENTED source; visual acceptance UNKNOWN: give B2C page, section and card titles a consistent polished gifting voice using the already bundled Cormorant Garamond. Preserve existing scales/layout, body/navigation/control fonts, admin styles and commerce behavior. Supersedes R65's Pagio Home titles and the later Manrope-wide title rule. Sources: `B2C/src/app/typography.css`, `B2C/src/app/b2c/design-tokens.css`, `B2C/src/app/home-fonts.css`.

R91–R92 (2026-10-09) CURRENT / IMPLEMENTED source; phone visual acceptance UNKNOWN: design the public B2C pages for phone screens with compact spacing, fewer secondary descriptions and image-forward cards while preserving core product selection/enquiry information, account forms, order details and delivery/checkout controls. Keep the Home hamper photo/title links and swipe behavior. Home philosophy hides its long paragraph and value-card descriptions on phones. Footer section/contact heading typography uses Cormorant Garamond. Desktop/tablet presentation is retained. Sources: `B2C/src/app/b2c/home.css`, `B2C/src/app/shop/shop.css`, `B2C/src/app/products/[slug]/product-detail.css`, `B2C/src/app/globals.css`, `B2C/src/components/home/home-footer.css`.

R90 (2026-10-09) CURRENT / IMPLEMENTED source: on phones, Home hamper cards show only a linked image and title; hide description and Explore action. Both image/title open the existing product detail page. Preserve larger screen card content. Source: `B2C/src/app/b2c/home.css`. Browser verification not run.

R89 (2026-10-09) CURRENT / IMPLEMENTED source: reveal the Shop dropdown on hover and dismiss it on pointer leave. Preserve focus access and touch click-to-toggle behavior. Source: `B2C/src/components/ShopNavigation.tsx`. Browser verification not run.

R88 (2026-10-09) CURRENT / IMPLEMENTED source: replace the Shop navbar dropdown's existing two links with Envelopes, Hampers, Laddoo Candles and Premium Stationery filters on `/shop`. Source: `B2C/src/components/ShopNavigation.tsx`. Browser verification not run.

R87 (2026-10-09) CURRENT / IMPLEMENTED source: prioritize phone hamper photography with taller images and more compact title/description/action panels. Preserve the swipe carousel and larger viewport styles. Source: `B2C/src/app/b2c/home.css`. Browser verification not run.

R86 (2026-10-09) CURRENT / IMPLEMENTED source: hide the Gourmet Story title, introduction and Explore gourmet hampers link on phones only. Keep the story carousel/cards and larger viewport layout. Source: `B2C/src/app/b2c/home.css`. Browser verification not run.

R85 (2026-10-09) CURRENT / IMPLEMENTED source: show Home hamper cards in a horizontal, touch-scrollable snap carousel on phones only. Keep tablet and desktop grid layouts unchanged. Source: `B2C/src/app/b2c/home.css`. Browser verification not run.

R84 (2026-10-09) CURRENT / IMPLEMENTED source: keep Envelopes and Hampers category browsing in the main `/shop` page by changing sidebar entries into search filters. Include the existing Ivory and India enquiry-only previews in unfiltered All gifts alongside the current catalogue and envelope products. Preserve preview pricing/cart restrictions and existing direct collection routes. Sources: `B2C/src/app/shop/page.tsx`, `B2C/src/lib/catalogue.ts`. Verification: source inspection and `git diff --check`; browser verification not run.

R83 (2026-10-09) CURRENT / IMPLEMENTED source: round the top two corners of the Home burgundy corporate CTA (32px desktop, 24px phone), keeping the lower edge square. Source: `B2C/src/app/b2c/home.css`.

R82 (2026-10-09) CURRENT / IMPLEMENTED source: add the approved mandala watermark to both upper corners of the Home hamper section, fading before the card area while leaving its centered heading readable. Reuse the existing image. Source: `B2C/src/app/b2c/home.css`. Browser verification not run.

R81 (2026-10-09) CURRENT / IMPLEMENTED source: visually hide the B2C Home viewport scrollbar while keeping page scrolling and horizontal carousel interactions available. Source: `B2C/src/app/b2c/home.css`. Browser verification not run.

R80 (2026-10-09) CURRENT / IMPLEMENTED source: apply the previously approved mandala image as a subtle page-edge watermark on B2C Home, with the center masked clear and content stacked above it. Reuse `diwali_mandala_bg.jpg`; no new artwork or dependency. Source: `B2C/src/app/b2c/home.css`. Browser verification not run.

# Product Requirements

R112 (2026-10-09) CURRENT / IMPLEMENTED source: remove the Home top spacer so the hero starts immediately below the navbar; retain the in-flow header, initial transparent background, and ivory scroll state. Verification pending; appearance UNKNOWN.

R111 (2026-10-09) SUPERSEDED by R112: restored 40px/24px spacing below the navbar; user clarified the spacer should be removed.

R110 (2026-10-09) SUPERSEDED by R111: the navbar overlay moved the hero too far upward; the current layout keeps the hero below the navbar.

R109 (2026-10-09) CURRENT / IMPLEMENTED source: extend the Home edge watermark into the initial transparent navbar. Set hero copy and promise labels white, with a left-side desktop contrast fade and a dark stacked text panel. Production build, focused ESLint and `git diff --check` pass; appearance UNKNOWN.

R108 (2026-10-09) SUPERSEDED by R110; RESTORED by R111: 40px/24px top padding separates the hero from the transparent navbar.

R107 (2026-10-09) SUPERSEDED by R108: initial in-flow spacing was too small; see the current 40px desktop/24px phone spacing requirement.

R106 (2026-10-09) SUPERSEDED by R111: briefly overlaid the Home navbar on the hero; R111 restores normal flow with space below the header while retaining transparent-on-load and ivory-on-scroll states.

R105 (2026-10-09) CURRENT / IMPLEMENTED source: remove the split Home hero. Use the provided 2129 × 739 images as complete banner-width slideshow frames, overlaying copy on left negative space and retaining fade/dots. Preserve full framing and stack photo before copy on phones. Production build and `git diff --check` pass; browser appearance UNKNOWN.

R104 (2026-10-09) SUPERSEDED by R111: Home navbar starts transparent and reveals an ivory background, divider and shadow after scroll; R111 retains the behavior with the restored spacing.

R103 (2026-10-09) CURRENT / IMPLEMENTED source: crossfade the Home hero through three existing gift photos and place direct-selection dots at the image's bottom center. Preserve full image framing; turn off autoplay when reduced motion is preferred. Typecheck, focused ESLint, production build and `git diff --check` pass; visual acceptance UNKNOWN.

R102 (2026-10-09) CURRENT / IMPLEMENTED source: restore the prior Home navbar's monogram and Shop/Hampers/Collections/Corporate labels. Keep the four requested Shop categories and hover behavior. Place the header in normal flow and remove the split hero's top margin. Typecheck, focused ESLint, production build and `git diff --check` pass; visual acceptance UNKNOWN.

R101 (2026-10-09) CURRENT / IMPLEMENTED source: raise the B2C Home side watermark opacity from 10% to 20%, preserving its edge mask and background stacking. `git diff --check` passes.

R100 (2026-10-09) CURRENT / IMPLEMENTED source: style the B2C hero as an inset rounded split banner, with left-aligned brand copy in its own panel and the existing product photo in a right-side 16:9 frame. Stack image above copy on phones and retain the existing Shop link. Production build, focused ESLint and `git diff --check` pass.

R99 (2026-10-09) CURRENT / IMPLEMENTED source: center all section-level and card titles on B2C Home while leaving the hero headline left aligned. Retain right-side section actions on desktop and place them beneath the heading on phones. Typecheck, production build, focused ESLint and `git diff --check` pass.

R98 (2026-10-09) CURRENT / IMPLEMENTED source: remove the complete Home “Familiar flavours. Fresh discoveries.” regional story section, including images and Explore gourmet hampers action. Keep the hero image restricted to the visual side of the split hero and ensure Home imagery fills its intended card frames without hover scaling. Preserve remaining Home sections, links and commerce behavior. Typecheck, production build, focused ESLint and `git diff --check` pass; visual acceptance UNKNOWN.

R97 (2026-10-09) CURRENT / IMPLEMENTED source: restyle B2C Home around a gifting storefront: split hero, three hamper tiles from existing preview images, favourite catalogue gifts and packaging story. Use actual catalogue prices/IDs and existing product pages/cart behavior; previews remain enquiry-only. Keep existing secondary Home content. On phones, hamper previews are image/title links in a horizontal snap row; favourites use a compact two-column grid. Do not claim unverified delivery coverage. Typecheck, production build, focused ESLint and `git diff --check` pass. Full ESLint reports a pre-existing error in `src/lib/types.ts`; browser appearance remains UNKNOWN. Sources: `B2C/src/app/b2c/page.tsx`, `home.css`, `Header.tsx`, `HomeSections.tsx`.

R79 (2026-10-08) CURRENT / IMPLEMENTED source: center the Home FAQ title and accordion content in a constrained responsive column. Center question/answer copy while keeping the disclosure icon at the row edge; preserve native details/summary interaction. Source: `B2C/src/app/b2c/home.css`, `B2C/src/components/home/HomeFAQ.tsx`. Verification: `git diff --check`; visual acceptance UNKNOWN.

R78 (2026-10-08) CURRENT / IMPLEMENTED source; visual acceptance UNKNOWN: turn the Home regional flavour cards into a responsive horizontal carousel with native swipe/scroll, scroll snapping, keyboard focus and previous/next buttons. Move one card per button activation, omit autoplay and honor reduced motion. Preserve all three images, captions, source copy and the Hampers link. Source: `B2C/src/components/home/HomeStoryCarousel.tsx`, `B2C/src/components/home/HomeSections.tsx`, `B2C/src/app/b2c/home.css`. Verification: TypeScript, scoped ESLint and `git diff --check`; browser preview not available.

R77 (2026-10-08) CURRENT / IMPLEMENTED source: remove the complete Home packaging section, three image/caption items and dedicated responsive styling. Preserve adjacent Home content and other uses of assets. Source: `B2C/src/app/b2c/page.tsx`, `B2C/src/components/home/HomeSections.tsx`, `B2C/src/app/b2c/home.css`. Verification: TypeScript, scoped ESLint and `git diff --check`; no browser preview.

R76 (2026-10-08) CURRENT / IMPLEMENTED source: remove the Shop Gifts, Explore Collections and Corporate Gifting actions from the Home hero and center the monogram alone. Preserve header/Hampers navigation and the later Corporate section. Source: `B2C/src/app/b2c/page.tsx`, `B2C/src/app/b2c/home.css`. Verification: TypeScript, scoped ESLint and `git diff --check`; no browser preview.

R75 (2026-10-08) CURRENT / IMPLEMENTED source; visual acceptance UNKNOWN: replace visible Home hero headline and support copy with the supplied TGG monogram, recolor its transparent artwork white with CSS, keep accessible h1 text and retain existing CTA destinations/reveal motion. Source: `B2C/src/components/HeroTitle.tsx`, `B2C/src/app/b2c/home.css`, `B2C/public/images/brand/hero-monogram.png`. Verification: TypeScript, scoped ESLint and `git diff --check`; no browser preview.

R74 (2026-10-08) CURRENT / IMPLEMENTED source; visual acceptance UNKNOWN: consolidate vertical spacing between hero title, supporting copy and actions, remove the duplicated nested mobile margin above actions, and tighten padding without obscuring content beneath the overlaid header. Preserve copy, routes and motion. Source: `B2C/src/app/b2c/home.css`. Verification: TypeScript, scoped ESLint and `git diff --check`; no browser preview.

R73 (2026-10-08) CURRENT / IMPLEMENTED source; visual acceptance UNKNOWN: improve Home hero copy/action visibility across image slides and avoid clipping at short viewports. Switch the headline to bundled Manrope, strengthen contrast and give both shop actions visible separation. Preserve text, destinations, slideshow and animation. Source: `B2C/src/app/b2c/home.css`, `HeroTitle.tsx`. Verification: TypeScript, scoped ESLint and `git diff --check`; no browser preview.

R72 (2026-10-08) CURRENT / IMPLEMENTED source; visual acceptance UNKNOWN: redesign the Home regional flavour stories as a premium editorial section with a split heading/intro/action, numbered image-led items and compact phone layout. Preserve the three stories, source copy, images/alt text, `/shop/hampers` route, and existing reveal behavior. Source: `B2C/src/components/home/HomeSections.tsx`, `B2C/src/app/b2c/home.css`. Verification: TypeScript, scoped ESLint and `git diff --check`; no browser preview.

R69 (2026-10-08) CURRENT / IMPLEMENTED source: remove the three-link Home collection strip and the entire “Good gifts, in good company” Wedding/Tea & Coffee feature section. Route the hero and Home navbar Collections actions to `/shop` instead of removed anchors. Preserve other Home sections and all dedicated Shop/product/enquiry routes. Source: `B2C/src/app/b2c/page.tsx`, `home.css`, `Header.tsx`, `HomeSections.tsx`, `home-content.ts`. Verification: TypeScript, scoped ESLint and `git diff --check`; no browser preview.

R68 (2026-10-08) CURRENT / IMPLEMENTED source, visual acceptance UNKNOWN: center the Home hero brand line, headline, supporting copy and actions. Set “The Gourmet Gifts” above “A little something. / A lot of thought.” and supporting copy “Gourmet hampers, little indulgences and thoughtful keepsakes. / For the people who matter.” Use Cormorant for the display lines and Jakarta for supporting copy, responsively sized. Match the `frontend_appview` footer's word rise/blur/stagger animation and respect reduced motion. Keep image, destinations, SEO and Home structure unchanged. Source: `HeroTitle.tsx`, `B2C/src/app/b2c/home.css`. Verification: TypeScript and `git diff --check`; no browser preview.

R67 (2026-10-08) SUPERSEDED by R69: the collection navigation that followed Hampers was later removed from Home; collection actions lead to `/shop`.

R66 (2026-10-08) SUPERSEDED IN PART by R67: removed the “The considered edit / For the moments worth marking.” heading block. The user clarified that the feature cards should also be removed; R67 preserves only the collection links after Hampers.

R65 (2026-10-08) SUPERSEDED by R93 for font family: the earlier Home section/card titles used Pagio Regular. Its reduced scale and separation from body/navigation/actions remain historical; R93 unifies title families in Cormorant Garamond. Sources: `B2C/src/app/b2c/design-tokens.css`, `home.css`.

R64 (2026-10-08) SUPERSEDED ON HOME by R67: the Home Candles/Shagun feature cards have been removed. Dedicated Shop/product pages and catalogue/cart behavior remain current.

R63 (2026-10-08) CURRENT / IMPLEMENTED source, visual acceptance UNKNOWN: put the two Home hamper product texts directly over their images, centered and gently revealed on hover/focus; keep visible on touch. Remove the top capsule and separate text panel. Animate the card slightly but never zoom the photo. Replace the oversized Home hero title and copy with a smaller, more refined, conversational version. Keep the brand palette, existing product destinations, enquiry states, Home structure and SEO data. Sources: B2C/src/app/b2c/page.tsx, home.css, HeroTitle, HomeSections. Verification: `git diff --check`; no build/browser preview.

R62 (2026-10-08) CURRENT / IMPLEMENTED section replacement; card interaction superseded by R63. Replace the Home occasion-discovery section after the hero with the existing Ivory/India hamper previews. Preserve full-screen photo hero layering, enquiry-only states, destinations, no duplicate hamper cards in favourites, and Home's Hampers quick links. Dedicated `/shop/hampers`, Shop dropdown, product identity/gallery and unknown price/stock/cart boundaries stay unchanged. Sources: B2C/src/app/b2c/page.tsx, home.css, HomeSections, Header, Footer, curated-hampers.ts.

R58 (2026-10-07) CURRENT / IMPLEMENTED except opening content superseded by R62, priced Home cards by R67 and collection/Wedding/Tea feature blocks by R69; visual acceptance UNKNOWN: implement the latest attached ecommerce brief and the subsequent rejection of its first visual iteration as a minimal, premium, consumer-first Home. Keep the ivory/burgundy/sparse-gold brand and existing photography. Short “Good taste. Great gestures.” hero; R62 replaces eight occasion covers/four favourites with an Ivory/India hamper showcase followed by the two priced gifts. Three merged collection links; brand philosophy/assurance; regional gourmet stories; photographed contents; packaging; Wedding and Tea/Coffee features; personalisation; secondary corporate entry; approved testimonials only when real data exists; FAQ and a Home-only consumer footer. The latest supplied brief supersedes R55's earlier Home order and R54's restored slideshow direction; R52/R53's rejected scroll-stack scenes stay removed.

R58 boundaries: Ivory/India remain enquiry-only; the two existing priced gifts reuse catalogue IDs/amounts and the gift-cart control. India Burgundy/Lavender remains one detail-page gallery. Contents are illustrative photos, personalisation is a validated 300-character email enquiry, and Tea/Coffee has no invented saleable SKU. No demo endorsements, tax/delivery/return promises, fake inventory or new payment/cart contracts. Typed content, reusable server-rendered sections, scoped Home tokens/CSS, deliberate phone composition, responsive Next images, self-hosted Latin Cormorant/Jakarta fonts, restrained optional mask motion, reduced-motion/focus cleanup and crawlable content support the requested scalability, responsiveness and SEO. User confirms the public canonical as `https://b2c-tau-weld.vercel.app/b2c`. Sources: b2c/page.tsx and Home styles, components/home, home-content.ts, home-seo.ts, HeroTitle, Header, Footer, StorefrontChrome and local font assets. Verification/limits: TESTING; production deployment and commercial readiness are not inferred.

R57 (2026-10-07) SUPERSEDED ON HOME by R58; CURRENT / IMPLEMENTED for the dedicated Hampers collection, visual acceptance UNKNOWN: the earlier correction used two wide, balanced cards above600px and one readable card per row on phones, with a fine full-card border, large uncropped photos, compact title/enquiry copy and View hamper arrow. Removing Home's signature-grid coupling corrected its forced four tracks, but that Home presentation/order is now historical. Dedicated Hampers sizing, product links, India thumbnail grouping, enquiry-only previews and non-hamper/PDP styling remain. Sources: ProductCard, ShopCollectionPage, product-cards.css. Historical evidence: TESTING.

R56 (2026-10-07) CURRENT / IMPLEMENTED UI, CURRENT / PARTIAL commercial setup; editorial contents section superseded in part by R95: apply the user's attached premium product-detail brief to `/products/[slug]` only. Large contained gallery, desktop sticky purchase information, restrained Cormorant/Jakarta typography, burgundy/ivory/stone palette, truthful price/preview states, retained cart quantity controls, gift-note enquiry, lifestyle/philosophy/personalisation, accessible accordions, <=3 related gifts and corporate enquiry CTA. R95 removes the numbered “What’s inside” photo/story section and its CTA; the separate collapsed “What’s included” accordion remains. Sarkar Throne inspected for hierarchy only; original brand identity retained. Explicit commercial-policy UNKNOWNs take precedence over sample brief values: no fabricated₹1499, tax inclusion,3–5-day delivery, complimentary-note benefit or new cart mapping. R47's compact hero and confirmed post-add counter remain. Sources: product route/CSS, ProductGallery, ProductPhoto, BuyPanel, GiftNoteRequest, product-editorial.ts. Verification: TESTING. Home/card/navigation direction unchanged.

R55 (2026-10-07) SUPERSEDED ON HOME by R58's later supplied section brief: earlier user requested Hero → Curated Gift Hampers → Shop Our Collections. Product/gallery identities and commerce behavior remain preserved.

R54 (2026-10-07) SUPERSEDED ON HOME by R58's later explicit redesign request: the earlier restoration reversed R52/R53 to the slideshow, collection/occasion/assurance sections, header and motion. R52/R53 remain rejected and removed; supplied hamper products/gallery, Shop navigation and commerce boundaries remain. Historical verification: TESTING.

R52 (2026-10-07) SUPERSEDED / REVERTED after explicit user rejection: user requests a cinematic full-screen burgundy hero with a slow mask image reveal and subtle headline movement/tracking. Scroll shrinks the same visual into a gold-lined editorial image as the background becomes ivory and a brand statement appears beside it. Retain existing imagery/palette; remove Home slideshow/particles/generic fade-ups. Sources: EditorialHero, editorial-scene.ts, editorial-hero.css, Header and StorefrontMotion. Progressive/reduced-motion behavior and verification: TESTING.

R53 (2026-10-07) SUPERSEDED / REVERTED after explicit user rejection: extend R52 with a sticky three-stage product story (Thoughtfully Curated → Beautifully Presented → Made Personal), controlled close-up reveals and minimal image movement, then four stacking collection cards (Gourmet, Corporate, Wedding and Tea/Coffee). Existing imagery and routes; no invented products/prices/categories. Supersedes the old Home collection/occasion rows and assurance layout only; R46's stationery catalogue union, R49's Shop destinations and R51's two hamper products remain. Sources: ProductStory, CollectionStack, editorial-scene.ts, associated CSS and Home. Reduced-motion/short-screen fallback, accessibility and scroll checks: TESTING.

R50 full-card correction (2026-10-07) CURRENT / IMPLEMENTED, visual acceptance UNKNOWN: latest user clarification requires the frame around the whole product card, including photo, title, price and Add to Cart. Reuse the gold asset at article level, keep all content/feedback inside responsive padding, and preserve no zoom/commerce behavior. Supersedes the photo-only frame placement below. Source: product-cards.css; full-card responsive and long-content evidence in TESTING.

R50 reference refinement (2026-10-07) CURRENT / IMPLEMENTED, visual acceptance UNKNOWN: user rejects the plain frame and supplies gold filigree reference. Replace cut-corner mount with a transparent double-rule rectangular frame, ornate acanthus corners and fleur-de-lis motifs around the photograph.12% photo inset and rounded corners keep ornament clear; preserve no zoom and existing fonts/actions/content. Sources: product-cards.css and antique-gold-filigree-frame.webp. Supersedes R50's earlier frame geometry; generation/provenance in UI_SYSTEM, local rendering checks in TESTING.

R50 (2026-10-07) CURRENT / IMPLEMENTED, visual acceptance UNKNOWN: redesign the product frame to suit the burgundy/ivory/gold gifting theme. Shared Home/Shop/Envelopes cards use an ivory stationery mount, small diagonal corners and fine gold outer/inner edges. Preserve contained photographs, no hover zoom, existing fonts/content/actions and responsive grids. Supersedes R48's arch only. Source: product-cards.css; final browser checks at320/390/768/1440px and CSS/diff checks are recorded in TESTING.

R49 (2026-10-07) CURRENT / IMPLEMENTED: Shop navbar has exactly Envelopes and Hampers options with dedicated `/shop/envelopes` and `/shop/hampers` routes. Responsive disclosure, keyboard/focus dismissal, active collection links, route-specific metadata, fixed collection catalogue queries, sort/pagination and truthful empty states reuse the existing UI. Envelope hero uses the Shagun image; Hampers entry links on Home/Shop now use the dedicated route. R69 removes the separate Premium Stationery shortcut from the Home strip; the merged Premium Stationery destination remains available in Shop. This explicitly supersedes R46's navigation restriction for envelope access. Sources: Header, ShopNavigation, ShopCollectionPage, shop-collections.ts, navigation.css and shop route pages. Verification: TESTING. No backend/category/payment change.

R48 (2026-10-05) CURRENT / IMPLEMENTED, visual acceptance UNKNOWN: user again rejects the card; minimal royal is the working direction. Shared Home/Shop cards now use tall native-CSS gold arched photo frames with6px/4px inset, open details and no boxed surface/outer outline/shadow/lift. Centered burgundy23px/17px Cormorant names,15px/13px amounts and44px solid burgundy actions retain original images/fonts and existing cart/preview branches. Photos remain contained and do not zoom; descriptions/capsules/likes remain removed. Supersedes prior nested rounded photo/card treatment and outlined action. Source: product-cards.css. Checks: CSS parsing/diff check and final-source Home/Shop containment/fit at320/390/768/1440px; TESTING records limits. Earlier assets remain inactive.

R47 (2026-10-05) CURRENT / IMPLEMENTED source, runtime verification limited to mocks: simplify gift product detail copy and show +/- beside Add to Cart after confirmed addition. Reuse QuantityControl; reload existing quantity, remove at zero, retain truthful errors and existing cookie/revision/queue semantics. Sources: product detail, BuyPanel, AddGiftToCartButton, gift-cart.ts. API/model: existing GiftDraft GET/PUT with no contract change. Tests:19 helper/API cases plus isolated browser interaction checks documented in TESTING. No live cart/payment readiness claim.

R46 (2026-10-05) CURRENT / IMPLEMENTED: merge envelopes, bookmarks and diary/pen sets under Premium Stationery. Latest user clarification supersedes the initial four-link interpretation: show exactly Hampers, Laddoo Candles and Premium Stationery, remove separate Shagun collection navigation and use the Shagun envelopes photo for merged stationery. Sources: B2C home/shop, catalogue-preview, catalogue and storefront.css. Checks: three catalogue tests, TypeScript, scoped lint and local rendered links/results; latest three-link/photo verification in TESTING. Product identities and database contracts are preserved.

Current direction (2026-09-27): user explicitly requests B2C gifting commerce implementation in this repository. Existing public B2B inquiry journey remains the observed baseline, not the target limitation. Earlier documentation-only scope below is historical and superseded for new work by this directive. Follow [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md); do not claim unfinished commerce is live.

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Explicit requirements

2026-09-25: provide whole-project technology/design extraction (completed audit). Initialize and maintain persistent engineering memory before major implementation; preserve continuity, architecture, UI and contracts; record changes and conflicts; never store secrets or invent unknown commercial policies. Maintain lifetime customer identity/history when valid matching exists; implementation gaps tracked in CUSTOMER_SYSTEM.

## Observed product scope (not newly approved requirements)

Main B2B catalogue, occasion-specific gifting pages, box/product curation, enquiry forms, WhatsApp contact and lead analytics. Alternate responsive frontend and dormant ecommerce backend/pages exist.

## Boundaries

Do not activate closed pages, change payment providers, redesign cards, merge frontends, introduce financial models or silently alter order states through memory setup. Exact business tax, shipping, refund, invoice, customer matching and retention requirements remain UNKNOWN. Example diagrams in memory instructions are documentation categories, not evidence that full ecommerce/finance systems exist.

## Acceptance for initialization

Canonical docs describe implemented/disabled/unknown states, cite source paths, preserve audit, record findings and known conflicts, establish session startup/update rules, and provide next priorities. Completed via documentation-only changes.

## Requirement traceability

REQUIRED describes the explicit memory/continuity/historical-integrity requirement; observed features are not newly approved scope. IMPLEMENTED means source exists, PARTIAL means a dependency/consumer/invariant is missing. DEFERRED applies to implementation during this documentation-only task, not an invented historical roadmap. UNKNOWN decisions U01–U12 are owned by [MEMORY_GAP_AUDIT.md](MEMORY_GAP_AUDIT.md). Test references below are source coverage, not passing results.

| ID / requirement and status | Canonical documentation | Database/storage | API | UI/source | Tests |
| --- | --- | --- | --- | --- | --- |
| R01 Preserve reconstructable memory — REQUIRED / IMPLEMENTED |PROJECT_CONTEXT, DECISIONS, MEMORY_GAP_AUDIT; root AGENTS |Repository Markdown |N/A |N/A |Documentation structure/link/hash checks |
| R02 Public gifting catalogue — IMPLEMENTED with divergent catalogues |BUSINESS_LOGIC, UI_SYSTEM |Local data; Product/Category separately |products, categories, gift-boxing |app/page.tsx, CollectionsClientView, OccasionPageTemplate |MISSING frontend/catalogue tests |
| R03 Inquiry and contact — PARTIAL acknowledgement/delivery |USER_FLOWS, INTEGRATIONS, DATABASE |Encrypted inquiries; no User relationship |POST /api/send-inquiry |InquiryModal, CuratedInquirySection, StickyInquiryDrawer |MISSING |
| R04 Real account authentication — PARTIAL gated client |AUTH_SYSTEM, SECURITY |User + refresh hashes |auth/*, users/profile |app/account/page.tsx contains mock fallback |auth.test.js including role-injection regressions; client tests MISSING |
| R05 Coherent lifetime customer history — REQUIRED / PARTIAL |CUSTOMER_SYSTEM, DATA_MODELS |User→Order; complete360 MISSING |orders reads; unified history MISSING |Real lifetime-history UI MISSING, account list static |1000-order/snapshot/access tests MISSING |
| R06 Cart persistence — PARTIAL incompatible consumers |USER_FLOWS, BUSINESS_LOGIC |Zustand/localStorage/IndexedDB; Redis cart |cart/* |useCart/useCartSync; sync only legacy shell |cart.test.js server only; replay/consumer tests MISSING |
| R07 Authoritative checkout — PARTIAL / current client BROKEN |ORDER_SYSTEM, API_CONTRACTS |Order/Product; Redis |POST /orders |Gated checkout ignores clientSecret |order.test.js stock and sequential replay; full flow MISSING |
| R08 Payment integrity — PARTIAL |PAYMENT_SYSTEM, EDGE_CASES |Order.payment, no event ledger |orders/webhook |Stripe browser confirmation MISSING |Webhook/reconciliation tests MISSING |
| R09 Stock conservation — PARTIAL |INVENTORY_SYSTEM, ARCHITECTURE |Product base/variant quantities; BullMQ |orders; products admin updates |Admin stock UI MISSING |Base decrement covered; concurrent variant/release tests MISSING |
| R10 Coupon correctness — PARTIAL |BUSINESS_LOGIC, DATA_MODELS |Coupon usedCount/restrictions |coupons/*; order validation |Gated checkout entry |MISSING |
| R11 Shipment calculation/tracking — PARTIAL fields only |ORDER_SYSTEM |Order addresses/cost/tracking |Order input; carrier/rate APIs MISSING |Address form; delivery promise not validated |MISSING |
| R12 Established tax treatment — UNKNOWN policy / PARTIAL integration |PAYMENT_SYSTEM |Order.tax |Stripe tax via orders, no standalone tax API |Gated checkout estimates |MISSING |
| R13 Invoice lifecycle — FUTURE / REQUIRED design context, implementation DEFERRED |INVOICE_SYSTEM |MISSING |MISSING |MISSING |MISSING |
| R14 Refund lifecycle — FUTURE / REQUIRED design context, implementation DEFERRED |REFUND_SYSTEM |MISSING |MISSING |MISSING |MISSING |
| R15 Financial history/reconciliation — PARTIAL operational / FUTURE formal |FINANCE_SYSTEM |Order totals; financial ledger MISSING |admin/stats; reconciliation API MISSING |No formal finance UI |MISSING |
| R16 Governed admin access — PARTIAL |ADMIN_FLOWS, SECURITY |User.role vs separate PIN/vault |Express admin; Next admin auth/data/export |Gated studio-admin |Role/socket/PIN tests MISSING |
| R17 Lead analytics — IMPLEMENTED with durability/privacy gaps |DATABASE, INTEGRATIONS |Encrypted sessions/section map |telemetry/collect, geo/detect |useSilentTelemetry, LocationPromptBar |MISSING |
| R18 Search discoverability — IMPLEMENTED source / runtime UNKNOWN |SEO, UI_SYSTEM |Local page metadata/data |sitemap.ts, robots.txt, metadata |Public routes and structured data |Rendered SEO tests MISSING |
| R19 Recovery/deployment — UNKNOWN operations / PARTIAL source |DEPLOYMENT, ENVIRONMENT, TESTING |Mongo/Redis/vault dependencies |healthz |offline page; service worker MISSING |health.test.js only; restore/outage tests MISSING |

Sources are relative to frontend_appview/src unless backend/API is named; test suites live under backend/src/features/<domain>/__tests__. Entity field definitions and endpoint request/response tables are canonical in DATA_MODELS and API_CONTRACTS. This matrix links requirements to missing dependencies rather than inventing endpoints or policies.

## Box-first gifting — 2026-09-30

R20 CURRENT / IMPLEMENTED: box-first Signature Edit, freely add draft items, server-private packing limits, cart replacement/multi-box counters and compact responsive spacing. Source: B2C/backend/gifting, database GiftDraft, src/components/BoxCard/GiftBuilder/GiftCart, src/hooks/useGiftDraft. Verification: database/tests/gifting.test.js plus local browser checks. CURRENT / PARTIAL: real saleable inventory, box charges, packing/order snapshots, payment and account merge remain outstanding; draft does not promise order placement.

## Razorpay — 2026-09-30

R21 CURRENT / PARTIAL: Razorpay adapter and hosted Checkout integration for existing priced/reserved orders. Sources B2C/backend/payments and RazorpayCheckout; tests database/tests/razorpay.test.js. Credentials, real test payment, public webhook delivery, pricing/stock/packing quote bridge and recovery dependencies remain open.

R22 (2026-09-30) CURRENT / IMPLEMENTED: mandatory sign-in before checkout, delivery phone/address capture and customer-owned address reuse. Source GiftCart, DeliveryCheckout, account, backend/auth and gifting/routes. Tests database/tests/auth.test.js and gifting.test.js. CURRENT / PARTIAL: gift quote/order/payment bridge still missing; review states this explicitly.

R23 (2026-09-30) CURRENT / IMPLEMENTED: ecommerce layout and animations preserving typography, text sizes, source images and theme. Sources storefront.css, ShoppingRail, StorefrontMotion and home/shop/boxes/product layouts. Verified responsive layouts, keyboard/touch-rail controls, reduced motion, before/after typography/image comparison, production build and lint.

## 2026-09-30 — Signature Edit now showcases items

CURRENT / IMPLEMENTED: latest user direction supersedes the earlier homepage box-first Signature Edit requirement. Homepage now reuses catalogue() and ProductCard for the first three items, item detail destinations, item-focused introduction and View All Items→/shop. Existing preview disclosure/pricing handling preserved; no invented sale prices. Box selection remains available through /boxes and the shop invitation. Existing signature layout, square photo framing,14/12px titles and11/10px descriptions retained.

R24 (2026-09-30) CURRENT / IMPLEMENTED: apply user's pasted product-card design to B2C home/shop while retaining existing fonts/sizes/images/theme. Shared ProductCard/product-cards.css implements rounded portrait photo, supplied curve, category, device-local heart and pill detail/options action. Supersedes previous product-card silhouette and mobile third-card row, retaining R23's other layout requirements. Sample rating/pricing is not business data. Verified responsive rendering, local-save interactions, product navigation, reduced motion, build/lint/TypeScript; no database wishlist or cart mutation added.

R24 refinement (2026-09-30): latest rendered diffuser screenshot supersedes the original code sample where they differ. Product cards now use a descending curve, overlapping panel, larger existing Cormorant title and single-column layout below481px. Surrounding site typography and original imagery/palette remain. Review/price samples are not business data; preview cards keep truthful detail actions.

R25 (2026-09-30) CURRENT / IMPLEMENTED: redesign the homepage gourmet, candles and personalised stationery group. FeaturedEdits.tsx/featured-edits.css supplies aligned desktop photo cards and stationery row, tablet rows and phone stacks, preserving source assets, font scales and existing shop destinations. Responsive screenshots, computed-typography comparison, navigation, reduced motion, build/lint/TypeScript verified.

R26 (2026-09-30) CURRENT / IMPLEMENTED in source, CURRENT / PARTIAL in configured runtime: restore Add to Cart lost during card styling. Known gift items on Home/Shop/detail save through existing GiftDraft, preserving quantities, packaging and checkout sign-in. Supersedes R24's detail-only preview actions. Nine helper tests and isolated database/browser flow passed; current Atlas TLS connection failure prevents configured-runtime persistence. Commerce pricing/order bridge remains unfinished.

R27 (2026-09-30) CURRENT / IMPLEMENTED: latest user request supersedes R25's rounded feature-card presentation. FeaturedEdits now uses asymmetric editorial hierarchy, compact phone image/heading pairs, fine rules, numbered labels and text-link actions. Existing fonts/sizes/images/theme/copy/destinations preserved. Source and responsive verification recorded in UI_SYSTEM/TESTING. Product cards and Add to Cart are outside this layout change.

R28 (2026-09-30) CURRENT / IMPLEMENTED: remove decorative margin/divider lines across the active B2C storefront. Supersedes R27's feature dividers and older B2C decorative row/section rules. Five existing stylesheets updated; control boundaries, keyboard focus, selected-state indications and application flows retained. No B2B frontend changes.

R29 (2026-09-30) CURRENT / IMPLEMENTED: user selected three equal image-led panels with compact copy. Supersedes R27's asymmetric hierarchy while retaining R28's no decorative lines. Equal desktop photo stages and aligned copy/actions; consistent tablet rows and phone panels. Existing font scale, images, palette, destinations and separate product/cart features retained. Sources: FeaturedEdits.tsx/featured-edits.css.

R29 refinement (2026-09-30) CURRENT / IMPLEMENTED: user accepts the layout but requests less competing text. Short titles and descriptions replace long marketing copy; eyebrow labels removed. Preserve font sizes and shared alignment, with clearer whitespace before Occasions. Browser checks at320–1920px and lint passed; source/verification details in UI_SYSTEM and TESTING.

R30 (2026-09-30) CURRENT / IMPLEMENTED in source, CURRENT / PARTIAL in configured runtime: Add to Cart must work for guests and signed-in users, retaining pre-login items through sign-in. Existing browser gift ownership is preserved; pending save/cookie operations serialize and Account redirects await them. Cookie-based APIs do not depend on localStorage. Sources: gift-cart.ts, useGiftDraft.ts, account/page.tsx, api.ts, Header.tsx, backend/auth/app.js. Tests: gift-cart.test.cjs, api.test.cjs, database/tests/gifting.test.js and auth.test.js. Current Atlas TLS failure still blocks actual configured-runtime saves; cross-device account cart merging is outside this increment.


R31 (2026-09-30) CURRENT / IMPLEMENTED: redesign the screenshot's Shop introduction. One cohesive banner combines the existing heading, compact description, original box photo and Build your gift action; phones use a compact photo/action row. Preserves existing font scales, palette, /boxes destination and no-decorative-lines requirement. Source: B2C/src/app/shop/page.tsx, shop.css and storefront.css. Product cards and cart behavior remain separate. Verification: TESTING.


R32 (2026-09-30) CURRENT / IMPLEMENTED: B2C primary brand/action colour must be exact #3c0b1e, replacing the brown override and hardcoded brown accents. Canonical token and consumer corrections in globals.css; no font, layout, image or cart changes. Verification recorded in TESTING.


R33 (2026-09-30) CURRENT / IMPLEMENTED: The Gourmet Signature Edit must use a distinctive elegant non-italic font and centered text. Existing local Pagio Regular400 now renders this heading; header/subtitle/action are centered above items. Other headings, existing font-size scale, burgundy and product/cart components retained. Sources: typography.css/storefront.css; verification in TESTING.


R32 colour refinement (2026-09-30) CURRENT / IMPLEMENTED: latest user request to try #4A0404 supersedes #3c0b1e for current brand/action styling. Canonical token and checkout visual theme updated; Signature typography/alignment retained.


R34 (2026-09-30) CURRENT / IMPLEMENTED: redesign homepage hero and screenshot's gourmet/candles/stationery section. Full-fit hero photography plus inset shopping introduction; three immersive desktop discovery panels and responsive tablet/phone variants. Reuse original imagery/type scales and #4A0404; preserve transparent-before-scroll navigation, no decorative lines, Signature typography and commerce components. Source: page.tsx/globals.css/storefront.css and FeaturedEdits.tsx/featured-edits.css. Supersedes previous hero and R29 feature presentation, preserving its equal desktop weighting. Verification in TESTING.

R35 (2026-09-30) CURRENT / IMPLEMENTED: use Signature Edit's Pagio font for every B2C section heading. Shared typography.css rule covers main page/section h1/h2, with upright Regular400 and existing sizes/alignments. Product-name headings, card labels, body and navigation remain separate. Supersedes R33's Signature-only font exception; Signature centering remains specific to that section.

R35 responsive fit: featured-edits.css keeps landscape panels through1199px so wider Pagio headings fit without shrinking the existing type scale. Three equal desktop columns begin at1200px.

R36 (2026-10-01) CURRENT / IMPLEMENTED: reduce the overly white appearance with warmer backgrounds and existing#4A0404 contrast. Tinted canvas/selected sections plus deep-red footer, with readable muted/hover/focus states. Preserve Pagio/type sizes, original images, light card surfaces, navbar scroll behaviour and application flows. Sources: surfaces.css, layout.tsx import and shop.css muted tokens. Verification in TESTING.

R37 (2026-10-01) CURRENT / IMPLEMENTED navigation, CURRENT / PARTIAL catalogue: replace Personalised with Kids, playful font at the same nav size, each letter a different bright pastel. Header.tsx and kids-nav.css use accessible decorative letters and local licensed Baloo2; Shop filter routes to search=kids. No existing Kids products were established, so empty results remain until user-confirmed assignments are supplied.

R37 refinements: user subsequently removed the background and requested slightly larger Kids text. Current label is transparent and1.2em of the responsive link size; this supersedes the initial exact-size match.


R38 (2026-10-01) CURRENT / IMPLEMENTED: redesign the rejected hero text/action panel. Original headline/copy and actions now form a centered open composition on the warm surface, without the rounded cream card, overlap, eyebrow or repeated promise icons. Preserve existing fonts/sizes, full-fit photography, navbar behavior, #4A0404 and /shop/#occasions destinations. Supersedes R34's hero introduction only; its discovery section remains. Source: B2C/src/app/page.tsx, globals.css, surfaces.css. Verification: TESTING.


R38 placement refinement (2026-10-01) CURRENT / IMPLEMENTED: latest request moves copy/actions onto the hero image, superseding the introduction underneath. Preserve font sizes, full-fit photo and shopping links; phone hero may grow over the existing burgundy background to fit readable copy below navbar clearance. Source: globals.css; verification in TESTING.


R39 (2026-10-01) CURRENT / IMPLEMENTED: shared Home/Shop product cards follow the supplied diffuser reference: tall rounded photo, high-left curved paper content panel descending to the right, category/title/description, independent circular heart, price or truthful preview label, and full-width pill action. Preserve original images, established product fonts and#4A0404; no invented ratings/prices. Card grids retain useful phone/tablet width and existing AddGiftToCartButton/detail-link branches. Sources: ProductCard.tsx, product-cards.css; verification: TESTING.


R38 spacing refinement (2026-10-01) CURRENT / IMPLEMENTED: user requests the hero headline/subtitle slightly higher; scoped24px desktop/tablet and12px phone lift, with other hero geometry preserved.


R38 spacing correction (2026-10-01) CURRENT / IMPLEMENTED: explicit user clarification requires only the text-position change. Original hero gradients restored; headline/subtitle lift retained.


R40 (2026-10-01) CURRENT / IMPLEMENTED: featured gourmet/candle/stationery section must have a different composition from product cards above. Three alternating wide photo/copy rows from600px, photo-above-copy stacks below600px, separate readable copy and circular-arrow actions. Preserve images, typography metrics, theme, links and no decorative lines. Supersedes only R34/R35 discovery-layout details; R38 hero and R39 product cards remain. Source: B2C/src/app/featured-edits.css; verification: TESTING.


R41 (2026-10-01) CURRENT / IMPLEMENTED: animate an underline beneath the six occasion-card labels on hover. Label-width burgundy line also appears on keyboard focus; reduced motion disables its transition. Preserve card layout and links. Sources: page.tsx/storefront.css; verification: TESTING.


R42 (2026-10-01) CURRENT / IMPLEMENTED: hero images smoothly crossfade; user confirmed existing project photos. Three-photo rotation,6-second cadence,1600ms fades, decode-before-display, pause/resume and reduced-motion support. Preserve full foreground images, hero size, text position/fonts, CTA destinations and the corrected gradient. Latest explicit selection limits rotation to root `images/brand/hero.png`, `images/pics/ChatGPT Image Sep 23, 2026, 09_50_14 PM-1.png`, then `images/small_anipics/framee.png`, copied unchanged into B2C/public. Sources: HeroSlideshow.tsx, page.tsx, globals.css and the three copied assets. Verification: TESTING.


R43 (2026-10-01) CURRENT / IMPLEMENTED: redesign the rejected alternating gourmet/candle/paper rows into one interactive photo-and-burgundy collection showcase. Compact category tabs update the photograph and matching copy/CTA; preserve source imagery, shared Pagio/type sizes, theme and destinations. Responsive stacked presentation, keyboard tabs, image-readiness handling and reduced-motion support required. Supersedes R40 presentation; R41 occasion underlines and R42 hero slideshow remain. Sources: FeaturedEdits.tsx/featured-edits.css; verification: TESTING.


R44 (2026-10-01) CURRENT / IMPLEMENTED: Corporate in B2C navigation must open frontend_appview. Header links to the active main homepage in the same tab, with local3000/production canonical defaults and an optional public URL override. Desktop/mobile navigation verified locally. Source: Header.tsx; configuration: ENVIRONMENT.

R45 (2026-10-01) CURRENT / PARTIAL overall: the user's owner/admin operations directive requires a real permission-controlled `/admin` portal in B2C, using existing login/session/Mongo architecture, audited operations, truthful exception-first reporting and complete vertical workflows. The original app's PIN/vault admin is not an authorization model for this portal. The pre-implementation frontend/backend audit identified the path-scoped cookie, staff-without-Customer login constraints, existing guarded database transactions, preview-vs-saleable catalogue split and unavailable provider/business policies; those boundaries constrain the implemented scope.

| Requirement area | Current traceability / scope |
| --- | --- |
| Admin workspace and access | CURRENT / IMPLEMENTED source: `/admin/[[...segments]]`, noindex metadata, client session gate through `/api/v1/auth/admin/session`, exact `/admin` login return, server-permission navigation and API enforcement. No private SSR props or browser role/storage authority. A client403 view is distinct from the initial HTML status. |
| Business overview and analytics | CURRENT / IMPLEMENTED source: explicit currency/timezone/date interval, authoritative needs-attention links, formula/source-labelled payment/order/refund/stock metrics, product-unit results and truthful unavailable states. Revenue recognition remains UNKNOWN pending policy. |
| Read operations and customer360 | CURRENT / IMPLEMENTED source: bounded server lists, supported filters, record details and separately paginated related records for orders, customers, catalogue, inventory, payments, refunds, invoices, coupons, shipping, notifications and audit. Customer/order/invoice snapshots remain historical. |
| Supported commerce writes | CURRENT / IMPLEMENTED source: category/product/variant/coupon creation, supported product/variant/coupon changes, reasoned stock adjustment, and confirmed paid/unfulfilled order → processing. Forms use version checks and idempotency keys; the server validates, authorizes and records mutations. |
| Owner controls | CURRENT / IMPLEMENTED source: reporting defaults and explicit existing-user staff access management. Public registration cannot grant privilege; owner identities are protected. Staff suspension affects account sign-in and is disclosed. Real owner provisioning must use the protected operational procedure, not a seeded production fixture or public form. |
| Refund/cancellation/shipping/notification/invoice fulfilment | CURRENT / PARTIAL: existing records, snapshots and capability reasons are visible. Executable refund, cancellation compensation, carrier/delivery jobs, notification retries and private invoice generation remain unavailable until policy/provider/worker prerequisites are established. No manual payment-success control exists. |
| End-to-end B2C commerce readiness | CURRENT / PARTIAL: the prior gift-draft → saleable-variant/order mapping and tax/delivery/pricing policies remain outstanding. The portal does not convert storefront preview placeholders into inventory or activate those flows implicitly. |
| Verification | CURRENT / IMPLEMENTED checks: full frontend lint, TypeScript, eight admin client contract tests and an isolated production build pass. Backend authorization/transaction and real API/browser checks are tracked in TESTING. Provider consent, payment capture, invoice legality and production deployment are not established by frontend tests. |

Sources: `B2C/src/app/admin`, `src/components/admin`, `src/lib/admin`, `backend/admin` and existing auth/database services. Canonical UI details: UI_SYSTEM; operational/security rules: ADMIN_FLOWS, AUTH_SYSTEM, SECURITY and API_CONTRACTS. This requirement authorizes the scoped operations implementation, not invented business policies, unrelated storefront redesigns, automatic owner grants, dependency migrations or production deployment.
# 2026-10-09 — Correct Home hamper card labels

CURRENT / IMPLEMENTED: the ivory photo card uses the “Ivory Hamper” identity; both burgundy and lavender India photos use “India Hamper.” Keep each photo and its existing product destination aligned with that identity.

## 2026-10-09 — Home collection discovery

CURRENT / IMPLEMENTED: the Home discovery area contains three collection cards: Luxury Shagun Envelopes, Scented Candles, and Eternal Paper Co. (combining bookmarks and diary/stationery discovery). Each opens its full collection listing, not an individual product detail page. Keep the existing hamper showcase and its product destinations unchanged.
