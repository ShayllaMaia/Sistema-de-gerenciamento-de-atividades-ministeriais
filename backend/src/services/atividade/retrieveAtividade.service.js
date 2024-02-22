import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const retrieveAtividadeService = async (id) => {
  const atividade = prisma.atividade.findUnique({
    where: { id },
  });

  if (!atividade) throw new AppError("Atividade não encontrada", 404);

  return atividade;
};

export { retrieveAtividadeService };
