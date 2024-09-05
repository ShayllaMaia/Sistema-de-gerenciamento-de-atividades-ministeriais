import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { AtividadeInterface } from 'src/app/model/atividade.interface';
import { AtividadeService } from 'src/app/services/atividade.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atividade-listar',
  templateUrl: './atividade-listar.component.html',
  styleUrls: ['./atividade-listar.component.css']
})
export class AtividadeListarComponent implements OnInit {
    atividades: AtividadeInterface[] = []
    isSubmit: boolean = false;
    idMinisterio: string = "";
        
    constructor(private atividadeService: AtividadeService, private route: ActivatedRoute,) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.idMinisterio = params['idMinisterio'];
        });

        this.carregarAtividades();
    }

    carregarAtividades(): void {
        this.atividadeService.listarAtividades().subscribe(
            (atividades) => {
              console.log('atividades carregadas:', atividades);

              this.atividades = atividades.filter(atividade => atividade.ministerio_id === this.idMinisterio);
            },
            (error) => {
              console.error('Erro ao carregar atividade:', error);
            }
        );
    }

    salvarEdicaoAtividade(atividade: AtividadeInterface): void {
        this.atividadeService.editarAtividade(atividade.id.toString(), atividade).subscribe(
          () => {
            console.log('Ativiade editada com sucesso');
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


    excluirAtividade(atividadeId: string) {
        this.atividadeService.excluirAtividade(atividadeId).subscribe(
            () => {
              console.log('Atividade excluído com sucesso');
              this.carregarAtividades();
            },
            (error: any) => {
              console.error('Erro ao excluir atividade:', error);
            }
          );
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
