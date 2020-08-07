import { Component, OnInit } from '@angular/core';
import { MainHeaderComponent } from '../main-header.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslationService, IHeader, HeaderService } from '@fecommerce-workspace/data-store-lib';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'main-header-mobile',
  templateUrl: './main-header-mobile.component.html',
  styleUrls: ['./main-header-mobile.component.scss']
})
export class MainHeaderMobileComponent extends MainHeaderComponent implements OnInit {

  constructor(public router: Router,
    public dialog: MatDialog,
    public translationService: TranslationService,
    public store: Store<{ header: IHeader }>,
    public headerService: HeaderService,
    public layoutService: LayoutService
    ) {
    super(router, dialog, translationService, store, headerService, layoutService);
  }

  ngOnInit(): void {
  }

}
