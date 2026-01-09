import type { Role } from '../../../generated/prisma/client/enums.js';

export type UserRole = Role;

export class User {
  public readonly id:string;
  public name: string;
  public email: string;
  private _password: string;
  public role: UserRole;
  public readonly createdAt: Date;

  constructor(
    props: {
      id?: string,
    name: string,
    email: string,
    password: string,
    role?: UserRole,
    createdAt?: Date
    }
  ){
    if(!props.email.includes('@')){
      throw new Error('Invalid email format');
    }

    if(props.password.length < 6){
      throw new Error('Password must be at least 6 characters long');
    }

    this.id = props.id ?? crypto.randomUUID();
    this.name = props.name;
    this.email = props.email;
    this._password = props.password;
    this.role = props.role ?? 'ADMIN';
    this.createdAt = props.createdAt ?? new Date();
  }

  isAdmin(){
    return this.role === 'ADMIN';
  }

  toJson(){
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt
    }
  }

    get password(): string {
    return this._password;
  }
}