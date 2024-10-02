import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MinisterioInterface, Solicita } from '../model/ministerio.interface';
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

  excluirMinisterio(ministerioId: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete<void>(`${this.baseUrl}/ministerio/${ministerioId}`, { headers });
  }
  

  editarMinisterio(ministerioId: string, ministerio: MinisterioInterface): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put(`${this.baseUrl}/ministerio/${ministerioId}`, ministerio, { headers });
  }

  getMembrosMinisterio(ministerioId: string): Observable<UsuarioInterface[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<UsuarioInterface[]>(`${this.baseUrl}/membroMinisterio/${ministerioId}`, { headers });
  }
  getMembrosMinisterioSolicita(ministerioId: string): Observable<UsuarioInterface[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<UsuarioInterface[]>(`${this.baseUrl}/membroMinisterio/membros/${ministerioId}`, { headers });
  }
  aceitaSolicitacao(ministerioId: string, ministerio: Solicita): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put(`${this.baseUrl}/membroMinisterio/atualizar/${ministerioId}`, ministerio, { headers });
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
  getLiderMinisterio(ministerioId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
   return this.http.get<any[]>(`${this.baseUrl}/ministerioLider/${ministerioId}`, { headers });
  }


  atribuirLiderMinisterio(data: { lider_ids: string[], ministerio_id: string }): Observable<any> {
    console.log('Enviando lider:');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.baseUrl}/ministerioLider`, data, { headers });
  }

  getAllAtividades(): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any[]>(`${this.baseUrl}/atividade/`, { headers });
  }

}
