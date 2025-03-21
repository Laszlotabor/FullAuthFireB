import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user$: Observable<User | null>; // Observable to track authentication state
  email: string = ''; // Holds the user's email input
  password: string = ''; // Holds the user's password input

  showPassword: boolean = false; // Toggle password visibility
  passwordStrengthClass: string = ''; // Tracks password strength for UI
  passwordStrengthText: string = ''; // Displays password strength message

  constructor(private authService: AuthServiceService, private router: Router) {
    this.user$ = this.authService.user$; // Subscribe to auth state
  }

  /**
   * Handles the login process
   * Calls the AuthService to authenticate the user
   */
  login(): void {
    if (!this.email || !this.password) {
      console.log('Invalid login attempt: Email and password required');
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        console.log('Logged in successfully');
        this.clearInputs(); // Reset fields after login
        this.router.navigate(['/home']); // Redirect to home page
      },
      error: (error) => {
        console.error('Error logging in: ', error);
      },
    });
  }
  //login with goooglee-----------------------------------------------
  loginWithGoogle() {
    this.authService.signInWithGoogle().subscribe({
      next: () => {
        console.log('Successfully signed in with Google');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error signing in with Google:', err);
      },
    });
  }
  /**
   * Clears input fields after login or form reset------------------------------
   */
  clearInputs(): void {
    this.email = '';
    this.password = '';
    this.passwordStrengthClass = '';
    this.passwordStrengthText = '';
  }

  /**
   * Checks password strength and updates UI accordingly
   */
  checkPasswordStrength(): void {
    if (this.password.length < 8) {
      this.passwordStrengthClass = 'weak';
      this.passwordStrengthText = 'Weak Password';
    } else if (
      /[A-Z]/.test(this.password) &&
      /\d/.test(this.password) &&
      /[\W_]/.test(this.password)
    ) {
      this.passwordStrengthClass = 'strong';
      this.passwordStrengthText = 'Strong Password';
    } else {
      this.passwordStrengthClass = 'medium';
      this.passwordStrengthText = 'Medium Password';
    }
  }

  /**
   * Toggles password visibility between text and hidden
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
