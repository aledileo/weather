import { TedisPool } from 'tedis';
import nextConnect from 'next-connect';
import RedisCache from '../helpers/cache';

const pool = new TedisPool({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT as unknown as number,
});

async function database(req, res, next) {
  req.cache = new RedisCache(await pool.getTedis());
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
