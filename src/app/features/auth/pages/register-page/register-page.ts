import { Component } from '@angular/core';
import { RegisterFormContainer } from '@features/auth/containers/register-form-container/register-form-container';

@Component({
  selector: 'app-register-page',
  imports: [RegisterFormContainer],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {}