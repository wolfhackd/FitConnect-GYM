import type fastify from "fastify";
import type { IUser } from "../modules/users/user.type.ts";


declare global {
  namespace fastify {
    interface Request {
      authContext?: {
        user: IUser
      }
    }
  }
}

export {};