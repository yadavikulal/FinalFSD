import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectcityComponent } from './selectcity.component';

describe('SelectcityComponent', () => {
  let component: SelectcityComponent;
  let fixture: ComponentFixture<SelectcityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectcityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectcityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
