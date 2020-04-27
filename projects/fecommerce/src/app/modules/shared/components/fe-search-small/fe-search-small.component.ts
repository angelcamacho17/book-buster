import { Component, OnInit } from '@angular/core';
import { FeSearchComponent } from '../fe-search/fe-search.component';

@Component({
  selector: 'app-fe-search-small',
  templateUrl: './fe-search-small.component.html',
  styleUrls: ['./fe-search-small.component.scss']
})
export class FeSearchSmallComponent extends FeSearchComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  public expandBorders(): void {
    this.expandBorder = true;
  }

  public collapseBorders(): void {
    this.expandBorder = false;
  }
}
