import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpReportComponent } from './sp-report.component';

describe('SpReportComponent', () => {
  let component: SpReportComponent;
  let fixture: ComponentFixture<SpReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
