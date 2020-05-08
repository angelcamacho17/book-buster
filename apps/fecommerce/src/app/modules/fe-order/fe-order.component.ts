import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Order, getCurrentOrderRequest, clearCurrentOrderRequest } from '@fecommerce-workspace/data-store-lib';
import { Customer } from '@fecommerce-workspace/data-store-lib';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FeDialogComponent } from '../shared/components/fe-dialog/fe-dialog.component';

@Component({
  selector: 'fe-order',
  templateUrl: './fe-order.component.html',
  styleUrls: ['./fe-order.component.scss']
})
export class FeOrderComponent implements OnInit, OnDestroy {

  public $order: Observable<Order>;
  public order: Order;
  private _subs: Subscription;

  constructor(private _store: Store<{currentOrder: Order}>,
              private _snackBar: MatSnackBar,
              private _router: Router,
              public dialog: MatDialog) {
    this.$order = this._store.pipe(select('currentOrder'));
    this._subs = this.$order.subscribe(data => {
      this.order = data;
    })

    this._store.dispatch(getCurrentOrderRequest());
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if(this._subs) {
      this._subs.unsubscribe();
    }
  }

  public orderConfirmed(): void {
    this._router.navigate(['/home']);
    const msg = 'Order succesfully confirmed';
      this._snackBar.open(msg, '', {
        duration: 300,
      });
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
      if(data.result === 'SWITCH') {
        this._router.navigate(['/neworder', {order: this.order}]);
      }
    });
  }

}
