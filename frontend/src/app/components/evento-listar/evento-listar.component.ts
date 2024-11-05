import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/services/evento.service';
import { EventoInterface } from 'src/app/model/evento.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evento-listar',
  templateUrl: './evento-listar.component.html',
  styleUrls: ['./evento-listar.component.css'],
})
export class EventoListarComponent implements OnInit {
  registro: EventoInterface[] = [];
  erroLogin: string = '';
  isAdmin: boolean = false;
  ministerioService: any;

  constructor(
    private eventoService: EventoService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.carregarEventos();
    const papelUsuario = localStorage.getItem('papel');
    this.isAdmin = papelUsuario === 'ADMIN';
  }

  carregarEventos(): void {
    this.toastr.success('Mensagem de sucesso!', 'Sucesso');
    this.eventoService.getEventos().subscribe(
      (eventos) => {
        console.log('Eventos carregados:', eventos);
        for (let i = 0; i < eventos.length; i++) {
          eventos[i].data = this.formatarDataInput(eventos[i].data);
          eventos[i].hora_inicio = this.formatarHora(eventos[i].hora_inicio);
          eventos[i].hora_fim = this.formatarHora(eventos[i].hora_fim);
        }
        console.log('Eventos formatados:', eventos);
        this.registro = eventos;
        console.log('Eventos:', this.registro);
      },
      (error) => {
        console.error('Erro ao carregar eventos:', error);
      }
    );
  }

  editarEvento(evento: EventoInterface): void {
    console.log('Editar evento:', evento);
    const eventoIdString = evento.id.toString();
    this.eventoService
      .editarEvento(eventoIdString, this.formatarDadosEvento(evento))
      .subscribe(
        (response) => {
          console.log('Evento editado com sucesso:', response);
          this.toastr.success('Mensagem de sucesso!', 'Sucesso');
        },
        (error) => {
          console.error('Erro ao editar evento:', error);
          this.toastr.error('Mensagem de erro!', 'Erro');
        }
      );
  }

  salvarEdicaoEvento(evento: EventoInterface): void {
    this.eventoService.editarEvento(evento.id.toString(), evento).subscribe(
      () => {
        console.log('Evento editado com sucesso');
        this.toastr.success('Mensagem de sucesso!', 'Sucesso');
        this.fecharModalEvento('editarModalEvento' + evento.id);
        this.carregarEventos();
      },
      (error) => {
        console.error('Erro ao fazer login:', error);
        if (error.status === 401) {
          this.erroLogin =
            'Usuário ou senha incorretos. Por favor, verifique suas credenciais.';
        } else {
          this.erroLogin =
            'Erro ao fazer login. Por favor, tente novamente mais tarde.';
        }
      }
    );
  }

  excluirEvento(eventoId: string): void {
    this.eventoService.excluirEvento(eventoId).subscribe(
      () => {
        this.carregarEventos();
      },
      (error: any) => {
        console.error('Erro ao excluir evento:', error);
      }
    );
  }

  confirmarExcluirEvento(eventoId: string): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventoService.excluirEvento(eventoId).subscribe({
          next: () => {
            Swal.fire(
              'Sucesso',
              'Ministério excluído com sucesso',
              'success'
            ).then(() => {
              location.reload();
            });
          },
          error: (err) => {
            Swal.fire(
              'Erro',
              'Ocorreu um erro ao excluir o ministério',
              'error'
            );
          },
        });
      }
    });
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
      // hora_inicio: horaInicioFormatada,
      // hora_fim: horaFimFormatada
    };
  }

  formatarHora(dataISO: string): string {
    // Divida a string de data e hora no "T"
    const partes = dataISO.split('T');
    const horaCompleta = partes[1];
    const partesHora = horaCompleta.split(':');
    const hora = partesHora[0];
    const minuto = partesHora[1];
    return `${hora}:${minuto}`;
  }

  formatarData(dataISO: string): string {
    const data = new Date(dataISO);
    const dia = data.getUTCDate().toString().padStart(2, '0');
    const mes = (data.getUTCMonth() + 1).toString().padStart(2, '0');
    const ano = data.getUTCFullYear().toString();
    return `${dia}/${mes}/${ano}`;
  }
  formatarDataInput(dataISO: string): string {
    const data = new Date(dataISO);
    const dia = data.getUTCDate().toString().padStart(2, '0');
    const mes = (data.getUTCMonth() + 1).toString().padStart(2, '0');
    const ano = data.getUTCFullYear().toString();

    return `${ano}-${mes}-${dia}`;
  }
}
