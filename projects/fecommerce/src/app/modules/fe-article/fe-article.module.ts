import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeArticleComponent } from './fe-article.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialLibModule } from 'material-lib';
import { FeHeaderModule } from '../fe-header/fe-header.module';



@NgModule({
  declarations: [FeArticleComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: FeArticleComponent }]),
    MaterialLibModule,
    FeHeaderModule
  ]
})
export class FeArticleModule { }
