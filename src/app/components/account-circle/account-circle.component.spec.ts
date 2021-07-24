import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCircleComponent } from './account-circle.component';

describe('AccountCircleComponent', () => {
  let component: AccountCircleComponent;
  let fixture: ComponentFixture<AccountCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountCircleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
