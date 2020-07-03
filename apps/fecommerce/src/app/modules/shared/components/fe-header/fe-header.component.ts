import { Component, OnInit, Input, OnChanges, Output, EventEmitter, OnDestroy, HostListener } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, Subject } from 'rxjs';
import { Location } from '@angular/common';
import { AuthService, goBackNavigationRequest, appendBackNavigationRequest, getCurrentOrderRequest, changedNavigationRequest, deleteOrderRequest, Order, OrderService, TranslationService, HeaderService } from '@fecommerce-workspace/data-store-lib';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { FeDialogComponent } from '../fe-dialog/fe-dialog.component';

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
  @Input() addArt = false;
  @Input() icon = 'close';
  @Input() delete = false;
  @Input() createFlowRoute = null;
  @Input() needsConfirm = false;
  @Input() lastUrl = '';
  @Input() headerSearch = false;
  @Output() goBack = new EventEmitter<boolean>();
  @Output() returnUrl = new EventEmitter<boolean>();
  public shadow = false;
  private _subscriptions = new Subject<any>();

  constructor(private _router: Router,
              public hedSer: HeaderService,
              public dialog: MatDialog,
              private _transServ: TranslationService,
              private _store: Store<{ currentOrder: Order }>) {
  // this.url$ = this._storeUrl.pipe(select('backNavigation'));
    // this.url$.pipe(takeUntil(this._subscriptions))
    // .subscribe(data => {
    //     // If the route should not be chronologically
    //     this._backUrl = data;
    //     if (this._backUrl && this._backUrl!=='') {
    //       this._router.navigate(['/'+ this._backUrl]);
    //     }
    // });
  }

  ngOnInit(): void {
    //this._storeUrl.dispatch(appendBackNavigationRequest({url: this.currentUrl}));
  }

  public goLastVisited(): void {
    if (this.needsConfirm) {
      return this.goBack.emit(true);
    } else {
      this.returnLastUrl();
    }
  }

  private returnLastUrl(): void {
    this._router.navigate(['/'+ this.lastUrl]);
    //this._storeUrl.dispatch(goBackNavigationRequest());
  }

  public logout(): void {
    this._router.navigate(['/login']);
  }

  public deleteOrder(): void {
    const dialogRef = this.dialog.open(FeDialogComponent, {
      width: '280px',
      height: '120px',
      data: {
        msg: this._transServ.get('deleteord'),
        firstButton: this._transServ.get('cancel'),
        secondButton: this._transServ.get('delete'),
        buttonColor: 'red'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data === undefined) {
        // Is undefined when the user closes
        // the dialog without an action
        return;
      }
      if (data?.result === 'DELETE') {
        this._store.dispatch(deleteOrderRequest());
        this._router.navigate(['/home']);
      }
    });
  }

  public addArticle(): void {
    this._router.navigate(['/article']);
  }

  ngOnDestroy(): void {
    this._subscriptions.next();
    this._subscriptions.complete();
    this.hedSer.dropShadow = false;
  }
}
