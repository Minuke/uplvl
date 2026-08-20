import { Component, inject } from '@angular/core';
import { HabitsStore } from '@core/services/habits-store';
import { HabitCard } from '@shared/components/habit-card/habit-card';
import { SkeletonList } from '@shared/components/skeleton-list/skeleton-list';

@Component({
  selector: 'app-today-habits-container',
  imports: [HabitCard, SkeletonList],
  templateUrl: './today-habits-container.html',
  styleUrl: './today-habits-container.scss',
})
export class TodayHabitsContainer {
  protected readonly habitsStore = inject(HabitsStore);
}