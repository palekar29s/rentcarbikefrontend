import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

interface Vehicle {
  type: string;
  name: string;
  location: string;
  availableFrom: string; // YYYY-MM-DD
  availableTo: string;   // YYYY-MM-DD
}

  
@Component({
  selector: 'app-home',
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  vehicles: Vehicle[] = [];         // All vehicles (optional)
  filteredVehicles: Vehicle[] = []; // Vehicles after filtering

  filter = {
    vehicle: '',
    checkin: '',
    checkout: '',
    location: ''
  };

  constructor(private http: HttpClient) {} // <-- Inject HttpClient

  ngOnInit(): void {
    // Optional: Fetch all vehicles initially from API
    this.getVehicles();
  }

  // Fetch all vehicles from API
  getVehicles(): void {
    this.http.get<Vehicle[]>('https://api.example.com/vehicles') // Replace with your API URL
      .subscribe(data => {
        this.vehicles = data;
        this.filteredVehicles = data.slice(0, 3); // Show only first 3 vehicles initially
      }, error => {
        console.error('Error fetching vehicles:', error);
      });
  }

  // Filter vehicles using API
  filterVehicles(): void {
    let params = new HttpParams();
    if (this.filter.vehicle) params = params.set('type', this.filter.vehicle);
    if (this.filter.location) params = params.set('location', this.filter.location);
    if (this.filter.checkin) params = params.set('checkin', this.filter.checkin);
    if (this.filter.checkout) params = params.set('checkout', this.filter.checkout);

    this.http.get<Vehicle[]>('https://api.example.com/vehicles', { params }) // Replace with your API URL
      .subscribe(data => {
        this.filteredVehicles = data.slice(0, 3); // Limit to 3 results
      }, error => {
        console.error('Error fetching filtered vehicles:', error);
      });
  }
}
