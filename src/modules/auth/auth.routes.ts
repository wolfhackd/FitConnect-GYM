import type { FastifyInstance } from "fastify";
import { JwtService } from "../../shared/jwtService.js";
import { PasswordHash } from "../../shared/password-hash.js";
import { UserRepository } from "../users/user.repository.js";
import { UserService } from "../users/user.service.js";
import { AuthService } from "./auth.service.js";
import { AuthController } from "./auth.controller.js";


//Pre Handlers
const passwordHash = new PasswordHash();
const jwtService = new JwtService();
const userRepository = new UserRepository();
const userService = new UserService(userRepository, passwordHash);
const authService = new AuthService(jwtService,userService);
const authController = new AuthController(authService);




export const authRoutes = async (app: FastifyInstance) =>{
  app.post('/register' , authController.register )
}
