import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthtestComponent } from './authtest/authtest.component';
import { NavbarComponent } from './components/navbar/navbar.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthtestComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FireAuth';
}
