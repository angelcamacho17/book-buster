import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IBook } from '../../models/book.model';
import { IUser } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  public currentUser: IUser = JSON.parse(localStorage.getItem('USER'));
  public checkTrans = false;
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
  public categories = ['Software', 'Culture', 'Love', 'Math', 'Science'];
  public books: IBook[] = [
    {
      id: 1,
      title: 'Un saco de huesos',
      author: 'Stephen King',
      year: 1998,
      price: 4.5,
      owner: this.users[5],
      img: 'assets/img/saco_de_huesos.jpg'

    },
    {
      id: 2,
      title: 'It',
      author: 'Stephen King',
      year: 1998,
      price: 4.5,
      owner: this.users[1],
      img: 'assets/img/it.jpg'

    },
    {
      id: 3,
      title: 'Revival',
      author: 'Stephen King',
      year: 1998,
      price: 4.5,
      owner: this.users[2],
      img: 'assets/img/revival.jpg'

    },
    {
      id: 4,
      title: 'Cujo',
      author: 'Stephen King',
      year: 1998,
      price: 4.5,
      owner: this.users[3],
      img: 'assets/img/cujo.jpg'
    },
    {
      id: 5,
      title: 'Algebra de Baldor',
      author: 'Baldor',
      year: 1998,
      price: 4.5,
      owner: this.users[3],
      img: 'assets/img/baldor.jpg'
    },

    {
      id: 6,
      title: 'Lo inconsciente',
      author: 'Sigmund Freud',
      year: 1998,
      price: 4.5,
      owner: this.users[3],
      img: 'assets/img/freud.jpg'
    },

    {
      id: 6,
      title: 'Ingenieria de Software',
      author: 'Sommerville',
      year: 1998,
      price: 4.5,
      owner: this.users[3],
      img: 'assets/img/sommerville.jpg'
    },

    {
      id: 7,
      title: 'Arquitectura del computador',
      author: 'Alcalde',
      year: 1998,
      price: 4.5,
      owner: this.users[3],
      img: 'assets/img/arquitectura.jpg'
    },

    {
      id: 8,
      title: 'La relativilidad',
      author: 'Albert Einstein',
      year: 1998,
      price: 4.5,
      owner: this.users[3],
      img: 'assets/img/relativo.jpg'
    },

    {
      id: 9,
      title: 'Etica de la profesion docente',
      author: 'Christine Wanjru',
      year: 1998,
      price: 4.5,
      owner: this.users[3],
      img: 'assets/img/etica.jpg'
    },

    {
      id: 10,
      title: 'Fisica',
      author: 'Tippens',
      year: 1998,
      price: 4.5,
      owner: this.users[3],
      img: 'assets/img/fisica.jpg'
    },
    
  ]
  public rentedBooks: IBook[] = [];
  public postedBooks: IBook[] = [];
  public books$ = new EventEmitter<IBook[]>();
  public currentBook = null;
  constructor(private _router: Router,
              private _snackBar: MatSnackBar) { }


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
    book.rentedBy = this.currentUser;
    localStorage.setItem('RENTED_BOOKS_' + book.title + '_' + this.currentUser.name, JSON.stringify(book));
    const snackRef = this._snackBar.open('You just rent ' + book.title + '!', 'CHECK OUT')
    snackRef.afterDismissed().subscribe((res) => {
      if (res.dismissedByAction) {
        this._router.navigate(['main/rented'])
      }
    })
    this._router.navigate(['main/home']);
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
    if (localStorage.getItem('NEW_USER_' + username)) {
      const newUser = JSON.parse(localStorage.getItem('NEW_USER_' + username));
      if (newUser.password === password) {
        localStorage.setItem('USER', localStorage.getItem('NEW_USER_' + username));
        this.currentUser = JSON.parse(localStorage.getItem('NEW_USER_' + username));
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
