import { FastifyRequest } from 'fastify';
import { UserDto } from './dtos/user.dto';
import userService from '../../services/users.service';

export async function createUser(req: FastifyRequest): Promise<{ id: string }> {
  return userService.createUser(req.body as UserDto);
}

export async function updateUser(req: FastifyRequest): Promise<{ id: string }> {
  const { id } = req.params as { id: string };
  return userService.updateUser(id, req.body as UserDto);
}

export async function authenticateUser(req: FastifyRequest): Promise<any> {
  const { email, password } = req.body as { email: string; password: string };

  return userService.authenticateUser(email, password, req);
}
