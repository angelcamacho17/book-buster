import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeArticleComponent } from './fe-article.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/modules/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FeArticleDetailComponent } from './fe-article-detail/fe-article-detail.component';

@NgModule({
  declarations: [
    FeArticleComponent,
    FeArticleDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: FeArticleComponent
      },
      {
        path: 'detail/:id',
        component: FeArticleDetailComponent,
        data: { animation: 'articledetail' },

      }
    ]),
    MaterialModule,
    SharedModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeArticleModule { }
