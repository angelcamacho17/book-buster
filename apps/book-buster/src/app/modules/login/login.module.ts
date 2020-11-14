import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipeModule } from '@fecommerce-workspace/data';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslatePipeModule
  ]
})
export class LoginModule { }
