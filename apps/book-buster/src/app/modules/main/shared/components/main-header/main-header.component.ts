import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { IHeader, TranslationService, HeaderService } from '@fecommerce-workspace/data';
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
  public profIcon: Observable<boolean> = of(false);
  public rightIcon: Observable<string> = of(null);
  public rightIconClass: Observable<string> = of(null);
  public titClass: Observable<string> = of(null);
  public addArt: Observable<boolean> = of(null);
  public centered: Observable<boolean> = of(null);
  @Output() toggle = new EventEmitter<any>();

  constructor(public router: Router,
    public dialog: MatDialog,
    public translationService: TranslationService,
    public store: Store<{ header: IHeader }>,
    public headerService: HeaderService,
    public layoutService: LayoutService,
  ) {
    this.header$ = this.store.pipe(select('header'));
    this._subscriptions.add(
      this.header$.subscribe((data) => {
        this.header = data;
        this._setHeaderData(data);
      })
    );
  }

  public onToggle() {
    this.toggle.emit()
  }

  public _setHeaderData(data: IHeader) {
    this.checkGoBack = data?.checkGoBack;
    this.title = of(this.translationService.get(data?.title));
    this.titClass = of(data?.titClass);
    this.rightIcon = of(data?.rightIcon);
    this.rightIconClass = of(data?.rightIconClass);
    if (data?.profIcon) {
      this.profIcon = of(data?.profIcon);
    } else {
      this.profIcon = of(false);
    }
    this.leftIcon = of(data?.leftIcon);
    this.addArt = of(data?.addArt);
    this.centered = of(data?.centered);
  }

  ngOnInit(): void {

  }

  /**
   * handle go to last url visited.
   */
  public goLastVisited(): void {
    if (this.checkGoBack) {
      this.headerService.onGoBack();
    } else {
      this.returnLastUrl();
    }
  }

  /**
   * Return last url.
   */
  public returnLastUrl(): void {
    if (this.header.lastUrl === 'loc') {
      this.router.navigate(['/' + this.header.lastUrl]);
    } else {
      this.router.navigate(['/' + this.header.lastUrl]);
    }
    //this._storeUrl.dispatch(goBackNavigationRequest());
  }

  /**
   * Right icon click
   */
  public rightIconClicked() {
    this.headerService.onRightIconClick();
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }

}
