import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { RouterReducerState } from '@ngrx/router-store';

@Component({
  selector: 'fe-header',
  templateUrl: './fe-header.component.html',
  styleUrls: ['./fe-header.component.scss']
})
export class FeHeaderComponent implements OnInit {

  $header: Observable<string>;
  @Input() title = '';
  @Input() class = '';
  @Input() style = '';
  @Input() icon = 'close';
  @Input() needsConfirm = false;
  @Output() goBack = new EventEmitter<boolean>();

  constructor(
    private _storeRouter: Store<{ router: RouterReducerState }>,
    private _location: Location
  ) { }

  ngOnInit(): void {
  }

  goLastVisited(): void {
    if (this.needsConfirm) {
      return this.goBack.emit(true);
    }
    this._location.back();
  }

  // ngOnChanges(value: any) {
  //   console.log(value);
  //   if (value && value.style && value.style.currentValue) {
  //     console.log(this.style);
  //   }
  // }
}
