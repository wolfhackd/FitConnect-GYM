import type { FastifyInstance } from "fastify";
import { login } from "./login.js";

export const authRoutes = async (app: FastifyInstance) =>{
  app.post('/login', login )
}
