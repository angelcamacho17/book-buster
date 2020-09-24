import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IBook } from '@fecommerce-workspace/data';
import { Store } from '@ngrx/store';
import { LayoutService } from '../../shared/services/layout.service';
import { BookSearchComponent } from '../book-search.component';

@Component({
  selector: 'book-search-tablet',
  templateUrl: './book-search-tablet.component.html',
  styleUrls: ['./book-search-tablet.component.scss']
})
export class BookSearchTabletComponent extends BookSearchComponent implements OnInit {

  constructor(layoutSer: LayoutService, 
    snackBar: MatSnackBar,
    store: Store<{ books: IBook[], currentBook: IBook }>,
) {
super(layoutSer, snackBar, store);
}

  ngOnInit(): void {
  }

}
