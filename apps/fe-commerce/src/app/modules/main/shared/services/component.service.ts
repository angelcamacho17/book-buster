import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  public expectedHeaderHeight = 152;
  public headerElement: ElementRef;
  public mainElement: ElementRef;

  constructor() { }
}
