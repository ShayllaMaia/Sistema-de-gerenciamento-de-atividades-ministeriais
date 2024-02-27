import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";

const prisma = new PrismaClient();

const updateMinisterioService = async (id, data) => {
  const ministerioId = id;

  const ministerio = await prisma.ministerio.findUnique({
    where: {
      id: ministerioId,
    },
  });
  
  if (!ministerio) {
    throw new AppError("Ministério não encontrado!", 404);
  }


    const updatedMinisterio = await prisma.ministerio.update({
      where: {
        id: ministerioId,
      },
      data: {
        nome: data.nome,
        descricao: data.descricao
      }
    });
    return updatedMinisterio;
  } 

export { updateMinisterioService };