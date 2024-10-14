
export interface EventoInterface {
    id: string;
    nome:string;
    data: string;
    tipoEvento: string;
    hora_inicio: string;
    hora_fim: string;
    descricao: string;
    isRecorrente: false;
    ministerios: any[];
  }
