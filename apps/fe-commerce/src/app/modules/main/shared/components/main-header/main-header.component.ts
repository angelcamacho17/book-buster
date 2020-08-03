import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { IHeader, TranslationService, HeaderService } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable, of, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit, OnDestroy {

  private _subscriptions$ = new Subject<any>();
  private header$: Observable<IHeader>;
  public header: IHeader;
  private _confirmDiscard;
  public title: Observable<string> = of(null);
  public leftIcon: Observable<string> = of(null);
  public rightIcon: Observable<string> = of(null);
  public titClass: Observable<string> = of(null);
  public addArt: Observable<boolean> = of(null);
  public centered: Observable<boolean> = of(null);

  constructor(private _router: Router,
    public dialog: MatDialog,
    private _translationService: TranslationService,
    private _store: Store<{ header: IHeader }>,
    private _headerService: HeaderService
  ) {
    this.header$ = this._store.pipe(select('header'));
    this.header$.pipe(
      takeUntil(this._subscriptions$)
    ).subscribe((data) => {
      this.header = data;
      this._setHeaderData(data);
    });
  }

  private _setHeaderData(data: IHeader) {
    this._confirmDiscard = data?.confirmDiscard;
    this.title = of(this._translationService.get(data?.title));
    this.titClass = of(data?.titClass);
    this.rightIcon = of(data?.rightIcon);
    this.leftIcon = of(data?.leftIcon);
    this.addArt = of(data?.addArt);
    this.centered = of(data?.centered);
  }

  ngOnInit(): void {

  }

  public goLastVisited(): void {
    if (this._confirmDiscard) {
      this._headerService.onGoBack();
    } else {
      this.returnLastUrl();
    }
  }

  private returnLastUrl(): void {
    this._router.navigate(['/' + this.header.lastUrl]);
    //this._storeUrl.dispatch(goBackNavigationRequest());
  }

  public rightIconClicked() {
    this._headerService.onRightIconClick();
  }

  ngOnDestroy(): void {
    if (this._subscriptions$) {
      this._subscriptions$.unsubscribe();
    }
    this._subscriptions$.next();
    this._subscriptions$.complete();
  }

}
