import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addvehicle',
  imports: [CommonModule,FormsModule],
  templateUrl: './addvehicle.component.html',
  styleUrl: './addvehicle.component.css'
})
export class AddvehicleComponent {

  apiUrl = 'https://localhost:44320/api/Vehicle/add-vehicle';

  vehicle: any = {
  name: '',
  type: '',
  brand: '',
  model: '',
  priceperhour: '',
  priceperday: '',
  fueltype: '',
  transmission: '',
  status: '',
  location: '',
  seats: '',
  startDate: '',
  endDate: '',
  imageUrl: 'assets/cat.jpg'   // 👈 hidden default value
};

  constructor(private http: HttpClient, private router: Router) {}
onSubmit() {

  const vehicleData = {
    name: this.vehicle.name,
    type: this.vehicle.type,
    brand: this.vehicle.brand,
    model: this.vehicle.model,
    priceperhour: Number(this.vehicle.priceperhour),
    priceperday: Number(this.vehicle.priceperday),
    fueltype: this.vehicle.fueltype,
    transmission: this.vehicle.transmission,
    status: this.vehicle.status,
    location: this.vehicle.location,
    seats: this.vehicle.seats ? Number(this.vehicle.seats) : null,
    startDate: this.vehicle.startDate 
                ? new Date(this.vehicle.startDate).toISOString() 
                : null,
    endDate: this.vehicle.endDate 
                ? new Date(this.vehicle.endDate).toISOString() 
                : null,
    imageUrl: 'assets/cat.jpg'   // 👈 force send
  };

  console.log("Sending JSON:", vehicleData);

  this.http.post<any>(this.apiUrl, vehicleData).subscribe({
    next: (res) => {
      const vehicleId = res.vehicleId || res.VehicleId;
      alert('Vehicle Added Successfully!');
      this.router.navigate(['/add-images', vehicleId]);
    },
    error: (err) => {
      console.error(err);
      alert("Error Adding Vehicle:\n" + JSON.stringify(err.error));
    }
  });
}
}