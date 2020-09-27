import { EventEmitter, Injectable } from '@angular/core';
import { IBook } from '@fecommerce-workspace/data';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  
  public categories = ['Software', 'Medicine', 'Culture', 'Love', 'Math', 'Science'];
  public books: IBook[] = [
    {
      title: 'Un saco de huesos',
      author: 'Stephen King',
      year: 1998,
      price: 4.5
    },
    {
      title: 'It',
      author: 'Stephen King',
      year: 1998,
      price: 4.5
    },
    {
      title: 'Revival',
      author: 'Stephen King',
      year: 1998,
      price: 4.5
    },
    {
      title: 'Cujo',
      author: 'Stephen King',
      year: 1998,
      price: 4.5
    },
  ]
  public books$ = new EventEmitter<IBook[]>();
  public currentBook = null;
  constructor() { }


  /**
   * Searh for a book
   * @param query 
   */
  public filterBooks(filter: string): void {
    this.books$.emit(this.books.filter(book => book.title.toLowerCase().includes(filter.toLowerCase())))
  }

  /**
   * Set current book to rent.
   * @param book 
   */
  public setCurrentBook(book: IBook): void{
    this.currentBook = book;
  }

  /**
   * Clear current book.
   */
  public clearCurBook(): void {
    this.currentBook = null;
  }
}
