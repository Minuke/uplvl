import { Component, effect, input, output, signal } from '@angular/core';
import { FormField, form, maxLength, min, required, submit } from '@angular/forms/signals';
import type { Habit, HabitCategory } from '@core/models/habit.model';
import type { HabitFormValue } from '@core/models/habit-form-value.model';

const EMPTY_FORM_VALUE: HabitFormValue = {
  name: '',
  xpReward: 10,
  category: 'salud',
};

@Component({
  selector: 'app-habit-form',
  imports: [FormField],
  templateUrl: './habit-form.html',
  styleUrl: './habit-form.scss',
})
export class HabitForm {
  readonly habitToEdit = input<Habit | null>(null);
  readonly save = output<HabitFormValue>();
  readonly cancel = output<void>();

  protected readonly categories: HabitCategory[] = [
    'salud',
    'estudio',
    'productividad',
    'bienestar',
  ];

  // 1. El MODELO: un signal normal, con la forma exacta del HabitFormValue.
  protected readonly formModel = signal<HabitFormValue>({ ...EMPTY_FORM_VALUE });

  // 2. El FORM: envuelve el modelo y le añade las reglas de validación.
  protected readonly habitForm = form(this.formModel, (schema) => {
    required(schema.name, { message: 'El nombre es obligatorio' });
    maxLength(schema.name, 60, { message: 'Máximo 60 caracteres' });

    required(schema.xpReward, { message: 'El XP es obligatorio' });
    min(schema.xpReward, 1, { message: 'El XP debe ser mayor que 0' });

    required(schema.category, { message: 'Selecciona una categoría' });
  });

  constructor() {
    // 3. Cuando cambia habitToEdit (input signal), reescribimos el modelo entero.
    effect(() => {
      const habit = this.habitToEdit();

      const nextValue: HabitFormValue = habit
        ? { name: habit.name, xpReward: habit.xpReward, category: habit.category }
        : { ...EMPTY_FORM_VALUE };

      this.formModel.set(nextValue);
    });
  }

  protected onSubmit(): void {
    submit(this.habitForm, async () => {
      this.save.emit(this.formModel());
    });
  }

  protected onCancel(): void {
    this.cancel.emit();
  }
}
