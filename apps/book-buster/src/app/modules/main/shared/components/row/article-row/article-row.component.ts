import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core';
import { IArticle } from '@fecommerce-workspace/data-store-lib';
import { Router } from '@angular/router';
import { RowComponent } from '../row.component';
import { Store } from '@ngrx/store';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'article-row',
  templateUrl: './article-row.component.html',
  styleUrls: ['./article-row.component.scss']
})
export class ArticleRowComponent implements OnInit {

  @Input() item: IArticle;

  constructor(private _router: Router,
              private eventService: EventService,
              private _store: Store) { }

  ngOnInit(): void {
  }

  /**
   * Emit article select event.
   * @param item
   */
  openArticleDetail(item) {
    this.eventService.articleSelected(item);
    this._router.navigate(['/main/article-detail', item.id]);
  }
}
