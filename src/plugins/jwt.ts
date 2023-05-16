'use strict';

import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import { globalConfig } from '../config';

export default fp(async function (fastify: FastifyInstance) {
  fastify.register(jwt, {
    secret: globalConfig.jwtSecret,
  });
});
