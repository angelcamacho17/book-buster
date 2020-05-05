import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Customer } from '@fecommerce-workspace/data-store-lib';

@Component({
  selector: 'fe-search',
  templateUrl: './fe-search.component.html',
  styleUrls: ['./fe-search.component.scss']
})
export class FeSearchComponent implements OnInit {

  @Input() list: any[];
  @Input() searchTitle = '';
  @Input() itemType: any;
  @Input() small = false;
  @Input() templateRef: TemplateRef<any>;
  public noTitle = false;
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
            if (this.small) {
              this.expandBorder = !this.showInitial;
            }
            console.log(this._filteredResult.length === 0);
            return this._filteredResult;
          } else {
           return this.list.slice();
          }
        })
      );
  }

  ngOnInit(): void {
    this._filteredResult = [];
    this.showInitial = true;
    this.expandBorder = false;
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
  public openSearch(): void {
    if (this.small) {
      this.expandBorder = true
    } else {
      this.showInitial = false;
    }
  }

  /**
   * Show initial state.
   */
  public closeSearch(): void {
    this.stateCtrl.setValue('');
    if (this.small) {
      this.expandBorder = false;
    } else {
      this.showInitial = true;
    }
  }

}
