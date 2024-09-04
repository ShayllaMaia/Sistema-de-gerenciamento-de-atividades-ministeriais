import { PrismaClient } from "@prisma/client";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";

const prisma = new PrismaClient();

const getPreferenciasHorariosByUserIdService = async (id,token) => {
  token = await retornaInfoToken(token);
  const preferencia = await prisma.preferenciasHorarios.findMany({
    where: {
      usuario_id: id,
    },
  });
  return preferencia;
};

export { getPreferenciasHorariosByUserIdService };
