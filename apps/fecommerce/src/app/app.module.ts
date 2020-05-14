import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Optional, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataStoreModule, ConfigService, CustomerKeyResolver, SDPInitializer, SDP_INITIALIZER, SDP_PRIORITY_INITIALIZER, KeyValueStoreService, SDP_LOCALES, getLocales, LanguageService, MyHammerConfig, AuthTokenService, HCSClient, HcsModule, KeyvaluestoreModule, LanguageModule, TranslatePipeModule, FeAuthGuard, FeLoginGuard } from '@fecommerce-workspace/data-store-lib';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { MaterialModule } from './modules/shared/modules/material/material.module';
import { HCSLoad } from 'libs/data-store-lib/src/lib/sdp/hcs/hcs-client/hcs-load';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule,
    HcsModule,
    KeyvaluestoreModule,
    LanguageModule,
    TranslatePipeModule
  ],
  providers: [
    FeAuthGuard,
    FeLoginGuard,
    ConfigService,
    CustomerKeyResolver,
    KeyValueStoreService,
    AuthTokenService,
    HCSClient,
    HCSLoad,
    {
      provide: SDPInitializer,
      useClass: SDPInitializer,
      deps: [[new Option(), SDP_INITIALIZER], [new Optional(), SDP_PRIORITY_INITIALIZER]]
    },
    {
      provide: SDP_INITIALIZER,
      useFactory: (key: KeyValueStoreService, config: ConfigService) => {
        return () => key.initDatabase('SDP-' + config.get('APPKEY'), 2);
      },
      deps: [KeyValueStoreService, ConfigService],
      multi: true
    },
    {
      provide: SDP_LOCALES,
      useFactory: getLocales,
      deps: [KeyValueStoreService, ConfigService],
      multi: false
    },
    {
      provide: LOCALE_ID,
      deps: [LanguageService],
      useFactory: (ls) => ls.currentLanguage?.code
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ],
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
