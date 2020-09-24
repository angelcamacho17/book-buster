import { Injectable } from '@angular/core';
import { IArticle } from '../models/article.model';
import { BehaviorSubject, Observable, of, EMPTY } from 'rxjs';
import { DataService, IHCSParameter } from '../services/data.service';

@Injectable({providedIn: 'root'})
export class ArticleService {
    private _articles: IArticle[] = [];
    private _resource = 'articles'

    articles = new BehaviorSubject(this._articles);

    constructor(private _dataService: DataService) { }

    /**
     * @returns All articles
     */
    public getAll(): Observable<IArticle[]> {
        return this.articles.asObservable();
    }

    /**
     * @returns get scanned article
     */
    public getScannedArticle(barcode: string): Observable<IArticle[]> {
      const queryParameters: IHCSParameter[] = [
        {
          key: 'barcode',
          value: barcode
        }
      ]
      return this._dataService.get(this._resource, queryParameters);
    }

    /**
     * @returns Filter articles
     */
    public getArticles(filter: string): Observable<IArticle[]> {
      const queryParameters: IHCSParameter[] = [
        {
          key: 'filter',
          value: filter
        }
      ];
      return this._dataService.get(this._resource, queryParameters);
    }

    /**
     * Clear article
     */
     public clearArt(): Observable<IArticle>  {
       return of(null);
     }

    /**
     * Get article
     * @param articleId
     * @returns article
     */
    public getArticle(articleId: number): Observable<IArticle> {
      return this._dataService.get(this._resource + '/{' + articleId +'}');
    }

    /**
     * Create article
     * @param article
     * @returns articles
     */
    public append(article: IArticle): Observable<IArticle[]> {
        const lastArticleId = this._articles[this._articles.length - 1].uuid;
        this._articles.concat({...article, ...{ id: lastArticleId + 1 }});
        this.articles.next(this._articles);
        return this.articles.asObservable();
    }

    /**
     * Edit article
     * @param article
     * @returns articles
     */
    public replace(article: IArticle): Observable<IArticle[]> {
        const index = this._articles.findIndex(a => a.uuid === article.uuid);
        this._articles[index].name = article.name;
        this._articles[index].code = article.code;
        this._articles[index].salesPrice.incl = article.salesPrice.incl;
        this.articles.next(this._articles);
        return this.articles.asObservable();
    }

    /**
     * Delete article
     * @param articleId
     * @returns articles
     */
    public delete(articleId: any): Observable<IArticle[]> {
      const index = this._articles.findIndex(a => a.uuid === articleId);
      this._articles.splice(index, 1);
      this.articles.next(this._articles);
      return this.articles.asObservable();
    }
}
