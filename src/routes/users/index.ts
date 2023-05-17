/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from 'fastify';

import { CreateUserSchema, AuthenticateUserSchema } from './schemas';
import { validateSchema } from '../../validations/schemas';
import {
  authenticateUser,
  createUser,
} from '../../controllers/users.controller';

export default async function (fastify: FastifyInstance): Promise<void> {
  fastify.post('/', validateSchema(CreateUserSchema), createUser);
  fastify.post(
    '/authenticate',
    validateSchema(AuthenticateUserSchema),
    authenticateUser,
  );
}
