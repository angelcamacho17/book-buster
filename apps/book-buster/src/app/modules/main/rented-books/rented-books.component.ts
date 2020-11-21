import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { BookRowComponent } from '../shared/components/row/book-row/book-row.component';

@Component({
  selector: 'rented-books',
  templateUrl: './rented-books.component.html',
  styleUrls: ['./rented-books.component.scss']
})
export class RentedBooksComponent implements OnInit, OnDestroy {

  public rentedBooks = [];
  public rowType = BookRowComponent;

  constructor(public mainSer: MainService) { }
  
  ngOnInit(): void {
    for(const book of this.mainSer.books) {
      if(localStorage.getItem('RENTED_BOOKS_' + book.title + '_' + this.mainSer.currentUser.name)) {
        this.rentedBooks.push(JSON.parse(localStorage.getItem('RENTED_BOOKS_' + book.title + '_' + this.mainSer.currentUser.name)));
      }
    }
    this.mainSer.checkTrans = true;
  }
  
  /**
   * Check rented book status.
   * @param book 
   */
  public checkBook(book) {
    
  }
  
  ngOnDestroy(): void {
    this.rentedBooks = [];
    this.mainSer.checkTrans = false;

  }

}
