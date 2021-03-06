import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Optional, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataStoreModule, ConfigService, CustomerKeyResolver, SDPInitializer, SDP_INITIALIZER, SDP_PRIORITY_INITIALIZER, KeyValueStoreService, SDP_LOCALES, getLocales, LanguageService, MyHammerConfig, AuthTokenService, HCSClient, HcsModule, KeyvaluestoreModule, LanguageModule, TranslatePipeModule, FeAuthGuard, FeLoginGuard, HCSLoad } from '@fecommerce-workspace/data';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MaterialModule } from './modules/material/material.module';
import { SharedModule } from './modules/main/shared/shared.module';
import { MainGuard } from './guards/main.guard';
import { LoginGuard } from './guards/login.guard';
import { NotSupportedGuard } from './guards/not-supported.guard';
import { MainService } from './modules/main/main.service';
// import * as firebase from 'firebase/app';
// import '@firebase/functions';

// firebase.initializeApp(environment.production)

@NgModule({
  declarations: [
    AppComponent,
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
    TranslatePipeModule,
    DragDropModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    MainGuard,
    LoginGuard,
    NotSupportedGuard,
    ConfigService,
    MainService,
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
