/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from 'fastify';

import { CreateUserSchema } from './schemas';
import { validateSchema } from '../../validations/schemas';
import { createUser } from '../../controllers/users.controller';

export default async function (fastify: FastifyInstance): Promise<void> {
  fastify.post('/', validateSchema(CreateUserSchema), createUser);
}
