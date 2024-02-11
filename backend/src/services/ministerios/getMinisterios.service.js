import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getMinisteriosService = async () => {
  const ministerios = await prisma.ministerio.findMany({
    select: {
      id: true,
      nome: true,
      descricao: true,
      lider_id: true,
    },
  });

  return ministerios;
};

export { getMinisteriosService };