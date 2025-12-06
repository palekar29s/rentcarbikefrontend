import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicleindetail',
  imports: [CommonModule],
  templateUrl: './vehicleindetail.component.html',
  styleUrl: './vehicleindetail.component.css'
})
export class VehicleindetailComponent implements OnInit {

  vehicleId: number = 0;
  vehicle: any = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.vehicleId = Number(this.route.snapshot.paramMap.get('id'));
    this.getVehicleDetails();
  }

  getVehicleDetails() {
    this.http.get(`https://yourapi.com/api/Vehicle/GetById/${this.vehicleId}`)
      .subscribe((res: any) => {
        this.vehicle = res;
      });
  }
}