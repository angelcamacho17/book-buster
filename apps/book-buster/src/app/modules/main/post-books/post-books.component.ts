import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBook } from '../../../models/book.model';
import { MainService } from '../main.service';

@Component({
  selector: 'post-books',
  templateUrl: './post-books.component.html',
  styleUrls: ['./post-books.component.scss']
})
export class PostBooksComponent implements OnInit {
  public posted = [];

  constructor(public mainSer: MainService, private router: Router) {
    for(const book of this.mainSer.books){
      if (book.owner === this.mainSer.currentUser)
        this.posted.push(book);
    }
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
  }

}
