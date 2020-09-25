import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { DataService, IHCSParameter } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _users: IUser[] = [
  {
    name: 'angel',
    mail: 'angelcamacho1708@gmail.com',
    password: '123'
  },
  {
    name: 'vale',
    mail: 'angelcamacho1708@gmail.com',
    password: '123'
  },
  {
    name: 'enrique',
    mail: 'angelcamacho1708@gmail.com',
    password: '123'
  },
  {
    name: 'nescar',
    mail: 'angelcamacho1708@gmail.com',
    password: '123'
  },
];
  users = new BehaviorSubject<IUser[]>(this._users);

  private _resource = 'users'

  constructor(private _dataService: DataService) { }

  public getUsers(userQuery: string): Observable<IUser[]> {
    const queryParameters: IHCSParameter[] = [
      {
        key: 'filter',
        value: userQuery
      }
    ];
    return this._dataService.get(this._resource, queryParameters);
  }

  /**
   * @returns All users.
   */
  public getAll(): Observable<IUser[]> {
    // Until we need this method
    return of(this._users)
  }

  /**
   * @returns get scanned user
   */
  public getScannedUser(barcode: string): Observable<IUser[]> {
    const queryParameters: IHCSParameter[] = [
      {
        key: 'barcode',
        value: barcode
      }
    ];
    return this._dataService.get(this._resource, queryParameters);
  }


  /**
   * Create a user
   * @param user
   * @returns user
   */
  public append(user: IUser): Observable<IUser[]> {
    this.users.next({ ...this._users, ...user });
    return this.users.asObservable();
  }

  /**
   * Edit user
   * @param user
   * @returns user
   */
  public replace(user: IUser): Observable<IUser[]> {
    // const index = this._users.findIndex(c => c.id === user.id);
    // this._users[index].address = user.address;
    // this._users[index].address = user.name;
    // this._users[index].address = user.initials;
    // this.users.next(this._users);
    return this.users.asObservable();
  }

  /**
   * Delete user
   * @param userId
   * @returns users
   */
  public delete(userId: any): Observable<IUser[]> {
    // const index = this._users.findIndex(c => c.id === userId);
    // this._users.splice(index, 1);
    // this.users.next(this._users);
    return this.users.asObservable();
  }

}
