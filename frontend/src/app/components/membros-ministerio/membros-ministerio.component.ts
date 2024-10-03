import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { UsuarioInterface } from 'src/app/model/usuario.interface';
import { MinisterioService } from 'src/app/services/ministerio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-membros-ministerio',
  templateUrl: './membros-ministerio.component.html',
  styleUrls: ['./membros-ministerio.component.css']
})
export class MembrosMinisterioComponent implements OnInit {
  membros: UsuarioInterface[] = [];
  ministerioId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Adicionar o Router para navegação
    private membroMinisterioService: MinisterioService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ministerioId = params['ministerioId'];
      this.carregarMembrosMinisterio(this.ministerioId);
    });
  }

  carregarMembrosMinisterio(ministerioId: string): void {
    this.membroMinisterioService.getMembrosMinisterio(ministerioId).subscribe(
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
    const data = { idMembro, idMinisterio: this.ministerioId }; // Cria o objeto com os dois IDs
    this.membroMinisterioService.deleteMembroMinisterio(data).pipe(
      catchError((error) => {
        Swal.fire('Erro', 'Erro ao remover membro', 'error');
        console.error('Erro:', error);
        return error;
      })
    ).subscribe({
      complete: () => {
        Swal.fire('Sucesso', 'Membro removido com sucesso', 'success');
        this.carregarMembrosMinisterio(this.ministerioId); // Recarrega a lista de membros
      }
    });
  }
  removeAtividade(idAtividade: string, idMembro: string): void {
    // Mensagem de confirmação antes de remover a atividade
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
        const data = { usuario_id: idMembro, atividade_id: idAtividade }; // Usa o ID correto do usuário e da atividade
        this.membroMinisterioService.removeAtividade(this.ministerioId, data).pipe(
          catchError((error) => {
            Swal.fire('Erro', 'Erro ao remover atividade', 'error'); // Ajusta a mensagem de erro para "atividade"
            console.error('Erro:', error);
            return error;
          })
        ).subscribe({
          complete: () => {
            Swal.fire('Sucesso', 'Atividade removida com sucesso', 'success'); // Ajusta a mensagem de sucesso para "atividade"
            this.carregarMembrosMinisterio(this.ministerioId); // Recarrega a lista de membros
          }
        });
      }
    });
  }



  verSolicitacoes(): void {
    // Redireciona para a página de solicitações
    this.router.navigate(['/solicitacoes', this.ministerioId]);
  }
}
