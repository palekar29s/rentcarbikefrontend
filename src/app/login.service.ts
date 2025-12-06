import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  
  private apiUrl = 'https://localhost:44320/api/Login/get-username-password';

  constructor(private http: HttpClient) {}

  getLoginDetails(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
