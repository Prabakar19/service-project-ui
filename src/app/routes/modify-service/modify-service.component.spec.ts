import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyServiceComponent } from './modify-service.component';

describe('ModifyServiceComponent', () => {
  let component: ModifyServiceComponent;
  let fixture: ComponentFixture<ModifyServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
