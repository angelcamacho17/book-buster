import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Order, getCurrentOrderRequest } from '@fecommerce-workspace/data-store-lib';
import { Customer } from '@fecommerce-workspace/data-store-lib';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'fe-order',
  templateUrl: './fe-order.component.html',
  styleUrls: ['./fe-order.component.scss']
})
export class FeOrderComponent implements OnInit {

  public $order: Observable<Order>;
  public order: Order;
  private _subs: Subscription;

  constructor(private _store: Store<{currentOrder: Order}>,
              private _snackBar: MatSnackBar,
              private _router: Router) {
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
        duration: 3000,
      });
  }

}
