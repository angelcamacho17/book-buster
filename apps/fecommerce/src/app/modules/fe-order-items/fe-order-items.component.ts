import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { deleteOrderArticleRequest, OrderArticle, refreshOrderArticlesRequest } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'fe-order-items',
  templateUrl: './fe-order-items.component.html',
  styleUrls: ['./fe-order-items.component.scss']
})
export class FeOrderItemsComponent implements OnInit, OnDestroy {

  public $articles: Observable<OrderArticle[]>;
  public articles: OrderArticle[] = [];
  public items: any = [];
  public initialPos = { x: 0, y: 0};
  private _subscriptions = new Subscription();
  public totalAmount = 0;
  public filteredlist: Observable<any[]>;
  public artRecentlyDeleted = false;

  constructor(
    private _snackBar: MatSnackBar,
    private _storeOrdArt: Store<{ orderArticles: OrderArticle[] }>) {
    this.$articles = this._storeOrdArt.pipe(select('orderArticles'));
    // this._subscriptions = this.$articles.subscribe(data => {

    //   this.articles = data;
    //   console.log(this.articles);
    //   this.fillPositions();
    //   this.totalAmount = this.getTotal();
    // })

    this.listenToOrderArts();

    console.log(this.articles);

    this._storeOrdArt.dispatch(refreshOrderArticlesRequest());
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
    this.fillPositions(item);
  }

  private deleteArticle(article): void {

    this._storeOrdArt.dispatch(deleteOrderArticleRequest({orderArticleId: article.id}));
    this.artRecentlyDeleted = true;
  }

  public tempDelete(article): void {
    this.articles = this.articles.filter(obj => obj !== article);
    // Update with temporally delete
    this.filteredlist = of(this.articles);
    const config = new MatSnackBarConfig();
    config.duration = 5000,
    config.panelClass = ['delete-art'];
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    let ref = this._snackBar.open('Article deleted', 'UNDO', config);
    ref.afterDismissed().subscribe((action)=> {
      this.fillPositions();
      if (!action.dismissedByAction) {
        this.listenToOrderArts();
        this.deleteArticle(article);
      } else {
        this.listenToOrderArts();
        this._storeOrdArt.dispatch(refreshOrderArticlesRequest());

        // console.log('refresh');
        // this._storeOrdArt.dispatch(refreshOrderArticlesRequest());
      }
    });

  }

  private listenToOrderArts(): void {
    this.filteredlist = this.$articles
      .pipe(
        startWith([]),
        map((state) => {
          if(state) {
            this.articles = state;
            return this.articles;
          } else {
            return this.articles;
          }
        })
      );
  }

  public fillPositions(item?): void {
    if (this.articles) {
      for (let article of this.articles) {
        if (article && article !== item) {
          this.items[article.id] = {
            x: 0,
            y: 0
          }
        }
      }
    }
  }

}
