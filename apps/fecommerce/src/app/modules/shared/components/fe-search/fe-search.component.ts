import { Component, Input, OnInit, TemplateRef, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Customer } from '@fecommerce-workspace/data-store-lib';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';

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
  @Output() hidePlaceholder = new EventEmitter<boolean>();
  @Output() darker = new EventEmitter<boolean>();
  @Output() nodata = new EventEmitter<boolean>();
  @ViewChild('input') input: ElementRef;
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;
  public noTitle = false;
  private _filteredResult = [];
  public filteredlist: Observable<any[]>;
  public stateCtrl = new FormControl();

  constructor() {

    this.filteredlist = this.stateCtrl.valueChanges
      .pipe(
        map(state => {
          if(state) {
            if (state.length < 3) {
              this.hidePlaceholder.emit(false);
              this.darker.emit(true);
              this.nodata.emit(false);
              return [];
            } else {
              this._filteredResult = this._filterStates(state);
              if (this._filteredResult.length > 0) {
                this.hidePlaceholder.emit(true);
                this.nodata.emit(false);

              } else {
                this.hidePlaceholder.emit(true);
                this.nodata.emit(true);
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
    this.hidePlaceholder.emit(false);
    const inputElement: HTMLElement = document.getElementById('input') as HTMLElement;
    inputElement.focus();
  }

  /**
   * Hide initial state.
   */
  public openSearch(): void {
    console.log('open')
    this.hidePlaceholder.emit(true);
    this.darker.emit(true);
    this.nodata.emit(false);
  }

  public setBright(): void {
    console.log('out');
    if (this.stateCtrl.value !== '') {
      this.hidePlaceholder.emit(true);
    }
    this.darker.emit(false);
  }


  /**
   * Show initial state.
   */
  public closeSearch(): void {
    this.hidePlaceholder.emit(false);
    this.darker.emit(false);
    this.nodata.emit(false);
    setTimeout(()=> {
      if (this.stateCtrl.value !== '') {
        this.autocomplete.openPanel();
      }
    }, 1);
  }

  public holdSearch(): void {
    setTimeout(()=> {
        this.autocomplete.openPanel();
    }, 1);
  }

}
