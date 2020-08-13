import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { IHeader, TranslationService, HeaderService } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable, of, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit, OnDestroy {

  public _subscriptions = new Subscription();
  public header$: Observable<IHeader>;
  public header: IHeader;
  public checkGoBack;
  public title: Observable<string> = of(null);
  public leftIcon: Observable<string> = of(null);
  public rightIcon: Observable<string> = of(null);
  public rightIconClass: Observable<string> = of(null);
  public titClass: Observable<string> = of(null);
  public addArt: Observable<boolean> = of(null);
  public centered: Observable<boolean> = of(null);

  constructor(public router: Router,
    public dialog: MatDialog,
    public translationService: TranslationService,
    public store: Store<{ header: IHeader }>,
    public headerService: HeaderService,
    public layoutService: LayoutService
  ) {
    this.header$ = this.store.pipe(select('header'));
    this._subscriptions.add(
      this.header$.subscribe((data) => {
        this.header = data;
        this._setHeaderData(data);
      })
    );
  }

  public _setHeaderData(data: IHeader) {
    this.checkGoBack = data?.checkGoBack;
    this.title = of(this.translationService.get(data?.title));
    this.titClass = of(data?.titClass);
    this.rightIcon = of(data?.rightIcon);
    this.rightIconClass = of(data?.rightIconClass);
    this.leftIcon = of(data?.leftIcon);
    this.addArt = of(data?.addArt);
    this.centered = of(data?.centered);
  }

  ngOnInit(): void {

  }

  public goLastVisited(): void {
    if (this.checkGoBack) {
      this.headerService.onGoBack();
    } else {
      this.returnLastUrl();
    }
  }

  public returnLastUrl(): void {
    this.router.navigate(['/' + this.header.lastUrl]);
    //this._storeUrl.dispatch(goBackNavigationRequest());
  }

  public rightIconClicked() {
    this.headerService.onRightIconClick();
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }

}
