import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotSupportedComponent } from './not-supported.component';
import { SharedModule } from '../main/shared/shared.module';

@NgModule({
  declarations: [NotSupportedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: NotSupportedComponent }]),
    SharedModule
  ]
})
export class NotSupportedModule { }
