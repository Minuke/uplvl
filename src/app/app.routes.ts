import type { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login-page/login-page').then((c) => c.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register-page/register-page').then((c) => c.RegisterPage),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard-page/dashboard-page').then(
        (m) => m.DashboardPage,
      ),
  },
  {
    path: 'habits',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/habits/pages/habits-page/habits-page').then((m) => m.HabitsPage),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];
