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
  readonly toggle = output<string>();

  protected onToggle(): void {
    const habitId = this.habit().id;
    this.toggle.emit(habitId);
  }
}