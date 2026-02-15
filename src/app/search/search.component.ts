import { Component, OnInit } from '@angular/core';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { debounceTime, Subject, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-search',
  imports: [FormsModule,NgIf,NgFor],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  filter = {
    vehicle: 'car',
    checkin: '',
    checkout: '',
    location: '',
    seats: ''
  };

  vehicles: any[] = [];
  selectedVehicle: any = null;
  isAdmin: boolean = false;

  private filterChange = new Subject<void>();

  // ✅ Base API URL
  private BASE_URL = 'https://localhost:44320/api/Vehicle';

  constructor(
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {

    this.isAdmin = this.loginService.isAdmin();

    this.filterChange
      .pipe(debounceTime(300))
      .subscribe(() => this.fetchVehicles());

    this.fetchVehicles();
  }

  // ✅ Vehicle Type Toggle
  selectVehicleType(type: 'car' | 'bike'): void {
    this.filter.vehicle = type;

    if (type === 'bike') {
      this.filter.seats = '';
    }

    this.filterChange.next();
  }

  searchVehicles(): void {
    this.filterChange.next();
  }

  // ✅ Fetch Vehicles
  private fetchVehicles(): void {

    let params = new HttpParams()
      .set('vehicle', this.filter.vehicle || '');

    if (this.filter.location)
      params = params.set('location', this.filter.location);

    if (this.filter.seats)
      params = params.set('seats', this.filter.seats);

    if (this.filter.checkin)
      params = params.set('checkin', new Date(this.filter.checkin).toISOString());

    if (this.filter.checkout)
      params = params.set('checkout', new Date(this.filter.checkout).toISOString());

    this.http.get<any[]>(`${this.BASE_URL}/getvehicleswithimagess`, { params })
      .subscribe({
        next: (data) => {

          this.vehicles = data.map(v => ({
            ...v,
            imageUrl: v.images?.length
              ? v.images[0].imageUrl
              : 'assets/default.png'
          }));

        },
        error: (err) => {
          console.error('Fetch Error:', err);
          this.vehicles = [];
        }
      });
  }

  // ✅ Navigate to Booking
  goToBooking(vehicleId: number): void {
    this.router.navigate(['/bookingvehicle'], {
      queryParams: { vehicleId }
    });
  }

  // ✅ Navigate to Add Vehicle
  goToAddVehicle(): void {
    this.router.navigate(['/addvehicle']);
  }

  // ✅ Soft Delete (Set Unavailable)
  deleteVehicle(vehicleId: number, event: Event): void {

    event.stopPropagation();

    if (!confirm('Are you sure you want to delete this vehicle?')) return;

    this.http.delete(`${this.BASE_URL}/set-unavailable/${vehicleId}`)
      .subscribe({
        next: () => {
          alert('Vehicle deleted successfully');
          this.fetchVehicles();   // refresh list
        },
        error: (err) => {
          console.error('Delete failed:', err);
          alert('Delete failed');
        }
      });
  }

  // ✅ Image Modal
  openImageModal(vehicle: any, event: Event): void {
    event.stopPropagation();
    this.selectedVehicle = vehicle;
  }

  closeModal(): void {
    this.selectedVehicle = null;
  }
}