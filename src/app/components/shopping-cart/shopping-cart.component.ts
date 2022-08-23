import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

import { ShoppingCartService } from 'src/app/shared/services/shoppingCart.service';

@Component({
  selector: 'gtx-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  showCartRoute = false;

  constructor(
    private _router: Router,
    public shoppingCartStore: ShoppingCartService,
  ) { }

  ngOnInit(): void {
    this._router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe((route: any) =>
      this.showCartRoute = !route.url.includes('checkout'));
  }

  get showCart() {
    return this.showCartRoute && this.shoppingCartStore.shoppingCartProducts.length > 0
  }
}
