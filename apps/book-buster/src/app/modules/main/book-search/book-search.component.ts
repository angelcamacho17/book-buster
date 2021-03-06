import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { IBook } from '../../../models/book.model';
import { MainService } from '../main.service';
import { BookRowComponent } from '../shared/components/row/book-row/book-row.component';
import { LayoutService } from '../shared/services/layout.service';

@Component({
  selector: 'book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  public books$: Observable<IBook[]>;
  public books: IBook[] = [];
  public rowType = BookRowComponent;
  public hide = false;
  public shadow = false;
  public emptyResults = true;
  public filteredResults: IBook[] = [];
  public subscriptions: Subscription = new Subscription();
  public scanner = false;
  public loading = false;
  public pauseScan = false;
  public scannerStarted = false;
  public firstCall = true;


  constructor(
    public layoutService: LayoutService,
    public snackBar: MatSnackBar,
    public mainSer: MainService
    ) { }

  ngOnInit(): void {
  }

   /**
   * Handle book scanner.
   * @param scanResult
   */
  public bookScanned(scanResult): void {
    // Pause scann to avoid errors.
    if (this.pauseScan) {
      return;
    }
    this.pauseScan = true;
    console.log(scanResult.code?.code);
    //this.store.dispatch(getCustomerScannedRequest({ barcode: scanResult.code?.code }))
    return;
  }

  /**
   * Hide scanner and show initial state of the search.
   * @param hide
   */
  public hidePanel(hide: boolean): void {
    this.hide = hide;
  }

  /**
   * Finish laoding state.
   * @param event
   */
  public onStarted(event) {
    this.scannerStarted = true;
  }

  /**
   * On focus of the search, show shadow state.
   * @param shadow
   */
  public showShadow(shadow: boolean): void {
    this.shadow = shadow;
    this.scanner = false;
    this.scannerStarted = false;
  }

  /**
   * Show scanner.
   */
  public showScanner(event?) {
    if (localStorage.getItem('CAMERA_ALLOWED') && localStorage.getItem('CAMERA_ALLOWED')==='false'){
      const msg = 'Refresh your page to allow the camera';
      const snackRef = this.snackBar.open(msg, 'REFRESH', {
        duration: 2000,
      });
      snackRef.afterDismissed().subscribe((action)=>{
        if (action.dismissedByAction) {
          this.loading = true;
          setTimeout(() => {
            location.reload();
          }, 0);
          event.stopImmediatePropagation();
        }
      });
    } else {
      this.scanner = true;
    }
  }

  /**
   * Permission response.
   */
  public handlePermission(event) {
    if (event === false) {
      localStorage.setItem('CAMERA_ALLOWED', 'false')
      this.noCameraFound(false);
      const msg = 'You need to allow the camera to access the scanner';
      this.snackBar.open(msg, '', {
        duration: 2000,
      });
    } else {
      localStorage.setItem('CAMERA_ALLOWED', 'true')
    }
  }

  /**
   * On start seaching, set state.
   */
  public searchStarted(): void {
    this.shadow = false;
    this.hide = false;
    this.scanner = false;
    this.scannerStarted = false;

  }

  /**
  * After a search, set vars to react propperly.
  * @param query
  */
  public handleSearchResults(query: any): void {
    this.emptyResults = query.length === 0;
    if (query.length > 0) {
      this.loading = true;
      this.mainSer.filterBooks(query);
    } else {
      this.emptyResults = true;
      setTimeout(() => {
        this.loading = false;
      })
      this.filteredResults = [];
      this.books = [];
    }
  }

  /**
   * No camera found.
   * @param event
   */
  public noCameraFound(event) {
    this.scanner = false;
    this.loading = false;
  }

}
