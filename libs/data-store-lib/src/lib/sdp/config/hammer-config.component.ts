import { HammerGestureConfig } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import { Injectable } from "@angular/core";

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: 'pan-y'
    });

    return mc;
  }
}
