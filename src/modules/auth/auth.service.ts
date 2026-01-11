import type { UserService } from "../users/user.service.js";
import type { LoginInput, RegisterInput } from "./authSchema.js";
import type { JwtService } from "../../shared/jwtService.js";
import type { IAuthUser } from "./auth.type.js";


export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ){}

  public registerUser = async (user: RegisterInput): Promise<IAuthUser> =>{
    const userCreated = await this.userService.createUser(user);

    const token = this.jwtService.sing({userId: userCreated.id});
    
    if(!token){
      throw new Error('Error generating token');
    }
    return { token, user: userCreated };
  } 

  public loginUser = async (user:LoginInput): Promise<IAuthUser> =>{
    const result = await this.userService.loginUser(user);
    if(!result){
      throw new Error("Invalid credentials");
    }
    const token = this.jwtService.sing({userId: result.id});

    if(!token){
      throw new Error('Error generating token');
    }

    return { token, user: result };
  }
}