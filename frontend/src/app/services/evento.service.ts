import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventoInterface } from '../model/evento.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private baseUrl = environment.API_URL;
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  criarEvento(evento: EventoInterface): Observable<any> {
    console.log('Enviando evento:', evento);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.baseUrl}/eventos`, evento, { headers });
  }

  getEventos(): Observable<EventoInterface[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<EventoInterface[]>(`${this.baseUrl}/eventos`, { headers });
  }

  excluirEvento(eventoId: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete<void>(`${this.baseUrl}/eventos/${eventoId}`, { headers });
  }

  editarEvento(eventoId: string, evento: EventoInterface): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put(`${this.baseUrl}/eventos/${eventoId}`, evento, { headers });
  }
}
