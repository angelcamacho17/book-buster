import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'post-books',
  templateUrl: './post-books.component.html',
  styleUrls: ['./post-books.component.scss']
})
export class PostBooksComponent implements OnInit {
  public posted = [];

  constructor(public mainSer: MainService) {
    for(const book of this.mainSer.books){
      if (book.owner === this.mainSer.currentUser)
        this.posted.push(book);
    }
   }

  /**
   * Check rented book status.
   * @param book 
   */
  public checkBook(book) {
    
  }

  ngOnInit(): void {
  }

}
