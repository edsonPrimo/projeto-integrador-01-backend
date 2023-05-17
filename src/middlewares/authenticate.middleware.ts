import { FastifyReply, FastifyRequest } from 'fastify';
import { UnauthorizedException } from '../utils/error';

export function authenticate({ role }: { role: string[] }) {
  return async function (req: FastifyRequest, res: FastifyReply) {
    try {
      const jwt = await req.jwtVerify();
      const user = jwt['user'];
      
      if (role.includes(user["role"])) {
        req.user = {
          userId: user.id,
        };
      } else {
        throw UnauthorizedException('You are not allowed');
      }
    } catch (err) {
      res.send(err);
    }
  };
}
