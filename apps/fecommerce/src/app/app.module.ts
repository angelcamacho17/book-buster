import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataStoreModule } from '@fecommerce-workspace/data-store-lib';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { MaterialModule } from './modules/shared/modules/material/material.module';
import { FeArticleRowComponent } from './modules/shared/components/fe-row/fe-article-row/fe-article-row.component';
import { FeCustomerRowComponent } from './modules/shared/components/fe-row/fe-customer-row/fe-customer-row.component';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DataStoreModule,
    MaterialModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }




/* import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DataStoreModule } from 'libs/data-store-lib/src/lib/data-store.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    DataStoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
 */
