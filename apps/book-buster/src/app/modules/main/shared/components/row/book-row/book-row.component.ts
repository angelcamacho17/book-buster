import { Component, Input, OnInit } from '@angular/core';
import { IBook } from '@fecommerce-workspace/data';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'book-row',
  templateUrl: './book-row.component.html',
  styleUrls: ['./book-row.component.scss']
})
export class BookRowComponent implements OnInit {
  @Input() item: IBook;
  public smaller: Observable<boolean>;
  public initials = '';
  private _subscriptions = new Subscription();
  constructor() { }

  ngOnInit(): void {
  }

}
