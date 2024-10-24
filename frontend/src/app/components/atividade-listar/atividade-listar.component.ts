import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { AtividadeInterface } from 'src/app/model/atividade.interface';
import { Lider, MinisterioLiderResponse } from 'src/app/model/ministerio.interface';
import { AtividadeService } from 'src/app/services/atividade.service';
import { MinisterioService } from 'src/app/services/ministerio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atividade-listar',
  templateUrl: './atividade-listar.component.html',
  styleUrls: ['./atividade-listar.component.css']
})
export class AtividadeListarComponent implements OnInit {
  atividades: AtividadeInterface[] = [];
  isAdmin: boolean = false;
  isLider: boolean = false;
  idMinisterio: string = "";
  userId: string = localStorage.getItem('usuarioId') || '';
  lideres: Lider[] = [];
  isLiderMinisterio: { [key: string]: boolean } = {}; // Objeto para armazenar a verificação de líderes

  constructor(
    private atividadeService: AtividadeService,
    private ministerioService: MinisterioService, // Adiciona o serviço de ministério
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idMinisterio = params['idMinisterio'];
      this.verLiderMinisterio(this.idMinisterio); // Verifica o líder do ministério assim que obtém o ID
    });

    // Verifique se o usuário é admin ou líder
    const papelUsuario = localStorage.getItem('papel');
    this.isAdmin = papelUsuario === 'ADMIN';
    this.isLider = papelUsuario === 'LIDER';

    console.log(`Papel do usuário: ${papelUsuario}`);
    console.log(`isAdmin: ${this.isAdmin}`);
    console.log(`isLider: ${this.isLider}`);

    this.carregarAtividades();
  }

  verLiderMinisterio(ministerioId: string): void {
    this.lideres = []; // Limpa a lista de líderes

    this.ministerioService.getLiderMinisterio(ministerioId).subscribe(
      (response: MinisterioLiderResponse[]) => {
        if (response && response.length > 0) {
          console.log('Líderes do ministério:', response);
          this.lideres = response.map(item => item.lider).filter(lider => lider);

          const usuarioId = localStorage.getItem('usuarioId'); // Obtém o ID do usuário logado
          console.log(`ID do usuário logado: ${usuarioId}`);

          // Verifica se o usuário atual é líder deste ministério
          this.isLiderMinisterio[ministerioId] = this.lideres.some(lider => lider.id === usuarioId);
          console.log(`Usuário é líder deste ministério? ${this.isLiderMinisterio[ministerioId]}`);
        } else {
          console.error('Nenhum líder encontrado para o ministério:', ministerioId);
          this.isLiderMinisterio[ministerioId] = false;
        }
      },
      (error) => {
        console.error('Erro ao carregar líderes do ministério:', error);
        this.isLiderMinisterio[ministerioId] = false;
      }
    );
  }

  carregarAtividades(): void {
    this.atividadeService.listarAtividades().subscribe(
      (atividades) => {
        console.log('atividades carregadas:', atividades);
        this.atividades = atividades.filter(atividade => atividade.ministerio_id === this.idMinisterio);
        console.log(`Atividades filtradas para o ministério ${this.idMinisterio}:`, this.atividades);
      },
      (error) => {
        console.error('Erro ao carregar atividade:', error);
      }
    );
  }

  podeEditarOuExcluir(atividade: AtividadeInterface): boolean {
    console.log(`Verificando acesso para atividade ${atividade.id} no ministério ${atividade.ministerio_id}`);

    // Usando a verificação de líder do ministério
    const podeAcessar = this.isAdmin || this.isLiderMinisterio[atividade.ministerio_id];

    // Logando informações para depuração
    console.log(`Papel do usuário: Admin - ${this.isAdmin}, Líder - ${this.isLider}`);
    console.log(`Acesso permitido para atividade ${atividade.id}: ${podeAcessar}`);

    return podeAcessar;
  }




    salvarEdicaoAtividade(atividade: AtividadeInterface): void {
        this.atividadeService.editarAtividade(atividade.id.toString(), atividade).subscribe(
            () => {
                console.log('Atividade editada com sucesso');
                this.fecharModal('editarModal' + atividade.id);
                this.carregarAtividades();
            },
            (error: any) => {
                console.error('Erro ao editar atividade:', error);
            }
        );
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
        }
    }

    confirmarExcluirAtividade(atividadeId: string): void {
        Swal.fire({
            title: 'Você tem certeza?',
            text: 'Deseja realmente excluir esta atividade?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.atividadeService.excluirAtividade(atividadeId).pipe(
                    catchError((error) => {
                        Swal.fire('Erro', 'Erro ao excluir atividade', 'error');
                        console.error('Erro ao excluir atividade:', error);
                        return error;
                    })
                ).subscribe({
                    complete: () => {
                        Swal.fire('Sucesso', 'Atividade excluída com sucesso!', 'success');
                        this.carregarAtividades();
                    }
                });
            }
        });
    }

    confirmarEdicaoAtividade(atividade: AtividadeInterface): void {
        Swal.fire({
            title: 'Você tem certeza?',
            text: 'Deseja salvar as alterações nesta atividade?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, salvar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.atividadeService.editarAtividade(atividade.id.toString(), atividade).pipe(
                    catchError((error) => {
                        Swal.fire('Erro', 'Erro ao editar atividade', 'error');
                        console.error('Erro ao editar atividade:', error);
                        return error;
                    })
                ).subscribe({
                    complete: () => {
                        Swal.fire('Sucesso', 'Edição salva com sucesso!', 'success');
                        this.fecharModal('editarModal' + atividade.id);
                        this.carregarAtividades();
                    }
                });
            }
        });
    }
}
