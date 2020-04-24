import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Customer } from 'dist/data-store/lib/models/customer.model';
import { Store } from '@ngrx/store';
import { replaceCustomerRequest } from 'projects/data-store-lib/src/lib/customer/customer.actions';

@Component({
  selector: 'app-fe-search',
  templateUrl: './fe-search.component.html',
  styleUrls: ['./fe-search.component.scss']
})
export class FeSearchComponent implements OnChanges{

  @Input() list: Customer[];
  @Input() searchTitle: string;
  public filteredlist: Observable<any[]>;
  public stateCtrl = new FormControl();
  public showInitial = true;


  constructor(public store: Store) {
    this.filteredlist = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.list.slice())
      );
  }

  private _filterStates(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.list.filter((state: any) => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  /**
   * Clear search input.
   */
  public clearSearch(): void {
    this.stateCtrl.setValue('');
    this.showInitial = false;
  }

  /**
   * Hide initial state.
   */
  public hideInitialState(): void {
    this.showInitial = false;
  }

  /**
   * Show initial state.
   */
  public showInitialState(): void {
    this.stateCtrl.setValue('');
    this.showInitial = true;
  }

  ngOnChanges(value: any): void {
    // if (value && value.list && value.list.currentValue) {
    //   for (let customer of value.list.currentValue) {
    //     let auxCustomer = null;
    //     auxCustomer = this.getinitials(customer);
    //     this.store.dispatch(replaceCustomerRequest({customer: auxCustomer}))
    //   }
    // }
  }

  public getInitials(customer: any): string {
    const fullName = customer.name;
    if (fullName) {
      const name: string[] = fullName.split(' ');
      let initials: string;
      if (name.length > 2) {
        customer.smaller = true;
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

}
