import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { UsuarioInterface } from 'src/app/model/usuario.interface';
import { MinisterioService } from 'src/app/services/ministerio.service';
import Swal from 'sweetalert2';
import { decodeJwt } from 'jose';
import { MinisterioLiderResponse } from 'src/app/model/ministerio.interface';

@Component({
  selector: 'app-membros-ministerio',
  templateUrl: './membros-ministerio.component.html',
  styleUrls: ['./membros-ministerio.component.css']
})
export class MembrosMinisterioComponent implements OnInit {
  membros: UsuarioInterface[] = [];
  ministerioId: string = '';
  usuarioId: string | null = null; // ID do usuário atual
  liderId: string | null = null; // ID do líder do ministério
  isLider: boolean = false; // Verifica se é líder
  isAdmin: boolean = false; // Verifica se é admin

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private membroMinisterioService: MinisterioService
  ) { }

  ngOnInit(): void {
    this.usuarioId = localStorage.getItem('usuarioId'); // Obtém o ID do usuário do localStorage
    const papel = localStorage.getItem('papel'); // Obtém o papel do usuário
    this.isAdmin = papel === 'ADMIN'; // Verifica se é admin

    this.route.params.subscribe(params => {
      this.ministerioId = params['ministerioId'];
      this.carregarMembrosMinisterio(this.ministerioId);
    });
  }

  carregarMembrosMinisterio(ministerioId: string): void {
    this.membroMinisterioService.getMembrosMinisterio(ministerioId).subscribe(
      (membros: UsuarioInterface[]) => { // Continue esperando UsuarioInterface[]
        this.membros = membros.map(membro => {
          const preferenciasAtividades = Array.isArray(membro.preferenciasAtividades)
            ? membro.preferenciasAtividades
            : JSON.parse(membro.preferenciasAtividades || '[]');
          return {
            ...membro,
            preferenciasAtividades
          };
        });

        // Supondo que o ID do líder deve ser obtido de outro lugar
        this.obterLiderDoMinisterio(ministerioId); // Chama função para obter o líder
      },
      (error) => {
        console.error('Erro ao carregar membros do ministério:', error);
      }
    );
  }

  obterLiderDoMinisterio(ministerioId: string): void {
    this.membroMinisterioService.getLiderMinisterio(ministerioId).subscribe(
      (data: any) => { // Aqui você pode definir o tipo de dados que espera
        if (data.length > 0) {
          this.liderId = data[0].lider_id; // Assumindo que o líder está na primeira posição
          this.isLider = this.usuarioId === this.liderId; // Verifica se o usuário atual é o líder
        }
      },
      (error) => {
        console.error('Erro ao obter líder do ministério:', error);
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
            Swal.fire('Erro', 'Erro ao remover atividade', 'error');
            console.error('Erro:', error);
            return error;
          })
        ).subscribe({
          complete: () => {
            Swal.fire('Sucesso', 'Atividade removida com sucesso', 'success');
            this.carregarMembrosMinisterio(this.ministerioId);
          }
        });
      }
    });
  }

  verSolicitacoes(): void {
    this.router.navigate(['/solicitacoes', this.ministerioId]);
  }
}
