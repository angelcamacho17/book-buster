import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { RouterModule } from '@angular/router';
import { ArticleComponent } from '../article/article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'projects/fecommerce/src/app/modules/shared/modules/material/material.module';



@NgModule({
  declarations: [
    OrderComponent,
    ArticleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: OrderComponent }]),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    OrderComponent
  ]
})
export class OrderModule { }
