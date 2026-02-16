import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addimages',
  imports: [],
  templateUrl: './addimages.component.html',
  styleUrl: './addimages.component.css'
})
export class AddimagesComponent  {

  uploadUrl = 'https://localhost:44320/api/Vehicle/upload-vehicle-images';

  selectedFiles: File[] = [];
  vehicleId!: number;

  constructor(private http: HttpClient, private route: ActivatedRoute) {

    this.vehicleId = Number(this.route.snapshot.paramMap.get('id'));
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  uploadImages() {

    const formData = new FormData();
    formData.append('vehicleId', this.vehicleId.toString());

    this.selectedFiles.forEach(file => {
      formData.append('images', file);
    });

    this.http.post(this.uploadUrl, formData).subscribe({
      next: () => {
        alert('Images Uploaded Successfully!');
      },
      error: (err) => {
        console.error(err);
        alert('Error Uploading Images');
      }
    });
  }
}