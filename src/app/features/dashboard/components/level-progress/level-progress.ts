import { Component, effect, inject, signal } from '@angular/core';
import { HabitsStore } from '@core/services/habits-store';

const BAR_TRANSITION_MS = 400;

@Component({
  selector: 'app-level-progress',
  imports: [],
  templateUrl: './level-progress.html',
  styleUrl: './level-progress.scss',
})
export class LevelProgress {
  protected readonly habitsStore = inject(HabitsStore);

  protected readonly justLeveledUp = signal(false);
  protected readonly displayedProgress = signal(this.habitsStore.progressCurrentLevel());
  protected readonly skipTransition = signal(false);

  constructor() {
    let previousLevel = this.habitsStore.xpState().level;

    effect(() => {
      const currentLevel = this.habitsStore.xpState().level;
      const currentProgress = this.habitsStore.progressCurrentLevel();
      const hasLeveledUp = currentLevel > previousLevel;
      const hasLeveledDown = currentLevel < previousLevel;

      if (hasLeveledUp) {
        this.animateLevelUpSequence(currentProgress);
      } else if (hasLeveledDown) {
        this.animateLevelDownSequence(currentProgress);
      } else {
        this.displayedProgress.set(currentProgress);
      }

      previousLevel = currentLevel;
    });
  }

  private animateLevelUpSequence(targetProgress: number): void {
    this.displayedProgress.set(100);

    setTimeout(() => {
      this.skipTransition.set(true);
      this.displayedProgress.set(0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.skipTransition.set(false);
          this.displayedProgress.set(targetProgress);
          this.justLeveledUp.set(true);
          setTimeout(() => this.justLeveledUp.set(false), 1500);
        });
      });
    }, BAR_TRANSITION_MS);
  }

  private animateLevelDownSequence(targetProgress: number): void {
    this.displayedProgress.set(0);

    setTimeout(() => {
      this.skipTransition.set(true);
      this.displayedProgress.set(100);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.skipTransition.set(false);
          this.displayedProgress.set(targetProgress);
        });
      });
    }, BAR_TRANSITION_MS);
  }
}