import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AtividadeService } from 'src/app/services/atividade.service';
import { MinisterioService } from 'src/app/services/ministerio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-membro-atividade',
  templateUrl: './membro-atividade.component.html',
  styleUrls: ['./membro-atividade.component.css']
})
export class MembroAtividadeComponent implements OnInit {
  atividade: any;
  membros: any[] = [];
  membrosDisponiveis: any[] = [];
  membroSelecionado: string = '';  // Para armazenar o ID do membro selecionado
  ministerioId: string = '';
  modalAberto: boolean = false;  // Controla a visibilidade do modal

  constructor(
    private atividadeService: AtividadeService,
    private ministerioService: MinisterioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const atividadeId = this.route.snapshot.paramMap.get('id');
    if (atividadeId) {
      this.carregarMembrosAtividade(atividadeId);
    }
  }

  carregarMembrosAtividade(atividadeId: string): void {
    this.atividadeService.membroAtividade(atividadeId).subscribe(
      (data) => {
        this.atividade = data.atividade;
        this.membros = data.membros;
        this.ministerioId = this.atividade.ministerio_id;  // Captura o ministério da atividade
      },
      (error) => {
        console.error('Erro ao carregar membros da atividade:', error);
      }
    );
  }

  abrirModal(): void {
    // Carregar membros disponíveis do ministério
    this.carregarMembrosMinisterio(this.ministerioId);
  }

  fecharModal(): void {
    this.modalAberto = false;  // Fecha o modal
  }

  carregarMembrosMinisterio(ministerioId: string): void {
    this.ministerioService.getMembrosMinisterio(ministerioId).subscribe(
      (membros) => {
        this.membrosDisponiveis = membros.map(membro => {
          const preferenciasAtividades = Array.isArray(membro.preferenciasAtividades)
            ? membro.preferenciasAtividades
            : JSON.parse(membro.preferenciasAtividades || '[]');
          return {
            ...membro,
            preferenciasAtividades
          };
        });
        this.modalAberto = true;  // Abre o modal após carregar os membros
      },
      (error) => {
        console.error('Erro ao carregar membros do ministério:', error);
      }
    );
  }

  adicionarMembro(): void {
    if (!this.membroSelecionado) {
      Swal.fire('Erro', 'Selecione um membro para adicionar.', 'error');
      return;
    }

    const data = {
      usuario_id: this.membroSelecionado,
      atividade_id: this.atividade.id
    };

    // Fazer a requisição para adicionar o membro à atividade
    this.ministerioService.adicionaAtividadeAoMembro(this.ministerioId, data).subscribe(
      () => {
        Swal.fire('Sucesso', 'Membro adicionado com sucesso!', 'success');
        this.carregarMembrosAtividade(this.atividade.id);  // Recarregar os membros após adicionar
        this.fecharModal();  // Fechar o modal
      },
      (error) => {
        Swal.fire('Erro', 'Erro ao adicionar membro.', 'error');
        console.error('Erro ao adicionar membro:', error);
      }
    );
  }

  removerAtividade(idAtividade: string, idMembro: string): void {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Esta ação removerá a atividade do membro.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, remover!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const data = { usuario_id: idMembro, atividade_id: idAtividade };  // Dados para remover a atividade do membro
        this.ministerioService.removeAtividade(this.ministerioId, data).subscribe(
          () => {
            Swal.fire('Sucesso', 'Atividade removida com sucesso!', 'success');
            this.carregarMembrosAtividade(this.atividade.id);  // Atualiza a lista de membros e atividades
          },
          (error) => {
            Swal.fire('Erro', 'Erro ao remover atividade.', 'error');
            console.error('Erro ao remover atividade:', error);
          }
        );
      }
    });
  }
}
