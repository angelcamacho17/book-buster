import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './fe-header.component.html',
  styleUrls: ['./fe-header.component.scss']
})
export class FeHeaderComponent implements OnInit {

  $header: Observable<string>;
  title = 'Header';

  constructor(private storeHeader: Store<{header: string}>) {
    this.$header = this.storeHeader.pipe(select('header'));
    this.$header.subscribe(data => {
      this.title = data;
    })
  }

  ngOnInit(): void {
  }

}
