import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule] 
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.maxLength(25)]],
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      this.http.post<any>("http://localhost:3000/users", this.signupForm.value)
        .subscribe({
          next: (res) => {
            alert("SignUp Successful");
            this.signupForm.reset();
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.error('Error during signup', err);
            alert("SignUp Failed");
          }
        });
    } else {
      alert("Please fill in all required fields correctly.");
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
