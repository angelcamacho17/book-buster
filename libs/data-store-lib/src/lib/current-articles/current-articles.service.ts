import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';

@Injectable({providedIn: 'root'})
export class CurrentArticlesService {
    
    private _articles: Article[] = [];

    constructor() { }
    
    all() {
        
    }


}