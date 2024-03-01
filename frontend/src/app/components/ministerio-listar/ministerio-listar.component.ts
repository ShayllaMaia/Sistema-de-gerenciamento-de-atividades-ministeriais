import { Component, OnInit } from '@angular/core';
import { MinisterioService } from 'src/app/services/ministerio.service';
import { MinisterioInterface } from 'src/app/model/ministerio.interface';
import { Router } from '@angular/router';
import { UsuarioInterface } from 'src/app/model/usuario.interface';


@Component({
  selector: 'app-ministerio-listar',
  templateUrl: './ministerio-listar.component.html',
  styleUrls: ['./ministerio-listar.component.css']
})
export class MinisterioListarComponent implements OnInit {
  ministerios: MinisterioInterface[] = [];
  usuarios: UsuarioInterface[] = [];

  constructor(
    private ministerioService: MinisterioService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.carregarMinisterios();
    // this.carregarUsuarios();
  }

  carregarMinisterios(): void {
    this.ministerioService.getMinisterios().subscribe(
      (ministerios) => {
        console.log('Ministerios carregados:', ministerios);
        this.ministerios = ministerios;
      },
      (error) => {
        console.error('Erro ao carregar ministerios:', error);
      }
    );
  }

  // carregarUsuarios(): void {
  //   this.ministerioService.getUsuarios().subscribe(
  //     (usuarios) => {
  //       console.log('Usuários carregados:', usuarios);
  //       this.usuarios = usuarios;
  //     },
  //     (error) => {
  //       console.error('Erro ao carregar usuários:', error);
  //     }
  //   );
  //   }
  editarMinisterio(ministerio: MinisterioInterface): void {
    console.log('Editar ministerio:', ministerio);
    const ministerioIdString = ministerio.id.toString(); // Converter para string
    this.ministerioService.editarMinisterio(ministerioIdString, ministerio).subscribe(
      (response) => {
        console.log('Ministério editado com sucesso:', response);
      },
      (error) => {
        console.error('Erro ao editar ministério:', error);
      }
    );
  }
  

  salvarEdicaoMinisterio(ministerio: MinisterioInterface): void {
    this.ministerioService.editarMinisterio(ministerio.id.toString(), ministerio).subscribe(
      () => {
        console.log('Ministério editado com sucesso');
        this.fecharModal('editarModal' + ministerio.id);
        this.carregarMinisterios(); // Recarrega a lista de ministérios após edição
      },
      (error: any) => {
        console.error('Erro ao editar ministério:', error);
      }
    );
  }

  excluirMinisterio(ministerioId: string): void {
    this.ministerioService.excluirMinisterio(ministerioId).subscribe(
      () => {
        console.log('Ministério excluído com sucesso');
        this.carregarMinisterios();
      },
      (error: any) => {
        console.error('Erro ao excluir ministério:', error);
      }
    );
  }
  confirmarExcluirMinisterio(ministerioId: string): void {
    if (confirm('Tem certeza que deseja excluir este ministério?')) {
      this.excluirMinisterio(ministerioId);
    }
  }

  // Método para abrir o modal de edição
  abrirModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  // Método para fechar o modal
  fecharModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }
}
