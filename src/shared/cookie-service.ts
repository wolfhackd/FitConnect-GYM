import type { FastifyReply } from "fastify";
import { env } from "process";


export class CookieService {
  public static setAuthCookie(response: FastifyReply, token: string){
    response.setCookie("token", token,{
      httpOnly: true,
      signed: true,
      secure: env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24
    })
  }

    public static clearAuthCookie(response: FastifyReply) {
    response.clearCookie("token");
  }
}