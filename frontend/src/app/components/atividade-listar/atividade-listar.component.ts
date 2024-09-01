import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AtividadeInterface } from 'src/app/model/atividade.interface';
import { AtividadeService } from 'src/app/services/atividade.service';

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

    confirmarExcluirAtividade(atividadeId: string) {
        if (confirm('Tem certeza que deseja excluir esta atividade?')) {
            this.excluirAtividade(atividadeId);
          }
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
}
