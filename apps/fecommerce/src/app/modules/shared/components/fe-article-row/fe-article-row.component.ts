import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'libs/data-store-lib/src/lib/models/article.model';

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
