import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MinisterioLiderResponse } from 'src/app/model/ministerio.interface';
import { MinisterioService } from 'src/app/services/ministerio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todos-ministerios',
  templateUrl: './todos-ministerios.component.html',
  styleUrls: ['./todos-ministerios.component.css']
})
export class TodosMinisteriosComponent implements OnInit {

  ministerios: any[] = [];
  papel: string = '';
  lideres: any[] = []; // Alterado de lider para lideres
  selectedLider: string = '';
  possibleLiders: any[] = [];
  possibleLidersFiltered: any[] = []
  isLiderMinisterio: { [key: string]: boolean } = {};
  membrosMinisterio: any[] = [];

  constructor(
    private ministerioService: MinisterioService,
    private router: Router,
    private usuarioService: UsuarioService,
    private membroMinisterioService: MinisterioService
  ) { }

  ngOnInit(): void {
    this.papel = localStorage.getItem('papel') || '';
    this.carregarMinisterios(); // Carrega todos os ministérios
    this.membros(); 
  }

  carregarMinisterios(): void {
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

  isAdminOrLider(): boolean {
    return this.papel === 'ADMIN' || this.papel === 'LIDER';
  }

  isAdmin(): boolean {
    return this.papel === 'ADMIN';
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

  confirmarExclusao(ministerioId: number): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.ministerioService.excluirMinisterio(ministerioId.toString()).subscribe({
          next: () => {
            Swal.fire('Sucesso', 'Ministério excluído com sucesso', 'success')
            .then(() => {
              location.reload();
            });
          },
          error: (err) => {
            Swal.fire('Erro', 'Ocorreu um erro ao excluir o ministério', 'error');
          }
        });
      }
    });
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
      },
      (error) => {
        console.error('Erro ao carregar membros:', error);
      }
    );

  }
  carregarMembrosMinisterio(ministerioId: string): void {
    this.membroMinisterioService.getMembrosMinisterio(ministerioId).subscribe(
      (membros) => {
        this.membrosMinisterio = membros.map(membro => {
          const preferenciasAtividades = Array.isArray(membro.preferenciasAtividades)
            ? membro.preferenciasAtividades
            : JSON.parse(membro.preferenciasAtividades || '[]');
          return {
            ...membro,
            preferenciasAtividades
          };
        });
        console.log(this.membrosMinisterio)
      },
      (error) => {
        console.error('Erro ao carregar membros do ministério:', error);
      }
    );
  }
  verLiderMinisterio(ministerioId: string): void {
    this.lideres = []; // Limpa a lista de líderes para evitar conflitos de exibição
    
    this.ministerioService.getLiderMinisterio(ministerioId).subscribe(
      (response: MinisterioLiderResponse[]) => {
        if (response && response.length > 0) {
          console.log('Líderes do ministério:', response);
          this.lideres = response.map(item => item.lider).filter(lider => lider);
  
          const usuarioId = localStorage.getItem('usuarioId'); // Obtenha o ID do usuário logado
          console.log(`ID do usuário logado: ${usuarioId}`);
  
          // Verifica se o usuário atual é líder deste ministério
          this.isLiderMinisterio[ministerioId] = this.lideres.some(lider => lider.id === usuarioId);
          console.log(`Usuário é líder deste ministério? ${this.isLiderMinisterio[ministerioId]}`);
          
          // Abre o modal após verificar o status de liderança
          this.abrirModal('detalhesModal' + ministerioId);
        } else {
          console.error('Nenhum líder encontrado para o ministério:', ministerioId);
          this.isLiderMinisterio[ministerioId] = false;
          this.abrirModal('detalhesModal' + ministerioId);
        }
      },
      (error) => {
        console.error('Erro ao carregar líderes do ministério:', error);
        this.isLiderMinisterio[ministerioId] = false;
        this.abrirModal('detalhesModal' + ministerioId);
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
      this.possibleLidersFiltered = this.selectedLiders.filter(id => id !== liderId)
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

