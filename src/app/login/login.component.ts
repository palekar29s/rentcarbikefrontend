import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  username: string = '';
  passwordHash: string = '';
  loginDetails: any[] = [];
  loginError: string = '';
  isLoggedIn: boolean = false;
  passwordType: string = 'password';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchLoginDetails();
    this.checkLoginStatus();
  }

  fetchLoginDetails(): void {
    this.loginService.getLoginDetails().subscribe({
      next: (data) => this.loginDetails = data,
      error: () => this.loginError = 'Server error. Try again later.'
    });
  }

  login(): void {
    const user = this.loginDetails.find(
      u =>
        u.username === this.username &&
        u.passwordHash === this.passwordHash
    );

    if (!user) {
      this.loginError = 'Invalid username or password';
      return;
    }

    // ✅ Store userId + username
    this.loginService.setLoggedInUser(user);

    this.isLoggedIn = true;
    this.loginError = '';

    this.router.navigate(['/home']);
  }

  logout(): void {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.username = '';
    this.passwordHash = '';
    this.router.navigate(['/login']);
  }

  checkLoginStatus(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.username = this.loginService.getUsername();
  }

  togglePasswordVisibility(): void {
  this.passwordType =
    this.passwordType === 'password' ? 'text' : 'password';
}


  goToRegister(): void {
    this.router.navigate(['/register']);
  }
  
}