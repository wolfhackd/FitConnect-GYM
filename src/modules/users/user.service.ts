import { User } from "../../database/models/User.js";
import type { PasswordHash } from "../../shared/password-hash.js";
import type { UserRepository } from "./user.repository.js";
import type { IUser, IUserCreate, IUserLogin } from "./user.type.js";



export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHash: PasswordHash
  ){}


  public async createUser(user: IUserCreate){
    const existsingUser = await this.userRepository.findByEmail(user.email);
    if(existsingUser){
      throw new Error("User already exists");
    }

    const hashedPassoword = await this.passwordHash.hash(user.password);
    const now = new Date();

    const newUser = new User( {
      id: crypto.randomUUID(),
      name: user.name,
      email: user.email,
      password: hashedPassoword,
      createdAt: now,
      role: 'ADMIN'
    })
    
    const result = await this.userRepository.createUser(newUser)

    const { password, ...IUserSafe} = result;
    void password

    return IUserSafe
  }
  
  public loginUser = async ({email, password}: IUserLogin): Promise<IUser> =>{
    const user = await this.userRepository.findByEmail(email);
    if(!user){
      throw new Error("User not found");
    }
    const isPasswordValid = await this.passwordHash.compare(password, user.password);
    if(!isPasswordValid){
      throw new Error("Invalid password");
    }
    return user
  }
}