import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  
  bookingId: number = 0;
  isProcessing: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // ✅ Get bookingId from localStorage
    const storedBookingId = localStorage.getItem('bookingId');

    if (storedBookingId) {
      this.bookingId = Number(storedBookingId);
    } else {
      alert('Invalid booking. Please create booking again.');
      this.router.navigate(['/']);
    }
  }

  paymentDone() {

    // 🔒 Prevent double click
    if (this.isProcessing) return;

    if (!this.bookingId) {
      alert('Booking ID not found');
      return;
    }

    this.isProcessing = true;

    const apiUrl = `https://localhost:44320/api/Booking/update-booking-status/${this.bookingId}`;

    this.http.put(apiUrl, {}).subscribe({
      next: () => {
        // ✅ Clear bookingId after successful payment
        localStorage.removeItem('bookingId');

        // ✅ Redirect to success page
        this.router.navigate(['/success']);
      },
      error: (err) => {
        console.error(err);
        alert('Payment update failed');
        this.isProcessing = false;
      }
    });
  }
}
