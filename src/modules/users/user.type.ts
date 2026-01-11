export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}

export interface IUserCreate {
  email: string;
  name: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserSafe extends Omit<IUser, 'password'>{}