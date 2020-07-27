import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ComponentService } from '../../services/component.service';

@Component({
  selector: 'base-component',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit, AfterViewInit {
  @ViewChild('main', { read: ElementRef }) private mainElement: ElementRef<any>;
  constructor(
    private componentService: ComponentService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.componentService.mainElement = this.mainElement;
  }
}
