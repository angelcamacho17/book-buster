import { Injectable, InjectionToken, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Language } from './language';
import { ConfigService } from '../config/config.service';
import { KeyValueStoreService } from '../keyvaluestore/keyvaluestore.service';
import { Observable, Subject } from 'rxjs';
import { first, map } from 'rxjs/operators';

export const SDP_LOCALES = new InjectionToken<() => Observable<ILanguageHook>>('SDP_LOCALES');

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private _currentLanguage: Language;

  private DEFAULTLANGUAGE: Language;
  public AVAIBLELANGUAGES: Array<Language> = new Array<Language>();

  readonly languageChange: Subject<any> = new Subject();
  readonly beforeLanguageChange: Subject<any> = new Subject();

  get currentLanguage(): Language {
    return this._currentLanguage;
  }

  constructor(private http: HttpClient, private config: ConfigService, private store: KeyValueStoreService) { }

  /**
   * Will reset the avaible langauges
   * @param hook The hook to retrieve the avaible languages
   */
  public resetLanguage(hook: () => Observable<ILanguageHook>): Observable<any> {
    this.AVAIBLELANGUAGES = new Array<Language>();
    const sub = new Subject();
    hook().subscribe((val) => {
      if (val === undefined) {
        this.innerSetNewLanguages(this.config.get('LOCALES'), this.config.get('DEFAULTLOCALE'), sub);
      } else {
        this.innerSetNewLanguages(val.languages, val.defaultLanguage, sub);
      }
      this.setLanguageAfterReset();
      sub.complete();
    });
    return sub;
  }

  /**
   * Sets the language automatically
   * @param hook The hook that will be executed for retreiving the languages
   */
  public setLanguageAutomatic(hook: () => Observable<ILanguageHook>): void {
    if (hook !== null) {
      hook().subscribe((val) => {
        if (val !== undefined) {
          this.resolveLanguage(val.languages, val.defaultLanguage);
        } else {
          this.resolveLanguage(this.config.get('LOCALES'), this.config.get('DEFAULTLOCALE'));
        }
      });
    } else {
      this.resolveLanguage(this.config.get('LOCALES'), this.config.get('DEFAULTLOCALE'));
    }
  }

  /**
   * Converts the langauge in the right format and sets the language
   * @param lcids all the avaible languages
   * @param def the default langauge
   */
  private resolveLanguage(lcids: Array<number>, def: number) {
    this.DEFAULTLANGUAGE = new Language(def, 1);
    this.setAvaibleLanguages(lcids);

    this.retrieveLanguage().subscribe((val) => {
      if (this.isLangAvaible(val)) {
        this.setLanguage(val);
      } else {
        this.setLanguage(this.DEFAULTLANGUAGE);
      }
    });
  }

  /**
   * Sets the avaible langauges of the service
   * @param lcid all tha avaible langauges
   */
  private setAvaibleLanguages(lcid: Array<number>): void {
    lcid.forEach((id: number, index: number) => {
      this.AVAIBLELANGUAGES.push(new Language(id, index + 1));
    });
  }

  public getIndexByLanguage(lang: Language): number {
    let i = 0;
    this.AVAIBLELANGUAGES.forEach((val, index) => {
      if (val.id === lang.id) {
        i = index;
      }
    });
    return i;
  }

  /**
   * Retrieves the browser languages if no browser languages is present return the default one
   */
  private retrieveLanguage(): Observable<any> {
    return this.store.get('selectedLanguage').pipe(map((val) => {
      if (val === '' || val === undefined) {
        return this.retrieveBrowserLanguage();
      } else {
        return val;
      }
    }));
  }

  /**
   * Sets the lanuage of the application
   * @param languageID The language ID
   */
  public setLanguage(lang: Language): void {
    this.beforeLanguageChange.next();

    this.http.get('assets/locales/translation.' + lang.code + '.json').subscribe((language: any) => {
      this.http.get('assets/locales/coreTranslations.' + lang.code + '.json').subscribe((val) => {
        this._currentLanguage = lang;
        this.store.set('selectedLanguage', lang as any).subscribe();
        this.languageChange.next(Object.assign(val, language));
      });
    });
  }

  /**
   * Check after a reset if the current language if still avaible if not switch to default language
   */
  private setLanguageAfterReset(): void {
    if (this.isLangAvaible(this.currentLanguage) !== true) {
      this.setLanguage(this.DEFAULTLANGUAGE);
    }
  }

  /**
   * Resets the current avaible languages and the new languages
   * @param codes The new avaible language codes
   * @param defaultCode The default language code
   * @param sub Subscription to fire when its done
   */
  private innerSetNewLanguages(codes: Array<number>, defaultCode: number, sub: Subject<any>): void {
    this.DEFAULTLANGUAGE = new Language(defaultCode, 1);
    this.setAvaibleLanguages(codes);
    sub.next();
  }

  /**
   * Gets the browser language
   */
  private getBrowserLanguage(): string {
    return navigator.language;
  }

  /**
   * Check if the langauge is in the avaible languages
   * @param lang The language to check on
   */
  private isLangAvaible(lang: Language) {
    let isAv = false;
    for (const language of this.AVAIBLELANGUAGES) {
      if (language.id === lang.id) {
        isAv = true;
        break;
      }
    }
    // for (let i = 0; i < this.AVAIBLELANGUAGES.length; i++) {
    //   if (this.AVAIBLELANGUAGES[i].id === lang.id) {
    //     isAv = true;
    //     break;
    //   }
    // }
    return isAv;
  }

  /**
   * Get the language in the avaible languages by code
   * @param langCode the langauge code
   */
  private getLanguageByCode(langCode: string): Language {
    let lang: Language = this.DEFAULTLANGUAGE;
    this.AVAIBLELANGUAGES.forEach((val: Language) => {
      if (val.code === langCode) {
        lang = val;
        return;
      }
    });
    return lang;
  }

  /**
   * retrieves the browserlanguage
   */
  private retrieveBrowserLanguage(): Language {
    const browserLang = this.getBrowserLanguage();
    const buffer = browserLang.split('-')[0];
    return this.getLanguageByCode(buffer);
  }

}

export function init_translations(languageService: LanguageService, buffer: any, locales: any): any {
  return () => {
    languageService.setLanguageAutomatic(locales);
    return languageService.languageChange.pipe(first());
  };
}

export interface ILanguageHook {
  defaultLanguage: number;
  languages: Array<number>;
}
