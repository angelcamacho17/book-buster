import { Route } from '@angular/compiler/src/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IBook } from '../../../../../../models/book.model';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { MainService } from '../../../../main.service';

@Component({
  selector: 'book-row',
  templateUrl: './book-row.component.html',
  styleUrls: ['./book-row.component.scss']
})
export class BookRowComponent implements OnInit {
  @Input() item: IBook;
  @Output() selected = new EventEmitter<IBook>();
  public smaller: Observable<boolean>;
  public initials = '';
  private _subscriptions = new Subscription();
  constructor(private _mainSer: MainService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Set book selected
   */
  public bookSelected(): void{
    console.log('==-------------------------');
    console.log('==-------------------------');
    this._mainSer.setCurrentBook(this.item);
    console.log(this.item);
    console.log('==-------------------------');
    console.log('==-------------------------');
    if (this._mainSer.checkTrans) {
      if (this._router.url.includes('post')) {
        this._router.navigate(['/main/post-detail/' + this.item.id])
      }
      else {
        this._router.navigate(['/main/rent-detail/' + this.item.id])
      }

    } else {
      this._router.navigate(['/main/book-to-rent'])
    }
  }

}
