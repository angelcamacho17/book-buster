import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { deleteOrderArticleRequest, OrderArticle, refreshOrderArticlesRequest, OrderArticlesService } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { startWith, map } from 'rxjs/operators';
import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';

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
  private _subscriptions: Subscription;
  private _substractArt = 0;
  public filteredlist: Observable<any[]>;
  //public filteredlist: Observable<any[]>;
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
// },{
// "id": 3,
// "article": {
//   "id": 10,
//   "name": "Pork - Butt, Boneless",
//   "description": "Deep necrosis of underlying tissues [deep third degree) with loss of a body part, of forearm",
//   "price": +"37.21"
// },
// "quantity": 2
// }, {
// "id": 4,
// "article": {
//   "id": 8,
//   "name": "Muffin Mix - Carrot",
//   "description": "Secondary neuroendocrine tumor, unspecified site",
//   "price": +"93.17"
// }, "quantity": 3
// },
// {
// "id": 5,
// "article": {
//   "id": 36,
//   "name": "Orange - Blood",
//   "description": "Femoral hernia without mention of obstruction or gangrene, bilateral (not specified as recurrent)",
//   "price": +"1.47"
// },
// "quantity": 2
// }, {
// "id": 6,
// "article": {
//   "id": 9,
//   "name": "Tea - Earl Grey",
//   "description": "Stenosis of lacrimal punctum",
//   "price": +"95.78"
// }, "quantity": 3
// },
// {
// "id": 7,
// "article": {
//   "id": 29,
//   "name": "Guinea Fowl",
//   "description": "Unspecified monoarthritis, site unspecified",
//   "price": +"74.00"
// },
// "quantity": 2
// }, {
// "id": 8,
// "article": {
//   "id": 32,
//   "name": "Soup - Knorr, Chicken Noodle",
//   "description": "Poisoning by erythromycin and other macrolides",
//   "price": +"51.80"
// }, "quantity": 3
// },
// {
// "id": 9,
// "article": {
//   "id": 31,
//   "name": "Tea - Honey Green Tea",
//   "description": "Twin birth, mate liveborn, born in hospital, delivered without mention of cesarean section",
//   "price": +"61.15"
// },
// "quantity": 2
// }, {
// "id": 10,
// "article": {
//   "id": 30,
//   "name": "Salmon - Atlantic, No Skin",
//   "description": "Post term pregnancy, unspecified as to episode of care or not applicable",
//   "price": +"78.52"
// }, "quantity": 3
//  }
// ])
  public horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  public showDeleteBtn = false;
  public waitToDeleted = false;
  public articleToDelete = null;
  @ViewChild('scrollEl')
  scrollEl:ElementRef<HTMLElement>;

  @ViewChildren(CdkDrag)
  dragEls:QueryList<CdkDrag>;

  private animationFrame: number | undefined;

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

  public dragMoved(event, item): void {
    //this.items[item.id].deleteBtn = true;

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
    //If a snackbar was already open, close it.
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
    //Reset swipe positions of the articles
    this.swipePositions();

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

  public swipePositions(item?): void {
    console.log(item);
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

  private scroll($event: CdkDragMove) {
    const { y } = $event.pointerPosition;
    const baseEl = this.scrollEl.nativeElement;
    const box = baseEl.getBoundingClientRect();
    const scrollTop = baseEl.scrollTop;
    const top = box.top + - y ;
    if (top > 0 && scrollTop !== 0) {
        const newScroll = scrollTop - speed * Math.exp(top / 50);
        baseEl.scrollTop = newScroll;
        this.animationFrame = requestAnimationFrame(() => this.scroll($event));
        return;
    }

    const bottom = y - box.bottom ;
    if (bottom > 0 && scrollTop < box.bottom) {
        const newScroll = scrollTop + speed * Math.exp(bottom / 50);
        baseEl.scrollTop = newScroll;
        this.animationFrame = requestAnimationFrame(() => this.scroll($event));
    }
}

}
