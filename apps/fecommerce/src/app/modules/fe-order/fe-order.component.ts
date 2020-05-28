import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Order, getCurrentOrderRequest, OrderArticle, appendOrderRequest } from '@fecommerce-workspace/data-store-lib';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FeDialogComponent } from '../shared/components/fe-dialog/fe-dialog.component';
import { isUndefined } from 'util';

@Component({
  selector: 'fe-order',
  templateUrl: './fe-order.component.html',
  styleUrls: ['./fe-order.component.scss']
})
export class FeOrderComponent implements OnInit, OnDestroy {

  public order$: Observable<Order>;
  public order: Order;
  public orderArticles$: Observable<OrderArticle[]>;
  public orderArticle: OrderArticle[];
  private _subscriptions = new Subscription();

  constructor(
    private _store: Store<{ currentOrder: Order }>,
    private _snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog
  ) {

    this.order$ = this._store.pipe(select('currentOrder'));
    this._subscriptions.add(this.order$.subscribe(data => {
      this.order = data;
    }));
    this._store.dispatch(getCurrentOrderRequest());

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }

  public orderConfirmed(): void {
    if (isUndefined(this.order?.id) || this.order?.id == null) {
      this._store.dispatch(appendOrderRequest({ order: this.order }));
      const msg = 'Order succesfully confirmed';
      this._snackBar.open(msg, '', {
        duration: 5000,
      });
    }

    this._router.navigate(['/home']);
  }

  public changeCustomer(): void {
    const dialogRef = this.dialog.open(FeDialogComponent, {
      width: '280px',
      height: '248px',
      data: {
        title: 'Switch customer',
        msg: 'Customer specific prices will be recalculated after asssigning a new customer.',
        firstButton: 'CANCEL',
        secondButton: 'SWITCH'
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (isUndefined(data)) {
        // Is undefined when the user closes
        // the dialog without an action
        return;
      }
      if (data?.result === 'SWITCH') {
        this._router.navigate(['/neworder'], { queryParams: { lastUrl: 'order'}});
      }
    });
  }

  public openItems(): void {
    this._router.navigate(['/orderitems']);
  }

  public returnUrl(): void {
    this._router.navigate(['/home']);
  }

}
