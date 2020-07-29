import { Component, OnInit, Input } from '@angular/core';
import { OrderService, getCurrentOrderRequest, IOrder, ICustomer, BackNavigationService } from '@fecommerce-workspace/data-store-lib';
import { EventService } from '../../../../../services/event.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'customer-row',
  templateUrl: './customer-row.component.html',
  styleUrls: ['./customer-row.component.scss']
})
export class CustomerRowComponent implements OnInit {
  @Input() item: any;

  constructor(
    private eventService: EventService,
    private _orderService: OrderService,
    private _store: Store<{ currentOrder: IOrder }>,
    private router: Router,
    private _backNavigationService: BackNavigationService
    ) { }

  ngOnInit(): void {
  }

  public getInitials(): string {
    const fullName = this.item.name;
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

  private getChar(text: string, index: number) {
    return text.charAt(index);
  }

  public onSelectCustomer(customer: ICustomer): void {
    console.log('select customer article')
    this.eventService.customerChanged(customer);
    // this.eventService.customerChanged(customer);
    // this._store.dispatch(getCurrentOrderRequest());
    // if (this._backNavigationService.switchCus) {
    //   if (this._orderService.currentOrder?.id){
    //     this.router.navigate(['/order/edit']);
    //   } else {
    //     this.router.navigate(['/order']);
    //   }
    // } else {
    //   this.router.navigate(['/article']);
    // }
  }
}
