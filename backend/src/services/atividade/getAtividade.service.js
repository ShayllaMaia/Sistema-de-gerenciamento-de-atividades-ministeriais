import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAtividadeService = async () => {
  return prisma.atividade.findMany();
};

export { getAtividadeService };
