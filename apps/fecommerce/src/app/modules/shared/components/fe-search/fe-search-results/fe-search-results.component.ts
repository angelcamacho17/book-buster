import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'fe-search-results',
  templateUrl: './fe-search-results.component.html',
  styleUrls: ['./fe-search-results.component.scss']
})
export class FeSearchResultsComponent implements OnInit, OnDestroy {

  @Input() items: any;
  @Input() rowType: any;
  public length: number = 0;
  public items$: Observable<any[]> = of(this.items);

  constructor() {
    this.length = this.items.length;
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
  }

}
