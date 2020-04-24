import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { FeBottomNavComponent } from '../fe-bottom-nav/fe-bottom-nav.component';
import { FeCreateButtonComponent } from './components/fe-create-button/fe-create-button.component';
import { FeCardComponent } from './components/fe-card/fe-card.component';
import { FeHeaderComponent } from './components/fe-header/fe-header.component';
<<<<<<< HEAD
import { FeSearchComponent } from './components/fe-search/fe-search.component';

@NgModule({
  declarations: [
    FeBottomNavComponent,
    FeCardComponent,
    FeCreateButtonComponent,
    FeHeaderComponent,
    FeSearchComponent
=======
import { FeCustomerRowComponent } from './components/fe-customer-row/fe-customer-row.component';



@NgModule({
  declarations: [
    FeCardComponent,
    FeCreateButtonComponent,
    FeSearchComponent,
    FeHeaderComponent,
    FeCustomerRowComponent
>>>>>>> 498250c86f59a51136e3b2f9a6bdea072ffc4c46
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FeCardComponent,
    FeCreateButtonComponent,
    FeSearchComponent,
    FeHeaderComponent,
    FeCardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
