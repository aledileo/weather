import nextConnect from 'next-connect';
import cacheMiddleware from './cache';

const middleware = nextConnect();

middleware.use(cacheMiddleware);

export default middleware;
