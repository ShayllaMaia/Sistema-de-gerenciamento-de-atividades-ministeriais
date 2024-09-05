import { Component, OnInit } from '@angular/core';
import { MinisterioService } from 'src/app/services/ministerio.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { MinisterioLiderResponse } from 'src/app/model/ministerio.interface';


@Component({
  selector: 'app-ministerio-listar',
  templateUrl: './ministerio-listar.component.html',
  styleUrls: ['./ministerio-listar.component.css']
})
export class MinisterioListarComponent implements OnInit {
  ministerios: any[] = [];
  papel: string = '';
  lideres: any[] = []; // Alterado de `lider` para `lideres`
  selectedLider: string = '';
  possibleLiders: any[] = [];


  constructor(
    private ministerioService: MinisterioService,
    private router: Router,
    private usuarioService: UsuarioService,
    private membroMinisterioService: MinisterioService
  ) { }

  ngOnInit(): void {
    this.papel = localStorage.getItem('papel') || '';
    this.carregarMinisterios();
    this.membros();
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

  membros(): void {
    this.usuarioService.ListaMembros().subscribe(
      (response) => {
        this.possibleLiders = response;
        // this.abrirModal('membrosModal' + ministerioId);
      },
      (error) => {
        console.error('Erro ao carregar membros:', error);
      }
    );

  }
  carregarMembrosMinisterio(ministerioId: string): void {
    this.membroMinisterioService.getMembrosMinisterio(ministerioId).subscribe(
      (membros) => {
        this.possibleLiders = membros.map(membro => {
          const preferenciasAtividades = Array.isArray(membro.preferenciasAtividades)
            ? membro.preferenciasAtividades
            : JSON.parse(membro.preferenciasAtividades || '[]');
          return {
            ...membro,
            preferenciasAtividades
          };
        });
      },
      (error) => {
        console.error('Erro ao carregar membros do ministério:', error);
      }
    );
  }

  verLiderMinisterio(ministerioId: string): void {
    this.ministerioService.getLiderMinisterio(ministerioId).subscribe(
      (response: MinisterioLiderResponse[]) => {
        if (response && response.length > 0) {
          console.log('Líderes do ministério:', response);
          this.lideres = response.map(item => item.lider).filter(lider => lider);
          this.abrirModal('detalhesModal' + ministerioId);
        } else {
          console.error('Nenhum líder encontrado para o ministério:', ministerioId);
          this.abrirModal('detalhesModal' + ministerioId);
        }
      },
      (error) => {
        console.error('Erro ao carregar líderes do ministério:', error);
      }
    );
  }



  atribuirLideranca(ministerioId: string): void {
    // Abre o modal onde o usuário pode selecionar um líder
    this.abrirModal('atribuirLiderancaModal' + ministerioId);
  }
  selectedLiders: string[] = [];

  onLiderChange(event: any, liderId: string) {
    if (event.target.checked) {
      // Adiciona o líder ao array se for selecionado
      this.selectedLiders.push(liderId);
    } else {
      // Remove o líder do array se for desmarcado
      this.selectedLiders = this.selectedLiders.filter(id => id !== liderId);
    }
  }

  // Método para realizar a requisição
  atribuirLider(ministerioId: string) {
    const data = {
      lider_ids: this.selectedLiders,
      ministerio_id: ministerioId
    };

    this.ministerioService.atribuirLiderMinisterio(data).subscribe(response => {
      console.log('Liderança atribuída com sucesso:', response);

      // Exibe um alerta de sucesso
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Liderança atribuída com sucesso!',

      }).then(() => {
        // Fecha o modal após o alerta ser fechado
        this.fecharModal('atribuirLiderancaModal' + ministerioId);
        window.location.reload();

      });

    }, error => {
      console.error('Erro ao atribuir liderança:', error);

      // Exibe um alerta de erro
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Não foi possível atribuir a liderança. Tente novamente mais tarde.',
      });
    });
  }

}


