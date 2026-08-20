import { Component } from '@angular/core';
import { LoginFormContainer } from '@features/auth/containers/login-form-container/login-form-container';

@Component({
  selector: 'app-login-page',
  imports: [LoginFormContainer],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {}