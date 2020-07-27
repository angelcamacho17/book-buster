import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, AfterViewInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

    @Output() searchFocus = new EventEmitter<boolean>();
    @Output() userSearching = new EventEmitter<boolean>();
    @Output() searchBlur = new EventEmitter<boolean>();
    @Output() hasSearchResults = new EventEmitter<any[]>();
    @Input() list: any = []
    @Input() customIcon: string;
    @Input() autoFocus = false;

    public inputControl = new FormControl();
    private _userSearching = false;
    private _filteredList: any[] = [];
    private _subscription: Subscription;
    constructor() {
        this._subscription = this.inputControl.valueChanges.subscribe(
            () => this.onSearchInput()
        )
    }

    ngOnInit() {
        if (this.autoFocus) {
            const inputElement: HTMLElement = document.getElementById('input') as HTMLElement;
            inputElement.focus();
        }
    }
    private preventDefault = (e) => e.preventDefault();

    private _disableScroll() {
        document.addEventListener('touchmove', this.preventDefault, { passive: false });
        document.addEventListener('touchforcechange', this.preventDefault, { passive: false });
    }

    private _enableScroll() {
        document.removeEventListener('touchmove', this.preventDefault, false);
        document.removeEventListener('touchforcechange', this.preventDefault, false);
    }

    onSearchFocus() {
        this.searchFocus.emit(true);

        this._disableScroll();
    }

    onSearchBlur() {
        this.searchBlur.emit(true);

        this._enableScroll();
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
        // document.removeEventListener('touchmove', (e) => this.preventDefault(e));
        // document.removeEventListener('touchforcechange', (e) => this.preventDefault(e));
    }

    get input() { return this.inputControl.value }
}
