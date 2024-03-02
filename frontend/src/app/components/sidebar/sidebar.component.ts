import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private loginService: LoginService, private router: Router) { }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']); 
  }

}
