import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CurrentArticlesService {

    private _articles: Article[] = [];
    private articles = new BehaviorSubject(this._articles);

    constructor() { }

    public all() {
        return this.articles.asObservable();
    }

    public append(article: Article) {
        const lastArticleId = this._articles[this._articles.length - 1].id;
        article = { ...article, ...{ id: lastArticleId + 1 } }
        this._articles = this._articles.concat(article);
        this.articles.next(this._articles);
        return this.articles.asObservable();
    }

    public replace(article: Article): Observable<Article[]> {
        const index = this._articles.findIndex(c => c.id === article.id);
        this._articles[index].description = article.description;
        this._articles[index].name = article.name;
        this._articles[index].price = article.price;
        this.articles.next(this._articles);
        return this.articles.asObservable();
    }

    public delete(articleId: any): Observable<Article[]> {
      const index = this._articles.findIndex(c => c.id === articleId);
      this._articles.splice(index, 1);
      this.articles.next(this._articles);
      return this.articles.asObservable();
    }

}