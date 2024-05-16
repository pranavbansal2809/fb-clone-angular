import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterNavbarComponent } from './login-register-navbar.component';

describe('LoginRegisterNavbarComponent', () => {
  let component: LoginRegisterNavbarComponent;
  let fixture: ComponentFixture<LoginRegisterNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRegisterNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRegisterNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
