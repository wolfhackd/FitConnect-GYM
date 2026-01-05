import type { FastifyInstance } from "fastify";
import { login } from "./login.js";
import { createUser } from "./createUser.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getMe } from "./getMe.js";

export const authRoutes = async (app: FastifyInstance) =>{
  app.post('/login', login )
  app.post('/register' , createUser )
  app.get('/me',{preHandler: authMiddleware}, getMe )
  // app.post('/logout', createUser )
}
