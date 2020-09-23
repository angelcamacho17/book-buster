import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LayoutService } from '../../shared/services/layout.service';
import { BookSearchComponent } from '../book-search.component';

@Component({
  selector: 'book-search-mobile',
  templateUrl: './book-search-mobile.component.html',
  styleUrls: ['./book-search-mobile.component.scss']
})
export class BookSearchMobileComponent extends BookSearchComponent implements OnInit {

  constructor(layoutSer: LayoutService, snackBar: MatSnackBar) {
    super(layoutSer, snackBar);
   }

  ngOnInit(): void {
  }

}
