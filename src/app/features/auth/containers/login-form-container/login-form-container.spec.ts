import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormContainer } from './login-form-container';

describe('LoginFormContainer', () => {
  let component: LoginFormContainer;
  let fixture: ComponentFixture<LoginFormContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
