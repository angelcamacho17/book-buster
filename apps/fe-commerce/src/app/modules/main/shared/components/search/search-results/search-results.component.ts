import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  @Input() items: any[] = [];
  @Input() rowType: any;
  @Input() dividerClass: string;
  public items$: Observable<any[]> = of(this.items);

  constructor(public layoutService: LayoutService) { }

  ngOnInit(): void {
    this.items = []
  }

  ngOnDestroy() {
    this.items = []
  }

}
