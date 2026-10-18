# Source page and route inventory

CURRENT / IMPLEMENTED: generated 2026-10-18 under DEC-001. [JSON details](route-inventory.json) include all entry points, imports, direct API strings, dynamic parameters and colocated loading/error/layout boundaries. This is source verification, not browser/deployment verification.

Every app uses its own src/app/layout.tsx and public/ asset owner. B2C uses StorefrontChrome and separate admin layout; original B2B uses ResponsiveShell; alternate retains its own design. Missing colocated boundaries inherit parent behavior. Dynamic URL parameters are untrusted strings; API IDs must be validated independently. Critical local tests and access/data mappings are in [FLOW.md](../../FLOW.md) sections 5–10.

| Application | URL pattern | Entry point | Local boundaries | Direct API references |
| --- | --- | --- | --- | --- |
| B2C | /account | B2C/src/app/account/page.tsx | loading.tsx | /auth/logout |
| B2C | /admin/[[...segments]] | B2C/src/app/admin/[[...segments]]/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| B2C | /b2c | B2C/src/app/b2c/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| B2C | /boxes | B2C/src/app/boxes/page.tsx | loading.tsx | component/import owned; see JSON and FLOW |
| B2C | /build | B2C/src/app/build/page.tsx | loading.tsx | component/import owned; see JSON and FLOW |
| B2C | /cart | B2C/src/app/cart/page.tsx | loading.tsx | component/import owned; see JSON and FLOW |
| B2C | /cart/store | B2C/src/app/cart/store/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| B2C | /checkout | B2C/src/app/checkout/page.tsx | loading.tsx | component/import owned; see JSON and FLOW |
| B2C | / | B2C/src/app/page.tsx | error.tsx, layout.tsx | component/import owned; see JSON and FLOW |
| B2C | /products/[slug] | B2C/src/app/products/[slug]/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| B2C | /shop/candles | B2C/src/app/shop/candles/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| B2C | /shop/envelopes | B2C/src/app/shop/envelopes/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| B2C | /shop/hampers | B2C/src/app/shop/hampers/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| B2C | /shop | B2C/src/app/shop/page.tsx | loading.tsx | component/import owned; see JSON and FLOW |
| B2C | /shop/stationery | B2C/src/app/shop/stationery/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| frontend_appview | /account | frontend_appview/src/app/account/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| frontend_appview | /cart | frontend_appview/src/app/cart/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| frontend_appview | /checkout | frontend_appview/src/app/checkout/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| frontend_appview | /collections/[category] | frontend_appview/src/app/collections/[category]/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| frontend_appview | /collections | frontend_appview/src/app/collections/page.tsx | layout.tsx | component/import owned; see JSON and FLOW |
| frontend_appview | /contact | frontend_appview/src/app/contact/page.tsx | layout.tsx | component/import owned; see JSON and FLOW |
| frontend_appview | /corporate | frontend_appview/src/app/corporate/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| frontend_appview | /customize | frontend_appview/src/app/customize/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| frontend_appview | /employee-gifting | frontend_appview/src/app/employee-gifting/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| frontend_appview | /gift-boxing/[type] | frontend_appview/src/app/gift-boxing/[type]/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| frontend_appview | /gift-boxing | frontend_appview/src/app/gift-boxing/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| frontend_appview | /gourmet-gifts/[slug] | frontend_appview/src/app/gourmet-gifts/[slug]/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| frontend_appview | /gourmet-gifts | frontend_appview/src/app/gourmet-gifts/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| frontend_appview | /gourmet | frontend_appview/src/app/gourmet/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| frontend_appview | /hampers | frontend_appview/src/app/hampers/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| frontend_appview | /house-of-satra | frontend_appview/src/app/house-of-satra/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| frontend_appview | /inquire | frontend_appview/src/app/inquire/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| frontend_appview | /milestones-recognition | frontend_appview/src/app/milestones-recognition/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| frontend_appview | /occasions/[slug] | frontend_appview/src/app/occasions/[slug]/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| frontend_appview | /occasions | frontend_appview/src/app/occasions/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| frontend_appview | /offline | frontend_appview/src/app/offline/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| frontend_appview | / | frontend_appview/src/app/page.tsx | layout.tsx | component/import owned; see JSON and FLOW |
| frontend_appview | /privacy | frontend_appview/src/app/privacy/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| frontend_appview | /story | frontend_appview/src/app/story/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| frontend_appview | /studio-admin | frontend_appview/src/app/studio-admin/page.tsx | layout.tsx | /api/admin/auth, /api/admin/data, /api/admin/auth, /api/admin/auth, /api/admin/export |
| frontend_appview | /test-layout | frontend_appview/src/app/test-layout/page.tsx | root/inherited | component/import owned; see JSON and FLOW |
| frontend_responsive | / | frontend_responsive/src/app/page.tsx | layout.tsx | component/import owned; see JSON and FLOW |

## Original B2B availability

frontend_appview/src/config/appRoutes.config.ts:isPageRouteActive uses a hardcoded whitelist; PAGE_ROUTES_CONFIG flags alone do not determine access. Account, cart, checkout and studio-admin pages remain disabled. Internal admin APIs still enforce their own shared-PIN cookie controls. A disabled page does not disable its API.
