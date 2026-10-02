# Edge Cases

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Discovered source findings

These are code-review findings or inferred failure scenarios, not reproduced incidents. None fixed during documentation initialization. Preserve this distinction; add reproducer/test and resolution evidence when addressed.

| ID | Scenario | Current behavior / concern | Source basename |
| --- | --- | --- | --- |
| E01 | Idempotency concurrency / identity | GET then SET no NX, global key not bound to user/payload; replay may cross user boundary. | idempotency.middleware.js |
| E02 | Variant stock exhaustion | Array-filter guard may modify no variant but return parent document; null check insufficient. | order.service.js |
| E03 | Webhook/release race or duplicate | Read-then-save pending guards and separate restock loops; no atomic claim/event ledger. | order.controller.js; order.worker.js |
| E04 | Stripe/DB/queue partial success | Intent inside DB retry; queue after commit/cart clear; external side effects not rolled back. | order.service.js; stripe.js |
| E05 | Untrusted total components | shippingCost from payload; boxing fallback from cart; validator omits shippingCost constraint. | order.service.js; order.validation.js |
| E06 | Restricted coupon checkout | Snapshot has product, restriction code calls item.productId.toString(). | order.service.js; coupon.service.js |
| E07 | Tax error and country fallback | Breaker returns0; outer catch estimates5%; non-India long country names become US; tax before discount. | stripe.js; order.service.js |
| E08 | Historical product edit/deletion | Price and address copies exist, product name absent; future names/history cannot be reconstructed safely. | order.model.js |
| E09 | Inquiry acknowledgement without mail | Missing SMTP credentials success; send failure occurs after vault record, retry can duplicate enquiry. | api/send-inquiry/route.ts |
| E10 | Cart merge / offline sync | Invalid inventory items discarded; variant/product identity excludes box; read-modify-write race possible. | cart.service.js |
| E11 | Live config vs route labels | Health config names /health; actual /healthz. Page flags differ from effective whitelist. | appRoutes.config.ts; health.routes.js |
| E12 | Lifetime identity/data retention | Enquiry/session vault separate from Mongo User; merge/retention policy unknown. | vault.ts; auth.model.js |

Late payment after expired/cancelled order is currently ignored by pending-only confirmation. No approved refund/reconciliation response exists. Price changes during checkout are partly addressed by reading Product again; stale cart UI total is not authoritative. Product/address/identity mutation tests remain necessary.

## Additional source-backed scenarios from completeness audit

| ID | Scenario | Current outcome / risk | Evidence / next validation |
| --- | --- | --- | --- |
| E13 | Gated checkout network failure or pending response | UI fabricates confirmed order/clears cart; clientSecret ignored | app/checkout/page.tsx; future E2E must distinguish pending/paid/failure |
| E14 | Gated login API rejection | Local authenticated boolean set; static history shown | app/account/page.tsx; server auth still separate |
| E15 | Guest/local catalogue cart add | No guest-header bootstrap, non-Mongo IDs and variant/boxing mismatch | hooks/useCart.ts + shared/api/client/endpoints + cart validator |
| E16 | Replay partially succeeds then fails | Queue deletion only after loop; earlier adds can repeat | shared/useCartSync.ts; currently only legacy shell calls hook |
| E17 | Local removal/empty server sync | Server item can remain; empty response does not clear local items | useCart store actions/syncWithServer |
| E18 | Lost vault key/corrupt ciphertext | Read returns empty; later write may replace history | vault read/write; no actual restore performed |
| E19 | Vault capacity/multi-instance writes | Old enquiries/sessions pruned; concurrent snapshots can lose data | vault cap2000/5000, whole-file rename; no distributed lock |
| E20 | Global inquiry send failure | Unawaited fetch still success toast/WhatsApp; budget not stored by API | InquiryModal + send-inquiry handler |
| E21 | Paid webhook side-effect error after save | Retry finds nonpending and can skip coupon/job repair | order.controller.js; duplicate event ledger absent |
| E22 | Restore item error / deleted SKU | Logs/continues then terminal state; later job skips | order.worker.js/order.service.js; compare modified documents |
| E23 | Customer profile/address change | User address update separate; order populated name/email are live | user.service/order.model/order.service; immutable invoice identity absent |
| E24 | Admin unauthorized action | Public role acceptance and admin socket join conflict with intent | auth.service/socket.js; no exploit run |
| E25 | Coupon limits/date/preview mismatch | No reservation; preview excludes boxing; percentage not capped100 | coupon validator/controller/service; intended policy UNKNOWN |
| E26 | Redis down | Limiter fails open; cart/idempotency fail; queue post-commit error possible | middleware and order service; no inferred global fallback |
| E27 | DB unavailable / price changes between read and commit | Listener may run without DB; snapshot built before transaction | server.js/order.service.js; no inventory-price version check |

## Future-only scenarios — NOT IMPLEMENTED

Refund duplicate event, gateway timeout after accepted refund, partial/full-refund overlap and refundable-balance races need idempotent operation history once requirements exist. Invoice sequence collision, re-download after profile/product edits, and correction/cancellation must preserve issued history. Financial settlement mismatch and missing provider events need reconciliation ownership. These are future design checks, not current supported operations or approved policies; U03–U09/U12 remain UNKNOWN.

## E28 — Signup privilege injection (2026-09-27)

Locally reproduced before fix: role admin creates a privileged User; malformed role inputs reach schema errors. Implemented service rule now ignores caller role and assigns customer. HTTP scalar/object/array injections and direct service bypass covered by regression tests; issued authentication must remain denied admin routes. Existing admin login remains valid. Historical privileged users are not auto-demoted; production exposure UNKNOWN.

## E29 — Test database startup/index race (2026-09-27)

