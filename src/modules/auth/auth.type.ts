import type { IUserSafe } from "../users/user.type.js";

export interface IAuthUser {
  token: string;
  user: IUserSafe;
}

export interface IAuthPayload {
  userId: string;
}