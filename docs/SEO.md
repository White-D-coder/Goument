# SEO

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Implementation

Main root Metadata includes canonical metadataBase https://thegourmetgifts.co, title/description/keywords, OG en_IN and Twitter large image; meta.png declared1200×1200. Page/dynamic metadata exists for collections/occasions/contact and standalone occasion pages. Organization/WebSite/WebPage/ItemList shared schema; Product/Service/OfferCatalog/LocalBusiness/BreadcrumbList on routes; FAQPage on home FAQ.

Sitemap22 entries; general/search robots allow, selected training bots disallow; Content-Signal header/robots policy and public llms.txt. Legacy category query permanent redirect and dealer alias rewrite. Admin metadata noindex; admin page disabled. Alternate frontend only basic root metadata.

## Source-known gaps

Allowed 3d-miniatures category and direct milestones route omitted from sitemap (occasion variant exists). Shared root canonical/WebPage schema inheritance needs rendered verification. sameAs empty; lastModified is generation time. Preserve intentional route restrictions when fixing sitemap. No Search Console, indexing, rich-result validation or Lighthouse check done.

Detailed source map: [audit section 6](PROJECT_TECH_DESIGN_AUDIT.md#6-seo-implementation). Sources: src/app/layout.tsx, sitemap.ts, page metadata, public/robots.txt, next.config.ts. No ranking guarantee implied.

## Implementation-state boundary

CURRENT / IMPLEMENTED: root/social metadata, dynamic category/occasion metadata, shared/page schema scripts, robots/sitemap and redirect/rewrite config. CURRENT / PARTIAL: category Product schema describes local catalogue, not necessarily Mongo inventory; shared-root canonical inheritance and active-route coverage require rendered checks. MISSING: proven sitemap coverage of all eligible active aliases/categories and validated production search-console evidence. UNKNOWN: live crawler/indexing behavior, canonical selection, rich-result eligibility and rankings. Gated product-detail ecommerce pages are not proven indexable product pages merely because source files exist.
