# Project Context

Current direction (2026-09-27): user explicitly requests B2C gifting commerce implementation in this repository. Existing public B2B inquiry journey remains the observed baseline, not the target limitation. Earlier documentation-only scope below is historical and superseded for new work by this directive. Follow [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md); do not claim unfinished commerce is live.

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Session entry point

Read this file, [CURRENT_STATUS.md](CURRENT_STATUS.md), [ARCHITECTURE.md](ARCHITECTURE.md), [TECH_STACK.md](TECH_STACK.md), [DECISIONS.md](DECISIONS.md), [CHANGELOG.md](CHANGELOG.md), [TODO.md](TODO.md), then task-specific domain docs and actual source. Root [AGENTS.md](../AGENTS.md) defines the maintenance protocol.

## Project understanding

The Gourmet Gifts is a corporate/B2B gifting website with House of Satra branding/ownership references. Current main UI focuses on curated catalogue, occasions, enquiry collection and WhatsApp contact. A separate pastel frontend and legacy ecommerce implementation coexist. Do not infer that ecommerce APIs or dormant pages are live production features.

## Initialization report

| Area | Current understanding |
| --- | --- |
| Architecture | Two independent Next.js apps; Express REST backend; Next.js internal APIs for inquiry, geo and telemetry/admin |
| Tech stack | Next16 / React19 / TypeScript / Tailwind4; GSAP, Framer Motion; Express4 / Mongoose8 / Redis / BullMQ |
| Database | Six distinct Mongoose models (User, Product, Category, Order, Coupon, Review); Redis carts; separate encrypted file vault |
| UI | Main ivory/charcoal/sage/gold with burgundy enquiry buttons; Cormorant/Jakarta plus local display fonts; alternate pastel/plum theme |
| Business flows | Browse → curate → inquiry/WhatsApp. Backend authenticated checkout → stock decrement → Stripe intent → webhook/expiry exists separately |
| Admin flows | Backend admin stats/orders and protected catalogue mutation APIs; separate PIN/cookie telemetry portal, whose page is disabled |
| Integrations | Stripe, Cloudinary, SMTP/Nodemailer, WhatsApp, Clarity, IP/GPS geocoding; Redis/MongoDB infrastructure |
| Known risks | Signup role issue corrected 2026-09-27; unauthenticated socket room membership; idempotency/stock races; pricing/tax inconsistencies; vault durability |
| Known gaps | No implemented invoice/refund ledger or unified Customer360; complete fulfillment state transitions absent; live services/test status unknown |
| Open questions | Deployment owner/platform; intended future ecommerce activation; tax/shipping/refund policy; customer identity merge and data retention policy |
| Priorities | P0 auth and money-integrity findings first before exposing ecommerce; P1 persistence, configuration and regression coverage; details in TODO |

## Preserve existing knowledge

[PROJECT_TECH_DESIGN_AUDIT.md](PROJECT_TECH_DESIGN_AUDIT.md) remains the detailed dated technology/design snapshot; its Word export remains preserved. Use it for exact values and source paths, and update canonical domain docs for new decisions. Boilerplate frontend READMEs claim Geist; actual font loading differs. This conflict is recorded in DECISIONS.

## Evidence vocabulary

- IMPLEMENTED: code exists, not a production-health claim.
- VERIFIED: a named check actually passed; record command/date/scope.
- DISABLED: route gating prevents page access; not proof backend endpoint is disabled.
- REQUIRED: user-directed invariant, may still have implementation gaps.
- UNKNOWN: policy or runtime fact not established. Keep unknown until evidence/user instruction resolves it.
- Source findings are recorded with paths; original architectural rationale and failed approaches are UNKNOWN unless recorded explicitly.

## Scope of this setup

Initialize persistent docs and agent startup guidance only. No feature implementation or automatic remediation was requested in this initialization. Existing designs, contracts, payment provider and route availability remain as found. Future significant changes require matching documentation updates.

## Canonical documentation index

