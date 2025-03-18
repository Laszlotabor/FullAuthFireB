import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  user$: Observable<User | null>; // Observable to bind user data
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private authService: AuthServiceService, private router: Router) {
    this.user$ = this.authService.user$;
  }
  // Sign up with email and password
  signUp(): void {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.authService.signUp(this.email, this.password).subscribe({
      next: () => {
        console.log('Sign up successful');
        this.clearInputs();
        alert('Signed up succesfully');
        this.router.navigate(['/']); // Redirect to the home page
      },
      error: (error) => {
        console.error('Error signing up: ', error);
      },
    });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Clear all input fields
  clearInputs(): void {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }
}
