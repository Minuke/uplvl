import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelProgressContainer } from './level-progress-container';

describe('LevelProgressContainer', () => {
  let component: LevelProgressContainer;
  let fixture: ComponentFixture<LevelProgressContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelProgressContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(LevelProgressContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
