import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { IForm } from 'src/app/i-form';
import { AtividadeInterface } from 'src/app/model/ativade.interface';
import { AtividadeService } from 'src/app/services/atividade.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-atividade-cadastro',
  templateUrl: './atividade-cadastro.component.html',
  styleUrls: ['./atividade-cadastro.component.css']
})
export class AtividadeCadastroComponent implements IForm<AtividadeInterface> {
    registro: AtividadeInterface = <AtividadeInterface>{}
    isSubmit: boolean = false;
    idMinisterio: string = "";

    constructor(
        private atividadeService: AtividadeService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    submit(form: NgForm): void {
        this.isSubmit = true;

        this.route.queryParams.subscribe(params => {
            this.idMinisterio = params['idMinisterio'];
        });


        this.atividadeService.criarAtividade({...this.registro, ministerio_id: this.idMinisterio }).pipe(
            catchError((error) => {
              Swal.fire('Erro', 'Erro ao cadastrar atividade', 'error');
              this.isSubmit = false;
              console.log('Erro:', error);
              return error;
            })
          ).subscribe({
            complete: () => {
              Swal.fire('Sucesso', 'Atividade cadastrada com sucesso', 'success');
              this.router.navigate(['/lista-atividade'], { queryParamsHandling: "preserve" });
            }
          });
    }
}
