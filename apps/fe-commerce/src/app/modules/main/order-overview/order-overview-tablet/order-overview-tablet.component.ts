import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderOverviewComponent } from '../order-overview.component';
import { Store, select } from '@ngrx/store';
import {
  IOrder, IArticleLine, TranslationService, HeaderService, OrderService,
  getCurrentOrderRequest, AuthService
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
  private tempSubstraction = false;
  public vat = 0;

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
    super(store, snackBar, router, matDialog,
      transServ,headerService, orderService,
      layoutService, authService)

    this.currentOrder$ = this.store.pipe(select('currentOrder'));
    this.subscriptions.add(
      this.currentOrder$.subscribe((data: any) => {
        this.currentOrder = data;
        this.initials = this.getInitials();
      })
    );

    this.store.dispatch(getCurrentOrderRequest());
  }

  ngOnInit(): void {
    /* New order flow */
    this._newOrderFlow();
    this._articlesLoop();
    this._subscribeToHeader();

  }

  private _subscribeToHeader() {
    this.subscriptions.add(
      this.headerService.rightIconClicked
        .subscribe(() => this.logout())
    );
  }

  /**
   * Logout from the app.
   */
  public logout() {
    this.authService.logout();
  }

  /**
   * Listen to right icon click.
   */
  public subscribeToHeader() {
    this.subscriptions.add(
      this.headerService.rightIconClicked
        .subscribe(() => this.logout())
    );
  }

  /**
   * Kepp the dialog open to select multiple articles.
   */
  private _articlesLoop() {
    if (this.orderService.addingArticlesOnNewOrder) {
      const dialogData: DialogData = {
        firstButton: 'back',
        secondButton: 'next'
      }
      this._openNewArticle(dialogData);
    }
    this.orderService.addingArticlesOnNewOrder = false;
  }

  /**
   * Set state of the dialog for a new order.
   */
  private _newOrderFlow() {
    if (this.orderService.orderFlow === 'new' && !this.currentOrder) {
      const dialogData: DialogData = {
        firstButton: 'cancel',
      }
      this._openNewOrderCustomer(dialogData);
    } else if (this.orderService.orderFlow === 'new' && this.currentOrder) {
      this.orderService.addingArticlesOnNewOrder = true;
    }
  }

  /**
   * Handle go back navigation.
   */
  public goBackButton() {
    this.router.navigate(['/main/home']);
  }

  /**
   * Set article to delete, and substract to total price.
   * @param price
   */
  public setArtToDelete(price: number) {
    this.totalPrice = ((Math.round((this.totalPrice - price) * 100) / 100) > 0) ? Math.round((this.totalPrice - price) * 100) / 100 : 0;
    if (price !== 0) {
      this.tempSubstraction = true;
    } else {
      this.tempSubstraction = false;
    }

  }

  /**
   * Undo the artcle to delete, update price.
   * @param price
   */
  public undoDelete(price: number) {
    this.totalPrice = Math.round((this.totalPrice + price) * 100) / 100;
    this.tempSubstraction = false;
  }

  /* BEGIN Customer search functionality */
  /**
   * If the user doesnt select any customer and gets out of the dialog,
   * go back to home.
   */
  private _handleCancelCustomerAction() {
    if (!this.currentOrder) {
      this.router.navigate(['/main/home']);
    }
  }

  /**
   * Set next button in case the customer is already setted.
   */
  private _handleNextCustomerAction() {
    const dialogData: DialogData = {
      firstButton: 'back',
      secondButton: 'next'
    }
    this._openNewArticle(dialogData);
  }

  /**
   * Open new order customer search dialog.
   */
  private _openNewOrderCustomer(dialogData: DialogData): void {
    const customerDialogRef = this.matDialog.open(CustomerSearchTabletComponent, {
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
    const dialogRef = this.matDialog.open(ArticleSearchTabletComponent, {
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
  /**
   * Change customer to the current order.
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
          return;
        }
        if (data?.result === 'SWITCH') {
          this.orderService.switchCustomerFlow = true;
          this._openSwitchCustomer();
        }
      })
    );
  }

  /**
   * Open switch customer dialog.
   */
  private _openSwitchCustomer(): void {
    const dialogData: DialogData = {
      firstButton: 'cancel',
    }
    const dialogRef = this.matDialog.open(CustomerSearchTabletComponent, {
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
    // if (this.tempSubstraction) {
    //   this.orderConfirmed();
    // }
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

}
