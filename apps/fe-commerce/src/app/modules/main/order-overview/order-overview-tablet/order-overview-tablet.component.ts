import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { OrderOverviewComponent } from '../order-overview.component';
import { Store, select } from '@ngrx/store';
import {
  IOrder, IOrderArticle, OrderArticlesService, BackNavigationService, TranslationService, HeaderService, OrderService,
  getCurrentOrderRequest, refreshOrderArticlesRequest, clearCurrentOrderRequest, handleOrderRequest, setOrderArticlesRequest,
  isUndefined
} from '@fecommerce-workspace/data-store-lib';
import { MatSnackBar, } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from '../../shared/services/layout.service';
import { CustomerSearchTabletComponent } from '../../customer-search/customer-search-tablet/customer-search-tablet.component';
import { DialogComponent, DialogData } from '../../shared/components/dialog/dialog.component';
import { ArticleSearchTabletComponent } from '../../article-search/article-search-tablet/article-search-tablet.component';
import { ConfirmDiscardDialogComponent } from '../../shared/components/confirm-discard/confirm-discard-dialog.component';

@Component({
  selector: 'order-overview-tablet',
  templateUrl: './order-overview-tablet.component.html',
  styleUrls: ['./order-overview-tablet.component.scss']
})
export class OrderOverviewTabletComponent extends OrderOverviewComponent implements OnInit, OnDestroy {

  public substractArt = 0;
  private _userWentBack = false;

  constructor(public store: Store<{ currentOrder: IOrder, orderArticles: IOrderArticle[] }>,
    public snackBar: MatSnackBar,
    public router: Router,
    private _matDialog: MatDialog,
    public ordArtsService: OrderArticlesService,
    public bnService: BackNavigationService,
    public transServ: TranslationService,
    public headerService: HeaderService,
    public orderService: OrderService,
    public layoutService: LayoutService,
    private ngZone: NgZone
  ) {
    super(store, snackBar, router, /* matDialog, */
      ordArtsService, bnService, transServ,
      headerService, orderService, layoutService)

    this.$articles = this.store.pipe(select('orderArticles'));
    this.subscriptions.add(
      this.$articles.subscribe((arts) => {
        this.articles = arts;
      })
    );

    this.currentOrder$ = this.store.pipe(select('currentOrder'));
    this.subscriptions.add(
      this.currentOrder$.subscribe(data => {
        this.currentOrder = data;
      })
    );

    this.store.dispatch(refreshOrderArticlesRequest());
    this.store.dispatch(getCurrentOrderRequest());

  }

  ngOnInit(): void {
    this.subscribeToHeader();
    /* New order flow */
    this._newOrderFlow();
  }

  private _newOrderFlow() {
    if (this.orderService.orderFlow === 'new' && !this.currentOrder) {
      this.store.dispatch(setOrderArticlesRequest({ orderArticles: [] }));

      const dialogData: DialogData = {
        firstButton: 'cancel',
      }
      this._openNewOrderCustomer(dialogData);
    }
  }

  private _confirmDiscardDialog() {
    let message;

    if (this.currentOrder?.articles?.length) {
      message = this.transServ.get('progressord');
    } else {
      message = this.transServ.get('noarts');
    }
    const dialogRef = this._matDialog.open(ConfirmDiscardDialogComponent, {
      data: {
        title: this.transServ.get('saveord'),
        message,
        firstBtn: this.transServ.get('discard'),
        secondBtn: this.transServ.get('save')
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(handleOrderRequest({ order: this.currentOrder }));
      }
      this.store.dispatch(clearCurrentOrderRequest())
      const orderArticles = [];
      this.store.dispatch(setOrderArticlesRequest({ orderArticles }));
      this.router.navigate(['/main/home']);
    });
  }
  goBackButton() {
    if (this.orderService.orderFlow === 'new' && this.currentOrder) {
      this._confirmDiscardDialog();
    } else {
      this.router.navigate(['/main/home']);
    }
  }
  public getTotal(): number {
    let total = this.ordArtsService.getTotal() - this.substractArt;
    total = Math.round(total * 100) / 100;
    return total > 0 ? total : 0;
  }

  public setArtToDelete(price: number) {
    this.substractArt = price;
  }

  /* BEGIN Customer search functionality */
  private _handleCancelCustomerAction() {
    if (!this.currentOrder) {
      this.router.navigate(['/main/home']);
    }
  }

  private _handleNextCustomerAction() {
    const dialogData: DialogData = {
      firstButton: 'back',
      secondButton: 'next'
    }
    this._openNewArticle(dialogData);
  }
  private _openNewOrderCustomer(dialogData: DialogData): void {
    this.ngZone.run(() => {
      const customerDialogRef = this._matDialog.open(CustomerSearchTabletComponent, {
        panelClass: 'no-padding-dialog',
        position: {
          top: '32px'
        },
        autoFocus: false,
        data: dialogData
      });

      this.subscriptions.add(
        customerDialogRef.afterClosed().subscribe((data) => {
          if (data?.action === 'next') {
            this._handleNextCustomerAction();
          } else {
            this._handleCancelCustomerAction();
          }
        })
      );
    });
  }
  /* END Customer search functionality */

  /* BEGIN Article search functionality */
  private _handleNextArticleAction() {
    // this.matDialog.closeAll();
  }

  private _handleBackArticleAction() {
    this._userWentBack = true;
    // this.matDialog.closeAll();

    const dialogData: DialogData = {
      firstButton: 'cancel',
      secondButton: 'next'
    }
    this._openNewOrderCustomer(dialogData);
  }

  private _openNewArticle(dialogData: DialogData): void {
    const dialogRef = this._matDialog.open(ArticleSearchTabletComponent, {
      panelClass: 'no-padding-dialog',
      position: {
        top: '32px'
      },
      autoFocus: false,
      data: dialogData
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result?.action === 'next') {
          this._handleNextArticleAction();
        }
        if (result?.action === 'back') {
          this._handleBackArticleAction();
        }
      })
    );
  }
  /* END Article search functionality */


  /* BEGIN Switch customer functionality */
  public changeCustomer(): void {
    const dialogRef = this._matDialog.open(DialogComponent, {
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
        if (isUndefined(data)) {
          return;
        }
        if (data?.result === 'SWITCH') {
          this.orderService.switchCustomerFlow = true;
          this._openSwitchCustomer();
        }
      })
    );
  }
  private _openSwitchCustomer(): void {
    const dialogData: DialogData = {
      firstButton: 'cancel',
    }
    const dialogRef = this._matDialog.open(CustomerSearchTabletComponent, {
      panelClass: 'no-padding-dialog',
      position: {
        top: '32px'
      },
      autoFocus: false,
      data: dialogData
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe()
    );
  }
  /* END Switch customer functionality */

  ngOnDestroy(): void {
    //If the time of the snackbar
    //hasnt past yet, and the user wnats tyo go back
    //delete the article and dismiss snackbar
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

}
