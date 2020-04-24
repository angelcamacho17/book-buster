import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './fe-header.component.html',
  styleUrls: ['./fe-header.component.scss']
})
export class FeHeaderComponent implements OnInit{

  $header: Observable<string>;
  @Input() title = '';
  @Input() class = '';
  @Input() style = '';

  constructor(private storeHeader: Store<{header: string}>) {
    this.$header = this.storeHeader.pipe(select('header'));
    this.$header.subscribe(data => {
      this.title = data;
    })
    console.log(this.style);
  }

  ngOnInit(): void {
  }

  // ngOnChanges(value: any) {
  //   console.log(value);
  //   if (value && value.style && value.style.currentValue) {
  //     console.log(this.style);
  //   }
  // }

}
