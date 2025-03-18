import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authtest',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './authtest.component.html',
  styleUrl: './authtest.component.css',
})
export class AuthtestComponent {
  user$: Observable<User | null>; // Observable to bind user data
  email: string = '';
  password: string = '';

  constructor(private authService: AuthServiceService) {
    this.user$ = this.authService.user$;
  }
  // Login with email and password
  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        console.log('Logged in successfully');
      },
      error: (error) => {
        console.error('Error logging in: ', error);
      },
    });
  }

  // Logout
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logged out successfully');
      },
      error: (error) => {
        console.error('Error logging out: ', error);
      },
    });
  }
}
