import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBook } from '@fecommerce-workspace/data';
import { isThisTypeNode } from 'typescript';
import { MainService } from '../main.service';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy {

  public book: IBook = null;

  constructor(public mainSer: MainService, private _rotuer: Router) { }
  
  ngOnInit(): void {
    this.book = this.mainSer.currentBook;
  }

  /**
   * rentThisBook
  */
  public rentThisBook() {
    this._rotuer.navigate(['main/rent-book']);
  }
  
  ngOnDestroy(): void {
    //this.mainSer.clearCurBook();
  }

}
