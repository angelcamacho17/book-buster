
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { KeyValueStoreService } from '../../keyvaluestore/keyvaluestore.service';
import { ConfigService } from '../../config/config.service';
import { ILanguageHook } from '../../language/language.service';
import { isUndefined } from 'util';
​
const langCodes = {
    es: 1034,
    en: 2057,
    nl: 2067,
    fr: 2060
};
​
export function getLocales(
    store: KeyValueStoreService,
    config: ConfigService
): () => Observable<ILanguageHook> {
    return () => {
        const sub = new Subject<ILanguageHook>();
        store.get(config.get('APPKEY') + '_USER').subscribe((user: any) => {
            if (user) {
                sub.next(retrieveUserLangData(config, user));
            } else {
                retrieveDeviceLangData(config).subscribe((result) => {
                    sub.next(result);
                });
            }
        });
        return sub.pipe(first());
    };
}
​
/**
 * Only set languages that are supported based on config json LOCALES
 */
export function retrieveUserLangData(config: ConfigService, user: any): ILanguageHook {
    if (isUndefined(user) || (isUndefined(user.appLanguage)
        && (isUndefined(user.languages) || user.languages.length === 0))) {
        return undefined;
    }
    const langIDs = new Array<number>();
    let priorityID: any;
    if (user.appLanguage && config.get('LOCALES').includes(user.appLanguage)) {
        priorityID = user.appLanguage;
        langIDs.push(user.appLanguage);
    } else if (user.languages) {
        user.languages.map((v) => {
            if (config.get('LOCALES').includes(v.id)) {
                langIDs.push(v.id);
                if (v.priority === 1) {
                    priorityID = v.id;
                }
            }
        });
    }
    if (langIDs.length === 0) {
        langIDs.push(config.get('LOCALES'));
    }
    if (priorityID === undefined) {
        priorityID = config.get('DEFAULT_LOCALE');
    }
    return {
        defaultLanguage: priorityID,
        languages: langIDs
    };
}
​
​
function retrieveDeviceLangData(config: ConfigService): Observable<ILanguageHook> {
    const defaultLangCode = navigator.language.split('-')[0];
    let defaultLangId = langCodes[defaultLangCode];
    if (isUndefined(defaultLangId) ||
        !config.get('LOCALES').includes(defaultLangId)) {
        defaultLangId = config.get('DEFAULT_LOCALE');
    }
    return of({
        defaultLanguage: defaultLangId,
        languages: [defaultLangId]
    });
}
