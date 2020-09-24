import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ArticleSearchComponent } from '../article-search.component';
import { Store, select } from '@ngrx/store';
import { OrderService, IArticle, IOrder, refreshArticlesRequest, IArticleLine, refreshCustomersRequest } from '@fecommerce-workspace/data';
import { Router } from '@angular/router';
import { LayoutService } from '../../shared/services/layout.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../shared/components/dialog/dialog.component';
import { EventService } from '../../shared/services/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'article-search-tablet',
  templateUrl: './article-search-tablet.component.html',
  styleUrls: ['./article-search-tablet.component.scss']
})
export class ArticleSearchTabletComponent extends ArticleSearchComponent implements OnInit, OnDestroy {

  constructor(
    public store: Store<{ article: IArticle, articles: IArticle[], currentOrder: IOrder, orderArticles: IArticleLine[]  }>,
    public ordSer: OrderService,
    public router: Router,
    public layoutService: LayoutService,
    public matDialog: MatDialog,
    public eventService: EventService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ArticleSearchTabletComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    super(store, ordSer, router, layoutService, snackBar, eventService);
  }

  ngOnInit(): void {

    this._articles$ = this.store.pipe(select('articles'));

    this._subscriptions.add(
      this._articles$.subscribe((res: any) => {
        this.loading = false;
        if (res?.body?.data?.articles?.length === 0 || res?.body?.data?.articles?.length === undefined) {
          this.emptyResults = true;
        } else {
          this.emptyResults = false;
        }
        this.filteredResults = res?.body?.data?.articles;
      })
    );

    this._articleScanned$ = this.store.pipe(select('article'));
    this._subscriptions.add(
      this._articleScanned$.subscribe((article: IArticle) => {
         // Workaround to avoid trigger this without calling it.
         if(!this.firstCall) {
           this.handleScannRes(article);
           this.checkToClose(article);
         } else {
            this.firstCall = false;
         }
      })
    );


    this._currentOrder$ = this.store.pipe(select('currentOrder'));
    this._subscriptions.add(this._currentOrder$.subscribe(data => {
      this.currentOrder = data;
    }));

    this._subscriptions.add(
      this.eventService.articleSelect.subscribe(() => {
        this.leftIconClick();
      })
    );

    if (this.ordSer.currentOrder?.uuid) {
      this.lastUrl = 'orderitems';
    }
    this.store.dispatch(refreshCustomersRequest());
    // this.store.dispatch(refreshArticlesRequest());

    setTimeout(()=>{
      this.showScanner()
    }, )

  }

  /**
   * Listen left icon header click.
   */
  public leftIconClick(): void {
    const result = {
      action: this.data?.firstButton
    }
    this.dialogRef.close(result)
  }

  /**
   * Listen right icon header click
   */
  public rightIconClick(): void {
    const result = {
      action: this.data?.secondButton
    }
    this.dialogRef.close(result)
  }

  /**
   * Listen click outside od the dialog.
   */
  public onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Handle article scanned
   * @param article
   */
  public handleScannRes(article: any) {
    let snack;

    if (article !== undefined && article !== null && article?.uuid) {
      this.router.navigate(['/main/article-detail/', article.uuid]);
      this.dialogRef.close();
    } else {
      snack = this.snackBar.open(`Article could not be found.`, 'Close')
    }
    this.pauseScan = false;
    // After snack bar closed, continue scanner.
    if(snack) {
      snack.afterDismissed().subscribe(() => {
        this.pauseScan = false;
      });
    }
  }

  /**
   * Check if the article existe and close the dialog
   * @param article
   */
  public checkToClose(article: IArticle): void {
    // if (article !== undefined && article !== null && article?.uuid) {
    //   this.dialogRef.close();
    // }
  }

  ngOnDestroy(): void {
    this.scanner = false;
    this.scannerStarted = false;
    this.emptyResults = true;
    this.filteredResults = [];
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
    this.store.dispatch(refreshArticlesRequest());

  }
}
