import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fe-component',
  templateUrl: './fe-component.component.html',
  styleUrls: ['./fe-component.component.css']
})
export class FeComponent implements OnInit {

  public returnUrl = '';

  constructor() { }

  ngOnInit(): void {
  }

}
