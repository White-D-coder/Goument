const { MongoMemoryReplSet } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

/**
 * Configure database connections and lifecycle for Jest test suites.
 * Uses MongoMemoryReplSet to support ACID Mongoose transactions.
 */
const setupDB = () => {
  beforeAll(async () => {
    // Spin up standard MongoMemoryReplSet to support Mongoose transactions
    mongoServer = await MongoMemoryReplSet.create({
      replSet: { storageEngine: 'wiredTiger' }
    });
    const uri = mongoServer.getUri();

    // Ensure we close any existing connections first
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    await mongoose.connect(uri);
  });

  afterEach(async () => {
    // Clear all Mongoose database collections to isolate tests
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  afterAll(async () => {
    // Close connections and stop the in-memory database
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
  });
};

module.exports = { setupDB };
