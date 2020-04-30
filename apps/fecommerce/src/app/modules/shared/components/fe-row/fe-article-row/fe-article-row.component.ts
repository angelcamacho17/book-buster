import { Component, OnInit, Input } from '@angular/core';
import { Article } from '@fecommerce-workspace/data-store-lib';
import { Router } from '@angular/router';
import { FeRowComponent } from '../fe-row.component';

@Component({
  selector: 'fe-article-row',
  templateUrl: './fe-article-row.component.html',
  styleUrls: ['./fe-article-row.component.scss']
})
export class FeArticleRowComponent extends FeRowComponent implements OnInit {

  constructor(router: Router) {
    super(router);
   }

  ngOnInit(): void {
  }

}
