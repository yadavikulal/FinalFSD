import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentpayComponent } from './paymentpay.component';

describe('PaymentpayComponent', () => {
  let component: PaymentpayComponent;
  let fixture: ComponentFixture<PaymentpayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentpayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
