import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';
import { HomeRoutingModule } from './home-routing.module';
import { HomeMobileComponent } from './home-mobile/home-mobile.component';
import { HomeTabletComponent } from './home-tablet/home-tablet.component';

@NgModule({
  declarations: [HomeComponent, HomeMobileComponent, HomeTabletComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MaterialModule,
    TranslatePipeModule
  ]
})
export class HomeModule { }
