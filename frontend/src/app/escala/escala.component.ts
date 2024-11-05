import { Component, OnInit } from '@angular/core';
import { EscalaService } from '../escala.service';
import * as moment from 'moment-timezone';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MinisterioService } from '../services/ministerio.service';
import { UsuarioInterface } from '../model/usuario.interface';
import { UsuarioService } from '../services/usuario.service';

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
  expandedEvents: { [key: string]: boolean } = {};
  papel: string = '';
  ministerios: any[] = [];
  membros: UsuarioInterface[] = [];

  // Variáveis para os filtros
  selectedUsuarioId: string | null = null;
  selectedMinisterioId: string | null = null;
  selectedMes: string | null = null;

  constructor(
    private escalaService: EscalaService,
    private router: Router,
    private ministerioService: MinisterioService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.generateCalendar();
    this.carregarParticipacoes();
    this.papel = localStorage.getItem('papel') || '';
    this.carregarMembros();
    this.carregarMinisterios();
  }

  isAdminOrLider(): boolean {
    return this.papel === 'ADMIN' || this.papel === 'LIDER';
  }

  generateCalendar(month: number = moment().month(), year: number = moment().year()): void {
    const now = moment.tz('America/Rio_Branco').month(month).year(year);
    this.currentMonth = now.format('MMMM'); // Atualiza o `currentMonth` com o novo valor
    this.currentYear = now.year();

    const startOfMonth = now.clone().startOf('month');
    const endOfMonth = now.clone().endOf('month');
    const startDay = startOfMonth.clone().startOf('week');
    const endDay = endOfMonth.clone().endOf('week');

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
        this.applyFiltersAndGroupEvents();
      },
      error => {
        console.error('Erro ao obter as participações:', error);
      }
    );
  }

  carregarMinisterios(): void {

    this.ministerioService.getMinisterios().subscribe(
      (ministerios) => {
        this.ministerios = ministerios;
      },
      (error) => {
        console.error('Erro ao carregar ministérios:', error);
      }
    );

  }

  carregarMembros(): void {
    this.usuarioService.ListaMembros().subscribe(
      (data: UsuarioInterface[]) => {
        this.membros = data;
      },
      error => {
        console.error('Erro ao obter a lista de membros:', error);
      }
    );
  }

  applyFiltersAndGroupEvents(): void {
    let filteredParticipacoes = this.participacoes;

    if (this.selectedUsuarioId) {
      filteredParticipacoes = filteredParticipacoes.filter(
        participacao => participacao.usuario_id === this.selectedUsuarioId
      );
    }
    if (this.selectedMinisterioId) {
      filteredParticipacoes = filteredParticipacoes.filter(
        participacao => participacao.ministerio_id === this.selectedMinisterioId
      );
    }
    if (this.selectedMes) {
      filteredParticipacoes = filteredParticipacoes.filter(
        participacao => participacao.mes === this.selectedMes
      );
    }

    this.eventsByDate = {}; // reset para aplicar novos filtros
    filteredParticipacoes.forEach(participacao => {
      const dataEvento = moment.utc(participacao.data).format('YYYY-MM-DD');

      if (!this.eventsByDate[dataEvento]) {
        this.eventsByDate[dataEvento] = [];
      }

      let eventoExistente = this.eventsByDate[dataEvento].find(e => e.evento_id === participacao.evento.id);

      if (!eventoExistente) {
        eventoExistente = {
          evento_id: participacao.evento.id,
          nome: participacao.evento.nome,
          tipoEvento: participacao.evento.tipoEvento,
          hora_chegada: participacao.hora_chegada,
          hora_saida: participacao.hora_saida,
          ministerio: participacao.ministerio,
          atividades: {}
        };
        this.eventsByDate[dataEvento].push(eventoExistente);
      }

      if (!eventoExistente.atividades[participacao.atividade_id]) {
        eventoExistente.atividades[participacao.atividade_id] = {
          nome: participacao.atividade.nome,
          membros: []
        };
      }

      eventoExistente.atividades[participacao.atividade_id].membros.push({
        nome: participacao.usuario.nome,
        id: participacao.id // Aqui, armazenamos o id da participação
      });
    });
  }


  toggleExpand(evento_id: string): void {
    this.expandedEvents[evento_id] = !this.expandedEvents[evento_id];
  }

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

  formatarHora(dataISO: string): string {
    const partes = dataISO.split('T');
    const horaCompleta = partes[1];
    const partesHora = horaCompleta.split(':');
    return `${partesHora[0]}:${partesHora[1]}`;
  }

  onFilterChange(): void {
    if (this.selectedMes) {
      const [year, month] = this.selectedMes.split('-');
      this.currentYear = parseInt(year, 10);
      this.currentMonth = moment.months(parseInt(month, 10) - 1); // Atualiza o mês

      // Gere o calendário para o novo mês e ano selecionados
      this.generateCalendar(parseInt(month, 10) - 1, this.currentYear);
    } else {
      // Restaura para o mês atual caso "Todos" seja selecionado
      const now = moment();
      this.currentYear = now.year();
      this.currentMonth = now.format('MMMM');
      this.generateCalendar();
    }

    this.applyFiltersAndGroupEvents();
  }


  getUniqueMonths(): string[] {
    return Array.from(new Set(this.participacoes.map(participacao => participacao.mes)));
  }

  deleteParticipacao(participacaoId: string): void {
    console.log("Chamando o serviço de exclusão com ID:", participacaoId); // Confirme que o ID está correto aqui também

    Swal.fire({
      title: 'Tem certeza?',
      text: "Você deseja excluir esta participação?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Agora passando apenas o `participacaoId`
        this.escalaService.deleteParticipacao(participacaoId).subscribe(
          () => {
            Swal.fire({
              title: 'Sucesso!',
              text: 'A participação foi excluída com sucesso.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.carregarParticipacoes(); // Atualiza a lista de participações
            });
          },
          error => {
            console.error('Erro ao excluir a participação:', error);
            Swal.fire({
              title: 'Erro!',
              text: 'Ocorreu um erro ao excluir a participação. Tente novamente mais tarde.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        );
      }
    });
  }


}
