import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";


const prisma = new PrismaClient();

const updateEventosService = async (id,data) =>{
    const eventoId = parseInt(id);
    let{date,hora_inicio,hora_fim,descricao} = data;
    const evento = await prisma.eventos.findUnique({
        where:{
            id:eventoId,
        }
    });

    if(!evento){
        throw new AppError("Evento não encontrado",404);
    }
    if (new Date(hora_inicio) >= new Date(hora_fim)) {
        throw new Error('A hora de início deve ser anterior à hora de término.');
      }
    const dataFormatada = new Date(date);
    const horaInicioFormatada = new Date(hora_inicio);
    const horaFimFormatada = new Date(hora_fim);
    const updateEvento = await prisma.eventos.update({
        where:{
            id: evento.id,
        },
        data:{
            data: dataFormatada,
            hora_inicio: horaInicioFormatada,
            hora_fim: horaFimFormatada,
            descricao: descricao,
        }
    });

    return updateEvento;
}

export {updateEventosService};