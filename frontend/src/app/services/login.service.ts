import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}


  fazerLogin(credenciais: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credenciais);
  }

  logout() {
    localStorage.removeItem('token');
  }
  
}
