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
import { MembrosMinisterioComponent } from './components/membros-ministerio/membros-ministerio.component';
import { AtividadeCadastroComponent } from './components/atividade-cadastro/atividade-cadastro.component';
import { AtividadeListarComponent } from './components/atividade-listar/atividade-listar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuard } from './services/auth-admin-guard.service';
import { SolicitarEntradaComponent } from './components/solicitar-entrada/solicitar-entrada.component';
import { PreferenciaCadastrarComponent } from './components/preferencia-cadastrar/preferencia-cadastrar.component';
import { ListaSolicitacoesComponent } from './components/lista-solicitacoes/lista-solicitacoes.component';
import { PreferenciaListarComponent } from './components/preferencia-listar/preferencia-listar.component';
import { MinisteriosComponent } from './components/ministerios/ministerios.component';
import { TodosMinisteriosComponent } from './components/todos-ministerios/todos-ministerios.component';
import { EscalaComponent } from './escala/escala.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MembroAtividadeComponent } from './membro-atividade/membro-atividade.component';

const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  {path:'login', component: LoginComponent},
  { path: 'sidebar', component: SidebarComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },// Redireciona para '/login' quando a rota for vazia
  { path: 'cadastro-evento', component: EventoCadastroComponent, canActivate: [AuthGuardService] },
  { path: 'lista-evento', component: EventoListarComponent, canActivate: [AdminGuard] },
  { path: 'cadastro-ministerio', component: MinisterioCadastroComponent, canActivate: [AdminGuard] },
  { path: 'meus-ministerios', component: MinisterioListarComponent, canActivate: [] },
  { path: 'lista-membro', component: MembroListarComponent, canActivate: [AuthGuardService] },
  { path: 'membros-ministerio/:ministerioId', component: MembrosMinisterioComponent, canActivate: [AuthGuardService] },
  { path: 'lista-atividade', component: AtividadeListarComponent, canActivate: [AuthGuardService] },
  { path: 'cadastro-atividade', component: AtividadeCadastroComponent, canActivate: [AuthGuardService] },
  { path: 'c', component: DashboardComponent, canActivate: [AuthGuardService], data: {papel: 'ADMIN'}},
  { path: 'solicitar-entrada', component: SolicitarEntradaComponent,canActivate: [AuthGuardService] },
  { path: 'preferencia-cadastrar', component: PreferenciaCadastrarComponent, canActivate: [AuthGuardService] },
  { path: 'solicitacoes/:ministerioId', component: ListaSolicitacoesComponent,canActivate: [AuthGuardService]},
  { path: 'preferencia-listar', component: PreferenciaListarComponent,canActivate: [AuthGuardService]},
  {path: 'index', component: DashboardComponent,canActivate:[AuthGuardService]},
  {path: 'ministerios', component: MinisteriosComponent,canActivate:[AuthGuardService]},
  {path: 'todos-ministerios', component: TodosMinisteriosComponent,canActivate:[AuthGuardService]},
  {path: 'escala', component:EscalaComponent,canActivate:[AuthGuardService]},
  {path: 'perfil', component: PerfilComponent, canActivate: [AuthGuardService]},
  {path: 'atividade-membro/:id', component: MembroAtividadeComponent, canActivate: [AuthGuardService]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
