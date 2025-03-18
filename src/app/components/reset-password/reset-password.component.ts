import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule,CommonModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  email: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  resetPassword() {
    this.authService.sendPasswordResetEmail(this.email).subscribe({
      next: () => {
        this.successMessage = 'Password reset email sent! Check your inbox.';
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Error: ' + err.message;
        this.successMessage = '';
      },
    });
  }
}
