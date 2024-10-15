import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";
import moment from 'moment-timezone';

const prisma = new PrismaClient();

const postPreferenciasHorarios = async (data, token) => {
  token = await retornaInfoToken(token);
  try {
    
    const promessas = data.map(preferencia => {
      // Ajusta o formato da data usando moment
      const horaInicio = moment(preferencia.hora_inicio, 'DD/MM/YYYY, HH:mm:ss').toDate();
      const horaFim = moment(preferencia.hora_fim, 'DD/MM/YYYY, HH:mm:ss').toDate();

      return prisma.preferenciasHorarios.create({
        data: {
          usuario_id: preferencia.usuario_id,
          dia_semana: preferencia.dia_semana,
          hora_inicio: horaInicio,
          hora_fim: horaFim,
        }
      });
    });
    
    // Aguarda todas as promessas serem resolvidas
    const novasPreferencias = await Promise.all(promessas);

    return novasPreferencias;
  } catch (error) {
    console.error(error);
    throw new AppError('Erro ao criar preferências de horários', error);
  }
};

export { postPreferenciasHorarios };
