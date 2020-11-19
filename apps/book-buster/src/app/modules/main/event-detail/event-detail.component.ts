import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBook } from '../../../models/book.model';
import { MainService } from '../main.service';

@Component({
  selector: 'event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  public book: IBook = null;
  constructor(
    private route: ActivatedRoute,
    private mainSer: MainService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.id) {
        console.log(params.id === 3)
        console.log(this.mainSer.books.filter(book => book.id == params.id))
        this.book = this.mainSer.books.filter(book => book.id == params.id)[0];
        console.log('my book ', this.book);
      }
    })
  }

}
