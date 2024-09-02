import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPreferenciasHorariosByUserIdService = async (id) => {
  const preferencia = await prisma.preferenciasHorarios.findMany({
    where: {
      usuario_id: id,
    },
  });
  return preferencia;
};

export { getPreferenciasHorariosByUserIdService };
