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
    // Implementar a navegação para a página de edição com o ID do evento
    this.router.navigate(['/editar-evento', evento.id]);
  }

  excluirEvento(eventoId: string): void {
    // Implementar a lógica para excluir o evento
    // Chame o método do serviço para excluir e, em seguida, recarregue a lista
    this.eventoService.excluirEvento(eventoId).subscribe(
      () => {
        console.log('Evento excluído com sucesso');
        this.carregarEventos();
      },
      (error: any) => {
        console.error('Erro ao carregar eventos:', error);
      }
    );
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
    const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Mês é base 0, então somamos 1
    const ano = data.getFullYear().toString();
    return `${dia}/${mes}/${ano}`;
  }
}
