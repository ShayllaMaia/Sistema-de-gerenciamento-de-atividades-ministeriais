import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { IForm } from 'src/app/i-form';
import { UsuarioInterface } from 'src/app/model/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';


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
        this.isSubmit = false
        console.log('erro');
        return error;
      })
    )
    .subscribe({
      complete:()=>{
        console.log('completo');
        this.router.navigate(['/login']);
      }
    })
  }
}
