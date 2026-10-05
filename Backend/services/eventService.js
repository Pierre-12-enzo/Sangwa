// backend/services/eventService.js

// In-memory registry of active SSE connections
// Each entry: { id, res, userId, role, doctorId, channels: Set<string> }
const clients = new Map();

/**
 * Register a new SSE client
 */
function registerClient({ res, userId, role, doctorId, channels }) {
  const id = `${userId}-${Date.now()}`;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // disable Nginx/Render buffering
  res.flushHeaders?.();

  // Initial hello so client knows it's connected
  res.write(`event: connected\ndata: ${JSON.stringify({ id, channels })}\n\n`);

  const client = { id, res, userId, role, doctorId, channels: new Set(channels) };
  clients.set(id, client);

  // Heartbeat every 25s (keeps Render/proxies from closing idle connections)
  const heartbeat = setInterval(() => {
    try {
      res.write(`:ping\n\n`);
    } catch {
      clearInterval(heartbeat);
    }
  }, 25000);

  return () => {
    clearInterval(heartbeat);
    clients.delete(id);
  };
}

/**
 * Emit an event to clients subscribed to a channel
 * Channel format examples:
 *   "queue:doctor:<doctorId>:<date>"
 *   "queue:all:<date>"
 *   "bookings:all"
 *   "doctor:<doctorId>"
 */
function emit(channel, eventName, payload) {
  const message = `event: ${eventName}\ndata: ${JSON.stringify(payload)}\n\n`;
  let delivered = 0;

  clients.forEach((client) => {
    if (client.channels.has(channel) || client.channels.has('*')) {
      try {
        client.res.write(message);
        delivered++;
      } catch (err) {
        clients.delete(client.id);
      }
    }
  });

  return delivered;
}

/**
 * Emit to multiple channels at once
 */
function emitTo(channels, eventName, payload) {
  let total = 0;
  channels.forEach((ch) => {
    total += emit(ch, eventName, payload);
  });
  return total;
}

function getClientCount() {
  return clients.size;
}

module.exports = { registerClient, emit, emitTo, getClientCount };