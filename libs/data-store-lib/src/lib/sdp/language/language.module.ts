import { NgModule, Optional, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LanguageService, init_translations, SDP_LOCALES } from './language.service';
import { TranslationService } from '../translation/translation.service';
import { SDP_INITIALIZER } from '../config/initializer.service';
import { KeyvaluestoreModule } from '../keyvaluestore/keyvaluestore.module';


@NgModule({
  imports: [
    KeyvaluestoreModule
  ],
  exports: [],
  declarations: [],
  providers: [
    LanguageService,
    TranslationService,
    {
      provide: SDP_INITIALIZER,
      useFactory: init_translations,
      deps: [LanguageService, TranslationService, [new Optional(), SDP_LOCALES]], multi: true
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LanguageModule { }
