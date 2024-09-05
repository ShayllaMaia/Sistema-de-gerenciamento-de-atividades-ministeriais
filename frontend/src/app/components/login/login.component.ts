import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import {decodeJwt} from 'jose';
interface JwtPayload {
  usuario_id: string;
  usuario_papel: string; // Ajuste conforme o payload do seu token
  iat: number
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  email: string = '';
  senha: string = '';
  erroLogin: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
  }

  fazerLogin(): void {
    this.erroLogin = '';
    this.loginService
      .fazerLogin({ email: this.email, senha: this.senha })
      .subscribe(
        (response) => {
          localStorage.setItem('token', response);
          const decodedToken: JwtPayload = decodeJwt(response);
          localStorage.setItem('papel', decodedToken["usuario_papel"])
          this.router.navigate(['/index']);
        },
        (error) => {
          console.error('Erro ao fazer login:', error);
          if (error.status === 401) {
            // this.erroLogin = 'Usuário ou senha incorretos. Por favor, verifique suas credenciais.';
            Swal.fire(
              'Erro',
              'Usuário ou senha incorretos. Por favor, verifique suas credenciais.',
              'error'
            );
          } else {
            this.erroLogin =
              'Erro ao fazer login. Por favor, tente novamente mais tarde.';
            Swal.fire(
              'Erro',
              'Erro ao fazer login. Por favor, tente novamente mais tarde.',
              'error'
            );
          }
        }
      );
  }
}

