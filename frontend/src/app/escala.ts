export interface Evento {
  id: string;
  nome: string;
  data: string;
  tipoEvento: string;
  hora_inicio: string;
  hora_fim: string;
  descricao: string;
  isRecorrente: boolean;
}

export interface Ministerio {
  id: string;
  nome: string;
  descricao: string;
}

export interface Atividade {
  id: string;
  nome: string;
  descricao: string;
  ministerio_id: string;
  quantidadeMembros: number;
}

export interface Usuario {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  dataNascimento: string;
  senha: string;
  tipoUsuario: string;
  preferenciasHorarios: any[]; // Definir o tipo correto se souber como são as preferências
}

export interface Participacao {
  id: string;
  evento_id: string;
  usuario_id: string;
  ministerio_id: string;
  atividade_id: string;
  hora_chegada: string;
  hora_saida: string;
  data: string;
  mes: string;
  evento: Evento;
  ministerio: Ministerio;
  atividade: Atividade;
  usuario: Usuario;
}
