import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHeader } from '../models/header.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public rightIconClicked = new EventEmitter<boolean>();
  public goBack = new EventEmitter<boolean>();
  private header: IHeader = {
    title: '',
    leftIcon: null,
    rightIcon: null,
    titClass: '',
    lastUrl: '',
    checkGoBack: false,
    addArt: false,
    centered: false
  }
  private cleanHeader;

  constructor(private httpClient: HttpClient) {
    this.cleanHeader = this.header;
  }

  /**
   * set header options
   * @param header
   */
  public setHeader(header: IHeader): Observable<IHeader> {
    this.header = this.cleanHeader;
    this.header = header;
    return of(this.header);
  }

  /**
   * @returns header options
   */
  public getHeader(): Observable<IHeader> {
    return of(this.header)
  }

  /**
   * Emits go back button action
   */
  public onGoBack() {
    this.goBack.emit(true);
  }

  /**
   * Emits right button action
   */
  public onRightIconClick() {
    this.rightIconClicked.emit(true);
  }
}
