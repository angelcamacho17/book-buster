import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { OrderService, IOrder, HeaderService, TranslationService } from '@fecommerce-workspace/data';
import { HomeComponent } from '../home.component';
import { LayoutService } from '../../shared/services/layout.service';
import { MainService } from '../../main.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'home-mobile',
  templateUrl: './home-mobile.component.html',
  styleUrls: ['./home-mobile.component.scss']
})
export class HomeMobileComponent extends HomeComponent implements OnDestroy {
  constructor(
    public router: Router,
    public orderService: OrderService,
    public translationService: TranslationService,
    public headerService: HeaderService,
    public layoutService: LayoutService,
    public mainSer: MainService,
    public snackBar: MatSnackBar
  ) {
    super(
      router,
      orderService,
      translationService,
      headerService,
      layoutService,
      mainSer,
      snackBar
    );
    this.subscriptions.add(
      this.headerService.rightIconClicked
      .subscribe(() => this.logout())
    );
    this.subscriptions.add(
      this.mainSer.books$.subscribe((data: any) => {
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
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
