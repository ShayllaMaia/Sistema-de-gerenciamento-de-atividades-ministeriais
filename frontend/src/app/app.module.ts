import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EventoCadastroComponent } from './components/evento-cadastro/evento-cadastro.component';
import { EventoListarComponent } from './components/evento-listar/evento-listar.component';
import { MinisterioCadastroComponent } from './components/ministerio-cadastro/ministerio-cadastro.component';
import { MembroListarComponent } from './components/membro-listar/membro-listar.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MembrosMinisterioComponent } from './components/membros-ministerio/membros-ministerio.component';
import { AtividadeCadastroComponent } from './components/atividade-cadastro/atividade-cadastro.component';
import { AtividadeListarComponent } from './components/atividade-listar/atividade-listar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import Swal from 'sweetalert2';
import { MinisterioListarComponent } from './components/ministerio-listar/ministerio-listar.component';
import { SolicitarEntradaComponent } from './components/solicitar-entrada/solicitar-entrada.component';
import { PreferenciaCadastrarComponent } from './components/preferencia-cadastrar/preferencia-cadastrar.component';
import { ListaSolicitacoesComponent } from './components/lista-solicitacoes/lista-solicitacoes.component';
import { PreferenciaListarComponent } from './components/preferencia-listar/preferencia-listar.component';
import { MinisteriosComponent } from './components/ministerios/ministerios.component';
import { TodosMinisteriosComponent } from './components/todos-ministerios/todos-ministerios.component';
import { EscalaComponent } from './escala/escala.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MembroAtividadeComponent } from './membro-atividade/membro-atividade.component';


@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    FooterComponent,
    LoginComponent,
    SidebarComponent,
    MinisterioListarComponent,
    EventoCadastroComponent,
    EventoListarComponent,
    MinisterioCadastroComponent,
    MembroListarComponent,
    MembrosMinisterioComponent,
    AtividadeCadastroComponent,
    AtividadeListarComponent,
    DashboardComponent,
    SolicitarEntradaComponent,
    PreferenciaCadastrarComponent,
    ListaSolicitacoesComponent,
    PreferenciaListarComponent,
    MinisteriosComponent,
    TodosMinisteriosComponent,
    EscalaComponent,
    PerfilComponent,
    MembroAtividadeComponent
    
  
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // Adicione o módulo de animações do Angular
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
    }),
    ToastrModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
