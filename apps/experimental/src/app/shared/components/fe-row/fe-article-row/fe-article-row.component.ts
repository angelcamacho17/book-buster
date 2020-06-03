import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core';
import { Article } from '@fecommerce-workspace/data-store-lib';
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

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  openArticleDetail(item) {
    this._router.navigate(['/article/detail', item.id]);
  }
}
