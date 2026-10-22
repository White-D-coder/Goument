## 2026-10-23 — Follow the B2C security patch policy (R287)

CURRENT / IMPLEMENTED locally: explicit user request authorizes `next upgrade --agent=security`. Follow its exact16.4.2 target and same-major guide; no major migration codemod, Cache Components/Future Defaults or bundler adoption. Match eslint-config-next, preserve React and R286 source/config, and retain security reminders. Local/remote branch/history and both GitHub remotes' open-PR checks found no equivalent B2C upgrade. Use a separate worktree with the current source copied for verification, without .env/customer data. Upgrade guide's narrow three-file commit is on local branch codex/b2c-next-security-r287; apply the same upgrade to the user's main working folder while retaining its pre-existing uncommitted UI work. No push/PR/deployment. Supersedes only B2C's previous16.4.0 version decision and any implication that an old zero-audit result cleared the new DevTools finding. Initial sandbox metadata fetch failed; approved network retry succeeded. TESTING records harness corrections and the existing tooling engine warning.

## 2026-10-22 — Bound Shop speed work to loading/navigation and local dev (R286)

CURRENT / IMPLEMENTED locally: user selects browse-return/mobile checks, then clarifies slowness on local laptop preview. Anonymous observations distinguish first local read1550ms response start from warm143ms and a163ms public catalogue sample; this does not prove backend latency as the primary cause. Keep existing webpack and public catalogue/60s-fetch policy rather than migrate bundlers, add stale private snapshots, shorten correctness deadlines or alter products/pagination. Stream existing static Shop/collection UI ahead of the same result read; prefetch only primary public Shop links in production. Keep local routes warm with onDemandEntries300000ms/eight-page buffer, leaving first compilation possible. Browser owns URL/vertical restoration; add only bounded tab-local horizontal rail restoration for the reproduced loss. R286 supersedes all-at-once Shop/collection blocking render and default dev-entry retention, not visual/commerce contracts. Existing default/admin loading boundaries retained. No new dependency, provider, asset or auth/payment/stock behavior. Physical-device validation remains partial. TESTING records actual harness corrections and performance limits.

## 2026-10-22 — Shared collection labels with scoped phone spacing (R285)

CURRENT / IMPLEMENTED locally: accepted UI polish uses existing `shopCollections` labels rather than add another naming registry. Collection names differ from product names/brands: Scented Candles is the group; Artisanal Laddoo Candles stays the product; Premium Stationery is the group and Eternal Paper Co. stays the brand in supporting copy. Navigation retains its existing query routes, collection shortcuts retain their existing page routes. Increase only phone category/result label legibility and reduce gaps below the intro, preserving shared R276 heading alignment, original images/frame sizes and established card design. R285 SUPERSEDES the previous navbar/footer Laddoo Candles collection wording and the old Home collection display titles only; product identity, category search/data, R256 phone hero, hidden Home strip, R275 footer and R283 FAQ remain. No rejected implementation approach or new dependency. TESTING records actual checks/limits; R284 uncommitted work retained.

## 2026-10-22 — Build only empty cart and device-local recently viewed (R284)

CURRENT / IMPLEMENTED locally: explicit scope reply selects empty cart + recently viewed only; budget filters, password recovery and shipping tracking remain FUTURE / OPTIONAL. Replace only the genuinely empty gift-cart presentation, keeping existing Shop/Build/collection destinations and all populated-cart/checkout behavior. Reuse the canonical `shopCollections`, `ProductCard`, `ProductPhoto` and public catalogue rather than introduce a parallel card theme or store stale price/product snapshots. History is bounded12 slugs on this device, four visible cards, current PDP excluded; it is neither account history nor a wishlist. A small validated no-store Next public route resolves at mostsix slugs and inherits existing PDP preview/fallback policy. Near-viewport loading, lazy photos, cancellable/timeout-bounded requests and explicit retry limit incidental work. No asset/dependency/provider/model change or deployment. Existing R256/R275/R283 visual/phone behavior retained. TESTING records evidence and limits.

## 2026-10-21 — FAQ expanded row removal and phone scroll direction (R283)

CURRENT / IMPLEMENTED locally: user explicitly rejects the pictured Fewer questions control after clicking and requests automatic opening/closing on phone down/up scroll. Hide the complete expanded summary rather than leave a lone upward chevron. Keep More questions when closed and firstfour + remaining group. R283 SUPERSEDES R241's phone manual-only trigger and expanded collapse label/control; desktop opening remains manual and larger-screen scrolling does not toggle it. A small client wrapper accepts server-rendered question children; only nearby phone scrolling is measured. Expand at75% viewport, collapse with visible group start,8px direction tolerance, no animation/new dependency. Preserve visible focus when a focused control becomes hidden. Initial common75% gate was rejected after a reverse-scroll browser check showed missed closure; separate entry/close visibility gates pass. Prior R282 work is preserved. Verification/limits: TESTING/UI_SYSTEM.

## 2026-10-21 — Bound the second frontend UX increment (R282)

CURRENT / IMPLEMENTED locally: user's “ytry” accepts the preceding recommended loading-placeholder, image-delivery, form-usability and gallery-feedback batch under the established preserve-images/theme/flow constraint. Extend RouteLoading with static route variants, retaining default/admin behavior and no Home loading boundary; reuse it for actual client loading. Add presentation-only password controls/help/error focus and phone input sizing without changing password validation, credentials, cookies, customer ownership or cart continuity. Retain gallery selected/requested behavior and bounded original-image recovery, adding thumbnail/status feedback. Reuse ProductPhoto priority for only the first catalogue card; no mass eager loading, new asset or private cache. No search restoration, new navigation/checkout sequence, typography redesign or backend work. Existing UX06/UX07 are partially addressed, not declared wholly complete; Lotus field order and other audit proposals remain separate. TESTING records source-helper/test-harness corrections, evidence and limits; no rejected application design or new dependency.

## 2026-10-21 — Preserve visual and commerce direction while applying UX01–UX04 (R281)

CURRENT / IMPLEMENTED locally: explicit user approval follows the recommended first-four audit increment with the constraint that images, theme and flow must not be affected. Reuse existing muted text token, existing H1 and existing email route. Pass pointer events through hero copy whitespace while retaining child interaction rather than change its visual stacking. Keep phone H1 visually hidden through CSS display:contents/clipping, without duplicating headings or exposing the hidden CTA. Correct FAQ guidance rather than reinstate the R207-removed PDP enquiry. Existing FAQ answer string/structured data remains compatible; optional contactEmail is presentation-only. R281 SUPERSEDES the audit's open UX01–UX04 implementation status, not R256 image-only hero, R207 PDP removal, R70 autoplay/pause decision or R128/R131 search scope. Browser evidence/source/limits: UI_SYSTEM/TESTING. No rejected application implementation approach; pre-change browser baseline captured before edits.

## 2026-10-21 — UI audit preserves existing design decisions

CURRENT / IMPLEMENTED audit-scope decision: current user requests a thorough UX check while retaining professionalism/theme. Record evidence and proposals rather than make an unsolicited redesign. R128/R131 phone search removal, R70 pause-control removal, R207 lower product-content removal, R256 image-only phone hero, R272 flat active dock and R275 Home-only phone footer remain current. Search/autoplay proposals would require choosing a replacement direction; no earlier decision is superseded here. Stale FAQ guidance conflicts with the rendered product flow; recommend correcting guidance to respect R207 rather than silently reinstating removed sections. Source/browser evidence and UX01–UX15: UI_SYSTEM; verification: TESTING. Affected systems: B2C storefront documentation only.

## 2026-10-18 — DEC-001–004 repository audit decisions

CURRENT / IMPLEMENTED, locally verified: the explicit current request adds [root DECISION.md](../DECISION.md) (pre-execution intent/alternatives/risk/authorization/commands/results) and [FLOW.md](../FLOW.md) (source/local-tested flows). Canonical domain docs and historical decisions remain here; the root files are audit entry points, not competing schema/business-policy owners. Root AGENTS memory-only initialization restriction is historical and does not override this explicit authorized audit/hardening task.

DEC-002 reuses existing legacy JWT/persisted-user authorization and exact established origins in both copies; revalidate each notification recipient so expiry/demotion cannot rely on prior room membership. DEC-003 uses explicit patched Next/compatible fixes; follow-on source evidence justified unused UUID removal and a separately recorded Nodemailer major migration with real in-memory MIME tests. No force fix/Excel removal. DEC-004 fails closed at original admin operations rather than module import, preserving public builds/configured cookie format and leaving the separate vault key untouched. Alternatives and actual rejected/failed attempts recorded in the root register.

VERIFIED scope/evidence: TESTING and audit/REPOSITORY_AUDIT. Known money/vault/deployment findings remain open. No provider migration, hash/schema change, production action, asset move or invented policy.

## 2026-10-13 — Compact phone product cards (R261)

CURRENT / IMPLEMENTED R261: latest phone reference supersedes centered phone Home/catalogue card presentation. Flatten existing layout-only wrappers via responsive display:contents and grid placement to reuse a single real purchase control, preserving draft subscription/write behavior. Keep serif brand titles and cream/burgundy actions through existing theme variables. Do not add reference-only wishlist/discount/MRP content; no product/payment/cart contract changes.

## 2026-10-13 — Compact phone cart bar (R258)

CURRENT / IMPLEMENTED R258: latest compact phone-cart reference supersedes expanded phone tray only. Reuse existing event-driven tray state and cart route with responsive presentation; keep a separate close control to preserve the earlier explicit dismissal requirement. No mobile subtotal/quantity editors in the compact bar; those remain on full cart and larger-screen tray. No financial or API contract change.

## 2026-10-13 — Mumbai auth placement and single-query profile (R257)

CURRENT / IMPLEMENTED: colocate B2C functions with user-confirmed Mumbai Atlas, based on supplied iad1 response execution hop. Collapse /me sequential ownership lookups rather than caching private authentication or bypassing live session checks. Anonymous fast-path idea considered after503 samples was not implemented: user clarified the slow request is signed-in200, so that would not address it. R255 frontend shortcut remains and was observed in public deployed JS. SUPERSEDES earlier region-UNKNOWN statement only for this evidence; exact4s attribution/rollout results remain UNKNOWN. Affected systems: B2C hosting/auth diagnostics/profile query.

## 2026-10-13 — Remove redundant pre-add draft read (R255)

CURRENT / IMPLEMENTED: use the draft already held by a mounted purchase control to remove a normal pre-save network round trip, relying on the existing server revision fence rather than caching responses globally. R228/R229 no-global-settled-private-cache invariant remains; component state is not checkout or ownership authority. Retry only explicit409, preserve unknown-write errors and first-cookie queue. No auth shortcut or server/hosting configuration change; measured hosted latency cause remains UNKNOWN.

## 2026-10-13 — Compact Home card title spacing (R236)

CURRENT / IMPLEMENTED: R236 narrows R227 two-line collection-title reservation to phone widths <=640px. At desktop/tablet, its empty second line caused the reported large title/paragraph gap. Preserve existing8px margin and phone alignment; no component or unrelated card redesign.

## 2026-10-13 — Fixed full cart and complete phone thumbnails (R234–R235)

CURRENT / IMPLEMENTED: the explicit /cart URL correction establishes that R230's two-product scroll requirement applies to the full cart. Prior tray-only interpretation was incomplete; retain that useful cap and implement full-page containment for >2 distinct rows. Use a measured two-row maximum bounded by viewport space, with a fixed visible summary/checkout. Short phones may show fewer than two complete rows so controls remain reachable. Hide footer only during contained mode and release automatically on removal/navigation, with no imperative global scroll lock.

CURRENT / IMPLEMENTED: latest phone request SUPERSEDES hidden hamper supplement rules. Wrap all selectable gallery thumbnails and show all image-backed close-ups. Unhide only actual details to avoid blank grid gaps on non-hamper pages. Reuse shared limited ResizeObserver sizing for cart/tray, preserving finance/name/identity invariants. No deployment authorized or performed.

## 2026-10-13 — Non-blocking cart tray and two-item scroll cap (R229–R230)

CURRENT / IMPLEMENTED R229: user explicitly requires a right cart tray that can remain open while shopping. Choose non-modal aside and desktop main reflow, with compact viewport-limited lower-right presentation on phone/tablet; preserve full cart as review/checkout rather than bypass required printing-name/payment checks. Emit opening only after successful Add; carry confirmed full draft in existing change event so tray edits cannot leave builder on a stale revision. Keep legacy cart separate under its established route and subtotal.

R230 latest user steer fixes heading/subtotal/action and caps list at two actual item row heights, constrained by available phone viewport. Observe two rows only instead of scrolling the whole panel or continuously measuring page scroll. Initial real-click test found disabled/replaced Add could not receive focus on close; use connected focusable control, containing purchase control or header bag fallback. No financial policy/model/deployment change.

## 2026-10-12 — Hosted count request optimization (R228)

CURRENT / IMPLEMENTED R228: reported count delay is response waiting, not image-transfer cost; avoid redundant count fetch where storefront already needs the draft. Initial microtask-only reuse failed to remove the request on streamed Shop hydration, so shopping Header explicitly starts the same queued pending draft; non-shopping keeps lighter count-only behavior. Retain no settled private cache, no optimistic/fabricated count, no mutation retries. Quantity-only lean count query is a separate bounded optimization. Exact hosted503/latency cause remains UNKNOWN; code/browser improvements do not establish a20ms hosted SLA or authorize deployment.

## 2026-10-12 — New bookmarks and responsive Home polish (R225–R227)

