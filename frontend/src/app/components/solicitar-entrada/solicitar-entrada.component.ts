import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtividadeService } from 'src/app/services/atividade.service';
import { SolicitarEntradaService } from 'src/app/services/solicitar-entrada.service';
import { AtividadeInterface } from 'src/app/model/atividade.interface';

@Component({
  selector: 'app-solicitar-entrada',
  templateUrl: './solicitar-entrada.component.html',
  styleUrls: ['./solicitar-entrada.component.css']
})
export class SolicitarEntradaComponent implements OnInit {
  atividades: AtividadeInterface[] = [];
  selectedAtividades: string[] = [];
  ministerioId: string = '';

  constructor(
    private atividadeService: AtividadeService,
    private solicitarEntradaService: SolicitarEntradaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.ministerioId = params['idMinisterio'];
      this.carregarAtividades();
    });
  }

  carregarAtividades(): void {
    this.atividadeService.listarAtividades().subscribe(
      atividades => {
        this.atividades = atividades.filter(atividade => atividade.ministerio_id === this.ministerioId);
      },
      error => console.error('Erro ao carregar atividades:', error)
    );
  }

  onCheckboxChange(event: any, atividadeId: string): void {
    if (event.target.checked) {
      this.selectedAtividades.push(atividadeId);
    } else {
      const index = this.selectedAtividades.indexOf(atividadeId);
      if (index > -1) {
        this.selectedAtividades.splice(index, 1);
      }
    }
  }

  enviarSolicitacao(): void {
    const solicitacao = {
      ministerioId: this.ministerioId,
      atividades: this.selectedAtividades
    };
    this.solicitarEntradaService.enviarSolicitacao(solicitacao).subscribe(
      () => {
        alert('Solicitação enviada com sucesso!');
        this.router.navigate(['/']);
      },
      error => console.error('Erro ao enviar solicitação:', error)
    );
  }
}
