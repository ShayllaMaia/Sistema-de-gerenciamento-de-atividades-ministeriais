import { Component, OnInit } from '@angular/core';
import { MinisterioService } from 'src/app/services/ministerio.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  quantidadeMinisterios: number = 0;
  quantidadeAtividades: number = 0;
  quantidadeUsuarios: number = 0;

  constructor(
    private ministerioService: MinisterioService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.getQuantidades();
  }

  getQuantidades(): void {
    this.ministerioService.getMinisterios().subscribe({
      next: (ministerios) => {
        this.quantidadeMinisterios = ministerios.length;
      },
      error: (error) => {
        console.error('Erro ao carregar ministérios:', error);
      }
    });

    this.usuarioService.ListaMembros().subscribe({
      next: (usuarios) => {
        this.quantidadeUsuarios = usuarios.length;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    });

    // Assumindo que `getAtividades` retorna atividades de todos os ministérios
    this.ministerioService.getAllAtividades().subscribe({
      next: (atividades) => {
        this.quantidadeAtividades = atividades.length;
      },
      error: (error) => {
        console.error('Erro ao carregar atividades:', error);
      }
    });
  }
}
