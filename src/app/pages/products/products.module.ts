import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    ProductsRoutingModule,
  ]
})
export class ProductsModule { }
