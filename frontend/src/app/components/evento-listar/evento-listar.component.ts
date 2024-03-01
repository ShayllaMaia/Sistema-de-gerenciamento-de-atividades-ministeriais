import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/services/evento.service';
import { EventoInterface } from 'src/app/model/evento.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evento-listar',
  templateUrl: './evento-listar.component.html',
  styleUrls: ['./evento-listar.component.css']
})
export class EventoListarComponent implements OnInit {
  registro: EventoInterface[] = [];

  constructor(
    private eventoService: EventoService,
    private router: Router,
    
  ) { }

  ngOnInit(): void {
    this.carregarEventos();
  }

  carregarEventos(): void {
    this.eventoService.getEventos().subscribe(
      (eventos) => {
        console.log('Eventos carregados:', eventos);
        this.registro = eventos;
      },
      (error) => {
        console.error('Erro ao carregar eventos:', error);
      }
    );
  }

  editarEvento(evento: EventoInterface): void {
    console.log('Editar evento:', evento);
    const eventoIdString = evento.id.toString();
    this.eventoService.editarEvento(eventoIdString, this.formatarDadosEvento(evento)).subscribe(
      (response) => {
        console.log('Evento editado com sucesso:', response);
      },
      (error) => {
        console.error('Erro ao editar evento:', error);
      }
    );
  }

  salvarEdicaoEvento(evento: EventoInterface): void {
    this.eventoService.editarEvento(evento.id.toString(), this.formatarDadosEvento(evento)).subscribe(
      () => {
        console.log('Evento editado com sucesso');
        this.fecharModalEvento('editarModalEvento' + evento.id);
        this.carregarEventos();
      },
      (error: any) => {
        console.error('Erro ao editar evento:', error);
      }
    );
  }

  excluirEvento(eventoId: string): void {
    this.eventoService.excluirEvento(eventoId).subscribe(
      () => {
        console.log('Evento excluído com sucesso');
        this.carregarEventos();
      },
      (error: any) => {
        console.error('Erro ao excluir evento:', error);
      }
    );
  }

  confirmarExcluirEvento(eventoId: string): void {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
      this.excluirEvento(eventoId);
    }
  }

  abrirModalEvento(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  fecharModalEvento(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  formatarDadosEvento(evento: EventoInterface): EventoInterface {
    // Formata os dados do evento antes de enviá-los para o serviço
    const dataFormatada = new Date(evento.data).toISOString();
    const horaInicioFormatada = new Date(evento.hora_inicio).toISOString();
    const horaFimFormatada = new Date(evento.hora_fim).toISOString();

    return {
      ...evento,
      data: dataFormatada,
      hora_inicio: horaInicioFormatada,
      hora_fim: horaFimFormatada
    };
  }

  formatarHora(dataISO: string): string {
    const data = new Date(dataISO);
    const hora = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    return `${hora}:${minutos}`;
  }

  formatarData(dataISO: string): string {
    const data = new Date(dataISO);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear().toString();
    return `${dia}/${mes}/${ano}`;
  }
}
