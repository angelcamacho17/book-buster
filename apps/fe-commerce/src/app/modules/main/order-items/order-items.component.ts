import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription, of, merge } from 'rxjs';
import { IArticleLine, OrderService, HeaderService, IOrder, deleteArticleLineFromOrderRequest } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ArtSheetComponent } from '../shared/components/art-sheet/art-sheet.component';
import { Router } from '@angular/router';
import { LayoutService } from '../shared/services/layout.service';

@Component({
  selector: 'order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.scss']
})
export class OrderItemsComponent implements OnInit, OnDestroy {

  public currentOrder$: Observable<IOrder>;
  public currentOrder: IOrder = null;
  public items: any = [];
  public initialPos = { x: 0, y: 0 };
  public subscriptions = new Subscription();
  public horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  public showDeleteBtn = false;

  constructor(
    public snackBar: MatSnackBar,
    public orderService: OrderService,
    public store: Store<{ currentOrder: IOrder }>,
    public bottomSheet: MatBottomSheet,
    public router: Router,
    public headerService: HeaderService,
    public layoutService: LayoutService
  ) { }


  ngOnInit(): void { }

  /**
   * Subscribes to the currentOrder to show the updated articlesLines.
   */
  public subscribeToCurrentOrder(): void {
    this.currentOrder$ = this.store.pipe(select('currentOrder'));
    this.subscriptions.add(
      this.currentOrder$.subscribe((data: any) => {
        this.currentOrder = data;
      })
    );
  }

  /**
   * Open bottom sheet of the article detail.
   * @param articleLine
   */
  public openBottomSheet(articleLine: IArticleLine): void {
    const article = articleLine.article;
    this.snackBar.dismiss();
    const bottomSheetRef = this.bottomSheet.open(ArtSheetComponent, {
      data: { article },
    });

    this.subscriptions.add(
      bottomSheetRef.afterDismissed().subscribe((action) => {
        if (action === 'delete') {
          this.deleteArticle(articleLine);
        }
      })
    );
  }

  /**
   * Delete the article permantly.
   * @param articleLine
   */
  public deleteArticle(articleLine: IArticleLine): void {
    const orderId = this.currentOrder.uuid;
    this.store.dispatch(deleteArticleLineFromOrderRequest({ orderId, articleLineId: articleLine.uuid }));
    
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
