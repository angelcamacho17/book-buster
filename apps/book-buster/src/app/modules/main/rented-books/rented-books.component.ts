import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'rented-books',
  templateUrl: './rented-books.component.html',
  styleUrls: ['./rented-books.component.scss']
})
export class RentedBooksComponent implements OnInit {

  constructor(public mainSer: MainService) { }

  ngOnInit(): void {
  }

  /**
   * Check rented book status.
   * @param book 
   */
  public checkBook(book) {

  }

}
