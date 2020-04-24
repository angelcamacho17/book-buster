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
export class FeSearchComponent {

  @Input() list: Customer[];
  @Input() searchTitle: string;
  @Input() itemType: string;
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

}
