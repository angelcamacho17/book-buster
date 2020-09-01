import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService, IOrderArticle, OrderArticlesService, HeaderService, refreshOrderArticlesRequest } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { OrderItemsComponent } from '../order-items.component';
import { LayoutService } from '../../shared/services/layout.service';
import { ArticleSearchTabletComponent } from '../../article-search/article-search-tablet/article-search-tablet.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'order-items-tablet',
  templateUrl: './order-items-tablet.component.html',
  styleUrls: ['./order-items-tablet.component.scss']
})
export class OrderItemsTabletComponent extends OrderItemsComponent implements OnInit {

  @Output() confirmOrder = new EventEmitter<boolean>();

  constructor(public snackBar: MatSnackBar,
    public ordSer: OrderService,
    public store: Store<{ orderArticles: IOrderArticle[] }>,
    public ordArtsService: OrderArticlesService,
    public bottomSheet: MatBottomSheet,
    public router: Router,
    public headerService: HeaderService,
    public layoutService: LayoutService,
    public matDialog: MatDialog
    ) {
      super(snackBar, ordSer, store, ordArtsService, bottomSheet, router, headerService, layoutService );
      this.$articles = this.store.pipe(select('orderArticles'));

      this.listenToOrderArts();
      this.store.dispatch(refreshOrderArticlesRequest());

    }


    ngOnInit(): void { }

    /**
     * Open article search to add another article to the current order.
     */
    public openNewArticle(): void {
      const dialogRef = this.matDialog.open(ArticleSearchTabletComponent, {
        panelClass: 'no-padding-dialog',
        position: {
          top: '32px'
        },
        autoFocus: false,
        data: {
          firstButton: 'cancel'
        }
      });

      this._subscriptions.add(
        dialogRef.afterClosed().subscribe(data => {
        })
      );
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
      this.artToDelete.emit(price);
    }
}
