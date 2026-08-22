import { Component } from '@angular/core';
import { HabitsList } from '@features/habits/components/habits-list/habits-list';

@Component({
  selector: 'app-habits-page',
  imports: [HabitsList],
  templateUrl: './habits-page.html',
  styleUrl: './habits-page.scss',
})
export class HabitsPage {}