import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { AuthStore } from '@core/services/auth-store';
import { LoginCredentials } from '@core/models/auth-credentials.model';

const EMPTY_LOGIN_VALUE: LoginCredentials = { email: '', password: '' };

@Component({
  selector: 'app-login-page',
  imports: [FormField, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
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

      // Simula la latencia de una petición real; en la Fase B, aquí iría el await
      // a la llamada HTTP real, en el mismo sitio exacto.
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