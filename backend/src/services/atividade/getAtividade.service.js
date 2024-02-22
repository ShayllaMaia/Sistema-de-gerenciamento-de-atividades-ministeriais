import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAtividadeService = async () => {
  return prisma.atividade.findMany({
    include: {
      ministerio: true, // Inclui as informações completas do ministério
    }
  });
};

export { getAtividadeService };