CURRENT / IMPLEMENTED decision: user explicitly approves both newly supplied bookmark designs at ₹349 each; preserve independent products/cart IDs and existing bookmark. Reuse current catalogue/admin stock provisioning, initial100 each per existing approval; no reset of existing stock or historical snapshots.

CURRENT / IMPLEMENTED visual decision: latest explicit white-text/light-dark-blur instruction SUPERSEDES the preceding gold/burgundy and no-dark-overlay instructions for phone hero. Use existing white typography, static1px image blur and32% dark shade; original desktop unchanged. Native picture selects phone-specific photos without viewport JS. Collection titles reserve two line heights to align following rows without changing text/prices.

## 2026-10-12 — Inclusive checkout, envelope packs and spacing (R222–R224)

CURRENT / IMPLEMENTED decision: latest explicit user instruction approves existing listed amounts for checkout,18% GST included and no extra delivery charge,100 initial product/pack units, five-minute unpaid holds. Envelope correction is10 pcs ₹1,499 and20 pcs ₹2,499. This SUPERSEDES R192/R193 extra-charge policy, R220 display-only exclusion from authoritative quoting for explicitly provisioned/mapped products, and earlier blanket unavailable gift-order bridge. Missing gateway/mapping/price/stock still fails closed; unknown packaging charges remain unsupported.

R224 SUPERSEDES R215/R217/R218-era image strip presentation: no Pack of 20 overlay on any card; pack buttons live only inside PDPs, above price. Historical20-pack IDs remain stable; new10-pack IDs preserve independent names/quantities/stock. India generic alias shares Burgundy inventory to avoid duplicate physical stock.

Five-minute expiry is checked transactionally before sale; captured money after expiry is durably flagged for staff review, not an invented automatic refund. Scheduler configuration is required for idle-hold cleanup. These are local implementation decisions, not provider/deployment verification. Existing customer ownership/cardinality and historical order amounts are preserved.

## 2026-10-12 — Reuse existing displayed amounts in cart (R220)

CURRENT / IMPLEMENTED decision: latest user explicitly rejects prices disappearing/changing on cart navigation. This SUPERSEDES the prior R196/R213 rule keeping preview figures out of cart arithmetic and retaining old candle ranges. Use the same existing display amount for each registered item across cards/PDP/cart; quantity multiplication in integer paise, GST/delivery already included. New shared resolver returns null for unknown slugs rather than the card's generic fallback figure. Keep historic generic IDs for saved carts. This presentation requirement does not authorize inventory/basePrice, server quote/payment amount or historical order changes; existing checkout/payment/order gates remain. Tests compare actual gift catalogue entries against card label/cart at1/2/99 units and verify mixed totals. No new price policy invented.

## 2026-10-12 — Lotus name required; preserve draft compatibility (R216–R219)

CURRENT / IMPLEMENTED decision: current user instruction “name compulsory ... no optional” SUPERSEDES their earlier optional-name/Skip request and the initial implementation of that approach. New Lotus decisions must be PRINT with a trimmed1–80-character name; no Optional/Skip control. An unresolved direct-card selection is permitted in a draft, but missing/legacy Skip blocks checkout/address preparation. Existing stored Skip rows remain readable and may be preserved during unrelated quantity edits; API cannot introduce a new Skip or replace PRINT with Skip. Removing/readding a line resets its name decision. No automatic customer-name backfill or historical rewrite.

One print name belongs to the existing Lotus draft line (and its quantity), not a new product/stock/price identity. Name-only saves retain quantity and revision/ownership protections; failed/uncertain mutations are not replayed. Legacy schema shape includes Skip for compatibility; actual printing metadata in a future paid order must be explicitly snapshotted when the authoritative order bridge is implemented. Current payment/order gates stay closed.

R217 SUPERSEDES R215's Lotus-only strip scope: every envelope ProductCard gets Pack of 20; Home category discovery stays exempt. Display label does not reinterpret quantity/prices. R218 uses CSS size containment rather than JS measurement for desktop gallery/purchase-height equality; existing supplement/caption moves into next grid row, phone ratios preserved. Sources: ProductCard, product page/CSS, print-name components/helpers, GiftDraft/gifting routes. TESTING records attempted approaches and limits.

## 2026-10-12 — Lotus-only pack strip in existing card (R215)

Status: CURRENT / IMPLEMENTED locally. Current user explicitly supplies Pack of 20 wording/90% white strip for pictured Lotus card; render at bottom of image using existing ProductCard, not editing the raster or adding a component. This supersedes previous no-image-label preference only for this requested strip, not permission for image capsules/other product labels. Keep text opacity1 by applying alpha to background only. Pack wording does not alter draft quantity, price authority or packaging algorithms. UI_SYSTEM/TESTING own source/evidence.

## 2026-10-12 — Treat listed prices as inclusive; center cards and retry temporary reads (R213–R214)

Status: CURRENT / IMPLEMENTED locally. Explicit current user says GST and delivery are included; this SUPERSEDES R192 extra18% and R193 before-delivery total/internal delivery range policy. Sum inclusive item prices in integer paise without extra tax/fee. Inclusion does not establish a zero GST rate or internal invoice tax allocation. Exact saleable prices, stock, quote/reservation and unknown packaging rules remain unresolved; payment activation/history rewrites are not authorized. Update shopper copy and preserve order409 with inclusive-price/stock wording.

Current card-centering request SUPERSEDES R211 left alignment only; reuse existing card CSS/theme/media/actions. Temporary hosted503 followed by successful reads supports a single bounded allowlisted GET retry as resilience, not a claim that hosting/database cause is fixed. Respect Retry-After up to1s; longer/invalid cooldown stays explicit error. Persistent503/manual Retry,401/429 and write safety remain. Rejected alternatives: unlimited retries, replaying cart/auth/order writes, hiding outages with fabricated drafts, and claiming cold-start/database cause without logs. TESTING owns evidence.

## 2026-10-12 — Prefer envelope discovery on Home Lotus card (R212)

Status: CURRENT / IMPLEMENTED locally. Current explicit user says Home Lotus should open Envelopes and show From. This SUPERSEDES R211 Home Lotus Add/product-destination behavior, without changing individual catalogue/PDP/cart identity or price authority. Reuse existing HomeCollectionCard navigation/prefix rendering with /shop/envelopes and From ₹99.00. No other card redesign or commercial change. UI_SYSTEM/TESTING own evidence.

## 2026-10-12 — Reuse product card for requested reference hierarchy (R211)

Status: CURRENT / IMPLEMENTED locally. Explicit user asks to simplify card to photo/title/one paragraph line/large price/Add to Cart while preserving theme and avoiding image capsules. Reuse existing ProductCard in related carousel rather than duplicate purchase UI; preserve existing shared title font, image fit/corners, card hover, identities and financial guards. Shared left alignment/prominent22–36px price/full-width action SUPERSEDES earlier centered/small-price card rules, not cart or main-PDP typography. Home actual Lotus product uses existing registered Add action; category discovery remains collection navigation because a category has no single purchasable identity. No fabricated review/discount/delivery promises or saleable stock/price authority. UI_SYSTEM/TESTING own evidence.

## 2026-10-12 — Preserve carousel, separate envelopes and protect browsing budget (R206–R210)

Status: CURRENT / IMPLEMENTED locally. Pasted PDP block initially interpreted as removing all listed lower sections including related products; latest explicit user says retain other-product carousel, so that portion is SUPERSEDED and existing carousel restored. Remaining pasted enquiry/note/editorial/corporate content and product-only footer stay removed; other pages retain footers. Current user explicitly classifies envelopes separately from Stationery, superseding prior stationery-envelope merge requirements; preserve identities/history/Envelopes and All Gifts discovery. Latest ep1_3.png becomes Lotus main with old gallery views retained.

Reported429 corresponds to one60/minute process-local per-IP budget covering both frequent bootstrap reads and auth/writes; rapid verification navigation also exhausted this shared budget. Separate allowlisted read traffic300/minute from original general60/minute; keep login/admin persisted guards, exact-Origin checks, IP derivation and process-local bounds. Coalesce pending bootstrap requests only, never cache private responses or automatically replay mutations. Distributed rate enforcement/trusted deployed proxy remain existing open work. Source and security evidence: API_CONTRACTS/SECURITY/TESTING.

## 2026-10-12 — Latest preview and visual requirements take precedence (R196–R205)

Status: CURRENT / IMPLEMENTED locally. Current user requests all cards have numeric display prices, removes Sample wording and requests photographed envelope/candle PDPs behave like other cart-enabled cards. Intermediate R196 Sample suffix attempt is SUPERSEDED by R197, consistent with R168 superseding R142 wording. R180/R191 enquiry-only/no-new-draft-ID behavior is SUPERSEDED only for the nine photographed envelopes and two new candles: register their existing stable local IDs as draft catalogue selections. Existing product identities/slugs/commercial fields, quantity ownership/revisions and fail-closed order/payment requirements remain. Display figures are not authoritative server money.

Current user also explicitly requests zero navbar bottom margin,18px phone product spacing/45% shorter images, no general horizontal margin dividers, seamless Home background, no image hover zoom (retain card hover), FAQ Q1–Q5 bottom lines and30% larger PDP prices. R204 FAQ exception SUPERSEDES R200 blanket FAQ-line removal; preserve remaining no-divider requirement and functional control boundaries. One Home wallpaper canvas resolves two independently restarted patterns/base colours; no redesign of cards or alternate frontend. R201 latest supplied cn3.png replaces earlier HEIC-derived Laddoo main; user had removed the old cn3.webp, so it was not restored. Distinct optimized URL avoids stale old-photo cache. Sources/evidence: UI_SYSTEM/PERFORMANCE/TESTING.

## 2026-10-12 — Keep delivery planning ranges internal and emphasize actual known amounts (R193)

Status: CURRENT / IMPLEMENTED locally. User clarifies delivery₹100–300 was input for us, not copy to show shoppers, and asks for larger total plus reference-like image/title/price spacing. SUPERSEDE R192's delivery range UI and delivery-inclusive estimated total. Retain internal delivery planning bounds but omit them from shopper copy/calculated total; show To be confirmed and label the known subtotal+18% GST as Total before delivery. Do not invent a flat delivery fee or claim a final payable amount. Candle range remains explicit because exact candle prices are not supplied. Latest cart-specific size requirement supersedes R190's exact shared size for cart above640px only; preserve Cormorant font and other card sizes. Larger rows/right price/actions reuse existing components; no fabricated stock/discount/Prime or delivery promise from reference. Verification: TESTING.

## 2026-10-12 — Calculate explicit cart estimates; refuse placeholder-priced orders (R192)

Status: CURRENT / IMPLEMENTED locally / authoritative checkout CURRENT / PARTIAL. User specifies18% GST extra, delivery₹100–300 varying, candles₹200–500. Apply18% to item-price bounds in integer paise, round aggregate GST bounds to nearest paise, add one delivery range per nonempty cart and label the result estimated. Reuse existing Ivory₹2,499/India₹2,999 display amounts as estimate inputs; these were not separately established as authoritative sale prices. Reject the alternative of inventing exact per-candle prices, a fixed delivery charge, free unknown items/packaging or a shipping-tax policy. Shipping tax/physical fulfillment/stock reservation remain UNKNOWN/required for final quote. Unknown commercial rows retain their selection and suppress the complete total; empty carts have no delivery charge. Reuse one currency formatter to keep per-render work bounded, no quote network request or private cache added.

Source inspection found gift/order ignoring missing authority and saving flat₹299 item orders with zero GST/delivery and clearing drafts. This conflicts with the user's current calculated pricing and B2C AGENTS' verified server-money requirement; it is a defect, not a safe behavior to preserve. Remove that branch, return409 after ownership/readiness/hamper checks, preserve saved cart and set address paymentAvailable:false. Cart respects checkoutAvailable:false. SUPERSEDED behavior: placeholder gift-order valuation and address payment-ready flag; existing immutable-order/Razorpay services are untouched. Future authoritative quote/reservation bridge must precede order activation.15 gifting tests include hostile browser amounts/zero orders/retained draft. Main/alternate storefront designs and existing history unchanged. Evidence: TESTING.

## 2026-10-12 — Use supplied candle photos without inventing commercial identity (R191)

Status: CURRENT / IMPLEMENTED locally. Reuse envelope preview/gallery patterns for cn1 and cn2, identify Himalayan Dusk from the photographed label, and preserve laddoo_candles for explicit cn3 mapping. Preserve remote price/stock when decorating Laddoo with new photos. New previews have no invented price/stock/cart IDs; use enquiry until saleable mappings exist. Names/pack quantities remain descriptive or UNKNOWN. Keep originals; normalize EXIF orientation and manually correct cn2's sideways pixels (orientation tag1) in web derivative. Sharp's HEVC decoder is unavailable; sandboxed macOS conversion produced an unusable tiny image, so use verified native macOS decoding with approved local access before WebP compression. Actual derivative images inspected. Source/evidence: photographed-candles.ts / PERFORMANCE / TESTING.

## 2026-10-12 — Use measured Ivory typography as a shared card role (R190)

Status: CURRENT / IMPLEMENTED locally. User's latest explicit title requirement takes precedence over prior separate discovery/Shop/cart sizes and phone sans direction. Measure the current Home Ivory card, then centralize its exact responsive font/size/weight/line-height/tracking in storefront-cards.css, applied to product/card names rather than all headings. Keep19px phone and17px tablet reference even though the earlier cart-only request simply asked for larger text; desktop cart increases from13px to the existing responsive reference. Shared role declarations intentionally override legacy route typography; remove clamps so larger long names can wrap. Cart photos gain mild12px corners.

