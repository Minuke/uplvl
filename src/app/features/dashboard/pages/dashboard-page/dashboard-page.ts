import { Component } from '@angular/core';
import { LevelProgressContainer } from '@features/dashboard/containers/level-progress-container/level-progress-container';
import { TodayHabitsContainer } from '@features/dashboard/containers/today-habits-container/today-habits-container';

@Component({
  selector: 'app-dashboard-page',
  imports: [LevelProgressContainer, TodayHabitsContainer],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {}