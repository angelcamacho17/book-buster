import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../sdp/config/config.service';
import { Observable } from 'rxjs';
import { AuthTokenService } from '../sdp/hcs/auth/auth-token-service/auth-token.service';
import { HCSClient } from '../sdp/hcs/hcs-client/hcs-client.service';

export interface IHCSParameter {
  key: string,
  value: any;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _baseUrl = '/rob/';

  private _httpHeader = new HttpHeaders({
    'Content-Type': 'application/ x-www-form-urlencoded'
  });
  private _hcsOptions = {
    header: this._httpHeader,
    body: null
  };

  constructor(
    private _hcsClient: HCSClient
  ) { }

  public get<T>(resource: string, queryParameters?: IHCSParameter[]): Observable<T> {
    let url = this._generateUrl(resource);
    if (queryParameters) {
      url = this._setQueryParameters(url, queryParameters);
    }
    return this._hcsClient.get(url);
  }

  public create<T>(resource: string, bodyParameters: IHCSParameter[]): Observable<T> {
    this._setBodyParameters(bodyParameters);
    return this._hcsClient.post(this._generateUrl(resource), this._hcsOptions);
  }

  public update<T>(resource: string, bodyParameters: IHCSParameter[]): Observable<T> {
    this._setBodyParameters(bodyParameters);
    return this._hcsClient.put(this._generateUrl(resource), this._hcsOptions);
  }

  public delete<T>(resource: string): Observable<T> {
    return this._hcsClient.delete(this._generateUrl(resource));
  }

  /**
   * returns a url with all the query parameters concatenated
   * @return url
   */
  private _setQueryParameters(url: string, parameters: IHCSParameter[]): string {
    let counter = 0;
    parameters.forEach((parameter) => {
      url += counter === 0 ? '?' : '&';
      url += `${parameter.key}=${parameter.value.toString()}`
      counter++;
    })
    return url;
  }

  /**
   * This method iterates through the parameters list
   * sent as a function parameter on any request.
   */
  private _setBodyParameters(parameters: IHCSParameter[]): void {
    let body = new HttpParams();
    parameters.forEach((parameter) => {

      body = body.set(parameter.key.toString(), this._parameterValueType(parameter.value));

    });
    this._hcsOptions.body = body;
  }

  private _parameterValueType(value): string {
    if (Array.isArray(value)) {
      return JSON.stringify(value);
    }
    return value.toString();
  }

  /**
   * Concatenates the base url with the url
   * of the resource sent as a parameter
   * on the CRUD method.
   */
  private _generateUrl(resource: string) {
    // @TODO - remove 'rob' API namespace
    return this._baseUrl + resource;
  }
}