For the user's all-frame fit requirement, use centered cover/clipping on product-photo frames, preserving source ratio and existing frame geometry. Edge cropping when ratios differ is inherent in this fill choice; earlier contain/no-crop fitting is SUPERSEDED only for these product frames. Keep artwork/logos/hero-specific focal behavior, no asset edits or added image-loading work. Reuse existing components and stylesheet import; no cart/API/data/payment behavior changes. Actual verification and limits: TESTING.

## 2026-10-12 — Optimize measured work without claiming a universal20ms SLA (R189)

Status: CURRENT / IMPLEMENTED locally / requested budget CURRENT / PARTIAL. User asks for ≤20ms individual operations and optimization/compression. Real local warm anonymous reads are already mostly below20ms, while measured initial rendering and network exceed it; a blanket completion guarantee conflicts with measured runtime evidence and network latency. Retain20ms as the requested local-feedback budget and disclose remaining paint/startup/remote limits rather than claim completion. Remove two demonstrated redundant cart refresh requests by synchronously sharing server-confirmed item quantities only; retain no cart snapshot cache and preserve fresh revision/ownership checks. Generic events remain compatible; newer confirmed events invalidate older pending reads.

Keep the approved reveal with native Web Animations and IntersectionObserver, using existing browser-animation patterns; static Home sections need no whole-section client hydration. Defer background hero loading after first image/while visible, but allow manual request and failover even with reduced motion. Compress the subtle mandala from its preserved original into a new named same-size derivative, visually checked; do not blindly recompress all114MB public originals or reduce product photography quality without delivery evidence. Full-banner desktop sizes correct a source mismatch; phone framing/typography stay. No identity, money, HTTP schema, provider, database or deployment change. Verification/remaining limitations: PERFORMANCE / TESTING.

## 2026-10-12 — Reveal existing Home hamper actions on phones (R187)

Status: CURRENT / IMPLEMENTED locally. User requests Buy now or Add to Cart on the displayed Home hamper cards. Existing cards already render the shared AddGiftToCartButton with independent gift IDs, but phone CSS hides its row. Reveal that row and use full-width Add with a centered saved counter, rather than introduce another purchase handler. Supersede earlier phone action hiding only; retain existing saved-draft semantics, photo carousel and preview checkout restrictions. Source: b2c/home.css; verification: TESTING.

## 2026-10-12 — Replace the remaining generic Home envelope entry (R186)

Status: CURRENT / IMPLEMENTED locally. R182 removed legacy product listings but the old photo/name remained on Home's separate collection card. Current user explicitly extends replacement to Home. Use the existing Lotus preview for the entire card (photo, name, description and product destination), superseding the prior envelope collection-slot requirement only. Share photographed catalogue data rather than duplicate identity/copy. Reuse card presentation and update hidden Home strip imagery without activating it. No legacy cart/history/data deletion or commerce changes. Verification: TESTING.

## 2026-10-12 — Center the phone FAQ title/artwork composition (R185)

Status: CURRENT / IMPLEMENTED locally. User asks for a small rightward title adjustment toward the gift and20% larger artwork on phones. Center the existing flex group, then translate centered title text8px toward its existing decoration. Increase rendered image width80→96px rather than editing/replacing the existing WebP artwork. Keep the640px phone boundary and larger-screen geometry; no component/content/disclosure changes. Verification: TESTING.

## 2026-10-12 — Center both footer variants on phones (R184)

Status: CURRENT / IMPLEMENTED locally. User requires all phone footer content centered. Apply through the storefront's640px phone boundary to both existing Footer variants. Keep their existing navigation columns and links, and override legacy generic footer flex styling only within this phone scope: centering individual children alone leaves entire groups compressed to the left. Preserve wider layouts and record their inherited flex rule separately in TODO. Source: home-footer.css; verification: TESTING.

## 2026-10-12 — Fit and center compact Home heading groups (R183)

Status: CURRENT / IMPLEMENTED locally. User reports medium/large phone heading misalignment. Source/browser evidence establishes two defects: hamper-specific `align-items: end` overrides phone centering (27px offset at375px,43px at425px), and `clamp(64px, 3.5vw, 46px)` resolves to64px with tablet action overlap. Explicitly center the shared groups through900px and put their existing actions below. Replace the inverted clamp while preserving phone sizes, Cormorant and the64px wide-desktop appearance. R99's desktop right-action layout remains above900px; its compact stacked layout now covers tablets. No new component, viewport JavaScript or commerce changes. Verification: TESTING.

## 2026-10-12 — Supplied envelope designs and galleries (R180)

Status: CURRENT / IMPLEMENTED locally. Supplied filenames establish9 designs and3 matching secondary views, not prices, stock or quantities. Use descriptive photo-based names and existing preview View Details/enquiry pattern; do not add unpriced designs to the orderable backend catalogue or invent cart IDs/commercial values. Preserve originals and existing products, create web derivatives and local preview routes. Merge matching previews with existing bounded source data before pagination so new cards do not exceed12/page or disappear from later pages. No provider/database/history migration. Verification: TESTING.

## 2026-10-12 — Separate India Hamper colour selections (R178)

Status: CURRENT / IMPLEMENTED locally. Current user explicitly requires Burgundy and Lavender to remain separate in cart, superseding earlier shared India product identity. Add new gift IDs and preview routes rather than repurpose the ambiguous historical india_hamper ID. Retain that legacy row unchanged for existing carts; old generic product link defaults to the original Burgundy photograph for new selections. No assumption about historical colour, no DB migration, and no inferred commercial price/availability. Update all public photo links/cards and provide accessible colour navigation. Sources: UI_SYSTEM / API_CONTRACTS; verification: TESTING.

## 2026-10-12 — Inline phone purchase actions replace gift note (R177)

Status: CURRENT / IMPLEMENTED locally. Current explicit request replaces the phone gift-note panel with shopping actions. Extend existing Ivory controls rather than duplicate purchase handlers; keep all controls in document flow. Buy now ensures the existing gift selection and opens /cart for review, without changing server pricing, checkout or payment availability. Phone note visibility from older PDP layouts is superseded; desktop note remains. Sources: BuyPanel.tsx/product-detail.css/storefront-ui.css; verification: TESTING.

## 2026-10-12 — Inline phone product purchase controls (R173)

CURRENT / IMPLEMENTED: current user explicitly rejects the fixed phone purchase bar and requests it after the description. This supersedes R164’s instruction to retain fixed-bar bottom clearance; remove the fixed positioning, floating surface and130/138px page reserves together. Preserve desktop sticky purchase column, existing Ivory inline layout and commercial handlers. CSS/browser verification: TESTING.

## 2026-10-12 — Display price wording (R168)

CURRENT / IMPLEMENTED: current explicit user request removes visible Sample wording, superseding R142’s suffix requirement. Ivory/India temporary display amounts and non-saleable preview/checkout rules remain unchanged; no price authority is inferred from the shorter label. Existing final-pricing/enquiry confirmation stays. Source: shared product-pricing helper and Shop notices; checks: TESTING.

## 2026-10-12 — Confirmed counters and phone cart scope (R165/R166)

Status: CURRENT / IMPLEMENTED locally. User rejects success-message card UI and requests a phone-only cart reference while preserving theme. Reuse existing compact purchase/QuantityControl components, saved quantities,44px touch targets and99 limit. Share only in-flight cookie-creating draft reads in the existing serialized queue; never retain private snapshots or infer success after failure. Phone cart uses existing catalogue identity/photos and honest price confirmation, because GiftCatalogue has no authoritative monetary fields. Do not turn sample hamper labels into totals or activate checkout. Preserve desktop cart and packaging/customer ownership. Existing quantity-change filter/append behavior was observed moving the edited row; replace with ordered updates. Header auth refresh belongs to successful sign-in/out events; cart events only refresh its count. Footer native lazy/responsive image replaces eager CSS background, with original artwork/40% opacity retained. Hosted first-response latency is observed; its infrastructure cause remains UNKNOWN, so no unverified DB/provider/region change. Verification: TESTING/PERFORMANCE.

## 2026-10-12 — Extend existing Ivory spacing across product pages (R164)

CURRENT / IMPLEMENTED: user requests padding/margin cleanup after R163. Reuse R152’s64/48/24px token for all products, preserving established geometry instead of changing card/layout design. Hero/editorial bottom padding no longer adds to next section top padding; related/corporate/loading use token. Coloured corporate panel keeps its own inner spacing, and necessary fixed phone purchase clearance stays. R152’s Ivory-only scope is superseded by this extension. Browser before/after evidence in TESTING; no backend or Home change.

## 2026-10-12 — Remove finer-details panel for every product (R163)

Status: CURRENT / IMPLEMENTED. Current explicit user requirement expands R151’s Ivory-only removal to all products/all widths. Delete the shared section and unused content/CSS instead of breakpoint hiding, with no anchor consumers found in B2C source. Preserve other page sections and shared related-section styles. R151’s non-Ivory preservation is SUPERSEDED by this direction. Affected: B2C product presentation; evidence: TESTING. No backend/commercial changes.

## 2026-10-12 — Keep loaded photography during image recovery (R162)

Status: CURRENT / IMPLEMENTED locally. User requires reliable images after R161 optimization. Keep responsive optimization and original local assets as a bounded recovery path, reset per source rather than permanently bypassing optimization. Gallery keeps its current photo until the requested frame is ready; hero rotates/selects only loaded frames and excludes failed ones. A terminal missing original uses an accessible neutral placeholder, never an unrelated product image. Reuse ProductPhoto for thumbnails at existing frame sizes; retain artwork/contain/cover/corners and lazy loading. Initial harness assumption that every offscreen lazy photo must download was rejected; viewport-aware slow-network and explicit failure checks pass. Affected: B2C image components/CSS; see TESTING. No provider/backend/deployment changes.

## 2026-10-12 — B2C audit fixes and bounded delivery (R161)

Status: CURRENT / IMPLEMENTED locally. User explicitly authorized fixing/optimizing R160. Keep existing safe identity/order/payment invariants and design; update isolated B2C dependencies rather than shared B2B modules. Retire unsafe owner CLI in favor of existing explicit-ID guarded operator command. Persist short-lived OAuth state in existing Mongo, with hashed binding/state and atomic consume across instances; no new storage service. Explicit schema installation replaces cold-start migration to bound latency/permissions. Exact Origin and private no-store correct current implementation rather than preserving unsafe documented behavior.

Public catalogue exposes content DTOs, bounded literal queries and truthful non-saleable fallback rather than invented money/stock. A shared short fetch budget and public-only failure cooldown prevent outage amplification. Compress derivatives/reuse responsive images and pause unnecessary animation while preserving established geometry. Testing initially rejected stale box-first fixtures/Header mocks; corrected fixtures without restoring obsolete packing behavior. No real provider transaction/release; deployed proxy, distributed general rate and schema evidence remain unresolved. Affected: B2C auth/database/catalogue/serverless/storefront, canonical docs. R160 findings retained as dated baseline and superseded only where R161 has code/test evidence.

## 2026-10-12 — Explicit approval before local privilege elevation (R159)

CURRENT / IMPLEMENTED locally: sign-in investigation found the user's selected existing account was Google-only CUSTOMER and no local administrator existed. User explicitly approved full local OWNER access. Use existing singleton audited first-owner bootstrap, preserving the existing Google identity/customer linkage and revoking sessions, followed by real Google reauthentication. Do not run bulk setup-owners, create/reset passwords, manufacture session cookies or assign roles during public signup/login. Scope is the isolated local dev database only. Evidence: TESTING; approval is recorded in conversation, without customer identity values here.

## 2026-10-12 — One title family and action appearance (R156)

CURRENT / IMPLEMENTED: explicit user direction supersedes R94’s phone sans-title direction and R144’s collection-title sans exception. Select the existing Cormorant Garamond family used by the referenced hamper heading and retain responsive scales/weights. Use Shop now’s compact rounded9px geometry and shared Jakarta action text throughout the public storefront. Preserve inverse/outlined roles for contrast and purchase hierarchy. An important cascade layer wins existing route-specific important declarations without depending on retained Next route CSS order; installed Next CSS documentation was consulted. Exclude operations and avoid a contract/handler rewrite. Affected: B2C public presentation; evidence: TESTING.

## 2026-10-12 — One public navbar on every storefront route (R154)

CURRENT / IMPLEMENTED: explicit user direction supersedes R150’s preservation of different Home/other-page navbar options. Home’s Shop/Hampers/Collections/Corporate list and configured-or-existing Home corporate URL now apply consistently; the legacy Our Story substitution and development-only corporate Home URL are removed from public navigation. Footer follows the same shared options. Header surface classes and role/account/cart logic remain independent of this content choice. Reason: Collections must remain available after navigation. Sources: shared storefront-navigation, Header, Footer; evidence: TESTING.

## 2026-10-12 — Shop actions replace Home starting prices (R148)

CURRENT / IMPLEMENTED: user explicitly requests buttons instead of prices, each opening the selected collection. Supersede R144's Home price-display decision and R147's prefix adjustment; remove the unused helper and optional price prop rather than leave hidden data. Reuse the existing per-card Link and href without new product/cart/price contracts. Keep phone/tablet actions, compact desktop frames and centered bold copy. Affected: B2C Home presentation only; evidence: TESTING.

## 2026-10-12 — Apply product-card reference to existing collections (R144)

CURRENT / IMPLEMENTED: user explicitly requests the reference appearance for desktop “Thoughtful picks just for you.” Keep the established three collection cards and full-collection destinations rather than replace their identities with the screenshot's Grand Confectionery Chest. Show starting prices from the existing local catalogue because each card represents a collection. Do not introduce a fabricated ₹6,499 product, checkout values or new price rules. Override the general serif-title direction only for these desktop card titles to match the reference's sans appearance. Preserve phone/tablet treatment below1024px. Sources: Home page, HomeCollectionCard, Home CSS; verification: TESTING.

