import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Router } from '@angular/router';
import { IBook } from '../../../models/book.model';

@Component({
  selector: 'rent-book',
  templateUrl: './rent-book.component.html',
  styleUrls: ['./rent-book.component.scss']
})
export class RentBookComponent implements OnInit, OnDestroy {

  public book: IBook = null;
  public total = 50;
  
  constructor(public mainSer: MainService, public _router: Router) { }
  
  ngOnInit(): void {
    this.book = this.mainSer.currentBook;
  }

  public letsRent() {
    this._router.navigate(['/main/home'])
  }
  
  public myFilter(d: Date | null): boolean {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  ngOnDestroy(): void {
  }

}
