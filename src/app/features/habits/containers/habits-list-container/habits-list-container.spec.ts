import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitsListContainer } from './habits-list-container';

describe('HabitsListContainer', () => {
  let component: HabitsListContainer;
  let fixture: ComponentFixture<HabitsListContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitsListContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(HabitsListContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
