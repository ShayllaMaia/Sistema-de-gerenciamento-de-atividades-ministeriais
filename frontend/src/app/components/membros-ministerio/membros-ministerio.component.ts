import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioInterface } from 'src/app/model/usuario.interface';
import { MinisterioService } from 'src/app/services/ministerio.service';

@Component({
  selector: 'app-membros-ministerio',
  templateUrl: './membros-ministerio.component.html',
  styleUrls: ['./membros-ministerio.component.css']
})
export class MembrosMinisterioComponent implements OnInit {
  membros: UsuarioInterface[] = [];
  ministerioId: string = '';

  constructor(
    private route: ActivatedRoute,
    private membroMinisterioService: MinisterioService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ministerioId = params['ministerioId'];
      this.carregarMembrosMinisterio(this.ministerioId);

    });
  }

  carregarMembrosMinisterio(ministerioId: string): void {
    this.membroMinisterioService.getMembrosMinisterio(ministerioId).subscribe(
      (membros) => {
        this.membros = membros;
        console.log('Membros do ministério:', membros);
      },
      (error) => {
        console.error('Erro ao carregar membros do ministério:', error);
      }
    );
  }
}
