import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
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
    // if (this.scanned) {
    //   return;
    // }
    // this.scanned = true;
    // if (this.checkIfJson(art)) {
    //   art = JSON.parse(art);
    //   this.artSer.articles.subscribe((data) => {
    //     const found = data.some(el => el.id === art.id);
    //     if (found) {
    //       this.beep(100, 520, 200);
    //       this.addToOrder.emit(art);
    //       const success = this.snackBar.open('Item ' + art.name + ' added to order!', 'OK', {
    //         duration: 2000
    //       });
    //       success.afterDismissed().subscribe((action) => {
    //         this.scanned = false;
    //       })
    //     } else {
    //       this.beep(999, 220, 300);
    //       const error = this.snackBar.open('Item does not exist!', 'OK!', {
    //         duration: 2000
    //       });
    //       error.afterDismissed().subscribe((action) => {
    //         this.scanned = false;
    //       })
    //     }
    //   });
    // } else {
    //   //window.navigator.vibrate(400);
    //   this.beep(999, 220, 300);
    //   const notExist = this.snackBar.open('Item does not exist!', 'OK!', {
    //     duration: 2000
    //   });
    //   notExist.afterDismissed().subscribe((action) => {
    //     this.scanned = false;
    //   })
    // }
  // }

  private checkIfJson(art: any) {
    if (/^[\],:{}\s]*$/.test(art.replace(/\\["\\\/bfnrtu]/g, '@').
      replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
      replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
      return true;
    } else {
      return false;
    }
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
