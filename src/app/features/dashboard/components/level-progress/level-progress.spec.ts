import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelProgress } from './level-progress';

describe('LevelProgressContainer', () => {
  let component: LevelProgress;
  let fixture: ComponentFixture<LevelProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelProgress],
    }).compileComponents();

    fixture = TestBed.createComponent(LevelProgress);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
