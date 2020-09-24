import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderOverviewComponent } from '../order-overview.component';
import { Store, select } from '@ngrx/store';
import { IOrder, IArticleLine, TranslationService, HeaderService, OrderService, getCurrentOrderRequest, AuthService } from '@fecommerce-workspace/data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from '../../shared/services/layout.service';

@Component({
  selector: 'order-overview-mobile',
  templateUrl: './order-overview-mobile.component.html',
  styleUrls: ['./order-overview-mobile.component.scss']
})
export class OrderOverviewMobileComponent extends OrderOverviewComponent implements OnInit, OnDestroy {

  // To avoid clinch on init screen.
  public initState = false;

  constructor(public store: Store<{ currentOrder: IOrder, orderArticles: IArticleLine[] }>,
    public snackBar: MatSnackBar,
    public router: Router,
    public matDialog: MatDialog,
    public transServ: TranslationService,
    public headerService: HeaderService,
    public orderService: OrderService,
    public layoutService: LayoutService,
    public authService: AuthService
  ) {
    super(store, snackBar, router, matDialog, transServ,
      headerService, orderService, layoutService, authService)
      this.initState = false;
      setTimeout(()=>{
        if (!this.currentOrder) {
          this.loading = true;
        }
        this.initState = true;
      })

    this.subscriptions.add(
      this.headerService.rightIconClicked
        .subscribe(() => this.deleteOrder())
    );

    this.subscriptions.add(
      this.headerService.goBack
        .subscribe(() => this.goBack())
    );

    this.currentOrder$ = this.store.pipe(select('currentOrder'));
    this.subscriptions.add(
      this.currentOrder$.subscribe((data: any) => {
        this.currentOrder = data;
        this.initials = this.getInitials()
        this.loading = false;
      })
    );

    this.store.dispatch(getCurrentOrderRequest());
  }

  ngOnInit(): void {
  }
}
