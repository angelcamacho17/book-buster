import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TranslatePipe } from './translate.pipe';
import { TranslateDynamicPipe } from './translate.dynamic.pipe';

@NgModule({
    imports: [],
    exports: [
        TranslatePipe,
        TranslateDynamicPipe
    ],
    declarations: [
        TranslatePipe,
        TranslateDynamicPipe
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TranslatePipeModule { }
