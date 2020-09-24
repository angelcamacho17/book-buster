import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private _prefix = 'POI_';
  constructor() { }

  setKey(key: string, value: any): void {
    const keyName = this._prefix + key;
    localStorage.setItem(keyName, JSON.stringify(value))
  }

  getKey(key: string): any {
    const keyName = this._prefix + key;
    const value = localStorage.getItem(keyName);
    return value ? JSON.parse(value) : null;
  }

  removeKey(key: string): void {
    const keyName = this._prefix + key;
    localStorage.removeItem(keyName);
  }
}