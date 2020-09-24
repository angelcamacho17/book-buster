import { IComparable } from '../utils/data/comparable.interface';

export class Language implements ILanguage, IComparable {
  public descr: string;
  public code: string;
  public priority: number;

  constructor(public id: number, priority?: number) {
    this.priority = priority;
    this.code = lcidToCode[id];
    this.descr = lcidToLocale[id];
  }

  public valueOf(): string {
    return this.code;
  }
}

// export const codeToLcid = {
//   'nl': 2067,
//   'fr': 2060,
//   'en': 2057,
//   'es': 1034
// }

const lcidToCode = {
  2067: 'nl',
  2060: 'fr',
  2057: 'en',
  11274: 'es',
  1034: 'es',
  1036: 'fr',
  1043: 'nl'
};

const lcidToLocale = {
  2067: 'Nederlands',
  2060: 'Français',
  2057: 'English',
  11274: 'Spanish',
  1034: 'Spanish',
  1036: 'Français',
  1043: 'Nederlands'
};

interface ILanguage {
  descr: string;
  id: number;
  priority: number;
}
