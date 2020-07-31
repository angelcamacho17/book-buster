import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';
import { ArticleDetailComponent } from './article-detail.component';

@NgModule({
  declarations: [ArticleDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component:  ArticleDetailComponent}]),
    SharedModule,
    MaterialModule,
    TranslatePipeModule
  ]
})
export class ArticleDetailModule { }
