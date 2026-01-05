import type { FastifyRequest, FastifyReply } from "fastify"
import { prisma } from "../../prisma.js";

export const getMe = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = request.user.sub;

    const user = await prisma.user.findUnique({
      where: { id: userId }, select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      }
    })

    reply.send(user)

  }catch (err){
    console.error(err)
    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}