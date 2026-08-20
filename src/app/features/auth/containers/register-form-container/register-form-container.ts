import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { email, form, FormField, minLength, required, submit } from '@angular/forms/signals';
import { AuthStore } from '@core/services/auth-store';
import { RegisterData } from '@core/models/auth-credentials.model';

const EMPTY_REGISTER_VALUE: RegisterData = { name: '', email: '', password: '' };

@Component({
  selector: 'app-register-form-container',
  imports: [FormField, RouterLink],
  templateUrl: './register-form-container.html',
  styleUrl: './register-form-container.scss',
})
export class RegisterFormContainer {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  protected readonly registerError = signal<string | null>(null);
  protected readonly isSubmitting = signal(false);
  protected readonly formModel = signal<RegisterData>({ ...EMPTY_REGISTER_VALUE });

  protected readonly registerForm = form(this.formModel, (schema) => {
    required(schema.name, { message: 'El nombre es obligatorio' });

    required(schema.email, { message: 'El email es obligatorio' });
    email(schema.email, { message: 'Introduce un email válido' });

    required(schema.password, { message: 'La contraseña es obligatoria' });
    minLength(schema.password, 6, { message: 'Mínimo 6 caracteres' });
  });

  protected onSubmit(): void {
    submit(this.registerForm, async () => {
      this.isSubmitting.set(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const success = this.authStore.register(this.formModel());

      if (success) {
        this.registerError.set(null);
        this.router.navigateByUrl('/dashboard');
      } else {
        this.registerError.set('Ya existe una cuenta con este email.');
        this.isSubmitting.set(false);
      }
    });
  }
}