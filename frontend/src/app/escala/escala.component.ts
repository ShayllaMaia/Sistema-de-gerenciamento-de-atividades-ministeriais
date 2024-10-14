import { Component, OnInit } from '@angular/core';
import { EscalaService } from '../escala.service';
import * as moment from 'moment-timezone'; // Importando moment-timezone
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-escala',
  templateUrl: './escala.component.html',
  styleUrls: ['./escala.component.css']
})
export class EscalaComponent implements OnInit {
  participacoes: any[] = [];
  eventsByDate: { [key: string]: any[] } = {};
  currentMonthDays: { day: number, dateKey: string }[] = [];
  currentMonth: string = '';
  currentYear: number = 0;
  calendarWeeks: any[][] = [];
  expandedEvents: { [key: string]: boolean } = {}; // Controle de eventos expandidos

  constructor(private escalaService: EscalaService, private router: Router) { }

  ngOnInit(): void {
    this.generateCalendar();
    this.carregarParticipacoes();
  }

  generateCalendar(): void {
    const now = moment.tz('America/Rio_Branco');
    this.currentMonth = now.format('MMMM');
    this.currentYear = now.year();

    const startOfMonth = now.clone().startOf('month');
    const endOfMonth = now.clone().endOf('month');
    const startDay = startOfMonth.clone().startOf('week'); // Inicia no domingo
    const endDay = endOfMonth.clone().endOf('week'); // Termina no sábado

    const calendarDays = [];
    let day = startDay.clone();

    while (day.isBefore(endDay, 'day')) {
      calendarDays.push({
        day: day.date(),
        dateKey: day.format('YYYY-MM-DD')
      });
      day.add(1, 'day');
    }

    this.calendarWeeks = [];
    while (calendarDays.length > 0) {
      this.calendarWeeks.push(calendarDays.splice(0, 7));
    }
  }

  carregarParticipacoes(): void {
    this.escalaService.getParticipacoes().subscribe(
      (data: any[]) => {
        this.participacoes = data;
        this.groupEventsByDate();
      },
      error => {
        console.error('Erro ao obter as participações:', error);
      }
    );
  }

  groupEventsByDate(): void {
    this.participacoes.forEach(evento => {
      const dataEvento = moment(evento.data).format('YYYY-MM-DD');

      if (!this.eventsByDate[dataEvento]) {
        this.eventsByDate[dataEvento] = [];
      }

      // Verificar se o evento já foi adicionado para essa data
      let eventoExistente = this.eventsByDate[dataEvento].find(e => e.evento_id === evento.evento.id);

      if (!eventoExistente) {
        // Se não existe, cria o evento e inicializa as atividades
        eventoExistente = {
          evento_id: evento.evento.id,
          nome: evento.evento.nome,
          tipoEvento: evento.evento.tipoEvento,
          hora_chegada: evento.hora_chegada,
          hora_saida: evento.hora_saida,
          atividades: {}
        };
        this.eventsByDate[dataEvento].push(eventoExistente);
      }

      // Se a atividade não existir no evento, cria
      if (!eventoExistente.atividades[evento.atividade_id]) {
        eventoExistente.atividades[evento.atividade_id] = {
          nome: evento.atividade.nome,
          membros: []
        };
      }

      // Adicionar o membro à atividade, garantindo que não haja duplicatas
      if (!eventoExistente.atividades[evento.atividade_id].membros.includes(evento.usuario.nome)) {
        eventoExistente.atividades[evento.atividade_id].membros.push(evento.usuario.nome);
      }
    });
  }

  // Alternar o estado de expansão do evento
  toggleExpand(evento_id: string): void {
    this.expandedEvents[evento_id] = !this.expandedEvents[evento_id];
  }

  // Função para retornar as chaves de um objeto (atividade_id)
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  gerarEscala(): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você deseja gerar a escala?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, gerar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.escalaService.gerarEscala().subscribe(
          () => {
            Swal.fire({
              title: 'Sucesso!',
              text: 'A escala foi gerada com sucesso.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate(['/escala']).then(() => {
                location.reload();
              });
            });
          },
          error => {
            console.error('Erro ao gerar a escala:', error);
            Swal.fire({
              title: 'Erro!',
              text: 'Ocorreu um erro ao gerar a escala. Tente novamente mais tarde.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        );
      }
    });
  }
}
