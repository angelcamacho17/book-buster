import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { RouterReducerState } from '@ngrx/router-store';
import { AuthService } from '@fecommerce-workspace/data-store-lib';
import { Router } from '@angular/router';

@Component({
  selector: 'fe-header',
  templateUrl: './fe-header.component.html',
  styleUrls: ['./fe-header.component.scss']
})
export class FeHeaderComponent implements OnInit{

  $header: Observable<string>;
  @Input() title = '';
  @Input() class = '';
  @Input() style = '';
  @Input() logoutIcon = false;
  @Input() icon = 'close';

  constructor(private _location: Location,
              private _auth: AuthService,
              private _router: Router) {
  }

  ngOnInit(): void {
  }

  public goLastVisited(): void {
    console.log('back')
    this._location.back();
  }

  public logout(): void {
    this._router.navigate(['/login']);
    //this._auth.logout();
  }

  // ngOnChanges(value: any) {
  //   console.log(value);
  //   if (value && value.style && value.style.currentValue) {
  //     console.log(this.style);
  //   }
  // }

}
