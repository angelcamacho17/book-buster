import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setHeaderTitleRequest } from 'projects/data-store/src/lib/header/header.actions';

@Component({
  selector: 'app-fe-home',
  templateUrl: './fe-home.component.html',
  styleUrls: ['./fe-home.component.scss']
})
export class FeHomeComponent implements OnInit {

  constructor( private _store: Store) {
    this._store.dispatch(setHeaderTitleRequest({title: 'home'}));
  }

  ngOnInit(): void {
  }

}
