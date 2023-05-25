/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from 'fastify';

import { CreateContactSchema, GetContactsSchema, UpdateContactsSchema } from './schemas';
import { validateSchema } from '../../validations/schemas';
import { authenticate } from '../../middlewares/authenticate.middleware';
import { createContact, getContacts, updateContact } from '../../controllers/contacts.controller';

export default async function (fastify: FastifyInstance): Promise<void> {
  fastify.post('/', validateSchema(CreateContactSchema), createContact);
  fastify.get(
    '/',
    {
      schema: validateSchema(GetContactsSchema),
      preValidation: authenticate({ role: ['admin'] }),
    },
    getContacts,
  );
  fastify.patch(
    '/:id',
    {
      schema: validateSchema(UpdateContactsSchema),
      preValidation: authenticate({ role: ['admin'] }),
    },
    updateContact,
  );
}
