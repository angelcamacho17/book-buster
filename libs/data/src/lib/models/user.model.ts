import { IBook } from './book.model';

export interface IUser {
  name: string,
  mail: string,
  password: string,
  rentedBooks?: IBook[],
  postedBooks?: IBook[],
  renterRate?: number,
  posterRate?: number
}

export interface IUsersState {
  users: IUser[]
}


export interface IUserState {
  user: IUser
}
