import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { MinisterioInterface } from 'src/app/model/ministerio.interface';
import { MinisterioService } from 'src/app/services/ministerio.service';
import { IForm } from 'src/app/i-form';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-ministerio-cadastro',
  templateUrl: './ministerio-cadastro.component.html',
  styleUrls: ['./ministerio-cadastro.component.css']
})
export class MinisterioCadastroComponent implements IForm<MinisterioInterface>{
  registro: MinisterioInterface = <MinisterioInterface>{};
  isSubmit: boolean = false;

  constructor(
    private ministerioService: MinisterioService,
    private router: Router,
    http: HttpClient
  ) { }

  submit(form: NgForm): void {
    this.isSubmit = true;

    this.ministerioService.criarMinisterio(this.registro).pipe(
      catchError((error) => {
        this.isSubmit = false;
        console.log('Erro:', error);
        return error;
      })
    ).subscribe({
      complete: () => {
        console.log('Cadastro completo');
        this.router.navigate(['/lista-ministerio']);
      }
    });
  }
}
