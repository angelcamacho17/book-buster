import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { IArticleService, IArticle, IOrder, IOrderArticle, replaceCurrentOrderRequest, appendOrderArticleRequest } from '@fecommerce-workspace/data-store-lib';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { ScanResult } from '../scanner.interface';

declare global {
  interface Window { webkitAudioContext: any; }
}


@Component({
  selector: 'fe-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {
  @Output() scanSuccess = new EventEmitter<any>();
  @Output() scanFailed = new EventEmitter<any>();
  @Output() scanError = new EventEmitter<any>();
  @Output() scanStarted = new EventEmitter<any>();
  @Output() noCamera = new EventEmitter<any>();
  public devices: MediaDeviceInfo[] = [];
  public currentDevice: MediaDeviceInfo = null;
  public _subscriptions = new Subscription();

  constructor() { }

  ngOnInit(): void { }

  public onScanFailed(event) {
    const result: ScanResult = {
      error: event
    }
    this.scanFailed.emit(result);
  }

  public onScanError(event) {
    const result: ScanResult = {
      error: event
    }
    this.scanError.emit(result);
  }

  public onStarted(event): void {
    const result: ScanResult = {
      code: event
    }
    this.scanStarted.emit(result);
  }

  public onScanSuccess(event): void {
    const result: ScanResult = {
      code: event
    }
    this.scanSuccess.emit(result);
  }

  noCameraFound(event) {
    this.noCamera.emit(event);
  }

  public beep(vol, freq, duration) {
    const AudioContext = window.AudioContext || window.webkitAudioContext || false;

    if (AudioContext) {
      // Do whatever you want using the Web Audio API
      const a = new AudioContext();
      const v = a.createOscillator()
      const u = a.createGain()

      v.connect(u)
      v.frequency.value = freq
      v.type = "square"
      u.connect(a.destination)
      u.gain.value = vol * 0.01
      v.start(a.currentTime)
      v.stop(a.currentTime + duration * 0.001)
    }
  }
}
