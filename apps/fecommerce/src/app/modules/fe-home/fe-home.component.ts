import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, AfterContentChecked, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { setCurrentOrderRequest, clearCurrentOrderRequest, OrderService, setOrderArticlesRequest } from '@fecommerce-workspace/data-store-lib';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { Order } from '@fecommerce-workspace/data-store-lib';
import { refreshOrdersRequest } from '@fecommerce-workspace/data-store-lib';
import { takeUntil, map } from 'rxjs/operators';
// import * as ordersData from '../../../assets/data/orders.json';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'fecommerce-workspace-home',
  templateUrl: './fe-home.component.html',
  styleUrls: ['./fe-home.component.scss'],
})
export class FeHomeComponent implements OnInit, AfterViewInit, AfterContentChecked, OnDestroy {
  @ViewChild("ordersCard", { read: ElementRef }) ordersCard;
  @ViewChild("ordersCardList", { read: ElementRef }) ordersCardList;
  public orders$: Observable<Order[]>;
  public orders: Order[];
  public display = false;
  public cardOverflows = false;
  private _subscriptions: Subscription;

  constructor(
    private _store: Store,
    private _router: Router,
    private _ordSer: OrderService,
    private _storeOrders: Store<{ orders: Order[] }>,
    private _changeDetector: ChangeDetectorRef
  ) {
    this.orders$ = this._storeOrders.pipe(select('orders'));
    this._subscriptions = this.orders$.subscribe(data => {
      if (data.length) {
        data = data.slice().sort((a, b) => b.id - a.id)
      }
      this.orders = data;
    });
    this._store.dispatch(clearCurrentOrderRequest());
    this._store.dispatch(setOrderArticlesRequest({ orderArticles: [] }));
    this._storeOrders.dispatch(refreshOrdersRequest())
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.cardOverflows = this.checkOrdersCardOverflow();
  }

  ngAfterContentChecked(): void {
    this._changeDetector.detectChanges();
  }


  public createOrder(): void {
    this._bnService.switchCustomer(false);
    this._router.navigate(['/neworder']);
  }

  public openOrder(order: Order): void {
    this._storeOrders.dispatch(setCurrentOrderRequest({ order }))
    this._store.dispatch(setOrderArticlesRequest({ orderArticles: order?.articles }));
    if (this._ordSer.currentOrder?.id){
      this._router.navigate(['/order/edit']);
    } else {
      this._router.navigate(['/order']);
    }
  }

  checkOrdersCardOverflow() {
    const cardHeight = this.ordersCard?.nativeElement.offsetHeight;
    const listHeight = this.ordersCardList?.nativeElement.offsetHeight;
    const cardScroll = this.ordersCard?.nativeElement.scrollHeight;
    if (cardHeight <= listHeight) {
      return true;
    } else {
      return false;
    }
  }

  private _setHeaderHeight() {
    const header = document.getElementById('header');

  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }
}
