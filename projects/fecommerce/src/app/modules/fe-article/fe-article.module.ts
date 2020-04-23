import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeArticleComponent } from './fe-article.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialLibModule } from 'material-lib';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FeArticleComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: FeArticleComponent }]),
    MaterialLibModule,
    SharedModule
  ]
})
export class FeArticleModule { }
