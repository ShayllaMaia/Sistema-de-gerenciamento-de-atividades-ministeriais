import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { AtividadeInterface } from "src/app/model/ativade.interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class AtividadeService {
    private baseUrl = environment.API_URL;
    private token = localStorage.getItem('token');
  
    constructor(private http: HttpClient) {}

    criarAtividade(atividade: AtividadeInterface): Observable<any> {
        console.log('Enviando atividade:', atividade);
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.post(`${this.baseUrl}/atividade`, atividade, { headers });
    }

    listarAtividades(): Observable<AtividadeInterface[]> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        return this.http.get<AtividadeInterface[]>(`${this.baseUrl}/atividade`, { headers });
    }
  }