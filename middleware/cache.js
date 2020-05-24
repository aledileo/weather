import { TedisPool } from 'tedis';
import nextConnect from 'next-connect';

const pool = new TedisPool({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

async function database(req, res, next) {
  req.db = await pool.getTedis();
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
