import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { PreferenciaInterface } from '../model/preferencia.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreferenciaService {
  private baseUrl = environment.API_URL;
  private token = localStorage.getItem('token'); // Armazena o token para uso nos headers

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    // Obtém o token do localStorage e configura os headers
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      console.error('Token não encontrado');
      return new HttpHeaders();
    }
  }

    criarPreferencias(preferencias: PreferenciaInterface[]): Observable<any> {
    const headers = this.getHeaders(); 
    console.log(preferencias);// Obtém os headers com o token de autenticação
    return this.http.post(`http://localhost:3200/preferenciahorarios`, preferencias, { headers });
  } 

  getPreferencias(): Observable<PreferenciaInterface[]> {
    const headers = this.getHeaders(); // Obtém os headers com o token de autenticação
    return this.http.get<PreferenciaInterface[]>(`${this.baseUrl}/preferencias`, { headers });
  }

  editarPreferencia(preferenciaId: string, preferencia: PreferenciaInterface): Observable<any> {
    const headers = this.getHeaders(); // Obtém os headers com o token de autenticação
    return this.http.put(`${this.baseUrl}/preferencias/${preferenciaId}`, preferencia, { headers });
  }

  excluirPreferencia(preferenciaId: string): Observable<any> {
    const headers = this.getHeaders(); // Obtém os headers com o token de autenticação
    return this.http.delete(`${this.baseUrl}/preferencias/${preferenciaId}`, { headers });
  }

  getPreferenciasPorUsuarioId(usuarioId: string): Observable<PreferenciaInterface[]> {
    const headers = this.getHeaders();
    return this.http.get<PreferenciaInterface[]>(`${this.baseUrl}/preferencias/${usuarioId}`, { headers });
  }
}
