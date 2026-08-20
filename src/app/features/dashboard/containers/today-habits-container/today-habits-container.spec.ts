import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayHabitsContainer } from './today-habits-container';

describe('TodayHabitsContainer', () => {
  let component: TodayHabitsContainer;
  let fixture: ComponentFixture<TodayHabitsContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayHabitsContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(TodayHabitsContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
