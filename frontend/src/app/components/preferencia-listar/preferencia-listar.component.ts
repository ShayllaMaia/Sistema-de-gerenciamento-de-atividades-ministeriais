import { Component, OnInit } from '@angular/core';
import { PreferenciaService } from 'src/app/services/preferencia.service';
import { PreferenciaInterface } from 'src/app/model/preferencia.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preferencia-listar',
  templateUrl: './preferencia-listar.component.html',
  styleUrls: ['./preferencia-listar.component.css']
})
export class PreferenciaListarComponent implements OnInit {
  preferencias: PreferenciaInterface[] = [];
  userId: string = '';

  constructor(private preferenciaService: PreferenciaService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('usuario_id') || '';
    this.getPreferencias();
  }

  getPreferencias(): void {
    if (this.userId) {
      this.preferenciaService.getPreferenciasPorUsuarioId(this.userId).subscribe({
        next: (data) => {
          console.log(data); // Verifique a saída aqui
          this.preferencias = data;
        },
        error: (error) => {
          console.error('Erro ao carregar preferências:', error);
          Swal.fire('Erro', 'Não foi possível carregar as preferências', 'error');
        }
      });
    } else {
      Swal.fire('Erro', 'Usuário não autenticado', 'error');
    }
  }
  
}
