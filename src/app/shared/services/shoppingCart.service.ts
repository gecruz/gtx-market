import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IProduct } from '../models/products';
import { IShoppingCartProduct } from '../models/shoppingCartProducts';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private readonly _shoppingCartProducts = new BehaviorSubject<IShoppingCartProduct[]>([]);
  readonly shoppingCartProducts$ = this._shoppingCartProducts.asObservable();

  constructor() {
    const shoppingCartProducts = window.sessionStorage.getItem('shoppingCartProducts');
    if (shoppingCartProducts) this.shoppingCartProducts = JSON.parse(shoppingCartProducts);
  }

  get shoppingCartProducts(): IShoppingCartProduct[] {
    return this._shoppingCartProducts.getValue();
  }

  set shoppingCartProducts(product: IShoppingCartProduct[]) {
    this._shoppingCartProducts.next(product);
  }

  addProduct(product: IProduct) {
    if (this.shoppingCartProducts.find(p => p.id === product.id)) {
      this.shoppingCartProducts = this.shoppingCartProducts.map(_product => _product.id === product.id
        ? { ..._product, quantity: _product.quantity + 1 }
        : { ..._product }
      );
    } else {
      this.shoppingCartProducts = [...this.shoppingCartProducts, { ...product, quantity: 1 } as IShoppingCartProduct];
    }

    this.calculate(this.shoppingCartProducts);
  }

  removeProduct(id: number) {
    const _product = this.shoppingCartProducts.find(p => p.id === id);
    if (_product && _product?.quantity > 1) {
      this.shoppingCartProducts = this.shoppingCartProducts.map(product => product.id === id
        ? { ...product, quantity: product.quantity - 1 }
        : { ...product }
      );
    } else {
      this.shoppingCartProducts = this.shoppingCartProducts.filter(product => product.id !== id);
    }

    this.calculate(this.shoppingCartProducts);
  }

  deleteProduct(id: number) {
    this.shoppingCartProducts = this.shoppingCartProducts.filter(product => product.id !== id);
    this.calculate(this.shoppingCartProducts);
  }

  calculate(shoppingCartProducts: IShoppingCartProduct[]) {
    this.shoppingCartProducts = this.shoppingCartProducts.map(product => ({
      ...product,
      total: this.handlePromotion(product),
    }));

    window.sessionStorage.setItem('shoppingCartProducts', JSON.stringify(shoppingCartProducts));
  }

  handlePromotion(product: IShoppingCartProduct) {
    switch (product.promotion) {
      case 'Buy 1 Get 1 Free':
        return this.handleBuyOneGetOneFree(product);
      case '3 for 10 Euro':
        return this.handleThreeForTen(product);

      default:
        return product.price * product.quantity;
    }
  }

  handleBuyOneGetOneFree(product: IShoppingCartProduct) {
    return product.quantity % 2
      ? ((product.price * (product.quantity - 1)) / 2) + product.price
      : (product.price * product.quantity) / 2
  }

  handleThreeForTen(product: IShoppingCartProduct) {
    return product.quantity % 3
      ? (product.quantity % 3 * product.price) + (Math.trunc(product.quantity / 3) * 10)
      : 10.0 * (product.quantity / 3);
  }
}
