import type { HabitCategory } from '@core/models/habit.model';

export interface HabitFormValue {
  name: string;
  xpReward: number;
  category: HabitCategory;
}
