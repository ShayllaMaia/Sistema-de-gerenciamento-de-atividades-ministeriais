import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

export const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent},
    { path: 'sidebar', component: SidebarComponent},
];
