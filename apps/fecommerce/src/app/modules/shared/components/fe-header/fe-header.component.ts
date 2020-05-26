import { Component, OnInit, Input, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { AuthService, goBackNavigationRequest, appendBackNavigationRequest } from '@fecommerce-workspace/data-store-lib';
import { Router } from '@angular/router';

@Component({
  selector: 'fe-header',
  templateUrl: './fe-header.component.html',
  styleUrls: ['./fe-header.component.scss']
})
export class FeHeaderComponent implements OnInit, OnDestroy {

  url$: Observable<string>;
  @Input() title = '';
  @Input() class = '';
  @Input() style = '';
  @Input() logoutIcon = false;
  @Input() icon = 'close';
  @Input() needsConfirm = false;
  @Input() currentUrl = '';
  @Output() goBack = new EventEmitter<boolean>();
  @Output() returnUrl = new EventEmitter<boolean>();
  private _backUrl: string;
  private _subscriptions = new Subscription();

  constructor(private _location: Location,
              private _auth: AuthService,
              private _router: Router,
              private _storeUrl: Store<{ backNavigation: string }>) {
    this.url$ = this._storeUrl.pipe(select('backNavigation'));
    this._subscriptions.add(this.url$.subscribe(data => {
      this._backUrl = data;
      console.log(data);
      if (this._backUrl && this._backUrl!=='') {
        this._router.navigate(['/'+ this._backUrl]);
      }
    }));
  }

  ngOnInit(): void {
    this._storeUrl.dispatch(appendBackNavigationRequest({url: this.currentUrl}));
  }

  ngOnDestroy(): void {
    if(this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }

  public goLastVisited(): void {
    if (this.needsConfirm) {
      return this.goBack.emit(true);
    } else {
      this.returnLastUrl();
    }
  }

  private returnLastUrl(): void {
    this._storeUrl.dispatch(goBackNavigationRequest());
    // console.log('here');
    // this.returnUrl.emit(true);
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
