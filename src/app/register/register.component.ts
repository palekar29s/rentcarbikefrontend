import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  constructor(private http: HttpClient, private router: Router) {}

  // =========================
  // USER MODEL
  // =========================
  user = {
    userId: 0,
    username: '',
    passwordHash: '',
    fullName: '',
    email: '',
    phone: ''
  };

  apiUrl = 'https://localhost:44320/api/Login';

  // =========================
  // UI STATES
  // =========================
  showPassword: boolean = false;
  loading: boolean = false;
  showSuccess: boolean = false;

  // =========================
  // TOGGLE PASSWORD VISIBILITY
  // =========================
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // =========================
  // NAVIGATE TO LOGIN (FROM MODAL)
  // =========================
  goToLogin(): void {
    this.showSuccess = false;
    this.router.navigate(['/login']);
  }

  // =========================
  // FORM SUBMIT
  // =========================
  onSubmit(form: NgForm): void {

    if (form.invalid) return;

    this.loading = true;

    // Send data in old backend structure (as required)
    const payload = {
      username: this.user.username,
      passwordHash: this.user.passwordHash,
      fullName: this.user.fullName,
      email: this.user.email,
      phone: this.user.phone
    };

    this.http.post(this.apiUrl, payload, { responseType: 'text' })
      .subscribe({

        next: () => {
          this.loading = false;
          this.showSuccess = true;   // Show success modal
          form.resetForm();          // Clear form
        },

        error: (err: HttpErrorResponse) => {
          this.loading = false;
          alert(err.error || 'Registration Failed ❌');
        }

      });
  }
}