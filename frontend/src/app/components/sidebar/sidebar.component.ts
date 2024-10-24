import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  papel = '';
  constructor(private loginService: LoginService, private router: Router) { }
  ngOnInit() {
    this.papel = localStorage.getItem('papel') || '';
    console.log(this.papel)
  }
  isNormal() {
    return this.papel === "NORMAL"

  }

  isAdmin(){
    return this.papel === "ADMIN"
  }
  logout() {
    // Exibe a mensagem de confirmação
    Swal.fire({
      title: 'Tem certeza que deseja sair?',
      text: 'Você será desconectado da sua conta.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, sair',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Realiza o logout
        this.loginService.logout();

        // Exibe mensagem de sucesso e redireciona após o fechamento do alerta
        Swal.fire('Desconectado!', 'Você foi desconectado com sucesso.', 'success').then(() => {
          this.router.navigate(['/login']).then(() => {
            window.location.reload(); // Força a recarga da página após redirecionar para a tela de login
          });
        });
      }
    });
  }

}
