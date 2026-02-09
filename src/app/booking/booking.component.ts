import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe } from 'rxjs';
import { LoginService } from '../login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  imports: [CommonModule,FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {

  // 🔹 Logged-in user ID
  loggedInUserId: number = 0;

  bookingData = {
    userId: 0,
    vehicleId: 0,
    startDate: '',
    endDate: '',
    totalPrice: 0,
    bookingStatus: 'created'
  };

  pricePerDay = 0;
  pricePerHour = 0;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // ✅ Get user ID from login service
    this.loggedInUserId = this.loginService.getUserId();

    if (!this.loggedInUserId) {
      alert('Please login first');
      this.router.navigate(['/login']);
      return;
    }

    // ✅ Get selected vehicle
    const vehicle = this.loginService.getSelectedVehicle();
    if (vehicle) {
      this.bookingData.vehicleId = vehicle.vehicleId;
      this.pricePerDay = vehicle.pricePerDay;
      this.pricePerHour = vehicle.pricePerHour;
    }
  }

  // 🔹 Calculate price
  calculateTotalPrice() {
    if (!this.bookingData.startDate || !this.bookingData.endDate) {
      alert('Please select start and end date first');
      return;
    }

    const start = new Date(this.bookingData.startDate);
    const end = new Date(this.bookingData.endDate);

    if (end <= start) {
      alert('End date must be after start date');
      return;
    }

    const diffMs = end.getTime() - start.getTime();
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));

    this.bookingData.totalPrice =
      diffHours >= 24
        ? Math.ceil(diffHours / 24) * this.pricePerDay
        : diffHours * this.pricePerHour;

    alert(`Calculated Total Price: ₹${this.bookingData.totalPrice}`);
  }

  // 🔹 Submit booking
  submitBooking() {

    if (
      !this.loggedInUserId ||
      !this.bookingData.vehicleId ||
      !this.bookingData.startDate ||
      !this.bookingData.endDate ||
      !this.bookingData.totalPrice
    ) {
      alert('Please fill all fields');
      return;
    }

    const payload = {
      ...this.bookingData,
      userId: this.loggedInUserId,
      startDate: new Date(this.bookingData.startDate).toISOString(),
      endDate: new Date(this.bookingData.endDate).toISOString()
    };

    this.loginService.createBooking(payload).subscribe({
      next: (res: any) => {

        // ✅ SAVE bookingId for payment page
        localStorage.setItem('bookingId', res.bookingId);

        alert('Booking created successfully!');
        this.router.navigate(['/payment']);
      },
      error: (err) => {
        console.error('Booking failed:', err);
        alert('Booking failed!');
      }
    });
  }
}