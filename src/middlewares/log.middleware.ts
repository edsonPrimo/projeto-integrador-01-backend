import { FastifyRequest } from 'fastify';
import { getLogger } from '../utils/log';

export async function logMiddleware(req: FastifyRequest) {
  getLogger().info(`${req.method} ${req.context.config['url']}`);
}
