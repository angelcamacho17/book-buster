import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fe-fe-order-items',
  templateUrl: './fe-order-items.component.html',
  styleUrls: ['./fe-order-items.component.scss']
})
export class FeOrderItemsComponent implements OnInit {

  public items = [
    {
      "id": 67,
      "name": "Bay Leaf",
      "description": "Cerebral atherosclerosis",
      "price": "1.38"
    },
    {
      "id": 68,
      "name": "Pastry - Plain Baked Croissant",
      "description": "Crushing injury of multiple sites of upper arm",
      "price": "85.49"
    },
    {
      "id": 69,
      "name": "Cookie Dough - Double",
      "description": "Other complications due to nervous system device, implant, and graft",
      "price": "11.42"
    },
    {
      "id": 67,
      "name": "Bay Leaf",
      "description": "Cerebral atherosclerosis",
      "price": "1.38"
    },
    {
      "id": 68,
      "name": "Pastry - Plain Baked Croissant",
      "description": "Crushing injury of multiple sites of upper arm",
      "price": "85.49"
    },
    {
      "id": 69,
      "name": "Cookie Dough - Double",
      "description": "Other complications due to nervous system device, implant, and graft",
      "price": "11.42"
    },
    {
      "id": 67,
      "name": "Bay Leaf",
      "description": "Cerebral atherosclerosis",
      "price": "1.38"
    },
    {
      "id": 68,
      "name": "Pastry - Plain Baked Croissant",
      "description": "Crushing injury of multiple sites of upper arm",
      "price": "85.49"
    },
    {
      "id": 69,
      "name": "Cookie Dough - Double",
      "description": "Other complications due to nervous system device, implant, and graft",
      "price": "11.42"
    },
    {
      "id": 67,
      "name": "Bay Leaf",
      "description": "Cerebral atherosclerosis",
      "price": "1.38"
    },
    {
      "id": 68,
      "name": "Pastry - Plain Baked Croissant",
      "description": "Crushing injury of multiple sites of upper arm",
      "price": "85.49"
    },
    {
      "id": 69,
      "name": "Cookie Dough - Double",
      "description": "Other complications due to nervous system device, implant, and graft",
      "price": "11.42"
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
