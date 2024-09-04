import { Dias } from "./dias.enum";

export interface PreferenciaInterface {
    usuario_id: string;
    dia_semana: string[]; 
    hora_inicio: string;
    hora_fim: string;
  }
  