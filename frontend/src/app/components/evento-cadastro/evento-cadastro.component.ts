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

// Decorator @Component define a estrutura do componente Angular
@Component({
  selector: 'app-evento-cadastro', // Seletor do componente no HTML
  templateUrl: './evento-cadastro.component.html', // Caminho do arquivo HTML associado ao componente
  styleUrls: ['./evento-cadastro.component.css'], // Estilos CSS associados ao componente
})
// Classe que implementa o componente e a interface IForm
export class EventoCadastroComponent implements IForm<EventoInterface> {
  // Propriedade que representa os dados do formulário
  registro: EventoInterface = <EventoInterface>{};
  
  // Flag que indica se o formulário foi submetido
  isSubmit: boolean = false;

  // Construtor da classe que injeta serviços e dependências
  constructor(
    private eventoService: EventoService, // Serviço para interação com eventos
    private router: Router, // Serviço de roteamento do Angular
    http: HttpClient // Cliente HTTP do Angular para fazer solicitações HTTP
  ) {}

  // Método chamado quando o formulário é submetido
  submit(form: NgForm): void {
    // Marcando o formulário como submetido
    this.isSubmit = true;

    // Chamando o serviço de evento para criar um novo evento
    this.eventoService.criarEvento(this.registro).pipe(
      // Tratando erros usando o operador catchError do RxJS
      catchError((error) => {
        // Resetando a flag de submissão em caso de erro
        this.isSubmit = false;
        console.log('erro');
        return error; // Retornando o erro para ser tratado externamente
      })
    ).subscribe({
      // Bloco 'complete' executado quando a solicitação é concluída (com ou sem sucesso)
      complete: () => {
        console.log('completo');
        // Navegando para a rota '/lista-evento' após a conclusão da solicitação
        this.router.navigate(['/lista-evento']);
      }
    });
  }
}
