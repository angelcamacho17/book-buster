import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'fe-row',
  templateUrl: './fe-row.component.html',
  styleUrls: ['./fe-row.component.css']
})
export class FeRowComponent implements OnInit {

  @Input() item: any;
  @Input() itemType: any;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
