import { Component, Input, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { ICustomer } from '@fecommerce-workspace/data';
import { EventService } from '../../../services/event.service';


@Component({
  selector: 'customer-row',
  templateUrl: './customer-row.component.html',
  styleUrls: ['./customer-row.component.scss']
})
export class CustomerRowComponent implements OnDestroy {
  // @Output() customerChange = new EventEmitter<Customer>();
  @Input() item: ICustomer;
  public smaller: Observable<boolean>;
  public initials = '';
  private _subscriptions = new Subscription();
  constructor(
    private eventService: EventService
  ){
    if (this.item) {
      this.smaller = this.reduceLetterSize();
    }
  }

  /**
   * Handle letter size.
   */
  private reduceLetterSize(): Observable<boolean> {
    const fullName = this.item.name;
    if (fullName) {
      const name: string[] = fullName.split(' ');
      if (name.length > 2) {
        return of(true);
      }
      else {
        return of(false);
      }
    }
  }

  /**
   * get initials per customer.
   */
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

  /**
   * Get first letter.
   * @param text
   * @param index
   */
  private getChar(text: string, index: number) {
    return text.charAt(index);
  }

  /**
   * Emit customer select event.
   * @param event
   * @param customer
   */
  public onSelectCustomer(event, customer: ICustomer): void {
    this.eventService.customerChanged(customer);
  }

  ngOnDestroy(): void {
    if (this._subscriptions) {
      this._subscriptions.unsubscribe();
    }
  }

}
