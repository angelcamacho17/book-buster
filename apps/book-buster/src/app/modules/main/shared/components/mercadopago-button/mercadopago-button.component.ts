import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';

import { get } from 'scriptjs';
// import * as mercadopago from 'mercadopago';
// Mercado Pago SDK

@Component({
  selector: 'app-mercadopago-button',
  templateUrl: './mercadopago-button.component.html',
  styleUrls: ['./mercadopago-button.component.scss']
})
export class MercadoPagoButtonComponent implements OnInit {

  init_point: any;
  
  public preference = {
    items: [
        {
          title: 'Test',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: 10.5
        }
    ]
  };

  constructor(private checkoutService: CheckoutService) { 
    // mercadopago.configure({
    //   access_token: 'APP_USR-2504148716483876-101015-d42aa249a35ed682634ddad6032c14b3-480104190'
    // });
  }

  ngOnInit(): void {

    // get("https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js", () => {
    //   //library has been loaded...
    // });
  }

  // onBuy() {
  //   const preference = {
  //     items: [
  //       {
  //         title: 'My Item',
  //         unit_price: 100,
  //         quantity: 1,
  //       }
  //     ]
  //   };
    
  //   mercadopago.preferences.create(preference)
  //   .then(function(response){
  //   // This value replaces the String "<%= global.id %>" in your HTML
  //     console.log(response.body.id);
  //   }).catch(function(error){
  //     console.log(error);
  //   });
  //   // this.checkoutService.goCheckOut(this.preference).then(result => {
  //   //   // Read result of the Cloud Function.
  //   //   this.init_point = result.data.result;
  //   //   console.log(this.init_point);
  //   //   window.location.href = this.init_point;
  //   // }).catch(error => {
  //   //   console.log('ERROR')
  //   //   console.log(error);
  //   //   return error
  //   // });
  // }

}
