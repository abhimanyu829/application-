const Redis = require('ioredis');
const logger = require('./logger');

let client = null;
let isConnected = false;

/**
 * Creates and returns the Redis client singleton.
 * Falls back to a no-op cache if Redis is not configured or unavailable.
 */
function getClient() {
  if (client) return client;

  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    logger.warn('REDIS_URL not set — Redis cache is disabled. Running without cache.');
    return null;
  }

  client = new Redis(redisUrl, {
    // Retry strategy: back off after failed connects, give up after ~30s
    retryStrategy: (times) => {
      if (times > 5) {
        logger.error('Redis: too many reconnect attempts, disabling cache');
        isConnected = false;
        return null; // Stop retrying
      }
      return Math.min(times * 200, 3000); // Wait 200ms, 400ms ... max 3s
    },
    lazyConnect: true,
    connectTimeout: 5000,
    enableOfflineQueue: false,
  });

  client.on('connect', () => {
    isConnected = true;
    logger.info('Redis connected successfully');
  });

  client.on('error', (err) => {
    isConnected = false;
    logger.error('Redis error: %s', err.message);
  });

  client.on('close', () => {
    isConnected = false;
  });

  client.connect().catch((err) => {
    logger.error('Redis initial connection failed: %s', err.message);
    isConnected = false;
  });

  return client;
}

/**
 * Get a cached value by key.
 * Returns null if key not found or Redis is unavailable.
 * @param {string} key
 * @returns {Promise<any|null>}
 */
async function get(key) {
  try {
    const c = getClient();
    if (!c || !isConnected) return null;
    const raw = await c.get(key);
    if (raw === null) return null;
    return JSON.parse(raw);
  } catch (err) {
    logger.warn('Cache get error for key "%s": %s', key, err.message);
    return null;
  }
}

/**
 * Set a value in cache with an optional TTL.
 * @param {string} key
 * @param {any} value
 * @param {number} ttlSeconds - Time-to-live in seconds (default: 300 = 5 minutes)
 */
async function set(key, value, ttlSeconds = 300) {
  try {
    const c = getClient();
    if (!c || !isConnected) return;
    await c.set(key, JSON.stringify(value), 'EX', ttlSeconds);
  } catch (err) {
    logger.warn('Cache set error for key "%s": %s', key, err.message);
  }
}

/**
 * Delete a specific cache key.
 * @param {string} key
 */
async function del(key) {
  try {
    const c = getClient();
    if (!c || !isConnected) return;
    await c.del(key);
  } catch (err) {
    logger.warn('Cache del error for key "%s": %s', key, err.message);
  }
}

/**
 * Flush all keys matching a glob pattern.
 * E.g., flush('team:*') clears all team cache entries.
 * @param {string} pattern
 */
async function flush(pattern = '*') {
  try {
    const c = getClient();
    if (!c || !isConnected) return;
    const keys = await c.keys(pattern);
    if (keys.length > 0) {
      await c.del(...keys);
      logger.debug('Cache flushed %d keys matching "%s"', keys.length, pattern);
    }
  } catch (err) {
    logger.warn('Cache flush error for pattern "%s": %s', pattern, err.message);
  }
}

module.exports = { get, set, del, flush };
