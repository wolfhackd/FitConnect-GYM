import type { FastifyReply, FastifyRequest } from "fastify";

export const authMiddleware = async (req: FastifyRequest, reply: FastifyReply) =>{
  try {
    await req.jwtVerify();
  }catch (err){
    console.error(err);
    return reply.status(401).send({ message: 'Unauthorized' });
  }
}