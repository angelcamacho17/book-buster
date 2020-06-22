import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'fe-search',
    templateUrl: './fe-search.component.html',
    styleUrls: ['./fe-search.component.scss']
})
export class FeSearchComponent implements OnInit, OnDestroy {

    @Output() onFocus = new EventEmitter<boolean>();
    @Output() onSearching = new EventEmitter<boolean>();
    @Output() onBlur = new EventEmitter<boolean>();
    @Output() onSearchResults = new EventEmitter<any[]>();
    @Input() list: any = []

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
    }

    onSearchFocus() {
        this.onFocus.emit(true);
    }

    onSearchBlur() {
        this.onBlur.emit(true);
    }

    onSearchInput() {
        if (this.input.length >= 3) {
            this._userSearching = true;
            this._filteredList = this.getFilteredResults();
            this.onSearchResults.emit(this._filteredList);
        } else {
            this._userSearching = false;
            this.onSearchResults.emit([]);
        }
        this.onSearching.emit(this._userSearching);
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