import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";

const prisma = new PrismaClient();

const postPreferenciasHorarios = async (data) => {
  let { usuario_id,dia_semana, hora_inicio, hora_fim } = data;

  const novaPreferencia = await prisma.preferenciasHorarios.create({
    data: {
      usuario_id: usuario_id,
      dia_semana: dia_semana,
      hora_inicio: hora_inicio,
      hora_fim: hora_fim,
    },
  });
  return novaPreferencia;
};

export { postPreferenciasHorarios };
