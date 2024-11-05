import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { MinisterioInterface } from 'src/app/model/ministerio.interface';
import { MinisterioService } from 'src/app/services/ministerio.service';
import { IForm } from 'src/app/i-form';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
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
        Swal.fire('Erro', 'Erro ao cadastrar ministério', 'error');
        this.isSubmit = false;
        return error;
      })
    ).subscribe({
      complete: () => {
        Swal.fire('Sucesso', 'Ministério cadastrado com sucesso', 'success').then(() => {
          // Após o alerta de sucesso, atualiza a página
          window.location.reload();
        });
        this.router.navigate(['/cadastro-ministerio']);
      }
    });
  }
}