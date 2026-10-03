# B2C application scope

The user explicitly requires B2C implementation in this directory. Storefront lives in src/, public assets in public/, its backend in backend/. Do not implement B2C changes in the older frontend_appview/frontend_responsive/backend directories by mistake.

Read root AGENTS and task-relevant root docs; historical audit describes the original apps, not automatically this fork. Keep root project memory updated after meaningful work, while prioritizing actual application implementation here. No .env/customer data copying. Use separate Mongo/Redis configuration. Local node_modules symlinks are development conveniences only; package manifests/locks support npm ci.

Next.js16: consult installed node_modules/next/dist/docs before framework changes. Preserve existing palette/typography and truthful empty/error/preview states. Never activate payments until server money validation and payment/order integrity are implemented and verified. Current preview catalogue is not saleable inventory.
