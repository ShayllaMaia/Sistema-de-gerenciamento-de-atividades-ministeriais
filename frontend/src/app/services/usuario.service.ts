import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UsuarioInterface } from '../model/usuario.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = environment.API_URL;
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  criarUsuario(usuario:UsuarioInterface){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.baseUrl}/usuario`, usuario, { headers });

  }
  
  ListaMembros(): Observable<UsuarioInterface[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<UsuarioInterface[]>(`${this.baseUrl}/usuario`, { headers });
  }
  
}
