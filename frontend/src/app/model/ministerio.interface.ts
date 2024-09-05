export interface MinisterioInterface {
    id: string;
    nome: string;
    descricao: string;
}
export interface Lider {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  dataNascimento: string; // Usar string se você está lidando com data em formato ISO
  senha: string;
  tipoUsuario: string;
}

export interface MinisterioLiderResponse {
  ministerio_id: string;
  lider_id: string;
  ministerio: MinisterioInterface;
  lider: Lider;
}
