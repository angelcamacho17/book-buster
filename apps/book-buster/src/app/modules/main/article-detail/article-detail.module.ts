import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';
import { ArticleDetailComponent } from './article-detail.component';
import { ArticleDetailRoutingModule } from './article-detail-routing.module';
import { ArticleDetailMobileComponent } from './article-detail-mobile/article-detail-mobile.component';
import { ArticleDetailTabletComponent } from './article-detail-tablet/article-detail-tablet.component';

@NgModule({
  declarations: [ArticleDetailComponent, ArticleDetailMobileComponent, ArticleDetailTabletComponent],
  imports: [
    CommonModule,
    ArticleDetailRoutingModule,
    SharedModule,
    MaterialModule,
    TranslatePipeModule
  ]
})
export class ArticleDetailModule { }
