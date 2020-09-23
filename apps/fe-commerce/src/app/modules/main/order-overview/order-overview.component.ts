import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  HeaderService, IOrder, IArticleLine,
  TranslationService, deleteOrderRequest,
  OrderService, setCurrentOrderRequest, AuthService
} from '@fecommerce-workspace/data-store-lib';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { ConfirmDiscardDialogComponent } from '../shared/components/confirm-discard/confirm-discard-dialog.component';
import { LayoutService } from '../shared/services/layout.service';

@Component({
  selector: 'order-overview',
  templateUrl: './order-overview.component.html',
  styleUrls: ['./order-overview.component.scss']
})
export class OrderOverviewComponent implements OnInit, OnDestroy, AfterViewInit {
  public currentOrder$: Observable<IOrder>;
  public currentOrder: IOrder;
  public orderArticles: IArticleLine[] = [];
  public orderArticles$: Observable<IArticleLine[]>;
  public subscriptions = new Subscription();
  public totalPrice = 0;
  public initials = '';
  public loading = true;

  constructor(
    public store: Store<{ currentOrder: IOrder, orderArticles: IArticleLine[] }>,
    public snackBar: MatSnackBar,
    public router: Router,
    public matDialog: MatDialog,
    public transServ: TranslationService,
    public headerService: HeaderService,
    public orderService: OrderService,
    public layoutService: LayoutService,
    public authService: AuthService
  ) { }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.orderService.switchCustomerFlow = false;    // Reset flag of customer flow.
  }

  /**
   * Delete the current order.
   */
  public deleteOrder() {
    const dialogRef = this.matDialog.open(DialogComponent, {
      panelClass: 'no-padding-dialog',
      width: '280px',
      height: '120px',
      data: {
        msg: this.transServ.get('deleteord'),
        firstButton: this.transServ.get('cancel'),
        secondButton: this.transServ.get('delete'),
        buttonColor: 'red'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data === undefined) {
        // Is undefined when the user closes
        // the dialog without an action
        return;
      }
      if (data?.result === 'DELETE') {
        this.store.dispatch(deleteOrderRequest());
        this.router.navigate(['/home']);
      }
    });
  }

  /**
   * On order confirmed.
   */
  public orderConfirmed(): void {
    const msg = this.transServ.get('orderConfirmed');
    this.snackBar.open(msg, '', {
      duration: 5000,
    });
    this.router.navigate(['/home']);

  }

  /**
   * Get updated order with updated articles.
   */
  public getUpdatedOrder(): IOrder {
    const order: IOrder = {
      uuid: this.currentOrder?.uuid,
      documentNr: this.currentOrder?.documentNr,
      articlesLines: this.orderArticles,
      total: this.currentOrder?.total,
      customer: this.currentOrder?.customer,
      created: this.currentOrder?.created
    };
    return order;
  }

  /**
   * Change customer dialog.
   */
  public changeCustomer(): void {
    const dialogRef = this.matDialog.open(DialogComponent, {
      width: '280px',
      height: '248px',
      data: {
        title: this.transServ.get('switchcus'),
        msg: this.transServ.get('switchcusmes'),
        firstButton: this.transServ.get('cancel'),
        secondButton: this.transServ.get('switch'),
        buttonColor: 'blue'
      }
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe(data => {
        if (data === undefined) {
          // Is undefined when the user closes
          // the dialog without an action
          return;
        }
        if (data?.result === 'SWITCH') {
          this.orderService.switchCustomerFlow = true;
          this.router.navigate(['/main/customer-search'])
        }
      })
    );
  }

  /**
   * Go to order items.
   */
  public openItems(): void {
    this.router.navigate(['/main/order-items']);
  }

  /**
   * Return to home.
   */
  public returnUrl(): void {
    this.router.navigate(['/main/home']);
  }

  /**
   * Go back and handle if there is a current order.
   */
  public goBack() {
    this.returnUrl();
  }

  /**
   * Open confirm/discard current order.
   */
  public openConfirmDialog() {
    const message = this.transServ.get('progressord');
    const dialogRef = this.matDialog.open(ConfirmDiscardDialogComponent, {
      panelClass: 'no-padding-dialog',
      data: {
        title: this.transServ.get('saveord'),
        message,
        firstBtn: this.transServ.get('discard'),
        secondBtn: this.transServ.get('save')
      }
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          this.store.dispatch(setCurrentOrderRequest({ order: this.currentOrder }));
          this.returnUrl();
        } else if (result === false) {
          this.returnUrl();
        }
      })
    );
  }

  /**
   * get initials per customer.
   */
  public getInitials(): string {
    const fullName = this.currentOrder?.customer?.name;
    if (fullName) {
      const name: string[] = fullName.split(' ');
      let initials: string;
      if (name?.length > 2) {
        initials = `${this.getChar(name[0], 0)}${this.getChar(name[1], 0)}${this.getChar(name[2], 0)}`;
      } else if (name?.length > 1) {
        initials = `${this.getChar(name[0], 0)}${this.getChar(name[1], 0)}`;
      } else {
        initials = `${this.getChar(name[0], 0)}`;
      }
      return initials.toUpperCase();
    }
  }

  /**
   * Get first letter.
   * @param text
   * @param index
   */
  private getChar(text: string, index: number) {
    return text.charAt(index);
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

}
