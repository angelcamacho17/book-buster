import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslationService } from '../translation/translation.service';
import { LanguageService } from '../language/language.service';

@Pipe({
    name: 'translate',
    pure: false
})

export class TranslatePipe implements PipeTransform, OnDestroy {
    private previousValue: string;
    private subscription: Subscription;

    constructor(private translate: TranslationService, private lang: LanguageService) {
        this.subscription = this.lang.languageChange.subscribe(() => {
            this.previousValue = undefined;
        });
    }

    transform(value: any, ...args: any[]): any {
        if (this.previousValue === undefined) {
            this.previousValue = this.translate.get(value);
        }
        return this.previousValue;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
