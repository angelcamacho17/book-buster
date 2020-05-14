import { Injectable } from '@angular/core';

@Injectable()
export class ConfigServiceMock {

    private configs = {
        NAME: 'gloob',
        APIKEY: '3b216d6d416526e3cd285731757eb65b',
        APPKEY: 'Space_Boi',
        ENDPOINT: 'http://localhost:3000/web/hcs',
        LOGINURL: 'login',
        REQUEST_TIMEOUT: 1000,
        LOCALES: [
            2057,
            2067
        ],
        DEFAULT_LOCALE: 2057,
        AUTHENTICATION_ENDPOINT: 'http://localhost:3000/web/hcs'
    };

    load(url: string) {
        return new Promise((resolve, reject) => {
        });
    }

    get(appSetting: string) {
        return this.configs[appSetting];
    }

}
