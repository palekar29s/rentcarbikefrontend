import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addvehicle',
  imports: [CommonModule,FormsModule],
  templateUrl: './addvehicle.component.html',
  styleUrl: './addvehicle.component.css'
})
export class AddvehicleComponent {

  apiUrl = 'https://localhost:44320/api/Vehicle/add-Vehicle';

  vehicle: any = {
    name: '',
    type: '',
    brand: '',
    model: '',
    priceperhour: 0,
    priceperday: 0,
    fueltype: '',
    transmission: '',
    status: '',
    location: '',
    seats: 0,
    startDate: '',
    endDate: ''
  };

  selectedFiles: File[] = [];

  constructor(private http: HttpClient) {}

  // When user selects images
  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  // Submit form
  onSubmit() {
    const formData = new FormData();

    // Append vehicle fields
    Object.keys(this.vehicle).forEach(key => {
      formData.append(key, this.vehicle[key]);
    });

    // Append multiple images
    this.selectedFiles.forEach(file => {
      formData.append('images', file);
    });

    this.http.post(this.apiUrl, formData).subscribe({
      next: (res) => {
        alert('Vehicle Added Successfully!');
        console.log(res);
      },
      error: (err) => {
        console.error(err);
        alert('Error Adding Vehicle');
      }
    });
  }
}