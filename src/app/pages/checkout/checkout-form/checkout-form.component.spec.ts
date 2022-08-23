import { ComponentFixture, TestBed } from '@angular/core/testing';
import { products } from 'src/app/shared/mocks/products';
import { IShoppingCartProduct } from 'src/app/shared/models/shoppingCartProducts';

import { SharedModule } from 'src/app/shared/shared.module';
import { CheckoutFormComponent } from './checkout-form.component';

const productsMock = [
  { ...products[0], total: 10 },
  { ...products[1], total: 20 }
] as IShoppingCartProduct[];

describe('CheckoutFormComponent', () => {
  let component: CheckoutFormComponent;
  let fixture: ComponentFixture<CheckoutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [CheckoutFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call calculate', () => {
    const total = component.calculate(productsMock);
    expect(total).toBe(30);
  });
});
