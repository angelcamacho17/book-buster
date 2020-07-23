import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CreateButtonComponent } from './components/create-button/create-button.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [
    HeaderComponent,
    CreateButtonComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    CreateButtonComponent,
    DialogComponent
  ]
})
export class SharedModule { }
