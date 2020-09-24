import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { ScannerComponent } from '../scanner.component';

@Component({
  selector: 'fe-zxing',
  templateUrl: './zxing.component.html',
  styleUrls: ['./zxing.component.scss']
})
export class ZxingComponent extends ScannerComponent implements OnInit {

  public formatsList = [
    'CODABAR',
    'CODE_39',
    'CODE_93',
    'CODE_128',
    'DATA_MATRIX',
    'EAN_8',
    'EAN_13',
    'QR_CODE'
  ];
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;


  constructor() {
    super();
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  ngOnInit(): void {

  }


}
