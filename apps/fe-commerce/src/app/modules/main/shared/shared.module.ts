import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CreateButtonComponent } from './components/create-button/create-button.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MaterialModule } from '../../material/material.module';
import { SetHeightDirective } from './directives/set-height.directive';
import { ScrollableDivDirective } from './directives/scrollable-div.directive';
import { ArtSheetComponent } from './components/art-sheet/art-sheet.component';
import { BaseComponent } from './components/base/base.component'

@NgModule({
  declarations: [
    HeaderComponent,
    CreateButtonComponent,
    DialogComponent,
    SetHeightDirective,
    ArtSheetComponent,
    ScrollableDivDirective,
    BaseComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    CreateButtonComponent,
    DialogComponent,
    SetHeightDirective,
    ArtSheetComponent,
    ScrollableDivDirective,
    BaseComponent
  ]
})
export class SharedModule { }
