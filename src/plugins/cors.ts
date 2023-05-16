'use strict';

import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async function (fastify: FastifyInstance) {
  fastify.register(require('@fastify/cors'));
});
