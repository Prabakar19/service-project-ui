import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SPLoginComponentComponent } from './service-provider-login-component.component';

describe('LoginComponentComponent', () => {
  let component: SPLoginComponentComponent;
  let fixture: ComponentFixture<SPLoginComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SPLoginComponentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SPLoginComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
