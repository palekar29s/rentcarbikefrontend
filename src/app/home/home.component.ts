import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

interface Vehicle {
  vehicleId: number;
  vehicleType: string;
  vehicleName: string;
  location: string;
  pricePerDay: number;
  status: string;
  imagePath: string;
}
  
@Component({
  selector: 'app-home',
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  /* HERO SLIDER */
  heroImages = [
    'assets/Rentcarbanner.jpg',
    'assets/carbikerent.png'
  ];
  currentHeroIndex = 0;

  /* VEHICLES */
  allVehicles: Vehicle[] = [];
  displayVehicles: Vehicle[] = [];

  /* STEPS */
  steps: string[] = [
    'Search Bike or Car',
    'Select Car & Bike',
    'Details Fill & Confirm',
    'Payment',
    'Booking Done'
  ];
  currentStep = 1;

  @ViewChild('stepsSection') stepsSection!: ElementRef;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.startHeroSlider();
   
  }

  startHeroSlider() {
    setInterval(() => {
      this.currentHeroIndex =
        (this.currentHeroIndex + 1) % this.heroImages.length;
    }, 4000);
  }

  
  scrollToSteps() {
    this.stepsSection.nativeElement.scrollIntoView({
      behavior: 'smooth'
    });
  }

  nextStep() {
    if (this.currentStep < this.steps.length) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }
}