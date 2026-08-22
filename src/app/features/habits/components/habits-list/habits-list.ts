import { Component, inject, signal } from '@angular/core';
import type { Habit } from '@core/models/habit.model';
import type { HabitFormValue } from '@core/models/habit-form-value.model';
import { HabitsStore } from '@core/services/habits-store';
import { HabitForm } from '@features/habits/components/habit-form/habit-form';
import { ConfirmDialog } from '@shared/components/confirm-dialog/confirm-dialog';
import { HabitCard } from '@shared/components/habit-card/habit-card';
import { SkeletonList } from '@shared/components/skeleton-list/skeleton-list';

@Component({
  selector: 'app-habits-list',
  imports: [HabitCard, HabitForm, ConfirmDialog, SkeletonList],
  templateUrl: './habits-list.html',
  styleUrl: './habits-list.scss',
})
export class HabitsList {
  protected readonly habitsStore = inject(HabitsStore);

  protected readonly isFormOpen = signal(false);
  protected readonly habitBeingEdited = signal<Habit | null>(null);
  protected readonly habitPendingDeletion = signal<Habit | null>(null);

  protected openCreateForm(): void {
    this.habitBeingEdited.set(null);
    this.isFormOpen.set(true);
  }

  protected openEditForm(habitId: string): void {
    const habit = this.habitsStore.habits().find((h) => h.id === habitId) ?? null;

    this.habitBeingEdited.set(habit);
    this.isFormOpen.set(true);
  }

  protected closeForm(): void {
    this.isFormOpen.set(false);
    this.habitBeingEdited.set(null);
  }

  protected onFormSave(formValue: HabitFormValue): void {
    const editing = this.habitBeingEdited();

    if (editing) {
      this.habitsStore.updateHabit(editing.id, formValue);
    } else {
      this.habitsStore.addHabit(formValue);
    }

    this.closeForm();
  }

  protected requestDeletion(habitId: string): void {
    const habit = this.habitsStore.habits().find((h) => h.id === habitId) ?? null;

    this.habitPendingDeletion.set(habit);
  }

  protected confirmDeletion(): void {
    const habit = this.habitPendingDeletion();

    if (habit) {
      this.habitsStore.removeHabit(habit.id);
    }

    this.habitPendingDeletion.set(null);
  }

  protected cancelDeletion(): void {
    this.habitPendingDeletion.set(null);
  }
}
