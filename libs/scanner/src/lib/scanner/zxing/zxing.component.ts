import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'fe-zxing',
  templateUrl: './zxing.component.html',
  styleUrls: ['./zxing.component.scss']
})
export class ZxingComponent implements OnInit {
  @ViewChild('scanner') scanner: ZXingScannerComponent;
  @Output() scanSuccess = new EventEmitter<any>();
  @Output() scanError = new EventEmitter<any>();
  @Output() scanStarted = new EventEmitter<any>();

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


  constructor() { }

  ngOnInit(): void {}

  onScanSuccess(event) {
    this.scanSuccess.emit(event);
  }

  onScanError(event) {
    this.scanError.emit(event);
  }

  onStarted(event) {
    this.scanStarted.emit(event);
  }
}


/*
  const matcher = ({ label }) => /back|trás|rear|video|traseira|environment|ambiente/gi.test(label);
        navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
          console.log('SETTING DEVICES------')

          const device = this.devices.find(matcher) || null;
          this.currentDevice = device;
            console.log('Devices: ', devices, 'Device: ', device, "current device: ", this.currentDevice)
            devices.forEach(data => {
              if (data.label) {
                this.devices.push(data);
              }
            });
          }); */
