import { Component, Input, OnInit, TemplateRef, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Customer } from '@fecommerce-workspace/data-store-lib';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

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
  @Output() searching = new EventEmitter<boolean>();
  @Output() darker = new EventEmitter<boolean>();
  @ViewChild('input') input: ElementRef;
  public noTitle = false;
  private _filteredResult = [];
  public filteredlist: Observable<any[]>;
  public stateCtrl = new FormControl();
  public showInitial = true;
  public expandBorder = false;

  constructor() {

    this.filteredlist = this.stateCtrl.valueChanges
      .pipe(
        map(state => {
          if(state) {
            if (state.length < 3) {
              this.searching.emit(false);
              this.darker.emit(true);
              return [];
            } else {
              this._filteredResult = this._filterStates(state);
              if (this._filteredResult.length > 0) {
                this.searching.emit(true);
                this.darker.emit(false);
              } else {
                this.searching.emit(false);
                this.darker.emit(true);
              }
              return this._filteredResult;
            }

          } else {
           return [];
          }
        })
      );
  }

  public onFocus(): void {
    this.darker.emit(true);
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
