import { Component } from '@angular/core';
import { LevelProgress } from '@features/dashboard/components/level-progress/level-progress';
import { TodayHabits } from '@features/dashboard/components/today-habits/today-habits';

@Component({
  selector: 'app-dashboard-page',
  imports: [LevelProgress, TodayHabits],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {}
