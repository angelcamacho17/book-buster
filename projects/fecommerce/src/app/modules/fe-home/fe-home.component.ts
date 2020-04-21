import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setHeaderTitleRequest } from 'projects/data-store-lib/src/lib/header/header.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fe-home',
  templateUrl: './fe-home.component.html',
  styleUrls: ['./fe-home.component.scss']
})
export class FeHomeComponent implements OnInit {

  constructor(private _store: Store,
              private _router: Router) {
    this._store.dispatch(setHeaderTitleRequest({title: 'home'}));
  }

  ngOnInit(): void {
  }

  public createOrder(): void {
    console.log('here');
    this._router.navigate(['/order']);
  }

}
