import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBookingPageComponent } from './my-booking-page.component';

describe('MyBookingPageComponent', () => {
  let component: MyBookingPageComponent;
  let fixture: ComponentFixture<MyBookingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBookingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBookingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
