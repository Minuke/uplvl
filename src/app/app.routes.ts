import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/pages/dashboard-page/dashboard-page').then((c) => c.DashboardPage),
  },
  {
    path: 'habits',
    loadComponent: () => import('./features/habits/pages/habits-page/habits-page').then((c) => c.HabitsPage),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];