Full backend run encountered Mongo transaction IX-lock timeout during checkout. Test setup previously returned immediately after connection while models initialize asynchronously. It now awaits loaded model initialization before fixtures/transactions. This is test-environment readiness, not a fix for production payment/stock concurrency.

## Database-layer concurrency and failure cases — 2026-09-28

CURRENT / IMPLEMENTED AND TESTED: two buyers race for last stock (one succeeds); repeat stock key with changed payload rejects; duplicate capture event applies once; another event for same captured payment does not repeat effects; two payment attempts cannot both confirm one order; wrong amount/currency rejects; conflicting finance identity rolls back payment/order/stock/event; pending refunds reserve capacity against concurrent over-refund; global/per-customer coupon limits serialize; default addresses remain unique; order/invoice snapshots survive mutable source edits; invalid graph transitions reject; normalized identity duplicates reject; 1000-order customer query returns a cursor-limited page.

CURRENT / PARTIAL: capture with insufficient reservation is rejected for future provider reconciliation, not silently accepted; no durable failed-webhook inbox/outbox or retry worker; no reservation-expiry scheduler/cancellation saga; order creation, reservation and coupon allocation are separate calls; released reservations cannot be reserved repeatedly beyond original ordered quantity in the current ledger rule; returns/restocks require trusted callers and approved policy; no automatic totals-cache refresh. Cart TTL declaration tested, wall-clock TTL deletion not tested. Unknown refund network outcomes must remain PROCESSING rather than freeing capacity.

## 2026-10-01 — Owner operations edge cases

CURRENT / IMPLEMENTED: these findings concern the new `B2C/backend/admin` adapters, not a retroactive repair claim for the original controllers described in E01–E29. Their records use the explicit B2C database/session architecture.

| Scenario | Implemented handling / evidence |
| --- | --- |
| Double-click, timeout retry or simultaneous identical admin command | Actor+key unique receipt is bound to action+input hash. Same request replays without duplicate inventory/receipt/audit effects; changed payload409. Sequential/concurrent HTTP cases passed. |
| Another staff member reuses the same client key | Key scope includes actor identity; no cross-actor receipt replay. A stale balance still409; a permitted fresh-version command is independent. HTTP case passed. |
| Session revoked before command/replay | Existing session is rechecked; revoked replay401. Transaction-time actor document write shares concurrency with logout/access updates so effects must re-authorize on transaction retry. The replay rejection is tested; consult TESTING for any separate simultaneous-revocation race coverage. |
| Browser role/permission injection or mass assignment | Backend uses persisted role/grants and exact top-level/nested allowlists; unrelated fields, coercible numeric strings, invalid IDs/enums and unknown query filters reject. Client state cannot elevate privileges. |
| Concurrent product/coupon edits | Required `expectedVersion` prevents silently overwriting another saved revision; product-edit race passed. |
| Concurrent stock count corrections / last-item reservation | Manual adjustments and checkout reservation use the same Inventory transaction authority. Nonnegative bounds and optimistic versions permit only a valid winner; both same-version-adjustment and reservation-versus-adjustment races passed. |
| Stock movement succeeds but audit/receipt fails | All effects share the command transaction. Synthetic central audit failure returned sanitized503 and rolled back balance, movement, receipt and audits; retry succeeded. No partial success is presented. |
| Product archived or changed after purchase | Product remains stored; frozen order name/price/quantity/address snapshots survive catalogue edits. SKU/product reference cannot be changed through variant edits. Verified in mutation tests. |
| Missing references or invalid transition | Missing category/parent404; terminal status changes/stale version/insufficient stock409; malformed input422. Unexpected database failures remain generic503 with request ID, not query/credential/stack details. |
| Arbitrary fulfillment/payment change | The sole processing action checks CONFIRMED + PAID + UNFULFILLED. Pending orders, repeat processing under a new key and body-supplied payment/status fields reject. No mark-paid/cancel/refund-completed control exists. |
| Customer360 caller lacks a related-domain permission | Related sections are omitted and direct related requests still403; parent/resource/customer filters are server constructed. Cursor contents cannot remove those fixed filters. |
| Invoice record has a document URL or internal metadata | Response projections omit private document URLs and raw metadata. A visible invoice snapshot does not provide an anonymous/predictable file endpoint. File generation/access remains unavailable. |
| Oversized pagination, malformed cursor, impossible date, broad report | Resource pages cap50, cursors are bounded/validated, invalid canonical UTC dates reject, reports cap93days and require currency/timezone. Child addresses/coupon history/movements accept only supported cursor controls. |
| Refund investigation disagrees with paid amount | Completed and in-flight refund amounts are included; negative/unsafe remaining amount fails instead of displaying available credit. Provider execution and ambiguous outcomes remain unresolved workflows. |
| No provider/worker/business configuration | Shipping, notification delivery, invoice production, refund execution, cancellation and compatible jobs display unavailable reasons. Empty data is not replaced with invented operational totals or successful states. |

Verified mutation scope: `admin-mutations.test.js`11 cases and `admin-commands.test.js`8 HTTP cases passed together on a disposable replica set. The first mutation-suite attempt failed before tests because MongoMemoryServer exceeded its default10s startup allowance; guarded cleanup and a60s temporary startup allowance resolved setup, and reruns passed. This was test infrastructure, not a live database failure or an application integrity fix. Combined security/read/browser checks are tracked in TESTING.

CURRENT / PARTIAL / UNKNOWN: compatible background job retries and failed-webhook recovery, financial/customer retention, legal invoice policy, refund approval/eligibility and carrier compensation still need approved integration work. Historical legacy socket/JWT/Stripe findings are not cleared by protecting this new portal. Actual production topology, proxy trust, service health and owner provisioning remain separate verification boundaries.
