import { Component, OnInit } from '@angular/core';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { debounceTime, Subject, forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [FormsModule,NgIf,NgFor],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  filter: any = {
    vehicle: '',    // car or bike
    checkin: '',
    checkout: '',
    location: '',
    seats: ''
  };

  vehicles: any[] = [];
  searched: boolean = false;

  private filterChange: Subject<void> = new Subject<void>();

  selectedVehicle: any = null; // For modal

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.filterChange.pipe(debounceTime(300)).subscribe(() => this.fetchVehicles());

    // Load all vehicles initially
    this.fetchVehicles();
  }

  onVehicleChange() {
    if (this.filter.vehicle !== 'car') {
      this.filter.seats = '';
    }
    this.filterChange.next();
  }

  searchVehicles() {
    this.filterChange.next();
  }

  private fetchVehicles() {
    let params = new HttpParams();
    if (this.filter.vehicle) params = params.set('vehicle', this.filter.vehicle);
    if (this.filter.checkin) params = params.set('checkin', this.filter.checkin);
    if (this.filter.checkout) params = params.set('checkout', this.filter.checkout);
    if (this.filter.location) params = params.set('location', this.filter.location);
    if (this.filter.seats) params = params.set('seats', this.filter.seats);

    this.http.get<any[]>('https://localhost:44320/api/Vehicle/getvehicleswithimages', { params })
      .subscribe(
        vehicles => {
          // Pick one main image for each vehicle
          vehicles.forEach(v => {
            if (v.images && v.images.length > 0) {
              const randomIndex = Math.floor(Math.random() * v.images.length);
              v.imageUrl = v.images[randomIndex].imageUrl; // Pick one image
            } else {
              v.imageUrl = 'assets/default-car.png'; // fallback
            }
          });

          this.vehicles = vehicles;
          this.searched = true;
        },
        err => {
          console.error(err);
          this.vehicles = [];
          this.searched = true;
        }
      );
  }

  // Navigate to booking page
  goToBooking(vehicleId: number) {
    this.router.navigate(['/bookingvehicle'], { queryParams: { vehicleId } });
  }

  // Open modal to show all images
  openImageModal(vehicle: any) {
    this.selectedVehicle = vehicle;
  }

  closeModal() {
    this.selectedVehicle = null;
  }
}