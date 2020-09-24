export interface IBook {
  title: string,
  author: string,
  year: number,
  edition?: string,
  editorial?: string,
  price: number
}

export interface IBookState {
  book: IBook;
}
export interface IBooksState {
  books: IBook[];
}
