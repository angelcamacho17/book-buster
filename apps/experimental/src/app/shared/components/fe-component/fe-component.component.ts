import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fecommerce-workspace-component',
  templateUrl: './fe-component.component.html',
  styleUrls: ['./fe-component.component.css']
})
export class FeComponent implements OnInit {

  public returnUrl = '';

  constructor() { }

  ngOnInit(): void {
  }

}
