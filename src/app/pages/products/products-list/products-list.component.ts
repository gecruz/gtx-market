import { Component } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';

import { IProduct } from 'src/app/shared/models/products';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ShoppingCartService } from 'src/app/shared/services/shoppingCart.service';

@Component({
  selector: 'gtx-products',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  loading = false;
  products = new Array<IProduct>();

  private _unsubscribe = new ReplaySubject<boolean>();

  constructor(
    private _productsService: ProductsService,
    public shoppingCartStore: ShoppingCartService,
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  productQuantityOnCart(id: number) {
    return this.shoppingCartStore.shoppingCartProducts.find(p => p.id === id)?.quantity || 0;
  }

  getProducts() {
    this.loading = true;
    this._productsService
      .getAll()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe({
        next: (products) => this.products = products as IProduct[],
        error: (e) => this.handleError(e),
        complete: () => this.loading = false,
      });
  }

  handleError(message: string) {
    console.log(message);
  }
}
