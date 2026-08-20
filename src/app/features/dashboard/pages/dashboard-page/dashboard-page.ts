import { Component, effect, inject, signal } from '@angular/core';
import { HabitsStore } from '@core/services/habits-store';
import { HabitCard } from '@shared/components/habit-card/habit-card';
import { SkeletonList } from '@shared/components/skeleton-list/skeleton-list';

// Debe coincidir EXACTAMENTE con la duración del transition en xp-bar__fill (SCSS)
const BAR_TRANSITION_MS = 400;

@Component({
  selector: 'app-dashboard-page',
  imports: [HabitCard, SkeletonList],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
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

  /**
   * Secuencia al SUBIR de nivel:
   * 1. Anima la barra hasta el 100%.
   * 2. Salto instantáneo (sin transición) a 0%.
   * 3. Anima desde 0% hasta el progreso real del nuevo nivel,
   *    y dispara el pulso de la insignia justo al arrancar esta fase.
   */
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

  /**
   * Secuencia al BAJAR de nivel (la anterior, en espejo):
   * 1. Anima la barra hasta el 0% (se vacía hacia la izquierda).
   * 2. Salto instantáneo (sin transición) a 100%.
   * 3. Anima desde 100% hacia abajo, hasta el progreso real
   *    del nivel al que has vuelto.
   */
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