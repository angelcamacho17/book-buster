import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipeModule } from '@fecommerce-workspace/data';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from './login.component';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslatePipeModule
  ]
})
export class LoginModule { }
