import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { IProduct } from '../models/products';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _baseApi = `${environment.services.api}/products`

  constructor(private _http: HttpClient) { }

  getAll() {
    // return of(products).pipe(map((products) => products as IProduct[])); // mock
    return this._http
      .get(this._baseApi)
      .pipe(
        map((response) => response as IProduct[])
      )
  }
}
