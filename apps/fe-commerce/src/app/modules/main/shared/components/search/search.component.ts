import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterContentInit, OnDestroy {
    @ViewChild('input', { read: ElementRef }) searchInput: ElementRef;
    @Output() searchFocus = new EventEmitter<boolean>();
    @Output() userSearching = new EventEmitter<boolean>();
    @Output() searchBlur = new EventEmitter<boolean>();
    @Output() hasSearchResults = new EventEmitter<any[]>();
    @Output() customIconEvent = new EventEmitter<any>();
    @Input() list: any = []
    @Input() customIcon: string;
    @Input() autoFocus = false;

    public inputControl = new FormControl();
    private _userSearching = false;
    private _filteredList: any[] = [];
    private _subscription: Subscription;
    constructor(public deviceDetector: DeviceDetectorService) {
        this._subscription = this.inputControl.valueChanges.subscribe(
            () => this.onSearchInput()
        )
    }

    ngOnInit() {
    }

    ngAfterContentInit() {

        if (this.autoFocus) {
            setTimeout(() => {
                this.searchInput.nativeElement.focus();
            });
        }
    }
    private preventDefault = (e) => e.preventDefault();

    private _disableScroll() {
        // document.addEventListener('touchmove', this.preventDefault, { passive: false });
        // document.addEventListener('touchforcechange', this.preventDefault, { passive: false });
    }

    private _enableScroll() {
        // document.removeEventListener('touchmove', this.preventDefault, false);
        // document.removeEventListener('touchforcechange', this.preventDefault, false);
    }

    /**
     * Emit event to open scanner.
     */
    public customIconClick() {
        this.customIconEvent.emit();
    }

    /**
     * Emit event on search focus.
     */
    public onSearchFocus() {
        this.searchFocus.emit(true);

        this._disableScroll();
    }

    /**
     * Emit on blur event.
     */
    public onSearchBlur() {
        this.searchBlur.emit(true);

        this._enableScroll();
    }

    /**
     * Handle on typing event.
     */
    public onSearchInput() {
        if (this.input.length >= 3) {
            this._userSearching = true;
            this._filteredList = this.getFilteredResults();
            this.hasSearchResults.emit(this._filteredList);
            this.searchBlur.emit(true);
        } else {
            this._userSearching = false;
            this.hasSearchResults.emit([]);
        }
        this.userSearching.emit(this._userSearching);
    }

    /**
     * Clear search.
     */
    public cleanSearch() {
        this.inputControl.setValue('');
    }

    /**
     * Filter results.
     */
    public getFilteredResults(): any[] {
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
