import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthStore } from '@core/services/auth-store';
import { ConfirmDialog } from '@shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ConfirmDialog],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  protected readonly isMenuOpen = signal(false);
  protected readonly isLogoutConfirmOpen = signal(false);

  protected toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  protected requestLogout(): void {
    this.isLogoutConfirmOpen.set(true);
  }

  protected confirmLogout(): void {
    this.isLogoutConfirmOpen.set(false);
    this.closeMenu();
    this.authStore.logout();
    this.router.navigateByUrl('/login');
  }

  protected cancelLogout(): void {
    this.isLogoutConfirmOpen.set(false);
  }
}
