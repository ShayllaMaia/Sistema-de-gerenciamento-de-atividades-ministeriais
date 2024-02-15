import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const postAtivadadeService = async (nome, descricao) => {
  return prisma.atividade.create({
    data: {
      nome,
      descricao,
    },
  });
};
export { postAtivadadeService };
