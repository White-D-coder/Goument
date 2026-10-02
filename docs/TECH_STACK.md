# Tech Stack

Last reviewed: 2026-09-25. Evidence: local source inspection; runtime/deployment not verified.

## Canonical versions

Use package.json for declared ranges and package-lock.json for resolved versions. Full package-by-package inventory is maintained in [the audit, section 2](PROJECT_TECH_DESIGN_AUDIT.md#2-technology-stack); this file owns stack decisions rather than duplicating that inventory.

- Main: Next16.2.10, React/ReactDOM19.2.4; TypeScript5.9.3 and Tailwind4.3.3 resolved in inspected lockfile.
- Alternate: Next16.2.11, React19.2.4, same resolved TS/Tailwind versions.
- UI: Tailwind/PostCSS, CSS + inline styles, GSAP3.15 / ScrollTrigger, Framer Motion12.42.2, Lucide, canvas-confetti, react-hot-toast.
- State/data: Zustand5, TanStack Query5, Axios1, idb-keyval6.
- Next services: Nodemailer9, UAParser2, XLSX0.18.5.
- Backend: CommonJS Node/Express4, Mongoose8, ioredis5, BullMQ5, Socket.IO4, Stripe15, Cloudinary2, Joi17, express-validator7, bcryptjs2, JWT9, Winston3, Opossum8.
- Tooling: npm lockfiles, ESLint9, frontend TypeScript, backend Jest29/Supertest7/MongoMemoryReplSet.

Actual Node runtime version is UNKNOWN; @types/node20 is not a runtime pin. Declared dependencies may be unused; static imports do not prove active page usage. No framework/provider migration is authorized by memory initialization.

## B2C database increment — 2026-09-28

New B2C database layer uses the already-installed Mongoose8/MongoDB stack, Node crypto/bcryptjs, Jest and mongodb-memory-server replica-set tests. No Prisma or additional runtime DAL introduced. Transactions require replica-set support.

## 2026-10-01 — Owner operations increment

CURRENT / IMPLEMENTED with existing Next16/React19/TypeScript, CSS, Lucide, Express4 and Mongoose8. No Prisma, new auth provider, chart service, microservice or runtime dependency added. Browser fetch uses the existing HttpOnly cookie namespace with no-store/AbortController; admin forms use client-generated request IDs only for server idempotency. Server Node crypto hashes command/rate identities; Mongo transactions and explicit indexes enforce concurrency. Disposable Mongo replica-set + Jest/Supertest and Node client-contract tests supply verification. Existing Redis/BullMQ dependencies do not imply compatible admin workers are running.
