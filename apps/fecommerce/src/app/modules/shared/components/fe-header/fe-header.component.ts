import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { RouterReducerState } from '@ngrx/router-store';

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
  @Input() icon = 'close';

  constructor(private _storeRouter: Store<{router: RouterReducerState}>,
              private _location: Location) {
  }

  ngOnInit(): void {
  }

  goLastVisited(): void {
    this._location.back();
  }

  // ngOnChanges(value: any) {
  //   console.log(value);
  //   if (value && value.style && value.style.currentValue) {
  //     console.log(this.style);
  //   }
  // }

}
