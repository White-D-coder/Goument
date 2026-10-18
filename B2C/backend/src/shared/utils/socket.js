const { Server } = require('socket.io');
const { createAdapter } = require('@socket.io/redis-adapter');
const Redis = require('ioredis');
const config = require('../config');
const logger = require('./logger');
const cookieParser = require('cookie-parser');
const { auth } = require('../middleware/auth.middleware');
const { allowedOrigins, isAllowedOrigin } = require('../config/origins');

// Reuse HTTP JWT verification and persisted role authorization. RemoteSocket
// exposes handshake too, so Redis-adapter broadcasts obey the same checks.
const adminAuth = auth('admin');
const parseCookies = cookieParser();
const authorized = socket => new Promise(resolve => {
  const handshake = socket.handshake || {};
  const headers = { ...handshake.headers };
  if (!isAllowedOrigin(headers.origin)) return resolve(false);
  if (typeof handshake.auth?.token === 'string') {
    headers.authorization = `Bearer ${handshake.auth.token}`;
  }
  const request = { headers };
  const response = { status() { return this; }, json() { resolve(false); } };
  try {
    parseCookies(request, response, error => {
      if (error) return resolve(false);
      Promise.resolve(adminAuth(request, response, error => resolve(!error && Boolean(request.user))))
        .catch(() => resolve(false));
    });
  } catch {
    resolve(false);
  }
});

let io;

/**
 * Initialize Socket.io on top of http server.
 * @param {http.Server} server - HTTP Server instance
 * @returns {Server}
 */
const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      methods: ['GET', 'POST'],
      credentials: true
    },
    // Enforce the same browser-origin policy for WebSocket handshakes too.
    allowRequest: (request, callback) => callback(null, isAllowedOrigin(request.headers.origin))
  });

  if (config.env !== 'test') {
    const pubClient = new Redis(config.redis.uri);
    const subClient = pubClient.duplicate();
    io.adapter(createAdapter(pubClient, subClient));
    logger.info('Socket.io Redis Adapter configured.');
  }

  io.on('connection', (socket) => {
    logger.debug(`Socket client connected: ${socket.id}`);

    socket.on('join_admins', async (ack) => {
      let allowed = false;
      try {
        allowed = await authorized(socket);
        if (allowed) {
          await socket.join('admins');
          logger.info(`Socket client ${socket.id} joined 'admins' room.`);
        } else {
          await socket.leave('admins');
        }
      } catch {
        allowed = false;
        logger.error('Socket admin room update unavailable.');
      }
      if (typeof ack === 'function') ack({ success: allowed });
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
const notifyAdmins = async (event, data) => {
  try {
    const ioServer = getIO();
    const recipients = await ioServer.in('admins').fetchSockets();
    await Promise.all(recipients.map(async socket => {
      // Expired tokens, deleted users, demotion and DB errors fail closed even
      // after admission. Never trust the JWT role or a previously joined room.
      if (await authorized(socket)) socket.emit(event, data);
      else await socket.leave('admins');
    }));
  } catch (error) {
    logger.error('Failed to dispatch socket notification to admins:', error);
  }
};

module.exports = {
  initSocket,
  getIO,
  notifyAdmins
};
