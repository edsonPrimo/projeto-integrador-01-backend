import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { getRepository } from '../db';
import User from '../db/models/users';
import { InternalError } from '../utils/error';
import { UserDto } from '../controllers/users.controller/dtos/user.dto';

class UserService {
  private getRepository() {
    return getRepository(User);
  }

  async insertDb(input: QueryDeepPartialEntity<User>): Promise<User> {
    try {
      const res = await this.getRepository().insert(input);
      return {
        ...res.generatedMaps[0],
        ...input,
      } as User;
    } catch (e) {
      console.error(e);
      throw InternalError('Internal error, try again later');
    }
  }

  async createUser(input: UserDto) {
    const { email, name } = input;
    const user = await this.insertDb({ name, email });

    


  }
}

export default new UserService();
