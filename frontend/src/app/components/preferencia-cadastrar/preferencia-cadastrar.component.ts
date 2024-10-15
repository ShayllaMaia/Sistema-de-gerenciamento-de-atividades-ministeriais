import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { PreferenciaService } from 'src/app/services/preferencia.service';
import { PreferenciaInterface } from 'src/app/model/preferencia.interface';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

interface JwtPayLoad {
  usuario_id: string;
  usuario_papel: string;
  iat: number;
}

@Component({
  selector: 'app-preferencia-cadastrar',
  templateUrl: './preferencia-cadastrar.component.html',
  styleUrls: ['./preferencia-cadastrar.component.css'],
})
export class PreferenciaCadastrarComponent implements OnInit {
  registros: PreferenciaInterface[] = [];
  userId: string = '';
  diasDaSemana: string[] = [
    'SEGUNDA',
    'TERÇA',
    'QUARTA',
    'QUINTA',
    'SEXTA',
    'SÁBADO',
    'DOMINGO',
  ];

  constructor(
    private preferenciaService: PreferenciaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token') || '';
    const decodedToken = jwtDecode<JwtPayLoad>(token);
    this.userId = decodedToken.usuario_id;
    this.addPreferencia();
  }

  SepararDias(registros: PreferenciaInterface[]): PreferenciaInterface[] {
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
      usuario_id: this.userId,
      dia_semana: [],
      hora_inicio: new Date().toLocaleString(),
      hora_fim: new Date().toLocaleString(),
    });
  }

  onDiaChange(event: any, index: number): void {
    const dia = event.target.value;
    if (event.target.checked) {
      this.registros[index].dia_semana.push(dia);
    } else {
      this.registros[index].dia_semana = this.registros[index].dia_semana.filter(
        (d) => d !== dia
      );
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

      this.registros = this.SepararDias(this.registros);

      this.preferenciaService
        .criarPreferencias(this.registros)
        .pipe(
          catchError((error) => {
            console.error('Erro ao cadastrar preferências:', error);
            Swal.fire('Erro', 'Erro ao cadastrar preferências', 'error');
            return throwError(error);
          })
        )
        .subscribe({
          complete: () => {
            // Redireciona para a rota de listar preferências após o sucesso
            Swal.fire(
              'Sucesso',
              'Preferências cadastradas com sucesso',
              'success'
            ).then(() => {
              this.router.navigate(['/preferencia-listar']); // Altere aqui para redirecionar após o cadastro
            });
          },
        });
    } else {
      Swal.fire('Erro', 'Usuário não autenticado', 'error');
    }
  }
}
