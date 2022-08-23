import { IProduct } from "./products";

export interface IShoppingCartProduct extends IProduct {
  total: number;
  quantity: number;
}