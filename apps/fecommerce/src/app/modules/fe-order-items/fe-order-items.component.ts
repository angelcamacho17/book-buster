import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Observable, Subscription, of, merge } from 'rxjs';
import { deleteOrderArticleRequest, OrderArticle, refreshOrderArticlesRequest, OrderArticlesService, OrderService } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { startWith, map, switchMap, tap } from 'rxjs/operators';
import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material/bottom-sheet';
import { FeArtSheetComponent } from '../shared/components/fe-art-sheet/fe-art-sheet.component';

const speed = 10;

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
  private _substractArt = 0;
  private _currentArt: OrderArticle;
  public filteredlist: Observable<any[]>;
  // public filteredlist: Observable<any[]> = of([{
  // "id": 1,
  // "article": {
  //   "id": 1,
  //   "name": "Southern Comfort",
  //   "description": "Eosinophilic gastroenteritis",
  //   "price": 56.87
  // },
  // "quantity": 2
  // }, {
  // "id": 2,
  // "article": {
  //   "id": 2,
  //   "name": "Stock - Veal, White",
  //   "description": "Malignant neoplasm of other specified sites of nasopharynx",
  //   "price": 76.19
  // }, "quantity": 3
  // }
  // ])
  public horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  public showDeleteBtn = false;
  public waitToDeleted = false;
  public articleToDelete = null;
  public addArt = false;
  public returnUrl = 'order';

  constructor(
    private _snackBar: MatSnackBar,
    private _ordSer: OrderService,
    private _storeOrdArt: Store<{ orderArticles: OrderArticle[] }>,
    private _ordArtsService: OrderArticlesService,
    private _bottomSheet: MatBottomSheet) {
    this.$articles = this._storeOrdArt.pipe(select('orderArticles'));
    this.listenToOrderArts();
    this._storeOrdArt.dispatch(refreshOrderArticlesRequest());
    if (this._ordSer.currentOrder?.id) {
      this.addArt = true;
      this.returnUrl = 'order/edit';
    }
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    //If the time of the snackbar
    //hasnt past yet, and the user wnats tyo go back
    //delete the article and dismiss snackbar
    if(this.waitToDeleted) {
      this.deleteArticle(this.articleToDelete);
      this._snackBar.dismiss();
    }
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }

  public openBottomSheet(item: OrderArticle): void {
    this._currentArt = item;
    const article = item.article;
    const ref = this._bottomSheet.open(FeArtSheetComponent, {
      data: { article },
    });

    ref.afterDismissed().subscribe((action) => {
      if (action === 'delete') {
        this.tempDelete(this._currentArt);
      }
    })
  }

  private deleteArticle(article: OrderArticle): void {
    this._storeOrdArt.dispatch(deleteOrderArticleRequest({orderArticleId: article.id}));
  }

  public tempDelete(article: OrderArticle): void {

    this.waitToDeleted = true;
    this.articleToDelete = article;

    //Delete temporally to article
    this.articles = this.articles.filter(obj => obj !== article);
    //Substract from total temporally
    this.substractTemp(article);

    //Update with temporally delete
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
      const inputElement: HTMLElement = document.getElementById('card') as HTMLElement;
      setTimeout(() => {
        inputElement.click();
      }, 1);
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

  public getTotal(): number {
    let total = this._ordArtsService.getTotal() - this._substractArt;
    total = Math.round(total * 100) / 100;
    return total > 0 ? total : 0;
  }

  private substractTemp(article: OrderArticle): void {
    this._substractArt = article.quantity * article.article.price;
  }
}
