import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CreateButtonComponent } from './components/create-button/create-button.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MaterialModule } from '../../material/material.module';
import { SetMainHeightDirective } from './directives/set-main-height.directive';
import { FillScrollableDirective } from './directives/fill-scrollable.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    CreateButtonComponent,
    DialogComponent,
    SetMainHeightDirective,
    FillScrollableDirective
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    CreateButtonComponent,
    DialogComponent,
    SetMainHeightDirective,
    FillScrollableDirective
  ]
})
export class SharedModule { }
