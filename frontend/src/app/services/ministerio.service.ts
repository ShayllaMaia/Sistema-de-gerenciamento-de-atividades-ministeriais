import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MinisterioInterface } from '../model/ministerio.interface';
import { environment } from 'src/environments/environment';
import { UsuarioInterface } from '../model/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class MinisterioService {
  private baseUrl = environment.API_URL;
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  criarMinisterio(ministerio: MinisterioInterface): Observable<any> {
    console.log('Enviando ministério:', ministerio);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.baseUrl}/ministerio`, ministerio, { headers });
  }

  getMinisterios(): Observable<MinisterioInterface[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<MinisterioInterface[]>(`${this.baseUrl}/ministerio`, { headers });
  }

  excluirMinisterio(ministerioId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete(`${this.baseUrl}/ministerio/${ministerioId}`, { headers });
  }

  editarMinisterio(ministerioId: string, ministerio: MinisterioInterface): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put(`${this.baseUrl}/ministerio/${ministerioId}`, ministerio, { headers });
  }

  getMembrosMinisterio(ministerioId: string): Observable<UsuarioInterface[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<UsuarioInterface[]>(`${this.baseUrl}/membroMinisterio/${ministerioId}`, { headers });
  }

  getMinisteriosLiderados(): Observable<MinisterioInterface[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<MinisterioInterface[]>(`${this.baseUrl}/ministerioLider`, { headers });
  }
  getAtividades(ministerioId: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any[]>(`${this.baseUrl}/atividades/${ministerioId}`, { headers });
  }

  deleteMembroMinisterio(data: { idMembro: string, idMinisterio: string }): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.baseUrl}/membroMinisterio/deletar`, data, { headers });
  }
}
