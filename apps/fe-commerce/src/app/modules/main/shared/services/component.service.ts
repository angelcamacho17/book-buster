import { Injectable, ElementRef, HostListener } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  public headerElement: ElementRef;
  public mainElement: ElementRef;

  constructor() { }

}
