import type { FastifyReply, FastifyRequest } from "fastify";
import { loginSchema } from "./loginSchema.js";
import { prisma } from "../../prisma.js"
import bcrypt from "bcrypt";

export const login = async (req: FastifyRequest, reply: FastifyReply ) =>{
  const {email, password} = loginSchema.parse(req.body);
  
  try{
    const user = await prisma.user.findUnique({
      where: {email}
    })

    if(!user){
      return reply.status(404).send({message: "User not found"});
    }

    const PasswordValid = bcrypt.compareSync(password, user.password);

    if(!PasswordValid){
      return reply.status(401).send({message: "Invalid credentials"});
    }

    const token = reply.server.jwt.sign({},{sub: user.id, expiresIn: '1h'}); 

    reply
      .setCookie('token', token, {
          httpOnly: true,
          signed: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
      })
      .status(200)
      .send({ message: "Login successful" })
    
  }catch(error){
    console.error("Login error:", error);
    return reply.status(500).send({message: "Internal server error"});
  }
}