## 2026-10-12 — Keep temporary prices separate from commercial money (R142)

CURRENT / IMPLEMENTED: user asks for some prices for now; choose Ivory ₹2,499 / India ₹2,999 as sample amounts, not approved commercial quotes. Supersede prior enquiry-only storefront labels for these previews with a separate display helper and Sample suffix. Non-preview products retain their actual pricing. Preserve basePrice0, inventory0, preview=true, variants and gift/payment contracts. Reason: deliver requested preview prices while leaving final commercial rules outstanding. Affected: storefront price presentation; evidence: TESTING.

## 2026-10-11 — Conventional phone controls without activating unpriced checkout (R138)

CURRENT / IMPLEMENTED. User requests normal product title/description, Add to Cart opening a counter, and Buy now in place of the Ivory summary/Personalise card. Supersede R137 centered summary/floating-bar/note presentation on this phone route. Reuse the existing compact cart counter and opt into one Buy now control within the same component instance, preserving larger-screen behavior.

Conflict: a Buy now payment shortcut would imply saleability, while `curated-hampers.ts` identifies Ivory as an unpriced preview and the existing cart/server explicitly block hamper checkout. Resolve by ensuring the draft selection and opening the existing `/cart` review, with visible price-confirmation copy; do not bypass eligibility or fabricate prices. Preserve an already-selected quantity instead of incrementing on Buy now, and preserve unrelated selections. Reason: reviewable conventional controls within the current authorized UI scope; commercial completion remains required separately. Sources: `AddGiftToCartButton`, `gift-cart`, `GiftCart`, API_CONTRACTS. Validation: TESTING.

## 2026-10-11 — Scope Ivory phone redesign to the requested product (R137; summary/note/floating controls SUPERSEDED by R138)

CURRENT / IMPLEMENTED: use a slug-derived `.pdp-ivory` class and the existing product short description for the phone redesign. Reason: user named the Ivory Hamper page, while shared gallery/cart/note components serve other products and must retain their behavior. Keep all styling through640px; use existing cart handlers and enquiry status without new saleability/price assumptions. Affected: B2C product page/CSS and UI requirements. Evidence: TESTING; larger Ivory and India phone comparisons pass.

## 2026-10-11 — Apply the reference to Shop phone presentation (R127)

CURRENT / IMPLEMENTED. Reason: user requests the supplied category-thumbnail/product-card layout on phone Shop. Reuse real collection labels/images and current destinations; do not create the sample's food/beverage/decor taxonomy or replace cart behavior with an unestablished universal enquiry flow. Extend the existing compact ProductCard with source descriptions, hidden on larger screens, and share category-link markup across Shop/collection pages. Scope styling through640px with explicit selectors against inherited card rules. Preserve prices, preview state, product identities and cart handlers. Supersedes earlier phone Shop text-only categories and minimal cards; other storefront/B2B designs are unchanged.

## 2026-10-11 — Compact sans copy and ivory phone action (R125)

CURRENT / IMPLEMENTED. Reason: user rejected the current hero text and Shop now button. Replace the R122 phone serif/copy treatment with a short, moderately sized Jakarta headline and an ivory rectangular action using the existing palette. Preserve prior instructions to center phone content and remove the coloured image overlay. A small neutral text shadow separates glyphs from photos without adding a backdrop. Scope: phone hero only; retain larger-screen presentation and existing `/shop` action. No new font or asset dependency.

## 2026-10-11 — Short serif headline on the phone hero (R122; phone copy/type/button SUPERSEDED by R125)

CURRENT / IMPLEMENTED. Reason: user rejected the minimal hero's text styling. Use short responsive copy and the already bundled Cormorant family for this hero only, superseding R94's sans-family choice here and R121's retained phone headline. Keep shared phone headings and larger-screen Home headline unchanged. Use CSS visibility for responsive spans, avoiding viewport JavaScript and duplicate visible/accessibility titles. Affected systems: B2C Home presentation only.

## 2026-10-11 — Put the photo behind the complete phone hero (R120)

CURRENT / IMPLEMENTED. Reason: user explicitly requests removing the phone search, filling the frame background with the image and reducing its height. Supersede R105/R118's phone stacking/full-photo framing only: use cover cropping and a transparent copy panel within one compact frame. Keep content-driven growth above340px rather than a fixed height to avoid clipping enlarged text. Raise phone dots above copy within an isolated stacking context. Remove the now-unused Home search component/styles; do not change Shop search, carousel state or larger hero layouts. Affected systems: B2C Home UI only.

## 2026-10-09 — Remove Home navbar/hero separator (R112)

CURRENT / IMPLEMENTED source: remove `.tgg-home` top padding because it created an unwanted visible band between the navbar and hero. Keep the header in normal flow, transparent on initial load and ivory on scroll. This supersedes R111's 40px/24px spacing.

## 2026-10-09 — Keep transparent navbar separate from hero (R111)

CURRENT / IMPLEMENTED source: retain transparent-on-load and ivory-on-scroll navbar styling, but keep the header in normal flow. Restore R108's 40px desktop/24px phone gap after the user clarified that the hero should not be raised under the navbar.

## 2026-10-09 — Show hero image through initial navbar (R110, SUPERSEDED by R111)

CURRENT / IMPLEMENTED source: overlap the Home navbar with the hero so its transparent initial state reveals the image, then show the ivory header background after scroll. This supersedes R108's extra top spacing, which left only the ivory page background behind the transparent header.

## 2026-10-09 — White hero copy and watermark at the page top (R109)

CURRENT / IMPLEMENTED source: use white hero text as requested; darken only the left image area with a soft gradient for contrast, and use a solid dark copy panel when stacked. Extend the existing edge watermark behind the initial transparent navbar.

## 2026-10-09 — Increase the Home hero separation (R108, SUPERSEDED by R110; restored by R111)

CURRENT / IMPLEMENTED source: replace R107's 18px/12px spacing with 40px desktop and 24px phone spacing after the user reported it still looked too close.

## 2026-10-09 — Separate Home navbar from hero (R107, SUPERSEDED by R108; placement restored by R111)

CURRENT / IMPLEMENTED source: keep the transparent-at-top/ivory-on-scroll navbar in normal flow and add a modest gap below it: 18px desktop, 12px phone. This supersedes R106's overlapping header, which brought the hero too close to the page top and navbar.

## 2026-10-09 — Overlay Home navbar on hero (R106, SUPERSEDED by R107)

CURRENT / IMPLEMENTED source: place the Home navbar over the hero image at initial scroll position, transparent with dark readable controls over the photo's clear area. On scroll, show the ivory background, divider and shadow. This supersedes R104's normal-flow header placement; retain the no-gap hero geometry.

## 2026-10-09 — Full-width Home hero photography (R105)

CURRENT / IMPLEMENTED source: use the three user-supplied wide banner images across the complete desktop hero instead of a side-by-side image partition. Overlay existing copy on their open left side; keep the full image visible using their shared 2.88:1 ratio. Phones show each complete image above the copy.

## 2026-10-09 — Home header reveals background on scroll (R104, SUPERSEDED by R106)

CURRENT / IMPLEMENTED source: keep the initial Home navbar transparent and reveal its ivory background, divider and subtle shadow after scroll. Preserve normal header flow and the direct navbar-to-hero placement.

## 2026-10-09 — Home hero image rotation (R103)

CURRENT / IMPLEMENTED source: rotate three existing gift photos in the Home hero with a fade and direct-selection dots. Use a 5.2 second interval, keep images fully visible, and stop autoplay for reduced-motion preference. Do not alter hero copy or dimensions.

## 2026-10-09 — Restore B2C navbar while retaining the refreshed hero (R102)

CURRENT / IMPLEMENTED source: use the established Home monogram and navigation labels (`Shop`, `Hampers`, `Collections`, `Corporate`) after the user asked to restore the prior navbar. Keep the four-category Shop dropdown and current split hero. Put the masthead in normal flow and remove the hero's top margin so there is no gap or overlap.

## 2026-10-09 — Increase Home watermark opacity (R101)

CURRENT / IMPLEMENTED source: change the existing page-edge mandala watermark from 10% to 20% opacity. Keep the edge mask, blend mode, image and stacking so text/action contrast remains consistent.

## 2026-10-09 — Rounded split Home hero (R100)

CURRENT / IMPLEMENTED source: follow the new banner reference with a rounded, inset hero surface, readable copy on the left, and a separate product photograph on the right. Keep the existing brand copy and commerce link; do not make the photo a background beneath text. Match the image's 16:9 frame to avoid unwanted cropping. Stack image before copy on phones.

## 2026-10-09 — Center Home titles (R99)

CURRENT / IMPLEMENTED source: center Home section headings and card/feature titles, while preserving the hero headline's left alignment. Keep View all actions at the heading row's right side on desktop and put them below the title on phones to prevent collisions.

## 2026-10-09 — Remove Home flavour stories and fix image framing (R98)

CURRENT / IMPLEMENTED source: the complete “Familiar flavours. Fresh discoveries.” Home section is removed, including its regional story carousel, copy and action. This supersedes R78's Home flavour-carousel decision. The hero visual is confined to its right-hand grid area with explicit stacking, and image cards fill their frames without hover scaling. Preserve the existing product photographs and destinations.

## 2026-10-09 — Align B2C Home with the gifting storefront reference (R97)

CURRENT / IMPLEMENTED source: use the reference's warm ivory navigation and split hero, followed by three hamper tiles using the two existing enquiry-only identities and real burgundy/lavender India photos, then catalogue cards and an image-led packaging feature. Do not add prices, stock, or delivery promises to the previews. Preserve cart IDs and links for saleable catalogue entries. Phone hamper cards remain a swipe row with image/title only; other supporting copy is compact. This supersedes older Home composition decisions for the visible top-level page, while preserving lower story, philosophy, FAQ and corporate content. Browser appearance is UNKNOWN.

## 2026-10-09 — Recompose lower product-detail sections (R96)

CURRENT / IMPLEMENTED source: redesign the supplied lower PDP composition as three related treatments: a side-by-side lifestyle image and giving statement, a concise three-step personalisation panel, and a contained finer-details panel. Retain existing copy, links, native accordions, section order and reduced-content phone behavior. The lifestyle image uses contain framing so the full supplied photograph stays visible. Sources: `/products/[slug]/page.tsx`, `product-detail.css`. Verification is recorded in CURRENT_STATUS and TESTING.

## 2026-10-09 — Remove the product contents story section (R95)

CURRENT / IMPLEMENTED source: the user asks to remove the supplied product-page section. Remove its numbered editorial rows, product close-up photos/captions and link to product details. Retain the product hero/gallery and its independent close-up thumbnails, plus the separate collapsed “What’s included” accordion for essential product selection information. This presentation change does not make preview hampers saleable or add price/inventory/cart mappings. Sources: `/products/[slug]/page.tsx`, `product-detail.css`. Browser appearance remains UNKNOWN until checked.

## 2026-10-09 — Use regular sans titles on phones (R94)

CURRENT / IMPLEMENTED: user wants phone titles to read normally rather than use the more decorative display serif. Use Plus Jakarta Sans for B2C headings through640px; preserve existing hierarchy/sizes and larger-screen Cormorant. Exclude admin.

## 2026-10-09 — Unify B2C titles in Cormorant Garamond (R93)

CURRENT / IMPLEMENTED: user asks for a more professional gifting font across titles such as “Our Gift Hampers.” Use the already loaded, self-hosted Cormorant Garamond for desktop/tablet page/section/card heading roles; R94 specifies Jakarta on phones. Keep current scale/layout and Plus Jakarta Sans for copy/navigation/controls; leave admin typography unchanged. This supersedes R65's Pagio Home headings and the later Manrope-wide title token. No font asset or dependency added.

## 2026-10-09 — Keep only hamper image and title on phones (R90)

CURRENT / IMPLEMENTED: phone hamper cards display their existing product photo and title only. Both link to the product detail page. Hide supporting copy and the Explore action on phones; retain larger viewport behavior.

## 2026-10-09 — Use hover for the Shop dropdown (R89)

CURRENT / IMPLEMENTED: open the category panel as the pointer enters Shop and close it on pointer leave. Retain touch activation and keyboard Escape/focus behavior.

## 2026-10-09 — Use the Shop dropdown for all four catalogue categories (R88)

CURRENT / IMPLEMENTED: replace its two current category links with four category filters: Envelopes, Hampers, Laddoo Candles and Premium Stationery. Keep category navigation on the main Shop page.

## 2026-10-09 — Give Home hamper photography more room on phones (R87)

CURRENT / IMPLEMENTED: increase mobile image height within each carousel card and compact the accompanying text panel so the product photograph reads as the primary element. Preserve the carousel, images, copy and larger viewport presentation.

## 2026-10-09 — Remove Gourmet Story intro from phone layout (R86)

CURRENT / IMPLEMENTED: hide the section's introductory title/copy and its explore link at phone widths to reduce vertical space. Retain the image stories and carousel controls; do not alter tablet/desktop presentation.

## 2026-10-09 — Make the Home hamper cards swipeable on phones (R85)

CURRENT / IMPLEMENTED: at phone widths, arrange the existing hamper cards in a horizontal scroll-snap rail with a partial next-card preview. This provides swipe browsing while keeping larger breakpoints as grids and preserving the current images and card interactions.

## 2026-10-09 — Browse envelopes and hampers within All gifts (R84)

CURRENT / IMPLEMENTED: keep the Shop sidebar's Envelopes and Hampers selections on `/shop` as catalogue filters. Add the two existing photographed hamper previews to the unfiltered results so All gifts presents both regular catalogue items and curated hampers together. Preserve enquiry-only status, avoid creating prices/cart mappings, and keep direct collection routes available for existing links.

