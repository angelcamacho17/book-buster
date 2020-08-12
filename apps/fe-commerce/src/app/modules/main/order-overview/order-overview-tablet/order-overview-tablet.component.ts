import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderOverviewComponent } from '../order-overview.component';
import { Store, select } from '@ngrx/store';
import {
  IOrder, IOrderArticle, OrderArticlesService, BackNavigationService, TranslationService,
  HeaderService, OrderService, getCurrentOrderRequest, refreshOrderArticlesRequest, deleteOrderArticleRequest, isUndefined
} from '@fecommerce-workspace/data-store-lib';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from '../../shared/services/layout.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ArtSheetComponent } from '../../shared/components/art-sheet/art-sheet.component';
import { of, Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CustomerSearchTabletComponent } from '../../customer-search/customer-search-tablet/customer-search-tablet.component';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { ArticleSearchTabletComponent } from '../../article-search/article-search-tablet/article-search-tablet.component';

@Component({
  selector: 'order-overview-tablet',
  templateUrl: './order-overview-tablet.component.html',
  styleUrls: ['./order-overview-tablet.component.scss']
})
export class OrderOverviewTabletComponent extends OrderOverviewComponent implements OnInit, OnDestroy {
  public $articles: Observable<IOrderArticle[]>;
  public articles: IOrderArticle[] = [];
  public items: any = [];
  public initialPos = { x: 0, y: 0 };
  private _subscriptions = new Subscription();
  private _substractArt = 0;
  private _currentArt: IOrderArticle;
  public filteredlist: Observable<any[]>;
  public horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  public showDeleteBtn = false;
  public waitToDeleted = false;
  public articleToDelete = null;
  public addArt = false;

  constructor(public store: Store<{ currentOrder: IOrder, orderArticles: IOrderArticle[] }>,
    public snackBar: MatSnackBar,
    public router: Router,
    public matDialog: MatDialog,
    public ordArtsService: OrderArticlesService,
    public bnService: BackNavigationService,
    public transServ: TranslationService,
    public headerService: HeaderService,
    public orderService: OrderService,
    public layoutService: LayoutService,
    private _snackBar: MatSnackBar,
    private _ordSer: OrderService,
    private _ordArtsService: OrderArticlesService,
    private _bottomSheet: MatBottomSheet,
    private _router: Router,
    private _headerService: HeaderService
  ) {
    super(store, snackBar, router, matDialog,
      ordArtsService, bnService, transServ,
      headerService, orderService, layoutService)

    this.$articles = this.store.pipe(select('orderArticles'));
    this.subscriptions.add(
      this.$articles.subscribe((arts) => {
        this.articles = arts;
      })
    );

    this.currentOrder$ = this.store.pipe(select('currentOrder'));
    this.subscriptions.add(
      this.currentOrder$.subscribe(data => {
        this.currentOrder = data;
      })
    );

    this.$articles = this.store.pipe(select('orderArticles'));
    this.listenToOrderArts();

    this.store.dispatch(refreshOrderArticlesRequest());
    this.store.dispatch(getCurrentOrderRequest());

  }

  ngOnInit(): void {
    this.subscribeToHeader();
  }

  public subscribeToHeader() {
    this._subscriptions.add(
      this._headerService.rightIconClicked
        .subscribe(() => this.goToArticles())
    );
  }

  public goToArticles(): void {
    this._router.navigate(['/main/article-search/edit']);
  }

  public openBottomSheet(item: IOrderArticle): void {
    this._currentArt = item;
    const article = item.article;
    this._snackBar.dismiss();
    const bottomSheetRef = this._bottomSheet.open(ArtSheetComponent, {
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

  private deleteArticle(article: IOrderArticle): void {
    this._ordSer.setOrderModifiedState(true);
    this.store.dispatch(deleteOrderArticleRequest({ orderArticleId: article.id }));
  }

  public tempDelete(article: IOrderArticle): void {

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
    ref.afterDismissed().subscribe((action) => {
      this.waitToDeleted = false;
      this.articleToDelete = null;
      if (!action.dismissedByAction) {
        this.deleteArticle(article);
        this.listenToOrderArts();
      } else {
        this.listenToOrderArts();
        this.store.dispatch(refreshOrderArticlesRequest());

      }
      this._substractArt = 0;
      const inputElement: HTMLElement = document.getElementById('content') as HTMLElement;
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
          if (state) {
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

  private substractTemp(article: IOrderArticle): void {
    this._substractArt = article.quantity * article.article.price;
  }

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
        if (isUndefined(data)) {
          return;
        }
        if (data?.result === 'SWITCH') {
          this.orderService.switchCustomerFlow = true;
          this._openNewCustomer();
        }
      })
    );
  }

  public openNewArticle(): void {
    console.log('OPENING arts');
    const dialogRef = this.matDialog.open(ArticleSearchTabletComponent, {
      panelClass: 'modal-dialog',
      position: {
        top: '32px'
      }
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe(data => {
      })
    );
  }

  private _openNewCustomer(): void {
    console.log('OPENING');
    const dialogRef = this.matDialog.open(CustomerSearchTabletComponent, {
      panelClass: 'modal-dialog',
      position: {
        top: '32px'
      }
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe()
    );
  }

  ngOnDestroy(): void {
    //If the time of the snackbar
    //hasnt past yet, and the user wnats tyo go back
    //delete the article and dismiss snackbar
    if (this.waitToDeleted) {
      this.deleteArticle(this.articleToDelete);
      this._snackBar.dismiss();
    }
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }

}