- [Admin Flows](ADMIN_FLOWS.md)
- [API Contracts](API_CONTRACTS.md)
- [Architecture](ARCHITECTURE.md)
- [Authentication System](AUTH_SYSTEM.md)
- [Business Logic](BUSINESS_LOGIC.md)
- [Changelog](CHANGELOG.md)
- [Current Status](CURRENT_STATUS.md)
- [Customer System](CUSTOMER_SYSTEM.md)
- [Database](DATABASE.md)
- [Data Models](DATA_MODELS.md)
- [Decisions and Conflicts](DECISIONS.md)
- [Deployment](DEPLOYMENT.md)
- [Edge Cases](EDGE_CASES.md)
- [Environment](ENVIRONMENT.md)
- [Finance System](FINANCE_SYSTEM.md)
- [Integrations](INTEGRATIONS.md)
- [Inventory System](INVENTORY_SYSTEM.md)
- [Invoice System](INVOICE_SYSTEM.md)
- [Order System](ORDER_SYSTEM.md)
- [Payment System](PAYMENT_SYSTEM.md)
- [Performance](PERFORMANCE.md)
- [Product Requirements](PRODUCT_REQUIREMENTS.md)
- [Refund System](REFUND_SYSTEM.md)
- [Security](SECURITY.md)
- [SEO](SEO.md)
- [Tech Stack](TECH_STACK.md)
- [Testing](TESTING.md)
- [Prioritized TODO](TODO.md)
- [UI System](UI_SYSTEM.md)
- [User Flows](USER_FLOWS.md)

## Completeness audit and state language

[MEMORY_GAP_AUDIT.md](MEMORY_GAP_AUDIT.md) preserves the pre-expansion gaps and final verification. [Product requirement traceability](PRODUCT_REQUIREMENTS.md#requirement-traceability) maps major requirements through docs/data/API/UI/tests.

Use these labels consistently:

| Label | Meaning |
| --- | --- |
| CURRENT / IMPLEMENTED | Code path exists; not a runtime success guarantee |
| CURRENT / PARTIAL | Some links exist; missing integration/coverage explicitly identified |
| CURRENT / BROKEN | Contradiction visible in source; production incident not implied |
| FUTURE / REQUIRED | User-required documentation/integrity target, not a delivered feature or approval to implement |
| FUTURE / OPTIONAL | Design possibility requiring a separate scope decision |
| UNKNOWN | Repository and instructions do not establish the fact/policy |

Target users visible from content: corporate gifting buyers arranging employee/client/partner/event gifts; storefront visitors; internal enquiry/analytics staff. No approved pricing policy, customer-merge algorithm or complete staff permission hierarchy is established. Main public experience is lead collection, not a verified paid checkout. Gated account and checkout contain development fallbacks which simulate success; do not use them as evidence of real identity/orders.

Fresh-session reconstruction is now source-linked, but runtime readiness, business policy and identified code defects remain unresolved. Start any future implementation with its domain doc and actual source; audit completeness is not feature completeness.

## 2026-09-27 — B2C location correction and actual app

User clarified the required implementation directory is `/Users/deeptanubhunia/Desktop/gour/B2C`. Actual Next.js app now lives at B2C/src with its own package/config/assets; backend source lives at B2C/backend. Original B2B frontends remain untouched in this increment. Earlier original-backend signup fix is retained, not reverted.

Implemented B2C home, search/pagination catalogue, product detail/variant selection, API-backed cart with server display data, genuine signup/login/me/logout and paginated order history. Existing products/images provide labelled read-only previews if backend unavailable, with no fabricated prices. Checkout is explicitly unavailable; payment/owner/invoice/refund/finance work remains unfinished. No live credentials copied and no data migrated.

Verified B2C production build, TypeScript and lint; B2C backend16 tests across4 suites passed with temporary MongoDB and mocked Redis/Stripe/BullMQ. Runtime preview is port3001; backend default5002, Redis logical DB1. Real backend/provider connectivity and browser interaction remain unverified. Local dependencies reuse existing installations via ignored symlinks; npm ci supports an independent install. See B2C/README.md for commands/limitations.

## B2C database increment — 2026-09-28

Database-only implementation now exists in B2C/backend/database, isolated from legacy B2C/backend/src API models. See DATABASE/DATA_MODELS for the20-collection foundation and TESTING for verified limits. Frontend checkout and commerce integration remain partial.
