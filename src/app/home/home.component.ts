import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  vehicles: Vehicle[] = [];       // All vehicles
  filteredVehicles: Vehicle[] = []; // Vehicles after filtering

  filter = {
    vehicle: '',
    checkin: '',
    checkout: '',
    location: ''
  };

  ngOnInit(): void {
    // Example vehicles — replace with API call later
    this.vehicles = [
      { type: 'car', name: 'Sedan', location: 'mumbai', availableFrom: '2025-11-06', availableTo: '2025-11-30' },
      { type: 'bike', name: 'Scooter', location: 'navi-mumbai', availableFrom: '2025-11-05', availableTo: '2025-11-20' },
      { type: 'car', name: 'SUV', location: 'navi-mumbai', availableFrom: '2025-11-07', availableTo: '2025-11-25' }
    ];

    // Initial filtered list
    this.filteredVehicles = [...this.vehicles];
  }

  filterVehicles(): void {
    this.filteredVehicles = this.vehicles.filter(v => {
      const matchesVehicle = this.filter.vehicle ? v.type === this.filter.vehicle : true;
      const matchesLocation = this.filter.location ? v.location === this.filter.location : true;

      let matchesDate = true;
      if (this.filter.checkin && this.filter.checkout) {
        const checkin = new Date(this.filter.checkin);
        const checkout = new Date(this.filter.checkout);
        const availableFrom = new Date(v.availableFrom);
        const availableTo = new Date(v.availableTo);

        // Check if the vehicle is available during the selected period
        matchesDate = checkin >= availableFrom && checkout <= availableTo;
      }

      return matchesVehicle && matchesLocation && matchesDate;
    });
  }
}
