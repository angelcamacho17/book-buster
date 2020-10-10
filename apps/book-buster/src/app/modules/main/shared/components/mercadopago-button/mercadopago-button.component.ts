import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';

import { get } from 'scriptjs';


@Component({
  selector: 'app-mercadopago-button',
  templateUrl: './mercadopago-button.component.html',
  styleUrls: ['./mercadopago-button.component.scss']
})
export class MercadoPagoButtonComponent implements OnInit {

  init_point: any;
  
  preference = {
    items: [
        {
            title: 'Mi producto',
            unit_price: 100,
            quantity: 1,
        }
    ]
  };

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit(): void {

    get("https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js", () => {
      //library has been loaded...
    });
  }

  onBuy() {
    this.checkoutService.goCheckOut(this.preference).then(result => {
      // Read result of the Cloud Function.
      this.init_point = result.data.result;
      console.log(this.init_point);
      window.location.href = this.init_point;
    }).catch(error => {
      console.log(error);
      return error
    });
  }

}
