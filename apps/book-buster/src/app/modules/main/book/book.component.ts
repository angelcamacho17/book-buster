import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(public mainSer: MainService) { }
  
  ngOnInit(): void {
    this.book = this.mainSer.currentBook;
  }
  
  ngOnDestroy(): void {
    this.mainSer.clearCurBook();
  }

}
