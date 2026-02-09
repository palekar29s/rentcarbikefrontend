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

  filter = {
    vehicle: 'car',   // default
    checkin: '',
    checkout: '',
    location: '',
    seats: ''
  };

  vehicles: any[] = [];
  selectedVehicle: any = null;

  private filterChange = new Subject<void>();

  private API_URL =
    'https://localhost:44320/api/Vehicle/getvehicleswithimagess';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.filterChange
      .pipe(debounceTime(300))
      .subscribe(() => this.fetchVehicles());

    this.fetchVehicles();
  }

  /* CAR / BIKE TAB */
  selectVehicleType(type: 'car' | 'bike') {
    this.filter.vehicle = type;

    // Seats not applicable for bike
    if (type === 'bike') {
      this.filter.seats = '';
    }

    this.filterChange.next();
  }

  searchVehicles() {
    this.filterChange.next();
  }

  /* FETCH FROM API (NO FRONTEND FILTERING) */
  private fetchVehicles() {
    let params = new HttpParams();

    if (this.filter.vehicle) {
      params = params.set('vehicle', this.filter.vehicle);
    }

    if (this.filter.location) {
      params = params.set('location', this.filter.location);
    }

    if (this.filter.seats) {
      params = params.set('seats', this.filter.seats);
    }

    // IMPORTANT: Date must be ISO → backend DateTime?
    if (this.filter.checkin) {
      params = params.set(
        'checkin',
        new Date(this.filter.checkin).toISOString()
      );
    }

    if (this.filter.checkout) {
      params = params.set(
        'checkout',
        new Date(this.filter.checkout).toISOString()
      );
    }

    this.http.get<any[]>(this.API_URL, { params }).subscribe({
      next: (data) => {
        data.forEach(v => {
          // main image
          v.imageUrl = v.images?.length
            ? v.images[0].imageUrl
            : 'assets/default.png';
        });

        this.vehicles = data;
      },
      error: (err) => {
        console.error('API ERROR', err);
        this.vehicles = [];
      }
    });
  }

  /* NAVIGATION */
  goToBooking(vehicleId: number) {
    this.router.navigate(['/bookingvehicle'], {
      queryParams: { vehicleId }
    });
  }

  /* IMAGE MODAL */
  openImageModal(vehicle: any, event: Event) {
    event.stopPropagation();
    this.selectedVehicle = vehicle;
  }

  closeModal() {
    this.selectedVehicle = null;
  }
}