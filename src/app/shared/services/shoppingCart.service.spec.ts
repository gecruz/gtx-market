import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { products } from '../mocks/products';
import { IShoppingCartProduct } from '../models/shoppingCartProducts';
import { ShoppingCartService } from './shoppingCart.service';

const price = 3.0;

const getRandomNumber = () => Math.floor(Math.random() * (99 - 5 + 1) + 5);

const mockProduct = (quantity: number, promotion = '') => ({
  ...products[0],
  price,
  quantity,
  promotion,
} as IShoppingCartProduct);

describe('ShoppingCartService', () => {
  let service: ShoppingCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ShoppingCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should call handlePromotion with handleBuyOneGetOneFree', () => {
    const product = mockProduct(1, 'Buy 1 Get 1 Free');
    spyOn(service, 'handleBuyOneGetOneFree').and.callThrough();
    const total = service.handlePromotion(product);
    expect(total).toBe(price);
    expect(service.handleBuyOneGetOneFree).toHaveBeenCalled();
  });

  it('should call handlePromotion with handleThreeForTen', () => {
    const product = mockProduct(1, '3 for 10 Euro');
    spyOn(service, 'handleThreeForTen').and.callThrough();
    const total = service.handlePromotion(product);
    expect(total).toBe(price);
    expect(service.handleThreeForTen).toHaveBeenCalled();
  });
  
  it('should call handlePromotion with default', () => {
    const product = mockProduct(1, '');
    spyOn(service, 'handleThreeForTen').and.callThrough();
    spyOn(service, 'handleBuyOneGetOneFree').and.callThrough();
    const total = service.handlePromotion(product);
    expect(total).toBe(price);
    expect(service.handleThreeForTen).not.toHaveBeenCalled();
    expect(service.handleBuyOneGetOneFree).not.toHaveBeenCalled();
  });
  
  it('Buy 1 Get 1 Free => The promotion should not be applied when the item quantity is 1', () => {
    const product = mockProduct(1, 'Buy 1 Get 1 Free');
    const total = service.handleBuyOneGetOneFree(product);
    expect(total).toBe(price);
  });

  it('Buy 1 Get 1 Free => The promotion should be applied once when the item quantity is 2', () => {
    const product = mockProduct(2, 'Buy 1 Get 1 Free');
    const total = service.handleBuyOneGetOneFree(product);
    expect(total).toBe(price);
  });

  it('Buy 1 Get 1 Free => The promotion should be applied once when the item quantity is 3', () => {
    const product = mockProduct(3, 'Buy 1 Get 1 Free');
    const total = service.handleBuyOneGetOneFree(product);
    expect(total).toBe(price * 2);
  });

  it('Buy 1 Get 1 Free => The promotion should be applied once when the item quantity is 4', () => {
    const product = mockProduct(4, 'Buy 1 Get 1 Free');
    const total = service.handleBuyOneGetOneFree(product);
    expect(total).toBe(price * 2);
  });

  it('Buy 1 Get 1 Free => Any other quantity is allowed following the above logic', () => {
    const quantity = getRandomNumber();
    const product = mockProduct(quantity, 'Buy 1 Get 1 Free');
    const total = service.handleBuyOneGetOneFree(product);
    expect(total).toBe(
      product.quantity % 2
        ? ((product.price * (product.quantity - 1)) / 2) + product.price
        : (product.price * product.quantity) / 2
    );
  });

  it('3 for 10 Euro => The promotion should not be applied when the item quantity is less than 3', () => {
    const product = mockProduct(1, '3 for 10 Euro');
    const total = service.handleThreeForTen(product);
    expect(total).toBe(price);
  });

  it('3 for 10 Euro => The promotion should be applied once when the item quantity is 3', () => {
    const product = mockProduct(3, '3 for 10 Euro');
    const total = service.handleThreeForTen(product);
    expect(total).toBe(10);
  });

  it('3 for 10 Euro => The promotion should be applied once when the item quantity is 4', () => {
    const product = mockProduct(4, '3 for 10 Euro');
    const total = service.handleThreeForTen(product);
    expect(total).toBe(10 + price);
  });

  it('3 for 10 Euro => The promotion should be applied twice when the item quantity is 6', () => {
    const product = mockProduct(6, '3 for 10 Euro');
    const total = service.handleThreeForTen(product);
    expect(total).toBe(10 * 2);
  });

  it('3 for 10 Euro => Any other quantity is allowed following the above logic', () => {
    const quantity = getRandomNumber();
    const product = mockProduct(quantity, '3 for 10 Euro');
    const total = service.handleThreeForTen(product);
    expect(total).toBe(
      product.quantity % 3
        ? (product.quantity % 3 * product.price) + (Math.trunc(product.quantity / 3) * 10)
        : 10.0 * (product.quantity / 3)
    );
  });
});
