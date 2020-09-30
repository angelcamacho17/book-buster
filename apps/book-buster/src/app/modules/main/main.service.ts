import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IBook } from '../../models/book.model';
import { IUser } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  public currentUser: IUser = JSON.parse(localStorage.getItem('USER'));
  public users: IUser[] = [
    {
      name: 'angel',
      mail: 'angel@gmail.com',
      password: '123'
    },
    {
      name: 'vale',
      mail: 'angel@gmail.com',
      password: '123'
    },
    {
      name: 'nescar',
      mail: 'angel@gmail.com',
      password: '123'
    },
    {
      name: 'nahuel',
      mail: 'angel@gmail.com',
      password: '123'
    },
    {
      name: 'vicky',
      mail: 'angel@gmail.com',
      password: '123'
    },
    {
      name: 'enrique',
      mail: 'angel@gmail.com',
      password: '123'
    },
  ]
  public categories = ['Software', 'Medicine', 'Culture', 'Love', 'Math', 'Science', 'Software', 'Medicine', 'Culture', 'Love', 'Math', 'Science','Software', 'Medicine', 'Culture', 'Love', 'Math', 'Science'];
  public books: IBook[] = [
    {
      title: 'Un saco de huesos',
      author: 'Stephen King',
      year: 1998,
      price: 4.5,
      owner: this.users[5]
    },
    {
      title: 'It',
      author: 'Stephen King',
      year: 1998,
      price: 4.5,
      owner: this.users[1]

    },
    {
      title: 'Revival',
      author: 'Stephen King',
      year: 1998,
      price: 4.5,
      owner: this.users[2]

    },
    {
      title: 'Cujo',
      author: 'Stephen King',
      year: 1998,
      price: 4.5,
      owner: this.users[3]
    },
  ]
  public rentedBooks: IBook[] = [];
  public postedBooks: IBook[] = [];
  public books$ = new EventEmitter<IBook[]>();
  public currentBook = null;
  constructor(private _router: Router) { }


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
   * Set current book to rent.
   * @param book 
   */
  public rentBook(book: IBook): void{
    this.rentedBooks.push(book);
  }

  /**
   * Set current book to rent.
   * @param book 
   */
  public postBook(book: IBook): void{
    this.postedBooks.push(book);
  }

  /**
   * Clear current book.
   */
  public clearCurBook(): void {
    this.currentBook = null;
  }

  /**
   * Login to the app.
   * @param username 
   * @param password 
   */
  public login(username: string, password: string): Observable<boolean> {
    for (const user of this.users) {
      if (user.name === username && user.password === password) {
        localStorage.setItem('USER', JSON.stringify(user));
        this.currentUser = user;
        return of(true);
      } 
    }
    return of(false);
  }

  public clearUser(): void {
    this.currentUser = null;
  }

  /**
   * Logout of the app.
   * @param username 
   * @param password 
   */
  public logout(): void {
    localStorage.removeItem('USER')
    this._router.navigate(['/login']);
  }
}
