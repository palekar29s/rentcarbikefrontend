import { DatePipe, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-booking',
  imports: [NgIf,NgFor,DatePipe],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  activeTab: string = 'booking';
  vehicles: any[] = [];
  history: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadVehicles();
    this.loadHistory();
  }

  loadVehicles() {
    // Replace with your API
    this.http.get<any[]>('https://your-api.com/vehicles')
      .subscribe(res => this.vehicles = res, err => console.error(err));
  }

  loadHistory() {
    // Replace with your API, send userId to get past bookings
    this.http.get<any[]>('https://your-api.com/bookings/history')
      .subscribe(res => this.history = res, err => console.error(err));
  }

  bookVehicle(vehicleId: number) {
    // Navigate to booking form/page or open modal
    this.router.navigate(['/booking/form'], { queryParams: { vehicleId } });
  }
}
