import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '@fecommerce-workspace/data-store-lib';

@Component({
  selector: 'fe-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit {
  // @Input() autoFocus = false;
  private _returnUrl = 'home';
  public hide = false;
  public shadow = false;
  public emptyResults = true;
  public lastUrl = 'neworder';
  public filteredResults: Customer[] = [];
  public customers: Customer[];
  
  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
  }
  

  public returnUrl(): void {
    this._router.navigate(['/' + this._returnUrl]);
  }

  public hidePanel(hide: boolean): void {
    this.hide = hide;
  }

  public showShadow(shadow: boolean): void {
    this.shadow = shadow;
  }

  public removeShadow(): void {
    this.shadow = false;
    this.hide = false;
  }

  public handleSearchResults(results: any[]): void {
    this.emptyResults = results.length === 0;
    this.filteredResults = results;
  }

}
