import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

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
 constructor(
    
    private router: Router,
   
  ) {}
  heroImages = [
    'assets/Rentcarbanner.jpg',
    'assets/carbikerent.png'
  ];

  currentHeroIndex = 0;
  

  ngOnInit(): void {
    this.startHeroSlider();
  }

  startHeroSlider() {
    setInterval(() => {
      this.currentHeroIndex =
        (this.currentHeroIndex + 1) % this.heroImages.length;
    }, 4000);
  }
  goToSearch() {
    this.router.navigate(['/search']);
  }
}