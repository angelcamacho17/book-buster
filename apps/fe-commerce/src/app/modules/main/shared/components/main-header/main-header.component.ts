import { Component, OnInit, OnDestroy, Output, EventEmitter, HostListener } from '@angular/core';
import { IHeader, TranslationService, deleteOrderRequest } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { HeaderService } from 'libs/data-store-lib/src/lib/header/header.service';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit, OnDestroy {

  private _subscriptions: Subscription;
  private header$: Observable<IHeader>;
  public header: IHeader;
  public title: Observable<string> = of(null);
  public leftIcon: Observable<string> = of(null);
  public rightIcon: Observable<string> = of(null);
  public titClass: Observable<string> = of(null);
  public addArt: Observable<boolean> = of(null);
  public centered: Observable<boolean> = of(null);
  @Output() goBack = new EventEmitter<boolean>();

  constructor(private _router: Router,
    public dialog: MatDialog,
    private _transServ: TranslationService,
    private _store: Store<{ header: IHeader }>,
    private _headerService: HeaderService
  ) {
    this.header$ = this._store.pipe(select('header'));
    this._subscriptions = this.header$.subscribe(data => {
      this.header = data;
      this.title = of(this._transServ.get(this.header?.title));
      this.titClass = of(this.header?.titClass);
      this.rightIcon = of(this.header?.rightIcon);
      this.leftIcon = of(this.header?.leftIcon);
      this.addArt = of(this.header?.addArt);
      this.centered = of(this.header?.centered);
    });
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }
  ngOnInit(): void {

  }

  public goLastVisited(): void {
    if (this.header.confirmDiscard) {
      return this.goBack.emit(true);
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

}
