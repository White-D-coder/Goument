const { Server } = require('socket.io');
const { createAdapter } = require('@socket.io/redis-adapter');
const Redis = require('ioredis');
const config = require('../config');
const logger = require('./logger');

let io;

/**
 * Initialize Socket.io on top of http server.
 * @param {http.Server} server - HTTP Server instance
 * @returns {Server}
 */
const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ['https://www.gourmetgem.com', 'https://m.gourmetgem.com', 'http://localhost:3000'],
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  if (config.env !== 'test') {
    const pubClient = new Redis(config.redis.uri);
    const subClient = pubClient.duplicate();
    io.adapter(createAdapter(pubClient, subClient));
    logger.info('Socket.io Redis Adapter configured.');
  }

  io.on('connection', (socket) => {
    logger.debug(`Socket client connected: ${socket.id}`);

    // Join room if the user is verified as admin
    socket.on('join_admins', () => {
      socket.join('admins');
      logger.info(`Socket client ${socket.id} joined 'admins' room.`);
    });

    socket.on('disconnect', () => {
      logger.debug(`Socket client disconnected: ${socket.id}`);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io has not been initialized yet.');
  }
  return io;
};

/**
 * Send real-time event notifications to admin clients.
 * @param {string} event - Name of the event
 * @param {Object} data - Payload
 */
const notifyAdmins = (event, data) => {
  try {
    const ioServer = getIO();
    ioServer.to('admins').emit(event, data);
  } catch (error) {
    logger.error('Failed to dispatch socket notification to admins:', error);
  }
};

module.exports = {
  initSocket,
  getIO,
  notifyAdmins
};
