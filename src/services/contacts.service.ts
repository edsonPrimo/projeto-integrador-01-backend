import { getRepository } from '../db';
import { InternalError } from '../utils/error';
import Contacts from '../db/models/contact';
import { ContactsDto } from '../controllers/contacts.controller/dtos/controller.dto';
import Contact from '../db/models/contact';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

class ContactsService {
  private getRepository() {
    return getRepository(Contacts);
  }

  async insertDb(input: QueryDeepPartialEntity<Contact>): Promise<Contact> {
    try {
      const res = await this.getRepository().insert(input);
      return {
        ...res.generatedMaps[0],
        ...input,
      } as Contact;
    } catch (e) {
      console.error(e);
      throw InternalError('Internal error, try again later');
    }
  }

  async create(input: ContactsDto) {
    return this.insertDb(input);
  }

  async getContacts(offset: number, limit: number): Promise<Contact[]> {
    if (limit > 100) limit = 100;
    if (offset && !limit) limit = 100;
    const contacts = await this.getRepository().find({
      skip: offset || 0,
      take: limit,
    });

    return contacts as Contact[];
  }

  async updateContact(id: string, input: ContactsDto): Promise<{ id: string }> {
    const result = await this.getRepository().update(id, input);
    if (result.affected !== 1) {
      throw InternalError('Could not update error, try again later');
    }
    return { id };
  }
}

export default new ContactsService();
