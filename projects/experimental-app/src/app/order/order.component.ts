import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'projects/models-lib/src/lib/models/order.model';
import { Store } from '@ngrx/store';
import { replaceOrderRequest, deleteOrderRequest } from 'projects/data-store/src/lib/order/order.actions';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public orderForm: FormGroup;
  @Input() order: Order;
  @Input() test: string;
  public edit = false;

  constructor(private _store: Store<Order>,
              private _formBuilder: FormBuilder ) {
    this.orderForm = this._formBuilder.group({
      descrip: ['']
    });
  }

  ngOnInit(): void {
  }

  editOrder(): void {
    this.edit = true;
  }

  deleteOrder(): void {
    this._store.dispatch(deleteOrderRequest({orderId: this.order.id}));
  }

  saveOrder(): void {
    this.edit = false;
    const editedOrder: Order = {
      id: this.order.id,
      descrip: this.orderForm.value.descrip,
      articles: []
    }
    this.order = editedOrder;
    this._store.dispatch(replaceOrderRequest({order: this.order}));
  }

  addArticle(): void {
    // let article: Article;
    // if (this.order.articles) {
    //   article = {
    //     id: 1,
    //     descrip: 'Article'
    //   }
    //   this.order.articles.push(...[article]);
    // } else {
    //   article = {
    //     id: Math.max(...this.order.articles.map(a => a.id), 0) + 1,
    //     descrip: 'Article'
    //   }
    //   this.order.articles.push(article);
    // }

  }

}
