import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {tap} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  errorMessage!: string;
  loading = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const values = this.loginForm.value;
      this.authService.login(values.username, values.password).pipe(tap(user => {
        this.router.navigate(['/home']);
      })).subscribe(() => this.loading = false);
    }
  }
}
