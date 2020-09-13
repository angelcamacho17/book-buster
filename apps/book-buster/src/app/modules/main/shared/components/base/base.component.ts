import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'base-component',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit, AfterViewInit {
  @ViewChild('main', { read: ElementRef }) private mainElement: ElementRef<any>;
  constructor(
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
}
