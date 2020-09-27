import { Component, OnDestroy } from '@angular/core';
import { LayoutService } from '../shared/services/layout.service';
import { OrderService, IOrder, TranslationService, HeaderService } from '@fecommerce-workspace/data';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { MainService } from '../main.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  public subscriptions = new Subscription();

  constructor(
    public router: Router,
    public orderService: OrderService,
    public translationService: TranslationService,
    public headerService: HeaderService,
    public layoutService: LayoutService,
    public mainSer: MainService
  ) { }

  /**
   * Post a book.
   */
  public postBook() {

  }

  /**
   * Open category search
   */
  public openCategory(category: string) {
    console.log(category);
    this.router.navigate(['/main/book-search'])
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
