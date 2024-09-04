import { PrismaClient } from "@prisma/client";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";

const prisma = new PrismaClient();

const getPreferenciasHorariosService = async (token) => {
  token = await retornaInfoToken(token)
  const preferencias = prisma.preferenciasHorarios.findMany();
  return preferencias;
};

export { getPreferenciasHorariosService };
