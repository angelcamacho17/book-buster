import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface KeyValue {
  key: string;
  value: string;
}

@Injectable()
export class KeyValueStoreService {
  public db: any;
  public store: any;
  private onDone = new Subject();

  constructor() {}

  public initDatabase(name: string, version = 2): Observable<any> {
    const req = indexedDB.open(name, version);
    req.onupgradeneeded = (e: any) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('keyvaluestore')) {
        db.createObjectStore('keyvaluestore', { keyPath: 'key' });
      }
    };
    req.onsuccess =  (e: any) => {
      this.db = e.target.result;
      this.store = true;
      this.onDone.next();
      this.onDone.complete();
    };
    return this.onDone.asObservable();
  }

  /**
   * Gets the value by key
   * @param key The key you want to retrieve the value from
   */
  get<T>(key: string): Observable<any> {
    const sub = new Subject();
    if (this.store === undefined) {
      this.onDone.subscribe(() => {
        this.executeCommand('get', key, sub);
      });
    } else {
      this.executeCommand('get', key, sub);
    }

    return sub.asObservable().pipe(map((val: any) => {
      if (val !== undefined) {
        val = val.value;
      }
      return val;
    }));
  }

  /**
   * Sets the value of in the keyvalue store
   * @param key The key you want to store the value to
   * @param value The value you want to set
   */
  set(key: string, value: any): Observable<string> {
    const sub = new Subject();
    if (this.store === undefined) {
      this.onDone.subscribe(() => {
        this.executeCommand('put', {
          key,
          value
        }, sub);
      });
    } else {
      this.executeCommand('put', {
        key,
        value
      }, sub);
    }

    return sub.asObservable() as Observable<any>;
  }

  /**
   * Updates a value with the given key and new value
   * @param key The key you want to update the value of
   * @param value The new value you want to replace the old value with
   */
  update(key: string, value: any): Observable<number> {
    const sub = new Subject();
    if (this.store === undefined) {
      this.onDone.subscribe(() => {
        this.executeCommand('put', {
          key,
          value
        }, sub);
      });
    } else {
      this.executeCommand('put', {
        key,
        value
      }, sub);
    }

    return sub.asObservable() as Observable<number>;
  }

  /**
   * Deletes a valuefrom the keyvaluestore
   * @param key The key you want to erase
   */
  delete(key: string): Observable<void> {
    const sub = new Subject();
    if (this.store === undefined) {
      this.onDone.subscribe(() => {
        this.executeCommand('delete', key, sub);
      });
    } else {
      this.executeCommand('delete', key, sub);
    }

    return sub.asObservable() as Observable<any>;
    // return fromPromise(this.table.delete(key)).first();
  }

  private executeCommand(command: string, value: any, sub: Subject<any>): void {
    const trans = this.db.transaction('keyvaluestore', 'readwrite');
    const store = trans.objectStore('keyvaluestore', { autoIncrement: true, keypath: 'key' });
    const req = store[command](value);

    req.onsuccess = (val) => {
      sub.next(req.result);
      sub.complete();
    };

    req.onerror = (val) => {
      console.warn('Something went wrong doing the ' + command + ' with the value: ' + value);
    };
  }

  public clearData() {
    // open a read/write db transaction, ready for clearing the data
    const transaction = this.db.transaction('keyvaluestore', 'readwrite');
    // create an object store on the transaction
    const objectStore = transaction.objectStore('keyvaluestore');

    // Make a request to clear all the data out of the object store
    const objectStoreRequest = objectStore.clear();

    objectStoreRequest.onsuccess = (event) => {

    };
    objectStoreRequest.onerror = (val) => {
    };
  }
}
