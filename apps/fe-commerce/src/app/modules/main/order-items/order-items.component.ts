import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription, of, merge } from 'rxjs';
import { deleteOrderArticleRequest, IOrderArticle, refreshOrderArticlesRequest, OrderArticlesService, OrderService, IHeader, setHeaderRequest, HeaderService } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { startWith, map, switchMap, tap } from 'rxjs/operators';
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

  public $articles: Observable<IOrderArticle[]>;
  public articles: IOrderArticle[] = [];
  public items: any = [];
  public initialPos = { x: 0, y: 0 };
  public _subscriptions = new Subscription();
  public _substractArt = 0;
  public _currentArt: IOrderArticle;
  public filteredlist: Observable<any[]>;
  public horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  public showDeleteBtn = false;
  public waitToDeleted = false;
  public articleToDelete = null;
  public totalPrice = 0;
  @Output() artToDelete = new EventEmitter<number>();
  @Output() deleteUndo = new EventEmitter<number>();

  constructor(
    public snackBar: MatSnackBar,
    public ordSer: OrderService,
    public store: Store<{ orderArticles: IOrderArticle[] }>,
    public ordArtsService: OrderArticlesService,
    public bottomSheet: MatBottomSheet,
    public router: Router,
    public headerService: HeaderService,
    public layoutService: LayoutService
  ) { }


  ngOnInit(): void {
    this.subscribeToHeader();
  }


  public subscribeToHeader() {
    this._subscriptions.add(
      this.headerService.rightIconClicked
        .subscribe(() => this.goToArticles())
    );
  }

  public goToArticles(): void {
    this.router.navigate(['/main/article-search/edit']);
  }

  public openBottomSheet(item: IOrderArticle): void {
    this._currentArt = item;
    const article = item.article;
    this.snackBar.dismiss();
    const bottomSheetRef = this.bottomSheet.open(ArtSheetComponent, {
      data: { article },
    });

    this._subscriptions.add(
      bottomSheetRef.afterDismissed().subscribe((action) => {
        if (action === 'delete') {
          this.tempDelete(this._currentArt);
        }
      })
    );
  }

  public deleteArticle(article: IOrderArticle): void {
    this.ordSer.setOrderModifiedState(true);
    this.store.dispatch(deleteOrderArticleRequest({ orderArticleId: article.id }));
  }

  public tempDelete(article: IOrderArticle): void {

    this.waitToDeleted = true;
    this.articleToDelete = article;

    //Delete temporally to article
    this.articles = this.articles.filter(obj => obj !== article);
    //Substract from total temporally
    this.substractTemp(article);
    // Emit to listen in order overview for tablet
    this.totalPrice = this._substractArt;
    this.artToDelete.emit(this._substractArt);

    //Update with temporally delete
    this.filteredlist = of(this.articles);
    const config = new MatSnackBarConfig();
    config.horizontalPosition = this.horizontalPosition;
    config.duration = 5000;
    config.panelClass = ['delete-art'];

    const ref = this.snackBar.open('Article deleted', 'UNDO', config);
    ref.afterDismissed().subscribe((action) => {
      this.waitToDeleted = false;
      this.articleToDelete = null;
      if (!action.dismissedByAction) {
        this.deleteArticle(article);
        this.listenToOrderArts();
      } else {
        this.deleteUndo.emit(this._substractArt)
        this.listenToOrderArts();
        this.store.dispatch(refreshOrderArticlesRequest());

      }
      this._substractArt = 0;
      this.artToDelete.emit(0);
      // const inputElement: HTMLElement = document.getElementById('content') as HTMLElement;
      // setTimeout(() => {
      //   inputElement.click();
      // }, 1);
    });
  }

  public listenToOrderArts(): void {
    this.filteredlist = this.$articles
      .pipe(
        startWith([]),
        map((state) => {
          if (state) {
            this.totalPrice = this.ordArtsService.total;
            this.articles = state;
            return this.articles;
          } else {
            return this.articles;
          }
        })
      );
  }

  public substractTemp(article: IOrderArticle): void {
    this._substractArt = article.quantity * article.article.price;
  }

  ngOnDestroy(): void {
    //If the time of the snackbar
    //hasnt past yet, and the user wnats tyo go back
    //delete the article and dismiss snackbar
    if (this.waitToDeleted) {
      console.log('ART DELETED')
      this.deleteArticle(this.articleToDelete);
      this.snackBar.dismiss();
    }
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }
}
