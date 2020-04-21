import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeCreateButtonComponent } from './components/fe-create-button/fe-create-button.component';
import { MaterialLibModule } from 'material-lib';



@NgModule({
  declarations: [
    FeCreateButtonComponent
  ],
  imports: [
    CommonModule,
    MaterialLibModule
  ],
  exports: [
    FeCreateButtonComponent
  ]
})
export class SharedModule { }
