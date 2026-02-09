import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-bookingvehicle',
  imports: [CommonModule],
  templateUrl: './bookingvehicle.component.html',
  styleUrl: './bookingvehicle.component.css'
})
export class BookingvehicleComponent implements OnInit {

  vehicle: any = null;
  currentImageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.queryParams['vehicleId']);
    if (!id) {
      this.router.navigate(['/home']);
      return;
    }
    this.getVehicleDetails(id);
  }

  getVehicleDetails(id: number) {
    this.http
      .get(`https://localhost:44320/api/Vehicle/GetVehicleById/${id}`)
    
      .subscribe({
        next: (data: any) => this.vehicle = data,
        error: (err) => console.error('Error fetching vehicle details', err)
          
      });

  }

  nextImage() {
    if (!this.vehicle?.images) return;
    this.currentImageIndex = (this.currentImageIndex + 1) % this.vehicle.images.length;
  }

  prevImage() {
    if (!this.vehicle?.images) return;
    this.currentImageIndex = (this.currentImageIndex - 1 + this.vehicle.images.length) % this.vehicle.images.length;
  }

  goToImage(i: number) {
    this.currentImageIndex = i;
  }

  goToBooking(vehicle: any) {
    if (!this.loginService.isLoggedIn()) {
      alert('Please login first');
      this.router.navigate(['/login']);
      return;
    }

    // ✅ STORE VEHICLE IN LOCAL STORAGE
    this.loginService.setSelectedVehicle({
      vehicleId: vehicle.vehicleId,
      name: vehicle.name,
      pricePerDay: vehicle.priceperday,
      pricePerHour: vehicle.priceperhour,
      image: vehicle.images?.[0]?.imageUrl || ''
    });

    this.router.navigate(['/booking']);
  }
}