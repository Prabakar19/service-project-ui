import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaLoginComponent } from './social-media-login.component';

describe('SocialMediaLoginComponent', () => {
  let component: SocialMediaLoginComponent;
  let fixture: ComponentFixture<SocialMediaLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialMediaLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
