import { FastifyRequest } from 'fastify';
import { UserDto } from './dtos/user.dto';
import userService from '../../services/users.service';
import User from '../../db/models/users';

export async function createUser(req: FastifyRequest): Promise<User> {
  return userService.createUser(req.body as UserDto);
}

export async function updateUser(req: FastifyRequest): Promise<{ id: string }> {
  const { id } = req.params as { id: string };
  return userService.updateUser(id, req.body as UserDto);
}
