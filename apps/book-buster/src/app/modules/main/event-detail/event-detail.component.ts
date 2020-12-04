import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    public router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.book = this.mainSer.books.filter(book => book.id == params.id)[0];
      }
    })
  }

}
