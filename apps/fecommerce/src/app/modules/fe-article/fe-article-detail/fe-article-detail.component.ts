import { Component, OnInit, Input } from '@angular/core';
import { Article } from '@fecommerce-workspace/data-store-lib';

@Component({
  selector: 'app-fe-article-detail',
  templateUrl: './fe-article-detail.component.html',
  styleUrls: ['./fe-article-detail.component.scss']
})
export class FeArticleDetailComponent implements OnInit {
  title = "Article detail";
  @Input() article: Article;

  constructor() { }

  ngOnInit(): void {
  }

}
