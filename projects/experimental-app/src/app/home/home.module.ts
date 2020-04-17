import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialLibModule } from 'material-lib';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
    MaterialLibModule
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }
