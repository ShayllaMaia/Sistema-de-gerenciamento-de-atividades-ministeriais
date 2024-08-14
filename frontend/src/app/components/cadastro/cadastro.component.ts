import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { IForm } from 'src/app/i-form';
import { UsuarioInterface } from 'src/app/model/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements IForm<UsuarioInterface> {

  registro: UsuarioInterface = <UsuarioInterface>{};
  isSubmit: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    http: HttpClient

    ) {}


  submit(form: NgForm): void {
    this.isSubmit = true;
    this.usuarioService.criarUsuario(this.registro).pipe(
      catchError((error)=>{
        Swal.fire('Erro', 'Erro ao cadastrar usuário', 'error');
        this.isSubmit = false
        return error;
      })
    )
    .subscribe({
      complete:()=>{
        Swal.fire('Sucesso', 'Usuário cadastrado com sucesso', 'success');
        this.router.navigate(['/login']);
      }
    })
  }

  formatarTelefone(event: any): void {
  const input = event.target;
  const value = input.value.replace(/\D/g, '');
  const formattedValue = value.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
  input.value = formattedValue;
  this.registro.telefone = formattedValue;
}

}
