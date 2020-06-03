import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeHomeComponent } from '../../components/fe-home/fe-home.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/modules/material/material.module';

@NgModule({
  declarations: [
    FeHomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: FeHomeComponent
      }
    ]),
  ],
  exports: [
    FeHomeComponent
  ]
})
export class FeHomeModule { }
