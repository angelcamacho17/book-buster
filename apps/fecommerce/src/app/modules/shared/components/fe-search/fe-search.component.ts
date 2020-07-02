import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'fe-search',
    templateUrl: './fe-search.component.html',
    styleUrls: ['./fe-search.component.scss']
})
export class FeSearchComponent implements OnInit, OnDestroy {

    @Output() searchFocus = new EventEmitter<boolean>();
    @Output() userSearching = new EventEmitter<boolean>();
    @Output() searchBlur = new EventEmitter<boolean>();
    @Output() hasSearchResults = new EventEmitter<any[]>();
    @Output() innerHeight = new EventEmitter<number>();
    @Input() list: any = []
    @Input() customIcon: string;

    inputControl = new FormControl();
    private _userSearching = false;
    private _filteredList: any[] = [];
    private _subscription: Subscription;
    constructor() {
        this._subscription = this.inputControl.valueChanges.subscribe(
            () => this.onSearchInput()
        )
    }

    ngOnInit() {
      this.searchFocus.emit(false);
    //   const inputElement: HTMLElement = document.getElementById('input') as HTMLElement;
    //   inputElement.focus();
    }

    onSearchFocus(e) {
        this.searchFocus.emit(true);
        this.innerHeight.emit(e?.view?.innerHeight);
        console.log(e);
    }

    onSearchBlur() {
        this.searchBlur.emit(true);
    }

    onSearchInput() {
        if (this.input.length >= 3) {
            this._userSearching = true;
            this._filteredList = this.getFilteredResults();
            this.hasSearchResults.emit(this._filteredList);
        } else {
            this._userSearching = false;
            this.hasSearchResults.emit([]);
        }
        this.userSearching.emit(this._userSearching);
    }

    cleanSearch() {
        this.inputControl.setValue('');
    }

    getFilteredResults(): any[] {
        return this.list.filter((resource) => {
            return resource.name.toLowerCase().indexOf(this.input.toLowerCase()) > -1;
        })
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    get input() { return this.inputControl.value }
}
