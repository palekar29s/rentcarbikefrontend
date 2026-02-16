import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  imports: [FormsModule,CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  bookingId: number = 0;
  isProcessing: boolean = false;

  // Temporary card details
  cardName: string = '';
  cardNumber: string = '';
  expiryMonth: string = '';
  expiryYear: string = '';
  cvv: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const storedBookingId = localStorage.getItem('bookingId');

    if (storedBookingId) {
      this.bookingId = Number(storedBookingId);
    } else {
      alert('Invalid booking. Please create booking again.');
      this.router.navigate(['/']);
    }
  }

  paymentDone() {

    if (this.isProcessing) return;

    // Simple validation
    if (
      !this.cardName ||
      !this.cardNumber ||
      !this.expiryMonth ||
      !this.expiryYear ||
      !this.cvv
    ) {
      alert('Please fill all card details');
      return;
    }

    this.isProcessing = true;

    // 🔹 TEMPORARY: No real payment, just simulate success

    setTimeout(() => {

      localStorage.removeItem('bookingId');

      this.router.navigate(['/success']);

    }, 1500); // simulate 1.5 sec payment processing
  }
}
