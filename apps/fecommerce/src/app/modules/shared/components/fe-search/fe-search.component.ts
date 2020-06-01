import { Component, Input, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'fe-search',
  templateUrl: './fe-search.component.html',
  styleUrls: ['./fe-search.component.scss'],
  animations: [
    trigger('card', [
      // ...
      state('not-hide', style({
        position: 'fixed'
      })),
      state('hide', style({
        position: 'relative',
        width: 'calc(100% - 32px)'
      })),
      transition('hide => not-hide', [
        animate('0s')
      ]),
    ]),
    trigger('title', [
      // ...
      state('not-hide', style({
        position: 'fixed',
        width: 'calc(100% - 32px)'
      })),
      state('hide', style({
        position: 'relative',
        width: '100%'
      })),
      transition('hide => not-hide', [
        animate('0s')
      ]),
    ]),
    trigger('nodata', [
      // ...
      state('not-hide', style({
        position: 'fixed',
        width: 'calc(100% - 32px)',
        top: '199px'
      })),
      state('hide', style({
        position: 'relative',
        width: 'calc(100% - 32px)',
        top: '156px'
      })),
      transition('hide => not-hide', [
        animate('0s')
      ]),
    ])
  ],
})
export class FeSearchComponent implements OnInit, OnDestroy {

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
  public display = false;

  constructor() {
    setTimeout(()=>{
      this.display = true;
    },100000000)
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

  ngOnDestroy(): void {
    this.display = false;
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
