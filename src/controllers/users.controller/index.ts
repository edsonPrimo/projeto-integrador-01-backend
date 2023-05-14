import { FastifyRequest } from 'fastify';
import { UserDto } from './dtos/user.dto';
import userService from '../../services/user.service';
import User from '../../db/models/users';

export async function createUser(req: FastifyRequest): Promise<User> {
  return userService.createUser(req.body as UserDto);
}
