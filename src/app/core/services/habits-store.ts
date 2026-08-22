import { computed, Service, signal } from '@angular/core';
import type { Habit } from '@core/models/habit.model';
import type { HabitFormValue } from '@core/models/habit-form-value.model';
import { calculateLevelProgressPercentage, calculateLevelStatus } from '@core/utils/level.util';

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
  private readonly _isLoading = signal(true);

  // --- ESTADO PÚBLICO DE SOLO LECTURA ---
  // .asReadonly() da a los componentes una versión de la signal que se puede LEER
  // pero no tiene .set() ni .update(). Así obligamos a que cualquier cambio de estado
  // pase SIEMPRE por un método del store (más abajo), nunca directamente desde fuera.
  readonly habits = this._habits.asReadonly();
  readonly streakGlobal = this._streakGlobal.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  // CONSTRUCTOR
  constructor() {
    // Simula la latencia de una petición HTTP real. En la Fase B, esto se
    // sustituirá por la llamada real al backend; el resto de la app no
    // tendrá que cambiar nada, porque ya consume `isLoading()` como signal.
    setTimeout(() => this._isLoading.set(false), 600);
  }

  // --- VALORES DERIVADOS (computed) ---
  readonly xpState = computed(() => calculateLevelStatus(this._xpTotal()));

  readonly habitsToday = computed(() => this._habits());

  readonly progressCurrentLevel = computed(() => calculateLevelProgressPercentage(this.xpState()));

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

  /**
   * Crea un hábito nuevo a partir de los datos del formulario.
   * El id lo genera el store (el usuario nunca lo escribe), y arranca
   * siempre sin completar y sin racha.
   */
  addHabit(formValue: HabitFormValue): void {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: formValue.name,
      xpReward: formValue.xpReward,
      category: formValue.category,
      completedToday: false,
      currentStreak: 0,
    };

    const updatedHabits = [...this._habits(), newHabit];
    this._habits.set(updatedHabits);
  }

  /**
   * Actualiza los datos editables de un hábito existente (nombre, xpReward,
   * categoría), preservando su id, su estado de completado y su racha actual.
   */
  updateHabit(habitId: string, formValue: HabitFormValue): void {
    const updatedHabits = this._habits().map((habit) => {
      if (habit.id !== habitId) {
        return habit;
      }

      const updatedHabit: Habit = {
        ...habit,
        name: formValue.name,
        xpReward: formValue.xpReward,
        category: formValue.category,
      };

      return updatedHabit;
    });

    this._habits.set(updatedHabits);
  }

  /**
   * Elimina un hábito de la lista de forma permanente.
   */
  removeHabit(habitId: string): void {
    const updatedHabits = this._habits().filter((habit) => habit.id !== habitId);
    this._habits.set(updatedHabits);
  }
}
