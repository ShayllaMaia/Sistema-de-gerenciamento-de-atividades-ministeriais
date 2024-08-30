export interface UsuarioInterface {
  id: string;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  endereco: string;
  dataNascimento: string;
  statusSolicitacao?: string;


  usuario?: {
    id: string;
    nome: string;
    endereco: string;
    telefone: string;
    email: string;
  }
}
