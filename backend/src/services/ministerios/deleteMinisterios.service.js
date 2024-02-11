import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";

const prisma = new PrismaClient();

const deleteMinisterioService = async (id) => {
  const ministerio = await prisma.ministerio.delete({
    where: {
      id: parseInt(id),
    },
  });

  if (!ministerio) {
    throw new AppError("Ministério não encontrado!", 404);
  }

  return true;
};

export { deleteMinisterioService };