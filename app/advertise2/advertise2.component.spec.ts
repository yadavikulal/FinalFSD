import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Advertise2Component } from './advertise2.component';

describe('Advertise2Component', () => {
  let component: Advertise2Component;
  let fixture: ComponentFixture<Advertise2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Advertise2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Advertise2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
