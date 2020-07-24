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
  @Input() dividerClass: string;
  public items$: Observable<any[]> = of(this.items);

  constructor() { }

  ngOnInit(): void {

  }

  ngOnDestroy() {
  }

}
