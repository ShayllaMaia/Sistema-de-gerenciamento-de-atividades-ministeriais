export interface UsuarioInterface {
  id: string;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  endereco: string;
  dataNascimento: string;
  statusSolicitacao?: string;
  preferenciasAtividades?: Array<{
    nome: string;
    descricao: string;
  }> | null; // Pode ser null se não estiver definido
  usuario?: {
    id: string;
    nome: string;
    endereco: string;
    telefone: string;
    email: string;
  } | null; // Pode ser null se não estiver definido
}
