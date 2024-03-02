import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { IForm } from 'src/app/i-form';
import { AtividadeInterface } from 'src/app/model/ativade.interface';
import { AtividadeService } from 'src/app/services/atividade.service';


@Component({
  selector: 'app-atividade-cadastro',
  templateUrl: './atividade-cadastro.component.html',
  styleUrls: ['./atividade-cadastro.component.css']
})
export class AtividadeCadastroComponent implements IForm<AtividadeInterface> {
    registro: AtividadeInterface = <AtividadeInterface>{}
    isSubmit: boolean = false;

    constructor(
        private atividadeService: AtividadeService,
        private router: Router,
    ) {}

    submit(form: NgForm): void {
        this.isSubmit = true;
        
        this.atividadeService.criarAtividade(this.registro).pipe(
            catchError((error) => {
              this.isSubmit = false;
              console.log('Erro:', error);
              return error;
            })
          ).subscribe({
            complete: () => {
              console.log('Cadastro completo');
              this.router.navigate(['/lista-atividade']);
            }
          });
    }
}
