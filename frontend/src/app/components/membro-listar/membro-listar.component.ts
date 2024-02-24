import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioInterface } from 'src/app/model/usuario.interface';

@Component({
  selector: 'app-membro-listar',
  templateUrl: './membro-listar.component.html',
  styleUrls: ['./membro-listar.component.css']
})
export class MembroListarComponent implements OnInit {
  membros: UsuarioInterface[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.carregarMembros();
  }

  carregarMembros(): void {
    this.usuarioService.getListaMembros().subscribe(
      (data: UsuarioInterface[]) => {
        this.membros = data;
      },
      error => {
        console.error('Erro ao obter a lista de membros:', error);
      }
    );
  }
}
