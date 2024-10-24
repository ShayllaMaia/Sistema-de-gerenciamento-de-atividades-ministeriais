import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioInterface } from 'src/app/model/usuario.interface';
import { MinisterioService } from 'src/app/services/ministerio.service';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Solicita } from 'src/app/model/ministerio.interface';

@Component({
  selector: 'app-lista-solicitacoes',
  templateUrl: './lista-solicitacoes.component.html',
  styleUrls: ['./lista-solicitacoes.component.css']
})
export class ListaSolicitacoesComponent implements OnInit {
  membros: UsuarioInterface[] = [];
  ministerioId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private membroMinisterioService: MinisterioService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ministerioId = params['ministerioId'];
      this.carregarMembrosMinisterio(this.ministerioId);
    });
  }

  carregarMembrosMinisterio(ministerioId: string): void {
    this.membroMinisterioService.getMembrosMinisterioSolicita(ministerioId).subscribe(
      (membros) => {
        this.membros = membros.map(membro => {
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

  confirmarRemocao(idMembro: string): void {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Esta ação removerá o membro do ministério.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, remover!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.removerMembro(idMembro);
      }
    });
  }

  removerMembro(idMembro: string): void {
    const data = { idMembro, idMinisterio: this.ministerioId };
    this.membroMinisterioService.deleteMembroMinisterio(data).pipe(
      catchError((error) => {
        Swal.fire('Erro', 'Erro ao remover membro', 'error');
        console.error('Erro:', error);
        return error;
      })
    ).subscribe({
      complete: () => {
        Swal.fire('Sucesso', 'Membro removido com sucesso', 'success');
        this.carregarMembrosMinisterio(this.ministerioId);
      }
    });
  }

  aceitarSolicitacao(usuarioId: string): void {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Deseja realmente aceitar esta solicitação?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, aceitar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const data: Solicita = {
          usuario_id: usuarioId,
          statusSolicitacao: "APROVADO" // ou o status que você desejar
        };

        this.membroMinisterioService.aceitaSolicitacao(this.ministerioId, data).pipe(
          catchError((error) => {
            Swal.fire('Erro', 'Erro ao aceitar solicitação', 'error');
            console.error('Erro:', error);
            return error;
          })
        ).subscribe({
          next: () => {
            Swal.fire('Sucesso', 'Solicitação aceita com sucesso', 'success');
            this.carregarMembrosMinisterio(this.ministerioId); // Recarrega a lista de membros
          }
        });
      }
    });
  }

  verSolicitacoes(): void {
    this.router.navigate(['/solicitacoes', this.ministerioId]);
  }
}
