import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService, HeaderService, IOrder } from '@fecommerce-workspace/data-store-lib';
import { Store } from '@ngrx/store';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { OrderItemsComponent } from '../order-items.component';
import { LayoutService } from '../../shared/services/layout.service';
import { ArticleSearchTabletComponent } from '../../article-search/article-search-tablet/article-search-tablet.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../../shared/components/dialog/dialog.component';

@Component({
  selector: 'order-items-tablet',
  templateUrl: './order-items-tablet.component.html',
  styleUrls: ['./order-items-tablet.component.scss']
})
export class OrderItemsTabletComponent extends OrderItemsComponent implements OnInit, OnDestroy {

  @Output() confirmOrder = new EventEmitter<boolean>();

  constructor(public snackBar: MatSnackBar,
    public orderService: OrderService,
    public store: Store<{ currentOrder: IOrder }>,
    public bottomSheet: MatBottomSheet,
    public router: Router,
    public headerService: HeaderService,
    public layoutService: LayoutService,
    public matDialog: MatDialog
  ) {
    super(snackBar, orderService, store, bottomSheet, router, headerService, layoutService);

    this.subscribeToCurrentOrder();

  }

  ngOnInit(): void {

  }

  /**
   * Open article search to add another article to the current order.
   */
  public openNewArticle(): void {
    const dialogData: DialogData = {
      secondButton: 'next'
    }

    const dialogRef = this.matDialog.open(ArticleSearchTabletComponent, {
      panelClass: 'no-padding-dialog',
      position: {
        top: '32px'
      },
      autoFocus: false,
      data: dialogData
    });

    // this._subscriptions.add(
    //   dialogRef.afterClosed().subscribe(data => {
    //   })
    // );
  }

  /**
   * Emit event to confirm order.
   */
  public orderConfirmed(): void {
    this.confirmOrder.emit(true);
  }

  /**
   * Emit total price of the article to delete.
   * @param price
   */
  public onArtToDelete(price: number): void {
    // this.artToDelete.emit(price);
  }

  ngOnDestroy(): void {
    // If the time of the snackbar
    // hasnt past yet, and the user wnats tyo go back
    // delete the article and dismiss snackbar
    this.matDialog.closeAll();
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
