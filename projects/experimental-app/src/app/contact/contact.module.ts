import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './contact.component';
import { MaterialModule } from 'projects/material/src/lib/material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ContactComponent }]),
    MaterialModule
  ]
})
export class ContactModule { }
