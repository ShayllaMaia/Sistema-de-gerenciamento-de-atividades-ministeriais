// Importando módulos necessários do Angular
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

// Importando interfaces e serviços personalizados
import { IForm } from 'src/app/i-form';
import { EventoInterface } from 'src/app/model/evento.interface';
import { EventoService } from 'src/app/services/evento.service';
import { MinisterioService } from 'src/app/services/ministerio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evento-cadastro', // Seletor do componente no HTML
  templateUrl: './evento-cadastro.component.html', // Caminho do arquivo HTML associado ao componente
  styleUrls: ['./evento-cadastro.component.css'], // Estilos CSS associados ao componente
})
// Classe que implementa o componente e a interface IForm
export class EventoCadastroComponent implements IForm<EventoInterface> {
  // Propriedade que representa os dados do formulário
  registro: EventoInterface = <EventoInterface>{};
  ministerios: any[] = [];
  selectedMinisterios: number[] = [];
  papel: string = '';

  // Flag que indica se o formulário foi submetido
  isSubmit: boolean = false;

  // Construtor da classe que injeta serviços e dependências
  constructor(
    private eventoService: EventoService, // Serviço para interação com eventos
    private router: Router, // Serviço de roteamento do Angular
    private ministerioService: MinisterioService
  ) {}

  ngOnInit(): void {
    this.papel = localStorage.getItem('papel') || '';
    this.carregarMinisterios();
  }

  carregarMinisterios(): void {
    if (this.papel === 'LIDER') {
      this.ministerioService.getMinisteriosLiderados().subscribe(
        (response: any[]) => {
          console.log('Dados recebidos do serviço (Lider):', response);
          this.ministerios = response.map(item => item.ministerio);
          console.log('Ministérios liderados carregados:', this.ministerios);
        },
        (error: any) => {
          console.error('Erro ao carregar ministérios liderados:', error);
        }
      );
    } else {
      this.ministerioService.getMinisterios().subscribe(
        (ministerios) => {
          console.log('Todos os ministérios carregados:', ministerios);
          this.ministerios = ministerios;
        },
        (error) => {
          console.error('Erro ao carregar ministérios:', error);
        }
      );
    }
  }

  // Método para lidar com mudanças nos checkboxes de ministérios
  onMinisterioChange(event: any, ministerioId: number) {
    if (event.target.checked) {
      this.selectedMinisterios.push(ministerioId);
    } else {
      this.selectedMinisterios = this.selectedMinisterios.filter(id => id !== ministerioId);
    }
  }

  // Método chamado quando o formulário é submetido
  submit(form: NgForm): void {
    // Marcando o formulário como submetido
    this.isSubmit = true;

    // Adicionar os IDs dos ministérios selecionados ao registro
    this.registro.ministerios = this.selectedMinisterios;

    // Chamando o serviço de evento para criar um novo evento
    this.eventoService.criarEvento(this.registro).pipe(
      // Tratando erros usando o operador catchError do RxJS
      catchError((error) => {
        // Resetando a flag de submissão em caso de erro
        Swal.fire('Erro', 'Erro ao cadastrar evento', 'error');
        this.isSubmit = false;
        return error; // Retornando o erro para ser tratado externamente
      })
    ).subscribe({
      // Bloco 'complete' executado quando a solicitação é concluída (com ou sem sucesso)
      complete: () => {
        Swal.fire('Sucesso', 'Culto/Evento cadastrado com sucesso', 'success');
        // Navegando para a rota '/lista-evento' após a conclusão da solicitação
        this.router.navigate(['/lista-evento']);
      }
    });
  }
}

// Interface EventoInterface

