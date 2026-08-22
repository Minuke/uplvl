import { Component, inject } from '@angular/core';
import { HabitsStore } from '@core/services/habits-store';
import { HabitCard } from '@shared/components/habit-card/habit-card';
import { SkeletonList } from '@shared/components/skeleton-list/skeleton-list';

@Component({
  selector: 'app-today-habits',
  imports: [HabitCard, SkeletonList],
  templateUrl: './today-habits.html',
  styleUrl: './today-habits.scss',
})
export class TodayHabits {
  protected readonly habitsStore = inject(HabitsStore);
}