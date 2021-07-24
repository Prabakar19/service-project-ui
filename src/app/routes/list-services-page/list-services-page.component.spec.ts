import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServicesPageComponent } from './list-services-page.component';

describe('ListServicesPageComponent', () => {
  let component: ListServicesPageComponent;
  let fixture: ComponentFixture<ListServicesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListServicesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListServicesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
