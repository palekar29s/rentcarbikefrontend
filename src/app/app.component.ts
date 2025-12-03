import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterLink, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet ,RouterLink,NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'carbikerental';
   isLoggedIn = false;
  isLoginPage = false;

  constructor(private router: Router) {
    // Detect route change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.urlAfterRedirects.includes('/login');
      }
    });
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }
}