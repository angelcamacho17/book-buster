import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'projects/fecommerce/src/app/modules/shared/modules/material/material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
    MaterialModule
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }
