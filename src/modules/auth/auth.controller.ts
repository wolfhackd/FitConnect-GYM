import type { FastifyReply } from "fastify";
import type { FastifyRequest } from "fastify/types/request.js";
import { LoginSchema, RegisterSchema } from "./authSchema.js";
import type { AuthService } from "./auth.service.js";
import { HttpResponse } from "../../shared/http-response.js";
import { CookieService } from "../../shared/cookie-service.js";


export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ){}

  public register = async (request: FastifyRequest, reply: FastifyReply)=>{
    const body = RegisterSchema.parse(request.body);
    const {token, user} = await this.authService.registerUser(body);

    CookieService.setAuthCookie(reply, token);

    return HttpResponse.created(reply, user);
  }

  public login = async (request: FastifyRequest, reply: FastifyReply)=>{
    const body = LoginSchema.parse(request.body);
    const data = await this.authService.loginUser(body);
    CookieService.setAuthCookie(reply, data.token);
    
    return HttpResponse.ok(reply, data.user);
  }
}