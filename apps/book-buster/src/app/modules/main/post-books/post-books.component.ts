import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBook } from '../../../models/book.model';
import { MainService } from '../main.service';
import { BookRowComponent } from '../shared/components/row/book-row/book-row.component';

@Component({
  selector: 'post-books',
  templateUrl: './post-books.component.html',
  styleUrls: ['./post-books.component.scss']
})
export class PostBooksComponent implements OnInit, OnDestroy {
  public posted = [];
  public rowType = BookRowComponent;

  constructor(public mainSer: MainService, private router: Router) {
    
   }
  ngOnDestroy(): void {
    

    this.mainSer.checkTrans = false;

  }

  /**
   * Check rented book status.
   * @param book 
   */
  public checkBook(book: IBook) {
    console.log(book)
    this.router.navigate(['main/post-detail/' + book.id])
  }

  ngOnInit(): void {
    for(const book of this.mainSer.books) {
      if(localStorage.getItem('POSTED_BOOKS_' + book.title + '_' + this.mainSer.currentUser.name)) {
        console.log(book);
        this.posted.push(JSON.parse(localStorage.getItem('POSTED_BOOKS_' + book.title + '_' + this.mainSer.currentUser.name)));
      }
    }
    this.mainSer.checkTrans = true;

  }

}
