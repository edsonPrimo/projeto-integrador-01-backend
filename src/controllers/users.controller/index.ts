import { FastifyRequest } from 'fastify';
import { CreateUserDto } from './dtos/user.dto';
import userService from '../../services/users.service';
import User from '../../db/models/users';

export async function createUser(req: FastifyRequest): Promise<User> {
  return userService.createUser(req.body as CreateUserDto);
}
