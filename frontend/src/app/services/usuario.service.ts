import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UsuarioInterface } from '../model/usuario.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  criarUsuario(usuario:UsuarioInterface){
    return this.http.post(`${this.baseUrl}/usuario`, usuario);

  }
  
  ListaMembros(): Observable<UsuarioInterface[]> {
    return this.http.get<UsuarioInterface[]>(`${this.baseUrl}/usuario`);
  }
  
}
