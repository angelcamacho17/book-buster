import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ArticleSearchComponent } from '../article-search.component';
import { Store, select } from '@ngrx/store';
import { OrderService, IArticle, IOrder, refreshArticlesRequest, IOrderArticle, refreshCustomersRequest } from '@fecommerce-workspace/data-store-lib';
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
    public store: Store<{ articles: IArticle[], currentOrder: IOrder, orderArticles: IOrderArticle[] }>,
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
      this._articles$.subscribe(data => {
        this.articles = data;
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

    if (this.ordSer.currentOrder?.id) {
      this.lastUrl = 'orderitems';
    }
    this.store.dispatch(refreshCustomersRequest());
    this.store.dispatch(refreshArticlesRequest());
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

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this.scanner = false;
  }
}