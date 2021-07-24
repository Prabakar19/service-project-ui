import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpServiceCardComponent } from './sp-service-card.component';

describe('SpServiceCardComponent', () => {
  let component: SpServiceCardComponent;
  let fixture: ComponentFixture<SpServiceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpServiceCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpServiceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
