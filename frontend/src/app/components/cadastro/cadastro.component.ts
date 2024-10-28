import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
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
  dataMaximaNascimento: string = '';
  maxDate: string;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    http: HttpClient
  ) {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 5); 
    this.maxDate = today.toISOString().split('T')[0]; // Converte para string no formato AAAA-MM-DD
  }

  ngOnInit(): void {
    this.dataMaximaNascimento = this.maxDate; // Usando a mesma data máxima calculada
  }

  submit(form: NgForm): void {
    if (form.invalid) {
      Swal.fire('Erro', 'Por favor, corrija os erros no formulário', 'error');
      return;
    }

    // Verifica se a data de nascimento está dentro do limite permitido
    const dataNascimento = new Date(this.registro.dataNascimento);
    const dataLimite = new Date();
    dataLimite.setFullYear(dataLimite.getFullYear() - 4); 

    if (dataNascimento > dataLimite) {
      Swal.fire('Erro', 'A data de nascimento deve ser há pelo menos 5 anos', 'error');
      return;
    }

    this.isSubmit = true;

    this.usuarioService.criarUsuario(this.registro).pipe(
      catchError((error) => {
        this.isSubmit = false;

        // Verifica se o erro possui status e mensagem esperados
        if (error.status === 400) {
          // Exibe a mensagem de erro retornada pelo backend
          Swal.fire('Erro', error.error.message || 'Usuário já cadastrado no sistema!', 'error');
        } else {
          Swal.fire('Erro', 'Erro ao cadastrar usuário', 'error');
        }

        return throwError(error); // Lançando o erro para continuar o fluxo
      })
    ).subscribe({
      complete: () => {
        Swal.fire('Sucesso', 'Usuário cadastrado com sucesso', 'success');
        this.router.navigate(['/login']);
      }
    });
  }

  formatarTelefone(event: any): void {
    const input = event.target;
    const value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Limita a entrada a um máximo de 11 dígitos
    const limitedValue = value.substring(0, 11);

    // Aplica a formatação com base no número de dígitos
    const formattedValue = limitedValue.length <= 10
      ? limitedValue.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
      : limitedValue.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');

    input.value = formattedValue;
    this.registro.telefone = formattedValue;
  }
}
