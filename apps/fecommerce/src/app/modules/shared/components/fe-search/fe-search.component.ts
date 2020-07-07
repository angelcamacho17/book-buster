import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, AfterViewInit, HostListener } from '@angular/core';
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
        console.log('body offset height: ', document.body.offsetHeight)
        console.log('window height: ', document.body.offsetHeight)
        if (this.autoFocus) {
            const inputElement: HTMLElement = document.getElementById('input') as HTMLElement;
            inputElement.focus();
        }
        console.log('windows init')

    }

    @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
        console.log($event);
        console.log("scrolling");
        window.scrollTo(0, 0)
    }

    private stopScrolling() {
        const timerID = setInterval(() => {
            window.scrollTo(0, 0);
            if (window.pageYOffset > 0) {
                clearInterval(timerID);
            }
        }, 13);
    }
    onSearchFocus() {
        this.searchFocus.emit(true);
        // this.stopScrolling();
        const el = document.body
        document.body.onscroll = () => {
            console.log('body is actually scrolling.')
        }
        
        console.log('body offset height: ', document.body.offsetHeight)
        console.log('window height: ', document.body.offsetHeight)
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