## 2026-10-09 — Round the Home CTA's top edge

CURRENT / IMPLEMENTED: give the burgundy corporate CTA section the same rounded top edge as the Home hamper panel (32px desktop, 24px mobile).

## 2026-10-09 — Carry the approved watermark into hamper section corners

CURRENT / IMPLEMENTED: repeat the mandala in the upper-left and upper-right hamper showcase corners and fade it vertically above the card area. The centered heading stays clear. Reuse the existing watermark image.

## 2026-10-09 — Hide the Home viewport scrollbar

CURRENT / IMPLEMENTED: when B2C Home is rendered, visually hide the viewport scrollbar and retain native page scrolling. Do not change the scrollable flavour carousel.

## 2026-10-09 — Use the approved mandala as a Home edge watermark

CURRENT / IMPLEMENTED: reuse the existing `diwali_mandala_bg.jpg` with a horizontal edge mask and 26% opacity on the B2C Home, leaving the center of the page clear and the artwork behind interactive content. This restores the previously approved side-watermark treatment without generating another asset. Browser appearance remains unverified.

# Decisions and Conflicts

## 2026-10-08 — Center Home FAQ content (R79)

CURRENT / IMPLEMENTED: present the FAQ as a centered heading and centered accordion column with a readable width. Keep disclosure icons anchored to the right edge of each question row so the text itself remains centered.

## 2026-10-08 — Make Home flavour stories a controlled carousel (R78)

CURRENT / IMPLEMENTED: use a horizontal scroll-snap rail with one-card previous/next controls, native touch/trackpad scrolling, keyboard focus, and reduced-motion handling. Do not auto-advance story cards. This keeps all three flavour stories available without compressing them into a fixed grid.

## 2026-10-08 — Remove Home packaging feature (R77)

CURRENT / IMPLEMENTED: remove the complete packaging presentation block and its Home-only styles. Keep the surrounding sections and all other uses of the same images intact.

## 2026-10-08 — Keep the Home hero monogram-only (R76)

CURRENT / IMPLEMENTED: remove Shop Gifts, Explore Collections and Corporate Gifting from the hero. Preserve shopping navigation in the header/Hampers section and the existing Corporate section later on Home.

## 2026-10-08 — Use the TGG monogram as the Home hero (R75)

CURRENT / IMPLEMENTED: recolor the supplied transparent monogram white with CSS and use it in place of visible headline and support copy. Retain a labelled h1 for assistive technology, keep existing links/animation, and serve the local asset from B2C public assets.

## 2026-10-08 — Keep Home hero spacing deliberate (R74)

CURRENT / IMPLEMENTED: use a single text-group gap for title and supporting copy, with one gap before the action group. Do not stack a child action margin on top of the parent detail margin. Reduce vertical padding without placing text under the overlay navigation.

## 2026-10-08 — Make Home hero copy legible (R73)

CURRENT / IMPLEMENTED: keep hero copy and actions readable over every slideshow image and avoid clipping by allowing content to set a taller minimum section. Use Manrope for the headline, visually distinguish both shop actions and retain motion, wording and route behavior.

## 2026-10-08 — Editorial layout for Gourmet Story (R72)

CURRENT / IMPLEMENTED: use a split editorial heading and intro above three numbered food stories. Keep each current image, alt text, regional label, title, description, Hampers destination and Home reveal behavior; compose captions alongside images on phones.

## 2026-10-08 — Use the India hamper photo in the Home hero (R71)

CURRENT / IMPLEMENTED: make the supplied India hamper image the opening photo while preserving the existing fade rotation. Use the bundled Cormorant Garamond face directly for the hero title and increase its responsive size. Remove the separator line before Brand Philosophy without removing that section.

## 2026-10-08 — Remove Home hero pause/play control (R70)

CURRENT / IMPLEMENTED: keep the hero slideshow on its existing automatic rotation and remove the user-facing pause/play control, as requested. Preserve reduced-motion and background-tab behavior.

## 2026-10-08 — Remove Home collection and occasion feature sections (R69)

CURRENT / IMPLEMENTED: user requests removal of the Home collection shortcut strip and the full Wedding/Tea & Coffee feature section. Remove their rendered UI and unused Home-only data/component styles. Point hero/header collection links to `/shop`; do not change dedicated Shop collections or product/enquiry routes.

## 2026-10-08 — Centered Home hero and footer-matched motion (R68)

CURRENT / IMPLEMENTED: center the Home hero text/actions; use the existing self-hosted Cormorant face for its brand line/headline and Jakarta for copy. Match the `frontend_appview` footer wordmark's 24px rise, .98 scale, 10px blur, .7s `[.22,1,.36,1]` transition and .08s stagger. Trigger once in view; keep reduced-motion users static. Do not alter footer, hero images, destinations, SEO or shopping behavior.

## 2026-10-08 — Remove Home favourites heading (R66)

SUPERSEDED IN PART by R67: the first interpretation removed only the heading; user clarification required the cards to be removed too.

## 2026-10-08 — Home hampers lead directly to collections (R67)

SUPERSEDED by R69: the collection links after Hampers were later removed from Home by explicit user request; Shop destinations remain.

## 2026-10-08 — Compact Home favourites product layout (R64)

SUPERSEDED ON HOME by R67: the Candles/Shagun feature cards are removed from Home. Dedicated Shop/product cards, catalogue prices and AddGiftToCartButton quantity behavior remain current.

## 2026-10-08 — Overlay copy for Home hamper images and hero typography (R63)

Decision: the hamper cards no longer use a detached copy panel or top capsule. Center title, description, enquiry status and link over the image, reveal gently on pointer hover/keyboard focus, and keep visible on touch. Do not scale the image; only a slight card lift is allowed. Use the smaller conversational Home headline and copy; R65 temporarily superseded its Cormorant font with Pagio, and R68 restores Cormorant only for the hero. No product data, cart behavior, SEO metadata or destination changes.

## 2026-10-08 — Show existing hampers instead of Home occasions (R62)

Decision: the post-hero section promotes the two supplied hamper previews, Ivory and India, in the same rounded ivory layer above the sticky hero. Latest user direction replaces the separate text panel and top capsule with a centered text overlay on the image, revealed on hover/focus and always visible on touch. Keep the reveal and lift restrained; photos must not zoom. Preserve enquiry-only pricing and current detail destinations. Filter both hampers out of the following favourites display to avoid duplication; retain existing priced Candle and Shagun cards. Change Home quick links from Occasions to Hampers so they reach the replacement section. This does not create saleable hamper inventory, price or cart mapping. Browser visual acceptance remains UNKNOWN.

## 2026-10-08 — Split-rail Home occasion layout (R61)

SUPERSEDED ON HOME by R62. The visible occasion composition was removed in response to the explicit request to show the existing Hampers in its place.

## 2026-10-08 — Editorial photo mosaic for Home occasions (R60)

Decision: redesign the occasion cards in place using existing source photos and destinations. Use an image-led four-column desktop mosaic with Birthday as a two-by-two feature and Congratulations wide, then a two-column/tablet and phone composition. Put short labels and a quiet arrow over a readable image gradient; never scale photos on hover. No new collection taxonomy, destination or product claim is introduced. Visual/runtime verification remains UNKNOWN.

## 2026-10-08 — Sticky Home hero behind opening panel (R59)

SUPERSEDED IN PART by R62: retain the scoped sticky hero and rounded ivory overlap, but the opening section is now the Hamper showcase rather than occasion discovery.

Typography direction: storefront heading roles use self-hosted Manrope per the user's rejection of the current title font. Navbar labels and body remain Plus Jakarta Sans; admin typography remains scoped separately. Source updated; runtime/visual verification remains UNKNOWN.

## 2026-10-07 — Minimal consumer-first Home from the latest brief (R58)

Status: CURRENT / IMPLEMENTED source; visual acceptance and production performance UNKNOWN. Reason: the user authorizes a full premium homepage UI revision, rejects its first iteration and supplies a detailed ecommerce brief. Resolve the conflict with earlier “keep sections/order” and restoration directions in favour of the latest explicit brief. R55's old order, R54's restored Home presentation and R57's two-product Home composition are SUPERSEDED ON HOME; dedicated Shop/PDP layouts, supplied hamper identities/gallery and commerce contracts remain intact. B2B/alternate/parallel-room projects are outside scope.

Choose a consumer-led ivory composition with restrained burgundy/gold, one sharp open lavender hamper photo and “Good taste. Great gestures.” Build occasion discovery, four real catalogue favourites, three merged categories, brand/region/contents/packaging stories, wedding/tea-coffee features, personalisation, a secondary corporate invitation, truthful testimonials/FAQ and focused footer as typed reusable sections. During this task the dark burgundy split opening and then an oversized panoramic opening were attempted and rejected; the final compact ivory opening supersedes both. The previously rejected pinned stories and stacked pages are not revived.

Truthfulness controls implementation: preview hampers cannot gain numeric prices or cart mappings; pictured contents do not establish final bundle quantities; only existing local candle/envelope amounts and IDs are displayed. Gift-cart semantics are reused. Personalisation composes an email request rather than adding a new cart field; Tea/Coffee remains on enquiry. Approved endorsements are absent, so the testimonial component returns no markup. No fabricated reviews, shipping/tax/return promises or corporate client logos. Commercial unknowns from R56 remain unchanged.

Use scoped Home CSS/tokens and normal server-rendered HTML, responsive Next images, two locally hosted brand-font Latin WOFF2s with OFL provenance, and optional mask decoration that cancels for keyboard focus/reduced motion/navigation. Keep loading fallbacks on the routes that need them instead of hiding synchronous Home content behind the root boundary. User confirms `https://b2c-tau-weld.vercel.app/b2c` as canonical; metadata and schema use rendered product/FAQ data and preserve preview boundaries. Final verification belongs in TESTING; an earlier production trial informed the loading fix, but this decision is not itself evidence that the final build/no-JS/runtime checks passed.

## 2026-10-07 — Fix hamper grid sizing and simplify its frame

Status: SUPERSEDED ON HOME by R58; CURRENT / IMPLEMENTED for dedicated Hampers cards, user visual acceptance UNKNOWN. Reason: the user rejects a screenshot of two narrow hamper cards occupying half a four-track layout. Actual source conflict: storefront.css forces four `.signature-grid` columns with `!important`; the later two-column hamper rule lacked that importance and also capped the whole grid at760px. Remove the legacy class from Home's hamper grid and define its layout independently, rather than extend that cascade. Keep the current two product identities and their full supplied images.

The rejection authorizes a hamper-card redesign: a fine border still encloses image/name/action, with larger imagery and compact left-aligned copy. This supersedes filigree/pill styling only for `.hamper-product-card`; previously accepted unrelated cards and inside pages remain separate. Apply consistent column sizing to the dedicated Hampers page; expose its collection identity through a data attribute. No catalogue/API/cart/price mutation, asset generation or new dependency. Sources: b2c/page.tsx, ProductCard, ShopCollectionPage, product-cards.css.

## 2026-10-07 — Editorial PDP with truthful commerce boundaries

Status: CURRENT / IMPLEMENTED for presentation; commercial facts remain CURRENT / PARTIAL / UNKNOWN. Reason: latest user explicitly requests the attached full product-detail brief. Use its hierarchy and restrained editorial styling on B2C product routes, without reviving the rejected homepage redesign. Retain original brand typography/palette and existing images. The gallery stays in normal flow; purchase information sticks only where viewport space permits. Reuse gallery, BuyPanel and gift-cart controls rather than create a parallel cart.

Conflict resolved: brief gives example₹1499, tax inclusion,3–5-day delivery and complimentary gift notes; actual curated-hampers data is preview-only, and GiftDraft has no message/personalisation field. User memory rules prohibit invented commercial policy. Therefore use enquiry-only hamper pricing, clearly identified photographed contents, and personalisation requests via the existing concierge email. No implicit variant mapping, provider work or cart-field change. Product-specific confirmations remain required before those promises can be shown. Existing standalone-product prices are displayed as catalogue values, not newly verified quotes.

Sarkar reference (`https://www.sarkar.store/products/throne`, inspected2026-10-07) informs hierarchy only. Actual photo supply controls gallery depth; do not fabricate open/closed/detail views or fill missing contents photography with unrelated products. Native details/radios and CSS provide accessible interaction with no added animation library. A duplicate sibling React key found during browser review was corrected; final browser console checks are clean. Affected: product detail components/styles and canonical UI/flow/testing memory.

## 2026-10-07 — Restore the previous homepage

Status: SUPERSEDED ON HOME by the later R58 redesign request; the R52/R53 rejection remains. Reason: user says “i dont want you changes pehle jaisa kr de.” Interpret as reverting the two recent homepage editorial/motion increments to the preceding hamper-enabled homepage. R52/R53 are SUPERSEDED / REVERTED; restore existing components and only reverse the Home-specific Header/StorefrontMotion changes. Preserve unrelated dirty work, earlier performance fixes, Shop dropdown, two supplied hampers, gallery and full-card frame. Delete only files created for the rejected redesign; a temporary recovery copy is retained in /tmp. No broad git reset, commerce/backend or parallel-project change.

## 2026-10-07 — A continuous editorial homepage

SUPERSEDED / REVERTED: user explicitly rejected this redesign and requested the previous homepage. The implementation and its dedicated tests/assets have been removed; details below record the attempted design and its historical checks.

