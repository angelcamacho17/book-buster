import { Component, OnInit, Input } from '@angular/core';
import { Article } from '@fecommerce-workspace/data-store-lib';

@Component({
  selector: 'app-fe-article-row',
  templateUrl: './fe-article-row.component.html',
  styleUrls: ['./fe-article-row.component.scss']
})
export class FeArticleRowComponent implements OnInit {

  @Input() article: Article;

  constructor() { }

  ngOnInit(): void {
  }

}
