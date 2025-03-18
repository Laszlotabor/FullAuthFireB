import { Component } from '@angular/core';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../services/auth-service.service';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  user$: Observable<User | null>; // Observable to track user authentication

  constructor(private authService: AuthServiceService, private router:Router) { 
    this.user$ = this.authService.user$;
  };
  logout():void {
     this.authService.logout().subscribe(() => {
       console.log('User logged out');
       this.router.navigate(['/login']); 
     });
   };
}
