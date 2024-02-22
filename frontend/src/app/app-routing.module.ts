import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  {path:'login', component: LoginComponent},
  { path: 'sidebar', component: SidebarComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Redireciona para '/login' quando a rota for vazia
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
