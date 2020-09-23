import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IOrder,IArticleLine } from '@fecommerce-workspace/data-store-lib';
import { OrderService, TranslationService, HeaderService, AuthService } from '@fecommerce-workspace/data-store-lib';
import { HomeComponent } from '../home.component';
import { LayoutService } from '../../shared/services/layout.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'home-tablet',
  templateUrl: './home-tablet.component.html',
  styleUrls: ['./home-tablet.component.scss']
})
export class HomeTabletComponent extends HomeComponent implements OnDestroy {
  public initials = '';
  public orderArticles: IArticleLine[] = [];
  public orderArticles$: Observable<IArticleLine[]>;
  public totalPrice = 0;

  constructor(
    public store: Store<{ orders: IOrder[], currentOrder: IOrder }>,
    public router: Router,
    public orderService: OrderService,
    public translationService: TranslationService,
    public headerService: HeaderService,
    public layoutService: LayoutService,
    public authService: AuthService
  ) {
    super(
      store,
      router,
      orderService,
      translationService,
      headerService,
      layoutService,
      authService
    );
    setTimeout(() => {
      this.loading = true;
    });
    this.subscribeToOrders();
    this.subscribeToCurrentOrder();
    this.subscribeToHeader();
    this.clearData();
    this.refreshOrders();
  }

  /**
   * Create order.
   */
  public createOrder() {
    this.orderService.orderFlow = 'new';
    this.clearData();
    this.router.navigate(['/main/order-overview']);
  }

  /**
   * Open an exizsting order.
   * @param order
   */
  public openOrder(order: IOrder): void {
    this.orderService.orderFlow = 'edit';
    this.router.navigate(['/main/order-overview']);
  }

  /**
   * To preview an order in the rioght side of the screen.
   * @param order
   */
  public previewOrder(order: IOrder): void {
    setTimeout(() => {
      this.previewLoading = true;
    });
    this.clearData();
    this.setCurrentOrder(order);
  }

  /**
   * Subscribe to current order reducer.
   */
  public subscribeToCurrentOrder() {
    this.currentOrder$ = this.store.pipe(select('currentOrder'));
    this.subscriptions.add(
      this.currentOrder$.subscribe((data: any) => {
        this.currentOrder = data;
        this.initials = this.getInitials()
        this.previewLoading = false;
      })
    );
  }

  /**
   * get initials per customer.
   */
  public getInitials(): string {
    const fullName = this.currentOrder?.customer?.name;
    if (fullName) {
      const name: string[] = fullName.split(' ');
      let initials: string;
      if (name.length > 2) {
        initials = `${this.getChar(name[0], 0)}${this.getChar(name[1], 0)}${this.getChar(name[2], 0)}`;
      } else if (name.length > 1) {
        initials = `${this.getChar(name[0], 0)}${this.getChar(name[1], 0)}`;
      } else {
        initials = `${this.getChar(name[0], 0)}`;
      }
      return initials.toUpperCase();
    }
  }

  /**
   * Get first letter.
   * @param text
   * @param index
   */
  private getChar(text: string, index: number) {
    return text.charAt(index);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
