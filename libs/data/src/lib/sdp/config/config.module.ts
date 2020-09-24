import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ConfigService } from './config.service';
import { SDP_PRIORITY_INITIALIZER, SDPInitializer } from './initializer.service';

@NgModule({
  imports: [
  ],
  declarations: [

  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER, useFactory: (val) => {
        return () => {
          return val.onDone.toPromise();
        };
      },
    deps: [SDPInitializer], multi: true
    },
    {
      provide: SDP_PRIORITY_INITIALIZER,
      useFactory: (configService: ConfigService) => () => configService.load('asse'),
      deps: [ConfigService], multi: true
    }
  ],
  exports: [
  ]
})
export class ConfigModule { }
