import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioInterface } from '../model/usuario.interface';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

interface JwtPayLoad {
  usuario_id: string;
  usuario_papel: string;
  iat: number;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  perfilForm: FormGroup;
  userId: string = '';
  usuario: UsuarioInterface = <UsuarioInterface>{};

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.perfilForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      senha: [''], // Campo para a nova senha (opcional)
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token') || '';
    const decodedToken = jwtDecode<JwtPayLoad>(token);
    this.userId = decodedToken.usuario_id;
    this.getUsuarioById();
  }

  getUsuarioById(): void {
    if (this.userId) {
      this.usuarioService.getUsuarioById(this.userId).subscribe(
        (usuario: UsuarioInterface) => {
          this.usuario = usuario;
          this.initForm();
        },
        (error) => {
          console.error('Erro ao carregar usuário:', error);
        }
      );
    }
  }

  initForm(): void {
    const formattedDate = this.usuario.dataNascimento
      ? new Date(this.usuario.dataNascimento).toISOString().split('T')[0]
      : '';
    this.perfilForm.patchValue({
      id: this.usuario.id,
      nome: this.usuario.nome,
      email: this.usuario.email,
      telefone: this.usuario.telefone,
      endereco: this.usuario.endereco,
      dataNascimento: formattedDate,
    });
  }

  onSave(): void {
    if (this.perfilForm.valid) {
      // Exibe a caixa de diálogo de confirmação
      Swal.fire({
        title: 'Você tem certeza?',
        text: 'Deseja salvar as alterações no perfil?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, salvar!',
      }).then((result) => {
        if (result.isConfirmed) {
          // Obtenha os dados do formulário (incluindo campos desabilitados)
          const formValue = this.perfilForm.getRawValue();

          // Crie o objeto que será enviado
          const updatedUsuario: UsuarioInterface = {
            ...this.usuario, // Mantém os valores anteriores
            ...formValue, // Substitui pelos novos valores do formulário
            dataNascimento: new Date(
              this.perfilForm.get('dataNascimento')?.value
            ).toISOString(), // Formata data
          };

          // Se a senha estiver preenchida, incluí-la no objeto
          if (formValue.senha) {
            updatedUsuario.senha = formValue.senha;
          }

          // Envie os dados para o serviço
          this.usuarioService.updateUsuario(updatedUsuario).subscribe(
            (response) => {
              Swal.fire(
                'Atualizado!',
                'Seu perfil foi atualizado com sucesso.',
                'success'
              );
            },
            (error) => {
              Swal.fire(
                'Erro!',
                'Houve um erro ao atualizar o perfil.',
                'error'
              );
              console.error('Erro ao atualizar perfil:', error);
            }
          );
        }
      });
    }
  }

  confirmarDelecaoUsuario(): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUsuario(this.userId).subscribe({
          next: () => {
            Swal.fire(
              'Sucesso,',
              'Usuário excluído com sucesso',
              'success'
            ).then(() => {
              location.reload();
            });
          },
          error: (err) => {
            Swal.fire('Erro', 'Ocorreu um erro ao excluir o usuário', 'error');
          },
        });
      }
    });
  }

  alterarSenha(): void {
    // Lógica para abrir um modal ou redirecionar para página de alteração de senha
    console.log('Abrir modal de alteração de senha');
  }
}
