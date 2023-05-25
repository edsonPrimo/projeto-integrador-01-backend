import { FastifyRequest } from 'fastify';
import Contact from '../../db/models/contact';
import { ContactsDto } from './dtos/controller.dto';
import contactsService from '../../services/contacts.service';

export async function createContact(req: FastifyRequest): Promise<Contact> {
  return contactsService.create(req.body as ContactsDto);
}
export async function getContacts(req: FastifyRequest): Promise<Contact[]> {
  const { offset, limit } = req.query as { offset: number; limit: number };
  return contactsService.getContacts(offset, limit);
}

export async function updateContact(req: FastifyRequest): Promise<{ id: string }> {
  const { id } = req.params as { id: string };
  return contactsService.updateContact(id, req.body as ContactsDto);
}
