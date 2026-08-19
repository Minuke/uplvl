import { computed, Service, signal } from '@angular/core';
import { Habit } from '@core/models/habit.model';
import { calculateLevelStatus } from '@core/utils/level.util';

@Service()
export class HabitsStore {
  // --- ESTADO PRIVADO (la fuente de la verdad, nadie fuera puede escribirla directamente) ---
  private readonly _habits = signal<Habit[]>([
    {
      id: 'h1',
      name: 'Beber 2L de agua',
      xpReward: 40,
      category: 'salud',
      completedToday: false,
      currentStreak: 4,
    },
    {
      id: 'h2',
      name: 'Leer 20 minutos',
      xpReward: 60,
      category: 'estudio',
      completedToday: true,
      currentStreak: 12,
    },
    {
      id: 'h3',
      name: 'Meditar 10 minutos',
      xpReward: 215,
      category: 'bienestar',
      completedToday: false,
      currentStreak: 0,
    },
  ]);

  private readonly _xpTotal = signal<number>(250);
  private readonly _streakGlobal = signal<number>(3);

  // --- ESTADO PÚBLICO DE SOLO LECTURA ---
  // .asReadonly() da a los componentes una versión de la signal que se puede LEER
  // pero no tiene .set() ni .update(). Así obligamos a que cualquier cambio de estado
  // pase SIEMPRE por un método del store (más abajo), nunca directamente desde fuera.
  readonly habits = this._habits.asReadonly();
  readonly streakGlobal = this._streakGlobal.asReadonly();

  // --- VALORES DERIVADOS (computed) ---
  readonly xpState = computed(() => calculateLevelStatus(this._xpTotal()));

  readonly habitsToday = computed(() => this._habits());

  readonly progressCurrentLevel = computed(() => {
    const state = this.xpState();
    // % de progreso dentro del nivel actual, para pintar una barra de 0 a 100
    return Math.round((state.currentXp / state.xpForNextLevel) * 100);
  });

  /**
 * Alterna el estado "completado hoy" de un hábito.
 * Si se marca como hecho: suma su xpReward al total y sube su racha en 1.
 * Si se desmarca (deshacer): resta ese xpReward y baja la racha en 1 (sin bajar de 0).
 */
  toggleHabit(habitId: string): void {
    const targetHabit = this._habits().find((habit) => habit.id === habitId);

    if (!targetHabit) {
      return;
    }

    const isNowCompleted = !targetHabit.completedToday;
    const xpDelta = isNowCompleted ? targetHabit.xpReward : -targetHabit.xpReward;
    const streakDelta = isNowCompleted ? 1 : -1;

    const updatedHabits = this._habits().map((habit) => {
      if (habit.id !== habitId) {
        return habit;
      }

      const updatedHabit: Habit = {
        ...habit,
        completedToday: isNowCompleted,
        currentStreak: Math.max(0, habit.currentStreak + streakDelta),
      };

      return updatedHabit;
    });

    this._habits.set(updatedHabits);
    this._xpTotal.update((total) => Math.max(0, total + xpDelta));
  }
}
