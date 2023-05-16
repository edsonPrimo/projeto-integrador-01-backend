import { FastifyReply, FastifyRequest } from 'fastify';

async function authenticateJWT(req: FastifyRequest, res: FastifyReply) {
  try {
    const jwt = await req.jwtVerify();
    req.user = {
      userId: jwt['userId'],
    };
  } catch (err) {
    res.send(err);
  }
}
