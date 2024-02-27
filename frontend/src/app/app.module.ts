import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EventoCadastroComponent } from './components/evento-cadastro/evento-cadastro.component';
import { EventoListarComponent } from './components/evento-listar/evento-listar.component';
import { MembroListarComponent } from './components/membro-listar/membro-listar.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    FooterComponent,
    LoginComponent,
    SidebarComponent,
    EventoCadastroComponent,
    EventoListarComponent
    SidebarComponent,
    MembroListarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
