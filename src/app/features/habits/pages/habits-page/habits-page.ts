import { Component, inject } from '@angular/core';
import { HabitsStore } from '@core/services/habits-store';

@Component({
  selector: 'app-habits-page',
  imports: [],
  templateUrl: './habits-page.html',
  styleUrl: './habits-page.scss',
})
export class HabitsPage {
  protected readonly habitsStore = inject(HabitsStore);
}
