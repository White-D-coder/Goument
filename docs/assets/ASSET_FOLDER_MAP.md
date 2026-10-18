# Asset folder map

CURRENT / IMPLEMENTED — inspected2026-10-18, DEC-001. Preserve independent application URL ownership. [Complete paths/references](asset-inventory.json).

| Owner | Current locations | Consumers / flow |
| --- | --- | --- |
| B2C | public/images/brand, items, hampers, envelopes, candles, patterns; public/fonts and other media paths in inventory | Home, collection/PDP/catalogue, gift builder/cart, shared header/footer and local typography |
| Main B2B | frontend_appview/public/images and public/fonts | Shared chrome, hero, local catalogue/occasions, enquiry UI and category photography |
| Alternate | frontend_responsive/public | Its independent homepage, illustrations and typography |
| Repository | Root media/source references outside app public trees | Original/reference assets; no automatic public URL in B2C |
| External | Catalogue URL strings and configured image providers | Runtime remote media; exact delivery/ownership not established by filesystem inventory |

FUTURE / OPTIONAL: organize new assets by owning page/feature when useful; shared assets stay shared. Do not force existing paths into a new hierarchy. Root references are not automatically served by Next. Duplicates across independently deployed public roots may be intentional; removing one is not safe deduplication. Runtime-generated/case-sensitive/external references need review before any rename.
