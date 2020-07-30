import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { CreateButtonComponent } from './components/create-button/create-button.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MaterialModule } from '../../material/material.module';
import { SetHeightDirective } from './directives/set-height.directive';
import { ScrollableDivDirective } from './directives/scrollable-div.directive';
import { ArtSheetComponent } from './components/art-sheet/art-sheet.component';
import { BaseComponent } from './components/base/base.component';
import { SetMainHeightDirective } from './directives/set-main-height.directive';
import { FillScrollableDirective } from './directives/fill-scrollable.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';
import { SetHeaderHeightDirective } from './directives/set-header-height.directive';

@NgModule({
  declarations: [
    MainHeaderComponent,
    CreateButtonComponent,
    DialogComponent,
    SetHeightDirective,
    ArtSheetComponent,
    ScrollableDivDirective,
    BaseComponent,
    SetMainHeightDirective,
    FillScrollableDirective,
    SetHeaderHeightDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslatePipeModule
  ],
  exports: [
    MainHeaderComponent,
    CreateButtonComponent,
    DialogComponent,
    SetHeightDirective,
    ArtSheetComponent,
    ScrollableDivDirective,
    BaseComponent,
    SetMainHeightDirective,
    FillScrollableDirective,
    SetHeaderHeightDirective
  ]
})

export class SharedModule { }
