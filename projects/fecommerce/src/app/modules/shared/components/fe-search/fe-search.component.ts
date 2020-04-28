import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, ViewEncapsulation } from '@angular/core';
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
  @Input() searchTitle = '';
  @Input() itemType: string;
  @Input() small = false;
  private _filteredResult = [];
  public filteredlist: Observable<any[]>;
  public stateCtrl = new FormControl();
  public showInitial = true;
  public expandBorder = false;

  constructor() {
    this.filteredlist = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => {
          if(state) {
            this._filteredResult = this._filterStates(state);
            this.showInitial = this._filteredResult.length === 0;
            this.expandBorder = !this.showInitial;
            console.log(this._filteredResult.length === 0);
            return this._filteredResult;
          } else {
           return this.list.slice();
          }
        })
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
    this.showInitial = true;
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