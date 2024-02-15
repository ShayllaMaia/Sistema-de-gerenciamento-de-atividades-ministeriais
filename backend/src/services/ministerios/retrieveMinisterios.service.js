import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";

const prisma = new PrismaClient();

const retrieveMinisterioService = async (id) => {
  id = parseInt(id);
  const ministerio = await prisma.ministerio.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      nome: true,
      descricao: true,
      lider_id: true,
    },
  });

  if (!ministerio) {
    throw new AppError("Ministério não encontrado!", 404);
  }

  return ministerio;
};

export { retrieveMinisterioService };