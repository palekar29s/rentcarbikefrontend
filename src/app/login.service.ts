import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginApiUrl = 'https://localhost:44320/api/Login/get-username-password';

  constructor(private http: HttpClient) {}

  // ---------------- LOGIN ----------------
  getLoginDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.loginApiUrl);
  }

  setLoggedInUser(user: any): void {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userid', user.userId.toString()); // ✅ FIXED
    localStorage.setItem('username', user.username);

    if (user.username === 'admin') {
      localStorage.setItem('isAdmin', 'true');
    } else {
      localStorage.removeItem('isAdmin');
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  isAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }

  getUserId(): number {
    return Number(localStorage.getItem('userid')) || 0;
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  logout(): void {
    localStorage.clear(); // ✅ cleaner logout
  }

  // ---------------- VEHICLE ----------------
  getVehicleById(vehicleId: number): Observable<any> {
    return this.http.get<any>(
      `https://localhost:44320/api/Vehicle/GetVehicleById/${vehicleId}`
    );
  }

  // ---------------- BOOKING ----------------
  createBooking(booking: any): Observable<any> {
    return this.http.post<any>(
      'https://localhost:44320/api/Booking/add-booking',
      booking
    );
  }

  // ---------------- LOCAL STORAGE VEHICLE ----------------
  setSelectedVehicle(vehicle: any): void {
    localStorage.setItem('vehicleData', JSON.stringify(vehicle));
  }

  getSelectedVehicle(): any {
    const v = localStorage.getItem('vehicleData');
    return v ? JSON.parse(v) : null;
  }
}
