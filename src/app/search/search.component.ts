import { Component, OnInit } from '@angular/core';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { debounceTime, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [FormsModule,NgIf,NgFor],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  filter: any = {
    vehicle: '',
    checkin: '',
    checkout: '',
    location: '',
    seats: ''
  };

  vehicles: any[] = [];
  searched: boolean = false;

  private filterChange: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.filterChange.pipe(debounceTime(300)).subscribe(() => this.fetchVehicles());
  }

  onVehicleChange() {
    if (this.filter.vehicle !== 'car') {
      this.filter.seats = '';
    }
    this.searchVehicles();
  }

  searchVehicles() {
    this.filterChange.next();
  }

  private fetchVehicles() {
    const params = new HttpParams()
      .set('vehicle', this.filter.vehicle)
      .set('checkin', this.filter.checkin)
      .set('checkout', this.filter.checkout)
      .set('location', this.filter.location)
      .set('seats', this.filter.seats || '');

    this.http.get<any[]>('https://your-api.com/vehicles', { params })
      .subscribe(res => {
        this.vehicles = res;
        this.searched = true;
      }, err => {
        console.error(err);
        this.vehicles = [];
        this.searched = true;
      });
  }

  // Navigate to booking page when user clicks card or "Book Now"
  goToBooking(vehicleId: number) {
    this.router.navigate(['/booking'], { queryParams: { vehicleId } });
  }
}