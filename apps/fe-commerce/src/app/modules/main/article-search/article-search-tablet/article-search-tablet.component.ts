import { Component, OnInit, Inject } from '@angular/core';
import { ArticleSearchComponent } from '../article-search.component';
import { Store, select } from '@ngrx/store';
import { OrderService, IArticle, IOrder, refreshArticlesRequest } from '@fecommerce-workspace/data-store-lib';
import { Router } from '@angular/router';
import { LayoutService } from '../../shared/services/layout.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../shared/components/dialog/dialog.component';

@Component({
  selector: 'article-search-tablet',
  templateUrl: './article-search-tablet.component.html',
  styleUrls: ['./article-search-tablet.component.scss']
})
export class ArticleSearchTabletComponent extends ArticleSearchComponent implements OnInit {

  constructor(
    public store: Store<{ articles: IArticle[], currentOrder: IOrder }>,
    public ordSer: OrderService,
    public router: Router,
    public layoutService: LayoutService,
    public dialogRef: MatDialogRef<ArticleSearchTabletComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    super(store, ordSer, router, layoutService)
  }

  ngOnInit(): void {

    this._articles$ = this.store.pipe(select('articles'));

    this._subscriptions.add(
      this._articles$.subscribe(data => {
        this.articles = data;
      })
    );
    if (this.ordSer.currentOrder?.id) {
      this.lastUrl = 'orderitems';
    }
    this.store.dispatch(refreshArticlesRequest());
  }

}
