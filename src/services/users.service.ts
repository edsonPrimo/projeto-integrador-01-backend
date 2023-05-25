import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { getRepository } from '../db';
import User from '../db/models/user';
import { AppError, InternalError } from '../utils/error';
import { UserDto } from '../controllers/users.controller/dtos/user.dto';
import bcrypt from 'bcrypt';
import { FastifyRequest } from 'fastify';
import { globalConfig } from '../config';

class UserService {
  private getRepository() {
    return getRepository(User);
  }

  private async generateHash(payload: string): Promise<string> {
    return bcrypt.hash(payload, 8);
  }

  private async compareHash(payload: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(payload, hashed);
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

  async createUser(input: UserDto): Promise<{ id: string }> {
    input.password = await this.generateHash(input.password);
    const user = await this.insertDb(input);
    return { id: user.id };
  }

  async updateUser(id: string, input: UserDto): Promise<{ id: string }> {
    const result = await this.getRepository().update(id, input);
    if (result.affected !== 1) {
      throw InternalError('Could not update error, try again later');
    }
    return { id };
  }

  async authenticateUser(
    email: string,
    password: string,
    req: FastifyRequest,
  ): Promise<{ sessionToken: string; user: User }> {
    const user = (await this.getRepository().findOne({
      where: { email },
    })) as User;

    if (!user) {
      throw new AppError("Email doesn't exist", 400);
    }

    const passwordCompare = await this.compareHash(password, user.password);

    if (!passwordCompare) {
      throw new AppError('Invalid password', 400);
    }

    delete user.password;

    const json = { user, sessionToken: '' };
    json['sessionToken'] = req.server.jwt.sign(
      {
        user,
        iss: globalConfig.jwtIssuerKey,
      },
      {
        expiresIn: "10m",
      },
    );
    return json;
  }
}

export default new UserService();
