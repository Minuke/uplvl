export interface Habit {
  id: string;
  name: string;
  xpReward: number;
  category: HabitCategory;
  completedToday: boolean;
  currentStreak: number;
}

export type HabitCategory = 'salud' | 'estudio' | 'productividad' | 'bienestar';