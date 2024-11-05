import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EscalaService {
  private baseUrl = environment.API_URL;
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  getParticipacoes(): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any[]>(`${this.baseUrl}/escala/participacao`, { headers });
  }
  gerarEscala(): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any[]>(`${this.baseUrl}/escala/`, { headers });
  }

  deleteParticipacao(participacaoId: string): Observable<void> {
    console.log("ID enviado para exclusão:", participacaoId); // Adicione este log para verificar o ID
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete<void>(`${this.baseUrl}/escala/participacao/${participacaoId}`, { headers });
  }


}
