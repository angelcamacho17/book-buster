import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHeader } from '../models/header.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public rightIconClicked = new EventEmitter<boolean>();
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
  private cleanHeader;

  constructor(private httpClient: HttpClient) {
    this.cleanHeader = this.header;
  }

  public setHeader(header: IHeader): Observable<IHeader> {
    this.header = this.cleanHeader;
    this.header = header;
    return of(this.header);
  }

  public getHeader(): Observable<IHeader> {
    return of(this.header)
  }

  public onRightIconClick() {
    this.rightIconClicked.emit(true);
  }
}
