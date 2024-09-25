import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="home-container">
      <h1>Welcome to the Home Page!</h1>
      <p>You are successfully logged in.</p>
    </div>
  `,
  styles: [`
    .home-container {
      text-align: center;
      margin: 20px;
    }
  `]
})
export class HomeComponent {}
