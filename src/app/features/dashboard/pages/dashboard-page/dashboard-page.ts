import { Component, inject } from '@angular/core';
import { HabitsStore } from '@core/services/habits-store';

@Component({
  selector: 'app-dashboard-page',
  imports: [],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  protected readonly habitsStore = inject(HabitsStore);
}
