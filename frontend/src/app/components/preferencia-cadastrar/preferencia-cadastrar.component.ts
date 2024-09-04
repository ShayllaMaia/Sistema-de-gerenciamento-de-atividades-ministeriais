import { Component, OnInit } from '@angular/core'; // Importa o decorator Component e o hook OnInit
import { NgForm } from '@angular/forms'; // Importa NgForm para gerenciar formulários
import { Router } from '@angular/router'; // Importa Router para navegação
import { catchError, throwError } from 'rxjs'; // Importa operadores RxJS para tratamento de erros
import { PreferenciaService } from 'src/app/services/preferencia.service'; // Importa o serviço de preferências
import { PreferenciaInterface } from 'src/app/model/preferencia.interface'; // Importa a interface para preferências
import Swal from 'sweetalert2'; // Importa SweetAlert2 para mostrar alertas
import { jwtDecode } from 'jwt-decode';
interface JwtPayLoad {
  usuario_id: string;
  usuario_papel: string;
  iat: number;
}

@Component({
  selector: 'app-preferencia-cadastrar', // Seletor do componente
  templateUrl: './preferencia-cadastrar.component.html', // Caminho para o template HTML
  styleUrls: ['./preferencia-cadastrar.component.css'], // Caminho para o arquivo de estilos
})

export class PreferenciaCadastrarComponent implements OnInit {
  registros: PreferenciaInterface[] = []; // Array para armazenar registros de preferências
  userId: string = ''; // ID do usuário, inicializado como string vazia
  diasDaSemana: string[] = [
    'SEGUNDA',
    'TERÇA',
    'QUARTA',
    'QUINTA',
    'SEXTA',
    'SÁBADO',
    'DOMINGO',
  ]; // Lista de dias da semana
  
  constructor(
    private preferenciaService: PreferenciaService, // Injeta o serviço de preferências
    private router: Router // Injeta o serviço de roteamento
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token') || '';
    const decodedToken = jwtDecode<JwtPayLoad>(token);
    this.userId = decodedToken.usuario_id;
    this.addPreferencia(); // Inicializa o array de registros com uma pref;// Exibe o ID do usuário no console para depuraçãoerência padrão
  }
  SepararDias(registros: PreferenciaInterface[]): PreferenciaInterface[]{
    return registros.flatMap(registro =>
      registro.dia_semana.map(dia => ({
        usuario_id: registro.usuario_id,
        dia_semana: [dia],
        hora_inicio: registro.hora_inicio,
        hora_fim: registro.hora_fim
      }))
    );
}
  addPreferencia(): void {
    this.registros.push({
      usuario_id: this.userId, // Atribui o ID do usuário ao novo registro
      dia_semana: [], // Inicializa o array de dias como vazio
      hora_inicio: new Date().toLocaleString(), // Define a hora de início como a data e hora atuais em formato ISO
      hora_fim: new Date().toLocaleString(), // Define a hora de fim como a data e hora atuais em formato ISO
    });
  }

  onDiaChange(event: any, index: number): void {
    // Método chamado quando um checkbox é alterado
    const dia = event.target.value; // Obtém o valor do dia do checkbox
    if (event.target.checked) {
      // Se o checkbox estiver marcado
      this.registros[index].dia_semana.push(dia); // Adiciona o dia ao array de dias do registro correspondente
    } else {
      // Se o checkbox estiver desmarcado
      this.registros[index].dia_semana = this.registros[index].dia_semana.filter(
        (d) => d !== dia
      ); // Remove o dia do array de dias do registro correspondente
    }
  }
  
  submit(form: NgForm): void {
    if (this.userId) {
      this.registros.map((item) => {
        const today = new Date();
        const [hoursInit, minuteInit] = item.hora_inicio.split(':').map(Number);
        const [hoursFim, minuteFim] = item.hora_fim.split(':').map(Number);
        today.setUTCHours(hoursInit, minuteInit, 0, 0);
        item.hora_inicio = today.toLocaleString('pt-BR', { timeZone: 'America/Rio_Branco' });
        today.setUTCHours(hoursFim, minuteFim, 0, 0);
        item.hora_fim = today.toLocaleString('pt-BR', { timeZone: 'America/Rio_Branco' });
      });
      this.registros.forEach((preferencia) => {
        preferencia.usuario_id = this.userId;
      });
      this.registros = this.SepararDias(this.registros)
      console.log(this.registros) // Exibe os registros a serem enviados no console para depuração
      this.preferenciaService
        .criarPreferencias(this.registros)
        .pipe(
          // Chama o método do serviço para criar as preferências e usa pipe para adicionar tratamento de erros
          catchError((error) => {
            console.error('Erro ao cadastrar preferências:', error); // Exibe o erro no console para depuração
            Swal.fire('Erro', 'Erro ao cadastrar preferências', 'error'); // Mostra um alerta de erro
            return throwError(error); // Lança o erro novamente para ser tratado pelo subscribe
          })
        )
        .subscribe({
          complete: () => {
            // Método chamado quando a solicitação é concluída com sucesso
            Swal.fire(
              'Sucesso',
              'Preferências cadastradas com sucesso',
              'success'
            ); // Mostra um alerta de sucesso
            this.router.navigate(['/home']); // Navega para a página inicial
          },
        });
    } else {
      Swal.fire('Erro', 'Usuário não autenticado', 'error'); // Mostra um alerta de erro se o usuário não estiver autenticado
    }
  }
}
