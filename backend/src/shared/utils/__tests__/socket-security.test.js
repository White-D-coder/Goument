const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../../../features/auth/auth.model');
const config = require('../../config');
const { initSocket, notifyAdmins } = require('../socket');
jest.mock('socket.io', () => ({ Server: jest.fn() }));
jest.mock('../../../features/auth/auth.model', () => ({ findById: jest.fn() }));
jest.mock('../../config', () => ({ env: 'test', jwt: { accessSecret: 'synthetic-socket-test-key' } }));
jest.mock('../logger', () => ({ debug: jest.fn(), info: jest.fn(), error: jest.fn() }));
let io, connection, members;
const token = (id = 'admin-id', options = {}) => jwt.sign({ id }, config.jwt.accessSecret, { expiresIn: '5m', ...options });
function client(handshake = {}) {
 const handlers = {};
 const socket = { id: 'synthetic-socket', handshake: { headers: {}, ...handshake }, on: jest.fn((name, fn) => { handlers[name] = fn; }),
  join: jest.fn(async () => { members.push(socket); }), leave: jest.fn(async () => { members = members.filter(s => s !== socket); }), emit: jest.fn() };
 connection(socket);
 return { socket, join: async () => { const ack = jest.fn(); await handlers.join_admins(ack); return ack; } };
}
beforeEach(() => {
 jest.clearAllMocks(); members = [];
 io = { on: jest.fn((event, fn) => { if (event === 'connection') connection = fn; }),
  in: jest.fn(() => ({ fetchSockets: async () => [...members] })), to: jest.fn(() => ({ emit: jest.fn() })) };
 Server.mockImplementation(() => io);
 User.findById.mockResolvedValue({ role: 'admin' });
 initSocket({});
});
test.each([{}, { auth: { token: 'invalid' } }, { auth: { token: token('admin-id', { expiresIn: -1 }) } }])('anonymous/invalid/expired socket cannot join admins: %j', async handshake => {
 const c = client(handshake); await c.join(); expect(c.socket.join).not.toHaveBeenCalled();
});
test.each(['customer', null])('current nonadmin or deleted user cannot join: %s', async role => {
 User.findById.mockResolvedValue(role ? { role } : null);
 const c = client({ auth: { token: token() } }); await c.join(); expect(c.socket.join).not.toHaveBeenCalled();
});
test.each(['handshake', 'bearer', 'cookie'])('existing admin can join using %s and receive existing event', async transport => {
 const t = token(); const handshake = transport === 'handshake' ? { auth: { token: t } } : { headers: transport === 'bearer' ? { authorization: 'Bearer ' + t } : { cookie: 'accessToken=' + t } };
 const c = client(handshake); await c.join(); expect(c.socket.join).toHaveBeenCalledWith('admins');
 await notifyAdmins('new_order', { orderId: 'synthetic-order' });
 expect(c.socket.emit).toHaveBeenCalledWith('new_order', { orderId: 'synthetic-order' });
});
test.each(['customer', null, 'failure'])('notification rechecks demotion/deletion/DB failure: %s', async state => {
 const c = client({ auth: { token: token() } }); await c.join();
 if (state === 'failure') User.findById.mockRejectedValue(new Error('synthetic storage outage'));
 else User.findById.mockResolvedValue(state ? { role: state } : null);
 await notifyAdmins('new_order', { orderId: 'synthetic-order' });
 expect(c.socket.emit).not.toHaveBeenCalled(); expect(c.socket.leave).toHaveBeenCalledWith('admins');
});
test('expiration after admission denies later notification', async () => {
 jest.useFakeTimers(); const c = client({ auth: { token: token('admin-id', { expiresIn: 1 }) } });
 try { await c.join(); jest.setSystemTime(Date.now() + 2000); await notifyAdmins('new_order', {});
 expect(c.socket.emit).not.toHaveBeenCalled(); expect(c.socket.leave).toHaveBeenCalledWith('admins'); }
 finally { jest.useRealTimers(); }
});
test('one failing authorization does not suppress an authorized recipient', async () => {
 const a = client({ auth: { token: token() } }); const b = client({ auth: { token: token('other-admin') } });
 await a.join(); await b.join(); User.findById.mockImplementation(id => id === 'admin-id' ? Promise.reject(new Error('synthetic failure')) : Promise.resolve({ role: 'admin' }));
 await notifyAdmins('new_order', {}); expect(a.socket.emit).not.toHaveBeenCalled(); expect(b.socket.emit).toHaveBeenCalledWith('new_order', {});
});
test('socket handshake transport enforces exact origins', () => {
 const options = Server.mock.calls[0][1];
 const allowed = jest.fn(), denied = jest.fn();
 options.allowRequest({ headers: { origin: 'http://localhost:3000' } }, allowed);
 options.allowRequest({ headers: { origin: 'http://localhost.attacker.invalid' } }, denied);
 expect(allowed).toHaveBeenCalledWith(null, true); expect(denied).toHaveBeenCalledWith(null, false);
});
test('room adapter failure denies the join without an unhandled rejection', async () => {
 const c = client({ auth: { token: token() } }); c.socket.join.mockRejectedValue(new Error('synthetic adapter failure'));
 const ack = await c.join(); expect(ack).toHaveBeenCalledWith({ success: false });
});
test('spoofed token role cannot override the persisted customer role', async () => {
 User.findById.mockResolvedValue({ role: 'customer' });
 const c = client({ auth: { token: jwt.sign({ id: 'customer-id', role: 'admin' }, config.jwt.accessSecret, { expiresIn: '5m' }) } });
 await c.join(); expect(c.socket.join).not.toHaveBeenCalled();
});
