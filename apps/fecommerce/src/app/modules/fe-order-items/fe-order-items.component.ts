import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { deleteOrderArticleRequest, OrderArticle, refreshOrderArticlesRequest, OrderArticlesService } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
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
  private _subscriptions: Subscription;
  private _substractArt = 0;
  public filteredlist: Observable<any[]>;
  public horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  public showDeleteBtn = false;
  public waitToDeleted = false;
  public articleToDelete = null;

  constructor(
    private _snackBar: MatSnackBar,
    private _storeOrdArt: Store<{ orderArticles: OrderArticle[] }>,
    private _ordArtsService: OrderArticlesService) {
    this.$articles = this._storeOrdArt.pipe(select('orderArticles'));
    this.listenToOrderArts();
    this.swipePositions();
    this._storeOrdArt.dispatch(refreshOrderArticlesRequest());
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // If the time of the snackbar
    // hasnt past yet, and the user wnats tyo go back
    // delete the article and dismiss snackbar
    if(this.waitToDeleted) {
      this.deleteArticle(this.articleToDelete);
      this._snackBar.dismiss();
    }
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }

  public dragMoved(event, item): void {
    // this.items[item.id].deleteBtn = true;

    if (event.distance.x < -35) {
      this.items[item.id] = {
        x: -64,
        y: 0,
        deleteBtn: true
      };
    } else {
      this.items[item.id] = {
        x: 0,
        y: 0,
        deleteBtn: false
      };
    }
    this.swipePositions(item);

  }

  public dragStarted(event, item): void {
    // If a snackbar was already open, close it.
    if ( this._snackBar._openedSnackBarRef) {
      this._snackBar.dismiss();
    }
  }

  private deleteArticle(article: OrderArticle): void {
    this._storeOrdArt.dispatch(deleteOrderArticleRequest({orderArticleId: article.id}));
  }

  public tempDelete(article: OrderArticle): void {

    this.waitToDeleted = true;
    this.articleToDelete = article;
    // Reset swipe positions of the articles
    this.swipePositions();

    // Delete temporally to article
    this.articles = this.articles.filter(obj => obj !== article);
    // Substract from total temporally
    this.substractTemp(article);

    // Update with temporally delete
    this.filteredlist = of(this.articles);
    const config = new MatSnackBarConfig();
    config.horizontalPosition = this.horizontalPosition;
    config.duration = 5000;
    config.panelClass = ['delete-art'];

    const ref = this._snackBar.open('Article deleted', 'UNDO', config);
    ref.afterDismissed().subscribe((action)=> {
      this.waitToDeleted = false;
      this.articleToDelete = null;
      if (!action.dismissedByAction) {
        this.deleteArticle(article);
        this.listenToOrderArts();
      } else {
        this.listenToOrderArts();
        this._storeOrdArt.dispatch(refreshOrderArticlesRequest());
      }
      this._substractArt = 0;
      const inputElement: HTMLElement = document.getElementById('content') as HTMLElement;
      inputElement.click();
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

  public swipePositions(item?): void {
    if (this.articles) {
      for (const article of this.articles) {
        if (article && article !== item) {
          this.items[article.id] = {
            x: 0,
            y: 0,
            deleteBtn: false
          }
        }
      }
    }
  }

  public getTotal(): number {
    let total = this._ordArtsService.getTotal() - this._substractArt;
    total = Math.round(total * 100) / 100;
    return total > 0 ? total : 0;
  }

  private substractTemp(article: OrderArticle): void {
    this._substractArt = article.quantity * article.article.price;
  }

}
