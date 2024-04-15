import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  errorMessage!: string; // Error message to display in case of failed login attempt.
  loading = false; // Loading indicator for the form submission process.

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  onSubmit(): void {

  }
}
