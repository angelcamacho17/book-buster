import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeCreateButtonComponent } from './components/fe-create-button/fe-create-button.component';
import { FeCardComponent } from './components/fe-card/fe-card.component';
import { FeBottomNavComponent } from '../fe-bottom-nav/fe-bottom-nav.component';
import { MaterialModule } from './modules/material/material.module';

@NgModule({
  declarations: [
    FeBottomNavComponent,
    FeCardComponent,
    FeCreateButtonComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    FeCreateButtonComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
