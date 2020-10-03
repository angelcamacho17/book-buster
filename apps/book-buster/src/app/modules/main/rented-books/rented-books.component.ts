import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'rented-books',
  templateUrl: './rented-books.component.html',
  styleUrls: ['./rented-books.component.scss']
})
export class RentedBooksComponent implements OnInit, OnDestroy {

  public rentedBooks = [];
  constructor(public mainSer: MainService) { }
  
  ngOnInit(): void {
    for(const book of this.mainSer.books) {
      if(localStorage.getItem('RENTED_BOOKS_' + book.title + '_' + this.mainSer.currentUser.name)) {
        this.rentedBooks.push(JSON.parse(localStorage.getItem('RENTED_BOOKS_' + book.title + '_' + this.mainSer.currentUser.name)));
      }
    }
  }
  
  /**
   * Check rented book status.
   * @param book 
   */
  public checkBook(book) {
    
  }
  
  ngOnDestroy(): void {
    this.rentedBooks = [];
  }

}
