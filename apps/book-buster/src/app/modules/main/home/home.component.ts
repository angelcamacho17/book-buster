import { Component, OnDestroy } from '@angular/core';
import { LayoutService } from '../shared/services/layout.service';
import { OrderService, IOrder, TranslationService, HeaderService, clearCurrentOrderRequest, setOrderArticlesRequest, refreshOrdersRequest, setCurrentOrderRequest, replaceCurrentOrderRequest, IOrderArticle } from '@fecommerce-workspace/data-store-lib';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  public subscriptions = new Subscription();
  public categories = ['Software', 'Medicine', 'Culture', 'Love', 'Math', 'Science']

  constructor(
    public store: Store<{ orders: IOrder[], currentOrder: IOrder }>,
    public router: Router,
    public orderService: OrderService,
    public translationService: TranslationService,
    public headerService: HeaderService,
    public layoutService: LayoutService
  ) { }

  /**
   * Post a book.
   */
  public postBook() {

  }

  /**
   * Logout of the app.
   */
  public logout() {
    this.router.navigate(['/login'])
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
