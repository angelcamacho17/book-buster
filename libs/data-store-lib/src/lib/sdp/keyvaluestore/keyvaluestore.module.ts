import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { KeyValueStoreService } from './keyvaluestore.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    KeyValueStoreService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KeyvaluestoreModule { }
