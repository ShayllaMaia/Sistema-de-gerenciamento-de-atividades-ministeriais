import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MinisterioService } from 'src/app/services/ministerio.service';

@Component({
  selector: 'app-membro-ministerio-listar',
  templateUrl: './membro-ministerio-listar.component.html',
  styleUrls: ['./membro-ministerio-listar.component.css']
})
export class MembroMinisterioListarComponent {
  constructor(
    private membroMinisterioService: MinisterioService,
    private route: ActivatedRoute,
  ){

  }
  membrosMinisterio: any[] = [];
  idMinisterio: string = "";
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idMinisterio = params['idMinisterio'];
      this.carregarMembrosMinisterio(this.idMinisterio);
      console.log(this.idMinisterio) // Verifica o líder do ministério assim que obtém o ID
    });
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
}
