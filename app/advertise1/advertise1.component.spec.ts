import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Advertise1Component } from './advertise1.component';

describe('Advertise1Component', () => {
  let component: Advertise1Component;
  let fixture: ComponentFixture<Advertise1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Advertise1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Advertise1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
