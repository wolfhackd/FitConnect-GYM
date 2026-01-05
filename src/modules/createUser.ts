import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../prisma.js"
import bcrypt from "bcrypt";
import { createUserSchema } from "./crateUserSchema.js";

export const createUser = async (req: FastifyRequest, reply: FastifyReply ) =>{
  const {name ,email, password} = createUserSchema.parse(req.body);
  
  try{
    const existingUser = await prisma.user.findUnique({
     where: {email}
    })

    if(existingUser){
      return reply.status(409).send({message: "User already exists"});
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    })

    return reply.status(201).send({message: "User created successfully", userId: newUser.id});
    
  }catch(error){
    console.error("Login error:", error);
    return reply.status(500).send({message: "Internal server error"});
  }
}