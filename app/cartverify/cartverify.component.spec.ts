import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartverifyComponent } from './cartverify.component';

describe('CartverifyComponent', () => {
  let component: CartverifyComponent;
  let fixture: ComponentFixture<CartverifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartverifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
