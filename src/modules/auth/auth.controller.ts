import type { FastifyReply } from "fastify";
import type { FastifyRequest } from "fastify/types/request.js";
import { RegisterSchema } from "./authSchema.js";
import type { AuthService } from "./auth.service.js";
import { HttpResponse } from "../../shared/http-response.js";


export class AuthController {
  constructor(private readonly authService: AuthService){}

  public register = async (request: FastifyRequest, reply: FastifyReply)=>{
    const body = RegisterSchema.parse(request.body);
    const data = await this.authService.registerUser(body);
    

    return HttpResponse.created(reply, data);
  }
}