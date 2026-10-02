# API Contracts

## 2026-09-30 — Guest/signed-in gift cart continuity

CURRENT / IMPLEMENTED: existing GET/PUT /api/v1/auth/gift/draft and GET count remain available without an account session, authenticated by the independent opaque browser gift cookie. Login/register/logout/Google callback do not replace it; no API payload/schema changes or customer merge introduced. /auth/* frontend requests include cookies without requiring legacy localStorage/X-Session-Id; non-auth legacy endpoints retain their existing session header. Unclassified gift-route dependency failures keep HTTP503 but now return a cart-specific message, without DB/credential details. Login and payment error contracts retain their respective messages. The already-running5003 process has not been restarted while Atlas is unreachable; new error wording is source/test verified pending a healthy service restart.

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Scope and common behavior

Express base `/api/v1`; health also mounted at root. JSON requests; credentials via accessToken cookie/Bearer; guest cart uses X-Session-Id. Admin means DB role gate except separate Next cookie auth. Standard successful entity responses generally `{success:true,data:...}`; auth returns message/cookies, orders POST returns orderId/clientSecret. Validation/auth/ownership errors typically400/401/403; missing entities404; idempotency processing409; dependency/server errors500; health503. Consult controller for exact shape before changing a consumer.

## Express endpoint inventory

Middleware chain identifies validation and auth; exact request constraints below. Global auth applies as listed. No OpenAPI-generated schema or live contract test was performed.

| Method | Endpoint | Access | Validation / handler chain | Source |
| --- | --- | --- | --- | --- |
| GET | /api/v1/admin/stats | admin | adminController.getAdminStats | backend/src/features/admin/admin.routes.js |
| GET | /api/v1/admin/orders | admin | adminController.getAdminOrders | backend/src/features/admin/admin.routes.js |
| POST | /api/v1/auth/register | public | registerValidation, validate, authController.register | backend/src/features/auth/auth.routes.js |
| POST | /api/v1/auth/login | public | loginValidation, validate, authController.login | backend/src/features/auth/auth.routes.js |
| POST | /api/v1/auth/refresh-token | public | authController.refreshToken | backend/src/features/auth/auth.routes.js |
| POST | /api/v1/auth/logout | public | authController.logout | backend/src/features/auth/auth.routes.js |
| GET | /api/v1/auth/me | authenticated | auth(), authController.getMe | backend/src/features/auth/auth.routes.js |
| GET | /api/v1/cart | optional user / guest session | cartController.getCart | backend/src/features/cart/cart.routes.js |
| POST | /api/v1/cart/items | optional user / guest session | addItemValidation, validate, cartController.addItem | backend/src/features/cart/cart.routes.js |
| PATCH | /api/v1/cart/items/:itemId | optional user / guest session | updateItemValidation, validate, cartController.updateItem | backend/src/features/cart/cart.routes.js |
| DELETE | /api/v1/cart/items/:itemId | optional user / guest session | cartController.deleteItem | backend/src/features/cart/cart.routes.js |
| DELETE | /api/v1/cart | optional user / guest session | cartController.clearCart | backend/src/features/cart/cart.routes.js |
| POST | /api/v1/cart/sync | optional user / guest session | syncCartValidation, validate, cartController.syncCart | backend/src/features/cart/cart.routes.js |
| GET | /api/v1/categories | public | categoryController.getCategoryTree | backend/src/features/category/category.routes.js |
| GET | /api/v1/categories/:slug | public | categoryController.getCategoryBySlug | backend/src/features/category/category.routes.js |
| POST | /api/v1/categories | admin | auth('admin'), createCategoryValidation, validate, categoryController.createCategory | backend/src/features/category/category.routes.js |
| PUT | /api/v1/categories/:id | admin | auth('admin'), updateCategoryValidation, validate, categoryController.updateCategory | backend/src/features/category/category.routes.js |
| GET | /api/v1/coupons/validate | optional user / guest session | optionalAuth, couponController.validateCouponCode | backend/src/features/coupon/coupon.routes.js |
| POST | /api/v1/coupons | admin | auth('admin'), createCouponValidation, validate, couponController.createCoupon | backend/src/features/coupon/coupon.routes.js |
| GET | /api/v1/coupons | admin | auth('admin'), couponController.getCoupons | backend/src/features/coupon/coupon.routes.js |
| GET | /api/v1/gift-boxing | public | giftboxingController.getGiftBoxingTypes | backend/src/features/giftBoxing/giftBoxing.routes.js |
| GET | /api/v1/gift-boxing/:type/products | public | giftboxingController.getProductsByBoxType | backend/src/features/giftBoxing/giftBoxing.routes.js |
| GET | /healthz AND /api/v1/healthz | public | checkHealth | backend/src/features/health/health.routes.js |
| POST | /api/v1/orders/webhook | Stripe signature (raw body) | express.raw({ type: 'application/json' }), orderController.handleStripeWebhook | backend/src/features/order/order.routes.js |
| POST | /api/v1/orders | authenticated | idempotency, placeOrderValidation, validate, orderController.placeOrder | backend/src/features/order/order.routes.js |
| GET | /api/v1/orders | authenticated | orderController.getOrders | backend/src/features/order/order.routes.js |
| GET | /api/v1/orders/:id | authenticated | orderController.getOrderById | backend/src/features/order/order.routes.js |
| GET | /api/v1/products | public | productController.getProducts | backend/src/features/product/product.routes.js |
| GET | /api/v1/products/search/suggestions | public | productController.getSuggestions | backend/src/features/product/product.routes.js |
| GET | /api/v1/products/:slug | public | productController.getProductBySlug | backend/src/features/product/product.routes.js |
| POST | /api/v1/products | admin | auth('admin'), createProductValidation, validate, productController.createProduct | backend/src/features/product/product.routes.js |
| PUT | /api/v1/products/:id | admin | auth('admin'), updateProductValidation, validate, productController.updateProduct | backend/src/features/product/product.routes.js |
| DELETE | /api/v1/products/:id | admin | auth('admin'), productController.deleteProduct | backend/src/features/product/product.routes.js |
| PATCH | /api/v1/products/:id/images | admin | auth('admin'), productController.updateProductImages | backend/src/features/product/product.routes.js |
| GET | /api/v1/reviews/:productId | public | reviewController.getReviews | backend/src/features/review/review.routes.js |
| POST | /api/v1/reviews | authenticated | auth(), createReviewValidation, validate, reviewController.createReview | backend/src/features/review/review.routes.js |
| PATCH | /api/v1/reviews/:id/approve | admin | auth('admin'), reviewController.approveReview | backend/src/features/review/review.routes.js |
| POST | /api/v1/upload/sign | admin | auth('admin'), body('folder').trim().notEmpty().withMessage('Folder destination is required.'), validate, uploadController.signUpload | backend/src/features/upload/upload.routes.js |
| GET | /api/v1/users/profile | authenticated | userController.getProfile | backend/src/features/user/user.routes.js |
| POST | /api/v1/users/addresses | authenticated | addressValidation, validate, userController.addAddress | backend/src/features/user/user.routes.js |
| PUT | /api/v1/users/addresses/:addressId | authenticated | addressValidation, validate, userController.updateAddress | backend/src/features/user/user.routes.js |
| DELETE | /api/v1/users/addresses/:addressId | authenticated | userController.deleteAddress | backend/src/features/user/user.routes.js |

## Core payload/output contracts and side effects

| Domain | Input | Output / side effects |
| --- | --- | --- |
| Auth register/login | email/password; register name, optional phone |201/200 success+message, secure cookies; registration always assigns customer; client role ignored (S01 fixed locally) |
| Auth refresh/logout | refresh cookie or body.refreshToken |Rotates/revokes token hashes and sets/clears cookies; refresh absent400 |
| Auth me / profile | current credentials |me uses user:{id,email,name,role,phone,addresses}; profile uses data excluding secret fields |
| Addresses | fullName,line1,city,state,postalCode,country,phone; label/line2 optional |Mutates embedded user addresses; returns address list |
| Products | listing search/category/giftBoxing/minPrice/maxPrice/tags/sort/page/limit; suggestions q; admin model fields |products,total,page,pages listing; single data; delete sets isActive=false |
| Categories | type filter; slug route giftBoxing/page/limit; admin model fields |Tree or category/product listing; DB writes on admin create/update |
| Cart | productId, optional variantSku, quantity, optional giftBoxing; sync items,force or forceClient |data:{items}; Redis TTL reset; clear returns message; stock revalidation |
| Order create | shippingAddress,billingAddress; optional couponCode,recipient,requestedDeliveryDate,notes,shippingCost; Idempotency-Key header |200 {success,orderId,clientSecret}; DB stock/order, Stripe intent, Redis clear and queue job |
| Order reads | page/limit or id; current user |list {success,orders,total,page,pages}; detail {success,data}; owner/admin restriction |
| Gift boxing | type listing or :type/products |Static boxing descriptors / active filtered products; public GET |
| Coupon validate | query.code plus user/session cart |discount validation result; checkout separately increments usedCount on paid webhook |
| Reviews | productId,rating,title?,body?; read productId,page,limit |Create pending approval; admin approve updates flag; public approved listing |
| Upload sign | folder |Signed Cloudinary parameters with gourmet-gem folder prefix; no file uploaded by this endpoint |
| Admin stats/orders | credentials; status,page,limit for orders |Aggregates or populated order list; no finance reconciliation |
| Health | none |success,uptime,timestamp,services.mongodb/redis;200 or503 |

### Order request shape (illustrative types, not real customer data)

```ts
{
 shippingAddress: { fullName: string, line1: string, city: string, state: string, postalCode: string, country: string, phone: string },
 billingAddress: { fullName: string, line1: string, city: string, state: string, postalCode: string, country: string, phone: string },
 couponCode?: string, recipient?: {name?: string, phone?: string, email?: string},
 requestedDeliveryDate?: string, notes?: string, shippingCost?: number
}
```

Current shippingCost handling is a finding, not permission to trust client pricing. Explicit validator snapshots below identify what is actually checked.

## Next internal APIs (main app origin)

| Endpoint | Method/access | Input/validation | Response / effects |
| --- | --- | --- | --- |
| /api/send-inquiry |POST public |name/email truthiness required; company,phone,city,occasion,quantity,targetDate,message,boxItem,productItems,source |success;400 missing;500 failure; vault record then SMTP; no SMTP also success |
| /api/telemetry/collect |POST public |type,pagePath,sessionId,activeSection,dwellTimeSec,deviceType,browser,os,referrer; strings truncated, dwell1–600 |200 {ok:true/false}; encrypted telemetry record; errors masked |
| /api/geo/detect |GET/POST public |GET IP headers; POST lat,lon,sessionId |success,city,state,country,fullLocation,isGps; optional session location mutation; default Mumbai possible |
| /api/admin/auth |GET public status;POST PIN action |action login/logout; pin; IP limiter |authenticated boolean or success/error; login sets cookie, logout clears; invalid input400/401/429 paths |
| /api/admin/data |GET admin cookie |verifyAdminRequest |success and aggregated vault analytics;401 unauthorized/500 error |
| /api/admin/export |GET admin cookie |verifyAdminRequest |Excel workbook binary;401 unauthorized/500 error |

No page whitelist protection is a substitute for these endpoint checks. Existing frontend consumers: src/shared/api/endpoints.ts, cart/query hooks, inquiry components, portal page. Provider/webhook callers and backend tests are also consumers.

## Validation contract source snapshots

These complete validator modules preserve array names and custom validator bodies. Source snapshots are not standalone endpoint implementations; controllers/services can consume additional unvalidated fields. User address and upload validation live in route files. Never assume unknown-field stripping.

### auth

Source: `backend/src/features/auth/auth.validation.js`.

```js
const { body } = require('express-validator');

const registerValidation = [
  body('email').isEmail().withMessage('Please enter a valid email address.').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('phone').optional().trim().notEmpty().withMessage('Phone cannot be empty.')
];

const loginValidation = [
  body('email').isEmail().withMessage('Please enter a valid email address.').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required.')
];

module.exports = {
  registerValidation,
  loginValidation
};
```

### cart

Source: `backend/src/features/cart/cart.validation.js`.

```js
const { body, param } = require('express-validator');

const addItemValidation = [
  body('productId').isMongoId().withMessage('Invalid product ID.'),
  body('variantSku').optional().trim().notEmpty().withMessage('Variant SKU must be a non-empty string.'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1.'),
  body('giftBoxing').optional().isObject().withMessage('giftBoxing must be an object.'),
  body('giftBoxing.type').optional().isIn(['classics', 'royale-tin', 'premium-velvet']).withMessage('Invalid gift box type.'),
  body('giftBoxing.surcharge').optional().isInt({ min: 0 }).withMessage('Surcharge must be non-negative.')
];

const updateItemValidation = [
  param('itemId').trim().notEmpty().withMessage('Item ID parameter (productId or variantSku) is required.'),
  body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1.'),
  body('giftBoxing').optional().isObject().withMessage('giftBoxing must be an object.'),
  body('giftBoxing.type').optional().isIn(['classics', 'royale-tin', 'premium-velvet']).withMessage('Invalid gift box type.'),
  body('giftBoxing.surcharge').optional().isInt({ min: 0 }).withMessage('Surcharge must be non-negative.')
];

const syncCartValidation = [
  body('items').isArray().withMessage('Items must be a valid array.'),
  body('items.*.productId').isMongoId().withMessage('Invalid product ID in items list.'),
  body('items.*.variantSku').optional().trim().notEmpty().withMessage('Variant SKU cannot be empty.'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1 in items list.'),
  body('force').optional().isBoolean().withMessage('Force parameter must be a boolean.')
];

module.exports = {
  addItemValidation,
  updateItemValidation,
  syncCartValidation
};
```

### category

Source: `backend/src/features/category/category.validation.js`.

```js
const { body } = require('express-validator');

const createCategoryValidation = [
  body('name').trim().notEmpty().withMessage('Category name is required.'),
  body('type').optional().isIn(['product_category', 'gift_box_section']).withMessage('Invalid category type.'),
  body('parent').optional().isMongoId().withMessage('Parent ID must be a valid Mongo ObjectId.'),
  body('order').optional().isInt({ min: 0 }).withMessage('Order must be a non-negative integer.'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean value.')
];

const updateCategoryValidation = [
  body('name').optional().trim().notEmpty().withMessage('Category name cannot be empty.'),
  body('type').optional().isIn(['product_category', 'gift_box_section']).withMessage('Invalid category type.'),
  body('parent').optional().isMongoId().withMessage('Parent ID must be a valid Mongo ObjectId.'),
  body('order').optional().isInt({ min: 0 }).withMessage('Order must be a non-negative integer.'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean value.')
];

module.exports = {
  createCategoryValidation,
  updateCategoryValidation
};
```

### coupon

Source: `backend/src/features/coupon/coupon.validation.js`.

```js
const { body } = require('express-validator');

const createCouponValidation = [
  body('code').trim().notEmpty().withMessage('Coupon code is required.'),
  body('type').isIn(['percentage', 'fixed']).withMessage('Type must be either "percentage" or "fixed".'),
  body('value').isInt({ min: 1 }).withMessage('Value must be a positive integer.'),
  body('minPurchase').optional().isInt({ min: 0 }).withMessage('minPurchase must be a non-negative integer representing paise.'),
  body('validFrom').optional().isISO8601().toDate().withMessage('validFrom must be a valid date format.'),
  body('validUntil').isISO8601().toDate().withMessage('validUntil must be a valid date format.'),
  body('maxUses').optional().isInt({ min: 0 }).withMessage('maxUses must be a non-negative integer.'),
  body('applicableProducts').optional().isArray().withMessage('applicableProducts must be a valid array.'),
  body('applicableCategories').optional().isArray().withMessage('applicableCategories must be a valid array.')
];

module.exports = {
  createCouponValidation
};
```

### order

Source: `backend/src/features/order/order.validation.js`.

```js
const { body } = require('express-validator');

const placeOrderValidation = [
  body('shippingAddress').isObject().withMessage('Shipping address is required.'),
  body('shippingAddress.fullName').trim().notEmpty().withMessage('Shipping full name is required.'),
  body('shippingAddress.line1').trim().notEmpty().withMessage('Shipping line 1 is required.'),
  body('shippingAddress.city').trim().notEmpty().withMessage('Shipping city is required.'),
  body('shippingAddress.state').trim().notEmpty().withMessage('Shipping state is required.'),
  body('shippingAddress.postalCode').trim().notEmpty().withMessage('Shipping postal code is required.'),
  body('shippingAddress.country').trim().notEmpty().withMessage('Shipping country is required.'),
  body('shippingAddress.phone').trim().notEmpty().withMessage('Shipping phone number is required.'),

  body('billingAddress').isObject().withMessage('Billing address is required.'),
  body('billingAddress.fullName').trim().notEmpty().withMessage('Billing full name is required.'),
  body('billingAddress.line1').trim().notEmpty().withMessage('Billing line 1 is required.'),
  body('billingAddress.city').trim().notEmpty().withMessage('Billing city is required.'),
  body('billingAddress.state').trim().notEmpty().withMessage('Billing state is required.'),
  body('billingAddress.postalCode').trim().notEmpty().withMessage('Billing postal code is required.'),
  body('billingAddress.country').trim().notEmpty().withMessage('Billing country is required.'),
  body('billingAddress.phone').trim().notEmpty().withMessage('Billing phone number is required.'),

  body('couponCode').optional().trim().notEmpty().withMessage('Coupon code cannot be empty.'),
  body('recipient').optional().isObject().withMessage('Recipient details must be an object.'),
  body('recipient.name').optional().trim().notEmpty().withMessage('Recipient name cannot be empty.'),
  body('recipient.phone').optional().trim().notEmpty().withMessage('Recipient phone cannot be empty.'),
  body('recipient.email').optional().isEmail().withMessage('Recipient email must be a valid email address.'),
  body('requestedDeliveryDate').optional().isISO8601().toDate().withMessage('Requested delivery date must be a valid ISO8601 date format.')
];

module.exports = {
  placeOrderValidation
};
```

### product

Source: `backend/src/features/product/product.validation.js`.

```js
const { body } = require('express-validator');

const createProductValidation = [
  body('name').trim().notEmpty().withMessage('Product name is required.'),
  body('description.short').trim().notEmpty().withMessage('Short description is required.'),
  body('basePrice').isInt({ min: 1 }).withMessage('Base price must be a positive integer representing paise.'),
  body('sku').optional().trim().notEmpty().withMessage('SKU must be a non-empty string.'),
  body('inventory').optional().isInt({ min: 0 }).withMessage('Inventory must be a non-negative integer.'),
  body('categories').isArray({ min: 1 }).withMessage('At least one category ID is required.').custom((val) => {
    return val.every((id) => /^[0-9a-fA-F]{24}$/.test(id));
  }).withMessage('Each category must be a valid Mongo ObjectId.')
];

const updateProductValidation = [
  body('name').optional().trim().notEmpty().withMessage('Product name cannot be empty.'),
  body('description.short').optional().trim().notEmpty().withMessage('Short description cannot be empty.'),
  body('basePrice').optional().isInt({ min: 1 }).withMessage('Base price must be a positive integer representing paise.'),
  body('sku').optional().trim().notEmpty().withMessage('SKU must be a non-empty string.'),
  body('inventory').optional().isInt({ min: 0 }).withMessage('Inventory must be a non-negative integer.'),
  body('categories').optional().isArray().withMessage('Categories must be an array of ObjectIds.')
];

module.exports = {
  createProductValidation,
  updateProductValidation
};
```

### review

Source: `backend/src/features/review/review.validation.js`.

```js
const { body } = require('express-validator');

const createReviewValidation = [
  body('productId').isMongoId().withMessage('Invalid product ID.'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5.'),
  body('title').optional().trim().isLength({ max: 200 }).withMessage('Title must be at most 200 characters long.'),
  body('body').optional().trim().isLength({ max: 2000 }).withMessage('Body must be at most 2000 characters long.')
];

module.exports = {
  createReviewValidation
};
```

### Address and upload route-local validation

User address POST/PUT require nonempty fullName,line1,city,state,postalCode,country,phone. They do not validate addressId with isMongoId at router level; service resolves embedded ID. Upload POST requires nonempty folder; controller prefixes gourmet-gem/. User profile/address routes require auth(); upload requires auth(admin). See backend/src/features/user/user.routes.js and backend/src/features/upload/upload.routes.js.

## Error envelope contract

Validation middleware:400 `{success:false,errors:[{field,message}]}`. Auth/ownership/APIError responses generally use `{success:false,message}`. Unhandled duplicate/cast/model errors are not globally mapped to400/409; global handler defaults500 and masks non-operational messages in production; development may include stack. Rate limit429; idempotency processing409. Invalid Stripe signature400 is text, not JSON. Next uses `{success:false,error}` for many failures; telemetry intentionally200 `{ok:false}`. Do not unify these silently.

## Consumer incompatibilities — CURRENT / BROKEN

Frontend addToCartAPI takes variantId/giftBoxingType; backend needs variantSku/giftBoxing:{type,surcharge}. Local descriptive product IDs fail MongoId validation. Axios sets credentials but no guest-session header; telemetry sessionStorage identifier is unrelated. Local removals don't issue backend mutations. syncWithServer expects display fields absent in raw Redis cart. Client getProducts fallback returns data:[] while successful backend list uses products at top-level. Checkout ignores clientSecret and account expects user object absent in login response; both gated pages fabricate success on catch.

Do not infer that implemented endpoints have a working consumer. Sources: frontend_appview/src/shared/api/endpoints.ts, src/hooks/useCart.ts, app/account/page.tsx, app/checkout/page.tsx; backend cart/auth/order controllers.

## Endpoint response and persistence map

Join each method/path below to the access and validator chain in the inventory above. Paths omit `/api/v1`. All JSON successes include `success:true`; response column lists remaining fields. Entity fields/types/indexes are in [DATA_MODELS.md](DATA_MODELS.md). No body for GET/DELETE unless explicitly stated. Shared errors above apply to every row; row errors are additional domain failures, not an exhaustive list of dependency exceptions. Source owners are each feature's `*.controller.js` and `*.service.js` under `backend/src/features` (health and upload implement directly).

| Method/path | Request beyond credentials | Success status/body | Storage / external effects and domain errors |
| --- | --- | --- | --- |
| GET /admin/stats | None |200 data:{totalOrders,completedOrders,revenue,activeCarts,topProducts} |Mongo Order aggregation/Product lookup; Redis KEYS counts; read only |
| GET /admin/orders |status,page,limit query |200 data:Order[],total,page,pages |Mongo orders with user name/email populated; read only |
| POST /auth/register |name,email,password,phone?; role ignored |201 message; cookies |Creates User, password/token hashes; duplicate registration rejected; server assigns customer regardless of request role |
| POST /auth/login |email,password |200 message; cookies |Reads User/password, stores refresh hash; bad credentials401 |
| POST /auth/refresh-token |refresh cookie or body.refreshToken |200 message; rotated cookies |User token rotation/reuse handling; absent400, invalid401 |
| POST /auth/logout |refresh cookie or body.refreshToken |200 message; cleared cookies |Revokes matching refresh hash when supplied; no cart merge |
| GET /auth/me |None |200 user:{id,email,name,role,phone,addresses} |Current User projection; no write |
| GET /cart |user or guest session |200 data:cart |Redis read; absent cart yields empty items |
| POST /cart/items |productId,quantity,variantSku?,giftBoxing? |200 data:cart |Product availability/stock read, Redis write+TTL; missing/inactive product or variant404, out-of-stock400 |
| PATCH /cart/items/:itemId |quantity, giftBoxing? |200 data:cart |Product revalidation and Redis write+TTL; missing item404 |
| DELETE /cart/items/:itemId |itemId path |200 data:cart |Filters Redis items, persists cart; no stock reservation |
| DELETE /cart |None |200 message |Redis key deletion |
| POST /cart/sync |items plus force/forceClient |200 data:cart |Merges/replaces and validates against Mongo; Redis write+TTL; no payment |
| GET /categories |type query |200 data:category tree |Mongo Category hierarchy read |
| GET /categories/:slug |giftBoxing,page,limit query |200 data:{category,products,total,page,pages} |Category/Product reads; unknown slug404 |
| POST /categories |Category fields, validator above |201 data:Category |Mongo insert; schema/unique failures use common handler |
| PUT /categories/:id |Category updates |200 data:Category |Mongo update; missing404 |
| GET /coupons/validate |code query and cart identity |200 data:{code,type,value,discountAmount,minPurchase} |Redis cart+Product+Coupon read; missing code/context/empty cart400; invalid/expired/restricted coupon rejected; no usage increment |
| POST /coupons |Coupon fields, validator above |201 data:Coupon |Mongo insert |
| GET /coupons |None |200 data:Coupon[] |Mongo read, no pagination |
| GET /gift-boxing |None |200 data:boxing descriptors |Static source list; no DB write |
| GET /gift-boxing/:type/products |type path |200 data:Product[] |Mongo active product filter; invalid type400; no pagination |
| GET /healthz (also root) |None |200 or503 success,uptime,timestamp,services |Mongo state/Redis ping; success false for unhealthy; no entity mutation |
| POST /orders/webhook |raw Stripe body, stripe-signature |200 received:true |Stripe SDK signature verification; Order/Product/Coupon updates, queue removal, Socket.IO notification depending on event; invalid signature400 text; see payment transition matrix |
| POST /orders |address/order shape above, Idempotency-Key |200 orderId,clientSecret |Redis cart+idempotency; Mongo order/stock transaction; Stripe tax/intent; cart clear; delayed BullMQ job; empty/unavailable400 and processing409 |
| GET /orders |page,limit query |200 orders:Order[],total,page,pages |Current user's Mongo orders |
| GET /orders/:id |id path |200 data:Order |Mongo detail; missing404, other user's order403 unless admin |
| GET /products |filters listed above |200 products:Product[],total,page,pages |Mongo filtered/sorted/paginated reads |
| GET /products/search/suggestions |q query |200 data:suggestions |Mongo projected search suggestions; no write |
| GET /products/:slug |slug path |200 data:Product |Mongo product read; missing404 |
| POST /products |Product fields, validator above |201 data:Product |Mongo insert |
| PUT /products/:id |Product updates |200 data:Product |Mongo update; missing404; stock changes here have no movement ledger |
| DELETE /products/:id |id path |200 message |Mongo isActive=false, no physical deletion/cascade; missing404 |
| PATCH /products/:id/images |images array |200 data:Product |Mongo images replacement; no dedicated router validator; no Cloudinary upload/deletion |
| GET /reviews/:productId |page,limit query |200 reviews,total,page,pages |Mongo approved reviews, user name populated |
| POST /reviews |productId,rating,title?,body? |201 data:Review |Mongo unapproved review; duplicate user/product400; referenced Product existence not checked by service |
| PATCH /reviews/:id/approve |id path |200 data:Review |Mongo approval flag; missing404 |
| POST /upload/sign |folder |200 data:{signature,timestamp,apiKey,cloudName,folder} |Cloudinary SDK local signing using secret; gourmet-gem prefix; no upload/network call or Mongo write; missing folder400 |
| GET /users/profile |None |200 data:User without password/refresh hashes |Mongo User read |
| POST /users/addresses |address fields above |200 data:addresses[] |Mongo embedded address creation |
| PUT /users/addresses/:addressId |address fields above |200 data:addresses[] |Mongo embedded address update; missing404; old order address snapshots unchanged |
| DELETE /users/addresses/:addressId |addressId path |200 data:addresses[] |Mongo embedded address deletion; missing404; no historical order cascade |

There are42 Express router declarations in the inventory and42 rows here. Health mounts at two distinct paths, yielding43 distinct method/path combinations. Webhook's early raw-body mount in app.js is the same URL, not another public API. Next's six route files expose eight methods (geo and admin auth each expose two); their contracts/effects are separately listed above. Missing future invoice/refund/customer-history APIs are NOT implemented endpoints.

## B2C fork — 2026-09-27

The inventory above describes original backend/. B2C/backend preserves those endpoints but GET /cart enriches each item with current name, slug, variantName, unitPrice (paise or null), currency and available, using one Mongo query. Cost fields are not returned; missing products remain removable. POST/PATCH/DELETE responses retain raw cart format; B2C cart reloads GET after mutations. Unit prices are display information, not an approved checkout quote. B2C sends X-Session-Id for guest cart and reads products from top-level products. Its account verifies /auth/me after login/signup and loads paginated /orders. No fake authentication/order success. Original applications are not changed by these B2C-specific contracts.

## New database module is not an HTTP API — 2026-09-28

No routes/request/response contracts changed. B2C/backend/database exposes trusted internal registration/address/order/payment-attempt/stock/capture/refund/coupon/invoice operations plus customer360 and ownerDashboard queries. It uses dedicated B2C_DATABASE_* configuration; old controllers still use legacy contracts. HTTP integration is FUTURE / REQUIRED and must add authentication/ownership checks, provider signature validation, server-side price calculation, error mapping and reconciliation. Internal model access is not a substitute for authorization. Frontend checkout remains unavailable.

## 2026-09-29 — Google auth and Atlas integration

B2C auth-specific rewrite routes /api/v1/auth/* to AUTH_BACKEND_URL (localhost5003 default), before the legacy backend fallback. GET /auth/config returns googleEnabled; GET /auth/google starts redirect flow; GET /auth/google/callback consumes provider response and redirects to /account with a bounded error code on failure. POST register {name,email,password}, login {email,password}, logout require exact AUTH_ORIGIN and use HttpOnly cookie. GET me returns {user:{id,customerId,email,name,role}} only after database session/customer validation. GET /auth/orders?after=cursor returns {orders,next}, at most10, scoped by authenticated customer, ignoring caller customer IDs. No Google/DB secrets enter responses. Legacy cart/payment routes do not accept the new auth cookie; these integrations and old-account migration remain pending.

## Box-first gifting — 2026-09-30

CURRENT / IMPLEMENTED: Under /api/v1/auth/gift (same existing5003 rewrite): GET /catalogue returns public boxes and draft items, with no capacity; GET /draft creates an opaque HttpOnly b2c_gift session cookie when absent and returns {revision,boxes,items,packing,mode:DRAFT,checkoutAvailable:false}; GET /count reads count without creating cookie; PUT /draft accepts exactly {revision,boxes:[{id,quantity}],items:[{id,quantity}]}. Owner comes only from cookie, never body/header. Unknown IDs/fields, duplicate IDs, quantities outside integer1..99 and >8 box types/>100 item types reject400. Empty arrays remove rows. Concurrent/stale writes409; client reloads latest and asks retry. Revision0 means no persisted draft; stored revision is __v+1. POST /checkout-check reloads server draft, rejects409 unless packing READY; otherwise200 with checkoutAvailable:false. No raw ownerHash/capacity/doc fields returned. Existing exact-Origin protection and60/IP/min limiter apply. Errors never fake save success.

## Razorpay — 2026-09-30

GET /api/v1/auth/payments/config exposes configured and draftCheckoutAvailable:false. GET /orders/:id under that prefix enforces ownership. POST /razorpay/order accepts only orderId and returns public Checkout options using stored total/reserved stock. POST /razorpay/verify accepts orderId plus three Razorpay callback fields, verifies HMAC then fetches captured status. POST /razorpay/webhook accepts raw JSON max256kb plus signature before Origin middleware; unknown/ineligible captures503 for provider retry, noncapture events acknowledged without order mutation. No provider secret returned.

## 2026-09-30 — Sign-in and delivery checkout

CURRENT / IMPLEMENTED: primary gift cart now requires authenticated checkout; anonymous checkout-check returns401 and UI routes to /account?next=/checkout. Email signup/login and state-bound Google login return to an allowlisted checkout URL. Guest selection cookie survives login; no automatic customer/cart merge or cross-device claim introduced. Direct checkout and existing-order payment401 responses redirect to sign-in.

Authenticated GET /api/v1/auth/gift/checkout returns the browser selection and only the signed-in customer's saved addresses (up to20, newest first), rejecting invalid packing. POST /api/v1/auth/gift/address validates recipient, international phone, street, city/state, postal/country; Indian PIN format is six digits. Uses existing CustomerAddress repository, verifies ownership on edits, rejects caller customerId and unknown fields. Address is saved explicitly to the account; optional empty lines are unset. No identity phone verification, default-address change, customer merge or order snapshot mutation. UI has responsive delivery form, saved-address selection, edit/review and selection summary.

CURRENT / PARTIAL: supersedes the old cart's blanket draft-check message with a real sign-in/address/review journey. Review explains the remaining price/stock/quote blocker; saving an address does not place an order. Gift catalogue-to-saleable-variant mapping, approved box prices/tax/shipping calculation and order/reservation bridge are still required. No fabricated free delivery, tax or payment success.

## 2026-09-30 — Additional gift-draft UI consumers

CURRENT / IMPLEMENTED: Home/Shop ProductCard and gift-item BuyPanel now consume existing GET/PUT /api/v1/auth/gift/draft. HTTP/schema contract unchanged. Explicit preview giftItemId is matched to the59 backend catalogue IDs. Shared client queue reads current revision/boxes/items, increments one item and writes the full preserved selection. Only explicit409 retries once; ambiguous writes never auto-retry. Confirmed writes emit b2c-cart-change. This does not map preview IDs to saleable ProductVariants or merge the legacy /cart/items API with GiftDraft.

## 2026-10-01 — Owner operations HTTP contract

CURRENT / IMPLEMENTED in B2C source and isolated replica-set/API tests. These routes use the existing5003 auth service and cookie rewrite, not the legacy5002 JWT API. Base: `/api/v1/auth/admin`. Every route validates the current active User/session and OWNER or explicitly permitted ADMIN. Public registration cannot grant staff access. GET responses are `no-store`; mutating requests require the exact configured Origin. No client role/header/localStorage value grants authority.

| Route | Permission / result |
| --- | --- |
| GET /session | Staff authentication; `{user:{id,email,role},permissions,capabilities,reporting}`. Reporting is null until configured. No session secret. |
| GET /dashboard, /analytics | dashboard.read / analytics.read; required from/to ISO instants, currency and IANA timezone; interval <=93days. Real metrics, formulas, current attention records and unavailable capabilities. These grants authorize aggregates across domains; detailed links still require each domain's read permission. |
| GET /:resource | Domain read permission; `{items,next}` with projected DTOs. Resources: orders, customers, products, categories, variants, inventory, payments, refunds, invoices, coupons, shipping, notifications, audit-logs. |
| GET /:resource/:id | Domain read permission; `{item,related}` with fixed safe fields and permission-filtered related previews. Successful private investigation records ADMIN_RESOURCE_VIEWED, with authoritative customer association where available. |
| GET /:resource/:id/related/:section | Parent and related-domain permissions; seek pagination. Order→payments/refunds/invoices/shipping/notifications/audit; customer→orders/payments/refunds/invoices/shipping/notifications/addresses/coupon-usage/audit; product→variants/audit; payment→refunds/audit; inventory→movements/audit. |
| POST /categories, /products, /variants | products.create; strict per-resource content fields. Variant creation also creates zero inventory atomically. |
| PATCH /products/:id, /variants/:id | products.update; expectedVersion plus allowlisted fields. Product/variant identity, prior order/invoice snapshots and stock are not mutable through content editing. |
| POST /inventory/:id/adjust | inventory.adjust; Inventory ID, expectedVersion, signed nonzero integer quantity and reason. Transactional ledger movement; reservations protected. |
| POST /orders/:id/process | orders.update; expectedVersion; only CONFIRMED + PAID + UNFULFILLED can enter PROCESSING. No general status setter. |
| POST /coupons; PATCH /coupons/:id | coupons.create / coupons.update; allowlisted offer fields; PATCH expectedVersion. Usage counters are never client writable. |
| GET /settings; PATCH /settings | OWNER settings.read/update; timezone and currency only. PATCH expectedVersion (0 for missing settings). No provider credentials or assumed tax/refund defaults. |
| GET /staff; GET /staff/:id; PATCH /staff/:id | OWNER admin_users.read/manage. Existing User directory supports email-prefix lookup; no new identity registration endpoint. PATCH expectedVersion, explicit permissions, optional makeAdmin/active and reason. Cannot change OWNER targets; access changes revoke target sessions. |

Common resource query: limit1..50 (default20), after bounded opaque cursor, sort=newest/oldest, bounded escaped prefix search, supported enum status and ISO from/to where applicable. Orders additionally support paymentStatus, fulfillmentStatus, customerId, currency and nonnegative integer minAmount/maxAmount (amount filtering requires currency). Variants accept productId. Unknown/repeated/malformed filters fail422 rather than broadening access. Customer addresses/coupon usage and inventory movements accept only limit/after/sort. Staff has its own bounded directory contract (limit<=100; after/search/status). Lists never download complete collections.

All mutation routes require an 8–100-character `Idempotency-Key`. A successful command returns `{resource,id,version}`. Same actor/key/action/payload replays that compact receipt after current authorization; changed payload returns409. Authentication, actor lock, validation, effects, receipt and audit share a MongoDB transaction. Failed audits roll back the business write. A lost response must be retried with the same key; the UI preserves it for unchanged form retries, but a page reload loses that in-memory key and requires investigation before repeating.

Errors:401 unauthenticated,403 denied,404 missing,409 conflict/stale version/key reuse,422 invalid command/query,429 rate limit,503 unavailable dependency. Malformed/oversized JSON returns400/413. Admin handlers attach request IDs; early parser/origin errors follow existing safe auth conventions. No raw documents, credentials, request hashes or private invoice document URLs are exposed. Refund reads include server-calculated paid/completed/reserved/available amounts; no refund execution endpoint is enabled. No unrestricted mark-paid, cancellation, invoice-download/generation, carrier dispatch or notification retry routes exist yet.

CURRENT / PARTIAL: these are operations catalogue records; storefront's preview/gift catalogue is not automatically published from them. Complete gift→saleable variant quoting/reservation, provider refund approval/reconciliation, legal invoices/private storage and delivery workers remain FUTURE / REQUIRED. Configured Atlas connectivity failed the read-only check; no live schema installation or provider operation is claimed.
