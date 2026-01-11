
  import { prisma } from "../../database/database.js";
  import type { IUser } from "./user.type.js";
  import { User } from "../../database/models/User.js";
  import type { PrismaClient } from "../../../generated/prisma/client/client.js";

  export class UserRepository {
    constructor(private database: PrismaClient = prisma) {}

    async createUser(data: User): Promise<User> {
      const payload = data.toPrisma();
      const newUser = await this.database.user.create({data: payload})   
      return new User(newUser).toJson() as User;
    }

    async findByEmail(email: string): Promise<IUser | null> {
      const result = await this.database.user.findUnique({
        where: {email}
      })
      if(!result){
        return null;
      }
      return new User(result);
    }

    async findById(id: string): Promise<IUser | null> {
      const result = await this.database.user.findUnique({
        where: {id}
      })
      if(!result){
        throw new Error("User not found");
      }
      return new User(result);
    }

  }