import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IBook, refreshBooksRequest } from '@fecommerce-workspace/data';
import { select, Store } from '@ngrx/store';
import { LayoutService } from '../../shared/services/layout.service';
import { BookSearchComponent } from '../book-search.component';

@Component({
  selector: 'book-search-mobile',
  templateUrl: './book-search-mobile.component.html',
  styleUrls: ['./book-search-mobile.component.scss']
})
export class BookSearchMobileComponent extends BookSearchComponent implements OnInit, OnDestroy {

  constructor(layoutSer: LayoutService, 
              snackBar: MatSnackBar,
              store: Store<{ books: IBook[], currentBook: IBook }>,
    ) {
    super(layoutSer, snackBar, store);

    this.books$ = this.store.pipe(select('books'));
    this.subscriptions.add(
      this.books$.subscribe((data: any) => {
        this.loading = false;
        if (data.length === 0 || data.length === undefined) {
          this.emptyResults = true;
        } else {
          this.emptyResults = false;
        }
        this.filteredResults = data;
        this.books = data;
      })
    );
   }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
