import { Component, OnInit } from '@angular/core';
import { AtividadeInterface } from 'src/app/model/ativade.interface';
import { AtividadeService } from 'src/app/services/atividade.service';

@Component({
  selector: 'app-atividade-listar',
  templateUrl: './atividade-listar.component.html',
  styleUrls: ['./atividade-listar.component.css']
})
export class AtividadeListarComponent implements OnInit {
    atividades: AtividadeInterface[] = []
    isSubmit: boolean = false;
    
    constructor(private atividadeService: AtividadeService) {}

    ngOnInit(): void {
        this.carregarAtividades();
    }

    carregarAtividades(): void {
        this.atividadeService.listarAtividades().subscribe(
            (atividade) => {
              console.log('atividades carregadas:', atividade);
              this.atividades = atividade;
            },
            (error) => {
              console.error('Erro ao carregar atividade:', error);
            }
          );
    }
}
