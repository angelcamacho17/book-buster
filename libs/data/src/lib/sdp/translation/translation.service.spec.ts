import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslationService } from './translation.service';
import { LanguageService } from '../language/language.service';
import { TestBed } from '@angular/core/testing';
import { Language } from '../language/language';
import { KeyvaluestoreModule } from '../keyvaluestore/keyvaluestore.module';

describe('Form control validation tests!', () => {
  let httpTestingController: HttpTestingController;
  let langService: LanguageService;
  let transService: TranslationService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        KeyvaluestoreModule
      ],
      providers: [
        TranslationService,
        LanguageService,
      ]
    }).compileComponents();
    // tslint:disable-next-line: deprecation
    httpTestingController = TestBed.get(HttpTestingController);
    // tslint:disable-next-line: deprecation
    langService = TestBed.get(LanguageService);
    const lang = new Language(2057);
    langService.AVAIBLELANGUAGES = [lang];
    langService.setLanguage(new Language(2057));
    // tslint:disable-next-line: deprecation
    transService = TestBed.get(TranslationService);

    // used to clear locale storage

    httpTestingController.expectOne('assets/locales/translation.en.json').flush({
      el: 'pico',
      zombie: 'hyperdrive',
      martin: 'west'
    });
    httpTestingController.expectOne('assets/locales/coreTranslations.en.json').flush({
      taco: 'bell',
      murica: 'fish',
      venice: 'lava'
    });
  });

  it('Should be able to retrieve translation code', () => {
    expect(transService.get('el')).toBe('pico');
    expect(transService.get('murica')).toBe('fish');
  });
});
