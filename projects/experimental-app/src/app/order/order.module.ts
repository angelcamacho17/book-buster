import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { RouterModule } from '@angular/router';
import { ArticleComponent } from '../article/article.component';
import { MaterialLibModule } from 'material-lib';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OrderComponent,
    ArticleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: OrderComponent }]),
    MaterialLibModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    OrderComponent
  ]
})
export class OrderModule { }
