import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookinghistory',
  imports: [CommonModule],
  templateUrl: './bookinghistory.component.html',
  styleUrl: './bookinghistory.component.css'
})
export class BookinghistoryComponent implements OnInit {

  bookings: any[] = [];
  userId: number = 0;

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {

    // ✅ Get logged-in userId from LoginService
    this.userId = this.loginService.getUserId();

    if (!this.userId || this.userId <= 0) {
      alert('Please login first');
      return;
    }

    // ✅ API with userId in URL
    const apiUrl = `https://localhost:44320/api/Booking/booking-history/${this.userId}`;

    this.http.get<any[]>(apiUrl).subscribe({
      next: (res) => {
        this.bookings = res; // API already filtered
      },
      error: (err) => {
        console.error(err);
        alert('Failed to load booking history');
      }
    });
  }
}