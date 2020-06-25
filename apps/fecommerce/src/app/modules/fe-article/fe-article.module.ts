import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeArticleComponent } from './fe-article.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/modules/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FeArticleDetailComponent } from './fe-article-detail/fe-article-detail.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { ScannerModule } from '@fecommerce-workspace/scanner';
import { TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';

@NgModule({
  declarations: [
    FeArticleComponent,
    FeArticleDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslatePipeModule,
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
    SharedModule,
    ClickOutsideModule,
    ScannerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeArticleModule { }
