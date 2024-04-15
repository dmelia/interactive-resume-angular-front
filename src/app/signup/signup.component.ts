import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {User} from "../models/user.model";
import {UserAlreadyExistsError} from "../errors/user-already-exists.error";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['signup.css']
})
export class SignUpComponent {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
  }

  isSubmitting: boolean = false;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  onSubmit() {
    const userData = this.signUpForm.value;

    if (this.signUpForm.valid) {
      this.isSubmitting = true;
      this.http.post<User>('/api/user', userData).subscribe(response => {
        console.log('Sign up successful:', response);
        this.isSubmitting = false;
      }, error => {
        this.isSubmitting = false;
        if (error instanceof UserAlreadyExistsError) {
          console.log('The user already exists in local storage.');
        } else {
          throw error;
        }
      });
    } else {
      console.log('Invalid form data:', this.signUpForm);
    }
  }
}
