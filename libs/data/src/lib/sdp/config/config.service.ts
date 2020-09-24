import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ConfigService {
  private configs = {
                      "NAME": "fe-commerce-app",
                      "APPKEY": "FECOMMERCE",
                      "ENDPOINT": "https://hcsstaging.sdp.biz/api/proxy",
                      "REQUEST_TIMEOUT": 10000,
                      "LOGINURL": "/login",
                      "LOCALES": [
                          1034,
                          2057,
                          1036,
                          1043,
                          2067,
                          2060,
                          11274
                      ],
                      "DEFAULT_LOCALE": 2057,
                      "VERSION": "0.0.1"
                    }


  constructor(private httpClient: HttpClient) {}

  /**
   * Loads config items from a json-file url
   * @param url url to the json file containing config items
   */
  load(url: string) {

    return of(this.configs);

    // return this.httpClient.get(url).pipe(
    //   tap((res) => {
    //     this.configs = res;
    //   }),
    //   catchError((error) => {
    //     return throwError(error);
    //   })
    // );
  }

  /**
   * Get an app settings
   * @param appSetting key to retrieve a config item
   */
  get(appSetting: string) {
    return this.configs[appSetting];
  }
}
