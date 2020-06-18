import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'fecommerce-workspace-zxing',
  templateUrl: './zxing.component.html',
  styleUrls: ['./zxing.component.scss']
})
export class ZxingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("scanner") scanner: ZXingScannerComponent;
  currentDevice: MediaDeviceInfo = null;
  
  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void { }
}
