import { TedisPool } from 'tedis';
import RedisCache from '../helpers/cache';

const pool = new TedisPool({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT as unknown as number,
});

async function cacheMiddleware(req, res, next) {
  try {
    req.cache = new RedisCache(await pool.getTedis());
  } catch (e) {
    console.error("Looks like there was an error connecting to Redis:", e.code);
    console.info("Defaulting to no-cache mode")
  }
  return next();
}

export default cacheMiddleware;
