import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeHomeComponent } from './fe-home.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialLibModule } from 'material-lib';



@NgModule({
  declarations: [FeHomeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: FeHomeComponent }]),
    MaterialLibModule
  ],
  exports: [
    FeHomeComponent
  ]
})
export class FeHomeModule { }
