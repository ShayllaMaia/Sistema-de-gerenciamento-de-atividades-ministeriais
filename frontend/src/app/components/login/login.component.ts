import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  erroLogin: string = ''; 

  constructor(private loginService: LoginService, private router: Router) {}

  fazerLogin(): void {
    this.erroLogin = ''; 
    this.loginService.fazerLogin({ email: this.email, senha: this.senha }).subscribe(
      (response) => {
        localStorage.setItem('token', response.token); 
        this.router.navigate(['/sidebar']); 
      },
      (error) => {
        console.error('Erro ao fazer login:', error);
        if (error.status === 401) { 
          this.erroLogin = 'Usuário ou senha incorretos. Por favor, verifique suas credenciais.';
        } else {
          this.erroLogin = 'Erro ao fazer login. Por favor, tente novamente mais tarde.';
        }
      }
    );
  }
}
