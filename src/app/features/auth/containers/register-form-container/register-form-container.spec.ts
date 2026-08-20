import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormContainer } from './register-form-container';

describe('RegisterFormContainer', () => {
  let component: RegisterFormContainer;
  let fixture: ComponentFixture<RegisterFormContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFormContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
