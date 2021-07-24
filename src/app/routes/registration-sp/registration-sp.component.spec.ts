import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationSpComponent } from './registration-sp.component';

describe('RegistrationSpComponent', () => {
  let component: RegistrationSpComponent;
  let fixture: ComponentFixture<RegistrationSpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationSpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationSpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
