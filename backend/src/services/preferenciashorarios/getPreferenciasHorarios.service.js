import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPreferenciasHorariosService = async () => {
  const preferencias = prisma.preferenciasHorarios.findMany();
  return preferencias;
};

export { getPreferenciasHorariosService };
