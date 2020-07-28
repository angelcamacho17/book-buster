import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHeader } from '../models/header.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private header: IHeader = {
    title: '',
    leftIcon: null,
    rightIcon: null,
    titClass: '',
    lastUrl: '',
    confirmDiscard: false,
    addArt: false,
    centered: false
  }

  constructor(private httpClient: HttpClient) { }

  public setHeader(header: IHeader): Observable<IHeader> {
    this.header = null;
    this.header = header;
    return of(this.header);
  }

  public getHeader(): Observable<IHeader> {
    return of(this.header)
  }
}
