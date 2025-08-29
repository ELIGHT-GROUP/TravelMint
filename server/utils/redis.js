import Redis from 'ioredis';
import { config } from './config.js';

let redis;

/**
 * Connects to the Redis server.
 * @returns {Promise<Redis>} The Redis client instance.
 */
export function connectToRedis() {
  if (redis) {
    return redis;
  }

  try {
    redis = new Redis(config.redisUrl);
    console.log('Connected to Redis');
    return redis;
  } catch (error) {
    console.error('Could not connect to Redis', error);
    process.exit(1);
  }
}

/**
 * Returns the Redis client instance.
 * @returns {Redis} The Redis client instance.
 */
export function getRedis() {
  if (!redis) {
    throw new Error('Redis not connected');
  }
  return redis;
}
