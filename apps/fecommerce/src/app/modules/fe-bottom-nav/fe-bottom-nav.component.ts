import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fe-bottom-nav',
  templateUrl: './fe-bottom-nav.component.html',
  styleUrls: ['./fe-bottom-nav.component.scss']
})
export class FeBottomNavComponent implements OnInit {

  constructor() {
    console.log('bottom');
  }

  ngOnInit(): void {
  }

}
