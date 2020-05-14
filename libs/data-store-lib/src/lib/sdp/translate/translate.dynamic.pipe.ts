import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../translation/translation.service';

@Pipe({
    name: 'translateDynamic',
    pure: false
})

export class TranslateDynamicPipe implements PipeTransform {

    constructor(private translate: TranslationService) {
    }

    transform(value: any, ...args: any[]): any {
        return this.translate.get(value);
    }
}
