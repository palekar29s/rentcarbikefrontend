import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-bookingvehicle',
  imports: [CommonModule],
  templateUrl: './bookingvehicle.component.html',
  styleUrl: './bookingvehicle.component.css'
})
export class BookingvehicleComponent  implements OnInit, OnDestroy {

  vehicle: any = null;
  currentImageIndex: number = 0;

  stars = [1, 2, 3, 4, 5]; // for rating UI
  isModalOpen: boolean = false;

  private autoSlideInterval: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService
  ) {}

  // ============================
  // INIT
  // ============================
  ngOnInit(): void {
    const id = Number(this.route.snapshot.queryParams['vehicleId']);

    if (!id) {
      this.router.navigate(['/home']);
      return;
    }

    this.getVehicleDetails(id);
  }

  // ============================
  // API CALL
  // ============================
  getVehicleDetails(id: number) {
    this.http
      .get(`https://localhost:44320/api/Vehicle/GetVehicleById/${id}`)
      .subscribe({
        next: (data: any) => {
          this.vehicle = data;

          // Default rating if not present
          if (!this.vehicle.rating) {
            this.vehicle.rating = 4;
          }

          // Ensure images array exists
          if (!this.vehicle.images || this.vehicle.images.length === 0) {
            this.vehicle.images = [
              { imageUrl: 'https://via.placeholder.com/800x450?text=No+Image' }
            ];
          }

          this.startAutoSlide();
        },
        error: (err) => {
          console.error('Error fetching vehicle details:', err);
          this.router.navigate(['/home']);
        }
      });
  }

  // ============================
  // AUTO IMAGE SLIDER
  // ============================
  startAutoSlide() {
    this.stopAutoSlide();

    this.autoSlideInterval = setInterval(() => {
      this.nextImage();
    }, 3000); // every 3 seconds
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  nextImage() {
    if (!this.vehicle?.images?.length) return;

    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.vehicle.images.length;
  }

  prevImage() {
    if (!this.vehicle?.images?.length) return;

    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.vehicle.images.length) %
      this.vehicle.images.length;
  }

  goToImage(index: number) {
    this.currentImageIndex = index;

    // Restart auto slide when manually changed
    this.startAutoSlide();
  }

  // ============================
  // MODAL
  // ============================
  openModal() {
    this.isModalOpen = true;
    this.stopAutoSlide(); // pause auto slide in modal
  }

  closeModal() {
    this.isModalOpen = false;
    this.startAutoSlide(); // resume auto slide
  }

  // ============================
  // BOOKING
  // ============================
  goToBooking(vehicle: any) {
    if (!this.loginService.isLoggedIn()) {
      alert('Please login first');
      this.router.navigate(['/login']);
      return;
    }

    this.loginService.setSelectedVehicle({
      vehicleId: vehicle.vehicleId,
      name: vehicle.name,
      pricePerDay: vehicle.priceperday,
      pricePerHour: vehicle.priceperhour,
      image: vehicle.images?.[0]?.imageUrl || ''
    });

    this.router.navigate(['/booking']);
  }

  // ============================
  // DESTROY
  // ============================
  ngOnDestroy(): void {
    this.stopAutoSlide();
  }
}