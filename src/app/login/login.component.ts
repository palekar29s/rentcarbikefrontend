import { Component } from '@angular/core';
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
export class LoginComponent {

  username: string = '';
  passwordHash: string = ''; // FIXED
  loginDetails: any[] = [];
  loginError: string = '';
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  passwordType: string = 'password';

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.fetchLoginDetails();
    this.checkLoginStatus();
  }

  fetchLoginDetails() {
    this.loginService.getLoginDetails().subscribe(
      (data) => {
        this.loginDetails = data;
      },
      (error) => {
        console.error('Error fetching login details', error);
      }
    );
  }

  login() {
    const user = this.loginDetails.find(
      (u) => u.username === this.username && u.passwordHash === this.passwordHash
    );

    if (user) {
      this.loginError = '';
      this.isLoggedIn = true;

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', this.username);

      // Admin check
      if (this.username === 'admin' && this.passwordHash === '2922004') {
        alert('Admin Login');
        this.isAdmin = true;
        localStorage.setItem('isAdmin', 'true');
      } else {
        this.isAdmin = false;
        localStorage.removeItem('isAdmin');
      }

      this.router.navigate(['/home']);
    } else {
      this.loginError = 'Invalid username or password';
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.isAdmin = false;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    this.router.navigate(['/signup']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  checkLoginStatus() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.username = localStorage.getItem('username') || '';
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }

  canModifyProperties(): boolean {
    return this.isAdmin && this.isLoggedIn;
  }

  togglePasswordVisibility(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
}