import { Component } from '@angular/core';
import { HabitsListContainer } from '@features/habits/containers/habits-list-container/habits-list-container';

@Component({
  selector: 'app-habits-page',
  imports: [HabitsListContainer],
  templateUrl: './habits-page.html',
  styleUrl: './habits-page.scss',
})
export class HabitsPage {}