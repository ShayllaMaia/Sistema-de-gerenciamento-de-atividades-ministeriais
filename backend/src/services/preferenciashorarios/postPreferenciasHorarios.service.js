import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";

const prisma = new PrismaClient();

const postPreferenciasHorarios = async (data) => {
  try {
    console.log(data);

    // Cria um array de promessas de criação
    const promessas = data.map(preferencia => 
      prisma.preferenciasHorarios.create({
        data: {
          usuario_id: preferencia.usuario_id,
          dia_semana: preferencia.dia_semana,
          hora_inicio: new Date(preferencia.hora_inicio),
          hora_fim: new Date(preferencia.hora_fim),
        },
      })
    );

    // Aguarda todas as promessas serem resolvidas
    const novasPreferencias = await Promise.all(promessas);

    return novasPreferencias;
  } catch (error) {
    throw new AppError('Erro ao criar preferências de horários', 500);
  }
};

export { postPreferenciasHorarios };
