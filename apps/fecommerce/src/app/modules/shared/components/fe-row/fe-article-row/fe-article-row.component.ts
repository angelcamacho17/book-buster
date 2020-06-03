import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core';
import { Article, changedNavigationRequest } from '@fecommerce-workspace/data-store-lib';
import { Router } from '@angular/router';
import { FeRowComponent } from '../fe-row.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'fe-article-row',
  templateUrl: './fe-article-row.component.html',
  styleUrls: ['./fe-article-row.component.scss']
})
export class FeArticleRowComponent implements OnInit {

  @Input() item: any;

  constructor(private _router: Router,
              private _store: Store) { }

  ngOnInit(): void {
  }

  openArticleDetail(item) {
    // To let know the search the navigation is going back and
    // it needs to be relative to not damage the animations.
    this._store.dispatch(changedNavigationRequest());
    setTimeout(()=> {
      this._router.navigate(['/article/detail', item.id]);
    }, 500)
  }
}
