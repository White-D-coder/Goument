# B2C MongoDB module

This is the isolated 20-collection database foundation. Existing Express controllers in `../src` do not yet use it. No gateway calls or frontend changes are included.

Canonical design: [DATABASE](../../../docs/DATABASE.md), [field reference](../../../docs/DATA_MODELS.md), [decisions](../../../docs/DECISIONS.md), [tests](../../../docs/TESTING.md).

From `B2C/backend`:

```sh
npm run test:database
npm run db:describe
npm run db:describe -- --write-docs
```

For explicit development initialization, set `B2C_DATABASE_URI` to an isolated MongoDB replica set and `B2C_DATABASE_NAME` to `gourmet_b2c_schema_dev` (or another permitted isolated name), then run `npm run db:install`. To seed, supply `B2C_SEED_PASSWORD` through the environment and run `npm run db:seed`. Passwords are not printed. The seed refuses production mode and names outside the dev/test prefix. It creates fake `.example` identities and inactive demonstration catalogue/coupon data. It does not reset existing accounts or stock on rerun.

`client` owns connection and schema installation; `models`/`validators` own fields, references and state guards; `repositories`/`transactions` are supported write entry points; `queries` provides bounded customer/owner reads. Use the same explicit `db` connection throughout each operation. MongoDB transactions require a replica set; external calls must stay outside retried transaction callbacks.

Internal functions accept trusted server input. Future adapters must enforce authentication/ownership, construct authoritative quotes and verify provider signatures. Direct document saves/native collection access are not public business APIs. Mongo validators do not implement cross-collection foreign keys or prevent every native-write bypass. No production data migration or live-provider verification has been performed.
