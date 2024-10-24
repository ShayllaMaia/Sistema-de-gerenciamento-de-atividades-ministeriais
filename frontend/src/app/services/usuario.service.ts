import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { UsuarioInterface } from '../model/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  criarUsuario(usuario: UsuarioInterface): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/usuario`, usuario, { headers });
  }

  ListaMembros(): Observable<UsuarioInterface[]> {
    const headers = this.getHeaders();
    return this.http.get<UsuarioInterface[]>(`${this.baseUrl}/usuario`, { headers });
  }

  criarSolicitacao(solicitacao: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/solicitacao`, solicitacao, { headers });
  }
  getUsuarioById(id: string): Observable<UsuarioInterface> {
    const headers = this.getHeaders();
    return this.http.get<UsuarioInterface>(`${this.baseUrl}/usuario/${id}`, { headers });
  }
  updateUsuario(usuario: UsuarioInterface): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/usuario/${usuario.id}`, usuario, { headers });
  }
}
