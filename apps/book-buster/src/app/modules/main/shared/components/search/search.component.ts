import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, ViewChild, ElementRef, AfterContentInit, AfterViewChecked } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterContentInit, OnDestroy {
    @ViewChild('search', { static: true }) searchInput: ElementRef;
    @Output() searchFocus = new EventEmitter<boolean>();
    @Output() userSearching = new EventEmitter<boolean>();
    @Output() searchBlur = new EventEmitter<boolean>();
    @Output() hasSearchResults = new EventEmitter<any>();
    @Output() customIconEvent = new EventEmitter<any>();
    @Input() list: any = []
    @Input() customIcon: string;
    @Input() autoFocus = false;
    public noScanner = false;

    public inputControl = new FormControl();
    private _userSearching = false;
    private _subscription: Subscription;
    constructor(public deviceDetector: DeviceDetectorService,
                public snackBar: MatSnackBar) {
        this._subscription = this.inputControl.valueChanges.pipe(
          // get value
          map((event: any) => {
            return event;
          })
          // Time in milliseconds between key events
          , debounceTime(0)

          // If previous query is diffent from current
          , distinctUntilChanged()

          // subscription for response
        ).subscribe(
          (text: string)=> this.onSearchInput(text)
        )
    }

  private setFocus(): void {
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      if (this.autoFocus) {
        this.searchInput.nativeElement.focus()
        this.searchInput.nativeElement.click()
      }
    }, 0);
  }

  public focusAndOpenKeyboard(el, timeout) {
    if(!timeout) {
      timeout = 100;
    }
    if(el) {
      // Align temp input element approximately where the input element is
      // so the cursor doesn't jump around
      const __tempEl__ = document.createElement('input');
      __tempEl__.style.position = 'absolute';
      __tempEl__.style.top = (el.offsetTop + 7) + 'px';
      __tempEl__.style.left = el.offsetLeft + 'px';
      __tempEl__.style.height = '0';
      __tempEl__.style.opacity = '0';
      // Put this temp element as a child of the page <body> and focus on it
      document.body.appendChild(__tempEl__);
      __tempEl__.focus();

      // The keyboard is open. Now do a delayed focus on the target element
      setTimeout(function() {
        el.focus();
        el.click();
        // Remove the temp element
        document.body.removeChild(__tempEl__);
      }, timeout);
    }
  }

  ngOnInit() {
    //this.checkCamera();
  }

  ngAfterContentInit() {
    this.setFocus()
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

    }

    /**
     * Emit on blur event.
     */
    public onSearchBlur() {
        this.searchBlur.emit(true);

    }


    /**
     * Handle on typing event.
     */
    public onSearchInput(text) {
        if (text.length > 0) {
            this._userSearching = true;
            this.hasSearchResults.emit(text);
            this.searchBlur.emit(true);
        } else {
            this._userSearching = false;
            this.searchFocus.emit(true);
            this.hasSearchResults.emit('');
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
    }

    get input() { return this.inputControl.value }
}
