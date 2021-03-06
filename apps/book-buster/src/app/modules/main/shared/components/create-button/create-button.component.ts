import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'create-button',
  animations: [
    trigger('appear', [
      // ...
      state('not-hide', style({
        transform: 'translateY(0%)',
        opacity: 1
      })),
      state('hide', style({
        transform: 'translateY(10%)',
        opacity: 0
      })),
      transition('hide => not-hide', [
        animate('0.6s')
      ]),
    ])
  ],
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.scss']
})
export class CreateButtonComponent implements OnInit {

  public display = false;

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(()=> {
      this.display = true;
    },100);
  }

}
