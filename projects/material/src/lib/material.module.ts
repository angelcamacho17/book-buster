import { NgModule } from '@angular/core';
import { MaterialComponent } from './material.component';
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatInputModule } from '@angular/material/input'

@NgModule({
  declarations: [MaterialComponent],
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatInputModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatInputModule
  ]
})
export class MaterialModule { }
