import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeCreateButtonComponent } from './components/fe-create-button/fe-create-button.component';
import { MaterialLibModule } from 'material-lib';
import { FeCardComponent } from './components/fe-card/fe-card.component';



@NgModule({
  declarations: [
    FeCreateButtonComponent,
    FeCardComponent
  ],
  imports: [
    CommonModule,
    MaterialLibModule
  ],
  exports: [
    FeCreateButtonComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
