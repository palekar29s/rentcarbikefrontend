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

  constructor(private http: HttpClient,private router: Router  ) {}

  user = {
    userId: 0,
    username: '',
    passwordHash: '',
    fullName: '',
    email: '',
    phone: ''
  };

  apiUrl = 'https://localhost:44320/api/Login';

  onSubmit(form: NgForm) {

    if (form.invalid) return;

    // ⭐ IMPORTANT: responseType: 'text'
    this.http.post(this.apiUrl, this.user, { responseType: 'text' })
      .subscribe({

       next: (res: string) => {

  // ✅ show popup after successful insert
  alert('User registered successfully ✅');

  form.resetForm();

  // ✅ redirect AFTER popup
  setTimeout(() => {
    this.router.navigate(['/login']);
  }, 500);
}
,

        error: (err: HttpErrorResponse) => {
          alert(err.error || 'Registration Failed ❌');
        }
      });
  }
}