import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Order, getCurrentOrderRequest, deleteOrderArticleRequest, OrderArticle, refreshOrderArticlesRequest } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FeConfirmDiscardDialogComponent } from '../shared/components/fe-confirm-discard/fe-confirm-discard-dialog.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'fe-order-items',
  templateUrl: './fe-order-items.component.html',
  styleUrls: ['./fe-order-items.component.scss']
})
export class FeOrderItemsComponent implements OnInit, OnDestroy {

  public $articles: Observable<OrderArticle[]>;
  public articles: OrderArticle[] ;
  public items: any = [];
  public initialPos = { x: 0, y: 0};
  private _subscriptions = new Subscription();
  public totalAmount = 0;
  public artRecentlyDeleted = false;

  constructor(
    private _snackBar: MatSnackBar,
    private _store: Store<{ orderArticles: OrderArticle[] }>) {
    this.$articles = this._store.pipe(select('orderArticles'));
    this._subscriptions.add(this.$articles.subscribe(data => {
      this.articles = data;
      console.log(data);
      this.fillPositions();
      this.totalAmount = this.getTotal();
    }));

    this._store.dispatch(refreshOrderArticlesRequest());
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }

  public getTotal(): number {
    if (this.articles == null) {
      return 0;
    }

    let total = 0;
    for (const orderArticle of this.articles) {
      total = total + orderArticle.article.price;
    }

    return Math.round(total * 100) / 100;
  }

  public dragMoved(event, item): void {

    if (event.distance.x < -35) {
      this.items[item.id] = {
        x: -64,
        y: 0
      };
    } else {
      this.items[item.id] = {
        x: 0,
        y: 0
      };
    }
  }

  private deleteArticle(article): void {

    this._store.dispatch(deleteOrderArticleRequest({orderArticleId: article.id}));
    this.artRecentlyDeleted = true;
  }

  public tempDelete(article): void {
    this.articles = this.articles.filter(obj => obj !== article);

    let ref = this._snackBar.open('Article deleted', 'UNDO', {
      duration: 3000,
    });
    ref.afterDismissed().subscribe((action)=> {
      if (!action.dismissedByAction) {
        console.log('DELETE')
        this.deleteArticle(article);
      } else {
        console.log('Refresh')
        this._store.dispatch(refreshOrderArticlesRequest());
      }
    })
  }

  private fillPositions(): void {
    if (this.articles) {
      for (let article of this.articles) {
        if (article) {

          this.items[article.id] = {
            x: 0,
            y: 0
          }
        }
      }
    }
  }

}
