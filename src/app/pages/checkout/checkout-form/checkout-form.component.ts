import { Component } from '@angular/core';

import { IShoppingCartProduct } from 'src/app/shared/models/shoppingCartProducts';
import { ShoppingCartService } from 'src/app/shared/services/shoppingCart.service';

@Component({
  selector: 'gtx-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent {
  shouldUpdateCart = (index: number, product: IShoppingCartProduct) => product.id;

  constructor(
    public shoppingCartStore: ShoppingCartService,
  ) { }

  calculate(shoppingCartProducts: IShoppingCartProduct[]): any {
    return shoppingCartProducts.reduce((previousValue, currentValue) => (previousValue + currentValue.total), 0);
  }
}
