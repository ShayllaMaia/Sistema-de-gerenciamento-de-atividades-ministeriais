import { Component, OnInit } from '@angular/core';
import { MinisterioService } from 'src/app/services/ministerio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ministerio-listar',
  templateUrl: './ministerio-listar.component.html',
  styleUrls: ['./ministerio-listar.component.css']
})
export class MinisterioListarComponent implements OnInit {
  ministerios: any[] = [];
  papel: string = '';

  constructor(
    private ministerioService: MinisterioService,
    private router: Router,
  ) { }

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
  

  isAdminOrLider(): boolean {
    return this.papel === 'ADMIN' || this.papel === 'LIDER';
  }

  isNormal(): boolean {
    return this.papel === 'NORMAL';
  }

  editarMinisterio(ministerio: any): void {
    this.ministerioService.editarMinisterio(ministerio.id, ministerio).subscribe(
      (response) => {
        this.carregarMinisterios(); // Recarrega a lista de ministérios após edição
      },
      (error) => {
        console.error('Erro ao editar ministério:', error);
      }
    );
  }

  salvarEdicaoMinisterio(ministerio: any): void {
    this.ministerioService.editarMinisterio(ministerio.id, ministerio).subscribe(
      () => {
        this.fecharModal('editarModal' + ministerio.id);
        this.carregarMinisterios(); // Recarrega a lista de ministérios após edição
      },
      (error) => {
        console.error('Erro ao editar ministério:', error);
      }
    );
  }

  excluirMinisterio(ministerioId: string): void {
    this.ministerioService.excluirMinisterio(ministerioId).subscribe(
      () => {
        this.carregarMinisterios(); // Recarrega a lista de ministérios após exclusão
      },
      (error) => {
        console.error('Erro ao excluir ministério:', error);
      }
    );
  }

  confirmarExcluirMinisterio(ministerioId: string): void {
    if (confirm('Tem certeza que deseja excluir este ministério?')) {
      this.excluirMinisterio(ministerioId);
    }
  }

  abrirModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  fecharModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    } else {
      console.error('Modal não encontrado');
    }
  }

  verMembrosMinisterio(ministerioId: string): void {
    this.router.navigate(['/membros-ministerio', ministerioId]);
  }
}
