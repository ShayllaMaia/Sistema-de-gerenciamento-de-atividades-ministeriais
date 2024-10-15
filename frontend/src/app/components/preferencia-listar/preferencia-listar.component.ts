import { Component, OnInit } from '@angular/core';
import { PreferenciaService } from 'src/app/services/preferencia.service';
import { PreferenciaInterface } from 'src/app/model/preferencia.interface';
import Swal from 'sweetalert2';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc'
import { jwtDecode } from 'jwt-decode';

interface JwtPayLoad {
  usuario_id: string;
  usuario_papel: string;
  iat: number;
}

dayjs.extend(utc);

@Component({
  selector: 'app-preferencia-listar',
  templateUrl: './preferencia-listar.component.html',
  styleUrls: ['./preferencia-listar.component.css'],
})
export class PreferenciaListarComponent implements OnInit {
  preferencias: PreferenciaInterface[] = [];
  userId: string = '';

  constructor(private preferenciaService: PreferenciaService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token') || '';
    const decodedToken = jwtDecode<JwtPayLoad>(token);
    this.userId = decodedToken.usuario_id;
    this.getPreferencias();
  }

  getPreferencias(): void {
    if (this.userId) {
      this.preferenciaService
        .getPreferenciasPorUsuarioId(this.userId)
        .subscribe({
          next: (data) => {
            data.map(data => {
              data.hora_fim = dayjs.utc(data.hora_fim).format('HH:mm');
              data.hora_inicio = dayjs.utc(data.hora_inicio).format('HH:mm');
            });
            this.preferencias = data;
          },
          error: (error) => {
            console.error('Erro ao carregar preferências:', error);
            Swal.fire(
              'Erro',
              'Não foi possível carregar as preferências',
              'error'
            );
          },
        });
    } else {
      Swal.fire('Erro', 'Usuário não autenticado', 'error');
    }
  }

  confirmarRemoverPreferencia(preferenciaId?: string): void {
    if (!preferenciaId) {
      Swal.fire('Erro', 'ID da preferência não encontrado.', 'error');
      return;
    }

    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, remover!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.removerPreferencia(preferenciaId);
      }
    });
  }

  removerPreferencia(preferenciaId: string): void {
    this.preferenciaService.excluirPreferencia(preferenciaId).subscribe({
      complete: () => {
        Swal.fire('Removido!', 'Sua preferência foi removida.', 'success');
        // Atualiza a lista de preferências localmente após a exclusão
        this.preferencias = this.preferencias.filter(p => p.id !== preferenciaId);
      },
      error: (error) => {
        Swal.fire('Erro', 'Erro ao remover preferência', 'error');
      }
    });
  }

}
