import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { AuthStore } from '@core/services/auth-store';
import { LoginCredentials } from '@core/models/auth-credentials.model';

const EMPTY_LOGIN_VALUE: LoginCredentials = { email: '', password: '' };

@Component({
  selector: 'app-login-form',
  imports: [FormField, RouterLink],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  protected readonly loginError = signal<string | null>(null);
  protected readonly isSubmitting = signal(false);
  protected readonly formModel = signal<LoginCredentials>({ ...EMPTY_LOGIN_VALUE });

  protected readonly loginForm = form(this.formModel, (schema) => {
    required(schema.email, { message: 'El email es obligatorio' });
    email(schema.email, { message: 'Introduce un email válido' });

    required(schema.password, { message: 'La contraseña es obligatoria' });
  });

  protected onSubmit(): void {
    submit(this.loginForm, async () => {
      this.isSubmitting.set(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const success = this.authStore.login(this.formModel());

      if (success) {
        this.loginError.set(null);
        this.router.navigateByUrl('/dashboard');
      } else {
        this.loginError.set('Email o contraseña incorrectos.');
        this.isSubmitting.set(false);
      }
    });
  }
}