import { IUser } from './user.model';

export interface IBook {
  title: string,
  author: string,
  year: number,
  edition?: string,
  editorial?: string,
  price: number,
  owner: IUser,
  rentedBy?: IUser
}

export interface IBookState {
  book: IBook;
}
export interface IBooksState {
  books: IBook[];
}
