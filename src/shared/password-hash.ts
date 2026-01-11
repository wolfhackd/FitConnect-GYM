import bcrypt from "bcrypt"
import { env } from "../config/env.js";


export class PasswordHash {
  private readonly saltRounds = Number(env.PASSWORD_SALT)
  private readonly secretKey = env.PASSWORD_SECRET

  public async hash(password: string) {
    return await bcrypt.hash(password + this.secretKey, this.saltRounds)
  }

  public async compare(password: string, hash: string) {
    return await bcrypt.compare(password + this.secretKey, hash)
  }
}