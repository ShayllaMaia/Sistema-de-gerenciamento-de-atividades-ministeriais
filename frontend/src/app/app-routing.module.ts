import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthGuardService } from './services/auth-guard.service';
import { EventoCadastroComponent } from './components/evento-cadastro/evento-cadastro.component';
import { EventoListarComponent } from './components/evento-listar/evento-listar.component';
import { MinisterioCadastroComponent } from './components/ministerio-cadastro/ministerio-cadastro.component';
import { MinisterioListarComponent } from './components/ministerio-listar/ministerio-listar.component';
import { MembroListarComponent } from './components/membro-listar/membro-listar.component';

const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  {path:'login', component: LoginComponent},
  { path: 'sidebar', component: SidebarComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },// Redireciona para '/login' quando a rota for vazia
  { path: 'cadastro-evento', component: EventoCadastroComponent },
  { path: 'lista-evento', component: EventoListarComponent },
  { path: 'cadastro-ministerio', component: MinisterioCadastroComponent },
  { path: 'lista-ministerio', component: MinisterioListarComponent },
  { path: 'lista-membro', component: MembroListarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
