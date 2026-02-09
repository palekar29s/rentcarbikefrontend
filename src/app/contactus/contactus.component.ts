import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  imports: [CommonModule,FormsModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {

// Contact form fields
  name: string = "";
  email: string = "";
  phone: string = "";
  message: string = "";
  successMessage: string = "";

  // Company Info
  companyName: string = "CarBike Rentals Pvt. Ltd.";
  companyPhone: string = "+91 98765 43210";
  companyEmail: string = "support@carbikerentals.com";
  companyAddress: string = "123 Main Street, Pune, Maharashtra, India";
  companyHours: string = "Mon - Sun : 9:00 AM - 9:00 PM";

  constructor(private http: HttpClient) {}

  submitForm() {
    const contactData = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      message: this.message
    };

    this.http.post(`https://yourapi.com/api/Contact/Submit`, contactData)
      .subscribe((res: any) => {
        this.successMessage = "Thank you! Our team will contact you soon.";
        this.name = "";
        this.email = "";
        this.phone = "";
        this.message = "";
      });
  }
}