import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router, private appService: ApiService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  ngOnInit() {
    this.loginForm.reset();
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      // Call the login method from ApiService
      this.appService.login(username, password).subscribe(user => {
        if (user) {
          console.log('Login successful:', user);
          localStorage.setItem("username", username);
          this.router.navigate(['/home']); // Navigate to the home page after successful login
        } else {
          console.error('Invalid credentials');
          alert("Invalid credentials. Please try again.");
        }
      }, error => {
        console.error('Error during login:', error);
        alert("An error occurred during login. Please try again.");
      });
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (control?.hasError('required')) {
      return `Please type ${field === 'username' ? 'email' : 'password'}.`;
    }
    if (field === 'username' && control?.hasError('email')) {
      return 'Please type a valid email.';
    }
    if (field === "username" && control?.hasError('maxlength')) {
      return 'Email cannot exceed 30 characters.';
    }
    if (field === 'password' && control?.hasError('maxlength')) {
      return 'Password cannot exceed 20 characters.';
    }
    return '';
  }
}
