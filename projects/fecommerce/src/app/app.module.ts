import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeHeaderComponent } from './modules/fe-header/fe-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataStoreModule } from 'data-store';
import { MaterialLibModule } from 'material-lib';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';
import { FeBottomNavComponent } from './modules/fe-bottom-nav/fe-bottom-nav.component';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  declarations: [
    AppComponent,
    FeHeaderComponent,
    FeBottomNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DataStoreModule,
    MaterialLibModule,
    StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [  CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
