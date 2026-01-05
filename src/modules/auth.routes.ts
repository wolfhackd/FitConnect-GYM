import type { FastifyInstance } from "fastify";
import { login } from "./login.js";
import { createUser } from "./createUser.js";

export const authRoutes = async (app: FastifyInstance) =>{
  app.post('/login', login )
  app.post('/register', createUser )
}