Status: HISTORICAL / REVERTED; user rejected by the user. Reason: two consecutive explicit requests replace the static/slideshow opening with a cinematic hero, a three-stage pinned product story and four magazine-like stacked collections. Resolve the conflict with earlier Home composition by treating the slideshow, sprinkle, mandala background, generic fade-ups and three-circle/occasion/assurance rows as SUPERSEDED on Home. Keep their source assets and retain established Shop navigation, catalogue identities, product frames and commercial preview boundaries.

Use native sticky positioning, clip masks, restrained copy crossfades and event-driven requestAnimationFrame updates; no new animation dependency, scroll smoothing library, wheel/touch interception or perpetual RAF loop. Hero image bounds change within a contained layer, while the story visual stays fixed with at most6px image translation. Retain existing typefaces and use a stable Home wordmark with scene-aware contrast. Existing product photos are reused; Sharp only supplies same-image optimized copies. Reduced motion and short viewport heights use normal content flow instead of pinning. Hidden hero actions cannot receive focus; keyboard-focused stacked links can rise above later panels.

Collection cards are editorial entry points, not new catalogue data: Gourmet/Tea-Coffee → `/shop/hampers`, Corporate → existing corporate search, Wedding → `/shop/envelopes`. No tea/coffee price, SKU, stock or new category contract is inferred from photography. The two supplied hamper cards and their grouped gallery stay below the new sequence. A unit test caught reduced-motion header contrast being skipped by progress caching; tone updates now run before that cache guard. Browser route verification initially sampled Next's loading fallback; wait for streamed cards before asserting their count. Sources and final evidence: UI_SYSTEM/TESTING.

## 2026-10-07 — Frame must include all card content

Status: CURRENT / IMPLEMENTED; visual acceptance UNKNOWN. Reason: user rejects the latest layout because the text sits outside the frame. Explicit requirement supersedes the earlier photo-only interpretation. Reuse the same gold artwork around the article, with CSS border-image corner slices so longer titles/feedback can increase card height while retaining the corner design. Put image, title, amount and action inside responsive padding; avoid a second photo frame. Existing typography, no-zoom behavior, removed capsules/likes/copy and cart contracts remain. Affected: product-cards.css and UI/testing memory.

## 2026-10-07 — Follow the ornate gold reference

Status: artwork retained; photo-only placement SUPERSEDED by the full-card correction above after user rejection. Reason: user explicitly rejects the cut-corner treatment and supplies an ornate gold invitation-style border. This reference supersedes the inferred restrained-stationery direction. Use built-in imagegen to adapt the gold border into a transparent photo-frame overlay; keep corners/top/bottom intact and size its composition to the existing media ratio. A rounded,12%-inset photograph clears the ornament; initial11% preview was increased after alpha inspection found side-motif overlap. Preserve the rest of ProductCard and existing commerce behavior. Affected: product-cards.css, sibling WebP and UI/testing memory. Full prompt: UI_SYSTEM.

## 2026-10-07 — Frame follows premium stationery and gift packaging

Status: SUPERSEDED after explicit user rejection by the ornate reference frame above. Reason: user requests a fresh frame design that reflects the brand's theme and gifting purpose, supplying the current arch as the design to replace. Use a restrained rectangular ivory mount with fine antique-gold edging and cut corners, echoing the Shagun product rather than adding another detached crest. Native CSS clipping supplies consistent inner/outer edges without raster assets or extra JS. Supersedes only arched frame geometry and media insets; existing card typography, open surface, no hover zoom, no capsules/likes/descriptions and commerce branches remain. Inspected an isolated browser prototype before applying source; final responsive evidence: TESTING.

## 2026-10-07 — Two Shop destinations in B2C

Status: CURRENT / IMPLEMENTED. Reason: latest user explicitly requests Envelopes and Hampers under Shop, each with its own page. Replace the direct Shop navbar link with an accessible disclosure and add `/shop/envelopes` and `/shop/hampers`, reusing the existing catalogue adapter, shared cards and Shop presentation. Use current search terms instead of inventing database categories or product records. Local hamper data is absent, so an empty state is intentional. Source inspection found guessed category slugs unsafe: the existing backend silently drops an unknown category filter; Atlas search totals also ignore the search predicate. Record these pre-existing issues in TODO without changing the backend in this UI task.

Supersedes R46's removal of a separate Shagun/envelope navigation entry only for this new navbar/Shop collection access and supersedes the old Hampers `/b2c#hampers` link destination. Retain the Home's three collection tiles and merged Premium Stationery contents. Other projects, storefront card design, auth and commerce contracts are outside this change. Runtime evidence/limits: TESTING.

## 2026-10-05 — Use arched photographs and an open royal layout

Status: SUPERSEDED frame geometry by the2026-10-07 stationery mount; open card layout and existing content/action rules retained. Reason: user rejects the preceding nested rounded-card treatment. Select minimal royal as the working design direction: fine gold arch around the photograph, open ivory space, centered burgundy serif names and solid cart actions. The arch supplies the royal character without a detached ornamental header or nested card outline. Supersedes boxed-card surface, rectangular photo frame, left-aligned details and outlined button; preserves original photos/fonts, contained nonzooming image, absent overlays/copy and commerce behavior. First inspected an isolated browser style preview, then applied one coherent CSS definition and verified the final source. Affected: shared Home/Shop CSS and canonical UI/testing memory.

## 2026-10-05 — Replace crest/invitation cards with framed product photography

Status: SUPERSEDED by the arched-photo direction above after further visual rejection. Reason: user says the compact variant is better but still rejects it and explicitly authorizes our own design judgment. Earlier top ornament requirement is superseded by this broader design revision. Move the gold frame to the photograph, remove active crest/full-card ornaments, align product details left and soften amount/action weight. Preserve inner-frame photo containment, no hover zoom, no capsules/likes/descriptions, original images/font families and existing purchase/preview behavior. No generated asset/dependency or business change. Affected: shared Home/Shop product-cards.css and canonical UI/testing memory.

## 2026-10-05 — Replace rejected crest header with a compact border accent

Status: SUPERSEDED by photo-framed card revision above after further user rejection. Reason: user explicitly rejects the preceding rendered card. The large crest over a dedicated header overemphasized decoration and increased card height. Reuse the same crest as a56px/42px absolute border accent, reinstate interrupted inner top rules and reduce photo clearance. Remove truncated card description/unused flourish; keep linked product name, amount/preview state and cart/detail action. Use restrained solid burgundy action styling and tighter spacing. Supersedes70%-width/180px crest header, open-top inner frame and verbose card body; preserves photo containment, no zoom and removed capsule/like controls. Affected: B2C shared card/CSS, sibling frame SVG and canonical UI/testing memory.

## 2026-10-05 — Replace the card top border with a reference-led gold crest

Status: SUPERSEDED layout by compact border-accent revision above after user rejected the rendered card; crest artwork retained. Reason: latest user supplies an ornate gold lotus/paisley crown and asks for something similar in place of the top border. Built-in imagegen extracts a transparent sibling ornament; the existing card pseudo-element displays it in reserved layout space above the photo. Make outer top border transparent and use a sibling open-top SVG for inner sides/bottom, avoiding a duplicated straight top edge. Preserve horizontal photo containment, no zoom, typography, removed capsules/likes and commerce behavior. Supersedes previous complete top perimeter/tiny top jewel only. Affected: B2C card CSS/public assets and UI/testing memory.

## 2026-10-05 — Inset photos inside the royal frame

Status: CURRENT / IMPLEMENTED. Reason: latest user explicitly asks that product images not cross the inner frame. Use a responsive symmetric media inset rather than altering the SVG or source photographs. Supersedes previous full-width/top-flush photo placement; preserves transparent royal decoration, complete outer border and no image zoom. Affected: shared Home/Shop card CSS and canonical UI/testing memory.

## 2026-10-05 — Remove the card's category capsule and like button

Status: CURRENT / IMPLEMENTED. Reason: user explicitly asks to remove both top overlays. Remove shared ProductCard markup and its now-unused device-local save logic/CSS instead of hiding interactive controls. Preserve existing stored favourites without deleting browser data; current cards no longer read/update them. Keep category data/filter contracts, royal frame and product/cart actions. Supersedes prior badge/heart UI and floating offsets, not the frame/no-zoom choices. Affected: B2C shared cards and canonical UI verification docs.

## 2026-10-05 — Design a minimal royal vector frame

Status: CURRENT / IMPLEMENTED. Reason: user asks for our own minimalist but royal design while the preceding no-image-zoom request remains active. Replace heavy floral ornaments with a941byte editable SVG using fine antique-gold rules, subtle corner geometry and tiny wine-centred diamond details. Preserve photo placement/typography/palette/actions,3px overlay inset and pointer transparency. Move badges/hearts into the simpler top margin and remove photo transforms/transitions with a scoped specificity override over legacy card hover rules. Supersedes blue/floral asset choice and product-photo hover zoom only; retain prior assets and other card/button interactions. Affected: B2C SVG/card CSS and verification docs.

## 2026-10-05 — Try the blue-and-gold floral reference

Status: SUPERSEDED ornament choice by custom minimalist royal design above; placement/interaction rules retained. Reason: user previously asked to try the supplied blue floral/gold frame. Extract reference ornaments with built-in imagegen into a transparent sibling asset and switch the shared frame URL plus matching gold borders. Supersedes earlier sage/pink/peach ornament selection; retains the latest complete-border/full-width-top-photo geometry and existing content/action layering. Preserve original assets and all product/type/commerce choices. Affected: B2C public asset/product-cards.css and canonical UI/testing memory. Prompt/output details: UI_SYSTEM.

## 2026-10-05 — Photo reaches the card top; protect the frame perimeter

Status: SUPERSEDED photo placement by the inner-frame inset decision above; complete-border strategy retained. Reason: user supplies a screenshot showing an empty strip above the photo and a clipped-looking top frame. Correct existing CSS instead of regenerating ornaments: move outer card padding into the text panel, keep the photo flush with the inner border, inset the overlay3px from rounded clipping, and add a continuous1px matching peach outline. Float controls beneath the top flowers with responsive offsets. Supersedes the original padded media geometry/inset0, preserving the transparent overlay strategy, source assets and typography. Affected: B2C product-cards.css and canonical UI/testing memory; no component/business/API change.

## 2026-10-05 — Cut out the frame and overlay the card

Status: CURRENT / IMPLEMENTED overlay strategy; original padded geometry/inset0 SUPERSEDED by the top-alignment correction above. Reason: user clarifies that the frame must be cut out and laid over the card. Supersedes the earlier opaque background placement, preserving its floral reference/design direction. Use a transparent raster sibling (`floral-card-frame-overlay.webp`) from built-in imagegen, displayed by the existing card's `::after`; decoration cannot intercept pointer input. Keep content/badge/heart above ornament, and isolate layering within each card. No React component/API/layout contract change required. Original opaque frame remains for historical reference. Affected: B2C card CSS/asset and canonical UI verification docs.

## 2026-10-05 — Reference floral card frame

Status: SUPERSEDED ornament/asset choice by the blue-and-gold reference above; decorative-card scope retained. Reason: initial user image explicitly requests an invitation-style frame for product cards, superseding the older plain luxury card surface and no-decorative-lines rule within these cards. Created an original raster ornament inspired by the reference through the imagegen skill, then compressed it to a single38KB WebP reused by shared Home/Shop cards. Keep product imagery/type metrics/actions; scope overrides to existing card classes and reduced-motion support. No new animation library or dependency. Affected: B2C product-cards.css/public asset and UI verification memory.

## 2026-10-05 — Compact detail and confirmed quantity counter

Status: CURRENT / IMPLEMENTED source and mocked browser checks; live persistence UNKNOWN in this increment. Reason: user rejects repeated product-detail copy/instructions and asks for a counter beside Add to Cart. Reuse existing QuantityControl, opt in only on gift detail BuyPanel, display confirmed quantities rather than optimistic success, and use signed one-unit deltas against the latest draft rather than an absolute stale count. Preserve serialization, cookie ownership, bounded409 retry and non-replay of ambiguous failures. Remove duplicate/open detail text and redundant success/pricing paragraphs; retain distinct extra description behind collapsed disclosure. Existing Home/Shop button mode and server/API/schema/payment behavior remain. Affected: detail page, BuyPanel, AddGiftToCartButton, gift-cart helper and tests.

## 2026-10-05 — B2C performance scope

Status: CURRENT / IMPLEMENTED code, CURRENT / PARTIAL runtime improvement evidence. Reason: user reports lag with Next scrolling/preload logs. Preserve current presentation and commerce while reducing concrete rendering/network work: same-photo WebP transcodes, invisible hero-backdrop removal, threshold-only header state, bounded canvas memory and installed Next router's html scroll marker. This supersedes current JPEG slide URLs only; archived original-photo decisions retain their historical scope. Preserve signed-out401 and framework stylesheet preloading rather than suppressing them as errors. Before-change measurements reproduce jank; further layer-isolation browser work was declined. Local development recompilation delays remain; no untested bundler migration or production-speed claim. Affected: B2C layout/header/hero/canvas/assets and verification memory.

## 2026-10-05 — Premium Stationery collection grouping

Status: SUPERSEDED for the four-link navigation interpretation by the clarification below; catalogue union remains CURRENT / IMPLEMENTED. Reason: initial request merges envelopes, bookmarks and diary/pen sets and lists Hampers, Laddoo Candles, Premium Stationery and Shagun. Initial interpretation followed four named options despite the count of three, retaining Shagun as a shortcut. SUPERSEDED: separate Bookmarks and Diary & Pen Sets collection-navigation entries. Group in the storefront adapter using existing searches, preserving product IDs and backend category contracts. The earlier unfinished adapter omitted envelopes and truncated each source to its first page; include envelopes and complete pagination before deduplication/sorting. Hampers uses the existing section rather than inventing products. Affected systems: B2C collection navigation/catalogue only.

