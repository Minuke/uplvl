import { Component, effect, inject, signal } from '@angular/core';
import { HabitsStore } from '@core/services/habits-store';
import { HabitCard } from '@shared/components/habit-card/habit-card';

@Component({
  selector: 'app-dashboard-page',
  imports: [HabitCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  protected readonly habitsStore = inject(HabitsStore);
  protected readonly justLeveledUp = signal(false);

  constructor() {
    let previousLevel = this.habitsStore.xpState().level;

    effect(() => {
      const currentLevel = this.habitsStore.xpState().level;

      if (currentLevel > previousLevel) {
        this.justLeveledUp.set(true);
        setTimeout(() => this.justLeveledUp.set(false), 1500);
      }

      previousLevel = currentLevel;
    });
  }
}