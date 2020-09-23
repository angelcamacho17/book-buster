import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LayoutService } from '../../shared/services/layout.service';
import { BookSearchComponent } from '../book-search.component';

@Component({
  selector: 'book-search-tablet',
  templateUrl: './book-search-tablet.component.html',
  styleUrls: ['./book-search-tablet.component.scss']
})
export class BookSearchTabletComponent extends BookSearchComponent implements OnInit {

  constructor(layoutSer: LayoutService, snackBar: MatSnackBar) {
    super(layoutSer, snackBar);
   }

  ngOnInit(): void {
  }

}
