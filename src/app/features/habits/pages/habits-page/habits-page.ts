import { Component, inject } from '@angular/core';
import { HabitsStore } from '@core/services/habits-store';
import { HabitCard } from '@shared/components/habit-card/habit-card';

@Component({
  selector: 'app-habits-page',
  imports: [HabitCard],
  templateUrl: './habits-page.html',
  styleUrl: './habits-page.scss',
})
export class HabitsPage {
  protected readonly habitsStore = inject(HabitsStore);
}