import { Component, input, output } from '@angular/core';
import { Habit } from '@core/models/habit.model';

@Component({
  selector: 'app-habit-card',
  imports: [],
  templateUrl: './habit-card.html',
  styleUrl: './habit-card.scss',
})
export class HabitCard {
  readonly habit = input.required<Habit>();
  readonly showActions = input(false);

  readonly toggle = output<string>();
  readonly edit = output<string>();
  readonly remove = output<string>();

  protected onToggle(): void {
    this.toggle.emit(this.habit().id);
  }

  protected onEdit(): void {
    this.edit.emit(this.habit().id);
  }

  protected onRemove(): void {
    this.remove.emit(this.habit().id);
  }
}