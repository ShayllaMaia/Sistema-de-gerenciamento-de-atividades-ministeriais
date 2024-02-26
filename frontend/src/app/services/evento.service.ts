import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventoInterface } from '../model/evento.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  criarEvento(evento: EventoInterface): Observable<any> {
    console.log('Enviando evento:', evento);
    return this.http.post(`${this.baseUrl}/eventos`, evento);
  }

  getEventos(): Observable<EventoInterface[]> {
    return this.http.get<EventoInterface[]>(`${this.baseUrl}/eventos`);
  }

  excluirEvento(eventoId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eventos/${eventoId}`);
  }

  editarEvento(eventoId: string, evento: EventoInterface): Observable<any> {
    return this.http.put(`${this.baseUrl}/eventos/${eventoId}`, evento);
  }
}
