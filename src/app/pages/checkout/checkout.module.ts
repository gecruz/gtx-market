import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';

@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CheckoutRoutingModule,
  ]
})
export class CheckoutModule { }
