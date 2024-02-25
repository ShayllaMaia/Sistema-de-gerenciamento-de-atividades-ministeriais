import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { IForm } from 'src/app/i-form';
import { EventoInterface } from 'src/app/model/evento.interface';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento-cadastro',
  templateUrl: './evento-cadastro.component.html',
  styleUrls: ['./evento-cadastro.component.css'],
})
export class EventoCadastroComponent implements IForm<EventoInterface> {
  registro: EventoInterface = <EventoInterface>{};
  isSubmit: boolean = false;

  constructor(
    private eventoService: EventoService,
    private router: Router,
    http: HttpClient
  ) {}

  submit(form: NgForm): void {
    this.isSubmit = true;
    this.eventoService.criarEvento(this.registro).pipe(
      catchError((error) => {
        this.isSubmit = false;
        console.log('erro');
        return error;
      })
    ).subscribe({
      complete: () => {
        console.log('completo');
        this.router.navigate(['/lista-evento']);
      }
    });
  }
}
