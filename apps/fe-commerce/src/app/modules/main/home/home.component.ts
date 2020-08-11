import { Component } from '@angular/core';
import { LayoutService } from '../shared/services/layout.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public layoutService: LayoutService) {}

}
