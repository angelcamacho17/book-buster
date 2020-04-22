import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeHomeComponent } from './fe-home.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialLibModule } from 'material-lib';
import { SharedModule } from '../shared/shared.module';
import { FeHeaderModule } from '../fe-header/fe-header.module';



@NgModule({
  declarations: [FeHomeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: FeHomeComponent }]),
    MaterialLibModule,
    SharedModule,
    FeHeaderModule
  ],
  exports: [
    FeHomeComponent
  ]
})
export class FeHomeModule { }
