import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { HCSClient } from './hcs-client/hcs-client.service';
import { AuthGuard } from './auth/auth-guard/auth.guard';
import { AuthTokenService } from './auth/auth-token-service/auth-token.service';
import { RouterModule, Router } from '@angular/router';
import { HCSLoad } from './hcs-client/hcs-load';
import { ConfigModule } from '../config/config.module';
import { SDP_INITIALIZER } from '../config/initializer.service';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule,
    HttpClientModule,
    RouterModule,
    JwtModule
  ],
  declarations: [],
  providers: [
    HCSClient,
    AuthTokenService,
    AuthGuard,
    HCSLoad,
    {
      provide: SDP_INITIALIZER,
      useFactory: (hcs: HCSLoad) => () => hcs.load(),
      deps: [ HCSLoad, AuthTokenService ], multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HcsModule { }