### 2026-10-05 — Shagun image for the merged collection

Status: CURRENT / IMPLEMENTED. Explicit user clarification: Shagun and Premium Stationery are merged; use the Shagun image. Remove separate Shagun collection links and assign its existing envelopes photo to Premium Stationery, leaving exactly three collection choices. Preserve the existing stationery search union and individual product/occasion destinations. Update unused shared category metadata consistently without mounting or redesigning FeaturedEdits. Supersedes only the four-link interpretation above. Affected systems: Home/Shop collection navigation, category metadata and mobile row fit.

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## DECISION-001

Date: 2026-09-25

Decision: Use repository /docs as persistent engineering memory with root AGENTS.md startup/update instructions.

Reason: Explicit user request. Chat context alone is insufficient.

Status: ACTIVE

Affected systems: All project domains and future implementation tasks.

## DECISION-002

Date: 2026-09-25

Decision: Preserve PROJECT_TECH_DESIGN_AUDIT.md and its Word export as dated evidence; canonical domain docs reference exact inventories rather than replace them blindly.

Reason: Existing useful extraction; avoid parallel competing design inventories.

Status: ACTIVE

Affected systems: UI, tech stack, SEO, assets, documentation.

## DECISION-003

Date: 2026-09-25

Decision: Distinguish source implementation, required invariants, disabled surfaces and UNKNOWN runtime/policy facts. This initialization changes documentation only.

Reason: Source contains incomplete commerce/admin flows; user prohibits inventing business rules or starting features before memory setup.

Status: ACTIVE

Affected systems: Auth, customers, orders, money, deployment, testing.

## Observed architecture, rationale UNKNOWN

MongoDB/Mongoose, Stripe, two frontends, encrypted local analytics vault and closed page whitelist are current source choices, not newly ratified architectural decisions. Original reasons/dates and previously rejected approaches are UNKNOWN. Do not invent history.

## CONTEXT CONFLICT C01 — README fonts

Template READMEs claim Geist through next/font. Main layout loads Cormorant/Jakarta with a Google stylesheet; alternate uses those plus Playfair/local fonts. Action: follow actual source for current behavior; retain README as template and flag mismatch rather than silently assume Geist.

## CONTEXT CONFLICT C02 — Page flags vs whitelist

Config comments say enabled flags control pages. isPageRouteActive actually uses hardcoded whitelist. Action: document whitelist as current behavior; resolve intended control mechanism before changing route availability.

## CONTEXT CONFLICT C03 — Desired integrity vs current implementation

User asks persistent identity/historical accuracy and reliable financial behavior. Current schema lacks full product snapshots/Customer360; money paths have E01–E08 gaps. Action: record unmet requirements; do not describe them as delivered or make money-policy assumptions.

## CONTEXT CONFLICT C04 — Comments vs runtime paths

Socket comment says verified admins but listener has no auth; Redis log mentions offline cache fallback but no functional non-test memory fallback exists. Tax order comment says5% fallback while breaker can supply0. Action: source expressions are current evidence; track defects instead of trusting comments.

## History rule

Never delete historical decisions. Supersede an old decision with a dated new entry, explicit rationale, affected systems and status. Rejected approaches must include actual evidence; no prior rejected attempts are known from this initialization.

## DECISION-004

Date: 2026-09-25. Status: ACTIVE.

Decision: Preserve the pre-expansion gap baseline; expand existing canonical files with per-relationship, per-state and per-endpoint detail and a requirement traceability matrix. Use CURRENT / IMPLEMENTED, CURRENT / PARTIAL, CURRENT / BROKEN, FUTURE / REQUIRED, FUTURE / OPTIONAL and UNKNOWN explicitly.

Reason: User requested reconstruction accuracy rather than line count and explicitly prohibited feature implementation. Future architecture records required responsibilities without approving schemas, transitions, financial rules or activation. Source inspection corrected incomplete validator excerpts and configuration/test-coverage wording.

Affected systems: All35 audit domains. [MEMORY_GAP_AUDIT.md](MEMORY_GAP_AUDIT.md) owns countable MC01–MC10 conflicts and U01–U12 unknown decisions; C01–C04 above are preserved historical groupings, not additional counted conflicts. Account/inquiry discoveries were added after baseline rather than rewriting it. No application fixes or historical business decisions were fabricated.

## DECISION-005 — B2C direction and signup trust boundary

Date: 2026-09-27. Status: ACTIVE. Context: user authorizes incremental B2C implementation, superseding the documentation-only execution scope in DECISION-003/004 while preserving their evidence/continuity rules.

Decision: retain existing stack/UI and first fix public signup privilege assignment at the service boundary. Ignore caller role and always create customer; do not change existing stored staff roles. Implementation plan owns dependency order; commercial-policy UNKNOWNs block only dependent paths.

Reason: admin APIs rely on DB role; public assignment undermines all owner/customer separation. Alternatives considered: rejecting role with400 (unnecessary response-contract change), stripping only at HTTP validation (direct service bypass), new RBAC schema (not required for this defect). Consequence: signup can no longer provision administrators; provisioning and additional staff roles need a separate governed design. Existing potentially misprovisioned accounts need operator review, not automatic demotion.

Affected systems: signup/token creation, protected admin access, auth regression tests and canonical docs. No schema/UI/payment/deployment change.

## 2026-09-28 — Isolated B2C MongoDB implementation

Status: CURRENT / IMPLEMENTED (DB layer), CURRENT / PARTIAL (commerce integration).

- Choose Mongoose already present in B2C. Rejected Prisma/Mongo for this task because it adds a separate generated client and contract migration; rejected native-driver primary DAL because guards/validation would need duplication. Driver commands through Mongoose remain administrative only.
- The user asked for a greenfield 20-collection schema while existing controllers consume six incompatible legacy models. Resolve by explicit new connection under B2C/backend/database; do not silently swap live model contracts. Legacy API integration/migration is FUTURE / REQUIRED.
- Preserve minor-unit snapshots; global SKU uniqueness makes productId+SKU uniqueness redundant. Customer contact matching stays nonunique pending merge policy; optional customer.userId remains unique.
- One coupon redemption and one invoice per order are explicit v1 implementation limits, not confirmed permanent business rules. Multiple payment attempts, shipments and refunds are supported structurally.
- Coupon rates use integer basis points; fixed discounts use minor units and currency. Pending refunds reserve capacity using a shared payment write. Coupon counter writes serialize concurrent usage checks. Inventory state derives from quantity and explicit threshold.
- Freeze category parent after creation, financial snapshots at creation, invoice identity at issuance; no cascade deletion or implicit retention. Future changes require a tested migration/policy.
- Mongo JSON Schema is a structural backstop. Application transitions/references/append-only behavior require the DAL, transaction entry points and trusted deployment credentials; no claim of universal protection from arbitrary native writes.

## 2026-09-29 — B2C reference storefront

CURRENT / IMPLEMENTED: user screenshot supersedes prior B2C homepage styling for this task. Reuse original monogram and existing product assets; preserve real catalogue data and truthful unavailable/preview behavior. Do not invent commercial prices, delivery thresholds, reviews or mailing-list integration from a visual reference. Reference sections without verified data use brand copy and existing account navigation.

## 2026-09-29 — Google auth and Atlas integration

CURRENT / IMPLEMENTED: wire Google and email authentication into the new schema using a small standalone auth adapter, avoiding unrelated Stripe/Cloudinary/Redis startup requirements and legacy-schema mutation. No email-only automatic provider linking or legacy migration. Use persistent opaque sessions rather than introducing a second ORM/auth database. Keep session digests bounded in users (no extra collection). Choose seven-day sessions as technical default. Process-local OAuth state supports current single-instance local run only. Legacy cart/login merge and checkout integration remain explicit follow-up work.

## Box-first gifting — 2026-09-30

CURRENT decision: user explicitly requests box-first Signature Edit and backend-private capacity with packing decisions deferred until cart. This supersedes earlier Signature Edit product-card content (shared product cards still used in /shop). Reuse source box catalogue/capacity rules; separate selectable draft catalogue from saleable stock because current source has no verified inventory/pricing. New GiftDraft avoids corrupting ProductVariant-based Cart or silently linking new Google identities to legacy users. Browser session owns draft; account merge/retention remain unresolved. No payment enabled. Minimal unframed cards and existing fonts retained; reduce spacing instead of adding decoration.

## Razorpay — 2026-09-30

CURRENT: User explicitly requested Razorpay for B2C. Integrate with isolated Order/Payment domain; preserve legacy Stripe. INR amounts from trusted persisted quote only; stock must already be reserved. Do not invent gift prices/box costs/tax/shipping. Frontend draft remains non-payable until upstream quote setup. Uncertain remote-create outcome requires reconciliation instead of a new receipt.

## 2026-09-30 — Checkout requires customer sign-in

CURRENT / IMPLEMENTED, explicit user requirement: browse/build remains guest-capable; continuing to checkout requires a real session, then delivery details saved under that customer. Supersedes anonymous gift checkout-check behavior. No merging browser draft ownership into customer identity; no invented saleable prices. Affected auth return paths, gift API, cart and checkout UI. Payment availability remains conditional on trusted priced/reserved orders.

## 2026-09-30 — Layout-only ecommerce direction

ACTIVE / IMPLEMENTED. User explicitly authorized ecommerce layout/animation redesign while prohibiting font, text-size, image and colour-theme changes. Preserve typography.css and source imagery; use a separate storefront.css for composition and native progressive motion. Supersedes earlier homepage section composition, retaining full-image hero and requested section bottom padding. Shopping actions continue existing destinations; no simulated purchases or additional payment scope.

## 2026-09-30 — Signature homepage content change

ACTIVE: user now requests items instead of boxes in The Gourmet Signature Edit. SUPERSEDED: earlier box-first homepage showcase only. Existing box-builder/cart packing mechanism remains unchanged. Reuse shared catalogue/product cards and link View All Items to shop.

## 2026-09-30 — Pasted card reference supersedes minimal card silhouette

CURRENT / IMPLEMENTED: user's latest product-card reference authorizes rounded cards, portrait photography, a curved content edge and pill actions, superseding the earlier minimal unframed product-card styling and phone third-card row. Preserve established fonts/sizes, assets and palette from the preceding user constraint. Use real category/price data and existing product destinations; omit sample reviews and prices. Heart is explicitly device-local bookmarking because no account wishlist contract exists. No cart, order, payment or database changes. Affected home/shop ProductCard, catalogue presentation mapping and product-cards.css.

## 2026-09-30 — Rendered screenshot is the product-card visual authority

CURRENT / IMPLEMENTED: user reiterated the desired design using a rendered diffuser card. SUPERSEDED: the previous symmetric wave, small sans product titles and two-column narrow-phone card presentation. Match the descending curve and editorial serif hierarchy using already-loaded Cormorant/Jakarta, retaining product photos and brand palette. This revises card-specific font sizes/family assignment only; broader site typography constraints remain. Single-column cards below481px preserve readable reference proportions. Existing product destinations and truthful preview status remain; no commercial/review data invented.

## 2026-09-30 — Cohesive homepage feature edit

CURRENT / IMPLEMENTED: latest user request authorizes redesign of the gourmet/candle/stationery group. Supersedes earlier feature-pair/paper-feature layout only; use one FeaturedEdits group with matched gutters, photo/copy panels and touch-sized discovery links. Keep original typography scales, source imagery, copy, colour theme and search destinations. Product cards, hero, authentication and commerce remain outside this increment.

## 2026-09-30 — Restore Add to Cart after card redesign

CURRENT / IMPLEMENTED: the user reports lost Add to Cart functionality. SUPERSEDED: the detail-only action for known gift-catalogue preview items in the earlier card redesign. Missing sale prices do not prevent saving an existing gift selection. Restore Home/Shop and item-detail actions through the existing browser-owned GiftDraft API; retain image/title detail links and the requested card design. Explicit giftItemId maps the59 matching source catalogue IDs, without guessing a live ProductVariant mapping. Live product option/legacy bag behavior remains separate.

Serialize complete read/write additions, including first-cookie creation. Preserve selected boxes and unrelated items; retry only an explicitly rejected409 once against fresh state. Do not retry ambiguous writes or show success before server confirmation. Cart loading waits for pending additions, and header count discards stale responses. Payment/stock/customer ownership contracts are unchanged.

## 2026-09-30 — Editorial hierarchy for feature stories

CURRENT / IMPLEMENTED: user rejects the previous paired rounded cards as insufficiently elegant. SUPERSEDED: the earlier feature-only rounded/inset-panel composition. Give gourmet the lead and place candle/stationery stories alongside it with portrait photography, fine dividers and text links. Preserve established typography, copy, image assets and palette; change composition at1200/640px instead of shrinking the existing font scale. The separate product-card design and restored cart actions remain intact. Affected files: B2C/src/components/FeaturedEdits.tsx and src/app/featured-edits.css.

## 2026-09-30 — No decorative margin lines in B2C

CURRENT / IMPLEMENTED: user explicitly rejects margin/divider lines throughout the active project. SUPERSEDED: fine divider rules and permanently underlined feature actions from the immediately preceding editorial revision, plus older B2C section/row separators. Apply consistently across B2C frontend styles, using the existing whitespace and surfaces for hierarchy. Preserve functional control boundaries and accessible focus indicators; no application flow changes. Original frontend_appview/frontend_responsive remain separate from the active B2C implementation.

## 2026-09-30 — User-selected equal feature panels

CURRENT / IMPLEMENTED: after rejecting the asymmetric composition, user selected “3 equal image-led panels — balanced row, compact copy.” SUPERSEDED: dominant gourmet image and smaller candle/stationery stories. Use equal columns/image heights and shared content alignment on desktop, consistent category treatment at smaller widths. Shorten supporting copy and remove indices; preserve fonts/sizes/images/theme and the no-divider-lines preference. Full-width slider and alternating banners were offered but not selected.

