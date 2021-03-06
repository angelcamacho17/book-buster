import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IOrder, OrderService, HeaderService, TranslationService, clearCurrentOrderRequest, refreshOrdersRequest } from '@fecommerce-workspace/data';
import { HomeComponent } from '../home.component';
import { LayoutService } from '../../shared/services/layout.service';
import { MainService } from '../../main.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'home-tablet',
  templateUrl: './home-tablet.component.html',
  styleUrls: ['./home-tablet.component.scss']
})
export class HomeTabletComponent extends HomeComponent implements OnDestroy {
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
  }



  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
