import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthStore } from '@core/services/auth-store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  protected onLogout(): void {
    this.authStore.logout();
    this.router.navigateByUrl('/login');
  }
}