### 2026-09-30 — Reduce competing feature text

CURRENT / IMPLEMENTED: user approves the panel composition but reports text clash. Retain that layout and the typography-size invariant; shorten marketing headings/descriptions, remove redundant eyebrows and increase separation before Occasions. SUPERSEDED: the prior four text layers and forced gourmet title wrapping. Affected files are FeaturedEdits.tsx and featured-edits.css; commerce, navigation and product cards are outside this correction.

## 2026-09-30 — Preserve the cart across authentication

CURRENT / IMPLEMENTED: user explicitly requires guest/signed-in Add to Cart and retention of pre-login items. Keep existing b2c_gift ownership through auth, rather than introducing an unrequested account/customer merge. Fix pending-write navigation and late cookie-response races using a shared queue; block sign-in navigation on an unconfirmed in-flight save and cancel delayed redirects after Account unmounts. Remove legacy storage dependence from cookie-owned APIs; retain last confirmed badge count during an outage. SUPERSEDED: immediate Account redirects and generic sign-in messaging for gift-route failures. Atlas recovery remains necessary for configured-runtime saves; temporary tests must not be represented as Atlas success.


## 2026-09-30 — Unified Shop introduction

CURRENT / IMPLEMENTED: user rejects the Shop introduction shown in their screenshot. SUPERSEDED: disconnected heading plus small box invitation card. Group the heading, shorter copy and a single box-building action, with the existing box photograph as the banner visual; keep fonts/sizes/theme and line-free styling. Initial inset, rotated-photo treatment was replaced after visual review because it retained a small isolated image and excess empty space; the final desktop treatment uses a full-height photo. Shortened the CTA to Build your gift after320px inspection found the longer label wrapping. Affected systems: B2C Shop presentation only; no auth/cart/backend contracts changed.


## 2026-09-30 — Burgundy colour is explicit

CURRENT / IMPLEMENTED: user's explicit #3c0b1e requirement takes precedence over prior screenshot-derived brown accent choices. SUPERSEDED: #401c19 brand override and separate brown announcement/navigation/button/footer accents. Use the single existing --wine token throughout brand/action states, including primary-button hover; retain neutral surfaces and product photography. Source change confined to B2C/src/app/globals.css.


## 2026-09-30 — Signature heading font exception

CURRENT / IMPLEMENTED: explicit user request authorizes a font-family change only for The Gourmet Signature Edit, with normal upright styling and centered alignment. Choose already-bundled Pagio Regular400; no new font service or dependency. SUPERSEDED for this heading: Cormorant300 and the left desktop introduction. Preserve current responsive font sizes and other heading styles. Source: B2C/src/app/typography.css and storefront.css.


### 2026-09-30 — Revised brand colour trial

CURRENT / IMPLEMENTED: explicit user choice to try #4A0404 supersedes the earlier exact #3c0b1e requirement for the current preview. Update the existing brand token and matching checkout theme only; no payment-flow change.


## 2026-09-30 — Hero and discovery redesign

CURRENT / IMPLEMENTED: latest user request supersedes the preceding open feature-photo/copy layout and hero text overlay. Keep three equal desktop feature panels, but integrate copy over imagery with sufficient dark backing and one accessible link per panel. Use a cream hero introduction overlapping the lower edge of the complete-ratio photo so product branding and copy have separate emphasis. Preserve explicit full-fit hero, transparent-before-scroll/white-after-scroll navbar, no-decorative-lines, #4A0404 theme and existing typography-size requirements. This is a layout-only exception to the previous section compositions, not authorization to change Signature cards or commerce behavior.

## 2026-09-30 — Pagio across section headings

CURRENT / IMPLEMENTED: user explicitly extends the Signature Edit font to every section heading, superseding its prior font-family-only exception. Reuse bundled Pagio Regular400 for main B2C page/section headings and normalize nested italic emphasis. Preserve responsive sizes and current alignment; this request does not authorize centering every heading or changing product-name/body/navigation typography. One shared rule in typography.css avoids changing --font-cormorant, which has unrelated consumers.

Verified fit correction: the first font pass clipped Personalised Paper at1024px. Keep its48px heading and extend the existing landscape feature treatment through1199px; three equal columns start at1200px. This resolves the observed font-width issue without reducing sizes or splitting words mid-word. Source: featured-edits.css.

## 2026-10-01 — Reduce white surfaces

CURRENT / IMPLEMENTED: explicit request authorizes warmer background treatment while retaining the established deep-red brand and typography. Use a separate canvas token instead of changing --paper, whose consumers include product-card curves and foregrounds on dark images/buttons. Add rose Signature/Story/Shop surfaces and a deep-red footer, with darker muted copy and visible footer hover/focus. Supersedes prior white-footer/paper-canvas styling in B2C only. No commerce, auth or asset changes; source is surfaces.css, its root-layout import and Shop muted-token replacements.

## 2026-10-01 — Kids replaces Personalised in navigation

CURRENT / IMPLEMENTED: user explicitly requests Kids in the third navbar slot, a playful font at the same navigation size and different bright pastel letters. Reuse the existing search route with search=kids, replacing the stationery destination. Use local Baloo2 Bold700 with an open licence; a small brand-colour badge provides contrast for pastel letters on the white scrolled/open menu. Preserve heading fonts and nav centering. Catalogue audit found no established Kids products; use the truthful empty result until the user supplies item/category assignments. This does not authorize relabelling unrelated products or changing stock/prices.

2026-10-01 refinement — CURRENT / IMPLEMENTED: explicit request to remove the Kids background supersedes the burgundy badge choice. Preserve the requested pastel letters and font/size; remove only the fill.

2026-10-01 size refinement — CURRENT / IMPLEMENTED: latest request to enlarge Kids supersedes its original same-size constraint. Use1.2em so the modest increase follows the existing responsive navigation scale.


## 2026-10-01 — Simplify the rejected hero panel

CURRENT / IMPLEMENTED: latest user rejection supersedes the September30 hero's overlapping cream card and split headline/action composition. Use an open centered introduction on the existing warm surface token, reducing competing elements by removing its eyebrow/promises. Keep the original headline/copy, upright Pagio, existing responsive sizes, full-fit photo, deep-red theme and shopping destinations. This decision affects the hero only; approved featured panels and commerce components remain separate. Replaced existing scoped CSS rather than adding another competing override; removed the later hero shadow in surfaces.css.


### 2026-10-01 — Hero placement correction

CURRENT / IMPLEMENTED: user requested moving the rejected text block “hero ke uper.” Implemented as an overlay on the hero image; optional clarification offered overlay versus a separate section above, with no answer received during implementation. This supersedes the preceding below-image introduction. Preserve full-fit photography and type sizes by allowing the shared hero grid to grow on phones over the existing burgundy background, rather than cropping the photo to force all copy into its short natural height. Light copy and a gradient provide readable foreground contrast. Scope remains presentation only.


## 2026-10-01 — Match the supplied product-card reference

CURRENT / IMPLEMENTED: latest image reference authorizes refining the shared Home/Shop cards. Correct the existing symmetric wave to the reference's descending shoulder, match fill/card surface, soften shadow and provide sufficient responsive card width. Reuse established image/type/control proportions and#4A0404 rather than copying the screenshot's brown action colour. Preserve actual product data: preview products retain their label, real prices use money(), and unestablished ratings remain absent. Add to Cart, device-local favourites and all persistence logic are outside the visual change.


## 2026-10-01 — Distinguish featured categories from product cards

CURRENT / IMPLEMENTED: user rejects the screenshot's layout because it repeats the cards above. Replace three tall overlay cards with alternating photo/copy rows and compact phone stacks. This supersedes the discovery portion of the September30 hero/discovery decision and its subsequent Pagio-fit breakpoint; the current hero is outside this change. Reuse the existing component, images, text, type scale and links. Remove the discovery overlays only, preserving the separately corrected hero gradient. Affected system: B2C FeaturedEdits CSS; no application-flow or API changes.


## 2026-10-01 — Existing-photo hero slideshow

CURRENT / IMPLEMENTED: user explicitly requests smooth fading image changes and confirms reuse of existing project photos. Reuse the original hero and two existing Gourmet-branded wide gifting photographs; preserve original image pixels and full-fit foregrounds using blurred same-photo side fill for the slightly narrower alternatives. Candidate highres images with unrelated brand names and a baked-in website mockup were rejected. Keep the established text and gradient fixed while images rotate. No carousel dependency or new generated asset added.

Independent review identified hard cuts after an image failure left only two ready slides: the previous layer was still opaque when reused. Clear the outgoing layer after each fade; failed alternatives remain excluded. Affected systems: B2C hero presentation/assets only.

2026-10-01 selection refinement — earlier agent-selected royale4/royale3 alternatives are SUPERSEDED by the user's exact three asset paths: root `images/brand/hero.png`, `images/pics/ChatGPT Image Sep 23, 2026, 09_50_14 PM-1.png`, then `images/small_anipics/framee.png`. CURRENT / IMPLEMENTED: use byte-identical public copies and matching intrinsic dimensions. Existing contain fitting and same-photo side fill accommodate their different aspect ratios without changing hero geometry, text or gradients.


## 2026-10-01 — Replace repeated editorial rows with a collection selector

CURRENT / IMPLEMENTED: user requests a better composition for the screenshot's gourmet/candle/paper section. Supersede the earlier alternating-row decision with one compact interactive showcase: prominent photo, burgundy detail panel and three accessible category tabs. Preserve existing assets, heading sizes/font, descriptions and shopping destinations; introduce no automatic rotation or new dependency.

Review found eager image loading alone could still expose a blank frame on an immediate tab click. Selection now awaits decode and uses a request counter to ignore stale completions. Browser inspection also found a25.5px phone height difference between categories; reserve panel space to stabilize all three choices. Affected systems: B2C FeaturedEdits only.

## 2026-10-01 — Owner operations boundaries and authorization

Status: CURRENT / IMPLEMENTED core, CURRENT / PARTIAL full operations objective. Affected: B2C frontend, auth service, explicit database layer; original apps remain separate.

Problem: B2C has an active opaque-cookie/Google identity system and explicit commerce schema, alongside a legacy JWT/Stripe/BullMQ fork. A new unrelated admin login or legacy-model queue reuse would split identity and corrupt assumptions. Chosen: reuse `auth/service.sessionUser`, same HttpOnly cookie and `/api/v1/auth/admin` namespace; serve only a non-sensitive `/admin` shell before server API authorization. Reject broadening the session cookie Path just for server-rendered administration. Trade-off: the shell can render publicly, while all records and commands remain protected APIs; existing Google flow-state memory still needs production multi-instance planning.

RBAC uses existing CUSTOMER/ADMIN/OWNER roles. OWNER receives the known permission catalog; ADMIN starts with no grants and cannot hold OWNER-only settings/admin-user permissions. Current database session/permissions are read on every request; writes additionally lock the actor User inside the business transaction, so concurrent revocation wins before unauthorized effects. Permissions `dashboard.read`/`analytics.read` intentionally expose documented aggregate metrics across domains, while entity links and investigations require individual grants. Operators must understand that aggregate access is itself sensitive.

Owner provisioning uses one operator-only command targeting an existing authenticated-capable active User by internal ID, guarded by a unique bootstrap setting and transaction. No public role picker, auto-owner email heuristic or assumed owner identity. OWNER assignment has not run: user identification is pending. Staff account suspension deliberately also prevents customer sign-in, and the UI discloses this; a customer-only account cannot be suspended through staff removal.

Problem: repeated stock/content/admin requests and concurrent permission changes. Chosen: strict resource DTOs/input allowlists, optimistic expectedVersion, actor-scoped unique command receipt, request hash and atomic audit/effect transaction. Existing inventory/coupon/financial invariants remain the authority. Audit failure rolls back the action. Receipts store references rather than copied private request payloads. Trade-off: actor writes serialize that actor's mutations; no provider side effect occurs inside these admin transactions. Future external commands require durable job/outbox and reconciliation design, not reuse of this local-only handler pattern.

Problem: unknown commercial rules and unavailable service integrations. Chosen: expose genuine stored payments/refunds/invoices/shipment/notification records and explicit capability limitations. Do not enable arbitrary paid/completed/cancelled states, refund calls, legal invoice issuance or carrier jobs without policy/provider evidence. Reusing legacy queues with incompatible collections was rejected. Reporting requires explicit currency/timezone/window; captured payment totals are labelled gross captures, not recognized revenue. Date boundaries are UTC instants with an explicit display timezone; no mixed-currency totals or fabricated growth/AOV values.

Schema additions: admin_settings, admin_commands and admin_rate_limits; bounded User permission/session version fields and supporting cursor indexes. Chosen MongoDB/Mongoose to preserve current invariants rather than introduce Prisma or a second datastore. Rate counters are shared Mongo records with atomic increments and TTL cleanup; unavailable storage fails closed. Trade-offs: added database load and proxy/IP configuration remain deployment concerns. No production benchmark, Atlas migration or live owner grant is implied.

Security guidance reviewed against [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) and [MongoDB production transaction considerations](https://www.mongodb.com/docs/manual/core/transactions-production-consideration/); implementation claims are grounded in local tests, not those references alone.
## 2026-10-08 — Home display font and scale (R65)

SUPERSEDED by R93 for title family: this decision set Pagio Regular400 on Home section/product headings and reduced their scale. Preserve its scale guidance and separation of title roles from body/navigation/actions; R93 now uses Cormorant Garamond consistently across B2C titles.
