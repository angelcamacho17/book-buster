import { IUser } from './user.model';

export interface IBook {
  id: number,
  title: string,
  author: string,
  year: number,
  edition?: string,
  editorial?: string,
  price: number,
  owner: IUser,
  rentedBy?: IUser
  startDate?: Date,
  finalDate?: Date,
}

export interface IBookState {
  book: IBook;
}
export interface IBooksState {
  books: IBook[];
}
