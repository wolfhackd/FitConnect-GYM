import jwt from "jsonwebtoken";
import { env } from '../../src/config/env.js';
import type { IAuthPayload } from '../modules/auth/auth.type.js';

export class jwtService {
  private readonly secret = env.JWT_SECRET;
  private readonly expiresIn = env.JWT_EXPIRES_IN_MINUTES;
  private readonly algorithm = env.JWT_ALGORITHM;

  public sing({userId}: IAuthPayload ): string | null {
    try {
      return jwt.sign({userId}, this.secret, {
        expiresIn: `${this.expiresIn}m`,
        algorithm: this.algorithm as jwt.Algorithm,
      })
    }catch {
      return null;
    }
  }

  public verify(token: string): IAuthPayload | null {

    try{
      const decoded = jwt.verify(token, this.secret, {
        algorithms: [this.algorithm as jwt.Algorithm],
      })
      if(typeof decoded === 'object' && 'userId' in decoded){
        return {userId: decoded.userId as string};
      }
      return null;
    }catch{ 
      return null;
    }
  }
}