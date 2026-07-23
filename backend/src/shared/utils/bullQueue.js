const { Queue } = require('bullmq');
const redis = require('./redis');

const INVENTORY_RELEASE_QUEUE = 'inventory-release';

// Queue instance to schedule delayed inventory releases
const inventoryQueue = new Queue(INVENTORY_RELEASE_QUEUE, {
  connection: redis
});

module.exports = {
  inventoryQueue,
  INVENTORY_RELEASE_QUEUE
};
