import { Injectable } from '@angular/core';
import { LanguageService } from '../language/language.service';

@Injectable({providedIn: 'root'})
export class TranslationService {
  private translation: any;

  constructor(private lang: LanguageService) {
    this.lang.languageChange.subscribe((val: any) => {
      this.translation = val;
    });
  }

  /**
   * Get the translation by the translation ID
   * @param id The id of the translation
   */
  public get(id: string): string {
    if (this.translation !== undefined) {
      return this.translation[id];
    }
  }
}
